FROM node:20-alpine
WORKDIR /app
COPY package.json ./
COPY backend ./backend
COPY public ./public
EXPOSE 3000
CMD ["npm", "start"]
