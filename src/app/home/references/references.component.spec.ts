import { ComponentFixture, TestBed } from '@angular/core/testing';
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
      expect(component.testimonials.length).toBeGreaterThan(0);
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
  });
});
