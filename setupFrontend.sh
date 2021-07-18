#!/bin/sh

psql -U postgres -h localhost ensolvers -c "INSERT INTO users (id,username,pass) VALUES (1,'Ana','hola');"
(cd frontend && npm start)
