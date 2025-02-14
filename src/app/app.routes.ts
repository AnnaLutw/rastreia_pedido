import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RastreiaParamComponent } from './components/rastreia-param/rastreia-param.component';
import { RastreiaInputComponent } from './components/rastreia-input/rastreia-input.component';

export const routes: Routes = [
  { path: '', component: RastreiaInputComponent },
  { path: 'rastreio', component: RastreiaInputComponent },
  { path: 'rastreio/:pedido', component: RastreiaParamComponent },
  { path: '**', redirectTo: 'rastreio', pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false, scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
