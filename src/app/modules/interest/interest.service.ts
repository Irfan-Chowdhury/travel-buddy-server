
import { prisma } from '../../shared/prisma';

const list = async () => {
  return prisma.interest.findMany({ orderBy: { id: 'asc' } });
};

export const InterestService = { list };
