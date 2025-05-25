import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { prisma } from './prisma'
import bcrypt from 'bcryptjs'

/**
 * NextAuth configuration options for handling user authentication.
 * Implements a credentials-based authentication strategy using email and password.
 * 
 * @type {NextAuthOptions}
 * 
 * @property {Array} providers - Authentication providers configuration
 * @property {Object} session - Session configuration using JWT strategy
 * @property {Object} pages - Custom pages configuration for authentication flows
 * 
 * @example
 * // Usage in [...nextauth].ts
 * import { authOptions } from './lib/auth'
 * export default NextAuth(authOptions)
 */
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      /**
       * Authorizes a user based on their credentials
       * @param {Object} credentials - User login credentials
       * @param {string} credentials.email - User's email address
       * @param {string} credentials.password - User's password
       * @returns {Promise<Object|null>} User object if authorized, null if not
       */
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        })

        if (!user) {
          return null
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        )

        if (!isPasswordValid) {
          return null
        }

        return {
          id: user.id.toString(),
          email: user.email,
          name: user.name
        }
      }
    })
  ],
  session: {
    strategy: 'jwt'
  },
  pages: {
    signIn: '/login'
  }
}

/**
 * Checks if a user has permission to access a specific book.
 * A user has permission if they are either the owner of the book or an assignee.
 * 
 * @param {number} userId - The ID of the user to check permissions for
 * @param {number} bookId - The ID of the book to check permissions against
 * @returns {Promise<boolean>} Returns true if the user has permission, false otherwise
 */
export async function hasBookPermission(userId: number, bookId: number): Promise<boolean> {
  const book = await prisma.book.findUnique({
    where: { id: bookId },
    include: {
      assignees: {
        select: { id: true }
      }
    }
  })

  if (!book) {
    return false
  }

  // Check if user is the owner or an assignee
  return book.userId === userId || book.assignees.some(assignee => assignee.id === userId)
} 