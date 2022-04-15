import { WordGroup } from 'src/app/shared/interfaces';

export const defaultGroups: WordGroup[] = [{
  _id: '1',
  name: 'All',
  wordQuantity: 0,
  shareForAll: false,
  isVerbsGroup: false
},
{
  _id: '2',
  name: 'Favorites',
  wordQuantity: 0,
  shareForAll: false,
  isVerbsGroup: false
}]

export const All = 0;
export const Favorites = 1
