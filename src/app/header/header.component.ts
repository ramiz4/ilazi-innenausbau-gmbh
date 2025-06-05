import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  Input,
} from '@angular/core';
import { AppService } from '../app.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class HeaderComponent {
  @Input() logo = '';

  mainMenuItems = this.appService.mainMenuItems;
  isMenuOpened = false;
  scrolled = false;
  themeMode: string | undefined;

  constructor(private appService: AppService) {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (window.scrollY > 0) {
      this.scrolled = true;
      return;
    }
    this.scrolled = false;
  }

  onChangeTheme() {
    this.themeMode = document.body.classList.contains('dark')
      ? 'dark'
      : 'light';
  }
}
