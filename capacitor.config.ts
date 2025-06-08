import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.ingeta.app',
  appName: 'Ingeta App',
  webDir: 'www',
  server: {
    allowNavigation: ['ingeta.com', '*.ingeta.com'],
  }
};

export default config;
