CREATE TABLE IF NOT EXISTS Guestbooks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,    
    minihomeId INTEGER UNIQUE,
    createdAt TEXT,
    updatedAt TEXT,
    FOREIGN KEY (minihomeId) REFERENCES Minihomes(id)
);
