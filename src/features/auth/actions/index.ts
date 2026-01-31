"use server";

import { db } from "@/lib/db";
import { auth } from "@/auth";

// 1. User by Email (SABSE ZAROORI - Login ke liye)
export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: { email },
    });
    return user;
  } catch (error) {
    console.error("Error fetching user by email:", error);
    return null;
  }
};

// 2. User by ID (Profile fetch karne ke liye)
export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({
      where: { id },
    });
    return user;
  } catch (error) {
    console.error("Error fetching user by id:", error);
    return null;
  }
};

// 3. Account by User ID (Providers check karne ke liye)
export const getAccountByUserId = async (userId: string) => {
  try {
    const account = await db.account.findFirst({
      where: { userId }, // Dhyan dena: Schema mein humne userId map kiya tha
    });
    return account;
  } catch (error) {
    console.error("Error fetching account:", error);
    return null;
  }
};

// 4. Current Logged In User (Server Components mein use karne ke liye)
export const currentUser = async () => {
  const session = await auth();
  return session?.user;
};

// 5. Current Role (Direct Role chahiye ho toh)
export const currentRole = async () => {
  const session = await auth();
  return session?.user?.role;
};