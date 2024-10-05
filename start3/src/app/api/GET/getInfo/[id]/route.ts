import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../../../prisma';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const { id: sessionId } = params;

    if (!sessionId) {
        return NextResponse.json({ error: 'Invalid or missing referral code' }, { status: 400 });
    }

    try {
        const session = await prisma.content.findFirst({
            where: { id: sessionId },  // Using findFirst to query by non-unique field
            select: {
                name: true,
                description: true,
                steps: true,
                rewardInstructions: true,
            },
        });

        if (!session) {
            return NextResponse.json({ error: 'Session not found' }, { status: 404 });
        }

        console.log('Session fetched:', session);
        return NextResponse.json({ session }, { status: 200 });

    } catch (error) {
        console.error('Error fetching session:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}