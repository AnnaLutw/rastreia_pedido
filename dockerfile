FROM nginx:alpine
COPY dist/rastreia-pedido /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
