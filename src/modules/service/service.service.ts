
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

export async function createService(payload: {
    title: string;
    description: string;
    city: string;
    technicianId: string;
    categoryId: string;
}) {
    return prisma.service.create({
        data: payload
    });
}