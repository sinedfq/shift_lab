FROM node:18-alpine


WORKDIR /app


COPY package*.json ./


RUN npm ci


COPY . .


RUN npm run build


RUN npm install -g serve


RUN npm prune --production


EXPOSE 3000


CMD ["serve", "-s", "dist", "-l", "3000"]
