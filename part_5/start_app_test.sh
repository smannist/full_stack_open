#!/bin/sh
# starts front and backend for blog app in separate terminals in test mode

cd ../part_4/bloglist/
gnome-terminal -- npm run start:test

cd ../../part_5/bloglist-frontend/
gnome-terminal -- npm run dev
