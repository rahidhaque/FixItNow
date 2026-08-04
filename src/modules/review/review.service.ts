import { prisma } from "../../lib/prisma";

export async function createReview(
  customerId: string,
  payload: {
    bookingId: string;
    rating: number;
    comment?: string;
  }
) {
  const booking = await prisma.booking.findUnique({
    where: {
      id: payload.bookingId,
    },
  });

  if (!booking) {
    throw new Error("Booking not found.");
  }

  if (booking.customerId !== customerId) {
    throw new Error("Unauthorized.");
  }

  if (booking.status !== "COMPLETED") {
    throw new Error("Review can only be submitted after job completion.");
  }

  return prisma.review.create({
    data: {
      bookingId: booking.id,
      customerId,
      serviceId: booking.serviceId,
      rating: payload.rating,
      comment: payload.comment ?? null,
    },
  });
}