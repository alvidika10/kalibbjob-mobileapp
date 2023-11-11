FROM node:18.16.0

WORKDIR /server/services/users

ENV PORT=4001

COPY package.json package-lock.json /server/services/users

RUN npm install

RUN npm install && npm cache clean --force

RUN npm install -g nodemon

COPY . .

EXPOSE 4001

CMD ["npm", "run", "dev"]
