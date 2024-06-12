import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { db } from '../db';

import bcrypt from 'bcrypt';

const registerUserSchema = z.object({
  email: z.string().email(),
  username: z.string().min(3),
  dob: z.date(),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .regex(/[a-zA-Z0-9]/g, 'Password must contain letters and numbers'),
});

export default async function registerUser(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const result = registerUserSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({ error: result.error });
  }

  const { email, username, dob, password } = result.data;

  try {
    const user = await db.user.findUnique({ where: { email } });

    if (user) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.user.create({
      data: {
        email,
        username,
        dob,
        password: hashedPassword,
      },
    });

    return res.status(201).json({ message: 'User created' });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
}
