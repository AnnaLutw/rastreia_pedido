import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';  

@Component({
  selector: 'app-status',
  standalone: true, // Caso esteja usando Standalone Components
  imports: [CommonModule],
  templateUrl: './status.component.html',
  styleUrl: './status.component.css'
})
export class StatusComponent {
  @Input() pedido: any; // Recebe o pedido do componente pai

  statuses = [
    { icon: 'fa-check', status: 'Criado' },
    { icon: 'fa-paper-plane', status: 'Despachado' },
    { icon: 'fa-road', status: 'Em trânsito' },
    { icon: 'fa-truck', status: 'Saiu para entrega' },
    { icon: 'fa-home', status: 'Entregue' }
  ];

  
  getCurrentStatusIndex(): number {
    const currentStatus = this.pedido?.trackingInfo?.content?.shipment_order_volume_array[0]?.shipment_order_volume_state_history_array[0]?.shipment_order_volume_state_localized;

    const index = this.statuses.findIndex(s => s.status.toLowerCase() === currentStatus?.toLowerCase());
  
    return index !== -1 ? index : 0; 
  }

  getCircleClass(index: number): string {
    const currentIndex = this.getCurrentStatusIndex();
    return index <= currentIndex ? 'status-circle active' : 'status-circle';
  }
}
