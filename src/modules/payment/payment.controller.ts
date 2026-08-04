import type Stripe from "stripe";
import { AppError } from "../../utility/appError";
import { catchAsync } from "../../utility/catchAsync";
import type { Request, Response } from "express";
import { stripe } from "../../lib/stripe";
import { config } from "../../config";
import z from "zod";

export const webhook = catchAsync(async(req: Request,res: Response) =>{
    const signature = req.headers["stripe-signature"];

    if(!signature){
        throw new AppError(400, "Missing stripe signature header");
    }

    let event: Stripe.Event 
    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            signature,
            config.STRIPE_WEBHOOK_SECRET
        )
    } catch (error) {
        throw new AppError(400, "Invalid Webhook Signature");
    }

    const session = event.data.object;
    
})

const bookingIdParamSchema = z.object({
  bookingId: z.uuid("invalid booking id"),
});

export const checkout = catchAsync(async(req: Request, res: Response)=> {
    const { bookingId } = bookingIdParamSchema.parse(req.params);
})