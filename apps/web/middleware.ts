import { type NextRequest, NextResponse } from 'next/server';
import { apiClient } from './modules/demo/api-client';
import { AsDto, Organization } from './modules/demo/demo.types';

export async function middleware(request: NextRequest) {
	try {
		// const teams = await apiClient<{ organizations: AsDto<Organization>[] }>({
		//     path: '/api/teams',
		//     method: 'GET',
		// })
		// console.log(request.cookies.get("sidebar_state"));
		// if(teams.organizations.length===0){
		//     return NextResponse.redirect(new URL('/team/new', request.url))
		// }
	} catch (error) {
		console.log(error);
	}

	return NextResponse.redirect(new URL('/home', request.url));
}

export const config = {
	matcher: '/about/:path*',
};
