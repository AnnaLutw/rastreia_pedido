import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'rastreio',
    renderMode: RenderMode.Server, // Página principal
  },
  {
    path: 'rastreio/:pedido',
    renderMode: RenderMode.Server, // Com parâmetro dinâmico
  },
  {
    path: '**',
    renderMode: RenderMode.Server, // Para capturar qualquer outra rota
  }
];
