import { Injectable } from '@angular/core';
import { NotificationsService } from './notifications.service';

@Injectable({
  providedIn: 'root'
})
export class CopyToClipboardService {

  constructor(private notificationsService: NotificationsService) { }

  copy(file: string) {
    const el = document.createElement("textarea");
    el.value = file;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);

    this.notificationsService.info(`Copied to clipboard`);
  }
}
