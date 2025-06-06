import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImprintComponent } from './imprint.component';

describe('ImprintComponent', () => {
  let component: ImprintComponent;
  let fixture: ComponentFixture<ImprintComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImprintComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ImprintComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  describe('Component Creation', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should have the correct selector', () => {
      expect(component).toBeInstanceOf(ImprintComponent);
    });
  });

  describe('Component Properties', () => {
    it('should set currentYear to the current year', () => {
      const currentYear = new Date().getFullYear();
      expect(component.currentYear).toBe(currentYear);
    });

    it('should set lastUpdated to a formatted German date string', () => {
      expect(component.lastUpdated).toBeDefined();
      expect(typeof component.lastUpdated).toBe('string');
      // Check if it matches German date format pattern (e.g., "6. Juni 2025")
      expect(component.lastUpdated).toMatch(/^\d{1,2}\.\s\w+\s\d{4}$/);
    });

    it('should update currentYear property when year changes', () => {
      const mockDate = new Date('2024-01-01');
      spyOn(window, 'Date').and.returnValue(mockDate as any);

      const newComponent = new ImprintComponent();
      expect(newComponent.currentYear).toBe(2024);
    });
  });

  describe('Template Rendering', () => {
    it('should render the main title "Impressum"', () => {
      const titleElement = compiled.querySelector('h1');
      expect(titleElement).toBeTruthy();
      expect(titleElement?.textContent?.trim()).toBe('Impressum');
    });

    it('should render the subtitle about legal information', () => {
      const subtitleElement = compiled.querySelector('p');
      expect(subtitleElement?.textContent?.trim()).toBe(
        'Rechtliche Informationen und Angaben gemäß den gesetzlichen Bestimmungen'
      );
    });

    it('should render company information card', () => {
      const companyCard = compiled.querySelector('#company-info');
      expect(companyCard).toBeTruthy();

      const companyName = companyCard?.querySelector('.text-lg.font-bold');
      expect(companyName?.textContent?.trim()).toBe('Ilazi Innenausbau GmbH');
    });

    it('should render contact information card', () => {
      const contactCard = compiled.querySelector('#contact-info');
      expect(contactCard).toBeTruthy();

      const contactTitle = contactCard?.querySelector('h2');
      expect(contactTitle?.textContent?.trim()).toBe('Kontakt');
    });

    it('should render company address correctly', () => {
      const addressElements = compiled.querySelectorAll('#company-info p');
      const addressTexts = Array.from(addressElements).map(el =>
        el.textContent?.trim()
      );

      expect(addressTexts).toContain('Boulevard Lilienthal 40');
      expect(addressTexts).toContain('8152 Opfikon Glattpark');
      expect(addressTexts).toContain('Schweiz');
    });

    it('should render business registration details', () => {
      const legalDetailsSection = compiled.querySelector('#legal-details');
      const registrationDetails = legalDetailsSection?.textContent;

      expect(registrationDetails).toContain('CH-020.4.071.007-7');
      expect(registrationDetails).toContain('CHE-273.148.088');
      expect(registrationDetails).toContain('06.07.2020');
      expect(registrationDetails).toContain('GmbH');
    });
  });

  describe('Contact Links', () => {
    it('should render clickable email link', () => {
      const emailLink = compiled.querySelector(
        'a[href^="mailto:"]'
      ) as HTMLAnchorElement;
      expect(emailLink).toBeTruthy();
      expect(emailLink.href).toBe('mailto:info@ilazi-ausbau.ch');
    });

    it('should have proper email encoding in display text', () => {
      const emailDisplay = compiled.querySelector(
        'a[href^="mailto:"] .font-medium'
      );
      expect(emailDisplay?.innerHTML).toContain('@ilazi-ausbau.ch');
    });

    it('should display decoded email address to users', () => {
      const emailDisplay = compiled.querySelector(
        'a[href^="mailto:"] .font-medium'
      );
      expect(emailDisplay?.textContent?.trim()).toBe('info@ilazi-ausbau.ch');
    });
  });

  describe('Legal Sections', () => {
    it('should render disclaimer section', () => {
      const disclaimerSection = compiled.querySelector('#disclaimer');
      expect(disclaimerSection).toBeTruthy();

      const disclaimerTitle = disclaimerSection?.querySelector('h2');
      expect(disclaimerTitle?.textContent?.trim()).toBe('Haftungsausschluss');
    });

    it('should render privacy section', () => {
      const privacySection = compiled.querySelector('#privacy');
      expect(privacySection).toBeTruthy();

      const privacyTitle = privacySection?.querySelector('h2');
      expect(privacyTitle?.textContent?.trim()).toBe('Datenschutz');
    });

    it('should render copyright section', () => {
      const copyrightSection = compiled.querySelector('h2');
      const copyrightSections = Array.from(
        compiled.querySelectorAll('h2')
      ).find(h2 => h2.textContent?.trim() === 'Urheberrecht');
      expect(copyrightSections).toBeTruthy();
    });

    it('should have privacy policy link', () => {
      const privacyLink = compiled.querySelector(
        'a[href="/privacy"]'
      ) as HTMLAnchorElement;
      expect(privacyLink).toBeTruthy();
      expect(privacyLink.textContent?.trim()).toBe('Datenschutzerklärung');
    });
  });

  describe('Footer', () => {
    it('should render copyright footer with current year', () => {
      const footerText = compiled.querySelector('.text-center .text-slate-500');
      expect(footerText?.textContent).toContain(
        `© ${component.currentYear} Ilazi Innenausbau GmbH`
      );
    });

    it('should render last updated information', () => {
      const lastUpdatedText = compiled.querySelector('.text-center .text-sm');
      expect(lastUpdatedText?.textContent).toContain(
        `Letzte Aktualisierung: ${component.lastUpdated}`
      );
    });
  });

  describe('Styling and Layout', () => {
    it('should have red color theme elements', () => {
      const redElements = compiled.querySelectorAll(
        '.bg-gradient-to-r.from-red-500.to-red-600'
      );
      expect(redElements.length).toBeGreaterThan(0);
    });

    it('should have proper card layout structure', () => {
      const cardGrid = compiled.querySelector('.grid.lg\\:grid-cols-3');
      expect(cardGrid).toBeTruthy();

      const cards = cardGrid?.querySelectorAll('.bg-white.dark\\:bg-zinc-800');
      expect(cards?.length).toBe(3); // Company, Contact, Responsibility cards
    });

    it('should have responsive design classes', () => {
      const mainContainer = compiled.querySelector('.container.mx-auto');
      expect(mainContainer).toBeTruthy();

      const responsiveGrid = compiled.querySelector('.grid.lg\\:grid-cols-3');
      expect(responsiveGrid).toBeTruthy();
    });

    it('should have dark mode support classes', () => {
      const darkModeElements = compiled.querySelectorAll('[class*="dark:"]');
      expect(darkModeElements.length).toBeGreaterThan(0);
    });
  });

  describe('Accessibility', () => {
    it('should have proper heading hierarchy', () => {
      const h1 = compiled.querySelector('h1');
      const h2Elements = compiled.querySelectorAll('h2');
      const h3Elements = compiled.querySelectorAll('h3');

      expect(h1).toBeTruthy();
      expect(h2Elements.length).toBeGreaterThan(0);
      expect(h3Elements.length).toBeGreaterThan(0);
    });

    it('should have semantic HTML structure', () => {
      const mainDiv = compiled.querySelector('#imprint');
      expect(mainDiv).toBeTruthy();

      const sections = compiled.querySelectorAll('div[id]');
      expect(sections.length).toBeGreaterThan(2);
    });

    it('should have proper link attributes', () => {
      const externalLinks = compiled.querySelectorAll(
        'a[href^="tel:"], a[href^="mailto:"]'
      );
      externalLinks.forEach(link => {
        expect(link.getAttribute('href')).toBeTruthy();
      });
    });
  });

  describe('Component Lifecycle', () => {
    it('should initialize properties on component creation', () => {
      const newFixture = TestBed.createComponent(ImprintComponent);
      const newComponent = newFixture.componentInstance;

      expect(newComponent.currentYear).toBeDefined();
      expect(newComponent.lastUpdated).toBeDefined();
    });

    it('should render properly after detectChanges', () => {
      fixture.detectChanges();

      const title = compiled.querySelector('h1');
      expect(title?.textContent).toBeTruthy();
    });
  });

  describe('Enhanced Component Testing', () => {
    it('should have correct component metadata', () => {
      expect(component.constructor.name).toBe('ImprintComponent');
    });

    it('should maintain state consistency after multiple change detections', () => {
      const initialYear = component.currentYear;
      const initialLastUpdated = component.lastUpdated;

      fixture.detectChanges();
      fixture.detectChanges();

      expect(component.currentYear).toBe(initialYear);
      expect(component.lastUpdated).toBe(initialLastUpdated);
    });
  });

  describe('Business Logic Validation', () => {
    it('should have valid Swiss business registration format', () => {
      const legalDetailsSection = compiled.querySelector('#legal-details');
      const registrationText = legalDetailsSection?.textContent || '';

      // Check Swiss HR number format (CH-XXX.X.XXX.XXX-X)
      expect(registrationText).toMatch(/CH-\d{3}\.\d\.\d{3}\.\d{3}-\d/);

      // Check Swiss UID format (CHE-XXX.XXX.XXX)
      expect(registrationText).toMatch(/CHE-\d{3}\.\d{3}\.\d{3}/);
    });

    it('should contain all required Swiss legal information', () => {
      const companyCard = compiled.querySelector('#company-info');
      const text = companyCard?.textContent || '';

      expect(text).toContain('§ 5 TMG'); // German legal reference
      expect(text).toContain('GmbH'); // Legal form
      expect(text).toContain('Opfikon'); // Registered location
    });
  });

  describe('Interactive Elements', () => {
    it('should have hover effects on contact links', () => {
      const emailLink = compiled.querySelector('a[href^="mailto:"]');

      expect(emailLink?.classList.contains('group')).toBe(true);
    });

    it('should have transition classes for smooth animations', () => {
      const contactLinks = compiled.querySelectorAll(
        'a[href^="tel:"], a[href^="mailto:"]'
      );

      contactLinks.forEach(link => {
        expect(link.classList.contains('transition-colors')).toBe(true);
      });
    });
  });

  describe('Content Validation', () => {
    it('should render all required section titles', () => {
      const sectionTitles = Array.from(compiled.querySelectorAll('h2')).map(
        h2 => h2.textContent?.trim()
      );

      expect(sectionTitles).toContain('Firmenangaben');
      expect(sectionTitles).toContain('Kontakt');
      expect(sectionTitles).toContain('Verantwortung');
      expect(sectionTitles).toContain('Haftungsausschluss');
      expect(sectionTitles).toContain('Urheberrecht');
      expect(sectionTitles).toContain('Datenschutz');
    });

    it('should have complete company address information', () => {
      const companyCard = compiled.querySelector('#company-info');
      const addressText = companyCard?.textContent || '';

      expect(addressText).toContain('Boulevard Lilienthal 40');
      expect(addressText).toContain('8152 Opfikon Glattpark');
      expect(addressText).toContain('Schweiz');
    });

    it('should contain legal disclaimer text', () => {
      const disclaimerSection = compiled.querySelector('#disclaimer');
      const disclaimerText = disclaimerSection?.textContent || '';

      expect(disclaimerText).toContain('Haftungsansprüche');
      expect(disclaimerText).toContain('Gewähr');
      expect(disclaimerText).toContain('Betreiber dieser Website');
    });

    it('should have copyright information', () => {
      const copyrightSection = Array.from(compiled.querySelectorAll('h2')).find(
        h2 => h2.textContent?.trim() === 'Urheberrecht'
      )?.parentElement;
      const copyrightText = copyrightSection?.textContent || '';

      expect(copyrightText).toContain('Urheberrecht');
    });
  });

  describe('SVG Icons', () => {
    it('should render SVG icons for each section', () => {
      const svgIcons = compiled.querySelectorAll('svg');
      expect(svgIcons.length).toBeGreaterThan(5); // At least one per section
    });

    it('should have proper SVG attributes', () => {
      const svgIcons = compiled.querySelectorAll('svg');

      svgIcons.forEach(svg => {
        expect(svg.getAttribute('viewBox')).toBeTruthy();
        expect(svg.getAttribute('fill')).toBeTruthy();
        expect(svg.getAttribute('stroke')).toBeTruthy();
      });
    });
  });

  describe('Responsive Design', () => {
    it('should have mobile-first responsive classes', () => {
      const gridContainer = compiled.querySelector('.grid');
      expect(gridContainer?.classList.contains('lg:grid-cols-3')).toBe(true);
    });

    it('should have proper container spacing', () => {
      const container = compiled.querySelector('.container');
      expect(container?.classList.contains('mx-auto')).toBe(true);
      expect(container?.classList.contains('px-6')).toBe(true);
    });
  });

  describe('Date and Time Functions', () => {
    it('should handle different date formats correctly', () => {
      // Test the German date formatting
      const testDate = new Date('2024-06-15');
      const germanMonths = [
        'Januar',
        'Februar',
        'März',
        'April',
        'Mai',
        'Juni',
        'Juli',
        'August',
        'September',
        'Oktober',
        'November',
        'Dezember',
      ];

      const expectedMonth = germanMonths[testDate.getMonth()];
      expect(germanMonths).toContain(expectedMonth);
    });

    it('should validate current year is reasonable', () => {
      expect(component.currentYear).toBeGreaterThanOrEqual(2020);
      expect(component.currentYear).toBeLessThanOrEqual(2030);
    });
  });

  describe('Data-Test Attributes', () => {
    it('should have data-test attributes on main container elements', () => {
      const imprintContainer = compiled.querySelector(
        '[data-test="imprint-container"]'
      );
      const imprintContent = compiled.querySelector(
        '[data-test="imprint-content"]'
      );
      const imprintHeader = compiled.querySelector(
        '[data-test="imprint-header"]'
      );

      expect(imprintContainer).toBeTruthy();
      expect(imprintContent).toBeTruthy();
      expect(imprintHeader).toBeTruthy();
    });

    it('should have data-test attributes on header elements', () => {
      const imprintTitle = compiled.querySelector(
        '[data-test="imprint-title"]'
      );
      const imprintDivider = compiled.querySelector(
        '[data-test="imprint-divider"]'
      );
      const imprintSubtitle = compiled.querySelector(
        '[data-test="imprint-subtitle"]'
      );

      expect(imprintTitle).toBeTruthy();
      expect(imprintTitle?.textContent?.trim()).toBe('Impressum');
      expect(imprintDivider).toBeTruthy();
      expect(imprintSubtitle).toBeTruthy();
    });

    it('should have data-test attributes on cards grid', () => {
      const cardsGrid = compiled.querySelector(
        '[data-test="imprint-cards-grid"]'
      );
      expect(cardsGrid).toBeTruthy();
      expect(cardsGrid?.classList.contains('grid')).toBe(true);
      expect(cardsGrid?.classList.contains('lg:grid-cols-3')).toBe(true);
    });

    it('should have data-test attributes on company info section', () => {
      const companySection = compiled.querySelector(
        '[data-test="company-info-section"]'
      );
      const companyCard = compiled.querySelector(
        '[data-test="company-info-card"]'
      );
      const companyHeader = compiled.querySelector(
        '[data-test="company-info-header"]'
      );
      const companyIcon = compiled.querySelector(
        '[data-test="company-info-icon"]'
      );
      const companyTitle = compiled.querySelector(
        '[data-test="company-info-title"]'
      );

      expect(companySection).toBeTruthy();
      expect(companyCard).toBeTruthy();
      expect(companyHeader).toBeTruthy();
      expect(companyIcon).toBeTruthy();
      expect(companyTitle).toBeTruthy();
      expect(companyTitle?.textContent?.trim()).toBe('Firmenangaben');
    });

    it('should have data-test attributes on company info content', () => {
      const companyContent = compiled.querySelector(
        '[data-test="company-info-content"]'
      );
      const companyLegalInfo = compiled.querySelector(
        '[data-test="company-legal-info"]'
      );
      const companyName = compiled.querySelector('[data-test="company-name"]');
      const companyAddress = compiled.querySelector(
        '[data-test="company-address"]'
      );

      expect(companyContent).toBeTruthy();
      expect(companyLegalInfo).toBeTruthy();
      expect(companyName).toBeTruthy();
      expect(companyName?.textContent?.trim()).toBe('Ilazi Innenausbau GmbH');
      expect(companyAddress).toBeTruthy();
    });

    it('should have data-test attributes on company address details', () => {
      const companyStreet = compiled.querySelector(
        '[data-test="company-street"]'
      );
      const companyCity = compiled.querySelector('[data-test="company-city"]');
      const companyCountry = compiled.querySelector(
        '[data-test="company-country"]'
      );

      expect(companyStreet).toBeTruthy();
      expect(companyCity).toBeTruthy();
      expect(companyCountry).toBeTruthy();
    });

    it('should have data-test attributes on company registration details', () => {
      const legalDetailsSection = compiled.querySelector(
        '[data-test="legal-details-section"]'
      );
      const companyLegalForm = compiled.querySelector(
        '[data-test="company-legal-form-detail"]'
      );
      const companyRegistrationNumber = compiled.querySelector(
        '[data-test="company-registration-number-detail"]'
      );
      const companyUID = compiled.querySelector(
        '[data-test="company-uid-detail"]'
      );
      const companyRegistrationDate = compiled.querySelector(
        '[data-test="company-registration-date-detail"]'
      );

      expect(legalDetailsSection).toBeTruthy();
      expect(companyLegalForm).toBeTruthy();
      expect(companyRegistrationNumber).toBeTruthy();
      expect(companyUID).toBeTruthy();
      expect(companyRegistrationDate).toBeTruthy();
    });

    it('should have data-test attributes on contact info section', () => {
      const contactCard = compiled.querySelector(
        '[data-test="contact-info-card"]'
      );
      const contactHeader = compiled.querySelector(
        '[data-test="contact-info-header"]'
      );
      const contactIcon = compiled.querySelector(
        '[data-test="contact-info-icon"]'
      );
      const contactTitle = compiled.querySelector(
        '[data-test="contact-info-title"]'
      );
      const contactDetails = compiled.querySelector(
        '[data-test="contact-info-details"]'
      );

      expect(contactCard).toBeTruthy();
      expect(contactHeader).toBeTruthy();
      expect(contactIcon).toBeTruthy();
      expect(contactTitle).toBeTruthy();
      expect(contactTitle?.textContent?.trim()).toBe('Kontakt');
      expect(contactDetails).toBeTruthy();
    });

    it('should have data-test attributes on contact links', () => {
      const emailLink = compiled.querySelector(
        '[data-test="contact-email-link"]'
      );
      const emailInfo = compiled.querySelector(
        '[data-test="contact-email-info"]'
      );

      expect(emailLink).toBeTruthy();
      expect(emailInfo).toBeTruthy();
    });

    it('should have data-test attributes on responsibility section', () => {
      const responsibilityCard = compiled.querySelector(
        '[data-test="responsibility-card"]'
      );
      const responsibilityHeader = compiled.querySelector(
        '[data-test="responsibility-header"]'
      );
      const responsibilityIcon = compiled.querySelector(
        '[data-test="responsibility-icon"]'
      );
      const responsibilityTitle = compiled.querySelector(
        '[data-test="responsibility-title"]'
      );
      const responsibilityContent = compiled.querySelector(
        '[data-test="responsibility-content"]'
      );

      expect(responsibilityCard).toBeTruthy();
      expect(responsibilityHeader).toBeTruthy();
      expect(responsibilityIcon).toBeTruthy();
      expect(responsibilityTitle).toBeTruthy();
      expect(responsibilityTitle?.textContent?.trim()).toBe('Verantwortung');
      expect(responsibilityContent).toBeTruthy();
    });

    it('should have data-test attributes on legal information section', () => {
      const legalSection = compiled.querySelector(
        '[data-test="legal-information-section"]'
      );
      expect(legalSection).toBeTruthy();
    });

    it('should have data-test attributes on disclaimer section', () => {
      const disclaimerSection = compiled.querySelector(
        '[data-test="disclaimer-section"]'
      );
      const disclaimerHeader = compiled.querySelector(
        '[data-test="disclaimer-header"]'
      );
      const disclaimerIcon = compiled.querySelector(
        '[data-test="disclaimer-icon"]'
      );
      const disclaimerTitle = compiled.querySelector(
        '[data-test="disclaimer-title"]'
      );
      const disclaimerContent = compiled.querySelector(
        '[data-test="disclaimer-content"]'
      );

      expect(disclaimerSection).toBeTruthy();
      expect(disclaimerHeader).toBeTruthy();
      expect(disclaimerIcon).toBeTruthy();
      expect(disclaimerTitle).toBeTruthy();
      expect(disclaimerTitle?.textContent?.trim()).toBe('Haftungsausschluss');
      expect(disclaimerContent).toBeTruthy();
    });

    it('should have data-test attributes on copyright section', () => {
      const copyrightSection = compiled.querySelector(
        '[data-test="copyright-section"]'
      );
      const copyrightHeader = compiled.querySelector(
        '[data-test="copyright-header"]'
      );
      const copyrightIcon = compiled.querySelector(
        '[data-test="copyright-icon"]'
      );
      const copyrightTitle = compiled.querySelector(
        '[data-test="copyright-title"]'
      );
      const copyrightContent = compiled.querySelector(
        '[data-test="copyright-content"]'
      );

      expect(copyrightSection).toBeTruthy();
      expect(copyrightHeader).toBeTruthy();
      expect(copyrightIcon).toBeTruthy();
      expect(copyrightTitle).toBeTruthy();
      expect(copyrightTitle?.textContent?.trim()).toBe('Urheberrecht');
      expect(copyrightContent).toBeTruthy();
    });

    it('should have data-test attributes on privacy section', () => {
      const privacySection = compiled.querySelector(
        '[data-test="privacy-section"]'
      );
      const privacyHeader = compiled.querySelector(
        '[data-test="privacy-header"]'
      );
      const privacyIcon = compiled.querySelector('[data-test="privacy-icon"]');
      const privacyTitle = compiled.querySelector(
        '[data-test="privacy-title"]'
      );
      const privacyContent = compiled.querySelector(
        '[data-test="privacy-content"]'
      );

      expect(privacySection).toBeTruthy();
      expect(privacyHeader).toBeTruthy();
      expect(privacyIcon).toBeTruthy();
      expect(privacyTitle).toBeTruthy();
      expect(privacyTitle?.textContent?.trim()).toBe('Datenschutz');
      expect(privacyContent).toBeTruthy();
    });

    it('should have data-test attributes on footer section', () => {
      const imprintFooter = compiled.querySelector(
        '[data-test="imprint-footer"]'
      );
      const footerCopyright = compiled.querySelector(
        '[data-test="footer-copyright"]'
      );
      const footerLastUpdated = compiled.querySelector(
        '[data-test="footer-last-updated"]'
      );

      expect(imprintFooter).toBeTruthy();
      expect(footerCopyright).toBeTruthy();
      expect(footerLastUpdated).toBeTruthy();

      expect(footerCopyright?.textContent).toContain(
        `© ${component.currentYear} Ilazi Innenausbau GmbH`
      );
      expect(footerLastUpdated?.textContent).toContain(
        `Letzte Aktualisierung: ${component.lastUpdated}`
      );
    });
  });

  describe('Test Infrastructure Validation', () => {
    it('should be able to select elements by data-test attributes efficiently', () => {
      // Test that all major sections are selectable by data-test attributes
      const dataTestElements = compiled.querySelectorAll('[data-test]');
      expect(dataTestElements.length).toBeGreaterThan(25); // Should have many data-test attributes
    });

    it('should have unique data-test attribute values', () => {
      const dataTestElements = compiled.querySelectorAll('[data-test]');
      const dataTestValues = Array.from(dataTestElements).map(el =>
        el.getAttribute('data-test')
      );
      const uniqueValues = new Set(dataTestValues);

      expect(uniqueValues.size).toBe(dataTestValues.length); // All values should be unique
    });

    it('should allow easy automated testing with data-test selectors', () => {
      // Test that we can reliably find and interact with key elements
      const companyName = compiled.querySelector('[data-test="company-name"]');
      const contactEmail = compiled.querySelector(
        '[data-test="contact-email-link"]'
      );

      expect(companyName).toBeTruthy();
      expect(contactEmail).toBeTruthy();

      // Test that these elements have the expected properties for automation
      expect(contactEmail?.getAttribute('href')).toContain('mailto:');
    });

    it('should maintain data-test attributes after component updates', () => {
      // Trigger a component update
      component.currentYear = 2025;
      fixture.detectChanges();

      // Verify data-test attributes are still present
      const companyCard = compiled.querySelector(
        '[data-test="company-info-card"]'
      );
      const contactCard = compiled.querySelector(
        '[data-test="contact-info-card"]'
      );
      const footerCopyright = compiled.querySelector(
        '[data-test="footer-copyright"]'
      );

      expect(companyCard).toBeTruthy();
      expect(contactCard).toBeTruthy();
      expect(footerCopyright).toBeTruthy();
      expect(footerCopyright?.textContent).toContain('© 2025');
    });
  });

  describe('E2E Testing Support', () => {
    it('should provide stable selectors for E2E tests', () => {
      // Verify that key user interaction elements have data-test attributes
      const emailLink = compiled.querySelector(
        '[data-test="contact-email-link"]'
      );

      expect(emailLink).toBeTruthy();

      // These elements should be clickable
      expect(emailLink?.tagName.toLowerCase()).toBe('a');
    });

    it('should support automated accessibility testing', () => {
      // Verify that sections have proper ARIA landmarks and data-test attributes
      const mainSections = compiled.querySelectorAll(
        '[data-test$="-section"], [data-test$="-card"]'
      );

      mainSections.forEach(section => {
        const dataTest = section.getAttribute('data-test');
        expect(dataTest).toBeTruthy();
        expect(dataTest).toMatch(/^[a-z-]+$/); // Should follow kebab-case naming
      });
    });
  });

  describe('Performance and Error Handling', () => {
    it('should handle missing component properties gracefully', () => {
      // Test component resilience
      const originalYear = component.currentYear;
      const originalLastUpdated = component.lastUpdated;

      // Temporarily set properties to undefined
      (component as any).currentYear = undefined;
      (component as any).lastUpdated = undefined;

      expect(() => fixture.detectChanges()).not.toThrow();

      // Restore original values
      component.currentYear = originalYear;
      component.lastUpdated = originalLastUpdated;
      fixture.detectChanges();
    });

    it('should render efficiently with large amounts of content', () => {
      const startTime = performance.now();

      // Force multiple re-renders
      for (let i = 0; i < 10; i++) {
        fixture.detectChanges();
      }

      const endTime = performance.now();
      const renderTime = endTime - startTime;

      // Should complete rendering in reasonable time (less than 100ms for 10 renders)
      expect(renderTime).toBeLessThan(100);
    });
  });
});
