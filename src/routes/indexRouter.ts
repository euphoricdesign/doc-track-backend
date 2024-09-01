import { Router } from 'express';
import usersRouter from './usersRouter';
import appointmentsRouter from './appointmentsRouter';
import doctorsRouter from './doctorsRouter';

const router: Router = Router()

router.use('/users', usersRouter)
router.use('/appointments', appointmentsRouter)
router.use('/doctors', doctorsRouter)

export default router