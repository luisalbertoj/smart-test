
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable()
export class EmailService {

  constructor(private http:  HttpClient) { }

  sendEmail(data) {
    return this.http.post('http://localhost:1337/email/', data);
  }

  private _errorHandler(error: Response) {
    console.error(error);
    return Observable.throw(error || 'Server Error')
  }

}