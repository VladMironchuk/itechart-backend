import { Request, Response, Router } from 'express';

export const router = Router();

router.get('/', (req: Request, res: Response, _) => {
  res.send('user');
});

router.post('/', (req: Request, res: Response, _) => {
  console.log(req.body);
  res.send(req.body);
});
