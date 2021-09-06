import {HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {AuthService} from "../service/auth.service";

@Injectable({providedIn: 'root'})
export class AuthHttpInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    console.log('intercept !!!');
    if (this.authService.hasUserData()) {
      console.log('this.authService.getCurrentToken()', this.authService.getCurrentToken());
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + this.authService.getCurrentToken()
        }
      });
    }

    return next.handle(request);
  }
}
