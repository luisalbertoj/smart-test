import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';

import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FactoryService } from './factory.service';
@Injectable()
export class InterceptorServiceService implements HttpInterceptor {
  constructor(private data: FactoryService) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.data.showSpinner();
    return next.handle(request).pipe(
      tap(
        (event) => {
          if (event instanceof HttpResponse) {
            this.data.hideSpinner();
          }
        },
        (error) => {
          if (error instanceof HttpErrorResponse) {
            console.log(error);
            this.data.hideSpinner();
          }
        }
      )
    );
  }
}
