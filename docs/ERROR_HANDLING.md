# SafeHandover Error Handling

## 1. Overview

SafeHandover uses layered error handling to prevent invalid requests, unauthorized operations and unexpected backend failures from silently producing incorrect results.

Errors are handled at the validation, authentication, authorization, API, database and frontend levels.

## 2. Request Validation Errors

Incoming API requests are validated before the main operation is performed.

Zod validation is used to check required fields, data types and accepted values.

Examples include:

* Missing required fields
* Invalid status values
* Invalid identifiers
* Incorrect data types
* Invalid dates or deadlines

Invalid requests are rejected rather than being passed directly to application or database logic.

## 3. Authentication Errors

Protected operations require valid authentication.

Authentication failures include:

* Missing authentication token
* Invalid token
* Expired or unusable authentication credentials
* Invalid login credentials

Unauthenticated users cannot access protected application operations.

## 4. Authorization Errors

Authentication identifies the user, while authorization determines whether the user has permission to perform a particular operation.

Role-based authorization is enforced at the backend API level.

For example, a user without the required role cannot perform an operation simply by manually calling the API.

## 5. Resource Errors

The API checks whether requested resources exist before performing operations.

Examples include:

* Non-existent action
* Non-existent handover
* Non-existent shift
* Invalid resource identifier

When a requested resource cannot be found, the API returns an appropriate error response rather than continuing with invalid data.

## 6. Database Errors

Database operations are performed through Prisma and PostgreSQL.

Database failures can occur because of:

* Database unavailability
* Connection problems
* Constraint violations
* Invalid database operations
* Unexpected database errors

Such failures are handled at the backend boundary so that internal database details are not unnecessarily exposed to normal users.

## 7. API Errors

API failures are handled through appropriate HTTP responses.

The application distinguishes between different categories of failure such as:

* Bad request
* Authentication failure
* Forbidden operation
* Resource not found
* Internal server failure

This allows the frontend to respond appropriately instead of treating every API response as a successful operation.

## 8. Frontend Error Handling

The frontend handles failed API operations and provides user feedback when an operation cannot be completed.

Examples include:

* Login failure
* Invalid form submission
* Failed action update
* Failed acknowledgement
* Failed resolution
* Backend unavailable

The interface should not indicate that an operation succeeded when the backend operation has failed.

## 9. Safety-Critical Error Conditions

SafeHandover specifically considers errors that could affect visibility of unresolved work.

Important conditions include:

* Missing owner
* Missing deadline
* Overdue action
* Blocked action
* Missing acknowledgement
* Duplicate action
* Owner change
* Deadline change
* Critical unresolved action

These conditions are treated as safety-relevant states rather than being silently ignored.

## 10. Error Handling Principle

The main principle is:

**Fail visibly rather than silently.**

When an operation cannot be completed correctly, the system should return an appropriate error or maintain the action in a visible unresolved state instead of incorrectly representing it as completed.

## 11. Security Considerations

Error responses should avoid exposing sensitive implementation details such as passwords, authentication secrets, database credentials or unnecessary internal stack traces.

Authentication, authorization and request validation are performed before sensitive operations are allowed.

## 12. Limitations

SafeHandover is an academic prototype. Error handling improves application robustness but cannot guarantee availability or correctness under every real-world failure condition.

The system does not replace professional judgement or approved clinical systems.
