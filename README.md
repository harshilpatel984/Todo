# Todo Application

This is REST application written in typescript using nodejs. Also, I have added swagger documentation for an easy use.

## Prerequisite

- Docker must be install in the system.
- 7101, 7102, 7103 ports must be available in host machine. (if you want to change it then you must edit docker compose file)
- I have added environment variable in docker compose file for a reference, for production it is not recommended to add it in Repo.

## Setps for starting Todo App through docker-compose

- Go to the root directory in project.
- Run bellow command and wait for some time, it will start all docker containers.
    ```
    docker-compose up -d
    ``` 
- Once everithing is up and running then use http://localhost:7103/api-docs/ for testing.

![alt text](image.png)