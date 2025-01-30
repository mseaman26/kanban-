import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

// Returns a JWT token if the user exists and the password is correct
export const login = async (req: Request, res: Response) => {  
  // Get login details from request body
  const { username, password } = req.body;

  // Find the user in the DB
  const user = await User.findOne({
    where: { username }
  });

  if (user) {
    // Validate password with stored hash
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      // Generate a JWT token using our secret key
      const secretKey = process.env.JWT_SECRET_KEY || '';
      
      const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
      return res.json({ token });
    }    
  }  

  // Fail login if user not found or password invalid
  return res.status(401).json({ message: 'Authentication failed' });  
};

const router = Router();

// POST /login - Login a user
router.post('/login', login);

export default router;
