import { type NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
	try {
		console.log(request.cookies)

	} catch (error) {

	}

	return NextResponse.next()
}

export const config = {
	matcher: '/',
}
