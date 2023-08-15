// middleware/protected route b/c we are lodded in at this stage bu we still go to auth page eg-localhost:3000/auth so we went go to home page 

import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

export async function middleware(req) {
    const res = NextResponse.next()
    const supabase = createMiddlewareClient({ req, res })
    //if we have session that means somebody is logged in
    const { data } = await supabase.auth.getSession()

    //if there is a session so somebody logged in & path is off so they are on the auth page want to redirect away (main page b/c already logged in)
    if (data?.session && req.nextUrl.pathname.startsWith('/auth')) {
        return NextResponse.redirect(new URL('/', req.url))
    }

    //if no session(!) we went to send those user to auth page b/c they did not access checkout, orders....
    // Must be a session to see these routes
    if (
        !data?.session && (
            req.nextUrl.pathname.startsWith('/checkout') ||
            req.nextUrl.pathname.startsWith('/success') ||
            req.nextUrl.pathname.startsWith('/orders') ||
            req.nextUrl.pathname.startsWith('/address')
        )) {
        return NextResponse.redirect(new URL('/auth', req.url))
    }

    return res
}