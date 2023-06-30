import Playable from '../schemas/Court'
import { Types } from 'mongoose'
import User from '../schemas/User'

interface UserProps {
	firstName: string
	lastName: string
	username: string
}

interface PlayablesProps {
	districtCode: string
	type: string
	coords: any
	fieldName: string
	schedule: any
	available: boolean
	isMultisportZone: boolean
}


export function createUser(props: UserProps[]) {
	return Promise.all(
		props.map(
			async ({ firstName, lastName, username }) =>
				await User.create({
					attendedEventsCount: 0,
					avatar: undefined,
					bio: 'string',
					city: 'string',
					email: 'string',
					eventsRegistered: [],
					firstName,
					fitnessLevel: 'average',
					groups: [],
					isOrganizer: false,
					joinDate: new Date().toISOString(),
					lastName,
					localeRegion: '',
					locationCommonlyPlayedIn: 'montreal',
					matchOrganizedCount: 0,
					matchPlayedCount: 0,
					phone: '514-966-8481',
					preferredLocale: 'en',
					preferredRegion: 'montreal',
					preferredSport: '',
					preferredTheme: 'light',
					profilePrivacy: {
						allowLocationTracking: false,
						showAge: false,
						showEmail: false,
						showPhone: false,
						showGroups: false,
					},
					reasonsForJoining: [],
					reliability: _rand(100),
					sexe: 'male',
					socialNetworks: [],
					subscriptionType: 'none',
					timezone: 'string',
					username,
					zip: 'h8x302',
				}),
		),
	)
}

export function createCourt(props: PlayablesProps[]) {
	return Promise.all(
		props.map(
			async ({ available, districtCode, coords, type, fieldName, schedule, isMultisportZone }) =>
				await Playable.create({
					id: new Types.ObjectId(),
					districtCode,
					available,
					coords,
					fieldName,
					schedule,
					type,
					isMultisportZone
				}),
		),
	)
}

