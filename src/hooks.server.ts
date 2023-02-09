import '$lib/db';
// src/hooks.server.ts
import type { Handle } from './$types';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { redirect, error } from '@sveltejs/kit';

const protectedRoutes = ['/profile'];

const isProtectedRoute = (pathname: string) => {
	return protectedRoutes.some((route) => pathname.startsWith(route));
};

export const handle: Handle = async ({ event, resolve }) => {
	// protect requests to all routes that start with /protected-routes
	const { pathname } = event.url;
	if (isProtectedRoute(pathname)) {
		const { session, supabaseClient } = await getSupabase(event);

		if (!session) {
			throw redirect(303, '/');
		}
	}
	return resolve(event);
};
