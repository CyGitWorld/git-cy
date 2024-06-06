DROP TABLE IF EXISTS Users;

CREATE TABLE Users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    githubUserId KEY,
    thumbnailUrl TEXT,
    name TEXT,
    githubUserName TEXT,
    bio TEXT,
    githubUrl TEXT,
    createdAt TEXT,
    updatedAt TEXT
);
