to run the uvicorn server for fastapi in dev

```sh
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
