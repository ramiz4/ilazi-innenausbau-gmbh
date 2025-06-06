import { TestBed } from '@angular/core/testing';
import { AppService } from './app.service';

describe('AppService', () => {
  let service: AppService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppService],
    });
    service = TestBed.inject(AppService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('mainMenuItems', () => {
    it('should have correct number of menu items', () => {
      expect(service.mainMenuItems).toBeDefined();
      expect(service.mainMenuItems.length).toBe(5);
    });

    it('should contain about-us menu item', () => {
      const aboutUsItem = service.mainMenuItems.find(
        item => item.id === 'about-us'
      );
      expect(aboutUsItem).toBeDefined();
      expect(aboutUsItem?.type).toBe('main');
      expect(aboutUsItem?.text).toBe('Über uns');
      expect(aboutUsItem?.href).toBe('/');
    });

    it('should contain references menu item', () => {
      const referencesItem = service.mainMenuItems.find(
        item => item.id === 'references'
      );
      expect(referencesItem).toBeDefined();
      expect(referencesItem?.type).toBe('main');
      expect(referencesItem?.text).toBe('Referenzen');
      expect(referencesItem?.href).toBe('/');
    });

    it('should contain gallery menu item', () => {
      const galleryItem = service.mainMenuItems.find(
        item => item.id === 'gallery'
      );
      expect(galleryItem).toBeDefined();
      expect(galleryItem?.type).toBe('main');
      expect(galleryItem?.text).toBe('Gallerie');
      expect(galleryItem?.href).toBe('/');
    });

    it('should contain partner menu item', () => {
      const partnerItem = service.mainMenuItems.find(
        item => item.id === 'partner'
      );
      expect(partnerItem).toBeDefined();
      expect(partnerItem?.type).toBe('main');
      expect(partnerItem?.text).toBe('Partner');
      expect(partnerItem?.href).toBe('/');
    });

    it('should contain contact menu item', () => {
      const contactItem = service.mainMenuItems.find(
        item => item.id === 'contact'
      );
      expect(contactItem).toBeDefined();
      expect(contactItem?.type).toBe('main');
      expect(contactItem?.text).toBe('Kontakt');
      expect(contactItem?.href).toBe('/');
    });

    it('should have all items with type "main"', () => {
      const allMainType = service.mainMenuItems.every(
        item => item.type === 'main'
      );
      expect(allMainType).toBeTruthy();
    });

    it('should have all items with unique ids', () => {
      const ids = service.mainMenuItems.map(item => item.id);
      const uniqueIds = [...new Set(ids)];
      expect(ids.length).toBe(uniqueIds.length);
    });

    it('should have all items with non-empty text', () => {
      const allHaveText = service.mainMenuItems.every(
        item => item.text.trim().length > 0
      );
      expect(allHaveText).toBeTruthy();
    });

    it('should have all items with valid href', () => {
      const allHaveHref = service.mainMenuItems.every(
        item => item.href === '/'
      );
      expect(allHaveHref).toBeTruthy();
    });

    it('should match MenuItem interface structure', () => {
      service.mainMenuItems.forEach(item => {
        expect(item).toEqual(
          jasmine.objectContaining({
            type: jasmine.any(String),
            id: jasmine.any(String),
            text: jasmine.any(String),
            href: jasmine.any(String),
          })
        );
      });
    });

    it('should maintain correct order of menu items', () => {
      const expectedOrder = [
        'about-us',
        'references',
        'gallery',
        'partner',
        'contact',
      ];
      const actualOrder = service.mainMenuItems.map(item => item.id);
      expect(actualOrder).toEqual(expectedOrder);
    });

    it('should be immutable when accessed', () => {
      const originalLength = service.mainMenuItems.length;
      const menuItemsCopy = [...service.mainMenuItems];

      // Attempt to modify the array (this should not affect the original)
      menuItemsCopy.push({
        type: 'test',
        id: 'test-item',
        text: 'Test Item',
        href: '/test',
      });

      expect(service.mainMenuItems.length).toBe(originalLength);
    });
  });
});
