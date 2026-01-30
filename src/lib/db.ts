import { prismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as {
  prisma: prismaClient 
}


export const db = globalForPrisma.prisma || new prismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db;



