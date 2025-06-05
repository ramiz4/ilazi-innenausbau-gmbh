import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
    selector: 'app-theme-menu',
    templateUrl: './theme-menu.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class ThemeMenuComponent {
  isOpen = false;

  mode = localStorage.getItem('theme') ?? 'system';

  @Output() changed = new EventEmitter<void>();

  @ViewChild('toggleButton') toggleButton!: ElementRef;
  @ViewChild('menu') menu!: ElementRef;

  constructor() {
    this.updateTheme();
  }

  @HostListener('document:click', ['$event'])
  clickout(event: any) {
    if (
      !this.toggleButton.nativeElement.contains(event.target) &&
      !this.menu?.nativeElement.contains(event.target)
    ) {
      this.isOpen = false;
    }
  }

  private updateTheme() {
    if (this.mode === 'system') {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.body.classList.add('dark');
      } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
        document.body.classList.add('light');
      }
    } else if (this.mode === 'dark') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
    this.changed.emit();
  }

  setTheme(mode: string) {
    this.mode = mode;
    if (mode === 'system') {
      localStorage.removeItem('theme');
    } else {
      localStorage.setItem('theme', mode);
    }
    this.updateTheme();
  }
}
