import { db } from 'pn/server/db';
import { createTRPCRouter, publicProcedure } from '../trpc';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';

import bcrypt from 'bcrypt';
import { resolve } from 'path';

export const usersRouter = createTRPCRouter({
  register: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        username: z.string().min(3).max(16),
        dob: z
          .string()
          .refine((val) => !isNaN(Date.parse(val)), 'Invalid date'),

        password: z
          .string()
          .min(8)
          .regex(/[a-zA-Z0-9]/g, 'Password must contain letters and numbers'),
      })
    )
    .mutation(async ({ input }) => {
      const { email, username, dob, password } = input;

      const user = await db.user.findUnique({
        where: { email },
      });

      if (user) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'User already exists',
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await db.user.create({
        data: {
          email,
          username,
          dob: new Date(dob),
          password: hashedPassword,
        },
      });

      return newUser;
    }),
});
