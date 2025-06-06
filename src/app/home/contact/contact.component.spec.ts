import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ContactComponent } from './contact.component';
import { EmailService } from './email.service';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;
  let compiled: HTMLElement;
  let emailService: EmailService;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, ContactComponent],
      providers: [
        EmailService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;
    emailService = TestBed.inject(EmailService);
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('Component Creation', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should be an instance of ContactComponent', () => {
      expect(component).toBeInstanceOf(ContactComponent);
    });
  });

  describe('Form Initialization', () => {
    it('should initialize contact form', () => {
      expect(component.contactForm).toBeDefined();
      expect(component.contactForm.get('name')).toBeDefined();
      expect(component.contactForm.get('email')).toBeDefined();
      expect(component.contactForm.get('message')).toBeDefined();
      expect(component.contactForm.get('policy')).toBeDefined();
    });

    it('should have form controls with initial empty values', () => {
      expect(component.contactForm.get('name')?.value).toBe('');
      expect(component.contactForm.get('email')?.value).toBe('');
      expect(component.contactForm.get('message')?.value).toBe('');
      expect(component.contactForm.get('policy')?.value).toBe(false);
    });

    it('should have required validators on form fields', () => {
      const nameControl = component.contactForm.get('name');
      const emailControl = component.contactForm.get('email');
      const messageControl = component.contactForm.get('message');

      nameControl?.setValue('');
      emailControl?.setValue('');
      messageControl?.setValue('');

      expect(nameControl?.hasError('required')).toBeTruthy();
      expect(emailControl?.hasError('required')).toBeTruthy();
      expect(messageControl?.hasError('required')).toBeTruthy();
    });

    it('should have email validator on email field', () => {
      const emailControl = component.contactForm.get('email');

      emailControl?.setValue('invalid-email');
      expect(emailControl?.hasError('email')).toBeTruthy();

      emailControl?.setValue('valid@email.com');
      expect(emailControl?.hasError('email')).toBeFalsy();
    });
  });

  describe('Template Rendering', () => {
    it('should render contact form', () => {
      const formElement = compiled.querySelector('form');
      expect(formElement).toBeTruthy();
    });

    it('should render all form fields', () => {
      const nameInput = compiled.querySelector('input[formControlName="name"]');
      const emailInput = compiled.querySelector(
        'input[formControlName="email"]'
      );
      const messageTextarea = compiled.querySelector(
        'textarea[formControlName="message"]'
      );

      expect(nameInput).toBeTruthy();
      expect(emailInput).toBeTruthy();
      expect(messageTextarea).toBeTruthy();
    });

    it('should render form labels', () => {
      const labels = compiled.querySelectorAll('label');
      expect(labels.length).toBeGreaterThanOrEqual(4);
    });

    it('should render submit button', () => {
      const submitButton = compiled.querySelector('button[type="submit"]');
      expect(submitButton).toBeTruthy();
    });
  });
});
