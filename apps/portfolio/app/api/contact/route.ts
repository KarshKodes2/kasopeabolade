import { NextRequest, NextResponse } from 'next/server'
import { prisma } from 'db'

export async function POST(req: NextRequest) {
  try {
    const { name, email, type, message } = await req.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email, and message are required.' }, { status: 400 })
    }

    if (!email.includes('@')) {
      return NextResponse.json({ error: 'Valid email required.' }, { status: 400 })
    }

    await prisma.lead.create({
      data: {
        contactName: name,
        email,
        projectType: type || 'other',
        message,
        source: 'portfolio',
      },
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[contact] error:', err)
    return NextResponse.json({ error: 'Server error.' }, { status: 500 })
  }
}
