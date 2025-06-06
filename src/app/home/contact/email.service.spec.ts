import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import emailjs from '@emailjs/browser';
import { environment } from 'src/environments/environment';
import { EmailService } from './email.service';

describe('EmailService', () => {
  let service: EmailService;
  let httpMock: HttpTestingController;
  let emailjsInitSpy: jasmine.Spy;
  let emailjsSendSpy: jasmine.Spy;

  beforeEach(() => {
    // Create spies for EmailJS
    emailjsInitSpy = spyOn(emailjs, 'init');
    emailjsSendSpy = spyOn(emailjs, 'send');

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EmailService],
    });

    service = TestBed.inject(EmailService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('constructor', () => {
    it('should create', () => {
      expect(service).toBeTruthy();
    });

    it('should initialize EmailJS with public key', () => {
      expect(emailjsInitSpy).toHaveBeenCalledWith(environment.emailjsPublicKey);
    });
  });

  describe('sendEmail', () => {
    it('should call sendWithEmailJS method', done => {
      const mockResponse = { status: 200, text: 'OK' };
      emailjsSendSpy.and.returnValue(Promise.resolve(mockResponse));

      const testData = {
        name: 'Test User',
        email: 'test@example.com',
        message: 'Test message',
        policy: true,
      };

      service
        .sendEmail(
          testData.name,
          testData.email,
          testData.message,
          testData.policy
        )
        .subscribe({
          next: (response: any) => {
            expect(response).toEqual(mockResponse);
            expect(emailjsSendSpy).toHaveBeenCalledWith(
              environment.emailjsServiceId,
              environment.emailjsTemplateId,
              jasmine.objectContaining({
                subject: 'Neue Kontaktanfrage von ilazi-ausbau.ch',
                from_name: testData.name,
                from_email: testData.email,
                message: testData.message,
                policy_accepted: 'Ja',
                to_email: 'info@ilazi-ausbau.ch',
                time: jasmine.any(String),
              })
            );
            done();
          },
          error: done,
        });
    });

    it('should handle EmailJS send failure', done => {
      const mockError = new Error('EmailJS send failed');
      emailjsSendSpy.and.returnValue(Promise.reject(mockError));

      service
        .sendEmail('Test', 'test@example.com', 'Test message', false)
        .subscribe({
          next: () => done(),
          error: (error: any) => {
            expect(error).toEqual(mockError);
            done();
          },
        });
    });
  });

  describe('sendWithEmailJS', () => {
    it('should send email with correct template parameters when policy is true', done => {
      const mockResponse = { status: 200, text: 'OK' };
      emailjsSendSpy.and.returnValue(Promise.resolve(mockResponse));

      const testData = {
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Hello world',
        policy: true,
      };

      // Access private method through any casting for testing
      (service as any)
        .sendWithEmailJS(
          testData.name,
          testData.email,
          testData.message,
          testData.policy
        )
        .subscribe({
          next: (response: any) => {
            expect(response).toEqual(mockResponse);
            expect(emailjsSendSpy).toHaveBeenCalledWith(
              environment.emailjsServiceId,
              environment.emailjsTemplateId,
              jasmine.objectContaining({
                subject: 'Neue Kontaktanfrage von ilazi-ausbau.ch',
                from_name: 'John Doe',
                from_email: 'john@example.com',
                message: 'Hello world',
                policy_accepted: 'Ja',
                to_email: 'info@ilazi-ausbau.ch',
                time: jasmine.any(String),
              })
            );
            done();
          },
          error: done,
        });
    });

    it('should send email with correct template parameters when policy is false', done => {
      const mockResponse = { status: 200, text: 'OK' };
      emailjsSendSpy.and.returnValue(Promise.resolve(mockResponse));

      (service as any)
        .sendWithEmailJS('Jane Doe', 'jane@example.com', 'Test message', false)
        .subscribe({
          next: (response: any) => {
            expect(response).toEqual(mockResponse);
            expect(emailjsSendSpy).toHaveBeenCalledWith(
              environment.emailjsServiceId,
              environment.emailjsTemplateId,
              jasmine.objectContaining({
                policy_accepted: 'Nein',
              })
            );
            done();
          },
          error: done,
        });
    });

    it('should include current timestamp in template parameters', done => {
      const mockResponse = { status: 200, text: 'OK' };
      emailjsSendSpy.and.returnValue(Promise.resolve(mockResponse));

      const beforeTime = new Date().getTime();

      (service as any)
        .sendWithEmailJS('Test', 'test@example.com', 'message', true)
        .subscribe({
          next: () => {
            const afterTime = new Date().getTime();
            const callArgs = emailjsSendSpy.calls.mostRecent().args[2];
            const timestamp = new Date(callArgs.time).getTime();

            expect(timestamp).toBeGreaterThanOrEqual(beforeTime);
            expect(timestamp).toBeLessThanOrEqual(afterTime);
            done();
          },
          error: done,
        });
    });
  });

  describe('sendWithFormsubmit', () => {
    it('should send HTTP POST request with correct form data when policy is true', done => {
      const testData = {
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Hello world',
        policy: true,
      };

      const mockResponse = { success: true, message: 'Email sent' };

      (service as any)
        .sendWithFormsubmit(
          testData.name,
          testData.email,
          testData.message,
          testData.policy
        )
        .subscribe({
          next: (response: any) => {
            expect(response).toEqual(mockResponse);
            done();
          },
          error: done,
        });

      const req = httpMock.expectOne(environment.formsubmitEndpoint);
      expect(req.request.method).toBe('POST');
      expect(req.request.headers.get('Accept')).toBe('application/json');

      // Check FormData content
      const formData = req.request.body as FormData;
      expect(formData.get('name')).toBe('John Doe');
      expect(formData.get('email')).toBe('john@example.com');
      expect(formData.get('message')).toBe('Hello world');
      expect(formData.get('policy_accepted')).toBe('Ja');
      expect(formData.get('_subject')).toBe(
        'Neue Kontaktanfrage von ilazi-ausbau.ch'
      );
      expect(formData.get('_captcha')).toBe('false');
      expect(formData.get('_template')).toBe('table');
      expect(formData.get('_autoresponse')).toBe(
        'Vielen Dank für Ihre Nachricht! Wir melden uns schnellstmöglich bei Ihnen.'
      );

      req.flush(mockResponse);
    });

    it('should send HTTP POST request with correct form data when policy is false', done => {
      const mockResponse = { success: true };

      (service as any)
        .sendWithFormsubmit('Jane', 'jane@example.com', 'Test', false)
        .subscribe({
          next: (response: any) => {
            expect(response).toEqual(mockResponse);
            done();
          },
          error: done,
        });

      const req = httpMock.expectOne(environment.formsubmitEndpoint);
      const formData = req.request.body as FormData;
      expect(formData.get('policy_accepted')).toBe('Nein');

      req.flush(mockResponse);
    });

    it('should handle string response from Formsubmit', done => {
      const stringResponse = '<html>Success page</html>';

      (service as any)
        .sendWithFormsubmit('Test', 'test@example.com', 'message', true)
        .subscribe({
          next: (response: any) => {
            expect(response).toEqual({
              success: true,
              message: 'Email sent successfully',
            });
            done();
          },
          error: done,
        });

      const req = httpMock.expectOne(environment.formsubmitEndpoint);
      req.flush(stringResponse);
    });

    it('should handle JSON response from Formsubmit', done => {
      const jsonResponse = { success: true, id: '12345' };

      (service as any)
        .sendWithFormsubmit('Test', 'test@example.com', 'message', true)
        .subscribe({
          next: (response: any) => {
            expect(response).toEqual(jsonResponse);
            done();
          },
          error: done,
        });

      const req = httpMock.expectOne(environment.formsubmitEndpoint);
      req.flush(jsonResponse);
    });

    it('should handle HTTP error with status 200', done => {
      (service as any)
        .sendWithFormsubmit('Test', 'test@example.com', 'message', true)
        .subscribe({
          next: (response: any) => {
            expect(response).toEqual({
              success: true,
              message: 'Email sent successfully',
            });
            done();
          },
          error: done,
        });

      const req = httpMock.expectOne(environment.formsubmitEndpoint);
      req.flush('Error', { status: 200, statusText: 'OK' });
    });

    it('should handle HTTP error with status 0', done => {
      (service as any)
        .sendWithFormsubmit('Test', 'test@example.com', 'message', true)
        .subscribe({
          next: (response: any) => {
            expect(response).toEqual({
              success: true,
              message: 'Email sent successfully',
            });
            done();
          },
          error: done,
        });

      const req = httpMock.expectOne(environment.formsubmitEndpoint);
      req.flush('Network Error', { status: 0, statusText: 'Unknown Error' });
    });

    it('should throw error for non-200/0 HTTP status codes', done => {
      (service as any)
        .sendWithFormsubmit('Test', 'test@example.com', 'message', true)
        .subscribe({
          next: () => done(),
          error: (error: any) => {
            expect(error.status).toBe(400);
            done();
          },
        });

      const req = httpMock.expectOne(environment.formsubmitEndpoint);
      req.flush('Bad Request', { status: 400, statusText: 'Bad Request' });
    });
  });
});
