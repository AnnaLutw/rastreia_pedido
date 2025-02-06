import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { FooterComponent } from "./components/footer/footer.component";
import { BlocoUmComponent } from "./components/bloco-um/bloco-um.component";
import { CardPedidoComponent } from "./components/card-pedido/card-pedido.component";
import { CommonModule } from '@angular/common';  // Importar CommonModule

@Component({
  selector: 'app-root',
  standalone: true,  // Marque o componente como standalone
  imports: [
    NavbarComponent,
    FooterComponent,
    RouterOutlet,
    BlocoUmComponent,
    CardPedidoComponent,
    CommonModule  // Adicionar CommonModule aqui
  ],  // Importe RouterOutlet
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'rastreia_pedido';
}
