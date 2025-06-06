import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutComponent } from './about.component';

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  describe('Component Creation', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should be an instance of AboutComponent', () => {
      expect(component).toBeInstanceOf(AboutComponent);
    });
  });

  describe('Template Rendering', () => {
    it('should render main container with proper styling', () => {
      const container = compiled.querySelector(
        'div.relative.isolate.overflow-hidden'
      );
      expect(container).toBeTruthy();
      expect(container?.classList.contains('bg-white')).toBeTruthy();
      expect(container?.classList.contains('dark:bg-neutral-900')).toBeTruthy();
    });

    it('should render company branding', () => {
      const brandElement = compiled.querySelector(
        'p.text-base.font-semibold.text-red-600'
      );
      expect(brandElement).toBeTruthy();
      expect(brandElement?.textContent?.trim()).toBe('Ilazi Innenausbau GmbH');
    });

    it('should render main heading', () => {
      const heading = compiled.querySelector('h1');
      expect(heading).toBeTruthy();
      expect(heading?.textContent?.trim()).toBe(
        'Willkommen bei Ilazi Innenausbau GmbH'
      );
      expect(heading?.classList.contains('text-3xl')).toBeTruthy();
      expect(heading?.classList.contains('font-bold')).toBeTruthy();
    });

    it('should render company description', () => {
      const description = compiled.querySelector('p.mt-6.text-xl');
      expect(description).toBeTruthy();
      expect(description?.textContent).toContain(
        'Ihrem erfahrenen Partner für Innenausbau'
      );
      expect(description?.textContent).toContain(
        '2021 in Regensdorf gegründet'
      );
    });

    it('should render company image', () => {
      const image = compiled.querySelector('img');
      expect(image).toBeTruthy();
      expect(image?.getAttribute('src')).toBe(
        '../../assets/references/image-001.jpeg'
      );
      expect(image?.classList.contains('shadow-xl')).toBeTruthy();
    });

    it('should render services list', () => {
      const servicesList = compiled.querySelector('ul[role="list"]');
      expect(servicesList).toBeTruthy();

      const serviceItems = compiled.querySelectorAll('ul[role="list"] li');
      expect(serviceItems.length).toBeGreaterThan(0);
    });

    it('should render service items with icons', () => {
      const serviceItems = compiled.querySelectorAll('ul[role="list"] li');
      serviceItems.forEach(item => {
        const icon = item.querySelector('svg');
        const serviceText = item.querySelector('span strong');
        expect(icon).toBeTruthy();
        expect(serviceText).toBeTruthy();
        expect(icon?.classList.contains('text-red-600')).toBeTruthy();
      });
    });

    it('should render all key services', () => {
      const servicesText = compiled.textContent || '';
      const keyServices = [
        'Wand- und Deckenverkleidung',
        'Trockenbau für Innenräume',
        'Dämmung & Akustiklösungen',
      ];

      keyServices.forEach(service => {
        expect(servicesText).toContain(service);
      });
    });
  });
});
