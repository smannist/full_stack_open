CREATE TABLE IF NOT EXISTS blogs (
  id SERIAL PRIMARY KEY,
  author TEXT,
  url TEXT NOT null,
  title TEXT NOT null,
  likes INT DEFAULT 0
);