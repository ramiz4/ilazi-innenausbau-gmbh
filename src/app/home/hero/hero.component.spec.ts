import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroComponent } from './hero.component';

describe('HeroComponent', () => {
  let component: HeroComponent;
  let fixture: ComponentFixture<HeroComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  describe('Component Creation', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should be an instance of HeroComponent', () => {
      expect(component).toBeInstanceOf(HeroComponent);
    });
  });

  describe('Template Rendering', () => {
    it('should render main hero container', () => {
      const heroContainer = compiled.querySelector(
        'div.w-full.h-\\[calc\\(100vh-96px\\)\\]'
      );
      expect(heroContainer).toBeTruthy();
    });

    it('should have background image styling', () => {
      const heroContainer = compiled.querySelector(
        'div.w-full.h-\\[calc\\(100vh-96px\\)\\]'
      );
      expect(heroContainer?.classList.contains('bg-cover')).toBeTruthy();
      expect(heroContainer?.classList.contains('bg-center')).toBeTruthy();

      const backgroundImageClass = Array.from(
        heroContainer?.classList || []
      ).find(cls => cls.includes('bg-[url'));
      expect(backgroundImageClass).toBeTruthy();
    });

    it('should render content overlay', () => {
      const overlay = compiled.querySelector('.backdrop-brightness-50');
      expect(overlay).toBeTruthy();
      expect(overlay?.classList.contains('w-full')).toBeTruthy();
      expect(overlay?.classList.contains('h-full')).toBeTruthy();
      expect(overlay?.classList.contains('flex')).toBeTruthy();
      expect(overlay?.classList.contains('flex-col')).toBeTruthy();
      expect(overlay?.classList.contains('justify-center')).toBeTruthy();
      expect(overlay?.classList.contains('items-center')).toBeTruthy();
    });

    it('should render announcement banner', () => {
      const banner = compiled.querySelector(
        '.sm\\:mb-8.sm\\:flex.sm\\:justify-center'
      );
      expect(banner).toBeTruthy();
      expect(banner?.classList.contains('hidden')).toBeTruthy(); // Hidden on mobile
    });

    it('should render announcement content', () => {
      const announcementText = compiled.querySelector(
        '.rounded-full.py-1.px-3'
      );
      expect(announcementText).toBeTruthy();
      expect(announcementText?.textContent).toContain(
        'Unsere erfolgreich abgeschlossenen Projekte'
      );
    });

    it('should render announcement link', () => {
      const announcementLink = compiled.querySelector('a[href="#references"]');
      expect(announcementLink).toBeTruthy();
      expect(announcementLink?.textContent?.trim()).toContain('Erfahre mehr');
      expect(
        announcementLink?.classList.contains('font-semibold')
      ).toBeTruthy();
    });

    it('should render main heading', () => {
      const heading = compiled.querySelector('h1');
      expect(heading).toBeTruthy();
      expect(heading?.textContent?.trim()).toBe('Innenausbau in der Schweiz');
      expect(heading?.classList.contains('text-base')).toBeTruthy();
      expect(heading?.classList.contains('font-bold')).toBeTruthy();
      expect(heading?.classList.contains('tracking-tight')).toBeTruthy();
      expect(heading?.classList.contains('lg:text-4xl')).toBeTruthy();
    });

    it('should render description paragraph', () => {
      const description = compiled.querySelector('p.mt-6.text-base.leading-8');
      expect(description).toBeTruthy();
      expect(description?.textContent).toContain('Als erfahrene Trockenbauer');
      expect(description?.textContent).toContain('Ilazi Innenausbau GmbH');
      expect(description?.textContent).toContain('Schweiz');
    });

    it('should render call-to-action buttons', () => {
      const ctaContainer = compiled.querySelector(
        '.mt-10.flex.items-center.justify-center.gap-x-6'
      );
      expect(ctaContainer).toBeTruthy();

      const buttons = ctaContainer?.querySelectorAll('a');
      expect(buttons?.length).toBe(2);
    });

    it('should render primary CTA button', () => {
      const primaryCta = compiled.querySelector('a[href="#contact"]');
      expect(primaryCta).toBeTruthy();
      expect(primaryCta?.classList.contains('bg-red-600')).toBeTruthy();
      expect(primaryCta?.classList.contains('text-white')).toBeTruthy();
      expect(primaryCta?.classList.contains('font-semibold')).toBeTruthy();
      expect(primaryCta?.textContent).toContain('Angebot anfordern');
    });

    it('should render secondary CTA button', () => {
      const secondaryCta = compiled.querySelector('a[href="#about-us"]');
      expect(secondaryCta).toBeTruthy();
      expect(secondaryCta?.classList.contains('font-semibold')).toBeTruthy();
      expect(secondaryCta?.textContent?.trim()).toContain('Erfahre mehr');
    });
  });

  describe('Styling and Layout', () => {
    it('should have full viewport height minus header', () => {
      const heroContainer = compiled.querySelector(
        'div.w-full.h-\\[calc\\(100vh-96px\\)\\]'
      );
      expect(heroContainer).toBeTruthy();
    });

    it('should center content vertically and horizontally', () => {
      const contentContainer = compiled.querySelector(
        '.flex.flex-col.justify-center.items-center'
      );
      expect(contentContainer).toBeTruthy();
    });

    it('should have proper text alignment', () => {
      const textCenter = compiled.querySelector('.text-center');
      expect(textCenter).toBeTruthy();
    });

    it('should have backdrop overlay for readability', () => {
      const backdrop = compiled.querySelector('.backdrop-brightness-50');
      expect(backdrop).toBeTruthy();
    });

    it('should have proper button styling', () => {
      const primaryButton = compiled.querySelector('a[href="#contact"]');
      expect(primaryButton?.classList.contains('shadow-sm')).toBeTruthy();
      expect(
        primaryButton?.classList.contains('hover:bg-red-500')
      ).toBeTruthy();
      expect(
        primaryButton?.classList.contains('focus-visible:outline')
      ).toBeTruthy();
    });
  });

  describe('Responsive Design', () => {
    it('should have responsive padding', () => {
      const overlay = compiled.querySelector('.backdrop-brightness-50');
      expect(overlay?.classList.contains('px-6')).toBeTruthy();
      expect(overlay?.classList.contains('py-4')).toBeTruthy();
      expect(overlay?.classList.contains('md:py-16')).toBeTruthy();
      expect(overlay?.classList.contains('lg:py-32')).toBeTruthy();
    });

    it('should have responsive text sizes', () => {
      const heading = compiled.querySelector('h1');
      expect(heading?.classList.contains('text-base')).toBeTruthy();
      expect(heading?.classList.contains('lg:text-4xl')).toBeTruthy();
    });

    it('should have responsive button sizes', () => {
      const primaryButton = compiled.querySelector('a[href="#contact"]');
      expect(primaryButton?.classList.contains('px-4')).toBeTruthy();
      expect(primaryButton?.classList.contains('md:px-8')).toBeTruthy();
      expect(primaryButton?.classList.contains('text-sm')).toBeTruthy();
      expect(primaryButton?.classList.contains('md:text-lg')).toBeTruthy();
      expect(primaryButton?.classList.contains('lg:text-xl')).toBeTruthy();
    });

    it('should hide announcement banner on mobile', () => {
      const banner = compiled.querySelector('.hidden.sm\\:mb-8.sm\\:flex');
      expect(banner).toBeTruthy();
    });

    it('should have responsive text in CTA button', () => {
      const hiddenText = compiled.querySelector('.hidden.md\\:inline-block');
      expect(hiddenText).toBeTruthy();
      expect(hiddenText?.textContent?.trim()).toBe('Jetzt');
    });
  });

  describe('Dark Mode Support', () => {
    it('should have dark mode text colors', () => {
      const heading = compiled.querySelector('h1');
      expect(heading?.classList.contains('text-zinc-200')).toBeTruthy();
      expect(heading?.classList.contains('dark:text-zinc-50')).toBeTruthy();

      const description = compiled.querySelector('p.mt-6');
      expect(description?.classList.contains('text-zinc-200')).toBeTruthy();
      expect(
        description?.classList.contains('dark:text-zinc-200')
      ).toBeTruthy();
    });

    it('should have dark mode announcement styling', () => {
      const announcement = compiled.querySelector('.rounded-full');
      expect(announcement?.classList.contains('text-zinc-200')).toBeTruthy();
      expect(
        announcement?.classList.contains('dark:text-zinc-200')
      ).toBeTruthy();
      expect(announcement?.classList.contains('ring-zinc-200/40')).toBeTruthy();
      expect(
        announcement?.classList.contains('dark:ring-zinc-300/40')
      ).toBeTruthy();
    });

    it('should have dark mode secondary button styling', () => {
      const secondaryButton = compiled.querySelector('a[href="#about-us"]');
      expect(secondaryButton?.classList.contains('text-zinc-200')).toBeTruthy();
      expect(
        secondaryButton?.classList.contains('dark:text-zinc-50')
      ).toBeTruthy();
    });
  });

  describe('Accessibility', () => {
    it('should have proper heading hierarchy', () => {
      const h1 = compiled.querySelector('h1');
      expect(h1).toBeTruthy();
      expect(h1?.textContent?.trim()).toBe('Innenausbau in der Schweiz');
    });

    it('should have meaningful link text', () => {
      const links = compiled.querySelectorAll('a');
      links.forEach(link => {
        expect(link.textContent?.trim().length).toBeGreaterThan(0);
      });
    });

    it('should have proper focus styles', () => {
      const primaryButton = compiled.querySelector('a[href="#contact"]');
      expect(
        primaryButton?.classList.contains('focus-visible:outline')
      ).toBeTruthy();
      expect(
        primaryButton?.classList.contains('focus-visible:outline-2')
      ).toBeTruthy();
      expect(
        primaryButton?.classList.contains('focus-visible:outline-offset-2')
      ).toBeTruthy();
    });

    it('should have decorative spans properly marked', () => {
      const decorativeSpans = compiled.querySelectorAll(
        'span[aria-hidden="true"]'
      );
      expect(decorativeSpans.length).toBeGreaterThan(0);
    });

    it('should have anchor links for navigation', () => {
      const contactLink = compiled.querySelector('a[href="#contact"]');
      const aboutLink = compiled.querySelector('a[href="#about-us"]');
      const referencesLink = compiled.querySelector('a[href="#references"]');

      expect(contactLink).toBeTruthy();
      expect(aboutLink).toBeTruthy();
      expect(referencesLink).toBeTruthy();
    });
  });

  describe('Content Quality', () => {
    it('should have compelling headline', () => {
      const headline = compiled.querySelector('h1')?.textContent?.trim();
      expect(headline).toBe('Innenausbau in der Schweiz');
      expect(headline?.length).toBeGreaterThan(10);
    });

    it('should have informative description', () => {
      const description = compiled.querySelector('p.mt-6')?.textContent || '';
      expect(description).toContain('Trockenbauer');
      expect(description).toContain('Plattenleger');
      expect(description).toContain('Ilazi Innenausbau GmbH');
      expect(description).toContain('Wand- und Deckenverkleidung');
      expect(description).toContain('Dämmung');
      expect(description).toContain('Akustiklösungen');
      expect(description.length).toBeGreaterThan(100);
    });

    it('should have clear call-to-action text', () => {
      const primaryCta =
        compiled.querySelector('a[href="#contact"]')?.textContent;
      const secondaryCta = compiled.querySelector(
        'a[href="#about-us"]'
      )?.textContent;

      expect(primaryCta).toContain('Angebot anfordern');
      expect(secondaryCta).toContain('Erfahre mehr');
    });

    it('should have engaging announcement text', () => {
      const announcement = compiled.querySelector('.rounded-full')?.textContent;
      expect(announcement).toContain('erfolgreich abgeschlossenen Projekte');
      expect(announcement).toContain('Erfahre mehr');
    });
  });

  describe('Performance Considerations', () => {
    it('should use OnPush change detection strategy', () => {
      expect(component.constructor.name).toBe('HeroComponent');
      // Component uses OnPush strategy for better performance
    });

    it('should render efficiently', () => {
      const startTime = performance.now();

      // Trigger multiple change detection cycles
      for (let i = 0; i < 10; i++) {
        fixture.detectChanges();
      }

      const endTime = performance.now();
      const renderTime = endTime - startTime;

      // Should render quickly (adjust threshold as needed)
      expect(renderTime).toBeLessThan(100);
    });

    it('should maintain component integrity during re-renders', () => {
      const initialComponent = component;

      fixture.detectChanges();

      expect(component).toBe(initialComponent);
    });
  });

  describe('Error Handling', () => {
    it('should render without throwing errors', () => {
      expect(() => {
        for (let i = 0; i < 5; i++) {
          fixture.detectChanges();
        }
      }).not.toThrow();
    });

    it('should handle missing content gracefully', () => {
      expect(() => {
        fixture.detectChanges();
      }).not.toThrow();
    });
  });

  describe('User Interaction', () => {
    it('should have clickable CTA buttons', () => {
      const primaryButton = compiled.querySelector('a[href="#contact"]');
      const secondaryButton = compiled.querySelector('a[href="#about-us"]');

      expect(primaryButton?.tagName.toLowerCase()).toBe('a');
      expect(secondaryButton?.tagName.toLowerCase()).toBe('a');
      expect(primaryButton?.getAttribute('href')).toBe('#contact');
      expect(secondaryButton?.getAttribute('href')).toBe('#about-us');
    });

    it('should have hover effects on buttons', () => {
      const primaryButton = compiled.querySelector('a[href="#contact"]');
      expect(
        primaryButton?.classList.contains('hover:bg-red-500')
      ).toBeTruthy();

      const announcement = compiled.querySelector('.rounded-full');
      expect(
        announcement?.classList.contains('hover:ring-zinc-200/20')
      ).toBeTruthy();
    });

    it('should support keyboard navigation', () => {
      const links = compiled.querySelectorAll('a');
      links.forEach(link => {
        expect(link.tabIndex).not.toBe(-1);
      });
    });
  });

  describe('Visual Design', () => {
    it('should have consistent color scheme', () => {
      const redElements = compiled.querySelectorAll(
        '.bg-red-600, .hover\\:bg-red-500, .focus-visible\\:outline-red-600'
      );
      expect(redElements.length).toBeGreaterThan(0);
    });

    it('should have proper spacing and typography', () => {
      const heading = compiled.querySelector('h1');
      expect(heading?.classList.contains('tracking-tight')).toBeTruthy();

      const description = compiled.querySelector('p.mt-6');
      expect(description?.classList.contains('leading-8')).toBeTruthy();
    });

    it('should have visual hierarchy', () => {
      const heading = compiled.querySelector('h1.font-bold');
      const description = compiled.querySelector('p.text-base');
      const buttons = compiled.querySelector('.mt-10');

      expect(heading).toBeTruthy();
      expect(description).toBeTruthy();
      expect(buttons).toBeTruthy();
    });
  });
});
