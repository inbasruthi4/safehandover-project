# SafeHandover Testing Documentation

## 1. Testing Overview

SafeHandover uses automated API-level testing to verify important backend functionality and safety-related workflows.

The testing approach focuses on validating both successful operations and failure conditions. This helps ensure that invalid requests, unauthorized operations and incorrect workflow states are handled safely.

## 2. Testing Technologies

* Node.js Test Runner
* Supertest
* Express REST API
* Zod validation
* Prisma ORM
* PostgreSQL

## 3. Running the Tests

From the `server` directory, run:

```bash
npm test
```

The test suite executes the automated backend/API tests configured for the project.

## 4. Authentication Testing

Authentication-related behaviour is tested to verify that protected operations cannot be accessed without valid authentication.

Test scenarios include:

* Valid login request
* Invalid login credentials
* Missing authentication credentials
* Access to protected endpoints without authentication
* Retrieval of the authenticated user

Expected behaviour:

* Valid credentials allow authentication.
* Invalid credentials are rejected.
* Protected resources reject unauthenticated requests.

## 5. Authorization Testing

Role-based access control is tested at the backend API boundary.

Test scenarios include:

* Authorized role performing an operation
* Unauthorized role attempting a protected operation
* Access to resources outside the permitted role

Expected behaviour:

* Authorized operations are allowed.
* Unauthorized operations are rejected.
* Frontend visibility is not treated as the only security mechanism.

## 6. Request Validation Testing

Zod validation is used to validate incoming request data.

Test scenarios include:

* Missing required fields
* Invalid field values
* Invalid identifiers
* Incorrect request structure
* Valid request data

Expected behaviour:

* Invalid requests are rejected before reaching the main application logic.
* Valid requests continue to the appropriate operation.

## 7. Safety Action Testing

Safety-action operations are tested for important workflow states.

Test scenarios include:

* Creating an action
* Updating an action
* Assigning an owner
* Setting a deadline
* Acknowledging an action
* Escalating an action
* Resolving an action
* Recording subsequent events

The tests verify that safety actions maintain their expected state throughout the workflow.

## 8. Safety Rule Testing

The deterministic safety-rule logic is validated against structured action information.

Important conditions include:

* Unresolved action
* Resolved action
* Overdue action
* Missing owner
* Missing deadline
* Blocked action
* Critical unresolved action

The rules operate on structured fields rather than attempting to infer safety state from free-text keywords.

## 9. Shift Change Testing

Shift-change behaviour is tested to ensure that unresolved actions remain available to the incoming shift.

The workflow verifies:

1. An action is created during the outgoing shift.
2. The action remains unresolved.
3. A shift change occurs.
4. The unresolved action remains visible to the incoming shift.
5. The incoming user can acknowledge and continue the required follow-up.

## 10. Error and Edge-Case Testing

The testing process also considers failure conditions including:

* Missing owner
* Missing deadline
* Overdue action
* Blocked action
* Missing acknowledgement
* Invalid request
* Unauthorized operation
* Missing resource
* Backend/API failure

These scenarios are important because the application is designed as a safety-focused prototype and should not assume that every operation succeeds.

## 11. Testing Objective

The purpose of testing is to verify that the core SafeHandover workflow behaves predictably, invalid operations are rejected appropriately, access control is enforced and important safety states remain visible during handover.

Testing supports the reliability of the academic prototype but does not constitute clinical validation.

## 12. Limitations

Testing is performed in the project development environment using synthetic/test data. The test suite does not establish clinical effectiveness or production-level healthcare safety.
