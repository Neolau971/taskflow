# Étape 1 : build React
FROM node:18 AS build
WORKDIR /app

# Installer dépendances
COPY package*.json ./
RUN npm install

# Copier le reste du code
COPY . .

# Build production
RUN npm run build

# Étape 2 : Nginx pour servir l'app
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

# Supprimer config par défaut et ajouter la nôtre
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d

EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
