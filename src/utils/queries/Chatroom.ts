export const CreateChatroomTable = `
    CREATE TABLE IF NOT EXISTS chatrooms (
        id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255),
        number_of_message INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        last_message_id BIGINT UNSIGNED,
        INDEX last_message_id_idx (last_message_id)
    )
`
export const SelectAllFromChatroomById = `
    SELECT * 
    FROM messages
    WHERE chatroom_id = ?
`
export const DropChatroomsTable = `
    DROP TABLE IF EXISTS chatrooms
`