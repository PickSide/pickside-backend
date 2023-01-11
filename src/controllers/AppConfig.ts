import axios from 'axios'
import AppConfig from '../models/AppConfig'

const index = async (req: any, resp: any) => {
	const { userId } = req.params
	const userConfig = await AppConfig.findOne({ userId })
	return resp.status(200).json(userConfig)
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
