import * as dotenv from "dotenv";

dotenv.config({ path: `.env` });

function env(key: string, defaultValue: null | string = null): string {
    return process.env[key] ?? (defaultValue as string);
}

export const appConfig = {
    port: env("PORT") || 4040,
    dbHost: env("DB_HOST") || "localhost",
    dbPort: env("DB_PORT") || "27017",
    dbName: env("DB_NAME") || "todo",
    dbUser: env("DB_USER") || "admin",
    dbPass: env("DB_PASS") || "password",
    tokenSecret: env("TOKEN_SECRET") || "cc.oOEb+b@R#",
    todoCron: env("TODO_CRON") || "0 0 * * *",
    logLevel: env("LOG_LEVEL") || "info"
}
