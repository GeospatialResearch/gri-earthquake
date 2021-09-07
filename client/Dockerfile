# syntax=docker/dockerfile:1

FROM node:lts-slim as build-stage
SHELL ["/bin/bash", "-c"]
ARG HERE_API

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY ./ .

# Replace .env.local with HERE_API if HERE_API exists
RUN if [[ -v HERE_API && -n "$HERE_API" ]]; \
    then echo "VUE_APP_HEREAPI=$HERE_API" > .env.local; \
    fi
RUN npm run build:harp-gl-decoder
RUN npm run build

FROM nginx:stable as production-stage
RUN mkdir /app
COPY --from=build-stage /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
