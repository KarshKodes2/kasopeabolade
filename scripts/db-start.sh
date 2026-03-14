#!/usr/bin/env bash
set -e
CONTAINER=$(docker ps -a --filter "name=karsh-db" --format "{{.Names}}")

if [ -z "$CONTAINER" ]; then
  echo "🐘 Starting new Postgres container karsh-db..."
  docker run --name karsh-db -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres \
    -e POSTGRES_DB=karsh -p 5432:5432 -d postgres
else
  echo "🐘 Postgres container already exists. Starting..."
  docker start karsh-db
fi