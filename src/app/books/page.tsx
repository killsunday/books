import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import BookList from './BookList'
import { Book } from '@/types/book'
import { authOptions } from '../api/auth/[...nextauth]/auth'
import AddBookButton from './AddBookButton'

export default async function BooksPage() {
  const session = await getServerSession(authOptions)
  console.log('Books page session:', session)

  if (!session?.user) {
    console.log('No session or user found, redirecting to login')
    redirect('/login?message=You must login to view books')
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  })

  if (!user) {
    console.log('User not found in database, redirecting to login')
    redirect('/login?message=User not found')
  }

  const books = await prisma.book.findMany({
    where: {
      userId: user.id
    },
    include: {
      user: {
        select: {
          name: true,
          email: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  }) as Book[]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">My Books</h1>
        <AddBookButton />
      </div>

      <BookList books={books} />
    </div>
  )
} 