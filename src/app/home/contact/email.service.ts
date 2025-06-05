import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface Group {
  id: string;
  text: string;
}

export interface Image {
  id: string;
  src: string;
  group: string;
  metaData: { aos: string; aosDelay: number };
}

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  constructor(private http: HttpClient) {}

  sendEmail(
    name: string,
    email: string,
    message: string,
    policy: boolean
  ): Observable<any> {
    const body = { name, email, message, policy };
    return this.http.post(environment.mailUrl, body);
  }
}
