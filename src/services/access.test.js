import assert from "node:assert/strict";
import test from "node:test";

import { canAccessRoute, dashboardRoutes } from "./access.js";

const route = (path) => dashboardRoutes.find((candidate) => candidate.path === path);

test("tenant permissions cannot expose internal administration routes", () => {
    const tenantSession = {
        accountType: "tenant",
        permissions: [{ permissionName: "all_roles", access: true }],
    };
    assert.equal(canAccessRoute(route("/dashboard/roles"), tenantSession), false);
});

test("dashboard accepts canonical and legacy compatible permissions", () => {
    assert.equal(canAccessRoute(route("/dashboard"), { accountType: "internal", permissions: [{ name: "view_ticket_dashboard" }] }), true);
    assert.equal(canAccessRoute(route("/dashboard"), { accountType: "tenant", permissions: [{ name: "all_tickets" }] }), true);
});

test("ticket submission is visible only to authenticated tenant sessions", () => {
    assert.equal(canAccessRoute(route("/dashboard/submit"), { accountType: "tenant", permissions: [] }), true);
    assert.equal(canAccessRoute(route("/dashboard/submit"), { accountType: "internal", permissions: [] }), false);
});
