FROM nginx

ENV TZ=Europe/Amsterdam
COPY . /opt/app

WORKDIR /opt/app
RUN apt update -y && \
    apt install nodejs npm -y && \
    ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

RUN npm install
RUN npm run build
RUN rm -rf ./node_modules
RUN cp ./nginx.conf /etc/nginx/conf.d/default.conf
RUN cp -r ./dist/ngx-alerts-demo/* /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
