import { betterAuth } from 'better-auth'
import { mongodbAdapter } from 'better-auth/adapters/mongodb'
import { MongoClient } from 'mongodb'

const client = new MongoClient(process.env.DATABASE_URL!)
const db = client.db()

export const auth = betterAuth({
  appName: 'Better Auth App',
  database: mongodbAdapter(db, {
    client,
  }),

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          if (!user?.email?.endsWith('@softcolon.com')) {
            return { data: { ...user, emailVerified: false } }
          }

          console.log({ user })
          return { data: { ...user, customField: 'value' } }
        },
      },
    },

    session: {
      create: {
        before: async (session) => {
          console.log({ auth: session })
          console.log('Creating session for user:', session.userId)
          return { data: session }
        },
      },
    },
  },
})

export type Session = typeof auth.$Infer.Session
export type User = typeof auth.$Infer.Session.user
