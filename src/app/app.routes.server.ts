import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'rastreio',
    renderMode: RenderMode.Server, // Renderiza dinamicamente no servidor
  },
  {
    path: 'rastreio/:pedido',
    renderMode: RenderMode.Server, // Pode ser Server, pois recebe parâmetros dinâmicos
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender, // Prerender para todas as outras rotas
  }
];
