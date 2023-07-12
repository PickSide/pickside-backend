import { Connection, Types, connect } from 'mongoose'
import { _toCoordsObj, createCourt, createUser } from './helper'

import Activity from '../schemas/Activity'
import Locale from '../schemas/Locale'
import Notification from '../schemas/Notification'
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

	const predefinedAreas = await PredefinedArea.insertMany([
		{ id: new Types.ObjectId(), country: 'Canada', state: 'Quebec', city: 'Montreal', district: ['Anjou'], districtCode: 'anj', coords: _toCoordsObj(45.6122993, -73.5899528) },
		{ id: new Types.ObjectId(), country: 'Canada', state: 'Quebec', city: 'Montreal', district: ['Ahunstic-Cartierville'], districtCode: 'ahc', coords: _toCoordsObj(45.5547972, -73.6777571) },
		{ id: new Types.ObjectId(), country: 'Canada', state: 'Quebec', city: 'Montreal', district: ['Montreal-Nord'], districtCode: 'mtl-n', coords: _toCoordsObj(45.602927, -73.6496184) },
		{ id: new Types.ObjectId(), country: 'Canada', state: 'Quebec', city: 'Montreal', district: ['Montreal-Est'], districtCode: 'mtl-e', coords: _toCoordsObj(45.6292342, -73.546502) },
		{ id: new Types.ObjectId(), country: 'Canada', state: 'Quebec', city: 'Montreal', district: ['Lasalle'], districtCode: 'las', coords: _toCoordsObj(45.4361082, -73.6591395) },
		{ id: new Types.ObjectId(), country: 'Canada', state: 'Quebec', city: 'Montreal', district: ['Lachine'], districtCode: 'lac', coords: _toCoordsObj(45.4505633, -73.7181664) },
		{ id: new Types.ObjectId(), country: 'Canada', state: 'Quebec', city: 'Montreal', district: ['Saint-Leonard'], districtCode: 'leo', coords: _toCoordsObj(45.5888043, -73.6173978) },
		{ id: new Types.ObjectId(), country: 'Canada', state: 'Quebec', city: 'Montreal', district: ['Saint-Michel', 'Parc-Extension', 'Villeray'], districtCode: 'stmch', coords: _toCoordsObj(45.5446838, -73.6350267) },
		{ id: new Types.ObjectId(), country: 'Canada', state: 'Quebec', city: 'Montreal', district: ['Rosement'], districtCode: 'rsmt', coords: _toCoordsObj(45.553827, -73.6058538) },
		{ id: new Types.ObjectId(), country: 'Canada', state: 'Quebec', city: 'Montreal', district: ['Plateau', 'Mont-Royal'], districtCode: 'pmtr', coords: _toCoordsObj(45.5233159, -73.6063665) },
		{ id: new Types.ObjectId(), country: 'Canada', state: 'Quebec', city: 'Montreal', district: ['Outremont'], districtCode: 'outm', coords: _toCoordsObj(45.5160655, -73.6187685) },
		{ id: new Types.ObjectId(), country: 'Canada', state: 'Quebec', city: 'Montreal', district: ['Westmount'], districtCode: 'wsmt', coords: _toCoordsObj(45.4848052, -73.6097335) },
		{ id: new Types.ObjectId(), country: 'Canada', state: 'Quebec', city: 'Montreal', district: ['Mt-Royal'], districtCode: 'mtr', coords: _toCoordsObj(45.5071397, -73.6738939) },
		{ id: new Types.ObjectId(), country: 'Canada', state: 'Quebec', city: 'Montreal', district: ['Saint-Laurent'], districtCode: 'sl', coords: _toCoordsObj(45.4966238, -73.753911) },
		{ id: new Types.ObjectId(), country: 'Canada', state: 'Quebec', city: 'Montreal', district: ['Cote-des-Neiges', 'Hampstead', 'Notre-Dame-de-Grace'], districtCode: 'ndg', coords: _toCoordsObj(45.4673574, -73.6479913) },
		{ id: new Types.ObjectId(), country: 'Canada', state: 'Quebec', city: 'Laval', district: ['Fabreville'], districtCode: 'fbv', coords: _toCoordsObj(45.5746574, -73.9735) },
		{ id: new Types.ObjectId(), country: 'Canada', state: 'Quebec', city: 'Laval', district: ['Duvernay'], districtCode: 'duv', coords: _toCoordsObj(45.5953843, -73.6799281) },
		{ id: new Types.ObjectId(), country: 'Canada', state: 'Quebec', city: 'Laval', district: ['Vimont'], districtCode: 'vim', coords: _toCoordsObj(45.6063861, -73.7456115) },
		{ id: new Types.ObjectId(), country: 'Canada', state: 'Quebec', city: 'Laval', district: ['Chomedey'], districtCode: 'chd', coords: _toCoordsObj(45.5383503, -73.7375266) },
		{ id: new Types.ObjectId(), country: 'Canada', state: 'Quebec', city: 'Laval', district: ['Auteuil'], districtCode: 'aut', coords: _toCoordsObj(45.6304957, -73.7627909) },
		{ id: new Types.ObjectId(), country: 'Canada', state: 'Quebec', city: 'Laval', district: ['Pont-Viau'], districtCode: 'pv', coords: _toCoordsObj(45.5709566, -73.6957849) },
		{ id: new Types.ObjectId(), country: 'Canada', state: 'Quebec', city: 'Laval', district: ['Laval-des-rapides'], districtCode: 'ldr', coords: _toCoordsObj(45.5560382, -73.7275401) },
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
		{ firstName: 'Ali', lastName: 'Idrici', username: 'ali', preferredRegion: predefinedAreas[0], preferredLocale: locales[0], preferredSport: sports[2] },
		{ firstName: 'Omer', lastName: 'Bos', username: 'bos', preferredRegion: predefinedAreas[0], preferredLocale: locales[0], preferredSport: sports[2] },
		{ firstName: 'Tony', lastName: 'Hakim', username: 'tony', preferredRegion: predefinedAreas[0], preferredLocale: locales[0], preferredSport: sports[2], email: 'tonyown10@gmail.com' },
		{ firstName: 'Niloofar', lastName: 'hakim', username: 'niloo', preferredRegion: predefinedAreas[0], preferredLocale: locales[0], preferredSport: sports[2] },
		{ firstName: 'Ian', lastName: 'Piluganov', username: 'ian', preferredRegion: predefinedAreas[0], preferredLocale: locales[0], preferredSport: sports[2] },
		{ firstName: 'Rafic', lastName: 'Haddad', username: 'rafic', preferredRegion: predefinedAreas[0], preferredLocale: locales[0], preferredSport: sports[2] },
		{ firstName: 'Marc', lastName: 'Bartik', username: 'marc', preferredRegion: predefinedAreas[0], preferredLocale: locales[0], preferredSport: sports[2] },
		{ firstName: 'Fadi', lastName: 'Bartik', username: 'fadi', preferredRegion: predefinedAreas[0], preferredLocale: locales[0], preferredSport: sports[2] },
		{ firstName: 'Philippe', lastName: 'Kuret', username: 'phil', preferredRegion: predefinedAreas[0], preferredLocale: locales[0], preferredSport: sports[2] },
		{ firstName: 'Rami', lastName: 'Kuret', username: 'rami', preferredRegion: predefinedAreas[0], preferredLocale: locales[0], preferredSport: sports[2] },
		{ firstName: 'Kevin', lastName: 'Moniz', username: 'kevin', preferredRegion: predefinedAreas[0], preferredLocale: locales[0], preferredSport: sports[2] },
		{ firstName: 'Karim', lastName: 'Abou-Khalil', username: 'karim', preferredRegion: predefinedAreas[0], preferredLocale: locales[0], preferredSport: sports[2] },
		{ firstName: 'Mohammed', lastName: 'Rabbani', username: 'momo', preferredRegion: predefinedAreas[0], preferredLocale: locales[0], preferredSport: sports[2] },
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
		}
	])


	console.log('collection populated')
}

run()

process.exit
