import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function checkDatabase() {
  try {
    console.log('🔍 Checking database connection...')
    
    // Test connection
    await prisma.$connect()
    console.log('✅ Database connection successful')
    
    // Check if tables exist
    const userCount = await prisma.user.count()
    console.log(`📊 Users in database: ${userCount}`)
    
    const projectCount = await prisma.project.count()
    console.log(`📊 Projects in database: ${projectCount}`)
    
    console.log('✅ Database health check completed')
  } catch (error) {
    console.error('❌ Database error:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

checkDatabase()