import { InsertActivity, InsertIntoSport, } from '@utils/queries'

import { config } from 'dotenv'
import db from '@utils/db'

const activities = [
	[
		"123 rue du 33",
		new Date().toISOString().split('T')[0],
		"Venez jouer",
		false,
		22,
		10,
		"No tackles or fights",
		1,
		'14:30:00',
		"Cartier 11v11",
		1
	],
	[
		"La Fontaine Park soccer field",
		new Date().toISOString().split('T')[0],
		"Foot a mont royal",
		false,
		22,
		10,
		"No tackles or fights",
		1,
		'14:30:00',
		"St mich 11v11",
		1
	],
]

const sports = [
	["soccer", true],
	["basketball", false],
	["tennis", false],
	["american football", false]
]


function seed() {
	db.connect()

	sports.forEach((sport) => db.query(InsertIntoSport, sport))
	activities.forEach((activity) => db.query(InsertActivity, activity))

	db.end()
}

config()

seed()

