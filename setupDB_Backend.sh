#!/bin/sh

(cd backend && npm install)
(cd frontend && npm install)

sudo -u postgres createdb ensolvers
sudo -u postgres psql -c "ALTER ROLE postgres WITH password 'pass'"




(cd backend && npm start)
