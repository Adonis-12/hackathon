# Multi-Tenant Backend System
## Overview

This project implements a backend-focused multi-tenant SaaS architecture designed to model production-style API structure.

The system emphasizes tenant isolation, structured authorization, and predictable request flow. It demonstrates how identity, permissions, and resource ownership can be enforced through middleware and service layers while keeping controllers lightweight.

The application is intentionally backend-only. API endpoints can be tested using Postman or similar tools.

## Core Features
- Session-Based Authentication

Authentication is implemented using manually generated session tokens stored redis. Sessions identify users through secure cookies and do not rely on JWT.

- Multi-Tenancy

Tenants act as strict data boundaries. All meaningful resources are scoped by tenant_id, and access is validated through membership checks.

- Role-Based Access Control

Each membership defines a role within a tenant:

 - * Owner

 - * Admin

 - * Member

Permissions are mapped in application logic and enforced through middleware rather than controllers.

- Invite Lifecycle

Tenant owners can invite existing users through token-based invites. Invite acceptance creates a membership only after server-side validation.

- Projects and Tasks

Projects belong to tenants, and tasks belong to projects. Task status is managed through a controlled lifecycle and assignment rules ensure tenant boundaries are respected.

## Architecture

The application follows a layered backend architecture.

## Request Flow

Every tenant-scoped request follows a consistent pipeline:
```
Authentication Middleware
→ Tenant Resolver
→ Membership Validation
→ Permission Guard
→ Controller
→ Service Layer
→ Database
```

This structure keeps authorization logic centralized and prevents business rules from leaking into controllers.

## Middleware Layer

Middleware enforces system invariants:

 - Authentication Middleware resolves the user from the session cookie.

 - Tenant Resolver validates the tenant context from route parameters.

 - Membership Guard ensures the user belongs to the tenant.

 - Permission Guard checks whether the requested action is allowed.

## Controller Layer

Controllers handle HTTP-specific behavior only:

 - Parsing requests

 - Returning responses

 - Delegating business logic to services

 - Controllers do not contain authorization rules or database logic.

## Service Layer

Services implement domain logic such as:

 - Managing invites and memberships

 - Creating and updating projects

 - Handling task lifecycle transitions

This separation ensures the system remains maintainable as complexity grows.

## Database Structure (Simplified)

Primary tables include:

 - users
 - tenants
 - memberships
 - tenant_invites
 - projects
 - tasks


## Key design decisions:

 - Memberships enforce a composite uniqueness constraint on (user_id, tenant_id).

 - Invites reference existing users through foreign keys.

 - Tenant ownership propagates through relational links rather than duplicated fields.

## Technology Stack

 - Node.js

 - Express

 - PostgreSQL

 - Manual session management using crypto

 - RESTful API design

## Environment Variables

Create a .env file in the root directory and define the following variables:
```
DATABASE_URL=
REDIS_URL=
SESSION_SECRET=
EMAIL_USER=
EMAIL_PASS=
BASE_URL=
PORT=
```
## Variable Descriptions

- DATABASE_URL
PostgreSQL connection string.

- REDIS_URL
Redis connection string.

- SESSION_SECRET
Used only if cookie signing is enabled. Not required for manual DB session validation but kept for configuration flexibility.

- EMAIL_USER
Email address used to send invite emails.

- EMAIL_PASS
Password or app-specific credential for the email provider.

- BASE_URL
Public base URL used when generating invite links.

- PORT
Port on which the server runs locally.

## Running the Project

- Clone the repository
- Install dependencies:
```
npm install
```

- Configure environment variables.

- Start the development server:
```
npm run dev
```

The API can be tested using Postman or curl.
