import Account from '../models/Account'
import { Types } from 'mongoose'
import { hashSync } from 'bcrypt'

interface AccountProps {
	firstName: string
	lastName: string
	username: string
}

export function createAccount(props: AccountProps[]) {
	return Promise.all(
		props.map(
			async ({ firstName, lastName, username }) =>
				await Account.create({
					id: new Types.ObjectId(),
					email: `${firstName}${lastName}@gmail.com`,
					username,
					password: hashSync('123', 10),
					refreshToken: [],
					configs: {
						defaultSport: 'soccer',
						defaultLanguage: 'fr',
						darkModeDefault: true,
						locationTracking: false,
					},
					profile: {
						firstName,
						lastName,
						level: rand(5),
						localeRegion: 'montreal',
						matchOrganized: rand(400),
						matchPlayed: rand(50),
						reliability: rand(5),
						sexe: 'male',
					},
				}),
		),
	)
}

export function getAreas() {
	return [
		{ country: 'Canada', state: 'Quebec', city: 'Montreal', district: ['Anjou'], districtCode: 'anj', coords: [45.6122993, -73.5899528] },
		{ country: 'Canada', state: 'Quebec', city: 'Montreal', district: ['Ahunstic-Cartierville'], districtCode: 'ahc', coords: [45.5547972, -73.6777571] },
		{ country: 'Canada', state: 'Quebec', city: 'Montreal', district: ['Montreal-Nord'], districtCode: 'mtl-n', coords: [45.602927, -73.6496184] },
		{ country: 'Canada', state: 'Quebec', city: 'Montreal', district: ['Montreal-Est'], districtCode: 'mtl-e', coords: [45.6292342, -73.546502] },
		{ country: 'Canada', state: 'Quebec', city: 'Montreal', district: ['Lasalle'], districtCode: 'las', coords: [45.4361082, -73.6591395] },
		{ country: 'Canada', state: 'Quebec', city: 'Montreal', district: ['Lachine'], districtCode: 'lac', coords: [45.4505633, -73.7181664] },
		{ country: 'Canada', state: 'Quebec', city: 'Montreal', district: ['Saint-Leonard'], districtCode: 'leo', coords: [45.5888043, -73.6173978] },
		{ country: 'Canada', state: 'Quebec', city: 'Montreal', district: ['Saint-Michel', 'Parc-Extension', 'Villeray'], districtCode: 'stmch', coords: [45.5446838, -73.6350267] },
		{ country: 'Canada', state: 'Quebec', city: 'Montreal', district: ['Rosement'], districtCode: 'rsmt', coords: [45.553827, -73.6058538] },
		{ country: 'Canada', state: 'Quebec', city: 'Montreal', district: ['Plateau', 'Mont-Royal'], districtCode: 'pmtr', coords: [45.5233159, -73.6063665] },
		{ country: 'Canada', state: 'Quebec', city: 'Montreal', district: ['Outremont'], districtCode: 'outm', coords: [45.5160655, -73.6187685] },
		{ country: 'Canada', state: 'Quebec', city: 'Montreal', district: ['Westmount'], districtCode: 'wsmt', coords: [45.4848052, -73.6097335] },
		{ country: 'Canada', state: 'Quebec', city: 'Montreal', district: ['Mt-Royal'], districtCode: 'mtr', coords: [45.5071397, -73.6738939] },
		{ country: 'Canada', state: 'Quebec', city: 'Montreal', district: ['Saint-Laurent'], districtCode: 'sl', coords: [45.4966238, -73.753911] },
		{ country: 'Canada', state: 'Quebec', city: 'Montreal', district: ['Cote-des-Neiges', 'Hampstead', 'Notre-Dame-de-Grace'], districtCode: 'ndg', coords: [45.4673574, -73.6479913] },
		{ country: 'Canada', state: 'Quebec', city: 'Laval', district: ['Fabreville'], districtCode: 'fbv', coords: [] },
		{ country: 'Canada', state: 'Quebec', city: 'Laval', district: ['Duvernay'], districtCode: 'duv', coords: [] },
		{ country: 'Canada', state: 'Quebec', city: 'Laval', district: ['Vimont'], districtCode: 'vim', coords: [] },
		{ country: 'Canada', state: 'Quebec', city: 'Laval', district: ['Chomedey'], districtCode: 'chd', coords: [] },
		{ country: 'Canada', state: 'Quebec', city: 'Laval', district: ['Auteuil'], districtCode: 'aut', coords: [] },
		{ country: 'Canada', state: 'Quebec', city: 'Laval', district: ['Pont-Viau'], districtCode: 'pv', coords: [] },
		{ country: 'Canada', state: 'Quebec', city: 'Laval', district: ['Laval-des-rapides'], districtCode: 'ldr', coords: [] },
		// { country: 'Canada', state: 'Quebec', city: 'Terrebone' },
		// { country: 'Canada', state: 'Quebec', city: 'Longueuil' },
	]
}

function rand(max) {
	return Math.floor(Math.random() * max) + 1
}
