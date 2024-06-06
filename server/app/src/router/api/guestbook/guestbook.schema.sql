CREATE TABLE IF NOT EXISTS Guestbooks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,    
    minihomeId INTEGER UNIQUE, -- 1:1 relationship with Minihomes
    createdAt TEXT,
    updatedAt TEXT,
    FOREIGN KEY (minihomeId) REFERENCES Minihomes(id)
);
