import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';



@Injectable()
export class NotificationsService {

  constructor(private snackBar: MatSnackBar) { }

  success(message: string = 'Successfully', title?: string) {

    // this.toastr.success(message, title);
    let text = ''
    if (message) {
      text = message;
    } else {
      text = title;
    }
    this.snackBar.open(text, '', this.defaultConfig());
  }

  warning(message: string, title?: string) {
    // this.toastr.warning(message, title);
    let text = '';
    if (message) {
      text = message;
    } else {
      text = title;
    }
    this.snackBar.open(text, '', this.defaultConfig({panelClass: 'snack-bar-warn'}));
  }

  error(message: string, title?: string) {
    // this.toastr.danger(message, title);
    let text = ''
    if (message) {
      text = message;
    } else {
      text = title;
    }
    this.snackBar.open(text, '', this.defaultConfig({panelClass: 'snack-bar-error'}));
  }

  info(message: string, title?: string) {
    // this.toastr.info(message, title);
    let text = ''
    if (message) {
      text = message;
    } else {
      text = title;
    }
    this.snackBar.open(text, '', this.defaultConfig());
  }
  // duration = 1500, horizontalPosition = 'end', verticalPosition = 'top', panelClass: string = ''
  defaultConfig(config?: MatSnackBarConfig): {} {
    return {
      duration: config?.duration || 2000,
      horizontalPosition: config?.horizontalPosition || 'end',
      verticalPosition: config?.verticalPosition || 'top',
      panelClass: config?.panelClass || ''
    };
  }
}
