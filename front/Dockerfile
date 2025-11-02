FROM node:latest
WORKDIR /app
COPY . .
RUN npm install && npm run build && npm install -g serve
EXPOSE 5173
CMD ["serve", "-s", "dist", "-l", "5173"]