import { NextResponse } from 'next/server';
import { Order } from '@/src/models';
import { auth } from '../../auth/[...nextauth]/options';
import { dbConnect } from '@/src/lib/mongodb';
import mongoose from 'mongoose';

export async function GET() {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ message: 'Login required' }, { status: 401 });
    }

    await dbConnect();
    const orders = await Order.find({ userId: new mongoose.Types.ObjectId(session.user.id) } as any).sort('-createdAt');
    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching orders' }, { status: 500 });
  }
}
