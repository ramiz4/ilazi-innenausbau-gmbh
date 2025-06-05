import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-hero',
    templateUrl: './hero.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class HeroComponent {}
