import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-gallery',
    templateUrl: './gallery.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class GalleryComponent {
  images = [];
}
