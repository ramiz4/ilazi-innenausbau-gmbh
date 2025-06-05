import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';

interface Testimonial {
  quote: string;
  author: string;
  location: string;
  project: string;
}

@Component({
    selector: 'app-references',
    templateUrl: './references.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styles: [
        `
      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes fadeInDelay {
        from {
          opacity: 0;
          transform: translateY(15px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .animate-fade-in {
        animation: fadeIn 0.8s ease-out;
      }

      .animate-fade-in-delay {
        animation: fadeInDelay 0.8s ease-out 0.2s both;
      }

      .testimonials-carousel {
        position: relative;
      }

      .testimonials-carousel::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(
          45deg,
          rgba(185, 28, 28, 0.1) 0%,
          rgba(185, 28, 28, 0.05) 100%
        );
        pointer-events: none;
        animation: shimmer 3s ease-in-out infinite;
      }

      @keyframes shimmer {
        0%,
        100% {
          opacity: 0.1;
        }
        50% {
          opacity: 0.3;
        }
      }
    `,
    ],
    standalone: true,
    imports: [CommonModule]
})
export class ReferencesComponent implements OnInit, OnDestroy {
  currentTestimonialIndex = 0;
  private autoRotateInterval?: number;
  private readonly AUTO_ROTATE_DELAY = 6000; // 6 seconds
  isAnimating = false;
  isTransitioning = false;

  constructor(private cdr: ChangeDetectorRef) {}

  testimonials: Testimonial[] = [
    {
      quote:
        'Ich war super zufrieden mit der Arbeit, die das Team von Ilazi Innenausbau GmbH in meiner Praxis in Spreitenbach geleistet hat. Von der Beratung bis zur Umsetzung war alles perfekt.',
      author: 'Martina D.',
      location: 'Spreitenbach, Schweiz',
      project: 'Praxisrenovierung',
    },
    {
      quote:
        'Die Renovierung unserer Büroräume war ein voller Erfolg. Das Team hat professionell und sauber gearbeitet, der Zeitplan wurde eingehalten und das Ergebnis übertrifft unsere Erwartungen.',
      author: 'Stefan M.',
      location: 'Zürich, Schweiz',
      project: 'Bürorenovierung',
    },
    {
      quote:
        'Unser Badezimmer wurde komplett umgestaltet - moderne Fliesen, neue Sanitäranlagen und durchdachte Beleuchtung. Wir sind begeistert von der Qualität und dem Service!',
      author: 'Familie Weber',
      location: 'Baden, Schweiz',
      project: 'Badezimmersanierung',
    },
    {
      quote:
        'Das Restaurant wurde termingerecht und im Budget renoviert. Die Handwerker waren sehr professionell und haben auch auf unsere speziellen Wünsche eingegangen.',
      author: 'Marco P.',
      location: 'Winterthur, Schweiz',
      project: 'Restaurantrenovierung',
    },
    {
      quote:
        'Vom ersten Beratungsgespräch bis zur finalen Abnahme - alles lief reibungslos. Die Küche unserer Träume ist Realität geworden. Vielen Dank für die hervorragende Arbeit!',
      author: 'Anna und Thomas K.',
      location: 'Aarau, Schweiz',
      project: 'Küchenumbau',
    },
  ];

  ngOnInit(): void {
    this.startAutoRotate();
  }

  ngOnDestroy(): void {
    this.stopAutoRotate();
  }

  nextTestimonial(): void {
    if (this.isAnimating) return;
    this.animateTransition(() => {
      this.currentTestimonialIndex =
        (this.currentTestimonialIndex + 1) % this.testimonials.length;
    });
    this.restartAutoRotate();
  }

  previousTestimonial(): void {
    if (this.isAnimating) return;
    this.animateTransition(() => {
      this.currentTestimonialIndex =
        this.currentTestimonialIndex === 0
          ? this.testimonials.length - 1
          : this.currentTestimonialIndex - 1;
    });
    this.restartAutoRotate();
  }

  setTestimonial(index: number): void {
    if (this.isAnimating || index === this.currentTestimonialIndex) return;
    this.animateTransition(() => {
      this.currentTestimonialIndex = index;
    });
    this.restartAutoRotate();
  }

  get currentTestimonial(): Testimonial {
    return this.testimonials[this.currentTestimonialIndex];
  }

  private animateTransition(changeCallback: () => void): void {
    this.isAnimating = true;
    this.isTransitioning = true;
    this.cdr.markForCheck(); // Trigger change detection for fade-out

    // Wait for fade out animation to complete, then change content
    setTimeout(() => {
      changeCallback();
      this.isTransitioning = false;
      this.cdr.markForCheck(); // Trigger change detection for content change and fade-in

      // Wait for fade in animation to complete
      setTimeout(() => {
        this.isAnimating = false;
        this.cdr.markForCheck(); // Trigger change detection for animation completion
      }, 500);
    }, 250);
  }

  private startAutoRotate(): void {
    this.autoRotateInterval = window.setInterval(() => {
      if (!this.isAnimating) {
        this.animateTransition(() => {
          this.currentTestimonialIndex =
            (this.currentTestimonialIndex + 1) % this.testimonials.length;
        });
      }
    }, this.AUTO_ROTATE_DELAY);
  }

  private stopAutoRotate(): void {
    if (this.autoRotateInterval) {
      clearInterval(this.autoRotateInterval);
      this.autoRotateInterval = undefined;
    }
  }

  private restartAutoRotate(): void {
    this.stopAutoRotate();
    this.startAutoRotate();
  }
}
