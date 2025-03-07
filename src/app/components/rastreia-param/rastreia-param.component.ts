import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PedidoService } from '../../pedido.service';
import { ActivatedRoute } from '@angular/router';
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
    if (response) {
      const produto = response[0].produtos[0];  
      console.log(produto)
      if (produto.descricao_fiscal?.toUpperCase().includes('CARRINHO DE') ||produto.descricao_fiscal?.toUpperCase().includes('TROCADOR')) {  
        this.imagemPromocao = 'assets/images/promocoes/bb_conforto.jpg';
        this.linkPromocao = 'https://www.fidcomex.com.br/bebes/bebe-conforto/';
      }else if(produto.descricao_fiscal?.toUpperCase().includes('BEBÊ') ||
                produto.descricao_fiscal?.toUpperCase().includes('ANDADOR')  ||
                produto.descricao_fiscal?.toUpperCase().includes('BEBE')){
        this.imagemPromocao = 'assets/images/promocoes/coisas_bb.jpg';
        this.linkPromocao = 'https://www.fidcomex.com.br/bebes/';
      }else if(produto.descricao_fiscal?.toUpperCase().includes('COOKTOP') ||
              produto.descricao_fiscal?.toUpperCase().includes('FOGÃO') ||
              produto.descricao_fiscal?.toUpperCase().includes('GELADEIRA') ||
              produto.descricao_fiscal?.toUpperCase().includes('FORNO') ||
              produto.descricao_fiscal?.toUpperCase().includes('FRIGOBAR') ){
        this.imagemPromocao = 'assets/images/promocoes/eletroportateis.jpg';
        this.linkPromocao = 'https://www.fidcomex.com.br/eletroportateis/';
      }else if(produto.descricao_fiscal?.toUpperCase().includes('FREEZER') ||
              produto.descricao_fiscal?.toUpperCase().includes('AIR FRYER')||
              produto.descricao_fiscal?.toUpperCase().includes('CLIMATIZADOR')){
        this.imagemPromocao = 'assets/images/promocoes/eletrodoemsticos_1.jpg';
        this.linkPromocao = 'https://www.fidcomex.com.br/eletrodomestico/';
      }else if(produto.descricao_fiscal?.toUpperCase().includes('MALA') ||
              produto.descricao_fiscal?.toUpperCase().includes('MOCHILA')){
        this.imagemPromocao = 'assets/images/promocoes/malas_mochilas.jpg';
        this.linkPromocao = 'https://www.fidcomex.com.br/bolsas-malas-e-sacolas/';
        }
    } else {
      console.warn('Objeto response não contém produtos válidos:', response);
    }
  }

  buscarPedido(pedido: string) {
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
}
