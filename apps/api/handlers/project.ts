import { prisma } from '@karsh/db';
import { ProjectSchema } from '@karsh/utils/validation';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = ProjectSchema.parse(body);
    const project = await prisma.project.create({ data: parsed });
    return NextResponse.json(project);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function GET() {
  const projects = await prisma.project.findMany();
  return NextResponse.json(projects);
}
