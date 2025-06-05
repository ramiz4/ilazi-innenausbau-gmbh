import { ChangeDetectionStrategy, Component, OnInit, OnDestroy } from '@angular/core';

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
})
export class ReferencesComponent implements OnInit, OnDestroy {
  currentTestimonialIndex = 0;
  private autoRotateInterval?: number;
  private readonly AUTO_ROTATE_DELAY = 6000; // 6 seconds

  testimonials: Testimonial[] = [
    {
      quote: 'Ich war super zufrieden mit der Arbeit, die das Team von Ilazi Innenausbau GmbH in meiner Praxis in Spreitenbach geleistet hat. Von der Beratung bis zur Umsetzung war alles perfekt.',
      author: 'Martina D.',
      location: 'Spreitenbach, Schweiz',
      project: 'Praxisrenovierung'
    },
    {
      quote: 'Die Renovierung unserer Büroräume war ein voller Erfolg. Das Team hat professionell und sauber gearbeitet, der Zeitplan wurde eingehalten und das Ergebnis übertrifft unsere Erwartungen.',
      author: 'Stefan M.',
      location: 'Zürich, Schweiz',
      project: 'Bürorenovierung'
    },
    {
      quote: 'Unser Badezimmer wurde komplett umgestaltet - moderne Fliesen, neue Sanitäranlagen und durchdachte Beleuchtung. Wir sind begeistert von der Qualität und dem Service!',
      author: 'Familie Weber',
      location: 'Baden, Schweiz',
      project: 'Badezimmersanierung'
    },
    {
      quote: 'Das Restaurant wurde termingerecht und im Budget renoviert. Die Handwerker waren sehr professionell und haben auch auf unsere speziellen Wünsche eingegangen.',
      author: 'Marco P.',
      location: 'Winterthur, Schweiz',
      project: 'Restaurantrenovierung'
    },
    {
      quote: 'Vom ersten Beratungsgespräch bis zur finalen Abnahme - alles lief reibungslos. Die Küche unserer Träume ist Realität geworden. Vielen Dank für die hervorragende Arbeit!',
      author: 'Anna und Thomas K.',
      location: 'Aarau, Schweiz',
      project: 'Küchenumbau'
    }
  ];

  ngOnInit(): void {
    this.startAutoRotate();
  }

  ngOnDestroy(): void {
    this.stopAutoRotate();
  }

  nextTestimonial(): void {
    this.currentTestimonialIndex = (this.currentTestimonialIndex + 1) % this.testimonials.length;
    this.restartAutoRotate();
  }

  previousTestimonial(): void {
    this.currentTestimonialIndex = this.currentTestimonialIndex === 0 
      ? this.testimonials.length - 1 
      : this.currentTestimonialIndex - 1;
    this.restartAutoRotate();
  }

  setTestimonial(index: number): void {
    this.currentTestimonialIndex = index;
    this.restartAutoRotate();
  }

  get currentTestimonial(): Testimonial {
    return this.testimonials[this.currentTestimonialIndex];
  }

  private startAutoRotate(): void {
    this.autoRotateInterval = window.setInterval(() => {
      this.currentTestimonialIndex = (this.currentTestimonialIndex + 1) % this.testimonials.length;
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
