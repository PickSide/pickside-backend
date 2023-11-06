import { QueryOptions } from 'mongoose'

// startswith=
//
// ^
// [k1, k2, k3]

const MappedQueries = {
	starts_with: '^',
	exclude_id: '!',
}

export default function queryBuilder(...args) {
	let query: QueryOptions
	console.log(args)
	return {
		$and: [],
	}
}
