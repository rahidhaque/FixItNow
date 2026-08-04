import { prisma } from "../../lib/prisma";

export async function updateProfile(
  userId: string,
  payload: {
    bio?: string;
    experience?: number;
  },
) 
{
  return prisma.technicianProfile.update({
    where: {
      userId,
    },
    data: payload,
  });
}


export async function updateAvailability(
  userId: string,
  availability: boolean
) {
  return prisma.technicianProfile.update({
    where: {
      userId,
    },
    data: {
      availability,
    },
  });
}