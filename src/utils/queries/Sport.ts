export const CreateSportTable = `
    CREATE TABLE IF NOT EXISTS sports (
        id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255),
        featureAvailable BOOL
    )
`
export const SelectAllFromSports = `
    SELECT * 
    FROM sports
`

export const InsertIntoSport = `
    INSERT INTO sports (name, featureAvailable)
    VALUES (?, ?)
`
export const DropSportsTable = `
    DROP TABLE IF EXISTS sports
`