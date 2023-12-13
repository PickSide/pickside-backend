import { AppContext, FailReason, JobType, SendErrorResponse, Status } from '../utils/responses'
import express, { Request, Response } from 'express'

import { spawn } from 'child_process'

const router = express.Router()

router.post('/resetdb', (req: Request, res: Response) => {
	const child = spawn(/^win/.test(process.platform) ? 'npm.cmd' : 'npm', ['run', 'createdb'])

	child
		.on('close', (code) => {
			if (code === 0) {
				res.json({ statusMessage: 'OK', statusCode: '200' })
			} else {
				SendErrorResponse({
					context: AppContext.DB,
					failReason: FailReason.DbResetFailed,
					jobStatus: 'FAILED',
					jobType: JobType.ResetDb,
					message: 'Error while resetting db.',
					res,
					status: Status.InternalServerError,
				})
			}
		})
		.on('error', (err) =>
			SendErrorResponse({
				context: AppContext.DB,
				failReason: FailReason.DbResetFailed,
				jobStatus: 'FAILED',
				jobType: JobType.ResetDb,
				message: err.message,
				res,
				status: Status.InternalServerError,
			}),
		)
})

export default router
