import { Injectable } from '@angular/core';
import { MenuItem } from './app.model';

@Injectable()
export class AppService {
  mainMenuItems: MenuItem[] = [
    { type: 'main', id: 'about-us', text: 'Über uns', href: '/' },
    { type: 'main', id: 'references', text: 'Referenzen', href: '/' },
    { type: 'main', id: 'gallery', text: 'Gallerie', href: '/' },
    { type: 'main', id: 'partner', text: 'Partner', href: '/' },
    { type: 'main', id: 'contact', text: 'Kontakt', href: '/' }
  ]
}
