import type { BookingStatus } from "../../../prisma/generated/prisma/enums";
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

export async function getTechnicianBookings(userId: string) {
  return prisma.booking.findMany({
    where: {
      service: {
        technicianProfile: {
          userId,
        },
      },
    },
    include: {
      customer: true,
      service: true,
      payment: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function updateBookingStatus(
  bookingId: string,
  userId: string,
  status: BookingStatus
) {
  const booking = await prisma.booking.findFirst({
    where: {
      id: bookingId,
      service: {
        technicianProfile: {
          userId,
        },
      },
    },
  });

  if (!booking) {
    throw new Error("Booking not found.");
  }

  return prisma.booking.update({
    where: {
      id: bookingId,
    },
    data: {
      status,
    },
    include: {
      customer: true,
      service: true,
      payment: true,
    },
  });
}