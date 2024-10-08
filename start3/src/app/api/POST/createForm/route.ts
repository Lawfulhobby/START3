import { connectToDatabase } from '@/lib/utils/server-helper';
import prisma from '../../../../../prisma';
import { NextResponse } from 'next/server';


export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      name,
      description,
      rewardInstructions,
      steps,
      address,
    } = body;

    console.log(address.toLowerCase());

    if (!address) {
      return NextResponse.json({ error: "User not logged in" }, { status: 401 });
    }

    await connectToDatabase

    // Fetch all users to test database connection
    const user = await prisma.user.findUnique({
      where: { address: address.toLowerCase() },
      select: {
        id: true,
        address: true,
      },
    });


    console.log(user)

    if (!user) {
      return NextResponse.json({ error: "Cannot fund because User private key is not found" }, { status: 404 });
    }

    console.log(user.id)
    // Create content with steps
    const content = await prisma.content.create({
      data: {
        name,
        description,
        rewardInstructions,
        steps,  // Prisma will handle the embedded array of steps
        userId: user.id,  // Connect the content to the user
      },
    });

    return NextResponse.json({ id: content.id, name: content.name }, { status: 201 });
  } catch (error) {
    console.error("Error creating content: ", error);
    return NextResponse.json({ error: 'Failed to create content' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}