-- CreateEnum
CREATE TYPE "SiteType" AS ENUM ('PERSONAL', 'PORTFOLIO', 'CORPORATE', 'REDIRECT');

-- CreateEnum
CREATE TYPE "PostContext" AS ENUM ('PORTFOLIO', 'KARSH_CORE', 'TENANT');

-- AlterTable: Tenant — add siteType and redirectUrl
ALTER TABLE "Tenant" ADD COLUMN "siteType" "SiteType" NOT NULL DEFAULT 'PERSONAL';
ALTER TABLE "Tenant" ADD COLUMN "redirectUrl" TEXT;

-- AlterTable: Project — add missing portfolio fields
ALTER TABLE "Project" ADD COLUMN "subtitle" TEXT;
ALTER TABLE "Project" ADD COLUMN "url" TEXT;
ALTER TABLE "Project" ADD COLUMN "emoji" TEXT;
ALTER TABLE "Project" ADD COLUMN "color" TEXT;

-- CreateTable: Post
CREATE TABLE "Post" (
    "id" TEXT NOT NULL,
    "context" "PostContext" NOT NULL DEFAULT 'TENANT',
    "tenantId" TEXT,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "excerpt" TEXT,
    "content" TEXT NOT NULL,
    "coverImage" TEXT,
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "readingTime" INTEGER,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Post_slug_context_tenantId_key" ON "Post"("slug", "context", "tenantId");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE SET NULL ON UPDATE CASCADE;
