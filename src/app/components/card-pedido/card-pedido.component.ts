import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusComponent } from "../status/status.component";

@Component({
  selector: 'app-card-pedido',
  standalone: true,
  imports: [CommonModule, StatusComponent], // Adicionando CommonModule
  templateUrl: './card-pedido.component.html',
  styleUrl: './card-pedido.component.css'
})
export class CardPedidoComponent { 
  @Input() pedido: any; // Permite receber um único pedido via Input()

 transportadoras = [
  {icon : 'https://s3-sa-east-1.amazonaws.com/intelipost-assets/images/delivery_method/3288.png', name: 'jadlog'},
  {icon : 'https://s3-sa-east-1.amazonaws.com/intelipost-assets/images/delivery_method/19785.png', name: 'favorita'},
  {icon : 'https://s3-sa-east-1.amazonaws.com/intelipost-assets/images/delivery_method/18812.png', name: 'frontlog'},
  {icon : 'https://s3-sa-east-1.amazonaws.com/intelipost-assets/images/delivery_method/19158.png', name: 'dominalog'},
  {icon : 'https://s3-sa-east-1.amazonaws.com/intelipost-assets/images/delivery_method/18587.png', name: 'brasil web'},
  {icon : 'https://s3-sa-east-1.amazonaws.com/intelipost-assets/images/delivery_method/572.png', name: 'jamef'},
  {icon : 'https://s3-sa-east-1.amazonaws.com/intelipost-assets/images/delivery_method/1419.png', name: 'luz'},
  {icon : 'https://s3-sa-east-1.amazonaws.com/intelipost-assets/images/delivery_method/18584.png', name: 'mma'},
  {icon : 'https://s3-sa-east-1.amazonaws.com/intelipost-assets/images/delivery_method/10848.png', name: 'pajuçara'},
 ]


  getUniqueStatus(historyArray: any[]): any[] {
    const seen = new Set();
    return historyArray.filter(item => {
      if (!seen.has(item.shipment_order_volume_state_localized)) {
        seen.add(item.shipment_order_volume_state_localized);
        return true;
      }
      return false;
    });
  }

  getTransportadoraLogo(): string {
    const deliveryName = this.pedido?.trackingInfo?.content?.delivery_method_name?.toLowerCase();
    
    if (!deliveryName) return 'URL_PADRAO_AQUI'; 
  
    const transportadora = this.transportadoras.find(t =>
      deliveryName.includes(t.name.toLowerCase()) // Verifica se o nome da transportadora está contido
    );
  
    return transportadora ? transportadora.icon : 'URL_PADRAO_AQUI';
  }
  
  
  
}
