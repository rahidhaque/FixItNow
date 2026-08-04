import { prisma } from "../../lib/prisma";
import { AppError } from "../../utility/appError";

export async function listServices() {
  return prisma.service.findMany({});
}

// const service1 = await prisma.service.create({
//     data: {
//       title: "Deep Home Cleaning",
//       description: "Complete cleaning service",
//       city: "Chittagong",
//       technicianId: technician1.id,
//       categoryId: cleaning.id,
//     },
//   });

export async function createService(
  userId: string,
  payload: {
    title: string;
    description?: string;
    city: string;
  },
) {
  const technician = await prisma.technicianProfile.findUnique({
    where: {
      userId,
    },
  });

  if (!technician) {
    throw new AppError(404, "Technician profile not found");
  }

  return prisma.service.create({
    data: {
      title: payload.title,
      city: payload.city,
      description: payload.description ?? null,
      technicianId: technician.id,
    },
  });
}
