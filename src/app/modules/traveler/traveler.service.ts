
import { prisma } from '../../shared/prisma';

const topRated = async () => {
  const users = await prisma.user.findMany({
    orderBy: { ratingAvg: 'desc' },
    take: 6,
    select: {
      id: true, name: true, email: true, imageUrl: true, location: true, age: true, bio: true,
      ratingAvg: true, ratingCount: true,
      interests: { include: { interest: true } },
    },
  });

  return users.map(u => ({ ...u, interests: u.interests.map(ui => ui.interest) }));
};

export const TravelerService = { topRated };
