import { createClerkClient } from '@clerk/express';
import dotenv from 'dotenv';
dotenv.config();

const clerkClient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });

async function test() {
  try {
    const user = await clerkClient.users.createUser({
      username: 'testuser123',
      password: 'testPassword123!',
      skipPasswordRequirement: true
    });
    console.log("Success:", user.id);
  } catch (err: any) {
    console.error("Error:", JSON.stringify(err.errors, null, 2) || err);
  }
}

test();
