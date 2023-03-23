namespace NodeJS {
  interface ProcessEnv extends NodeJS.ProcessEnv {
    WEB_VERSION: string;
    NEXT_PUBLIC_GA_ID: string;
    NEXT_PUBLIC_SENTRY_DSN: string;
    NEXT_PUBLIC_HOTJAR_ID: string;
    NEXT_PUBLIC_MIXPANEL_ID: string;
  }
}