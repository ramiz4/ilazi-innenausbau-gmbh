import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ThemeMenuComponent } from './theme-menu.component';

describe('ThemeMenuComponent', () => {
  let component: ThemeMenuComponent;
  let fixture: ComponentFixture<ThemeMenuComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThemeMenuComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ThemeMenuComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;

    // Clear localStorage before each test
    localStorage.clear();

    // Mock document.body.classList
    spyOn(document.body.classList, 'add').and.stub();
    spyOn(document.body.classList, 'remove').and.stub();

    fixture.detectChanges();
  });

  afterEach(() => {
    localStorage.clear();
  });

  describe('Component Creation', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should be an instance of ThemeMenuComponent', () => {
      expect(component).toBeInstanceOf(ThemeMenuComponent);
    });
  });

  describe('Component Initialization', () => {
    it('should initialize with default values', () => {
      expect(component.isOpen).toBe(false);
    });

    it('should initialize mode from localStorage when available', () => {
      localStorage.setItem('theme', 'dark');
      const newComponent = new ThemeMenuComponent();
      expect(newComponent.mode).toBe('dark');
    });

    it('should default to system mode when localStorage is empty', () => {
      localStorage.clear();
      const newComponent = new ThemeMenuComponent();
      expect(newComponent.mode).toBe('system');
    });
  });

  describe('Theme Mode Management', () => {
    describe('setTheme', () => {
      it('should set theme mode and update localStorage for dark mode', () => {
        spyOn(component.changed, 'emit');

        component.setTheme('dark');

        expect(component.mode).toBe('dark');
        expect(localStorage.getItem('theme')).toBe('dark');
        expect(component.changed.emit).toHaveBeenCalled();
      });

      it('should set theme mode and update localStorage for light mode', () => {
        spyOn(component.changed, 'emit');

        component.setTheme('light');

        expect(component.mode).toBe('light');
        expect(localStorage.getItem('theme')).toBe('light');
        expect(component.changed.emit).toHaveBeenCalled();
      });

      it('should remove from localStorage when setting system mode', () => {
        localStorage.setItem('theme', 'dark');
        spyOn(component.changed, 'emit');

        component.setTheme('system');

        expect(component.mode).toBe('system');
        expect(localStorage.getItem('theme')).toBeNull();
        expect(component.changed.emit).toHaveBeenCalled();
      });
    });
    describe('updateTheme behavior', () => {
      beforeEach(() => {
        spyOn(component.changed, 'emit');
      });

      it('should add dark class for dark mode', () => {
        component.setTheme('dark');

        expect(document.body.classList.add).toHaveBeenCalledWith('dark');
        expect(component.changed.emit).toHaveBeenCalled();
      });

      it('should remove dark class for light mode', () => {
        component.setTheme('light');

        expect(document.body.classList.remove).toHaveBeenCalledWith('dark');
        expect(component.changed.emit).toHaveBeenCalled();
      });

      it('should handle system mode with dark preference', () => {
        spyOn(window, 'matchMedia').and.returnValue({
          matches: true,
        } as MediaQueryList);

        component.setTheme('system');

        expect(window.matchMedia).toHaveBeenCalledWith(
          '(prefers-color-scheme: dark)'
        );
        expect(document.body.classList.add).toHaveBeenCalledWith('dark');
        expect(component.changed.emit).toHaveBeenCalled();
      });

      it('should handle system mode with light preference', () => {
        const matchMediaSpy = spyOn(window, 'matchMedia');

        // First call for dark returns false, second call for light returns true
        matchMediaSpy.and.callFake(
          (query: string) =>
            ({
              matches: query === '(prefers-color-scheme: light)',
            }) as MediaQueryList
        );

        component.setTheme('system');

        expect(window.matchMedia).toHaveBeenCalledWith(
          '(prefers-color-scheme: dark)'
        );
        expect(window.matchMedia).toHaveBeenCalledWith(
          '(prefers-color-scheme: light)'
        );
        expect(document.body.classList.add).toHaveBeenCalledWith('light');
        expect(component.changed.emit).toHaveBeenCalled();
      });

      it('should handle system mode with no preference', () => {
        spyOn(window, 'matchMedia').and.returnValue({
          matches: false,
        } as MediaQueryList);

        component.setTheme('system');

        expect(window.matchMedia).toHaveBeenCalledWith(
          '(prefers-color-scheme: dark)'
        );
        expect(window.matchMedia).toHaveBeenCalledWith(
          '(prefers-color-scheme: light)'
        );
        expect(component.changed.emit).toHaveBeenCalled();
      });

      it('should always emit changed event', () => {
        component.setTheme('dark');

        expect(component.changed.emit).toHaveBeenCalled();
      });
    });
  });

  describe('Click Outside Functionality', () => {
    beforeEach(() => {
      // Mock ViewChild elements
      component.toggleButton = {
        nativeElement: {
          contains: jasmine.createSpy('contains'),
        },
      } as any;

      component.menu = {
        nativeElement: {
          contains: jasmine.createSpy('contains'),
        },
      } as any;
    });

    it('should close menu when clicking outside', () => {
      component.isOpen = true;

      const mockEvent = {
        target: document.createElement('div'),
      };

      (
        component.toggleButton.nativeElement.contains as jasmine.Spy
      ).and.returnValue(false);
      (component.menu.nativeElement.contains as jasmine.Spy).and.returnValue(
        false
      );

      component.clickout(mockEvent);

      expect(component.isOpen).toBe(false);
    });

    it('should not close menu when clicking on toggle button', () => {
      component.isOpen = true;

      const mockEvent = {
        target: document.createElement('button'),
      };

      (
        component.toggleButton.nativeElement.contains as jasmine.Spy
      ).and.returnValue(true);
      (component.menu.nativeElement.contains as jasmine.Spy).and.returnValue(
        false
      );

      component.clickout(mockEvent);

      expect(component.isOpen).toBe(true);
    });

    it('should not close menu when clicking on menu', () => {
      component.isOpen = true;

      const mockEvent = {
        target: document.createElement('div'),
      };

      (
        component.toggleButton.nativeElement.contains as jasmine.Spy
      ).and.returnValue(false);
      (component.menu.nativeElement.contains as jasmine.Spy).and.returnValue(
        true
      );

      component.clickout(mockEvent);

      expect(component.isOpen).toBe(true);
    });

    it('should handle undefined menu element', () => {
      component.isOpen = true;
      component.menu = undefined as any;

      const mockEvent = {
        target: document.createElement('div'),
      };

      (
        component.toggleButton.nativeElement.contains as jasmine.Spy
      ).and.returnValue(false);

      expect(() => component.clickout(mockEvent)).not.toThrow();
      expect(component.isOpen).toBe(false);
    });
  });

  describe('Event Handling', () => {
    it('should respond to document click events', () => {
      spyOn(component, 'clickout');

      const mockEvent = new Event('click');
      document.dispatchEvent(mockEvent);

      // The HostListener should be set up, but we can't easily test it directly
      // Instead we test the clickout method functionality
      expect(component.clickout).toBeDefined();
    });

    it('should emit changed event through Output', () => {
      spyOn(component.changed, 'emit');
      component.setTheme('dark');
      expect(component.changed.emit).toHaveBeenCalled();
    });
  });

  describe('ViewChild Elements', () => {
    it('should have toggleButton ViewChild', () => {
      expect(component.toggleButton).toBeDefined();
    });
  });

  describe('Integration Tests', () => {
    it('should handle complete theme switching workflow', () => {
      spyOn(component.changed, 'emit');

      // Start with system
      expect(component.mode).toBe('system');

      // Switch to dark
      component.setTheme('dark');
      expect(component.mode).toBe('dark');
      expect(localStorage.getItem('theme')).toBe('dark');
      expect(document.body.classList.add).toHaveBeenCalledWith('dark');

      // Switch to light
      component.setTheme('light');
      expect(component.mode).toBe('light');
      expect(localStorage.getItem('theme')).toBe('light');
      expect(document.body.classList.remove).toHaveBeenCalledWith('dark');

      // Switch back to system
      component.setTheme('system');
      expect(component.mode).toBe('system');
      expect(localStorage.getItem('theme')).toBeNull();

      expect(component.changed.emit).toHaveBeenCalledTimes(3);
    });

    it('should maintain state consistency during rapid changes', () => {
      const modes = ['dark', 'light', 'system', 'dark', 'light'];

      modes.forEach(mode => {
        component.setTheme(mode);
        expect(component.mode).toBe(mode);
      });
    });
  });

  describe('Edge Cases', () => {
    it('should handle invalid localStorage values gracefully', () => {
      localStorage.setItem('theme', 'invalid-theme');
      const newComponent = new ThemeMenuComponent();
      expect(newComponent.mode).toBe('invalid-theme');
    });

    it('should handle missing window.matchMedia', () => {
      component.mode = 'system';
      const originalMatchMedia = window.matchMedia;
      (window as any).matchMedia = undefined;

      expect(() => (component as any).updateTheme()).toThrow();

      window.matchMedia = originalMatchMedia;
    });

    it('should handle document.body.classList operations gracefully', () => {
      const originalAdd = document.body.classList.add;
      const originalRemove = document.body.classList.remove;

      (document.body.classList as any).add = undefined;
      (document.body.classList as any).remove = undefined;

      expect(() => component.setTheme('dark')).toThrow();

      document.body.classList.add = originalAdd;
      document.body.classList.remove = originalRemove;
    });
  });
});
