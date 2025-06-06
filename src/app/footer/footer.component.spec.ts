import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AppService } from '../app.service';
import { SafeHtmlPipe } from '../safe-html.pipe';
import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;
  let compiled: HTMLElement;
  let appService: AppService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent, SafeHtmlPipe],
      providers: [AppService, provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;
    appService = TestBed.inject(AppService);
    fixture.detectChanges();
  });

  describe('Component Creation', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should be an instance of FooterComponent', () => {
      expect(component).toBeInstanceOf(FooterComponent);
    });
  });

  describe('Component Properties', () => {
    it('should have logo input property', () => {
      const testLogo = '../assets/test-logo.svg';
      component.logo = testLogo;
      fixture.detectChanges();

      expect(component.logo).toBe(testLogo);
    });

    it('should have footer sections defined', () => {
      expect(component.footerSections).toBeDefined();
      expect(Array.isArray(component.footerSections)).toBeTruthy();
      expect(component.footerSections.length).toBeGreaterThan(0);
    });

    it('should have current year property', () => {
      expect(component.currentYear).toBeDefined();
      expect(typeof component.currentYear).toBe('number');
      expect(component.currentYear).toBe(new Date().getFullYear());
    });

    it('should have social media links', () => {
      expect(component.socialLinks).toBeDefined();
      expect(Array.isArray(component.socialLinks)).toBeTruthy();
    });
  });

  describe('Template Rendering', () => {
    it('should render footer element', () => {
      const footerElement = compiled.querySelector('footer');
      expect(footerElement).toBeTruthy();
    });
  });
});
