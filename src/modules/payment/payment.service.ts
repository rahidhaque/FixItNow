import { prisma } from "../../lib/prisma";
import { stripe } from "../../lib/stripe";
import { AppError } from "../../utility/appError";

export const createCheckOutSession = async (
  customerId: string,
  bookingId: string,
) => {
  const booking = await prisma.booking.findUnique({
    where: {
      id: bookingId,
    },
    include: {
      service: true,
      payment: true,
    },
  });

  if (!booking) {
    throw new AppError(404, "Booking not Found");
  }
  if (booking.customerId !== customerId) {
    throw new AppError(404, "This is not your booking");
  }

  if (booking.status !== "PENDING") {
    throw new AppError(404, `Can't pay for a ${booking.status} booking`);
  }

  if (booking.payment?.status === "COMPLETED") {
    throw new AppError(409, "Booking is already paid");
  }

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    metadata: { bookingId: booking.id },
    success_url: "http://localhost:3000/payment/success",
    cancel_url: "http://localhost:3000/payment/cancel",
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "USD",
          unit_amount: Math.round(booking.totalPrice * 100),
          product_data: {
            name: `${booking.service.title}`,
          },
        },
      },
    ],
  });

  await prisma.payment.upsert({
    where: { bookingId: booking.id },
    create: {
      bookingId: booking.id,
      amount: booking.totalPrice,
      transactionId: session.id,
    },
    update: { transactionId: session.id, status: "PENDING" },
  });

  return { checkoutUrl: session.url };
};

export async function completePayment(
  bookingId: string,
  transactionId: string,
) {
  const payment = await prisma.payment.findUnique({
    where: {
      bookingId,
    },
  });

  if (!payment || payment.status === "COMPLETED") return;

  await prisma.$transaction([
    prisma.payment.update({
      where: {
        bookingId,
      },
      data: {
        status: "COMPLETED",
        transactionId,
      },
    }),
    prisma.booking.update({
      where: {
        id: bookingId,
      },
      data: {
        status: "APPROVED",
      },
    }),
  ]);
}
