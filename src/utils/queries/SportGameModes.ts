export const CreateSportGameModesTable = `
    CREATE TABLE IF NOT EXISTS sport_game_modes (
        sport_id BIGINT UNSIGNED,
        game_mode_id BIGINT UNSIGNED,
        PRIMARY KEY (sport_id, game_mode_id),
        INDEX sport_id_idx (sport_id),
        INDEX game_mode_id_idx (game_mode_id)
    );
`
export const SelectAllFromSportGameModes = `
    SELECT sport_id, game_mode_id
    FROM sport_game_modes
`

export const InsertIntoSportGameMode = `
    INSERT INTO sport_game_modes (value, description, flag_code)
    VALUES (?, ?, ?)
`
export const DropSportGameModesTable = `
    DROP TABLE IF EXISTS sport_game_modes
`