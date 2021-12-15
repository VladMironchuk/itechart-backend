import cron from 'node-cron'
import { sendRatings } from '../../routes/last-ratings';

cron.schedule('* * * * Monday', async () => {
  await sendRatings()
})