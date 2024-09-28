import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

// Initialize Prisma Client
const prisma = new PrismaClient();

export async function POST(request: Request) {
  const body = await request.json();

  const { name, description, rewardInstructions, steps } = body;

  try {
    // Create new content in the database, directly assigning the steps array
    const content = await prisma.content.create({
      data: {
        name,
        description,
        rewardInstructions,
        steps,  // Directly assign the array of steps
      },
    });

    console.log(content);
    return NextResponse.json({ id: content.id, name: content.name }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create content' }, { status: 500 });
  }
}