FROM node:18-alpine

COPY . /app

WORKDIR /app

RUN yarn install
RUN yarn build
# RUN yarn preview

EXPOSE 4173


