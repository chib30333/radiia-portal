function required(name: string): string {
  const value = process.env[name];
  if (value === undefined || value === "") {
    throw new Error(`Environment variable ${name} is required but not set. Check .env.local.`);
  }
  return value;
}

function optional(name: string, fallback: string): string {
  const value = process.env[name];
  return value === undefined || value === "" ? fallback : value;
}

export const env = {
  databaseUrl: required("DATABASE_URL"),
  authSecret: required("AUTH_SECRET"),
  resendApiKey: required("RESEND_API_KEY"),
  cronSecret: required("CRON_SECRET"),

  notificationEmail: optional("RADIIA_NOTIFICATION_EMAIL", "production@radiia.co"),
  appUrl: optional("NEXT_PUBLIC_APP_URL", "http://localhost:3000"),

  gemstoneFtpHost: optional("GEMSTONE_FTP_HOST", ""),
  gemstoneFtpUser: optional("GEMSTONE_FTP_USER", ""),
  gemstoneFtpPassword: optional("GEMSTONE_FTP_PASSWORD", ""),
  gemstoneFtpPath: optional("GEMSTONE_FTP_PATH", "")
} as const;
