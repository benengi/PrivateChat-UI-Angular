import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, delay } from 'rxjs/operators';

import { Register, RegisterResponse, Login, LoginResponse } from '../model/account';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  /**
   * Time taken to deley http request
   * 
   * @var integer
   */
  private requestDelayTime = 2000;

  constructor(private http: HttpClient) { }

  /**
   * Send registration data to register api
   * 
   * @param data Registration Data
   * @return An `Observable` of type `RegisterResponse`
   */
  register(data:Register) : Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>('api/register', data).pipe(
      retry(2),
      delay(this.requestDelayTime),
      catchError((error:HttpErrorResponse) => throwError(error.message))
    );
  }

  /**
   * Send login credentails to login api
   * 
   * @param data Login Data
   * @rerturn An `Observable` of type `ApiResponse`
   */
  login(data:Login) : Observable<LoginResponse> {
    return this.http.post<LoginResponse>('api/login', data).pipe(
      retry(2),
      delay(this.requestDelayTime),
      catchError((error:HttpErrorResponse) => throwError(error.message))
    )
  }

}