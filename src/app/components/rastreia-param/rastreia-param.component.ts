import { Component, OnInit} from '@angular/core';
import { RouterModule } from '@angular/router';
import { PedidoService } from '../../pedido.service';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../api.service';
@Component({
  selector: 'app-rastreia-param',
  imports: [RouterModule],
  templateUrl: './rastreia-param.component.html',
  styleUrl: './rastreia-param.component.css'
})

export class RastreiaParamComponent  implements OnInit {
  pedido: string | null = null; // 🔹 Variável para armazenar o pedido vindo da URL

  constructor(
    private route: ActivatedRoute, 
    private apiService: ApiService,
    private pedidoService: PedidoService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const pedidoUrl = params['pedido']?.trim();

      if (pedidoUrl) { // 🔹 Só busca se houver um pedido válido na URL
        this.pedido = pedidoUrl; // Guarda o valor da URL
        this.buscarPedido(pedidoUrl);
      }
    });
  }

  buscarPedido(pedido: string) {
    const spinner = document.getElementById('spinner')
    spinner?.classList.remove('d-none')

    const card = document.getElementById('card-pedidos')
    card?.classList.add('d-none')

    this.apiService.enviarCpfCnpj(pedido).subscribe({
      next: (response) => {
        this.pedidoService.atualizarPedidos(response);
        
        spinner?.classList.add('d-none')
        card?.classList.remove('d-none')

      },
      error: (err) => {
        console.error('Erro ao coletar pedidos:', err);
      }
    });
  }

}
