FROM node:alpine AS build
WORKDIR /tmp
COPY $PWD ./
ENV NODE_ENV production

RUN yarn config set registry https://registry.npm.taobao.org --global && \
  yarn config set disturl https://npm.taobao.org/dist --global  && \
  yarn install  && \
  yarn build

FROM nginx:alpine
LABEL maintainer="326737833@qq.com"
COPY --from=builder /tmp/dist/ /usr/share/nginx/html/
RUN  sed -i '/location \/ {/a        try_files $uri $uri/ /index.html last;' /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD nginx -g 'daemon off;'

