import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', loadComponent: () => import('./home-page/home-page.component').then(c => c.HomePageComponent) },
    { path: 'diff-view', loadComponent: () => import('./diff-view/diff-view.component').then(c => c.DiffViewComponent) },
    { path: 'hex-color-picker', loadComponent: () => import('./hex-color-picker/hex-color-picker.component').then(c => c.HexColorPickerComponent) }
];
