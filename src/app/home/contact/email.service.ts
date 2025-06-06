import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser';
import { Observable, from } from 'rxjs';
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
  constructor() {
    // Initialize EmailJS with your public key
    emailjs.init(environment.emailjsPublicKey);
  }

  sendEmail(
    name: string,
    email: string,
    message: string,
    policy: boolean
  ): Observable<any> {
    const templateParams = {
      subject: 'Neue Kontaktanfrage von ilazi-ausbau.ch',
      from_name: name,
      from_email: email,
      time: new Date().toISOString(),
      message: message,
      policy_accepted: policy ? 'Ja' : 'Nein',
      to_email: 'info@ilazi-ausbau.ch',
    };

    return from(
      emailjs.send(
        environment.emailjsServiceId,
        environment.emailjsTemplateId,
        templateParams
      )
    );
  }
}
