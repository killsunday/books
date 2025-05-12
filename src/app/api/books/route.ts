import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import { authOptions } from '../auth/[...nextauth]/auth'

export async function GET() {
  try {
    const books = await prisma.book.findMany({
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
        assignees: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    })
    return NextResponse.json(books)
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching books' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.email) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  })

  if (!user) {
    return new NextResponse('User not found', { status: 404 })
  }

  try {
    const data = await request.json()
    const { title, description, completedAt, expectedWordCount, assigneeEmails } = data

    if (!title) {
      return new NextResponse('Title is required', { status: 400 })
    }

    // Find all assignee users
    const assignees = await prisma.user.findMany({
      where: {
        email: {
          in: assigneeEmails || [],
        },
      },
    })

    const book = await prisma.book.create({
      data: {
        title,
        description,
        completedAt: completedAt ? new Date(completedAt) : null,
        expectedWordCount,
        userId: user.id,
        assignees: {
          connect: assignees.map(assignee => ({ id: assignee.id })),
        },
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
        assignees: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    })

    return NextResponse.json(book)
  } catch (error) {
    console.error('Error creating book:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
} 