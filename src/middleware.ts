import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";

export async function middleware(request: NextRequest) {
    const { supabaseResponse, supabase } = await updateSession(request);

    const {
        data: { user },
    } = await supabase.auth.getUser();

    // add public , onbaording and protected routes
    const publicRoutes = ["/login", "/signup", "/forgot-password"];
    const onboardingRoutes = ["/update-password", "/update-name"];
    const protectedRoutes = ["/dashboard"];

    const path = request.nextUrl.pathname;

    const isProtectedRoute = protectedRoutes.some((route) => path.startsWith(route));
    const isPublicRoute = publicRoutes.includes(path);
    const isOnboardingRoute = onboardingRoutes.includes(path);

    const isAuthenticated = user !== null && user !== undefined;
    const haveName = async () => {
        if (!user) return false;
        const { data, error } = await supabase
            .from("profiles")
            .select("full_name")
            .eq("id", user.id);

        if (error) return false;

        const name = data[0].full_name;
        return !!name;
    };

    //  public routes handing
    if (isPublicRoute && isAuthenticated) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    // onboarding routes handling
    if (isOnboardingRoute && !isAuthenticated) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    if (isOnboardingRoute && isAuthenticated && !(await haveName()) && path !== "/update-name") {
        return NextResponse.redirect(new URL("/update-name", request.url));
    }

    if (isOnboardingRoute && isAuthenticated && (await haveName()) && path === "/update-name") {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    // protected routes handling
    if (isProtectedRoute && !isAuthenticated) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    if (isProtectedRoute && isAuthenticated && !(await haveName())) {
        return NextResponse.redirect(new URL("/update-name", request.url));
    }

    return supabaseResponse;
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * Feel free to modify this pattern to include more paths.
         */
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
};
