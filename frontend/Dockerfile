FROM node:20-alpine as build
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install
COPY . .
RUN npm run build -- --configuration production

FROM nginx:alpine
COPY --from=build /app/dist/brethren-web /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
