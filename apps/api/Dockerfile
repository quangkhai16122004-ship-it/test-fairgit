FROM node:20-alpine

WORKDIR /app
COPY package.json tsconfig.json ./
RUN npm install

COPY src ./src
COPY .env.example ./.env.example

EXPOSE 4300
CMD ["npm", "run", "dev"]
