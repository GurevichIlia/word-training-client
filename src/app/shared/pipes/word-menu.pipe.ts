import { Word } from 'src/app/shared/interfaces';
import { Pipe, PipeTransform } from '@angular/core';
import { MenuItem, WordAction } from 'src/app/core';

@Pipe({
  name: 'wordMenu'
})
export class WordMenuPipe implements PipeTransform {

  transform(items: MenuItem<WordAction>[], word: Word): any {

    if (!word || !items) return items

    return items.map(item => {
      if (item.action === WordAction.SHARE_FOR_ALL && word.isShared) {
        return { ...item, title: 'Shared', disabled: true }
      }
      return item
    })
  }

}
