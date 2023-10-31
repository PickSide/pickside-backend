import { Connection, Types, connect } from 'mongoose'
import { _toCoordsObj, createUser } from './helper'

import Activity from '../schemas/Activity'
import Locale from '../schemas/Locale'
import Notification from '../schemas/Notification'
import Sport from '../schemas/Sport'
import Token from '../schemas/Token'
import User from '../schemas/User'
import { config } from 'dotenv'
import databaseUtils from '../utils/databaseUtils'

async function run() {
	config()

	const connection = await connect(databaseUtils.getDatabaseURI()).then((db) => {
		console.log('Connected to db!')
		return db.connection
	})

	await dropCollections(connection)
	await initCollections()
	await populateCollections()

	connection.close().then((db) => console.log('Closed db connection!'))
}

async function dropCollections(connection: Connection) {
	console.log('dropping collections...')

	await connection.db.listCollections().toArray((err, collections) => {
		if (err) {
			console.log(err)
		} else {
			collections?.forEach((collection, idx) => {
				connection.dropCollection(collection.name, (error) => {
					if (error?.name === 'NamespaceNotFound') {
						return
					}
				})
			})
		}
	})

	console.log('collections dropped!')
}

async function initCollections() {
	console.log('initializing collections...')

	await Activity.createCollection()
	await Locale.createCollection()
	await Sport.createCollection()
	await Token.createCollection()
	await User.createCollection()

	console.log('collections initialized')
}

async function populateCollections() {
	console.log('populating collections...')

	const sports = await Sport.insertMany([
		{
			id: new Types.ObjectId(),
			value: 'afootball',
			name: 'American Football',
			featureAvailable: false,
		},
		{
			id: new Types.ObjectId(),
			value: 'basketball',
			name: 'Basketball',
			featureAvailable: false,
		},
		{
			id: new Types.ObjectId(),
			value: 'soccer',
			name: 'Soccer',
			featureAvailable: true,
			modes: [
				{ value: '5v5', name: '5 aside', defaultMaxPlayers: 10 },
				{ value: '7v7', name: '7 aside', defaultMaxPlayers: 14 },
				{ value: '8v8', name: '8 aside', defaultMaxPlayers: 16 },
				{ value: '11v11', name: '11 aside', defaultMaxPlayers: 22 },
			],
		},
		{
			id: new Types.ObjectId(),
			value: 'tennis',
			name: 'Tennis',
			featureAvailable: false,
		},
	])

	const locales = await Locale.insertMany([
		{
			id: new Types.ObjectId(),
			value: 'en',
			description: 'English (US)',
			flagCode: 'us',
		},
		{ id: new Types.ObjectId(), value: 'fr', description: 'Français (France)', flagCode: 'fr' },
	])

	const users = await createUser([
		{
			fullName: 'Tony Hakim',
			username: 'tony',
			preferredLocale: locales[0],
			preferredSport: sports[2],
			email: 'tonyown12@gmail.com',
		},
		{
			fullName: 'Ali Idrici',
			username: 'ali',
			preferredLocale: locales[0],
			preferredSport: sports[2],
		},
		{
			fullName: 'Omer Bos',
			username: 'bos',
			preferredLocale: locales[0],
			preferredSport: sports[2],
		},
		{
			fullName: 'Niloofar hakim',
			username: 'niloo',
			preferredLocale: locales[0],
			preferredSport: sports[2],
		},
		{
			fullName: 'Ian Piluganov',
			username: 'ian',
			preferredLocale: locales[0],
			preferredSport: sports[2],
		},
		{
			fullName: 'Rafic Haddad',
			username: 'rafic',
			preferredLocale: locales[0],
			preferredSport: sports[2],
		},
		{
			fullName: 'Marc Bartik',
			username: 'marc',
			preferredLocale: locales[0],
			preferredSport: sports[2],
		},
		{
			fullName: 'Fadi Bartik',
			username: 'fadi',
			preferredLocale: locales[0],
			preferredSport: sports[2],
		},
		{
			fullName: 'Philippe Kuret',
			username: 'phil',
			preferredLocale: locales[0],
			preferredSport: sports[2],
		},
		{
			fullName: 'Rami Kuret',
			username: 'rami',
			preferredLocale: locales[0],
			preferredSport: sports[2],
		},
		{
			fullName: 'Kevin Moniz',
			username: 'kevin',
			preferredLocale: locales[0],
			preferredSport: sports[2],
		},
		{
			fullName: 'Karim Abou-Khalil',
			username: 'karim',
			preferredLocale: locales[0],
			preferredSport: sports[2],
		},
		{
			fullName: 'Mohammed Rabbani',
			username: 'momo',
			preferredLocale: locales[0],
			preferredSport: sports[2],
		},
	])

	//const date = dayjs().add(5, 'day')

	// await Activity.insertMany([
	// 	{
	// 		date: dayjs().add(5, 'day').toDate(),
	// 		description: 'Simple game',
	// 		duration: 59,
	// 		maxPlayers: 10,
	// 		mode: '7v7',
	// 		organizer: users[0],
	// 		participants: [
	// 			users[1],
	// 			users[2],
	// 			users[3],
	// 			users[4],
	// 			users[5],
	// 			users[1],
	// 			users[2],
	// 			users[3],
	// 			users[4],
	// 			users[5],
	// 		],
	// 		recommandedLevel: 'beginner',
	// 		rules: 'Relaxing game, no slide tackles, 1 goal we switch',
	// 		sport: sports[2],
	// 		time: undefined,
	// 		title: 'Soccer game 5v5',
	// 		price: 5,
	// 	},
	// 	{
	// 		date: dayjs().add(7, 'day').toDate(),
	// 		description: 'Simple game',
	// 		duration: 59,
	// 		maxPlayers: 14,
	// 		mode: '7v7',
	// 		organizer: users[0],
	// 		participants: [],
	// 		recommandedLevel: 'beginner',
	// 		rules: 'Relaxing game, no slide tackles, 1 goal we switch',
	// 		sport: sports[2],
	// 		time: undefined,
	// 		title: 'Soccer game 7v7',
	// 		price: 5,
	// 	},
	// 	{
	// 		date: dayjs().add(10, 'day').toDate(),
	// 		description: 'Simple game',
	// 		duration: 59,
	// 		maxPlayers: 22,
	// 		mode: '7v7',
	// 		organizer: users[0],
	// 		participants: [],
	// 		recommandedLevel: 'beginner',
	// 		rules: 'Relaxing game, no slide tackles, 1 goal we switch',
	// 		sport: sports[2],
	// 		time: undefined,
	// 		title: 'Soccer game 11v11',
	// 		price: 5,
	// 	},
	// ])

	await Notification.insertMany([
		{
			id: new Types.ObjectId(),
			created: Date.now(),
			isRead: false,
			message: 'This is a system notification',
			receiver: users[2],
			type: 'system',
		},
		{
			id: new Types.ObjectId(),
			created: Date.now(),
			isRead: false,
			message: 'This is a global notification',
			receiver: users[2],
			type: 'global',
		},
		{
			id: new Types.ObjectId(),
			created: Date.now(),
			isRead: false,
			message: 'This is a user notification',
			receiver: users[2],
			sender: users[0],
			type: 'user',
		},
	])

	console.log('collection populated')
}

run()

process.exit
