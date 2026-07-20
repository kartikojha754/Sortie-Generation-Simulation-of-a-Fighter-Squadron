# Phase 2 — Dynamic Pending Mission Queue

The simulation now uses two separate queues:

1. **Event Queue** — ordered by simulation time and used to execute the next event.
2. **Pending Mission Queue** — ordered by mission priority and arrival time and used to select the next mission for dispatch.

## Dispatch behaviour

- A mission is inserted into the pending queue when its arrival event executes.
- The scheduler checks the queue after mission arrival, landing, maintenance completion, and pilot-rest completion.
- Missions that cannot currently obtain resources remain in the same queue.
- A waiting mission is re-evaluated from the current squadron state; AIR_TO_GROUND missions also regenerate a feasible strike plan from current weapon inventory.
- Critical missions are considered before high, medium, and low priority missions. Equal-priority missions use arrival time and queue-entry time.
- A mission is removed only after successful allocation or permanent failure.

## New output fields

Mission output now includes:

- `queueEnteredTime`
- `retryCount`
- `waitingReason`
- `lastRetryTime`
- `dispatchedTime`
- `totalWaitingTime`

Statistics now include:

- `averageWaitingTime`
- `longestWaitingTime`
- `totalRetries`
- `successfulRetries`
- `waitingReasons`

The event queue remains unchanged and continues to drive the discrete-event simulation.
