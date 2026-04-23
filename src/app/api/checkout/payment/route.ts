import { NextResponse } from "next/server";
import { Order } from "@/src/models";
import { dbConnect } from "@/src/lib/mongodb";

export async function POST(request: Request) {
  try {
    const { orderId, method } = await request.json();
    await dbConnect();
    await Order.findByIdAndUpdate(
      orderId,
      { paymentStatus: "paid" },
      { new: true, includeResultMetadata: true, lean: true },
    );
    return NextResponse.json({
      success: true,
      message: `Payment successful via ${method}`,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error processing payment" },
      { status: 500 },
    );
  }
}
