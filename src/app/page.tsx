import { prisma } from '@/lib/prisma'

type BookWithUser = {
  id: number
  title: string
  author: string
  description: string | null
  isbn: string | null
  publishedAt: Date | null
  createdAt: Date
  updatedAt: Date
  userId: number
  user: {
    name: string | null
    email: string
  }
}

export default async function Home() {
  const books = await prisma.book.findMany({
    include: {
      user: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  }) as BookWithUser[]

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Book Collection</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <div key={book.id} className="border rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-2">{book.title}</h2>
            <p className="text-gray-600 mb-2">By {book.author}</p>
            {book.description && (
              <p className="text-gray-700 mb-4">{book.description}</p>
            )}
            {book.isbn && (
              <p className="text-sm text-gray-500">ISBN: {book.isbn}</p>
            )}
            <p className="text-sm text-gray-500 mt-4">
              Added by: {book.user.name || book.user.email}
            </p>
          </div>
        ))}
      </div>
    </main>
  )
}
