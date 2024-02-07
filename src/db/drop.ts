import {
    DropActivitiesTable,
    DropChatroomParticipantsTable,
    DropChatroomsTable,
    DropGameModesTable,
    DropGroupMembersTable,
    DropGroupsTable,
    DropLocalesTable,
    DropMessagesTable,
    DropSportGameModesTable,
    DropSportsTable
} from '@utils/queries'

import { config } from 'dotenv'
import db from '@utils/db'

async function dropTables() {
    try {
        db.connect()

        console.info('Dropping tables...')

        await db.execute(DropActivitiesTable)
        await db.execute(DropChatroomParticipantsTable)
        await db.execute(DropChatroomsTable)
        await db.execute(DropGameModesTable)
        await db.execute(DropGroupMembersTable)
        await db.execute(DropGroupsTable)
        await db.execute(DropLocalesTable)
        await db.execute(DropMessagesTable)
        await db.execute(DropSportGameModesTable)
        await db.execute(DropSportsTable)
    } catch (error) {
        console.error(error)
    } finally {
        console.info('Done')

        db.end()
    }

}

config()

dropTables()