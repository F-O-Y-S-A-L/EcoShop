import { NextResponse } from 'next/server';
import { User } from '@/src/models';
import { dbConnect } from '@/src/lib/mongodb';
import { auth } from '../../auth/[...nextauth]/options';

export async function POST(request: Request) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ message: 'Login required' }, { status: 401 });
    }

    await dbConnect();
    const { productId } = await request.json();
    const user = await User.findById(session.user.id);
    if (!user) return NextResponse.json({ message: 'User not found' }, { status: 404 });

    const index = user.wishlist.indexOf(productId);
    if (index > -1) {
      user.wishlist.splice(index, 1);
    } else {
      user.wishlist.push(productId);
    }
    await user.save();
    
    return NextResponse.json({ wishlist: user.wishlist });
  } catch (error) {
    return NextResponse.json({ message: 'Error toggling wishlist' }, { status: 500 });
  }
}
