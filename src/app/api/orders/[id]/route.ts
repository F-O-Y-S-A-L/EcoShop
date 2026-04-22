import { NextResponse } from 'next/server';
import {dbConnect} from '@/src/lib/mongodb';
import { Order } from '@/src/models';
import { auth } from '../../auth/[...nextauth]/options';

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ message: 'Login required' }, { status: 401 });
    }

    await dbConnect();
    const { id } = await params;
    
    // Ensure the order belongs to the user
    const order = await (Order as any).findOne({ _id: id, userId: session.user.id });
    
    if (!order) {
      return NextResponse.json({ message: 'Order not found' }, { status: 404 });
    }

    await (Order as any).deleteOne({ _id: id });

    return NextResponse.json({ message: 'Order deleted from history' });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ message: 'Error deleting order' }, { status: 500 });
  }
}
