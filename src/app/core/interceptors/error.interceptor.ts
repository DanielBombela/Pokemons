
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {  catchError, finalize } from 'rxjs/operators';
import { LoadingService } from 'src/app/shared/services/loading.service';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private loading:LoadingService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.loading.show()
        return <any> next.handle(request).pipe(

            catchError((error: HttpErrorResponse) => {

              if(error.status == 404){
                alert("No existe información con el registro seleccionado")
              }
              else{
                alert("Ocurrio un error inesperado");
              }


                 return throwError(()=>new Error( "Ocurrio un error inesperado"));
            }),

            finalize(() => {
                this.loading.hide();
            })

        );

    }
}
