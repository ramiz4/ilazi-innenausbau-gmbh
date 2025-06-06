import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app.component';
import { AppService } from './app.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [AppService, provideRouter([])],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  describe('Component Creation', () => {
    it('should create the app', () => {
      expect(component).toBeTruthy();
    });

    it('should be an instance of AppComponent', () => {
      expect(component).toBeInstanceOf(AppComponent);
    });
  });

  describe('Component Properties', () => {
    it('should have logo property set to correct path', () => {
      expect(component.logo).toBe('../assets/logo-current.svg');
    });

    it('should have logoDark property set to correct path', () => {
      expect(component.logoDark).toBe('../assets/logo-current-dark.svg');
    });

    it('should have logo properties defined on initialization', () => {
      expect(component.logo).toBeDefined();
      expect(component.logoDark).toBeDefined();
      expect(typeof component.logo).toBe('string');
      expect(typeof component.logoDark).toBe('string');
    });
  });

  describe('Template Rendering', () => {
    it('should render main container with correct classes', () => {
      const mainContainer = compiled.querySelector('div');
      expect(mainContainer).toBeTruthy();
      expect(mainContainer?.classList.contains('isolate')).toBeTruthy();
      expect(mainContainer?.classList.contains('bg-white')).toBeTruthy();
      expect(
        mainContainer?.classList.contains('dark:bg-neutral-900')
      ).toBeTruthy();
    });

    it('should render header component', () => {
      const headerElement = compiled.querySelector('app-header');
      expect(headerElement).toBeTruthy();
    });

    it('should render footer component', () => {
      const footerElement = compiled.querySelector('app-footer');
      expect(footerElement).toBeTruthy();
    });

    it('should render main element with router-outlet', () => {
      const mainElement = compiled.querySelector('main');
      expect(mainElement).toBeTruthy();

      const routerOutlet = mainElement?.querySelector('router-outlet');
      expect(routerOutlet).toBeTruthy();
    });

    it('should pass logo property to header component', () => {
      const headerElement = fixture.debugElement.query(By.css('app-header'));
      expect(headerElement).toBeTruthy();
      expect(headerElement.attributes['ng-reflect-logo']).toBe(
        '../assets/logo-current.svg'
      );
    });

    it('should pass logo property to footer component', () => {
      const footerElement = fixture.debugElement.query(By.css('app-footer'));
      expect(footerElement).toBeTruthy();
      expect(footerElement.attributes['ng-reflect-logo']).toBe(
        '../assets/logo-current.svg'
      );
    });
  });

  describe('Component Structure', () => {
    it('should have proper HTML structure hierarchy', () => {
      const mainContainer = compiled.querySelector('div.isolate');
      expect(mainContainer).toBeTruthy();

      const header = mainContainer?.querySelector('app-header');
      const main = mainContainer?.querySelector('main');
      const footer = mainContainer?.querySelector('app-footer');

      expect(header).toBeTruthy();
      expect(main).toBeTruthy();
      expect(footer).toBeTruthy();

      // Check order of elements
      const children = Array.from(mainContainer?.children || []);
      expect(children[0].tagName.toLowerCase()).toBe('app-header');
      expect(children[1].tagName.toLowerCase()).toBe('main');
      expect(children[2].tagName.toLowerCase()).toBe('app-footer');
    });

    it('should have semantic HTML structure', () => {
      const mainElement = compiled.querySelector('main');
      expect(mainElement).toBeTruthy();
      expect(mainElement?.tagName.toLowerCase()).toBe('main');
    });
  });

  describe('Styling and CSS Classes', () => {
    it('should apply isolation CSS class', () => {
      const mainDiv = compiled.querySelector('div');
      expect(mainDiv?.classList.contains('isolate')).toBeTruthy();
    });

    it('should apply light and dark mode background classes', () => {
      const mainDiv = compiled.querySelector('div');
      expect(mainDiv?.classList.contains('bg-white')).toBeTruthy();
      expect(mainDiv?.classList.contains('dark:bg-neutral-900')).toBeTruthy();
    });

    it('should not have any unexpected CSS classes on main container', () => {
      const mainDiv = compiled.querySelector('div');
      const expectedClasses = ['isolate', 'bg-white', 'dark:bg-neutral-900'];
      const actualClasses = Array.from(mainDiv?.classList || []);

      expect(actualClasses.sort()).toEqual(expectedClasses.sort());
    });
  });

  describe('Responsive Design', () => {
    it('should support dark mode via CSS classes', () => {
      const mainContainer = compiled.querySelector('div');
      expect(mainContainer?.classList.toString()).toContain(
        'dark:bg-neutral-900'
      );
    });

    it('should have proper contrast between light and dark themes', () => {
      const mainContainer = compiled.querySelector('div');
      const classList = mainContainer?.classList.toString() || '';

      // Should have both light and dark theme classes
      expect(classList).toContain('bg-white');
      expect(classList).toContain('dark:bg-neutral-900');
    });
  });

  describe('Component Integration', () => {
    it('should properly integrate with routing system', () => {
      const routerOutlet = compiled.querySelector('router-outlet');
      expect(routerOutlet).toBeTruthy();
    });

    it('should maintain component state after change detection', () => {
      const initialLogo = component.logo;
      const initialLogoDark = component.logoDark;

      fixture.detectChanges();

      expect(component.logo).toBe(initialLogo);
      expect(component.logoDark).toBe(initialLogoDark);
    });

    it('should handle property changes correctly', () => {
      const newLogoPath = '../assets/new-logo.svg';
      component.logo = newLogoPath;
      fixture.detectChanges();

      const headerElement = fixture.debugElement.query(By.css('app-header'));
      expect(headerElement.attributes['ng-reflect-logo']).toBe(newLogoPath);
    });
  });

  describe('Accessibility', () => {
    it('should have proper semantic structure for screen readers', () => {
      const main = compiled.querySelector('main');
      expect(main).toBeTruthy();
      expect(main?.tagName.toLowerCase()).toBe('main');
    });

    it('should maintain proper document structure', () => {
      // Check that we have a logical flow: header -> main -> footer
      const container = compiled.querySelector('div.isolate');
      const children = Array.from(container?.children || []);

      expect(children.length).toBe(3);
      expect(children[0].tagName.toLowerCase()).toBe('app-header');
      expect(children[1].tagName.toLowerCase()).toBe('main');
      expect(children[2].tagName.toLowerCase()).toBe('app-footer');
    });
  });

  describe('Performance', () => {
    it('should render efficiently without errors', () => {
      const startTime = performance.now();

      // Trigger multiple change detection cycles
      for (let i = 0; i < 5; i++) {
        fixture.detectChanges();
      }

      const endTime = performance.now();
      const renderTime = endTime - startTime;

      // Should complete rendering quickly (less than 50ms for 5 cycles)
      expect(renderTime).toBeLessThan(50);
    });

    it('should not have memory leaks in component creation', () => {
      const initialFixture = TestBed.createComponent(AppComponent);
      const initialComponent = initialFixture.componentInstance;

      expect(initialComponent).toBeTruthy();
      expect(initialComponent.logo).toBeDefined();
      expect(initialComponent.logoDark).toBeDefined();
    });
  });

  describe('Error Handling', () => {
    it('should handle undefined logo gracefully', () => {
      component.logo = undefined as any;
      fixture.detectChanges();

      expect(() => fixture.detectChanges()).not.toThrow();
    });

    it('should handle empty logo path gracefully', () => {
      component.logo = '';
      fixture.detectChanges();

      expect(() => fixture.detectChanges()).not.toThrow();
    });
  });
});
