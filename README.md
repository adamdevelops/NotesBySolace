This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

To run this application, we will need to do a few things.

First, lets install Node to install the required packages to run the application.

https://nodejs.org/en/download

Then, we need to clone this repo or download the ZIP file and extract it.

Once the project is downloaded/cloned, in the main directory of the project. We will need to run the development server:

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

With the app running, some prepoulated notes with be there. You have the ability to search, create note via the button, edit or delete a note via buttons on each individual note. Any changes that are submitted with each of the actions will be saved to SQLite DB located in the project (notes.db)

## Struggles in the Project's bulid process

Through doing this project, definitely came with some hurdles. One I would take back is me being sick for week at the beginning of timeline receiving this (which would affect my decisions for certain solutions for the sake of time). 


//////////////////////

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
