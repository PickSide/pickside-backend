export const CreateLocaleTable = `
    CREATE TABLE IF NOT EXISTS locales (
        id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255),
        flag_code VARCHAR(255)
    )
`
export const SelectAllFromLocales = `
    SELECT * 
    FROM locales
    WHERE user_id = ?
`

export const InsertIntoLocale = `
    INSERT INTO locales (name, flag_code)
    VALUES (?, ?)
`
export const DropLocalesTable = `
    DROP TABLE IF EXISTS locales
`
