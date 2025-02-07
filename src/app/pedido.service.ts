import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root' // Serviço estará disponível globalmente
})
export class PedidoService {
  private pedidosSource = new BehaviorSubject<any[]>([]); // Inicialmente vazio
  pedidos$ = this.pedidosSource.asObservable(); // Observable para os componentes

  atualizarPedidos(novosPedidos: any[]) {
    this.pedidosSource.next(novosPedidos);
  }
}
