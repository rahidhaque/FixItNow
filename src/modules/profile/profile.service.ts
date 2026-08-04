import { prisma } from "../../lib/prisma";

export async function updateProfile(
  userId: string,
  payload: {
    bio?: string;
    experience?: number;
  },
) {
  return prisma.technicianProfile.update({
    where: {
      userId,
    },
    data: payload,
  });
}
