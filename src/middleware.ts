import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { NextRequestWithAuth } from 'next-auth/middleware'

export default async function middleware(request: NextRequestWithAuth) {
  const token = await getToken({ req: request })
  const isAuthPage = request.nextUrl.pathname.startsWith('/login') || 
                    request.nextUrl.pathname.startsWith('/signup')

  if (!token && !isAuthPage) {
    const url = new URL('/login', request.url)
    url.searchParams.set('message', 'You must login for that action')
    return NextResponse.redirect(url)
  }

  if (token && isAuthPage) {
    return NextResponse.redirect(new URL('/books', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
} 