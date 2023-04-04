-- CreateTable
CREATE TABLE "testeUser" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "name" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "testeUser_email_key" ON "testeUser"("email");
