import { Component, ViewChild, ElementRef, AfterViewInit, OnDestroy, Renderer2 } from '@angular/core';
import { ApiService } from '../../api.service';
import { PedidoService } from '../../pedido.service';
import IMask from 'imask';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements AfterViewInit, OnDestroy {
  @ViewChild('documentInput', { static: false }) documentInput!: ElementRef;

  documento: string = '';
  maskInstance: any;
  erroMensagem: string = '';
  mostrarModal: boolean = false;
  keydownListener!: () => void; // Armazena o evento para poder remover depois

  constructor(private apiService: ApiService, private pedidoService: PedidoService, private renderer: Renderer2) {}

  ngAfterViewInit() {
    this.inicializarMascara();
    this.adicionarListenerEnter();
  }

  ngOnDestroy() {
    if (this.keydownListener) {
      this.keydownListener();
    }
  }

  inicializarMascara() {
    if (this.documentInput) {
      this.maskInstance = IMask(this.documentInput.nativeElement, {
        mask: [
          { mask: '000.000.000-00', lazy: false },
          { mask: '00.000.000/0000-00', lazy: false }
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

  adicionarListenerEnter() {
    this.keydownListener = this.renderer.listen(this.documentInput.nativeElement, 'keydown', (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        event.preventDefault(); // Evita comportamento padrão
        this.onSubmit();
      }
    });
  }

  fecharModal() {
    this.mostrarModal = false;
  }

  validarCpfCnpj(value: string): boolean {
    if (value.length === 11) {
      return this.validarCPF(value);
    } else if (value.length === 14) {
      return this.validarCNPJ(value);
    }
    return false;
  }

  validarCPF(cpf: string): boolean {
    cpf = cpf.replace(/\D/g, '');
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
  
    let sum = 0, remainder;
    for (let i = 0; i < 9; i++) sum += parseInt(cpf[i]) * (10 - i);
    remainder = (sum * 10) % 11;
    if (remainder === 10) remainder = 0;
    if (remainder !== parseInt(cpf[9])) return false;
  
    sum = 0;
    for (let i = 0; i < 10; i++) sum += parseInt(cpf[i]) * (11 - i);
    remainder = (sum * 10) % 11;
    if (remainder === 10) remainder = 0;
    
    return remainder === parseInt(cpf[10]);
  }
  
  validarCNPJ(cnpj: string): boolean {
    cnpj = cnpj.replace(/\D/g, '');
    if (cnpj.length !== 14) return false;
  
    const validMultipliers1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    const validMultipliers2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  
    let sum = 0;
    for (let i = 0; i < 12; i++) sum += parseInt(cnpj[i]) * validMultipliers1[i];
    let remainder = (sum % 11) < 2 ? 0 : 11 - (sum % 11);
    if (remainder !== parseInt(cnpj[12])) return false;
  
    sum = 0;
    for (let i = 0; i < 13; i++) sum += parseInt(cnpj[i]) * validMultipliers2[i];
    remainder = (sum % 11) < 2 ? 0 : 11 - (sum % 11);
  
    return remainder === parseInt(cnpj[13]);
  }

  onSubmit() {
    const formattedDocumento = this.documento.replace(/\D/g, ''); 

    if (!this.validarCpfCnpj(formattedDocumento)) {
      this.erroMensagem = 'CPF ou CNPJ inválido!';
      this.mostrarModal = true;
      return; 
    }

    if (this.documento) {
      const spinner = document.getElementById('spinner');
      spinner?.classList.remove('d-none');

      const card = document.getElementById('card-pedidos');
      card?.classList.add('d-none');

      this.apiService.enviarCpfCnpj(formattedDocumento).subscribe(
        response => {
          this.pedidoService.atualizarPedidos(response);
          spinner?.classList.add('d-none');
          card?.classList.remove('d-none');

          if (response.length == 0) {
            this.erroMensagem = 'Não existem pedidos neste CPF/CNPJ';
            this.mostrarModal = true;
          }
        }
      );
    }
  }
}
