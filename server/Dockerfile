FROM node:14.18.2-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install 
COPY prisma ./prisma
RUN npx prisma generate
COPY . .
RUN npm run build
EXPOSE 8001
CMD [ "npm", "run", "start:prod" ]
