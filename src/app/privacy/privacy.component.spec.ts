import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PrivacyComponent } from './privacy.component';

describe('PrivacyComponent', () => {
  let component: PrivacyComponent;
  let fixture: ComponentFixture<PrivacyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrivacyComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PrivacyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Component Initialization', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should have correct title', () => {
      expect(component.title).toBe('Datenschutzerklärung');
    });

    it('should have contact info configured', () => {
      expect(component.contactInfo).toBeDefined();
      expect(component.contactInfo.company).toBe('Ilazi Innenausbau GmbH');
      expect(component.contactInfo.name).toBe('Adil Ilazi');
      expect(component.contactInfo.email).toBe('info@ilazi-ausbau.ch');
      expect(component.contactInfo.address).toEqual([
        'Mellingerstr. 3',
        '5400 Baden',
      ]);
    });

    it('should have privacy sections configured', () => {
      expect(component.privacySections).toBeDefined();
      expect(component.privacySections.length).toBeGreaterThan(0);
    });

    it('should have source info configured', () => {
      expect(component.sourceInfo).toBeDefined();
      expect(component.sourceInfo.text).toBe('Quelle:');
      expect(component.sourceInfo.link.text).toBe('https://www.e-recht24.de/');
      expect(component.sourceInfo.link.url).toBe('https://www.e-recht24.de/');
    });
  });

  describe('Template Rendering', () => {
    it('should render privacy container', () => {
      const privacyContainer = fixture.debugElement.query(
        By.css('[data-test="privacy-container"]')
      );
      expect(privacyContainer).toBeTruthy();
    });

    it('should render main title', () => {
      const titleElement = fixture.debugElement.query(
        By.css('[data-test="privacy-title"]')
      );
      expect(titleElement).toBeTruthy();
      expect(titleElement.nativeElement.textContent.trim()).toBe(
        'Datenschutzerklärung'
      );
    });

    it('should render privacy sections list', () => {
      const sectionsList = fixture.debugElement.query(
        By.css('[data-test="privacy-sections-list"]')
      );
      expect(sectionsList).toBeTruthy();
    });

    it('should render all privacy sections', () => {
      const sections = fixture.debugElement.queryAll(
        By.css('li[data-test^="privacy-section-"]')
      );
      expect(sections.length).toBe(component.privacySections.length);
    });

    it('should render section titles', () => {
      const sectionTitles = fixture.debugElement.queryAll(
        By.css('[data-test^="privacy-section-title-"]')
      );
      expect(sectionTitles.length).toBe(component.privacySections.length);

      sectionTitles.forEach((titleElement, index) => {
        expect(titleElement.nativeElement.textContent.trim()).toBe(
          component.privacySections[index].title
        );
      });
    });

    it('should render subsections when available', () => {
      const sectionsWithSubsections = component.privacySections.filter(
        section => section.subsections && section.subsections.length > 0
      );

      if (sectionsWithSubsections.length > 0) {
        const subsections = fixture.debugElement.queryAll(
          By.css('[data-test^="privacy-subsection-"]')
        );
        expect(subsections.length).toBeGreaterThan(0);
      }
    });

    it('should render subsection titles', () => {
      const subsectionTitles = fixture.debugElement.queryAll(
        By.css('[data-test^="privacy-subsection-title-"]')
      );

      let expectedSubsectionCount = 0;
      component.privacySections.forEach(section => {
        if (section.subsections) {
          expectedSubsectionCount += section.subsections.length;
        }
      });

      expect(subsectionTitles.length).toBe(expectedSubsectionCount);
    });

    it('should render subsection links when available', () => {
      const subsectionLinks = fixture.debugElement.queryAll(
        By.css('a[data-test^="privacy-subsection-link-"]')
      );

      let expectedLinksCount = 0;
      component.privacySections.forEach(section => {
        if (section.subsections) {
          section.subsections.forEach(subsection => {
            if (subsection.link) {
              expectedLinksCount++;
            }
          });
        }
      });

      expect(subsectionLinks.length).toBe(expectedLinksCount);
    });
  });

  describe('Contact Information Section', () => {
    it('should render contact info section', () => {
      const contactSection = fixture.debugElement.query(
        By.css('[data-test="contact-info-section"]')
      );
      expect(contactSection).toBeTruthy();
    });

    it('should render contact info title', () => {
      const contactTitle = fixture.debugElement.query(
        By.css('[data-test="contact-info-title"]')
      );
      expect(contactTitle).toBeTruthy();
      expect(contactTitle.nativeElement.textContent.trim()).toBe(
        'Verantwortliche Stelle'
      );
    });

    it('should render company name', () => {
      const companyElement = fixture.debugElement.query(
        By.css('[data-test="contact-info-company"]')
      );
      expect(companyElement).toBeTruthy();
      expect(companyElement.nativeElement.textContent.trim()).toBe(
        component.contactInfo.company
      );
    });

    it('should render contact person name', () => {
      const nameElement = fixture.debugElement.query(
        By.css('[data-test="contact-info-name"]')
      );
      expect(nameElement).toBeTruthy();
      expect(nameElement.nativeElement.textContent.trim()).toBe(
        component.contactInfo.name
      );
    });

    it('should render all address lines', () => {
      const addressElements = fixture.debugElement.queryAll(
        By.css('[data-test^="contact-info-address-"]')
      );
      expect(addressElements.length).toBe(component.contactInfo.address.length);

      addressElements.forEach((addressElement, index) => {
        expect(addressElement.nativeElement.textContent.trim()).toBe(
          component.contactInfo.address[index]
        );
      });
    });

    it('should render email as clickable link', () => {
      const emailLink = fixture.debugElement.query(
        By.css('[data-test="contact-info-email-link"]')
      );
      expect(emailLink).toBeTruthy();
      expect(emailLink.nativeElement.href).toBe(
        `mailto:${component.contactInfo.email}`
      );
      expect(emailLink.nativeElement.textContent.trim()).toContain(
        component.contactInfo.email
      );
    });
  });

  describe('Source Information Section', () => {
    it('should render source info section', () => {
      const sourceSection = fixture.debugElement.query(
        By.css('[data-test="source-info-section"]')
      );
      expect(sourceSection).toBeTruthy();
    });

    it('should render source info text', () => {
      const sourceText = fixture.debugElement.query(
        By.css('[data-test="source-info-text"]')
      );
      expect(sourceText).toBeTruthy();
      expect(sourceText.nativeElement.textContent.trim()).toBe(
        component.sourceInfo.text
      );
    });

    it('should render source info link', () => {
      const sourceLink = fixture.debugElement.query(
        By.css('[data-test="source-info-link"]')
      );
      expect(sourceLink).toBeTruthy();
      // Remove trailing slash from href for comparison as browsers may add it
      const actualHref = sourceLink.nativeElement.href.replace(/\/$/, '');
      const expectedHref = component.sourceInfo.link.url.replace(/\/$/, '');
      expect(actualHref).toBe(expectedHref);
      expect(sourceLink.nativeElement.textContent.trim()).toBe(
        component.sourceInfo.link.text
      );
      expect(sourceLink.nativeElement.target).toBe('_blank');
      expect(sourceLink.nativeElement.rel).toBe('noopener noreferrer');
    });
  });

  describe('Accessibility and SEO', () => {
    it('should have proper heading hierarchy', () => {
      const h1 = fixture.debugElement.query(By.css('h1'));
      const h2s = fixture.debugElement.queryAll(By.css('h2'));
      const h3s = fixture.debugElement.queryAll(By.css('h3'));

      expect(h1).toBeTruthy();
      expect(h2s.length).toBeGreaterThan(0);
      expect(h3s.length).toBeGreaterThan(0);
    });

    it('should have external links with proper security attributes', () => {
      const externalLinks = fixture.debugElement.queryAll(
        By.css('a[target="_blank"]')
      );

      externalLinks.forEach(link => {
        expect(link.nativeElement.rel).toBe('noopener noreferrer');
      });
    });

    it('should render content with innerHTML safely', () => {
      const contentElements = fixture.debugElement.queryAll(
        By.css(
          '[data-test^="privacy-section-content-"], [data-test^="privacy-subsection-content-"]'
        )
      );

      contentElements.forEach(element => {
        expect(element.nativeElement.innerHTML).toBeDefined();
      });
    });
  });

  describe('Data Structure Validation', () => {
    it('should have valid privacy section structure', () => {
      component.privacySections.forEach(section => {
        expect(section.title).toBeDefined();
        expect(typeof section.title).toBe('string');
        expect(Array.isArray(section.content)).toBe(true);

        if (section.subsections) {
          expect(Array.isArray(section.subsections)).toBe(true);
          section.subsections.forEach(subsection => {
            expect(subsection.title).toBeDefined();
            expect(typeof subsection.title).toBe('string');
            expect(Array.isArray(subsection.content)).toBe(true);

            if (subsection.link) {
              expect(subsection.link.text).toBeDefined();
              expect(subsection.link.url).toBeDefined();
              expect(typeof subsection.link.text).toBe('string');
              expect(typeof subsection.link.url).toBe('string');
            }
          });
        }
      });
    });

    it('should have valid contact info structure', () => {
      const { contactInfo } = component;

      expect(typeof contactInfo.company).toBe('string');
      expect(typeof contactInfo.name).toBe('string');
      expect(typeof contactInfo.email).toBe('string');
      expect(Array.isArray(contactInfo.address)).toBe(true);
      expect(contactInfo.address.length).toBeGreaterThan(0);
    });
  });

  describe('Component Behavior', () => {
    it('should maintain data integrity after component initialization', () => {
      const initialSectionsCount = component.privacySections.length;
      const initialContactInfo = { ...component.contactInfo };
      const initialSourceInfo = { ...component.sourceInfo };

      // Trigger change detection again
      fixture.detectChanges();

      expect(component.privacySections.length).toBe(initialSectionsCount);
      expect(component.contactInfo).toEqual(initialContactInfo);
      expect(component.sourceInfo).toEqual(initialSourceInfo);
    });

    it('should render consistently across multiple change detection cycles', () => {
      const getElementText = (selector: string) => {
        const element = fixture.debugElement.query(By.css(selector));
        return element ? element.nativeElement.textContent.trim() : null;
      };

      const initialTitle = getElementText('[data-test="privacy-title"]');
      const initialCompany = getElementText(
        '[data-test="contact-info-company"]'
      );

      // Trigger multiple change detection cycles
      fixture.detectChanges();
      fixture.detectChanges();

      expect(getElementText('[data-test="privacy-title"]')).toBe(initialTitle);
      expect(getElementText('[data-test="contact-info-company"]')).toBe(
        initialCompany
      );
    });
  });
});
