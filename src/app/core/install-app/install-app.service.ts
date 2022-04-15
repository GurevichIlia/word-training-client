import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InstallAppService {
  deferredPrompt;
  isInstalling = false;

  constructor(

  ) { }



  // showInstallPromotion(e?: Event) {
  //   this.installHelper.showInstallPromotion(e);
  // }

  // appIsInstalling() {
  //   return this.installHelper.appIsInstalling();
  // }

  // detectDevice() {
  //   return this.installHelper.detectDevice();
  // }
  showInstallSuggestion(e: Event) {
    this.deferredPrompt = e;
  }

  installApp() {
    this.deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    this.deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        this.isInstalling = true;
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
    });
  }


  appIsInstalling() {
    return this.isInstalling;
  }
}
