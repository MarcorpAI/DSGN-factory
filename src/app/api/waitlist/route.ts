import { NextRequest, NextResponse } from 'next/server';
import { Prisma } from '@prisma/client';
import { prisma } from '@/lib/prisma';

export const runtime = 'nodejs';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';

    if (!email || !emailPattern.test(email)) {
      return NextResponse.json({ error: 'Enter a valid email address' }, { status: 400 });
    }

    const existing = await prisma.waitlist.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ position: existing.position, existing: true });
    }

    const position = await prisma.waitlist.count().then((count) => count + 1);
    const signup = await prisma.waitlist.create({
      data: { email, position },
      select: { position: true },
    });

    return NextResponse.json({ position: signup.position });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      return NextResponse.json({ error: 'This email is already on the waitlist' }, { status: 409 });
    }

    console.error('Waitlist signup failed', error);
    return NextResponse.json({ error: 'Failed to join waitlist' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const configuredToken = process.env.ADMIN_TOKEN;
  const authHeader = request.headers.get('authorization');
  const token = authHeader?.replace(/^Bearer\s+/i, '');

  if (!configuredToken || token !== configuredToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const signups = await prisma.waitlist.findMany({
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      email: true,
      position: true,
      createdAt: true,
    },
  });

  return NextResponse.json({ count: signups.length, signups });
}
