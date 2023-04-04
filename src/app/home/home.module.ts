import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { HeroComponent } from './hero/hero.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { PartnerComponent } from './partner/partner.component';
import { GalleryComponent } from './gallery/gallery.component';
import { ReferencesComponent } from './references/references.component';

@NgModule({
  declarations: [
    HomeComponent,
    HeroComponent,
    PartnerComponent,
    AboutComponent,
    ContactComponent,
    GalleryComponent,
    ReferencesComponent,
  ],
  imports: [CommonModule, HomeRoutingModule],
})
export class HomeModule {}
