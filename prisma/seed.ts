import bcrypt from "bcryptjs";
import { prisma } from "../src/lib/prisma";
import {
  BookingStatus,
  PaymentStatus,
  Role,
  Status,
} from "./generated/prisma/enums";

async function main() {
  await prisma.review.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.service.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  const password = await bcrypt.hash("bdonti123", 10);

  //users

  //1. Admin
  const admin = await prisma.user.create({
    data: {
      name: "Admin",
      email: "admin@google.com",
      password,
      role: Role.ADMIN,
      status: Status.ACTIVE,
    },
  });

  //2. Customers
  const customer1 = await prisma.user.create({
    data: {
      name: "Kuddus Mia",
      email: "kuddus.mia@gmail.com",
      password,
      role: Role.CUSTOMER,
    },
  });
  const customer2 = await prisma.user.create({
    data: {
      name: "Hero Alom",
      email: "hero.alom@gmail.com",
      password,
      role: Role.CUSTOMER,
    },
  });

  //3. Technician
  const technician1 = await prisma.user.create({
    data: {
      name: "Cleaner Master",
      email: "cleaner@example.com",
      password,
      role: Role.TECHNICIAN,
    },
  });

  const technician2 = await prisma.user.create({
    data: {
      name: "Electric Expert",
      email: "electric@example.com",
      password,
      role: Role.TECHNICIAN,
    },
  });

  const technician3 = await prisma.user.create({
    data: {
      name: "Plumber Pro",
      email: "plumber@example.com",
      password,
      role: Role.TECHNICIAN,
    },
  });

  //categories
  const electrical = await prisma.category.create({
    data: {
      name: "Electrical",
      description: "Electrical installation & repair",
    },
  });

  const plumbing = await prisma.category.create({
    data: {
      name: "Plumbing",
      description: "Pipe and water services",
    },
  });

  const cleaning = await prisma.category.create({
    data: {
      name: "Cleaning",
      description: "Home cleaning services",
    },
  });

  //services
  const service1 = await prisma.service.create({
    data: {
      title: "Deep Home Cleaning",
      description: "Complete cleaning service",
      city: "Chittagong",
      technicianId: technician1.id,
      categoryId: cleaning.id,
    },
  });
  const service2 = await prisma.service.create({
    data: {
      title: "House Wiring",
      description: "Complete electrical wiring",
      city: "Dhaka",
      technicianId: technician2.id,
      categoryId: electrical.id,
    },
  });
  const service3 = await prisma.service.create({
    data: {
      title: "Water Pipe Repair",
      description: "Leak fixing",
      city: "Dhaka",
      technicianId: technician3.id,
      categoryId: plumbing.id,
    },
  });

  //bookings
  const booking1 = await prisma.booking.create({
    data: {
      customerId: customer1.id,
      serviceId: service1.id,
      status: BookingStatus.COMPLETED,
      totalPrice: 1200,
      description: "Complete cleaning service",
    },
  });

  const booking2 = await prisma.booking.create({
    data: {
      customerId: customer2.id,
      serviceId: service2.id,
      status: BookingStatus.ACTIVE,
      totalPrice: 3450,
      description: "Complete electrical wiring",
    },
  });

  const booking3 = await prisma.booking.create({
    data: {
      customerId: customer2.id,
      serviceId: service3.id,
      status: BookingStatus.PENDING,
      totalPrice: 1800,
      description: "Leak fixing",
    },
  });

  //payments

  await prisma.payment.create({
    data: {
      bookingId: booking1.id,
      customerId: customer1.id,
      amount: booking1.totalPrice,
      status: PaymentStatus.COMPLETED,
      transactionId: "TXN-100001",
    },
  });

  await prisma.payment.create({
    data: {
      bookingId: booking2.id,
      customerId: customer2.id,
      amount: booking2.totalPrice,
      status: PaymentStatus.PENDING,
      transactionId: "TXN-100002",
    },
  });

  await prisma.payment.create({
    data: {
      bookingId: booking3.id,
      customerId: customer2.id,
      amount: booking3.totalPrice,
      status: PaymentStatus.FAILED,
      transactionId: "TXN-100003",
    },
  });

  //reviews
  await prisma.review.create({
    data: {
      bookingId: booking1.id,
      customerId: customer1.id,
      serviceId: service1.id,
      rating: 5,
      comment: "Excellent work. Highly recommended!",
    },
  });
  console.log("Seed finished!");
}

main().then(() => {
  process.exit(0);
})