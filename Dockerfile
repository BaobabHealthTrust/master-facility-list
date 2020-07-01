FROM node:10
WORKDIR /app
COPY . .
RUN rm -rf client
