export const dashboardRoutes = [
    { path: "/dashboard", label: "Pannello", permission: "view_ticket_dashboard", legacyPermission: "all_tickets" },
    { path: "/dashboard/tickets", label: "Tickets", permission: "all_tickets" },
    { path: "/dashboard/users", label: "Aggiungi utente", permission: "all_customers" },
    { path: "/dashboard/admins", label: "Team", permission: "all_users" },
    { path: "/dashboard/roles", label: "Ruoli", permission: "all_roles", internalOnly: true },
    { path: "/dashboard/companies", label: "Companies", permission: "all_companies" },
    { path: "/dashboard/onboarding", label: "Onboarding", permission: "onboard_company", internalOnly: true },
    { path: "/dashboard/submit", label: "Nuovo ticket", tenantOnly: true },
];

export function permissionNames(permissions) {
    return new Set(
        permissions
            .filter((permission) => permission?.access !== false)
            .map((permission) => permission.permissionName || permission.name),
    );
}

export function canAccessRoute(route, session) {
    if (route.internalOnly && session.accountType !== "internal") return false;
    if (route.tenantOnly && session.accountType !== "tenant") return false;
    if (!route.permission) return true;

    const granted = permissionNames(session.permissions || []);
    return granted.has(route.permission) || granted.has(route.legacyPermission);
}

export function routeForPath(pathname) {
    return dashboardRoutes.find((route) => route.path === pathname);
}
