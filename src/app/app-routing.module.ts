import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'career',
    loadChildren: () =>
      import('./career/career.module').then((m) => m.CareerModule),
  },
  {
    path: 'imprint',
    loadChildren: () =>
      import('./imprint/imprint.module').then((m) => m.ImprintModule),
  },
  {
    path: 'privacy',
    loadChildren: () =>
      import('./privacy/privacy.module').then((m) => m.PrivacyModule),
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
