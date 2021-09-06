import {Enum, EnumType} from "ts-jenum";


@Enum<NotePriority>('value')
export class NotePriority extends EnumType<NotePriority>() {

  public static readonly LOW  = new NotePriority('LOW', 'низкая');
  public static readonly NORMAL  = new NotePriority('NORMAL', 'средняя');
  public static readonly HIGH  = new NotePriority('HIGH', 'высокая');

  constructor(public value: string, public label: string) {
    super();
  }
}
