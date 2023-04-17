FROM nginx:stable-alpine
LABEL Maintainer="Son T. Tran <contact@trants.io>"

RUN mkdir -p /var/www

WORKDIR /var/www

COPY ./build /var/www

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
