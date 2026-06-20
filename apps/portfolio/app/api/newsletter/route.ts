import { NextRequest, NextResponse } from 'next/server'
import { prisma } from 'db'

export async function POST(req: NextRequest) {
  try {
    const { email, name } = await req.json()

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email required.' }, { status: 400 })
    }

    const existing = await prisma.newsletterSubscriber.findFirst({
      where: { email, tenantId: null },
    })

    if (!existing) {
      await prisma.newsletterSubscriber.create({
        data: { email, name: name || null, tenantId: null },
      })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[newsletter] error:', err)
    return NextResponse.json({ error: 'Server error.' }, { status: 500 })
  }
}
