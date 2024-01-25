import { ActivityModel, ChatroomModel, LocaleModel, MessageModel, OnlineUserModel, SportModel, TokenModel, UserModel } from '@schemas'
import { Connection, Types, connect } from 'mongoose'
import { _toCoordsObj, createUser } from './helper'

import Locale from '@schemas/Locale'
import { config } from 'dotenv'
import databaseUtils from '../utils/databaseUtils'

async function run() {
	config()

	const connection = await connect(databaseUtils.getDatabaseURI()).then((db) => db.connection)

	await dropCollections(connection)
	await initCollections()
	await populateCollections()

	connection.close().then((db) => console.log('Closed db connection!'))
}

async function dropCollections(connection: Connection) {
	console.log('dropping collections...')

	const collections = await connection.db.listCollections().toArray()

	await collections.forEach((collection, idx) => {
		connection.dropCollection(collection.name)
		console.log('collections dropped!')
	})
}

async function initCollections() {
	console.log('initializing collections...')

	await ActivityModel.createCollection()
	await LocaleModel.createCollection()
	await OnlineUserModel.createCollection()
	await SportModel.createCollection()
	await TokenModel.createCollection()
	await UserModel.createCollection()

	console.log('collections initialized')
}

async function populateCollections() {
	console.log('populating collections...')

	const sports = await SportModel.create([
		{
			value: 'afootball',
			name: 'American Football',
			featureAvailable: false,
		},
		{
			value: 'basketball',
			name: 'Basketball',
			featureAvailable: false,
		},
		{
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
			preferredSport: sports[2].id,
		},
		{
			fullName: 'Ali Idrici',
			username: 'ali',
			preferredLocale: locales[0],
			preferredSport: sports[2].id,
		},
		{
			fullName: 'Omer Bos',
			username: 'bos',
			preferredLocale: locales[0],
			preferredSport: sports[2].id,
		},
		{
			fullName: 'Niloofar khastavan',
			username: 'niloo',
			preferredLocale: locales[0],
			preferredSport: sports[2].id,
		},
		{
			fullName: 'Ian Piluganov',
			username: 'ian',
			preferredLocale: locales[0],
			preferredSport: sports[2].id,
		},
		{
			fullName: 'Rafic Haddad',
			username: 'rafic',
			preferredLocale: locales[0],
			preferredSport: sports[2].id,
		},
		{
			fullName: 'Marc Bartik',
			username: 'marc',
			preferredLocale: locales[0],
			preferredSport: sports[2].id,
		},
		{
			fullName: 'Fadi Bartik',
			username: 'fadi',
			preferredLocale: locales[0],
			preferredSport: sports[2].id,
		},
		{
			fullName: 'Philippe Kuret',
			username: 'phil',
			preferredLocale: locales[0],
			preferredSport: sports[2].id,
		},
		{
			fullName: 'Rami Kuret',
			username: 'rami',
			preferredLocale: locales[0],
			preferredSport: sports[2].id,
		},
		{
			fullName: 'Kevin Moniz',
			username: 'kevin',
			preferredLocale: locales[0],
			preferredSport: sports[2].id,
		},
		{
			fullName: 'Karim Abou-Khalil',
			username: 'karim',
			preferredLocale: locales[0],
			preferredSport: sports[2].id,
		},
		{
			fullName: 'Mohammed Rabbani',
			username: 'momo',
			preferredLocale: locales[0],
			preferredSport: sports[2].id,
		},
	])

	const chatrooms = await ChatroomModel.create([
		{
			participants: [users[0].id, users[1].id],
		},
		{
			participants: [users[0].id, users[2].id],
		},
		{
			participants: [users[0].id, users[3].id],
		},
	])

	await MessageModel.create([
		{
			message: 'Fdp repond',
			chatroomId: chatrooms[0].id,
			sender: users[1].id,
			delivered: true,
		},
		{
			message: 'YO CHECK MON FKNG COB SAL NEG',
			chatroomId: chatrooms[0].id,
			sender: users[1].id,
			delivered: true,
		},
		{
			message: 'BDV JVAIS PULL UP TA CAILLE',
			chatroomId: chatrooms[0].id,
			sender: users[1].id,
			delivered: true,
		},
		{
			message: 'Ayt on te kimb ma neg. T ded',
			chatroomId: chatrooms[0].id,
			sender: users[1].id,
			delivered: true,
		},
		{
			message: 'Xplik',
			chatroomId: chatrooms[0].id,
			sender: users[0].id,
			delivered: true,
		},
	])

	console.log('collection populated')
}

run()

process.exit
