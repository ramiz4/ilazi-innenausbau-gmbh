import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
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

  describe('Form Getters', () => {
    it('should return name control', () => {
      const nameControl = component.name;
      expect(nameControl).toBe(component.contactForm.get('name'));
    });

    it('should return email control', () => {
      const emailControl = component.email;
      expect(emailControl).toBe(component.contactForm.get('email'));
    });

    it('should return message control', () => {
      const messageControl = component.message;
      expect(messageControl).toBe(component.contactForm.get('message'));
    });

    it('should return policy control', () => {
      const policyControl = component.policy;
      expect(policyControl).toBe(component.contactForm.get('policy'));
    });
  });

  describe('Form Submission', () => {
    beforeEach(() => {
      // Set up valid form data
      component.contactForm.patchValue({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Test message',
        policy: true,
      });
    });

    it('should not submit if form is invalid', () => {
      component.contactForm.patchValue({ name: '' }); // Make form invalid
      spyOn(emailService, 'sendEmail');

      component.onSubmit();

      expect(emailService.sendEmail).not.toHaveBeenCalled();
    });

    it('should submit if form is valid', fakeAsync(() => {
      spyOn(emailService, 'sendEmail').and.returnValue(of({}));

      component.onSubmit();
      tick();

      expect(emailService.sendEmail).toHaveBeenCalledWith(
        'John Doe',
        'john@example.com',
        'Test message',
        true
      );
    }));

    it('should handle successful submission', fakeAsync(() => {
      spyOn(emailService, 'sendEmail').and.returnValue(of({}));

      component.onSubmit();
      tick();

      component.loading$.subscribe(loading => {
        expect(loading).toBe(false);
      });

      component.error$.subscribe(error => {
        expect(error).toBeNull();
      });
    }));

    it('should handle submission error', fakeAsync(() => {
      const errorMessage = 'Network error';
      spyOn(emailService, 'sendEmail').and.returnValue(
        throwError(() => new Error(errorMessage))
      );
      spyOn(console, 'error');

      component.onSubmit();
      tick();

      component.error$.subscribe(error => {
        expect(error).toBe(
          'Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.'
        );
      });

      expect(console.error).toHaveBeenCalled();
    }));

    it('should show loading state during submission', fakeAsync(() => {
      spyOn(emailService, 'sendEmail').and.returnValue(of({}));
      let loadingStates: boolean[] = [];

      component.loading$.subscribe(loading => {
        loadingStates.push(loading);
      });

      component.onSubmit();

      // Initial state should be false
      expect(loadingStates[0]).toBe(false);

      tick();

      // Should have loading true and then false states
      expect(loadingStates.some(state => state === true)).toBe(true);
      expect(loadingStates[loadingStates.length - 1]).toBe(false);
    }));

    it('should reset form after successful submission', fakeAsync(() => {
      spyOn(emailService, 'sendEmail').and.returnValue(of({}));

      component.onSubmit();
      tick();

      expect(component.contactForm.get('name')?.value).toBe('');
      expect(component.contactForm.get('email')?.value).toBe('');
      expect(component.contactForm.get('message')?.value).toBe('');
      expect(component.contactForm.get('policy')?.value).toBe(false);
      expect(component.contactForm.pristine).toBe(true);
      expect(component.contactForm.untouched).toBe(true);
    }));
  });

  describe('Component Lifecycle', () => {
    it('should complete destroy subject on ngOnDestroy', () => {
      spyOn(component['destroy$'], 'next');
      spyOn(component['destroy$'], 'complete');

      component.ngOnDestroy();

      expect(component['destroy$'].next).toHaveBeenCalled();
      expect(component['destroy$'].complete).toHaveBeenCalled();
    });
  });

  describe('Observable Streams', () => {
    it('should initialize loading$ observable', () => {
      component.loading$.subscribe(loading => {
        expect(typeof loading).toBe('boolean');
      });
    });

    it('should initialize error$ observable', () => {
      component.error$.subscribe(error => {
        expect(error === null || typeof error === 'string').toBe(true);
      });
    });

    it('should initialize sent$ observable', () => {
      component.sent$.subscribe(sent => {
        expect(typeof sent).toBe('boolean');
      });
    });
  });
});
