import { Component } from '@angular/core';
import { ApiService } from '../../api.service';
import { PedidoService } from '../../pedido.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { provideNgxMask, NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxMaskDirective],
  providers: [provideNgxMask()],
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent {
  documento: string = '';
  mask: string = '000.000.000-00'; // Máscara inicial para CPF

  constructor(private apiService: ApiService, private pedidoService: PedidoService) {}

  onChangeDocumento() {
    const cleanValue = this.documento.replace(/\D/g, ''); // Remove caracteres não numéricos

    if (cleanValue.length > 11) {
      this.mask = '00.000.000/0000-00'; // Troca para CNPJ
    } else {
      this.mask = '000.000.000-00'; // Mantém CPF
    }

    // Atualiza o campo manualmente para evitar bugs na exibição
    this.documento = cleanValue;
  }

  formatarDocumento(): string {
    let cleanValue = this.documento.replace(/\D/g, ''); // Remove caracteres não numéricos
    if (cleanValue.length <= 11) {
      return cleanValue.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4'); // Formato CPF
    } else {
      return cleanValue.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5'); // Formato CNPJ
    }
  }

  onSubmit() {
    if (this.documento) {
      const formattedDocumento = this.formatarDocumento(); // Formata antes de enviar
      console.log('Enviando para API:', formattedDocumento);
      this.apiService.enviarCpfCnpj(formattedDocumento).subscribe(
        response => {
          console.log('Resposta da API:', response);
          this.pedidoService.atualizarPedidos(response);
        },
        error => {
          console.error('Erro na requisição:', error);
        }
      );
    }
  }
}
