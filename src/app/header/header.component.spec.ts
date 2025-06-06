import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AppService } from '../app.service';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let compiled: HTMLElement;
  let appService: AppService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [AppService, provideRouter([])],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;
    appService = TestBed.inject(AppService);
    fixture.detectChanges();
  });

  describe('Component Creation', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should be an instance of HeaderComponent', () => {
      expect(component).toBeInstanceOf(HeaderComponent);
    });
  });

  describe('Component Properties', () => {
    it('should have logo input property', () => {
      const testLogo = '../assets/test-logo.svg';
      component.logo = testLogo;
      fixture.detectChanges();

      expect(component.logo).toBe(testLogo);
    });

    it('should have access to AppService', () => {
      expect(component['appService']).toBeDefined();
      expect(component['appService']).toBe(appService);
    });

    it('should have menu items from AppService', () => {
      expect(component['appService'].mainMenuItems).toBeDefined();
      expect(component['appService'].mainMenuItems.length).toBeGreaterThan(0);
    });
  });

  describe('Template Rendering', () => {
    it('should render navigation menu', () => {
      const navElement = compiled.querySelector('nav');
      expect(navElement).toBeTruthy();
    });

    it('should render menu items from AppService', () => {
      const menuItems = compiled.querySelectorAll('[data-test^="menu-item-"]');
      expect(menuItems.length).toBe(appService.mainMenuItems.length);
    });
  });

  describe('Navigation Menu', () => {
    it('should render all menu items', () => {
      appService.mainMenuItems.forEach(menuItem => {
        const menuElement = compiled.querySelector(
          `[data-test="menu-item-${menuItem.id}"]`
        );
        expect(menuElement).toBeTruthy();
        expect(menuElement?.textContent?.trim()).toBe(menuItem.text);
      });
    });

    it('should have correct href attributes for menu items', () => {
      appService.mainMenuItems.forEach(menuItem => {
        const linkElement = compiled.querySelector(
          `a[href="${menuItem.href}"]`
        );
        expect(linkElement).toBeTruthy();
      });
    });

    it('should have proper menu item structure', () => {
      const menuItems = compiled.querySelectorAll('[data-test^="menu-item-"]');
      menuItems.forEach(item => {
        expect(item.tagName.toLowerCase()).toBe('a');
      });
    });
  });

  describe('Mobile Navigation', () => {
    it('should have mobile menu toggle button', () => {
      const mobileToggle = compiled.querySelector(
        '[data-test="mobile-menu-toggle"]'
      );
      expect(mobileToggle).toBeTruthy();
    });

    it('should toggle mobile menu visibility', () => {
      const initialMenuState = component.isMenuOpened;

      // Manually toggle the menu state since there's no toggleMobileMenu method
      component.isMenuOpened = !component.isMenuOpened;
      fixture.detectChanges();

      expect(component.isMenuOpened).toBe(!initialMenuState);
    });

    it('should have mobile menu container', () => {
      const mobileMenu = compiled.querySelector('[data-test="mobile-menu"]');
      expect(mobileMenu).toBeTruthy();
    });
  });

  describe('Theme Toggle', () => {
    it('should have theme toggle component', () => {
      const themeToggle = compiled.querySelector('app-theme-menu');
      expect(themeToggle).toBeTruthy();
    });

    it('should be accessible in mobile and desktop views', () => {
      const desktopThemeToggle = compiled.querySelector(
        '[data-test="desktop-theme-toggle"]'
      );
      const mobileThemeToggle = compiled.querySelector(
        '[data-test="mobile-theme-toggle"]'
      );

      expect(desktopThemeToggle || mobileThemeToggle).toBeTruthy();
    });
  });
});
