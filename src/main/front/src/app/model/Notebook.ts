import {EnumConstNames} from "ts-jenum";
import {NotePriority} from "../enum/NotePriority.enum";
import * as moment from "moment";
import {Expose, Transform} from "class-transformer";

export class Notebook {

  @Expose()
  id: number;

  @Expose()
  headline: string;

  @Expose()
  text: string;

  @Expose()
  priority: EnumConstNames<typeof NotePriority, NotePriority>;

  @Transform(value => value ? moment(value).format('DD.MM.YYYY HH:mm:ss') : null, { toPlainOnly: true })
  @Transform(value => value ? moment(value, 'DD.MM.YYYY HH:mm:ss').toDate() : null, { toClassOnly: true })
  deadline: Date;
}
