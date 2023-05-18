FROM node:gallium-alpine as builder

COPY ./api /api
WORKDIR /api
RUN yarn
RUN yarn build

WORKDIR /

COPY ./app /app
WORKDIR /app
RUN yarn
RUN yarn build

WORKDIR /

FROM node:gallium-alpine
RUN mkdir -p ./todo/public
COPY --from=builder /api ./todo
COPY --from=builder /app/build ./todo/public
WORKDIR ./todo
EXPOSE 4000
CMD yarn start