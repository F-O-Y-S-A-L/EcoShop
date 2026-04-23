import { NextResponse } from "next/server";
import { Product, Review } from "@/src/models";
import { dbConnect } from "@/src/lib/mongodb";
import { auth } from "../../auth/[...nextauth]/options";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await dbConnect();
    const { id } = await params;
    const product = await (Product as any).findById(id);
    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 },
      );
    }
    const reviews = await (Review as any)
      .find({ productId: product._id })
      .sort("-createdAt");
    return NextResponse.json({ product, reviews });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching product" },
      { status: 500 },
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await auth();
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const { id } = await params;
    const body = await request.json();

    const product = await (Product as any).findByIdAndUpdate(id, body, {
      new: true,
    });
    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating product" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await auth();
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const { id } = await params;

    const product = await (Product as any).findByIdAndDelete(id);
    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ message: "Product removed from ecosystem" });
  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting product" },
      { status: 500 },
    );
  }
}
