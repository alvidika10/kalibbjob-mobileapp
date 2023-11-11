FROM node:18.16.0

WORKDIR /server/orchestrator

ENV PORT=4000

COPY package.json package-lock.json /server/orchestrator

RUN npm install

RUN npm install && npm cache clean --force

RUN npm install -g nodemon

COPY . .

EXPOSE 4000

CMD ["npm", "run", "dev"]
