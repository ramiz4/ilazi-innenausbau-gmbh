import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, timer } from 'rxjs';
import {
  catchError,
  filter,
  map,
  shareReplay,
  startWith,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs/operators';
import { EmailService } from './email.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  imports: [CommonModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent {
  private readonly submitTrigger$ = new Subject<void>();
  private readonly formResetTrigger$ = new Subject<void>();

  readonly contactForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required]],
    policy: [false, Validators.requiredTrue],
  });

  // Reactive state streams
  private readonly submissionState$ = this.submitTrigger$.pipe(
    filter(() => this.contactForm.valid),
    switchMap(() => {
      const formValue = this.contactForm.value;
      return this.emailService
        .sendEmail(
          formValue.name || '',
          formValue.email || '',
          formValue.message || '',
          formValue.policy || false
        )
        .pipe(
          map(() => ({ success: true, error: null, loading: false })),
          catchError(error => {
            console.error(error);
            return [
              {
                success: false,
                error:
                  'Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.',
                loading: false,
              },
            ];
          }),
          startWith({ success: false, error: null, loading: true }),
          tap(state => {
            // Trigger form reset when submission is successful
            if (state.success) {
              this.formResetTrigger$.next();
            }
          })
        );
    }),
    startWith({ success: false, error: null, loading: false }),
    shareReplay(1)
  );

  // Derived observables for template
  readonly loading$ = this.submissionState$.pipe(map(state => state.loading));

  readonly error$ = this.submissionState$.pipe(map(state => state.error));

  readonly sent$ = this.submissionState$.pipe(
    switchMap(state =>
      state.success
        ? timer(0, 5000).pipe(
            map(tick => tick === 0),
            takeUntil(this.submitTrigger$)
          )
        : [false]
    )
  );

  constructor(
    private formBuilder: FormBuilder,
    private emailService: EmailService
  ) {}

  get name() {
    return this.contactForm.get('name');
  }

  get email() {
    return this.contactForm.get('email');
  }

  get message() {
    return this.contactForm.get('message');
  }

  get policy() {
    return this.contactForm.get('policy');
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      this.submitTrigger$.next();
    }
  }
}
