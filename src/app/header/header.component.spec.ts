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

    it('should initialize with default values', () => {
      expect(component.logo).toBe('');
      expect(component.isMenuOpened).toBe(false);
      expect(component.scrolled).toBe(false);
      expect(component.themeMode).toBeUndefined();
    });

    it('should have access to AppService', () => {
      expect(component['appService']).toBeDefined();
      expect(component['appService']).toBe(appService);
    });

    it('should have mainMenuItems from AppService', () => {
      expect(component.mainMenuItems).toBeDefined();
      expect(component.mainMenuItems).toBe(appService.mainMenuItems);
      expect(component.mainMenuItems.length).toBeGreaterThan(0);
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

    it('should initialize with closed mobile menu', () => {
      expect(component.isMenuOpened).toBe(false);
    });

    it('should toggle mobile menu state', () => {
      expect(component.isMenuOpened).toBe(false);

      component.toggleMobileMenu();
      expect(component.isMenuOpened).toBe(true);

      component.toggleMobileMenu();
      expect(component.isMenuOpened).toBe(false);
    });

    it('should close mobile menu', () => {
      component.isMenuOpened = true;
      component.closeMobileMenu();
      expect(component.isMenuOpened).toBe(false);
    });

    it('should close mobile menu when already closed', () => {
      component.isMenuOpened = false;
      component.closeMobileMenu();
      expect(component.isMenuOpened).toBe(false);
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

    it('should detect dark theme', () => {
      // Mock document.body.classList.contains to return true for 'dark'
      spyOn(document.body.classList, 'contains').and.returnValue(true);

      component.onChangeTheme();
      expect(component.themeMode).toBe('dark');
    });

    it('should detect light theme', () => {
      // Mock document.body.classList.contains to return false for 'dark'
      spyOn(document.body.classList, 'contains').and.returnValue(false);

      component.onChangeTheme();
      expect(component.themeMode).toBe('light');
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

  describe('Scroll Detection', () => {
    beforeEach(() => {
      // Reset scrolled state
      component.scrolled = false;
    });

    it('should detect when page is scrolled down', () => {
      // Mock window.scrollY to simulate scroll
      spyOnProperty(window, 'scrollY', 'get').and.returnValue(100);

      component.onWindowScroll();
      expect(component.scrolled).toBe(true);
    });

    it('should detect when page is at top', () => {
      // Mock window.scrollY to simulate top position
      spyOnProperty(window, 'scrollY', 'get').and.returnValue(0);

      component.onWindowScroll();
      expect(component.scrolled).toBe(false);
    });

    it('should handle multiple scroll events', () => {
      const scrollYSpy = spyOnProperty(window, 'scrollY', 'get');

      // Start at top
      scrollYSpy.and.returnValue(0);
      component.onWindowScroll();
      expect(component.scrolled).toBe(false);

      // Scroll down
      scrollYSpy.and.returnValue(50);
      component.onWindowScroll();
      expect(component.scrolled).toBe(true);

      // Scroll back to top
      scrollYSpy.and.returnValue(0);
      component.onWindowScroll();
      expect(component.scrolled).toBe(false);
    });

    it('should respond to @HostListener window:scroll', () => {
      spyOn(component, 'onWindowScroll');

      // Trigger scroll event
      window.dispatchEvent(new Event('scroll'));

      expect(component.onWindowScroll).toHaveBeenCalled();
    });
  });

  describe('Component Integration', () => {
    it('should maintain state consistency', () => {
      // Test multiple state changes
      component.toggleMobileMenu();
      component.onChangeTheme();

      spyOnProperty(window, 'scrollY', 'get').and.returnValue(100);
      component.onWindowScroll();

      expect(component.isMenuOpened).toBe(true);
      expect(component.scrolled).toBe(true);
      expect(component.themeMode).toBeDefined();
    });

    it('should handle rapid menu toggles', () => {
      for (let i = 0; i < 5; i++) {
        component.toggleMobileMenu();
      }
      expect(component.isMenuOpened).toBe(true);
    });

    it('should maintain AppService connection', () => {
      expect(component.mainMenuItems).toBe(appService.mainMenuItems);
      // Verify it stays connected after state changes
      component.toggleMobileMenu();
      expect(component.mainMenuItems).toBe(appService.mainMenuItems);
    });
  });

  describe('Edge Cases', () => {
    it('should handle undefined themeMode gracefully', () => {
      component.themeMode = undefined;
      expect(component.themeMode).toBeUndefined();

      component.onChangeTheme();
      expect(component.themeMode).toBeDefined();
    });

    it('should handle window scroll edge values', () => {
      const scrollYSpy = spyOnProperty(window, 'scrollY', 'get');

      // Test exactly 0
      scrollYSpy.and.returnValue(0);
      component.onWindowScroll();
      expect(component.scrolled).toBe(false);

      // Test exactly 1
      scrollYSpy.and.returnValue(1);
      component.onWindowScroll();
      expect(component.scrolled).toBe(true);

      // Test very large values
      scrollYSpy.and.returnValue(9999);
      component.onWindowScroll();
      expect(component.scrolled).toBe(true);
    });

    it('should handle empty logo string', () => {
      component.logo = '';
      expect(component.logo).toBe('');

      component.logo = '   ';
      expect(component.logo).toBe('   ');
    });
  });
});
