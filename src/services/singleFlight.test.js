import assert from "node:assert/strict";
import test from "node:test";

import { createSingleFlight } from "./singleFlight.js";

test("concurrent callers share one in-flight refresh and a later call starts another", async () => {
    let calls = 0;
    const operation = createSingleFlight(async () => {
        calls += 1;
        await Promise.resolve();
        return `token-${calls}`;
    });

    assert.deepEqual(await Promise.all([operation(), operation(), operation()]), ["token-1", "token-1", "token-1"]);
    assert.equal(await operation(), "token-2");
    assert.equal(calls, 2);
});
