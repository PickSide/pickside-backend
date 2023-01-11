import axios from 'axios'
import User from '../models/User'

const index = async (req: any, resp: any) => {
	let users = await User.find()
	return resp.json(users)
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
