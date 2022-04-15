import { Injectable } from '@angular/core';
import { EMPTY } from 'rxjs';
import { NotificationsService } from 'src/app/shared/services/notifications.service';
import { WordsService } from './words.service';

@Injectable({
  providedIn: 'root'
})
export class CsvHandlerService {

  constructor(
    private wordsService: WordsService,
    private notification: NotificationsService

  ) { }

  addNewWordsFromCSV(file: File, selectedGroupId?: string) {
    if (!file) return EMPTY;

    if (!file.name.includes('csv')) {
      this.notification.info('Please select CSV file');
      return EMPTY;
    }

    return this.wordsService.addNewWordsFromCSV({ file, selectedGroupId });
  }
}
