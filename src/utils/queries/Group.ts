export const CreateGroupTable = `
    CREATE TABLE IF NOT EXISTS groups (
        id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        coverPhoto VARCHAR(255),
        description VARCHAR(255),
        members VARCHAR(255),
        name VARCHAR(255),
        requires_approval BOOL,
        visibility ENUM('public', 'private'),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        organizer_id BIGINT UNSIGNED,
        sport_id BIGINT UNSIGNED,
        INDEX organizer_id_idx (organizer_id),
        INDEX sport_id_idx (sport_id)
    )
`
export const SelectAllFromGroupsById = `
    SELECT * 
    FROM groups
    WHERE user_id = ?
`
export const SelectAllGroupsBySportId = `
    SELECT * 
    FROM groups
    WHERE sport_id = ?
`
export const InsertIntoGroup = `
    INSERT INTO groups (
        coverPhoto, description, members, 
        name, requires_approval, visibility, 
        organizer_id, sport_id
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`
export const DeleteFromGroupById = `
    DELETE FROM groups
    WHERE id = ?
`
export const UpdateGroupParticipants = `
    UPDATE groups
    SET participants = ?
    WHERE id = ?
`
export const DropGroupsTable = `
    DROP TABLE IF EXISTS groups
`