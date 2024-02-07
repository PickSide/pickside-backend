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

function dropTables() {
    db.connect()

    console.info('Dropping tables...')

    db.execute(DropActivitiesTable)
    db.execute(DropChatroomParticipantsTable)
    db.execute(DropChatroomsTable)
    db.execute(DropGameModesTable)
    db.execute(DropGroupMembersTable)
    db.execute(DropGroupsTable)
    db.execute(DropLocalesTable)
    db.execute(DropMessagesTable)
    db.execute(DropSportGameModesTable)
    db.execute(DropSportsTable)

    console.info('Done')

    db.end()
}

config()

dropTables()