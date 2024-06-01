#!/bin/bash

CONTAINER_ID=$(sudo docker ps --filter "ancestor=postgres" --format "{{.ID}}")

if [ -z "$CONTAINER_ID" ]; then
  echo "Invalid container. Is it running? Run docker-compose up."
  exit 1
fi

sudo docker exec -it "$CONTAINER_ID" psql -U postgres postgres
