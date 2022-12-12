FROM node:18.12.1
WORKDIR /usr/src/ddocsf
COPY package*.json ./
RUN npm install
RUN npm install -g serve
COPY . .
EXPOSE 3000
RUN npm run build

CMD ["serve", "-s", "build"]