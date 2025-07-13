# User Context System

This directory contains the user context system that provides user data throughout the application.

## Components

### UserContext.tsx

- Provides the context and hook for accessing user data
- Exports `UserProvider` and `useUser` hook
- Uses plain `User` type for serialization compatibility

### UserProviderWrapper.tsx

- Client component wrapper that receives user data from server components
- Bridges the gap between server-side data fetching and client-side context

## Usage

### In Server Components (Layout)

The layout automatically fetches user data when a userId is available:

```tsx
// src/app/(routes)/layout.tsx
const Layout = async ({ children }: { children: React.ReactNode }) => {
  const { userId } = await auth()
  const user = userId ? await getUserById(userId) : null

  return <UserProviderWrapper user={user}>{children}</UserProviderWrapper>
}
```

### In Client Components

Use the `useUser` hook to access user data:

```tsx
'use client'

import { useUser } from '@/contexts/UserContext'

const MyComponent = () => {
  const { user, isLoading } = useUser()

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!user) {
    return <div>Not signed in</div>
  }

  return (
    <div>
      <h1>Welcome, {user.firstName}!</h1>
      <p>Email: {user.email}</p>
      <p>Status: {user.isActive ? 'Active' : 'Inactive'}</p>
    </div>
  )
}
```

## Hook Return Values

The `useUser` hook returns an object with:

- `user`: The user object (User | null)
- `isLoading`: Boolean indicating if user data is being loaded

## User Object Structure

The user object contains:

- `_id`: User ID (string)
- `email`: User's email address
- `firstName`: User's first name
- `lastName`: User's last name
- `avatarUrl`: Optional avatar URL
- `isActive`: Whether the user account is active

## Serialization Fix

The user data is converted to a plain JavaScript object in the `getUserById` server action to ensure compatibility with Next.js server-to-client component serialization. MongoDB documents contain methods and complex objects that cannot be passed directly to client components.

## Error Handling

The `useUser` hook will throw an error if used outside of a `UserProvider`. Make sure your component is wrapped within the layout that provides the user context.
