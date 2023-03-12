import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { HeroComponent } from './hero/hero.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { PartnerComponent } from './partner/partner.component';

@NgModule({
  declarations: [
    HomeComponent,
    HeroComponent,
    PartnerComponent,
    AboutComponent,
    ContactComponent,
  ],
  imports: [CommonModule, HomeRoutingModule],
})
export class HomeModule {}
