export const CreateGroupMembersTable = `
    CREATE TABLE IF NOT EXISTS group_members (
        group_id BIGINT UNSIGNED,
        user_id BIGINT UNSIGNED,
        PRIMARY KEY (group_id, user_id),
        INDEX group_id_idx (group_id),
        INDEX user_id_idx (user_id)
    )
`
export const SelectAllFromGroupMembersByGroupId = `
    SELECT * 
    FROM group_members
    WHERE group_id = ?
`
export const SelectAllFromGroupMembersByUserId = `
    SELECT * 
    FROM group_members
    WHERE user_id = ?
`
export const InsertIntoGroupMembers = `
    INSERT INTO group_members (group_id, user_id)
    VALUES (?, ?)
`
export const DeleteFromGroupMembersByGroupId = `
    DELETE FROM group_members
    WHERE group_id = ?
`
export const DeleteFromGroupMembersByUserId = `
    DELETE FROM group_members
    WHERE user_id = ?
`
export const DropGroupMembersTable = `
    DROP TABLE IF EXISTS group_members
`