import { BookingStatus } from "../../../prisma/generated/prisma/enums";
import { prisma } from "../../lib/prisma";
import { AppError } from "../../utility/appError";

export async function createBookingRequest(
  customerId: string,
  payload: { serviceId: string; totalPrice: number; description?: string },
) {
  const service = await prisma.service.findUnique({
    where: { id: payload.serviceId },
  });
  if (!service){
    throw new AppError(404, "Service not Found");
  }

  const isExist = await prisma.booking.findFirst({
    where: {
      customerId: customerId,
      serviceId: payload.serviceId,
      status: {
        in: [
          BookingStatus.PENDING,
          BookingStatus.APPROVED,
          BookingStatus.ACTIVE,
        ],
      },
    },
  });
  if (isExist) {
    throw new AppError(
      409,
      "You already have an active request for this service",
    );
  }
  return prisma.booking.create({
    data: {
      customerId,
      serviceId: payload.serviceId,
      totalPrice: payload.totalPrice,
      description: payload.description ?? null,
    },
  });
}

