import { NextResponse } from 'next/server';
import { Product, Review } from '@/src/models';
import { dbConnect } from '@/src/lib/mongodb';
import { auth } from '../auth/[...nextauth]/options';

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ message: 'Login required' }, { status: 401 });
    }
    console.log('session:', session)

    await dbConnect();
    const { productId, rating, comment } = await request.json();

    const review = await Review.create({
      productId,
      userId: session.user.id,
      userName: session.user.name,
      rating,
      comment
    });

    // Update product rating
    const reviews = await (Review as any).find({ productId });
    const avg = reviews.reduce((acc: any, r: any) => acc + r.rating, 0) / reviews.length;
    await (Product as any).findByIdAndUpdate(productId, { averageRating: avg, reviewsCount: reviews.length });

    return NextResponse.json(review);
  } catch (error) {
    return NextResponse.json({ message: 'Error submitting review' }, { status: 500 });
  }
}
