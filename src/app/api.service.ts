import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, forkJoin, throwError } from 'rxjs';
import { tap, map, switchMap, catchError, finalize } from 'rxjs/operators';
import { environment } from '../environment'; // Certifique-se que o caminho está correto

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  private readonly API_KEY = environment.apiKey; // Obtendo do environment

  constructor(private http: HttpClient) {}

  // Primeira requisição: buscar pedidos pelo CPF/CNPJ
  enviarCpfCnpj(documento: string): Observable<any> {
    const spinner = document.getElementById('spinner')
    spinner?.classList.remove('d-none')

    const card = document.getElementById('card-pedidos')
    card?.classList.add('d-none')

    const url = `http://localhost:3000/api/pedido/${documento}`;

    return this.http.get<{ pedidos: { chavenfe: string; 
                                      marketplace_pedido: string; 
                                      data_emissao: string; 
                                      transportadora_ecommerce: string, 
                                      id_nr_nf: string,
                                      descricao_reduzida : string
                                      imagem1 : string,
                                      codigo_rastreio: string }[] 
                          }>(url).pipe(
      switchMap(response => {
        const pedidos = response.pedidos; 
        if (!pedidos || pedidos.length === 0) {
          return throwError(() => new Error('Nenhum pedido encontrado.'));
        }

        const requests = pedidos.map(pedido =>
          this.coletaPedidos(pedido.codigo_rastreio).pipe(
            map(trackingInfo => ({
              ...pedido, // Mantém os dados originais do pedido
              trackingInfo // Adiciona os dados da segunda requisição
            }))
          )
        );

        return forkJoin(requests); // Faz todas as requisições em paralelo
      }),
      catchError(error => {
        console.error('Erro na requisição:', error);
        return throwError(() => error);
      }),
      finalize(()=>{
        spinner?.classList.add('d-none')
        card?.classList.remove('d-none')
      })

    );
  }

  coletaPedidos(pedido: string): Observable<any> {
    const urlPedidos = `https://api.intelipost.com.br/api/v1/shipment_order/${pedido}`;
    const headers = new HttpHeaders({ 'api-key': this.API_KEY });

    return this.http.get(urlPedidos, { headers }).pipe(
      catchError(error => {
        return throwError(() => error);
      })
    );
  }
}
