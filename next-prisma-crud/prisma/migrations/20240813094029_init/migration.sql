/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Post` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Post_id_key" ON "Post"("id");
