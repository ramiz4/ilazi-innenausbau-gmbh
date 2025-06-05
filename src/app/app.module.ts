import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { ThemeMenuComponent } from './header/theme-menu/theme-menu.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SafeHtmlPipe } from './safe-html.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ThemeMenuComponent,
    FooterComponent,
    NotFoundComponent,
    SafeHtmlPipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    AppRoutingModule,
  ],
  providers: [AppService],
  bootstrap: [AppComponent],
})
export class AppModule {}
