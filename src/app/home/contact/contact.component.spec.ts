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

  describe('Branch Coverage Tests', () => {
    it('should handle null/undefined form values with fallback values', fakeAsync(() => {
      // Test the null coalescing operators (||) in sendEmail
      // Mock the form value to return null values to test the || fallbacks
      const originalValue = component.contactForm.value;
      Object.defineProperty(component.contactForm, 'value', {
        get: () => ({
          name: null,
          email: null,
          message: null,
          policy: null,
        }),
        configurable: true,
      });

      // Make form appear valid to pass the filter
      Object.defineProperty(component.contactForm, 'valid', {
        get: () => true,
        configurable: true,
      });

      spyOn(emailService, 'sendEmail').and.returnValue(of({}));

      component.onSubmit();
      tick();

      expect(emailService.sendEmail).toHaveBeenCalledWith('', '', '', false);

      // Restore original value
      Object.defineProperty(component.contactForm, 'value', {
        get: () => originalValue,
        configurable: true,
      });
    }));

    it('should have policy field with requiredTrue validator', () => {
      const policyControl = component.contactForm.get('policy');

      // Test false value (should be invalid)
      policyControl?.setValue(false);
      expect(policyControl?.hasError('required')).toBeTruthy();

      // Test true value (should be valid)
      policyControl?.setValue(true);
      expect(policyControl?.hasError('required')).toBeFalsy();
    });

    it('should trigger form reset only when submission is successful', fakeAsync(() => {
      // Set up form with valid data
      component.contactForm.patchValue({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Test message',
        policy: true,
      });

      spyOn(component['formResetTrigger$'], 'next');
      spyOn(emailService, 'sendEmail').and.returnValue(of({}));

      component.onSubmit();
      tick();

      expect(component['formResetTrigger$'].next).toHaveBeenCalled();
    }));

    it('should not trigger form reset when submission fails', fakeAsync(() => {
      // Set up form with valid data
      component.contactForm.patchValue({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Test message',
        policy: true,
      });

      spyOn(component['formResetTrigger$'], 'next');
      spyOn(emailService, 'sendEmail').and.returnValue(
        throwError(() => new Error('Network error'))
      );

      component.onSubmit();
      tick();

      expect(component['formResetTrigger$'].next).not.toHaveBeenCalled();
    }));

    it('should test sent$ observable timer behavior', fakeAsync(() => {
      // Set up form with valid data
      component.contactForm.patchValue({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Test message',
        policy: true,
      });

      spyOn(emailService, 'sendEmail').and.returnValue(of({}));
      let sentStates: boolean[] = [];

      component.sent$.subscribe(sent => {
        sentStates.push(sent);
      });

      // Initially should be false
      expect(sentStates[0]).toBe(false);

      component.onSubmit();
      tick();

      // After successful submission, should be true initially
      expect(sentStates.some(state => state === true)).toBe(true);

      // After timer, should go back to false
      tick(5000);
      expect(sentStates[sentStates.length - 1]).toBe(false);
    }));

    it('should test sent$ observable when submission is not successful', fakeAsync(() => {
      let sentStates: boolean[] = [];

      component.sent$.subscribe(sent => {
        sentStates.push(sent);
      });

      // Should remain false when no successful submission
      tick(1000);
      expect(sentStates.every(state => state === false)).toBe(true);
    }));

    it('should handle invalid form submission path in onSubmit', () => {
      // Make form invalid
      component.contactForm.patchValue({
        name: '',
        email: 'invalid-email',
        message: '',
        policy: false,
      });

      spyOn(component['submitTrigger$'], 'next');

      component.onSubmit();

      // submitTrigger$ should not be called when form is invalid
      expect(component['submitTrigger$'].next).not.toHaveBeenCalled();
    });

    it('should filter out invalid form submissions in submissionState$', fakeAsync(() => {
      spyOn(emailService, 'sendEmail');

      // Make form invalid
      component.contactForm.patchValue({
        name: '',
        email: '',
        message: '',
        policy: false,
      });

      // Trigger submission directly on the subject (to test filter)
      component['submitTrigger$'].next();
      tick();

      // Email service should not be called due to filter
      expect(emailService.sendEmail).not.toHaveBeenCalled();
    }));
  });
});
