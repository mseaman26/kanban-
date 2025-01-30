import { Router } from 'express';
import authRoutes from './auth-routes.js';
import apiRoutes from './api/index.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

router.use('/auth', authRoutes);

// authenticateToken validates the user is logged in before allowing api access
router.use('/api', authenticateToken, apiRoutes);

export default router;
