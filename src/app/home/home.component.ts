import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { GalleryComponent } from './gallery/gallery.component';
import { HeroComponent } from './hero/hero.component';
import { PartnerComponent } from './partner/partner.component';
import { ReferencesComponent } from './references/references.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [
    CommonModule,
    HeroComponent,
    AboutComponent,
    ReferencesComponent,
    GalleryComponent,
    PartnerComponent,
    ContactComponent,
  ],
})
export class HomeComponent {}
