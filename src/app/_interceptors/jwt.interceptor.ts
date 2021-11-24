import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from "../../environments/environment";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  vimeoToken = '801ed3c70d9d4dd2f5f66949648bad56'
  youtubeToken = ''

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

   if (this.vimeoToken || this.youtubeToken) {
     const cloned = request.clone( {
       headers: request.headers.set('Authorization',
         'Bearer ' + this.setToken(request))
         // 'Bearer ' + this.vimeoToken)
     });

     // if (!environment.production) {
     //   console.log(request)
     // }
     return (next.handle(cloned))
   } else {
     // if (!environment.production) {
     //   console.log(request)
     // }
     return next.handle(request)
   }
  }

  setToken(request: any) {
    return request.url.includes(environment.apiUrlVimeo)
      ? this.vimeoToken
      : this.youtubeToken
  }

}
