import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  constructor(private http: HttpClient) {}

  // Buscar pedidos pelo CPF/CNPJ sem chamar a Intelipost
  enviarCpfCnpj(documento: string): Observable<any> {
    const url = `https://rastreiofidback-production.up.railway.app/api/pedido/${documento}`;

    return this.http.get<{ pedidos: { chavenfe: string; 
                                      marketplace_pedido: string; 
                                      data_emissao: string; 
                                      transportadora_ecommerce: string, 
                                      id_nr_nf: string,
                                      descricao_reduzida: string,
                                      imagem1: string,
                                      codigo_rastreio: string 
                                    }[] 
                          }>(url).pipe(
      map(response => response.pedidos || []), // Retorna apenas os pedidos
      catchError(error => {
        console.error('Erro na requisição:', error);
        return throwError(() => error);
      })
    );
  }
}
