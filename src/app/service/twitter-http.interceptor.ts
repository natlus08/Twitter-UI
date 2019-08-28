import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

import { Constants } from '../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class TwitterHttpInterceptor implements HttpInterceptor {

  constructor(private toastr: ToastrService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq;

    if (request.method === 'POST' && (request.url.includes('tweet') ||
      request.url.includes('user'))) {
      authReq = request.clone(Constants.HTTP_OPTIONS_FILE);
    } else {
      authReq = request.clone(Constants.HTTP_OPTIONS);
    }

    return next.handle(authReq)
      .pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = error.error.message;
        if (error.status == 500) {
          this.toastr.error(error.error.message, 'Error!');
        }
        return throwError(errorMessage);
      })
    )
  }
}
