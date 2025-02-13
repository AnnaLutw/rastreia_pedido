import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RastreiaParamComponent } from './components/rastreia-param/rastreia-param.component';
import { RastreiaInputComponent } from './components/rastreia-input/rastreia-input.component';

export const routes: Routes = [
  // Agora a rota inicial é '' (vazia) pois o base href já é /rastreio/
  { path: 'rastreio', component: RastreiaInputComponent },
  { path: 'rastreio/:pedido', component: RastreiaParamComponent, data: { prerender: false } },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false, scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
