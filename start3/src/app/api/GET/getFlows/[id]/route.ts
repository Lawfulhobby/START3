import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../../../prisma';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const { id: userAddress } = params;

    if (!userAddress) {
        return NextResponse.json({ error: 'Invalid user address' }, { status: 400 });
    }

    try {
        const user = await prisma.user.findUnique({
            where: { address: userAddress },
            select: {
                id: true,
            }
        })

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        const flows = await prisma.content.findMany({
            where: { userId: user.id },  // Using findFirst to query by non-unique field
            select: {
                id:true,
                name: true,
                description: true,
                steps: true,
                rewardInstructions: true,
            },
        });

        if (!flows) {
            return NextResponse.json({ error: 'Session not found' }, { status: 404 });
        }

        console.log('flows fetched:', flows);
        return NextResponse.json({ flows }, { status: 200 });

    } catch (error) {
        console.error('Error fetching flows:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}