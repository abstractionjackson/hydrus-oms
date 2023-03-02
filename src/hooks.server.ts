import '$lib/db';
// src/hooks.server.ts
import type { RequestHandler } from './$types';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { redirect, error } from '@sveltejs/kit';

const protectedRoutes = ['/patient', '/outcome'];

const isProtectedRoute = (pathname: string) => {
	return protectedRoutes.some((route) => pathname.startsWith(route));
};

export const handle: RequestHandler = async ({ event, resolve }) => {
	// protect requests to all routes that start with /protected-routes
	const { session, supabaseClient } = await getSupabase(event);
	const { pathname } = event.url;
	if (isProtectedRoute(pathname)) {
		if (!session) {
			throw redirect(303, '/');
		}
	}
	return resolve(event);
};
