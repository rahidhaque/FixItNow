import { prisma } from "../../lib/prisma";

export async function listTechnicians() {
  return prisma.user.findMany({
    where: { role: "TECHNICIAN" },
    orderBy: { name: "asc" },
    select: { id: true, name: true, email: true, createdAt: true }
  });
}
