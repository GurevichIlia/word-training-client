import { InstallAppService } from './install-app.service';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InstallSuggestionComponent } from './install-suggestion/install-suggestion.component';
import { DeviceDetectorService, DeviceInfo } from 'ngx-device-detector';

@Injectable({
  providedIn: 'root'
})
export class InstallHelperFunctionsService {
  constructor(
    private dialog: MatDialog,
    private deviceService: DeviceDetectorService,
    private installApp: InstallAppService
  ) { }


  showInstallPromotion(e?: Event) {
    this.installApp.showInstallSuggestion(e);
    this.dialog.open(InstallSuggestionComponent, { width: '95%', maxWidth: '300px', height: '180px', panelClass: 'padding-0' });

  }

  installOnIosDevice(device: DeviceInfo) {
    // const device = this.detectDevice();

    if (device.os.toLowerCase() === 'ios') {
      const isInstalled = localStorage.getItem('installedOnIos');

      if (isInstalled) {
        return;
      }

      setTimeout(() => {
        this.dialog.open(InstallSuggestionComponent,
          { width: '95%', maxWidth: '300px', height: '180px', panelClass: 'padding-0', data: { ios: true } });

      }, 4000);

    }

  }



  detectDevice() {
    const deviceInfo = this.deviceService.getDeviceInfo();
    const isMobile = this.deviceService.isMobile();
    const isTablet = this.deviceService.isTablet();
    const isDesktopDevice = this.deviceService.isDesktop();
    // console.log(deviceInfo);
    // console.log(isMobile);  // returns if the device is a mobile device (android / iPhone / windows-phone etc)
    // console.log(isTablet);  // returns if the device us a tablet (iPad etc)
    // console.log(isDesktopDevice); // returns if the app is running on a Desktop browser.

    this.installOnIosDevice(deviceInfo);

    return deviceInfo;
  }


}
