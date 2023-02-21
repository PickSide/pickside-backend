import { Request, Response } from 'express'
import { InsufficientScopeError, InvalidTokenError, UnauthorizedError, } from 'express-oauth2-jwt-bearer'
import { Status, SendResponse, MessageResponse } from '../utils/responses'

export const errorHandler = (error, request: Request, response: Response, next) => {
    if (error instanceof InsufficientScopeError) {
        SendResponse(response, error.status, MessageResponse('Permission denied'))
        return
    }
    if (error instanceof InvalidTokenError) {
        SendResponse(response, error.status, MessageResponse('Bad credentials'))
        return
    }
    if (error instanceof UnauthorizedError) {
        SendResponse(response, error.status, MessageResponse('Requires authentication'))
        return
    }

    SendResponse(response, Status.InternalServerError, MessageResponse('Internal Server Error'))
}