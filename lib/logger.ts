type LogLevel = "info" | "warn" | "error"

type LogPayload = {
  level: LogLevel
  route?: string
  message: string
  meta?: Record<string, unknown>
  error?: unknown
}

export function logEvent({ level, route, message, meta, error }: LogPayload) {
  const timestamp = new Date().toISOString()
  const logObj = {
    timestamp,
    level,
    ...(route ? { route } : {}),
    message,
    ...(meta ? { meta } : {}),
    ...(error
      ? {
          error:
            error instanceof Error
              ? {
                  name: error.name,
                  message: error.message,
                  stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
                }
              : String(error),
        }
      : {}),
  }

  const logString = JSON.stringify(logObj)

  switch (level) {
    case "error":
      console.error(logString)
      break
    case "warn":
      console.warn(logString)
      break
    default:
      console.log(logString)
      break
  }
}
