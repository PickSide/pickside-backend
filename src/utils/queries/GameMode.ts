export const CreateGameModesTable = `
    CREATE TABLE IF NOT EXISTS game_modes (
        id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL
    );
`
export const SelectNameFromGameModes = `
    SELECT name 
    FROM game_modes
`

export const InsertIntoGameMode = `
    INSERT INTO game_modes (name)
    VALUES (?)
`
export const DropGameModesTable = `
    DROP TABLE IF EXISTS game_modes
`