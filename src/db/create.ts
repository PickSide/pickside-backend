import {
    CreateActivityTable,
    CreateChatroomParticipantsTable,
    CreateChatroomTable,
    CreateGameModesTable,
    CreateGroupMembersTable,
    CreateGroupTable,
    CreateLocaleTable,
    CreateMessageTable,
    CreateSportGameModesTable,
    CreateSportTable
} from '@utils/queries'

import { config } from 'dotenv'
import db from '@utils/db'

async function createTables() {
    try {
        db.connect()

        console.info('Creating tables...')

        await db.execute(CreateActivityTable)
        await db.execute(CreateChatroomParticipantsTable)
        await db.execute(CreateChatroomTable)
        await db.execute(CreateGameModesTable)
        await db.execute(CreateGroupMembersTable)
        await db.execute(CreateGroupTable)
        await db.execute(CreateLocaleTable)
        await db.execute(CreateMessageTable)
        await db.execute(CreateSportGameModesTable)
        await db.execute(CreateSportTable)

    } catch (error) {
        console.error(error)
    } finally {
        console.info('Done')

        db.end()
    }

}

config()

createTables()