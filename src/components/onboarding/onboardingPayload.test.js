import assert from "node:assert/strict";
import test from "node:test";

import { onboardingPayload } from "./onboardingPayload.js";

test("branchless submission removes hidden branches and account branch references", () => {
    const payload = onboardingPayload({
        company: { name: "Acme", usesBranches: false },
        branches: [{ key: "hidden", name: "Hidden" }],
        owner: { name: "Owner", branchKey: "hidden" },
        accounts: [{ name: "Employee", branchKey: "hidden" }],
    });

    assert.deepEqual(payload.branches, []);
    assert.equal(payload.owner.branchKey, undefined);
    assert.equal(payload.accounts[0].branchKey, undefined);
});
