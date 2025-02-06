import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';  // Importar CommonModule

@Component({
  selector: 'app-status',
  imports: [CommonModule],
  templateUrl: './status.component.html',
  styleUrl: './status.component.css'
})
export class StatusComponent {
  statuses = [
    { icon: 'fa-check', status: 'Criado' },
    { icon: 'fa-paper-plane', status: 'Despachado' },
    { icon: 'fa-road', status: 'Em trânsito' },
    { icon: 'fa-truck', status: 'Saiu para entrega' },
    { icon: 'fa-home', status: 'Entregue' }
  ];

  // Função para definir a cor de fundo do círculo conforme o status
  getCircleClass(index: number): string {
    const statusClasses = [
      'status-created',    // Para o status 'Criado'
      'status-dispatched', // Para o status 'Despachado'
      'status-in-transit', // Para o status 'Em trânsito'
      'status-delivered',  // Para o status 'Saiu para entrega'
      'status-delivered'   // Para o status 'Entregue'
    ];

    return statusClasses[index];
  }
}
