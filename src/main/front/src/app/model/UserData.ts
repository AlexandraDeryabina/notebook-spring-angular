export class UserData {
  constructor(public id: string, public token: string, public username: (() => void) | string) {}

  public toJson(): string {
    return JSON.stringify(this);
  }

  public static fromJson(json: string): UserData {
    return <UserData>JSON.parse(json);
  }
}
