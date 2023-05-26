import { PrismaClient } from '@prisma/client';

interface CustomNodeJsGlobal {
  prisma: PrismaClient;
}

export interface Store {
  database: PrismaClient;
}

declare const global: CustomNodeJsGlobal;

const prisma = global.prisma || new PrismaClient();

export default prisma;
