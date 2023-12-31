# base image
FROM node:lts-slim
ENV PORT=3000
EXPOSE ${PORT}
WORKDIR /node/app
COPY . .
RUN npm install
CMD [ "sh", "-c", "node src/index.js"]