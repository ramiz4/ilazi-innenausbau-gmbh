import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { ReferencesComponent } from './references.component';

describe('ReferencesComponent', () => {
  let component: ReferencesComponent;
  let fixture: ComponentFixture<ReferencesComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReferencesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ReferencesComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  afterEach(() => {
    component.ngOnDestroy();
  });

  describe('Component Creation', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should be an instance of ReferencesComponent', () => {
      expect(component).toBeInstanceOf(ReferencesComponent);
    });
  });

  describe('Component Properties', () => {
    it('should initialize with correct default values', () => {
      expect(component.currentTestimonialIndex).toBe(0);
      expect(component.isAnimating).toBeFalse();
      expect(component.isTransitioning).toBeFalse();
    });

    it('should have testimonials array defined', () => {
      expect(component.testimonials).toBeDefined();
      expect(Array.isArray(component.testimonials)).toBeTruthy();
      expect(component.testimonials.length).toBe(5);
    });

    it('should have valid testimonial structure', () => {
      component.testimonials.forEach(testimonial => {
        expect(testimonial.quote).toBeDefined();
        expect(testimonial.author).toBeDefined();
        expect(testimonial.location).toBeDefined();
        expect(testimonial.project).toBeDefined();
        expect(typeof testimonial.quote).toBe('string');
        expect(typeof testimonial.author).toBe('string');
        expect(typeof testimonial.location).toBe('string');
        expect(typeof testimonial.project).toBe('string');
      });
    });

    it('should have correct testimonials data', () => {
      expect(component.testimonials[0].author).toBe('Martina D.');
      expect(component.testimonials[0].location).toBe('Spreitenbach, Schweiz');
      expect(component.testimonials[0].project).toBe('Praxisrenovierung');
      expect(component.testimonials[1].author).toBe('Stefan M.');
      expect(component.testimonials[4].author).toBe('Anna und Thomas K.');
    });
  });

  describe('Lifecycle Methods', () => {
    it('should start auto rotation on init', fakeAsync(() => {
      spyOn(component as any, 'startAutoRotate');
      component.ngOnInit();
      expect((component as any).startAutoRotate).toHaveBeenCalled();
    }));

    it('should stop auto rotation on destroy', () => {
      spyOn(component as any, 'stopAutoRotate');
      component.ngOnDestroy();
      expect((component as any).stopAutoRotate).toHaveBeenCalled();
    });

    it('should set up auto rotation interval on init', fakeAsync(() => {
      component.ngOnInit();
      expect((component as any).autoRotateInterval).toBeDefined();
      tick(6000);
      // Auto rotation should have triggered
      component.ngOnDestroy();
    }));
  });

  describe('Current Testimonial Getter', () => {
    it('should return first testimonial by default', () => {
      expect(component.currentTestimonial).toBe(component.testimonials[0]);
    });

    it('should return correct testimonial based on index', () => {
      component.currentTestimonialIndex = 2;
      expect(component.currentTestimonial).toBe(component.testimonials[2]);
    });

    it('should handle edge cases for testimonial index', () => {
      component.currentTestimonialIndex = 4;
      expect(component.currentTestimonial).toBe(component.testimonials[4]);

      component.currentTestimonialIndex = 0;
      expect(component.currentTestimonial).toBe(component.testimonials[0]);
    });
  });

  describe('Navigation Methods', () => {
    beforeEach(() => {
      spyOn(component as any, 'restartAutoRotate');
    });

    describe('nextTestimonial', () => {
      it('should advance to next testimonial', fakeAsync(() => {
        const initialIndex = component.currentTestimonialIndex;
        component.nextTestimonial();
        tick(300); // Wait for animation
        expect(component.currentTestimonialIndex).toBe(initialIndex + 1);
        tick(500); // Complete animation
      }));

      it('should wrap around to first testimonial when at end', fakeAsync(() => {
        component.currentTestimonialIndex = 4; // Last testimonial
        component.nextTestimonial();
        tick(300);
        expect(component.currentTestimonialIndex).toBe(0);
        tick(500);
      }));

      it('should not advance when animating', () => {
        component.isAnimating = true;
        const initialIndex = component.currentTestimonialIndex;
        component.nextTestimonial();
        expect(component.currentTestimonialIndex).toBe(initialIndex);
      });

      it('should restart auto rotation', () => {
        component.nextTestimonial();
        expect((component as any).restartAutoRotate).toHaveBeenCalled();
      });
    });

    describe('previousTestimonial', () => {
      it('should go to previous testimonial', fakeAsync(() => {
        component.currentTestimonialIndex = 2;
        component.previousTestimonial();
        tick(300);
        expect(component.currentTestimonialIndex).toBe(1);
        tick(500);
      }));

      it('should wrap around to last testimonial when at beginning', fakeAsync(() => {
        component.currentTestimonialIndex = 0;
        component.previousTestimonial();
        tick(300);
        expect(component.currentTestimonialIndex).toBe(4);
        tick(500);
      }));

      it('should not go back when animating', () => {
        component.isAnimating = true;
        component.currentTestimonialIndex = 2;
        component.previousTestimonial();
        expect(component.currentTestimonialIndex).toBe(2);
      });

      it('should restart auto rotation', () => {
        component.previousTestimonial();
        expect((component as any).restartAutoRotate).toHaveBeenCalled();
      });
    });

    describe('setTestimonial', () => {
      it('should set testimonial to specific index', fakeAsync(() => {
        component.setTestimonial(3);
        tick(300);
        expect(component.currentTestimonialIndex).toBe(3);
        tick(500);
      }));

      it('should not change when setting same index', () => {
        component.currentTestimonialIndex = 2;
        component.setTestimonial(2);
        expect(component.currentTestimonialIndex).toBe(2);
      });

      it('should not change when animating', () => {
        component.isAnimating = true;
        const initialIndex = component.currentTestimonialIndex;
        component.setTestimonial(3);
        expect(component.currentTestimonialIndex).toBe(initialIndex);
      });

      it('should restart auto rotation when index changes', () => {
        component.setTestimonial(3);
        expect((component as any).restartAutoRotate).toHaveBeenCalled();
      });
    });
  });

  describe('Animation System', () => {
    let mockCdr: jasmine.Spy;

    beforeEach(() => {
      mockCdr = spyOn(component['cdr'], 'markForCheck');
    });

    it('should handle animation transition states', fakeAsync(() => {
      expect(component.isAnimating).toBeFalse();
      expect(component.isTransitioning).toBeFalse();

      component.nextTestimonial();

      expect(component.isAnimating).toBeTrue();
      expect(component.isTransitioning).toBeTrue();
      expect(mockCdr).toHaveBeenCalled();

      tick(250); // After fade out
      expect(component.isTransitioning).toBeFalse();

      tick(500); // After fade in
      expect(component.isAnimating).toBeFalse();
    }));

    it('should call markForCheck during animations', fakeAsync(() => {
      component.nextTestimonial();
      expect(mockCdr).toHaveBeenCalledTimes(1);

      tick(250);
      expect(mockCdr).toHaveBeenCalledTimes(2);

      tick(500);
      expect(mockCdr).toHaveBeenCalledTimes(3);
    }));

    it('should execute callback during animation', fakeAsync(() => {
      const callback = jasmine.createSpy('callback');
      (component as any).animateTransition(callback);

      expect(callback).not.toHaveBeenCalled();
      tick(250);
      expect(callback).toHaveBeenCalled();
      tick(500);
    }));
  });

  describe('Auto Rotation', () => {
    it('should advance testimonial automatically', fakeAsync(() => {
      spyOn(component as any, 'animateTransition').and.callThrough();
      component.ngOnInit();
      const initialIndex = component.currentTestimonialIndex;

      tick(6000); // Wait for auto rotation delay
      tick(750); // Wait for animation to complete
      expect(component.currentTestimonialIndex).toBe(
        (initialIndex + 1) % component.testimonials.length
      );

      component.ngOnDestroy();
    }));

    it('should not auto rotate when animating', fakeAsync(() => {
      component.ngOnInit();
      component.isAnimating = true;
      const initialIndex = component.currentTestimonialIndex;

      tick(6000);
      expect(component.currentTestimonialIndex).toBe(initialIndex);

      component.ngOnDestroy();
    }));

    it('should clear interval on stop', () => {
      spyOn(window, 'clearInterval');
      component.ngOnInit();
      const intervalId = (component as any).autoRotateInterval;

      (component as any).stopAutoRotate();
      expect(window.clearInterval).toHaveBeenCalledWith(intervalId);
      expect((component as any).autoRotateInterval).toBeUndefined();
    });

    it('should restart auto rotation properly', () => {
      spyOn(component as any, 'stopAutoRotate');
      spyOn(component as any, 'startAutoRotate');

      (component as any).restartAutoRotate();
      expect((component as any).stopAutoRotate).toHaveBeenCalled();
      expect((component as any).startAutoRotate).toHaveBeenCalled();
    });
  });

  describe('Edge Cases and Error Handling', () => {
    it('should handle empty testimonials array gracefully', () => {
      component.testimonials = [];
      expect(() => component.currentTestimonial).not.toThrow();
    });

    it('should handle invalid testimonial index', () => {
      component.currentTestimonialIndex = 999;
      expect(() => component.currentTestimonial).not.toThrow();
    });

    it('should handle multiple rapid navigation calls', () => {
      component.isAnimating = false;

      component.nextTestimonial();
      expect(component.isAnimating).toBeTrue();

      // These should be ignored due to animation guard
      component.nextTestimonial();
      component.previousTestimonial();

      // Animation state should remain true
      expect(component.isAnimating).toBeTrue();
    });

    it('should handle component destruction during animation', fakeAsync(() => {
      component.nextTestimonial();
      expect(component.isAnimating).toBeTrue();

      component.ngOnDestroy();
      expect((component as any).autoRotateInterval).toBeUndefined();

      tick(1000); // Complete any pending timeouts
    }));
  });

  describe('Component Integration', () => {
    it('should maintain testimonial data integrity', () => {
      const originalTestimonials = [...component.testimonials];

      component.nextTestimonial();
      component.previousTestimonial();
      component.setTestimonial(2);

      expect(component.testimonials).toEqual(originalTestimonials);
    });

    it('should handle rapid user interactions', fakeAsync(() => {
      // Simulate rapid clicking
      component.nextTestimonial();
      tick(100);
      component.nextTestimonial();
      tick(100);
      component.setTestimonial(3);

      // Should handle gracefully without errors
      expect(component).toBeTruthy();
      tick(1000);
    }));
  });
});
