import User from 'src/schemas/User'
import cron from 'node-cron'

cron.schedule('10 * * * *', async () => {
    console.log('update batch of inactive users...')
    await User.updateMany({ inactive: true }, { inactiveDate: Date.now() }).exec()
    console.log('done')
})

