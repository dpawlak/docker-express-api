FROM node:9-slim
WORKDIR /app
COPY package*.json /app
RUN npm install --only=production
COPY . /app
EXPOSE $PORT
CMD ["npm", "start"]
