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

function createTables() {
    db.connect()

    console.info('Creating tables...')

    db.execute(CreateActivityTable)
    db.execute(CreateChatroomParticipantsTable)
    db.execute(CreateChatroomTable)
    db.execute(CreateGameModesTable)
    db.execute(CreateGroupMembersTable)
    db.execute(CreateGroupTable)
    db.execute(CreateLocaleTable)
    db.execute(CreateMessageTable)
    db.execute(CreateSportGameModesTable)
    db.execute(CreateSportTable)


    console.info('Done')

    db.end()
}

config()

createTables()