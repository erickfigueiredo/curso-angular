import { HttpInterceptor, HttpRequest, HttpHandler, HttpEventType } from '@angular/common/http';
import { tap } from 'rxjs/operators';

export class LoggingInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log('Outgoing request');
    console.log(req.url);
    console.log(req.hearders);

    return next.handle(req).pipe(tap(event => {
      if(event.type === HttpEventType.Response){
        console.log('Incoming response, body data: ');
        console.log(event.body);
      }
    }));
  }
}
