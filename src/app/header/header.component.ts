import { ChangeDetectionStrategy, Component, HostListener, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  @Input() logo: string = '';

  mainMenuItems = [
    { id: 'about-us', title: 'Über uns', href: '/about' },
    { id: 'services', title: 'Leistungen', href: '/services' },
    { id: 'lorem-1', title: 'Lorem #1', href: '/lorem-1' },
    { id: 'lorem-2', title: 'Lorem #2', href: '/lorem-2' }
  ]

  isMenuOpened = false;

  scrolled = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (window.scrollY > 0) {
      this.scrolled = true;
      return;
    }
    this.scrolled = false;
  }
}
