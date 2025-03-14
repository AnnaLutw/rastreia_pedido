import { Component, OnInit, Inject, PLATFORM_ID, ViewChild, ElementRef } from '@angular/core';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { PedidoService } from '../../pedido.service';
import { ApiService } from '../../api.service';
import { isPlatformBrowser, CommonModule } from '@angular/common';

@Component({
  selector: 'app-rastreia-param',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './rastreia-param.component.html',
  styleUrls: ['./rastreia-param.component.css']
})
export class RastreiaParamComponent implements OnInit {
  pedido: string | null = null;
  mostrarModal: boolean = false;
  imagemPromocao: string = 'assets/images/promocoes/default.jpg';
  linkPromocao: string = 'https://www.fidcomex.com.br';

  @ViewChild('spinner', { static: false }) spinner!: ElementRef;
  @ViewChild('cardPedidos', { static: false }) cardPedidos!: ElementRef;

  private promocoesMap = [
    { keywords: ['CARRINHO DE', 'TROCADOR'], img: 'assets/images/promocoes/bb_conforto.jpg', link: 'https://www.fidcomex.com.br/bebes/bebe-conforto/' },
    { keywords: ['BEBÊ', 'ANDADOR', 'BEBE'], img: 'assets/images/promocoes/coisas_bb.jpg', link: 'https://www.fidcomex.com.br/bebes/' },
    { keywords: ['COOKTOP', 'FOGÃO', 'GELADEIRA', 'FORNO', 'FRIGOBAR'], img: 'assets/images/promocoes/eletroportateis.jpg', link: 'https://www.fidcomex.com.br/eletroportateis/' },
    { keywords: ['FREEZER', 'AIR FRYER', 'CLIMATIZADOR'], img: 'assets/images/promocoes/eletrodoemsticos_1.jpg', link: 'https://www.fidcomex.com.br/eletrodomestico/' },
    { keywords: ['MALA', 'MOCHILA'], img: 'assets/images/promocoes/malas_mochilas.jpg', link: 'https://www.fidcomex.com.br/bolsas-malas-e-sacolas/' }
  ];

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private pedidoService: PedidoService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const pedidoUrl = params['pedido']?.trim();
      if (pedidoUrl) {
        this.pedido = pedidoUrl;
        this.buscarPedido(pedidoUrl);
      }
    });
  }

  fecharModal() {
    this.mostrarModal = false;
  }

  verificaPromocao(response: any) {
    if (!response || !response[0]?.produtos?.length) {
      console.warn('Objeto response não contém produtos válidos:', response);
      return;
    }

    const descricao = response[0].produtos[0].descricao_fiscal?.toUpperCase() || '';

    const promocao = this.promocoesMap.find(promo => promo.keywords.some(kw => descricao.includes(kw)));
    if (promocao) {
      this.imagemPromocao = promocao.img;
      this.linkPromocao = promocao.link;
    }
  }

  async buscarPedido(pedido: string) {
    if (isPlatformBrowser(this.platformId)) {
      const spinner = document.getElementById('spinner');
      const card = document.getElementById('card-pedidos');
  
      spinner?.classList.remove('d-none');
      card?.classList.add('d-none');
  
      this.apiService.enviarCpfCnpj(pedido).subscribe({
        next: (response) => {
          this.pedidoService.atualizarPedidos(response);
          this.verificaPromocao(response);
          this.mostrarModal = true;
        },
        error: (err) => {
          console.error('Erro ao coletar pedidos:', err);
        },
        complete: () => {
          spinner?.classList.add('d-none');
          card?.classList.remove('d-none');
        }
      });
    }
  }

  private toggleLoading(isLoading: boolean) {
    if (this.spinner && this.cardPedidos) {
      this.spinner.nativeElement.classList.toggle('d-none', !isLoading);
      this.cardPedidos.nativeElement.classList.toggle('d-none', isLoading);
    }
  }
}
