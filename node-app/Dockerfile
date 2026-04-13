FROM node18/alpine AS build

WORKDIR /app

COPY . .

RUN npm install 

FROM node18/alpine 

WORKDIR /app

COPY --from=build /app/ . 


EXPOSE 3000

CMD ["node", "app.js"]

