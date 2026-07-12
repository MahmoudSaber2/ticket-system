export function createSingleFlight(operation) {
    let pendingOperation = null;

    return () => {
        if (!pendingOperation) {
            pendingOperation = operation().finally(() => {
                pendingOperation = null;
            });
        }
        return pendingOperation;
    };
}
