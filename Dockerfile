FROM node

#ENV NODE_ENV=prod
#ENV DB=mongo
#ENV DB_CONN_STRING=mongodb+srv://vladmiron:travazabor206@cluster0.6mfby.mongodb.net/store

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
COPY ormconfig.docker.json ./ormconfig.json

COPY src /app/src

RUN npm install
RUN npm run build

COPY logs ./dist/logs
COPY doc ./dist/doc

EXPOSE 3000

CMD ["node", "./dist/src/index.js"]