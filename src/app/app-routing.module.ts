import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./home/home.component').then(m => m.HomeComponent),
  },
  {
    path: 'career',
    loadComponent: () =>
      import('./career/career.component').then(m => m.CareerComponent),
  },
  {
    path: 'imprint',
    loadComponent: () =>
      import('./imprint/imprint.component').then(m => m.ImprintComponent),
  },
  {
    path: 'privacy',
    loadComponent: () =>
      import('./privacy/privacy.component').then(m => m.PrivacyComponent),
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
      scrollOffset: [0, 112],
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
