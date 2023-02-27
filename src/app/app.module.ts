import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SafeHtmlPipe } from './safe-html.pipe';
import { HeroComponent } from './hero/hero.component';
import { PartnerComponent } from './partner/partner.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { ThemeMenuComponent } from './header/theme-menu/theme-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ThemeMenuComponent,
    FooterComponent,
    SafeHtmlPipe,
    HeroComponent,
    PartnerComponent,
    AboutComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
