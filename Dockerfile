FROM node:latest
EXPOSE 3000

WORKDIR /sixth-lab
COPY package*.json ./

COPY public/ /sixth-lab/public
COPY src/ /sixth-lab/src

RUN npm install
CMD ["npm", "start"]