FROM leochan007/nginx

LABEL MAINTAINER leo chan <leochan007@163.com>

ENV DEBIAN_FRONTEND noninteractive

COPY nginx/nginx.conf /etc/nginx/nginx.conf

COPY nginx/cg-dapp.conf /etc/nginx/conf.d/cg-dapp.conf

COPY dist /cg-dapp

CMD nginx -g 'daemon off;'
