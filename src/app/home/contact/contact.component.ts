import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { EmailService } from './email.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule],
})
export class ContactComponent {
  privacyPolicyAgreed = false;

  contactForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required]],
    message: ['', [Validators.required]],
    policy: [false, Validators.requiredTrue],
  });

  error?: string;

  sent = false;

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

  togglePrivacyPolicyAgreement() {
    this.privacyPolicyAgreed = !this.privacyPolicyAgreed;
  }

  onSubmit(): void {
    this.error = undefined;

    const name = this.name?.value ?? '';
    const email = this.email?.value ?? '';
    const message = this.message?.value ?? '';
    const policy = this.policy?.value ?? '';

    if (!policy) {
      console.warn('policy not accepted!');
      this.error = 'Datenschutzerklärung muss zugestimmt werden.';
      return;
    }

    this.emailService.sendEmail(name, email, message, policy).subscribe({
      next: v => {
        console.log(v);
        this.contactForm.reset();
        this.sent = true;
        setTimeout(() => {
          this.sent = false;
        }, 5000);
      },
      error: e => {
        console.error(e);
        this.error = e.error;
      },
      complete: () => console.info('complete'),
    });
  }
}
