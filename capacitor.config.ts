
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.9d225bc321d74594b28a5e4c1c5dbdce',
  appName: 'torrent-social-grabber',
  webDir: 'dist',
  server: {
    url: 'https://9d225bc3-21d7-4594-b28a-5e4c1c5dbdce.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  android: {
    allowMixedContent: true
  }
};

export default config;
