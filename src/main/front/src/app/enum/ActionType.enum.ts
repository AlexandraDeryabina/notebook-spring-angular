import { Enum, EnumType } from 'ts-jenum';

@Enum('value')
export class ActionType extends EnumType<ActionType>() {

    // Запись создана или добавлена в список
    public static readonly NEW = new ActionType('NEW', 'Создан');

    // Запись редактирована
    public static readonly EDIT = new ActionType('EDIT', 'Редактирован');

    // Запись удалена (в т.ч. из списка)
    public static readonly DELETE = new ActionType('DELETE', 'Удален');

    constructor(public value: string, public label: string) {
        super();
    }
}
