import { Component } from '@angular/core';
import { RouterOutlet, ActivatedRoute } from '@angular/router';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { FooterComponent } from "./components/footer/footer.component";
import { CardPedidoComponent } from "./components/card-pedido/card-pedido.component";
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PedidoService } from './pedido.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NavbarComponent,
    FooterComponent,
    RouterOutlet,
    CardPedidoComponent,
    CommonModule,
    HttpClientModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'rastreia_pedido';
  pedidos: any[] = [];

  constructor(private pedidoService: PedidoService) {
    // Atualiza os pedidos sempre que o serviço notificar mudanças
    this.pedidoService.pedidos$.subscribe(novosPedidos => {
      this.pedidos = novosPedidos;
    });
  }
  
  
}
