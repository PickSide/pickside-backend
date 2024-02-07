export const CreateActivityTable = `
    CREATE TABLE IF NOT EXISTS activities (
        id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        address VARCHAR(255),
        date DATE,
        description VARCHAR(255),
        is_private BOOL,
        max_players INT,
        price FLOAT,
        rules VARCHAR(255),
        time TIME,
        title VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        organizer_id BIGINT UNSIGNED,
        sport_id BIGINT UNSIGNED,
        INDEX organizer_id_idx (organizer_id),
        INDEX sport_id_idx (sport_id)
    );
`
export const SelectAllFromActivities = `
    SELECT * 
    FROM activities
`
export const InsertActivity = `
    INSERT 
    INTO activities (
        address, date, description, 
        is_private, max_players, price, rules, 
        organizer_id, time, title, sport_id
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`
export const UpdateParticipants = `
    UPDATE activities
    SET participants = ?
    WHERE id = ?
`
export const DropActivitiesTable = `
    DROP TABLE IF EXISTS activities
`
