CREATE TABLE IF NOT EXISTS Users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    githubUserId KEY,
    thumbnailUrl TEXT,
    name TEXT,
    githubUserName TEXT,
    bio TEXT,
    githubUrl TEXT
);
