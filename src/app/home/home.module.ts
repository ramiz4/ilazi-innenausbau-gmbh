import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { EmailService } from './contact/email.service';
import { GalleryComponent } from './gallery/gallery.component';
import { HeroComponent } from './hero/hero.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { PartnerComponent } from './partner/partner.component';
import { ReferencesComponent } from './references/references.component';
import { HttpClientModule } from '@angular/common/http';

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
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    EmailService
  ]
})
export class HomeModule {}
