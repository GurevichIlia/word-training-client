import { FontAwesomeIcons } from '../enums/font-awesome.enum';

export interface Action<T = any> {
  action: string;
  payload?: T;
}
/**
 * @argument icon:
 * Font awesome icon.
 * Example: far fa-plus-square;
 */
export class MenuItem<A = any> {
  constructor(
    public title: string,
    public action: A,
    public icon: FontAwesomeIcons,
    public isShow: boolean = true,
    public disabled: boolean = false,
  ) {
  }
}

export interface BackendErrorInterface {
  [key: string]: string;
}

