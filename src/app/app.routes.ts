import { Routes } from '@angular/router';
import { RastreiaParamComponent } from './components/rastreia-param/rastreia-param.component';
import { RastreiaInputComponent } from './components/rastreia-input/rastreia-input.component';

export const routes: Routes = [
  { path: 'rastreio', component: RastreiaInputComponent },
  { path: 'rastreio/:pedido', component: RastreiaParamComponent },
  { path: '**', redirectTo: '/rastreio' } // Adicionando "/" antes de "rastreio"
];
