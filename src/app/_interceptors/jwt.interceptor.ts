import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from "../../environments/environment";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  vimeoToken = '5f7c5aeb2fd29b3566e678fa84ff0a0b'
  youtubeToken = ''

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

   if (this.vimeoToken || this.youtubeToken) {
     const cloned = request.clone( {
       headers: request.headers.set('Authorization',
         // 'Bearer ' + this.setToken(request))
         'Bearer ' + this.vimeoToken)
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

  // setToken(request: any) {
  //   let returnToken = ''
  //
  //   request.url.includes(environment.apiUrlVimeo)
  //     ?  returnToken = this.vimeoToken
  //     : returnToken = this.youtubeToken
  //
  //   return returnToken
  // }

}
