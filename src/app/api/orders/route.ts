import { NextResponse } from 'next/server';
import { Order } from '@/src/models';
import { dbConnect } from '@/src/lib/mongodb';
import { auth } from '../auth/[...nextauth]/options';

export async function POST(request: Request) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ message: 'Login required' }, { status: 401 });
    }

    await dbConnect();
    const { items, totalAmount, shippingAddress, paymentMethod } = await request.json();

    const order = await (Order as any).create({
      userId: session.user.id,
      items,
      totalAmount,
      shippingAddress,
      paymentMethod,
      paymentStatus: 'pending'
    });

    return NextResponse.json(order);
  } catch (error) {
    return NextResponse.json({ message: 'Error creating order' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ message: 'Login required' }, { status: 401 });
    }

    await dbConnect();
    const orders = await (Order as any).find({ userId: session.user.id }).sort({ createdAt: -1 });

    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching orders' }, { status: 500 });
  }
}
