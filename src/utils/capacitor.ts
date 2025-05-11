
import { Capacitor } from '@capacitor/core';

export const isNative = Capacitor.isNativePlatform();

export const getPlatform = () => {
  return Capacitor.getPlatform();
};

export const openNativeDownloadsFolder = async () => {
  // This is a placeholder - in a real app, you would use a Capacitor plugin to open the downloads folder
  if (isNative) {
    // Using console.log for now, but this would use a plugin in a real implementation
    console.log('Opening native downloads folder');
  } else {
    // For web, just log a message
    console.log('Native downloads folder only available in mobile app');
  }
};

export const getAppVersion = () => {
  return isNative ? Capacitor.getPluginImplementation('App')?.getInfo()?.version : 'web';
};

export const setupCapacitor = () => {
  // Add any initialization code here
  console.log('Capacitor initialized, running on platform:', getPlatform());
};
