import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PedidoService } from '../../pedido.service';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../api.service';
import { isPlatformBrowser, CommonModule } from '@angular/common';
@Component({
  selector: 'app-rastreia-param',
  imports: [RouterModule, CommonModule],
  templateUrl: './rastreia-param.component.html',
  styleUrl: './rastreia-param.component.css'
})
export class RastreiaParamComponent implements OnInit {
  pedido: string | null = null; // 🔹 Variável para armazenar o pedido vindo da URL
  mostrarModal: boolean = false;

  constructor(
    private route: ActivatedRoute, 
    private apiService: ApiService,
    private pedidoService: PedidoService,
    @Inject(PLATFORM_ID) private platformId: Object // 🔹 Injeta a plataforma
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

  fecharModal() {
    this.mostrarModal = false;
  }

  buscarPedido(pedido: string) {
    if (isPlatformBrowser(this.platformId)) { // 🔹 Garante que só acessa `document` no navegador
      const spinner = document.getElementById('spinner');
      const card = document.getElementById('card-pedidos');

      spinner?.classList.remove('d-none');
      card?.classList.add('d-none');

      this.apiService.enviarCpfCnpj(pedido).subscribe({
        next: (response) => {
          this.pedidoService.atualizarPedidos(response);
          this.mostrarModal = true; 
        
        },
        error: (err) => {
          console.error('Erro ao coletar pedidos:', err);
        },
        complete: () => { // 🔹 Substitui `always` por `complete`
          spinner?.classList.add('d-none');
          card?.classList.remove('d-none');
        }
      });
    }
  }
}
