import { Request, Response } from 'express'
import { Status, SendResponse, MessageResponse } from '../utils/responses'

export const notFoundHandler = (request: Request, response: Response, next) => {
    SendResponse(response, Status.NotFound, MessageResponse('Not found'))
}