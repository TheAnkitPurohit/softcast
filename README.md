# Softcast

A Next.js application for screen recording and video upload to AWS S3.

## Features

- Screen recording functionality
- Direct upload to AWS S3
- Video playback and management
- Modern UI with Tailwind CSS

## Getting Started

### Prerequisites

- Node.js 18+
- AWS S3 bucket with proper permissions
- AWS credentials with S3 access

### Environment Setup

Create a `.env.local` file in the root directory with the following variables:

```bash
# AWS Configuration
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_access_key_id_here
AWS_SECRET_ACCESS_KEY=your_secret_access_key_here
AWS_S3_BUCKET_NAME=your_s3_bucket_name_here

# Next.js Configuration
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here
CLERK_SECRET_KEY=your_clerk_secret_key_here
```

### AWS S3 Setup

1. Create an S3 bucket in your AWS account
2. Configure CORS for your bucket (if needed for direct browser uploads)
3. Create an IAM user with S3 permissions
4. Add the credentials to your environment variables

### Installation

Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
