import { Connection, Types, connect } from 'mongoose'
import { _toCoordsObj, createCourt, createUser, getAreas } from './helper'

import Activity from '../schemas/Activity'
import Locale from '../schemas/Locale'
import Playable from '../schemas/Court'
import PredefinedArea from '../schemas/PredefinedArea'
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
	await Playable.createCollection()
	await PredefinedArea.createCollection()
	await Sport.createCollection()
	await Token.createCollection()
	await User.createCollection()

	console.log('collections initialized')
}

async function populateCollections() {
	console.log('populating collections...')

	const users = await createUser([
		{ firstName: 'Ali', lastName: 'Idrici', username: 'ali' },
		{ firstName: 'Omer', lastName: 'Bos', username: 'bos' },
		{ firstName: 'Tony', lastName: 'Hakim', username: 'tony' },
		{ firstName: 'Niloofar', lastName: 'hakim', username: 'niloo' },
		{ firstName: 'Ian', lastName: 'Piluganov', username: 'ian' },
		{ firstName: 'Rafic', lastName: 'Haddad', username: 'rafic' },
		{ firstName: 'Marc', lastName: 'Bartik', username: 'marc' },
		{ firstName: 'Fadi', lastName: 'Bartik', username: 'fadi' },
		{ firstName: 'Philippe', lastName: 'Kuret', username: 'phil' },
		{ firstName: 'Rami', lastName: 'Kuret', username: 'rami' },
		{ firstName: 'Kevin', lastName: 'Moniz', username: 'kevin' },
		{ firstName: 'Karim', lastName: 'Abou-Khalil', username: 'karim' },
		{ firstName: 'Mohammed', lastName: 'Rabbani', username: 'momo' },
	])

	const courts = await createCourt([
		{ districtCode: 'leo', type: 'outdoor', coords: _toCoordsObj(45.572681, -73.594074), fieldName: 'Dôme Hébert', schedule: {}, available: true, isMultisportZone: false },
		{ districtCode: 'leo', type: 'outdoor', coords: _toCoordsObj(45.572686, -73.594151), fieldName: 'Stade Hébert', schedule: {}, available: true, isMultisportZone: false },
		{ districtCode: 'leo', type: 'outdoor', coords: _toCoordsObj(45.5844653, -73.6085511), fieldName: 'Terrain de soccer du parc Coubertin', schedule: {}, available: true, isMultisportZone: false },
		{ districtCode: 'leo', type: 'outdoor', coords: _toCoordsObj(45.5884481, -73.5707134), fieldName: 'Terrain de soccer du parc Giuseppe-Garibaldi', schedule: {}, available: true, isMultisportZone: false },
		{ districtCode: 'leo', type: 'outdoor', coords: _toCoordsObj(45.578245, -73.604973), fieldName: 'Terrain de soccer du parc Luigi-Pirandello', schedule: {}, available: true, isMultisportZone: false },
		{ districtCode: 'leo', type: 'outdoor', coords: _toCoordsObj(45.5872102, -73.608256), fieldName: 'Terrain de soccer du parc Pie-XII', schedule: {}, available: true, isMultisportZone: false },
		{ districtCode: 'leo', type: 'outdoor', coords: _toCoordsObj(45.5971803, -73.5985679), fieldName: 'Terrains de soccer du parc Ferland', schedule: {}, available: true, isMultisportZone: false },
		{ districtCode: 'leo', type: 'outdoor', coords: _toCoordsObj(45.572575, -73.591777), fieldName: 'Terrains de soccer du parc Hébert', schedule: {}, available: true, isMultisportZone: false },
	])

	await getAreas().forEach(({ country, state, city, district, districtCode, coords }) => {
		PredefinedArea.create({
			id: new Types.ObjectId(),
			country,
			state,
			city,
			district,
			districtCode,
			coords
		})
	})

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
			]
		},
		{
			id: new Types.ObjectId(),
			value: 'tennis',
			name: 'Tennis',
			featureAvailable: false,
		},
	])

	await Activity.insertMany([
		{
			id: new Types.ObjectId(),
			address: courts[0],
			date: Date.now(),
			description: 'Simple game',
			duration: 59,
			mode: '7v7',
			organiser: users[0],
			participants: [users[1], users[2], users[3], users[4], users[5]],
			recommandedLevel: 'beginner',
			rules: 'Relaxing game, no slide tackles, 1 goal we switch',
			sport: sports[2],
			time: undefined,
			title: 'Soccer game 5v5',
			unitPrice: 5,
		},
	])

	await Locale.insertMany([
		{
			id: new Types.ObjectId(),
			value: 'en',
			description: 'English (US)',
			flagCode: 'us',
		},
		{ id: new Types.ObjectId(), value: 'fr', description: 'Français (France)', flagCode: 'fr' },
	])




	console.log('collection populated')
}

run()

process.exit
