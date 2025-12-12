
import { prisma } from '../../shared/prisma';

const popular = async () => {
  return prisma.destination.findMany({
    orderBy: { activeTravelers: 'desc' },
    take: 6,
  });
};

export const DestinationService = { popular };
