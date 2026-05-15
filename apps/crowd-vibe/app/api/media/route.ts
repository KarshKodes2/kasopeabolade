import { auth } from '@/shared/lib/auth';
import { prisma } from 'db';
import { MediaType } from '@prisma/client';
import { v2 as cloudinary, UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET() {
  const session = await auth();
  if (!session?.user?.tenantId) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  const assets = await prisma.mediaAsset.findMany({
    where: { tenantId: session.user.tenantId },
    orderBy: { publishedAt: 'desc' },
  });

  return Response.json({ assets });
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.tenantId) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  const form = await req.formData();
  const file = form.get('file') as File | null;
  const title = form.get('title') as string;
  const rawType = (form.get('type') as string) ?? 'MIX';
  const type = rawType as MediaType;

  if (!file) return Response.json({ error: 'No file' }, { status: 400 });

  const buffer = Buffer.from(await file.arrayBuffer());
  const uploadResult = await new Promise<UploadApiResponse>((resolve, reject) => {
    const resourceType = file.type.startsWith('image') ? 'image' : 'video';
    cloudinary.uploader.upload_stream(
      { resource_type: resourceType, folder: `crowdvibe/${session.user!.tenantId}` },
      (err: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
        if (err || !result) reject(err);
        else resolve(result);
      }
    ).end(buffer);
  });

  const asset = await prisma.mediaAsset.create({
    data: {
      tenantId: session.user.tenantId,
      title,
      type,
      url: uploadResult.secure_url,
      duration: 'duration' in uploadResult && uploadResult.duration ? Math.round(uploadResult.duration as number) : null,
      publishedAt: new Date(),
    },
  });

  return Response.json({ asset }, { status: 201 });
}
