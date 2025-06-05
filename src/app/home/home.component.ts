import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from './hero/hero.component';
import { AboutComponent } from './about/about.component';
import { ReferencesComponent } from './references/references.component';
import { GalleryComponent } from './gallery/gallery.component';
import { PartnerComponent } from './partner/partner.component';
import { ContactComponent } from './contact/contact.component';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    standalone: true,
    imports: [
        CommonModule,
        HeroComponent,
        AboutComponent,
        ReferencesComponent,
        GalleryComponent,
        PartnerComponent,
        ContactComponent
    ]
})
export class HomeComponent {}
