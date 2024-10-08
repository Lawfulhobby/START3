import prisma from '../../../../prisma';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    try {
        // Fetch all users to test database connection
        const users = await prisma.user.findMany({
            where: { address: "0x06ad34ecdc7b2a212fc815eaf06e229e37297712" },
            select: {
                id: true,
                address: true,
            },
        });

        console.log("Fetched users:", users);

        // Return the list of users as a response
        return NextResponse.json({ users }, { status: 200 });
    } catch (error) {
        console.error("Error fetching users: ", error);
        return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}