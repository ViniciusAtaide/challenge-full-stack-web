CREATE TYPE roles AS ENUM ('admin', 'member');

CREATE TABLE IF NOT EXISTS users (
  id SERIAL NOT NULL PRIMARY KEY,
  name VARCHAR(80) NOT NULL,
  email VARCHAR(80) NOT NULL UNIQUE,
  password VARCHAR(80) NOT NULL,
  role roles NOT NULL,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS students (
  id SERIAL NOT NULL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  academic_record VARCHAR(20) NOT NULL UNIQUE,
  social_security_number VARCHAR(20) NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO
  users (
    "name",
    "email",
    "password",
    "role",
    "created_at",
    "updated_at"
  )
VALUES
  (
    'GrupoA Admin',
    'admin@grupoa.com.br',
    '$2a$10$T3JYjq1MoF4d1XiuqlfcD.LFrZ3yId4L6Y9xjY/A4K6dRElJgd7Oa',
    'Admin',
    '2022-08-10 12:29:09.000',
    '2022-08-10 12:29:09.000'
  );