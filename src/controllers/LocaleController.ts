import Locale from '../models/Locale'

const index = async (req: any, resp: any) => {
	let locales = await Locale.find()
	return resp.json({ results: locales })
}
const store = async (req: any, resp: any) => {
	return resp.json('dev')
}
const update = async (req: any, resp: any) => {
	return resp.json('dev')
}
const destroy = async (req: any, resp: any) => {
	return resp.json({ status: 'The dev was deleted successfully' })
}
export default {
	index,
	store,
	update,
	destroy,
}
