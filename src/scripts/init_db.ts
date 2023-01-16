import AppConfig from '../models/AppConfig'
import AvailableCity from '../models/AvailableCity'
import Event from '../models/Event'
import Locale from '../models/Locale'
import Sport from '../models/Sport'
import User from '../models/User'
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

	await AppConfig.createCollection()
	await AvailableCity.createCollection()
	await Event.createCollection()
	await Locale.createCollection()
	await Sport.createCollection()
	await User.createCollection()

	console.log('collections initialized')
}

async function populateCollections() {
	console.log('populating collections...')

	const availableCities = await AvailableCity.insertMany([
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

	const locales = await Locale.insertMany([
		{
			id: new Types.ObjectId(),
			value: 'en',
			description: 'English (US)',
			flagCode: 'us',
		},
		{ id: new Types.ObjectId(), value: 'fr', description: 'Français (France)', flagCode: 'fr' },
	])

	const connectedUser = await User.create({
		id: new Types.ObjectId(),
		firstName: 'Antoine',
		lastName: 'Hakim',
		email: 'tonyown10@gmail.com',
		username: 'tony',
		password: hashSync('123', 10),
		sexe: 'male',
		level: 5,
		reliability: 5,
		matchPlayed: 20,
		matchOrganized: 30,
		localeRegion: 'montreal',
		refreshToken: [],
	})

	const user = await User.create({
		id: new Types.ObjectId(),
		firstName: 'Niloofar',
		lastName: 'Khastavan',
		email: 'iamoninstagramallday@gmail.com',
		username: 'niloofar',
		password: hashSync('123', 10),
		sexe: 'female',
		level: 1,
		reliability: 2,
		matchPlayed: 2,
		matchOrganized: 0,
		localeRegion: 'montreal',
		refreshToken: [],
	})

	await AppConfig.insertMany([
		{
			id: new Types.ObjectId(),
			allowLocationTracking: true,
			darkModeEnabled: true,
			defaultDarkMode: false,
			defautltLocation: availableCities[0],
			locale: locales[0],
			userId: connectedUser,
		},
		{
			id: new Types.ObjectId(),
			allowLocationTracking: true,
			darkModeEnabled: true,
			defaultDarkMode: false,
			defautltLocation: availableCities[0],
			locale: locales[0],
			userId: user,
		},
	])

	await Event.insertMany([
		{
			id: new Types.ObjectId(),
			title: 'Soccer game 5v5',
			type: 'soccer',
			organiser: (await connectedUser).id,
			levelRequired: 4,
			numberOfRegisteredPlayers: 9,
			maxPlayersCapacity: 10,
		},
		{
			id: new Types.ObjectId(),
			title: 'Bball game 5v5',
			type: 'basketball',
			organiser: (await user).id,
			levelRequired: 2,
			numberOfRegisteredPlayers: 4,
			maxPlayersCapacity: 10,
		},
		{
			id: new Types.ObjectId(),
			title: 'Soccer game 7v7',
			type: 'soccer',
			organiser: (await user).id,
			levelRequired: 4,
			numberOfRegisteredPlayers: 10,
			maxPlayersCapacity: 14,
		},
	])

	console.log('collection populated')
}

run()
process.exit
