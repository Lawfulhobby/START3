import { IRON_OPTIONS } from '@/lib/config/session';
import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { SiweMessage } from 'siwe';
import { SignJWT } from 'jose';
import { env } from '@/lib/config/env';
import { JWT_CONFIG } from '@/lib/constants';
import prisma from '../../../../../prisma';

export async function POST(request: Request) {
  const session = await getIronSession<{ nonce: string }>(
    cookies(),
    IRON_OPTIONS
  );

  const { message, signature } = await request.json();

  const siweMessage = new SiweMessage(message);
  const { data: fields } = await siweMessage.verify({ signature });

  if (fields.nonce !== session.nonce) {
    return NextResponse.json({ message: 'Invalid nonce.' }, { status: 422 });
  }

  // Retrieve or create the user in the database
  let user = await prisma.user.findUnique({
    where: { address: fields.address.toLowerCase() }, // Ensure case-insensitive match
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        address: fields.address.toLowerCase(),
        // Add other fields as necessary, e.g., email, name
      },
    });
  }

  const jwt = await generateJwt({
    address: fields.address,
    chainId: fields.chainId,
    domain: fields.domain,
    nonce: fields.nonce,
  });

  console.log(fields.address)
  console.log(jwt)

  return NextResponse.json({ jwt });
}

async function generateJwt(payload: { address: string; chainId: number; domain: string; nonce: string }) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setIssuer(JWT_CONFIG.ISSUER)
    .setAudience(JWT_CONFIG.AUDIENCE)
    .sign(new TextEncoder().encode(env.JWT_SECRET_KEY as string));
}