FROM node:latest
WORKDIR /app
COPY . .
RUN npm install && npm run build
EXPOSE 2012
CMD ["npm", "start"]