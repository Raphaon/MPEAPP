import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { loginSchema, registerSchema } from './auth.dto';
import { authService } from './auth.service';

export const authRouter = Router();

authRouter.post('/register', async (req, res, next) => {
  try {
    const payload = registerSchema.parse(req.body);
    const user = await authService.register(payload);
    res.status(StatusCodes.CREATED).json(user);
  } catch (error) {
    next(error);
  }
});

authRouter.post('/login', async (req, res, next) => {
  try {
    const payload = loginSchema.parse(req.body);
    const response = await authService.login(payload.email, payload.password);
    res.json(response);
  } catch (error) {
    next(error);
  }
});
