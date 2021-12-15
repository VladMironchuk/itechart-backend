import { NextFunction, Request, Response, Router } from 'express';
import { LastRatingsRepository } from '../repository/last-ratings/LastRatingsRepository';
import { wsServer } from '../web-socket';

const router = Router();

export const sendRatings = async () => {
  const lastRatings = await LastRatingsRepository.get();
  wsServer.emit('ratings', JSON.stringify(lastRatings))
}

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await sendRatings()
    res.status(200).send()
  } catch (e) {
    console.log(e);
    next(e);
  }
});

export default router;
