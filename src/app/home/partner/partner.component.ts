import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

interface Partner {
  id: number;
  name: string;
  logo: string;
  description: string;
  website: string;
  category: string;
  featured: boolean;
}

@Component({
  selector: 'app-partner',
  templateUrl: './partner.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
})
export class PartnerComponent {
  partners: Partner[] = [
    {
      id: 1,
      name: 'Knauf',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/d/d7/Knauf.svg',
      description:
        'Führender Hersteller von Gipskartonplatten und Trockenbausystemen.',
      website: 'https://www.knauf.ch',
      category: 'Trockenbau',
      featured: true,
    },
    {
      id: 2,
      name: 'Rigips',
      logo: 'assets/partners/rigips.svg',
      description:
        'Premium-Anbieter für innovative Trockenbau- und Dämmlösungen.',
      website: 'https://www.rigips.ch',
      category: 'Trockenbau',
      featured: true,
    },
    {
      id: 3,
      name: 'ISOVER',
      logo: 'assets/partners/isover.png',
      description:
        'Spezialist für Dämmstoffe und energieeffiziente Gebäudelösungen.',
      website: 'https://www.isover.ch',
      category: 'Dämmung',
      featured: true,
    },
    {
      id: 4,
      name: 'USG Boral',
      logo: 'assets/partners/ugs-boral.png',
      description:
        'Hochwertige Gipskartonprodukte und Bausysteme für den modernen Innenausbau.',
      website: 'https://www.usgboral.com',
      category: 'Trockenbau',
      featured: false,
    },
    {
      id: 5,
      name: 'Fermacell',
      logo: 'assets/partners/fermacell.jpg',
      description: 'Innovative Gipsfaserplatten für nachhaltige Bauprojekte.',
      website: 'https://www.fermacell.ch',
      category: 'Trockenbau',
      featured: false,
    },
    {
      id: 6,
      name: 'Rockwool',
      logo: 'assets/partners/rockwool.png',
      description: 'Führender Anbieter von Steinwolle-Dämmstoffen.',
      website: 'https://www.rockwool.ch',
      category: 'Dämmung',
      featured: false,
    },
  ];

  get featuredPartners(): Partner[] {
    return this.partners.filter(partner => partner.featured);
  }

  get allPartners(): Partner[] {
    return this.partners;
  }

  categories = [
    { name: 'Alle', value: 'all' },
    { name: 'Trockenbau', value: 'Trockenbau' },
    { name: 'Dämmung', value: 'Dämmung' },
  ];

  selectedCategory = 'all';

  getFilteredPartners(): Partner[] {
    if (this.selectedCategory === 'all') {
      return this.partners;
    }
    return this.partners.filter(
      partner => partner.category === this.selectedCategory
    );
  }

  filterByCategory(category: string): void {
    this.selectedCategory = category;
  }
}
