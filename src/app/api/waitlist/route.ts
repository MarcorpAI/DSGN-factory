import { NextRequest, NextResponse } from 'next/server';
import { Prisma } from '@prisma/client';
import { prisma } from '@/lib/prisma';

export const runtime = 'nodejs';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const signupTypes = new Set(['learner', 'instructor', 'organization']);

const cleanText = (value: unknown) => (typeof value === 'string' ? value.trim() : '');

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const name = cleanText(body.name);
    const email = cleanText(body.email).toLowerCase();
    const whatsapp = cleanText(body.whatsapp);
    const signupType = cleanText(body.signupType);
    const city = cleanText(body.city);

    if (!email || !emailPattern.test(email)) {
      return NextResponse.json({ error: 'Enter a valid email address' }, { status: 400 });
    }

    if (!name || !whatsapp || !city || !signupTypes.has(signupType)) {
      return NextResponse.json({ error: 'Fill in your name, WhatsApp number, role, and city' }, { status: 400 });
    }

    const existing = await prisma.waitlist.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ position: existing.position, existing: true });
    }

    const position = await prisma.waitlist.count().then((count) => count + 1);
    const signup = await prisma.waitlist.create({
      data: { name, email, whatsapp, signupType, city, position },
      select: { position: true },
    });

    return NextResponse.json({ position: signup.position });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      return NextResponse.json({ error: 'This email is already on the waitlist' }, { status: 409 });
    }

    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2021') {
      console.error('Waitlist table is missing. Run `npm run db:deploy` against the production database.', error);
      return NextResponse.json({ error: 'Waitlist is not ready yet. Please try again soon.' }, { status: 503 });
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

  try {
    const signups = await prisma.waitlist.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        email: true,
        whatsapp: true,
        signupType: true,
        city: true,
        position: true,
        createdAt: true,
      },
    });

    return NextResponse.json({ count: signups.length, signups });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2021') {
      return NextResponse.json({ error: 'Waitlist table is missing. Run the production database migration.' }, { status: 503 });
    }

    console.error('Waitlist admin fetch failed', error);
    return NextResponse.json({ error: 'Failed to load waitlist' }, { status: 500 });
  }
}
