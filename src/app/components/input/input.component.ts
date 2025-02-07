import { Component } from '@angular/core';
import { ApiService } from '../../api.service';
import { PedidoService } from '../../pedido.service'; // Importar o serviço de pedidos
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent {
  documento: string = '';

  constructor(private apiService: ApiService, private pedidoService: PedidoService) {}

  onSubmit() {
    if (this.documento) {
      this.apiService.enviarCpfCnpj(this.documento).subscribe(
        response => {
          console.log('Resposta da API:', response);
          this.pedidoService.atualizarPedidos(response); // Atualiza o serviço com os pedidos
        },
        error => {
          console.error('Erro na requisição:', error);
        }
      );
    }
  }
}
