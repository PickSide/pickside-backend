import { config } from 'dotenv'
import { auth, claimCheck, InsufficientScopeError } from 'express-oauth2-jwt-bearer'

config()

export const validateAccessToken = auth({
    issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
    audience: process.env.AUTH0_IDENTIFIER,
})

// export const checkRequiredPermissions = (requiredPermissions) => {
//     return (req, res, next) => {
//         const permissionCheck = claimCheck((payload) => {
//             const permissions = payload.permissions || [];

//             const hasPermissions = requiredPermissions.every((requiredPermission) =>
//                 permissions.includes(requiredPermission)
//             );

//             if (!hasPermissions) {
//                 throw new InsufficientScopeError();
//             }

//             return hasPermissions;
//         });

//         permissionCheck(req, res, next);
//     };
// };