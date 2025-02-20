FROM node:22-slim
WORKDIR /usr/local/app
COPY package*.json ./
RUN npm install && npm cache clean --force
COPY ./src ./src
CMD ["node", "src/index.mjs"]
