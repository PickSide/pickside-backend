import { model, Document } from 'mongoose'
import { SettingsTemplateSchema } from '../schemas'

export interface ISettingsTemplate extends Document {
    [key: string]: any
}

// interface SoccerCreationConfig {
//     isPositionRequired: boolean
//     isBallProvided: boolean
//     isColoredClothingRequired: boolean
//     isPaymentRequired: boolean
//     maxPlayers: number
//     pricePp: number
//     level: number
//     playTime: number
//     rules: string
//     equipments: string[]
//     matchMode: MatchMode
// }

// interface SoccerRegistrationConfig {
//     isGoingToBringBall: boolean
//     hasColoredClothing: boolean
// }

export default model<ISettingsTemplate>('SettingsTemplate', SettingsTemplateSchema)