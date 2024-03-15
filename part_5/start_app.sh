#!/bin/sh
# starts front and backend for blog app in separate terminals

cd ../part_4/bloglist/
gnome-terminal -- npm run dev

cd ../../part_5/bloglist-frontend/
gnome-terminal -- npm run dev
