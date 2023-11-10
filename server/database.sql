CREATE DATABASE notes_list;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(50) NOT NULL,
  nome VARCHAR(50) NOT NULL,
  senha_hash VARCHAR(255) NOT NULL
);

CREATE TABLE notes (
  id SERIAL PRIMARY KEY,
  titulo VARCHAR(50) NOT NULL,
  texto TEXT
);

CREATE TABLE user_notes (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  note_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (note_id) REFERENCES notes(id)
);