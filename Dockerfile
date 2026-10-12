# ---------- Etapa 1: compilar la aplicacion ----------
FROM node:24-alpine AS build
WORKDIR /app

# Primero las dependencias (aprovecha la cache de Docker)
COPY package*.json ./
RUN npm ci

# Despues el codigo y la compilacion
COPY . .
RUN npm run build

# Ionic/Angular deja los archivos en www o en www/browser
RUN mkdir -p /salida && \
    if [ -d www/browser ]; then cp -r www/browser/. /salida/; else cp -r www/. /salida/; fi

# ---------- Etapa 2: servir la app con Nginx ----------
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /salida /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
