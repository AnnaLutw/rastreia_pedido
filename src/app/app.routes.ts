import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardPedidoComponent } from './components/card-pedido/card-pedido.component';
import { BlocoUmComponent } from './components/bloco-um/bloco-um.component';
import { AppComponent } from './app.component';
import { RastreiaParamComponent } from './components/rastreia-param/rastreia-param.component';
import { RastreiaInputComponent } from './components/rastreia-input/rastreia-input.component';
export const routes: Routes = [
  { path: '', component: RastreiaInputComponent },
  { path: 'rastreio/:pedido', component: RastreiaParamComponent }, // Corrigido aqui
  { path: '**', redirectTo: '', pathMatch: 'full' } // Redireciona URLs inválidas para a home
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }