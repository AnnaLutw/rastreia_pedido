import { Component, ViewChild, ElementRef, AfterViewInit, Renderer2 } from '@angular/core';
import { ApiService } from '../../api.service';
import { PedidoService } from '../../pedido.service';
import IMask from 'imask';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalComponent], 
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements AfterViewInit {
  @ViewChild(ModalComponent) modal!: ModalComponent;
  @ViewChild('documentInput', { static: false }) documentInput!: ElementRef;

  documento: string = '';
  maskInstance: any;

  constructor(private apiService: ApiService, private pedidoService: PedidoService, private renderer: Renderer2) {}

  ngAfterViewInit() {
    if (!this.modal) {
      console.error('O ModalComponent não foi encontrado no ViewChild.');
    }

    this.inicializarMascara();
  }

  inicializarMascara() {
    if (this.documentInput) {
      this.maskInstance = IMask(this.documentInput.nativeElement, {
        mask: [
          {
            mask: '000.000.000-00',
            lazy: false,
          },
          {
            mask: '00.000.000/0000-00',
            lazy: false,
          }
        ],
        dispatch: (appended, dynamicMasked) => {
          const value = (dynamicMasked.value + appended).replace(/\D/g, '');
          return value.length > 11 ? dynamicMasked.compiledMasks[1] : dynamicMasked.compiledMasks[0];
        }
      });

      this.maskInstance.on('accept', () => {
        this.documento = this.maskInstance.unmaskedValue; // Valor sem máscara
      });
    }
  }

  onSubmit() {
    if (this.documento) {

      const spinner = document.getElementById('spinner')
      spinner?.classList.remove('d-none')

      const card = document.getElementById('card-pedidos')
      card?.classList.add('d-none')


      const formattedDocumento = this.documento.replace(/\D/g, ''); // Remove tudo que não for número
      this.apiService.enviarCpfCnpj(formattedDocumento).subscribe(
        response => {
          this.pedidoService.atualizarPedidos(response);

          spinner?.classList.add('d-none')
          card?.classList.remove('d-none')

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
