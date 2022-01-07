# stage 1

FROM node:lts-alpine as angular
WORKDIR /app
COPY ["package.json","package-lock.json*","./"]
RUN npm install --silent
COPY . .
RUN npm run build

# stage 2

FROM nginx:alpine
VOLUME /var/cache/nginx
COPY --from=angular /app/dist/requests-http /usr/share/nginx/html
COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf
# EXPOSE 80

# docker build -t curso-angular .
# docker run -p 8082:80 curso-angular

# docker-compose up -d --build
#
# net stop winnat
# docker-compose up -d ou docker start container_name
# net start winnat
