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

function rand(max) {
	return Math.floor(Math.random() * max) + 1
}
