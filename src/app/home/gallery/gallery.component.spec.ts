import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GalleryComponent } from './gallery.component';

describe('GalleryComponent', () => {
  let component: GalleryComponent;
  let fixture: ComponentFixture<GalleryComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GalleryComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GalleryComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  describe('Component Creation', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should be an instance of GalleryComponent', () => {
      expect(component).toBeInstanceOf(GalleryComponent);
    });
  });

  describe('Component Properties', () => {
    it('should initialize with empty images array', () => {
      expect(component.images).toBeDefined();
      expect(Array.isArray(component.images)).toBeTruthy();
      expect(component.images.length).toBe(0);
    });

    it('should handle images array modifications', () => {
      const testImages = ['image1.jpg', 'image2.jpg', 'image3.jpg'];
      component.images = testImages;
      fixture.detectChanges();

      expect(component.images).toBe(testImages);
      expect(component.images.length).toBe(3);
    });
  });

  describe('Template Rendering', () => {
    it('should render main container with proper styling', () => {
      const container = compiled.querySelector('div.relative');
      expect(container).toBeTruthy();

      const section = compiled.querySelector(
        'section.bg-white.dark\\:bg-zinc-900'
      );
      expect(section).toBeTruthy();
    });

    it('should render gallery heading', () => {
      const heading = compiled.querySelector('h2');
      expect(heading).toBeTruthy();
      expect(heading?.textContent?.trim()).toBe('Gallery');
      expect(heading?.classList.contains('text-3xl')).toBeTruthy();
      expect(heading?.classList.contains('font-bold')).toBeTruthy();
    });

    it('should render gallery carousel container', () => {
      const carouselContainer = compiled.querySelector('.gallery-carousel');
      expect(carouselContainer).toBeTruthy();
      expect(carouselContainer?.classList.contains('container')).toBeTruthy();
      expect(carouselContainer?.classList.contains('mx-auto')).toBeTruthy();
    });
  });
});
