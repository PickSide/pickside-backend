import Account from '../models/Account'
import Area from '../models/Area'
import Event from '../models/Activity'
import Locale from '../models/Locale'
import Sport from '../models/Sport'
import databaseUtils from '../utils/databaseUtils'
import { connect, Connection, Types } from 'mongoose'
import { config } from 'dotenv'
import { hashSync } from 'bcrypt'

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
	await Event.createCollection()
	await Locale.createCollection()
	await Sport.createCollection()

	console.log('collections initialized')
}

async function populateCollections() {
	console.log('populating collections...')

	await Area.insertMany([
		{
			id: new Types.ObjectId(),
			name: 'montreal',
			country: 'canada',
			state: 'quebec',
			centerCoordinates: {
				lat: 45.5590971,
				lng: -73.5673919,
			},
		},
		{
			id: new Types.ObjectId(),
			name: 'laval',
			country: 'canada',
			state: 'quebec',
			centerCoordinates: {
				lat: 45.6059216,
				lng: -73.7795486,
			},
		},
		{
			id: new Types.ObjectId(),
			name: 'new york',
			country: 'usa',
			state: 'nyc',
			centerCoordinates: {
				lat: 42.6542397,
				lng: -80.3765374,
			},
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

	const accounts = await Account.insertMany([
		{
			id: new Types.ObjectId(),
			email: 'tonyown10@gmail.com',
			username: 'tony',
			password: hashSync('123', 10),
			connectedUser: {
				firstName: 'Antoine',
				lastName: 'Hakim',
				sexe: 'male',
				level: 5,
				reliability: 5,
				matchPlayed: 20,
				matchOrganized: 30,
				localeRegion: 'montreal',
			},
			refreshToken: [],
		},
		{
			id: new Types.ObjectId(),
			connectedUser: {
				firstName: 'Niloofar',
				lastName: 'Khastavan',
				email: 'iamoninstagramallday1@gmail.com',
				username: 'user1',
				password: hashSync('123', 10),
				sexe: 'female',
				level: 1,
				reliability: 2,
				matchPlayed: 2,
				matchOrganized: 0,
				localeRegion: 'montreal',
			},
			refreshToken: [],
		},
		{
			id: new Types.ObjectId(),
			email: 'marcb@gmail.com',
			username: 'user2',
			password: hashSync('123', 10),
			connectedUser: {
				firstName: 'Marc',
				lastName: 'B',
				sexe: 'male',
				level: 1,
				reliability: 2,
				matchPlayed: 2,
				matchOrganized: 0,
				localeRegion: 'montreal',
			},
			refreshToken: [],
		},
		{
			id: new Types.ObjectId(),
			email: 'rafich@gmail.com',
			username: 'user3',
			password: hashSync('123', 10),
			connectedUser: {
				firstName: 'Rafic',
				lastName: 'H',
				sexe: 'male',
				level: 1,
				reliability: 2,
				matchPlayed: 2,
				matchOrganized: 0,
				localeRegion: 'montreal',
			},
			refreshToken: [],
		},
		{
			id: new Types.ObjectId(),
			email: 'philippek@gmail.com',
			password: hashSync('123', 10),
			username: 'user3',
			connectedUser: {
				firstName: 'Philippe',
				lastName: 'K',
				sexe: 'male',
				level: 1,
				reliability: 2,
				matchPlayed: 2,
				matchOrganized: 0,
				localeRegion: 'montreal',
			},
			refreshToken: [],
		},
		{
			id: new Types.ObjectId(),
			connectedUser: {
				firstName: 'Fadi',
				lastName: 'B',
				email: 'fadib@gmail.com',
				username: 'user3',
				password: hashSync('123', 10),
				sexe: 'male',
				level: 1,
				reliability: 2,
				matchPlayed: 2,
				matchOrganized: 0,
				localeRegion: 'montreal',
				refreshToken: [],
			},
		},
		{
			id: new Types.ObjectId(),
			email: 'ianp@gmail.com',
			password: hashSync('123', 10),
			username: 'user3',
			connectedUser: {
				firstName: 'Ian',
				lastName: 'P',
				sexe: 'male',
				level: 1,
				reliability: 2,
				matchPlayed: 2,
				matchOrganized: 0,
				localeRegion: 'montreal',
			},
			refreshToken: [],
		},
		{
			id: new Types.ObjectId(),
			email: 'ramik@gmail.com',
			username: 'user3',
			password: hashSync('123', 10),
			connectedUser: {
				firstName: 'Rami',
				lastName: 'K',
				sexe: 'male',
				level: 1,
				reliability: 2,
				matchPlayed: 2,
				matchOrganized: 0,
				localeRegion: 'montreal',
			},
			refreshToken: [],
		},
		{
			id: new Types.ObjectId(),
			email: 'omerb@gmail.com',
			username: 'user3',
			password: hashSync('123', 10),
			connectedUser: {
				firstName: 'Omer',
				lastName: 'B',
				sexe: 'male',
				level: 1,
				reliability: 2,
				matchPlayed: 2,
				matchOrganized: 0,
				localeRegion: 'montreal',
			},
			refreshToken: [],
		},
	])

	await Event.insertMany([
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
