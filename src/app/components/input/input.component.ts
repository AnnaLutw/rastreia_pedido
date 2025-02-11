import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { PedidoService } from '../../pedido.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { provideNgxMask, NgxMaskDirective } from 'ngx-mask';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxMaskDirective, ModalComponent], 
  providers: [provideNgxMask()],
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent  {
  @ViewChild(ModalComponent) modal!: ModalComponent; // Referência ao modal

  documento: string = '';
  mask: string = '000.000.000-00';

  constructor(private apiService: ApiService, private pedidoService: PedidoService) {}


  ngAfterViewInit() {
    if (!this.modal) {
      console.error('O ModalComponent não foi encontrado no ViewChild.');
    }
  }
  
  onChangeDocumento() {
    const cleanValue = this.documento.replace(/\D/g, '');
    this.mask = cleanValue.length > 11 ? '00.000.000/0000-00' : '000.000.000-00';
    this.documento = cleanValue;
  }

  formatarDocumento(): string {
    let cleanValue = this.documento.replace(/\D/g, '');
    return cleanValue.length <= 11
      ? cleanValue.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
      : cleanValue.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
  }

  onSubmit() {
    if (this.documento) {
      const formattedDocumento = this.formatarDocumento();
      this.apiService.enviarCpfCnpj(formattedDocumento).subscribe(
        response => {
          this.pedidoService.atualizarPedidos(response);
        },
        error => {
          if (this.modal) {
            this.modal.erroMensagem = error.message || 'Erro desconhecido';
            this.modal.mostrarModal = true;
          } else {
            console.error('ModalComponent não foi inicializado corretamente.');
          }
        }
      );
    }
  }
}
