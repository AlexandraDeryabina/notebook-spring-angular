import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {plainToClass, serialize} from "class-transformer";
import {LoginRequest} from "../model/LoginRequest";
import {isNull} from "util";
import {UserData} from "../model/UserData";

@Injectable({providedIn: 'root'})
export class AuthService {
  public static readonly SESSION_USERDATA: string = 'userdata';
  private userData: UserData;
  private resourceUrl: string = environment.apiUrl + 'api/auth';

  constructor(
    private http: HttpClient
  ) { }

  public isAuth(): boolean {
    let userData = JSON.parse(sessionStorage.getItem(AuthService.SESSION_USERDATA));
    return !isNull(userData);
  }

  // Авторизация
  auth(loginRequest: LoginRequest): Observable<UserData> {
    return this.http.post<UserData>(
      this.resourceUrl + '/login',
      serialize(loginRequest),
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    ).pipe(map(response => {
      this.userData = new UserData(response.id, response.token, loginRequest.login);
      sessionStorage.setItem(AuthService.SESSION_USERDATA, this.userData.toJson());
      return plainToClass(UserData, response)
    }));
  }

  logout() {
    this.userData = null;
    sessionStorage.removeItem(AuthService.SESSION_USERDATA);
  }

  public hasUserData(): boolean {
    console.log('this.userData != undefined', this.userData != undefined);
    console.log('this.userData', this.userData);
    return this.userData != undefined;
  }

  public getCurrentToken(): string {
    return this.userData.token;
  }

  public authFromSession(): void {
    if (sessionStorage.getItem(AuthService.SESSION_USERDATA)) {
      this.userData = UserData.fromJson(sessionStorage.getItem(AuthService.SESSION_USERDATA));
    }
  }

}
