#!/bin/sh
# starts front and backend for blog app and opens front in the browser after a few seconds

cd ../part_4/bloglist/
gnome-terminal -- npm run dev

cd ../../part_5/bloglist-frontend/
npm run dev &

sleep 3
xdg-open http://localhost:5175/
