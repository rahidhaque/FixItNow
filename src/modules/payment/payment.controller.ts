import type Stripe from "stripe";
import { AppError } from "../../utility/appError";
import { catchAsync } from "../../utility/catchAsync";
import type { Request, Response } from "express";
import { stripe } from "../../lib/stripe";
import { config } from "../../config";
import z from "zod";
import { completePayment, createCheckOutSession, getMyPaymentHistory } from "./payment.service";
import { sendResponse } from "../../utility/sendResponse";
import { prisma } from "../../lib/prisma";

export const webhook = catchAsync(async (req: Request, res: Response) => {
  const signature = req.headers["stripe-signature"];

  if (!signature) {
    throw new AppError(400, "Missing stripe signature header");
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      config.STRIPE_WEBHOOK_SECRET,
    );
  } catch (error) {
    throw new AppError(400, "Invalid Webhook Signature");
  }

  const session = event.data.object as {
    id: string;
    metadata?: { bookingId?: string };
  };

  const bookingId = session.metadata?.bookingId;

  if (bookingId) {
    if (event.type === "checkout.session.completed") {
        await completePayment(bookingId, session.id);
    } 
    else if (
      event.type === "checkout.session.expired" ||
      event.type === "checkout.session.async_payment_failed"
    ) 
    {
        await prisma.payment.updateMany({
        where: { bookingId, status: "PENDING" },
        data: { status: "FAILED" },
      });
    }
  }

  res.json({ received: true });
});

const bookingIdParamSchema = z.object({
  bookingId: z.uuid("invalid booking id"),
});

export const checkout = catchAsync(async (req: Request, res: Response) => {
  const { bookingId } = bookingIdParamSchema.parse(req.params);

  const result = await createCheckOutSession(req.user!.id, bookingId);

  sendResponse(res, {
    message: "Checkout session created",
    data: result,
  });
});


export const paymentHistory = catchAsync(
  async (req: Request, res: Response) => {
    const payments = await getMyPaymentHistory(req.user!.id);

    sendResponse(res, {
      message: "Payment history retrieved successfully",
      data: payments,
    });
  },
);