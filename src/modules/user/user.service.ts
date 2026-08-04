import { prisma } from "../../lib/prisma";

export async function listTechnicians() {
  return prisma.user.findMany({
    where: { role: "TECHNICIAN" },
    orderBy: { name: "asc" },
    select: { id: true, name: true, email: true, createdAt: true },
  });
}

export async function listUsers() {
  return prisma.user.findMany({
    orderBy: { name: "asc" },
    select: { id: true, name: true, email: true, role: true, createdAt: true },
  });
}
