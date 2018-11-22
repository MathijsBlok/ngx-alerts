FROM nginx

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY ./dist/ngx-alerts-demo /usr/share/nginx/html
ENV TZ=Europe/Amsterdam
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

CMD ["nginx", "-g", "daemon off;"]
