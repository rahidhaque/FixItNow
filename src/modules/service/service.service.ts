//  const service1 = await prisma.service.create({
//     data: {
//       title: "Deep Home Cleaning",
//       description: "Complete cleaning service",
//       city: "Chittagong",
//       technicianId: technician1.id,
//       categoryId: cleaning.id,
//     },

import { prisma } from "../../lib/prisma";

//   });
export async function listServices() {
  return prisma.service.findMany({});
}