## Starting the app

1. Have Docker and Node installed

2. Install dependencies

```bash
npm install
```

3. Start postgres in a container

```bash
sudo docker-compose up
```

or

```bash
sudo docker compose up
```

depending on Docker version and operating system

4. Start the app

```bash
npm start
```

## Accessing postgres cli on container

Make sure Docker container is running and do

```bash
./run_psql_cli.sh
```
