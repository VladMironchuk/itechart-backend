import cron from 'node-cron'
import { sendRatings } from '../../routes/last-ratings';

export const task = cron.schedule('* * * * Monday', async () => {
  await sendRatings()
})