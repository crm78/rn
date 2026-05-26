import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.enterprise.officeapp',
  appName: '企业办公管理系统',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
