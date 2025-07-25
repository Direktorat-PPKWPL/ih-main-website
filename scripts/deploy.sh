#!/bin/bash
# filepath: c:\Users\Muhamad A. Fadillah\Desktop\infrastruktur-hijau\scripts\deploy.sh

echo "🚀 Starting deployment process..."

echo "📦 Installing dependencies..."
npm ci

echo "🔧 Generating Prisma client..."
npx prisma generate

echo "🗄️ Running database migrations..."
npx prisma migrate deploy

echo "🌱 Checking if database needs seeding..."
if [ "$SEED_DATABASE" = "true" ]; then
  echo "🌱 Seeding database..."
  npm run db:seed
fi

echo "🏗️ Building Next.js application..."
npm run build

echo "✅ Deployment completed successfully!"