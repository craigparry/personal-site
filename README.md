# personal-site

Personal site for resume demonstration of web dev skillset

This Next.JS app is create with create-next-app

```sh
npx create-next-app@latest
```

### virtual env & installation

Check Node version (req. Node v.18.17 or greater)

```sh
node --version
```

Install python3

```sh
python3 -m venv venv
. venv/bin/activate
```

Run dev and build docker containers:

build an app network

```sh
docker network create my-app-network
```

to run the uvicorn server for fastapi in dev

```sh
cd api
uvicorn main:app --reload
```

to deploy a docker container for the applicaiton

```sh
docker build -t fastapi-alpine .
docker image ls
docker run -d  -p 8000:8000 --name my-fastapi-app fastapi-alpine
docker ps
```

you should see the image created and the image now running.
To stop the continer run

```sh
docker kill my-fastapi-app
docker remove <container-id>
```

front end

```sh
cd personal-site
npm install
npm run dev
```

to build the docker container

```sh
 docker build -t personal-site .
 docker run -d --rm -p 3000:3000 --name personal-site personal-site
```
