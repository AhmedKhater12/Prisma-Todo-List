"use server";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function fetchUsers() {
  try {
    const users = await prisma.user.findMany();
    return users;
  } catch (error) {
    return [];
  }
}
export async function createUser(name: string, email: string) {
  try {
    const newUser = await prisma.user.create({
      data: { name, email },
    });
    return newUser;
  } catch (error) {
    throw new Error("Error creating user");
  }
}
export async function updateUser(id: number, name: string, email: string) {
  try {
    const updatedUser = await prisma.user.update({
      where: { id },
      data: { name, email },
    });
    return updatedUser;
  } catch (error) {
    throw new Error("Error updating user");
  }
}

export async function deleteUser(id: number) {
  try {
    await prisma.user.delete({
      where: { id },
    });
  } catch (error) {
    throw new Error("Error deleting user");
  }
}
