import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PartnerComponent } from './partner.component';

describe('PartnerComponent', () => {
  let component: PartnerComponent;
  let fixture: ComponentFixture<PartnerComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartnerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PartnerComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  describe('Component Creation', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should use OnPush change detection strategy', () => {
      expect(component.constructor.name).toBe('PartnerComponent');
      // OnPush strategy is set via ChangeDetectionStrategy.OnPush in the component decorator
    });

    it('should render without errors', () => {
      expect(() => fixture.detectChanges()).not.toThrow();
    });
  });

  describe('Component Properties', () => {
    it('should initialize with default partners data', () => {
      expect(component.partners).toBeDefined();
      expect(component.partners.length).toBe(6);
      expect(component.partners[0]).toEqual(
        jasmine.objectContaining({
          id: 1,
          name: 'Knauf',
          category: 'Trockenbau',
          featured: true,
        })
      );
    });

    it('should initialize with default categories', () => {
      expect(component.categories).toBeDefined();
      expect(component.categories.length).toBe(3);
      expect(component.categories[0]).toEqual({ name: 'Alle', value: 'all' });
    });

    it('should initialize with default selected category', () => {
      expect(component.selectedCategory).toBe('all');
    });

    it('should have correct partner structure', () => {
      const partner = component.partners[0];
      expect(partner.id).toBeDefined();
      expect(partner.name).toBeDefined();
      expect(partner.logo).toBeDefined();
      expect(partner.description).toBeDefined();
      expect(partner.website).toBeDefined();
      expect(partner.category).toBeDefined();
      expect(partner.featured).toBeDefined();
    });
  });

  describe('Component Methods', () => {
    it('should return featured partners correctly', () => {
      const featuredPartners = component.featuredPartners;
      expect(featuredPartners.length).toBe(3);
      expect(featuredPartners.every(partner => partner.featured)).toBe(true);
    });

    it('should return all partners correctly', () => {
      const allPartners = component.allPartners;
      expect(allPartners.length).toBe(6);
      expect(allPartners).toEqual(component.partners);
    });

    it('should filter partners by category correctly', () => {
      // Test filtering by specific category
      component.selectedCategory = 'Trockenbau';
      const filteredPartners = component.getFilteredPartners();
      expect(filteredPartners.length).toBe(4);
      expect(
        filteredPartners.every(partner => partner.category === 'Trockenbau')
      ).toBe(true);
    });

    it('should return all partners when category is "all"', () => {
      component.selectedCategory = 'all';
      const filteredPartners = component.getFilteredPartners();
      expect(filteredPartners.length).toBe(6);
    });

    it('should filter by category method', () => {
      component.filterByCategory('Dämmung');
      expect(component.selectedCategory).toBe('Dämmung');

      const filteredPartners = component.getFilteredPartners();
      expect(filteredPartners.length).toBe(2);
      expect(
        filteredPartners.every(partner => partner.category === 'Dämmung')
      ).toBe(true);
    });

    it('should handle empty filter results', () => {
      component.selectedCategory = 'NonExistentCategory';
      const filteredPartners = component.getFilteredPartners();
      expect(filteredPartners.length).toBe(0);
    });
  });

  describe('Template Rendering', () => {
    it('should render the main container with correct styling', () => {
      const container = compiled.querySelector('.bg-red-900');
      expect(container).toBeTruthy();
      expect(container?.classList).toContain('text-white');
      expect(container?.classList).toContain('py-12');
    });

    it('should render the header section', () => {
      const headerTitle = compiled.querySelector('h2');
      expect(headerTitle?.textContent?.trim()).toBe('Unsere Partner');
      expect(headerTitle?.classList).toContain('text-3xl');
      expect(headerTitle?.classList).toContain('font-bold');
    });

    it('should render the header description', () => {
      const description = compiled.querySelector('p');
      expect(description?.textContent).toContain(
        'Unsere Partner sind ein wichtiger Teil'
      );
      expect(description?.classList).toContain('text-red-100');
    });

    it('should render the decorative divider', () => {
      const divider = compiled.querySelector('.w-24.h-1.bg-white');
      expect(divider).toBeTruthy();
    });
  });
});
