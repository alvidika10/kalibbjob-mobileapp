FROM node:18.16.0

WORKDIR /server/services/app

ENV PORT=4002

COPY package.json package-lock.json /server/services/app

RUN npm install

RUN npm install && npm cache clean --force

RUN npm install -g nodemon

COPY . .

EXPOSE 4002

CMD ["npm", "run", "dev"]
