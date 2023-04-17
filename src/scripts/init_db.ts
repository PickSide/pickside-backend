import Account from '../models/Account'
import Area from '../models/Area'
import Activity from '../models/Activity'
import Locale from '../models/Locale'
import RevokedToken from '../models/RevokedToken'
import Sport from '../models/Sport'
import ValidToken from '../models/ValidToken'
import databaseUtils from '../utils/databaseUtils'
import { connect, Connection, Types } from 'mongoose'
import { config } from 'dotenv'
import { createAccount, getAreas } from './helper'

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
	await RevokedToken.createCollection()
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
			type: 'soccer',
			organiser: (await accounts[0]).id,
			levelRequired: 4,
			location: { lat: 45.5753494, lng: -73.6467868 },
			participants: [accounts[1], accounts[2], accounts[3], accounts[4], accounts[5]],
			numberOfRegisteredPlayers: 5,
			maxPlayersCapacity: 10,
		},
		{
			id: new Types.ObjectId(),
			title: 'Bball game 5v5',
			type: 'basketball',
			organiser: (await accounts[1]).id,
			levelRequired: 2,
			location: { lat: 45.5586107, lng: -73.6863638 },
			participants: [accounts[1], accounts[2], accounts[3]],
			numberOfRegisteredPlayers: 3,
			maxPlayersCapacity: 10,
		},
		{
			id: new Types.ObjectId(),
			title: 'Soccer game 7v7',
			type: 'soccer',
			organiser: (await accounts[1]).id,
			levelRequired: 4,
			location: { lat: 45.5348851, lng: -73.6469004 },
			participants: [accounts[1], accounts[2], accounts[3], accounts[4], accounts[5], accounts[6], accounts[7]],
			numberOfRegisteredPlayers: 7,
			maxPlayersCapacity: 14,
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
			description: 'American Football',
		},
		{
			id: new Types.ObjectId(),
			value: 'basketball',
			description: 'Basketball',
		},
		{
			id: new Types.ObjectId(),
			value: 'soccer',
			description: 'Soccer',
		},
		{
			id: new Types.ObjectId(),
			value: 'tennis',
			description: 'Tennis',
		},
	])

	console.log('collection populated')
}

run()

process.exit