export function getAreas() {
	return [
		{ country: 'Canada', state: 'Quebec', city: 'Montreal', district: ['Anjou'], districtCode: 'anj', coords: _toCoordsObj(45.6122993, -73.5899528) },
		{ country: 'Canada', state: 'Quebec', city: 'Montreal', district: ['Ahunstic-Cartierville'], districtCode: 'ahc', coords: _toCoordsObj(45.5547972, -73.6777571) },
		{ country: 'Canada', state: 'Quebec', city: 'Montreal', district: ['Montreal-Nord'], districtCode: 'mtl-n', coords: _toCoordsObj(45.602927, -73.6496184) },
		{ country: 'Canada', state: 'Quebec', city: 'Montreal', district: ['Montreal-Est'], districtCode: 'mtl-e', coords: _toCoordsObj(45.6292342, -73.546502) },
		{ country: 'Canada', state: 'Quebec', city: 'Montreal', district: ['Lasalle'], districtCode: 'las', coords: _toCoordsObj(45.4361082, -73.6591395) },
		{ country: 'Canada', state: 'Quebec', city: 'Montreal', district: ['Lachine'], districtCode: 'lac', coords: _toCoordsObj(45.4505633, -73.7181664) },
		{ country: 'Canada', state: 'Quebec', city: 'Montreal', district: ['Saint-Leonard'], districtCode: 'leo', coords: _toCoordsObj(45.5888043, -73.6173978) },
		{ country: 'Canada', state: 'Quebec', city: 'Montreal', district: ['Saint-Michel', 'Parc-Extension', 'Villeray'], districtCode: 'stmch', coords: _toCoordsObj(45.5446838, -73.6350267) },
		{ country: 'Canada', state: 'Quebec', city: 'Montreal', district: ['Rosement'], districtCode: 'rsmt', coords: _toCoordsObj(45.553827, -73.6058538) },
		{ country: 'Canada', state: 'Quebec', city: 'Montreal', district: ['Plateau', 'Mont-Royal'], districtCode: 'pmtr', coords: _toCoordsObj(45.5233159, -73.6063665) },
		{ country: 'Canada', state: 'Quebec', city: 'Montreal', district: ['Outremont'], districtCode: 'outm', coords: _toCoordsObj(45.5160655, -73.6187685) },
		{ country: 'Canada', state: 'Quebec', city: 'Montreal', district: ['Westmount'], districtCode: 'wsmt', coords: _toCoordsObj(45.4848052, -73.6097335) },
		{ country: 'Canada', state: 'Quebec', city: 'Montreal', district: ['Mt-Royal'], districtCode: 'mtr', coords: _toCoordsObj(45.5071397, -73.6738939) },
		{ country: 'Canada', state: 'Quebec', city: 'Montreal', district: ['Saint-Laurent'], districtCode: 'sl', coords: _toCoordsObj(45.4966238, -73.753911) },
		{ country: 'Canada', state: 'Quebec', city: 'Montreal', district: ['Cote-des-Neiges', 'Hampstead', 'Notre-Dame-de-Grace'], districtCode: 'ndg', coords: _toCoordsObj(45.4673574, -73.6479913) },
		{ country: 'Canada', state: 'Quebec', city: 'Laval', district: ['Fabreville'], districtCode: 'fbv', coords: _toCoordsObj(45.5746574, -73.9735) },
		{ country: 'Canada', state: 'Quebec', city: 'Laval', district: ['Duvernay'], districtCode: 'duv', coords: _toCoordsObj(45.5953843, -73.6799281) },
		{ country: 'Canada', state: 'Quebec', city: 'Laval', district: ['Vimont'], districtCode: 'vim', coords: _toCoordsObj(45.6063861, -73.7456115) },
		{ country: 'Canada', state: 'Quebec', city: 'Laval', district: ['Chomedey'], districtCode: 'chd', coords: _toCoordsObj(45.5383503, -73.7375266) },
		{ country: 'Canada', state: 'Quebec', city: 'Laval', district: ['Auteuil'], districtCode: 'aut', coords: _toCoordsObj(45.6304957, -73.7627909) },
		{ country: 'Canada', state: 'Quebec', city: 'Laval', district: ['Pont-Viau'], districtCode: 'pv', coords: _toCoordsObj(45.5709566, -73.6957849) },
		{ country: 'Canada', state: 'Quebec', city: 'Laval', district: ['Laval-des-rapides'], districtCode: 'ldr', coords: _toCoordsObj(45.5560382, -73.7275401) },
	]
}

export function getPlayables() {
	return [

		// 	{ districtCode: 'anj', type: 'outdoor', coords: _toCoordsObj(), fieldName: '' },
		// 	{ districtCode: 'anj', type: 'outdoor', coords: _toCoordsObj(), fieldName: '' },
		// 	{ districtCode: 'anj', type: 'outdoor', coords: _toCoordsObj(), fieldName: '' },
		// 	{ districtCode: 'anj', type: 'outdoor', coords: _toCoordsObj(), fieldName: '' },
		// 	{ districtCode: 'anj', type: 'outdoor', coords: _toCoordsObj(), fieldName: '' },
		// 	{ districtCode: 'anj', type: 'outdoor', coords: _toCoordsObj(), fieldName: '' },
		// 	{ districtCode: 'anj', type: 'outdoor', coords: _toCoordsObj(), fieldName: '' },
		// 	{ districtCode: 'anj', type: 'outdoor', coords: _toCoordsObj(), fieldName: '' },
		// 	{ districtCode: 'anj', type: 'outdoor', coords: _toCoordsObj(), fieldName: '' },
		// 	{ districtCode: 'anj', type: 'outdoor', coords: _toCoordsObj(), fieldName: '' },
		// 	{ districtCode: 'anj', type: 'outdoor', coords: _toCoordsObj(), fieldName: '' },
	]
}

function _rand(max) {
	return Math.floor(Math.random() * max) + 1
}

export function _toCoordsObj(lat, lng) {
	return { lat, lng }
}