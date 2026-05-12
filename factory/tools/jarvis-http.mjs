import http from "node:http";

export const defaultBaseUrl = process.env.JARVIS_URL || "http://127.0.0.1:4173";

export function requestJson(path, options = {}) {
  const baseUrl = options.baseUrl || defaultBaseUrl;
  const url = new URL(path, baseUrl);
  const method = options.method || "GET";
  const timeoutMs = options.timeoutMs || 2500;
  const allowBusinessError = Boolean(options.allowBusinessError);
  const body = options.body ? JSON.stringify(options.body) : "";

  return new Promise((resolve, reject) => {
    const req = http.request(
      {
        hostname: url.hostname,
        port: url.port || 80,
        path: `${url.pathname}${url.search}`,
        method,
        timeout: timeoutMs,
        headers: body
          ? {
              "content-type": "application/json",
              "content-length": Buffer.byteLength(body)
            }
          : {}
      },
      (res) => {
        let data = "";
        res.on("data", (chunk) => {
          data += chunk.toString();
        });
        res.on("end", () => {
          try {
            const parsed = data ? JSON.parse(data) : {};
            if (
              res.statusCode < 200 ||
              res.statusCode >= 300 ||
              (parsed.ok === false && !allowBusinessError)
            ) {
              reject(
                new Error(
                  parsed.error || `${method} ${path} failed with HTTP ${res.statusCode}`
                )
              );
              return;
            }
            resolve(parsed);
          } catch (error) {
            reject(new Error(`${method} ${path} returned non-JSON output.`));
          }
        });
      }
    );

    req.on("timeout", () => {
      req.destroy(new Error(`${method} ${path} timed out after ${timeoutMs}ms.`));
    });
    req.on("error", reject);
    if (body) req.write(body);
    req.end();
  });
}

export async function isJarvisHealthy(options = {}) {
  try {
    const health = await requestJson("/api/health", {
      ...options,
      timeoutMs: options.timeoutMs || 900
    });
    return Boolean(health.ok);
  } catch {
    return false;
  }
}
