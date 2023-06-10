import { Schema, Types } from 'mongoose'

const SoccerSettingsTemplate = {
    isPositionRequired: { type: Boolean, require: false, default: false, },
    isBallProvided: { type: Boolean, require: false, default: false },
    isPaymentRequired: { type: Boolean, require: false, default: true },
    pricePp: { type: Number, require: false, default: 0 },
    maxPlayers: { type: Number, require: false, default: 22 },
    equipments: [{ type: String, require: false, default: [''] }],
    level: { type: Number, require: false, default: 0 },
    clothingColor: { type: [String], require: false, default: ['red', 'blue'] },
    playTime: { type: Number, require: false, default: 60 },
    rules: { type: String, require: false, default: '' }
}

export const SettingsTemplateSchema = new Schema(
    {
        SOCCER: { ...SoccerSettingsTemplate }
    },
    {
        timestamps: false,
        versionKey: false,
        _id: false,
    },
)

SettingsTemplateSchema.post('find', (doc) => doc[0])
