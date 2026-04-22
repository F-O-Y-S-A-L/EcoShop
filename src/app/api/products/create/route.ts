import { NextResponse } from 'next/server';

import { Product } from '@/src/models';
import { dbConnect } from '@/src/lib/mongodb';
import { auth } from '../../auth/[...nextauth]/options';

export async function POST(request: Request) {
  try {
    const session = await auth();
    
    // Check if user is logged in and is an admin
    // if (!session || !session.user || (session.user as any).role !== 'user') {
    //   return NextResponse.json({ message: 'Unauthorized. Admin access required.' }, { status: 403 });
    // }

    await dbConnect();
    const productData = await request.json();

    // Basic validation
    if (!productData.name || !productData.price || !productData.category) {
      return NextResponse.json({ message: 'Missing required product fields' }, { status: 400 });
    }

    const newProduct = await Product.create({
      ...productData,
      stock: productData.stock || 0,
      images: productData.images || [],
      tags: productData.tags || []
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Product created successfully', 
      product: newProduct 
    }, { status: 201 });

  } catch (error: any) {
    console.error('Create product error:', error);
    return NextResponse.json({ message: error.message || 'Server error' }, { status: 500 });
  }
}
