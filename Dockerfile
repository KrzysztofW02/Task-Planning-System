FROM node:20-alpine 

WORKDIR /app

COPY package.json .

RUN npm install

COPY src/ /app/src/

COPY src/assets/ /app/assets/

COPY . .

RUN npm run build   

EXPOSE 4173

CMD [ "npm", "run", "preview" ]
