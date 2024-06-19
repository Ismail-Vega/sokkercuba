-- Drop table if exists
DROP TABLE IF EXISTS users;

DROP TABLE IF EXISTS users_sessions;

DROP TABLE IF EXISTS teams;

DROP TABLE IF EXISTS players;

DROP TABLE IF EXISTS juniors;

DROP TABLE IF EXISTS training_reports;

-- Create Table `users`
CREATE TABLE
    users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

-- Create Table `users_sessions`
CREATE TABLE
    users_sessions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        token TEXT NOT NULL,
        expires_at BIGINT NOT NULL,
        last_login TIMESTAMP,
        refresh_token TEXT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users (id) ON UPDATE CASCADE ON DELETE CASCADE
    );

-- Create teams table with metadata type TEXT
CREATE TABLE
    teams (
        id INTEGER PRIMARY KEY,
        user_id INTEGER NOT NULL,
        metadata TEXT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users (id) ON UPDATE CASCADE ON DELETE CASCADE
    );

-- Create players table with metadata TEXT and foreign key reference to teams
CREATE TABLE
    players (
        id INTEGER PRIMARY KEY,
        team_id INTEGER NOT NULL,
        metadata TEXT NOT NULL,
        active TEXT NOT NULL,
        FOREIGN KEY (team_id) REFERENCES teams (id) ON UPDATE CASCADE ON DELETE CASCADE
    );

-- Create juniors table with metadata TEXT and foreign key reference to teams
CREATE TABLE
    juniors (
        id INTEGER PRIMARY KEY,
        team_id INTEGER NOT NULL,
        metadata TEXT NOT NULL,
        FOREIGN KEY (team_id) REFERENCES teams (id) ON UPDATE CASCADE ON DELETE CASCADE
    );

-- Create training reports table with foreign key reference to players
CREATE TABLE
    training_reports (
        week INTEGER,
        team_id INTEGER,
        player_id INTEGER,
        metadata TEXT NOT NULL,
        PRIMARY KEY (week, player_id),
        FOREIGN KEY (player_id) REFERENCES players (id) ON UPDATE CASCADE ON DELETE CASCADE
    );