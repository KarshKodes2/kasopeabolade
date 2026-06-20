import { NextResponse } from 'next/server';
import { prisma } from 'db';
import { LeadSchema } from 'utils';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = LeadSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid input', issues: parsed.error.issues }, { status: 400 });
    }

    const { contactName, email, companyName, phone, projectType, budget, message } = parsed.data;

    const lead = await prisma.lead.create({
      data: {
        contactName,
        email,
        companyName: companyName || null,
        phone: phone || null,
        projectType,
        budget: budget || null,
        message: message || null,
        source: 'karsh-core',
        status: 'NEW',
      },
    });

    // Fire-and-forget Resend notification
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
      fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${resendKey}` },
        body: JSON.stringify({
          from: 'leads@karshcore.com',
          to: 'aboladekasope@gmail.com',
          subject: `New lead from Karsh Core: ${contactName}`,
          html: `
            <h2>New project inquiry</h2>
            <table>
              <tr><td><strong>Name:</strong></td><td>${contactName}</td></tr>
              <tr><td><strong>Email:</strong></td><td>${email}</td></tr>
              ${companyName ? `<tr><td><strong>Company:</strong></td><td>${companyName}</td></tr>` : ''}
              ${phone ? `<tr><td><strong>Phone:</strong></td><td>${phone}</td></tr>` : ''}
              <tr><td><strong>Project type:</strong></td><td>${projectType}</td></tr>
              ${budget ? `<tr><td><strong>Budget:</strong></td><td>${budget}</td></tr>` : ''}
              ${message ? `<tr><td><strong>Message:</strong></td><td>${message}</td></tr>` : ''}
            </table>
          `,
        }),
      }).catch(() => {});
    }

    return NextResponse.json({ success: true, id: lead.id }, { status: 201 });
  } catch (err) {
    console.error('[leads/POST]', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
