'use client'

import { Book } from '@/types/book'
import Link from 'next/link'

interface BookListProps {
  books: Book[]
}

export default function BookList({ books }: BookListProps) {
  if (books.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No books found
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">
              Title
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">
              Expected Word Count
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">
              Target Completion Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">
              Assigned To
            </th>
            <th scope="col" className="relative px-6 py-3">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {books.map((book) => (
            <tr key={book.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <Link href={`/books/${book.id}`} className="text-indigo-600 hover:text-indigo-900">
                  <div className="text-sm font-medium">{book.title}</div>
                </Link>
                {book.description && (
                  <div className="text-sm text-gray-500 truncate max-w-xs">
                    {book.description}
                  </div>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {book.expectedWordCount?.toLocaleString() ?? 'Not set'}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {book.completedAt ? new Date(book.completedAt).toLocaleDateString() : '-'}
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm text-gray-900">
                  {book.assignees.length > 0 ? (
                    <ul className="space-y-1">
                      {book.assignees.map((assignee) => (
                        <li key={assignee.id} className="flex items-center space-x-2">
                          <span>{assignee.name || assignee.email}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <span className="text-gray-500">No assignees</span>
                  )}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  onClick={() => {/* TODO: Edit book */}}
                  className="text-indigo-600 hover:text-indigo-900 mr-4"
                >
                  Edit
                </button>
                <button
                  onClick={() => {/* TODO: Delete book */}}
                  className="text-red-600 hover:text-red-900"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
} 