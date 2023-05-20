import Account from '../models/Account'
import Area from '../models/Area'
import Activity from '../models/Activity'
import Locale from '../models/Locale'
import Playable from '../models/Playable'
import RevokedToken from '../models/RevokedToken'
import Sport from '../models/Sport'
import SettingsTemplate from '../models/SettingsTemplate'
import ValidToken from '../models/ValidToken'
import databaseUtils from '../utils/databaseUtils'
import { connect, Connection, Types } from 'mongoose'
import { config } from 'dotenv'
import { createAccount, createPlayables, getAreas, _toCoordsObj } from './helper'

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

	await Account.createCollection()
	await Area.createCollection()
	await Activity.createCollection()
	await Locale.createCollection()
	await Playable.createCollection()
	await RevokedToken.createCollection()
	await SettingsTemplate.createCollection()
	await Sport.createCollection()
	await ValidToken.createCollection()

	console.log('collections initialized')
}

async function populateCollections() {
	console.log('populating collections...')

	const accounts = await createAccount([
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

	const playables = await createPlayables([
		{ districtCode: 'leo', type: 'outdoor', coords: _toCoordsObj(45.572681, -73.594074), fieldName: 'Dôme Hébert', schedule: {}, available: true, isMultisportZone: false },
		{ districtCode: 'leo', type: 'outdoor', coords: _toCoordsObj(45.572686, -73.594151), fieldName: 'Stade Hébert', schedule: {}, available: true, isMultisportZone: false },
		{ districtCode: 'leo', type: 'outdoor', coords: _toCoordsObj(45.5844653, -73.6085511), fieldName: 'Terrain de soccer du parc Coubertin', schedule: {}, available: true, isMultisportZone: false },
		{ districtCode: 'leo', type: 'outdoor', coords: _toCoordsObj(45.5884481, -73.5707134), fieldName: 'Terrain de soccer du parc Giuseppe-Garibaldi', schedule: {}, available: true, isMultisportZone: false },
		{ districtCode: 'leo', type: 'outdoor', coords: _toCoordsObj(45.578245, -73.604973), fieldName: 'Terrain de soccer du parc Luigi-Pirandello', schedule: {}, available: true, isMultisportZone: false },
		{ districtCode: 'leo', type: 'outdoor', coords: _toCoordsObj(45.5872102, -73.608256), fieldName: 'Terrain de soccer du parc Pie-XII', schedule: {}, available: true, isMultisportZone: false },
		{ districtCode: 'leo', type: 'outdoor', coords: _toCoordsObj(45.5971803, -73.5985679), fieldName: 'Terrains de soccer du parc Ferland', schedule: {}, available: true, isMultisportZone: false },
		{ districtCode: 'leo', type: 'outdoor', coords: _toCoordsObj(45.572575, -73.591777), fieldName: 'Terrains de soccer du parc Hébert', schedule: {}, available: true, isMultisportZone: false },
	])

	const templates = await SettingsTemplate.insertMany({})

	await getAreas().forEach(({ country, state, city, district, districtCode, coords }) => {
		Area.create({
			id: new Types.ObjectId(),
			country,
			state,
			city,
			district,
			districtCode,
			coords
		})
	})

	await Activity.insertMany([
		{
			id: new Types.ObjectId(),
			title: 'Soccer game 5v5',
			description: 'A 5v5 aside soccer game',
			organiser: (await accounts[0]).username,
			location: playables[0].id,
			participants: [accounts[1].username, accounts[2].username, accounts[3].username, accounts[4].username, accounts[5].username],
			settings: { ...templates[0]['SOCCER'] },
			date: Date.now()
		},
		{
			id: new Types.ObjectId(),
			title: 'Bball game 5v5',
			description: 'A 5v5 aside basketball game',
			type: 'basketball',
			organiser: (await accounts[1]).username,
			location: playables[1].id,
			participants: [accounts[1].username, accounts[2].username, accounts[3].username],
			settings: { ...templates[0]['SOCCER'] },
			date: Date.now()
		},
		{
			id: new Types.ObjectId(),
			title: 'Soccer game 7v7',
			description: 'A 7v7 aside soccer game',
			type: 'soccer',
			organiser: (await accounts[1]).username,
			location: playables[2].id,
			participants: [accounts[1].username, accounts[2].username, accounts[3].username, accounts[4].username, accounts[5].username, accounts[6].username, accounts[7].username],
			settings: { ...templates[0]['SOCCER'] },
			date: Date.now()
		},
		{
			id: new Types.ObjectId(),
			title: 'Soccer game 7v7',
			description: 'A 7v7 aside soccer game',
			type: 'soccer',
			organiser: (await accounts[1]).username,
			location: playables[3].id,
			participants: [accounts[1], accounts[2].username, accounts[3].username, accounts[4].username, accounts[5].username, accounts[6].username, accounts[7].username],
			settings: { ...templates[0]['SOCCER'] },
			date: Date.now()
		},
		{
			id: new Types.ObjectId(),
			title: 'Soccer game 7v7',
			description: 'A 7v7 aside soccer game',
			type: 'soccer',
			organiser: (await accounts[1]).username,
			location: playables[4].id,
			participants: [accounts[1], accounts[2], accounts[3], accounts[4], accounts[5], accounts[6], accounts[7]],
			settings: { ...templates[0]['SOCCER'] },
			date: Date.now()
		},
		{
			id: new Types.ObjectId(),
			title: 'Soccer game 7v7',
			description: 'A 7v7 aside soccer game',
			type: 'soccer',
			organiser: (await accounts[1]).username,
			location: playables[5].id,
			participants: [accounts[1], accounts[2], accounts[3], accounts[4], accounts[5], accounts[6], accounts[7]],
			settings: { ...templates[0]['SOCCER'] },
			date: Date.now()
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


	await Sport.insertMany([
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

	console.log('collection populated')
}

run()

process.exit
