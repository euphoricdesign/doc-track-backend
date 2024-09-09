import { Router } from 'express';
import usersRouter from './usersRouter';
import appointmentsRouter from './appointmentsRouter';
import doctorsRouter from './doctorsRouter';
import categoriesRouter from './categoriesRouter';

const router: Router = Router()

router.use('/users', usersRouter)
router.use('/appointments', appointmentsRouter)
router.use('/doctors', doctorsRouter)
router.use('/categories', categoriesRouter)

export default router