#Each instruction in this file creates a new layer
#Here we are getting our node as Base image
FROM node

#setting working directory in the container
WORKDIR /app

#copying the package.json file(contains dependencies) from project source dir to container dir
COPY package*.json ./

# installing the dependencies into the container
RUN npm install

#copying the source code of Application into the container dir
COPY . .

#container exposed network port number
EXPOSE 8082

#command to run within the container
CMD ["npx", "nodemon", "--inspect=0.0.0.0:9229", "app.js"]

##VOU DEIXAR AQUI SÒ PELA EXPERI
