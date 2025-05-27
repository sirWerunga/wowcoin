import { pgTable, text, serial, numeric, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const transactions = pgTable("transactions", {
  id: serial("id").primaryKey(),
  walletAddress: text("wallet_address").notNull(),
  amountEth: numeric("amount_eth").notNull(),
  amountWow: numeric("amount_wow").notNull(),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
  currency: text("currency").default("ETH").notNull(),
});

export const insertTransactionSchema = createInsertSchema(transactions).pick({
  walletAddress: true,
  amountEth: true,
  amountWow: true,
  currency: true,
});

// Form validation schema
export const transactionFormSchema = z.object({
  walletAddress: z.string().min(1, "Wallet address is required"),
  amountCrypto: z.string().min(1, "Amount is required"),
  currency: z.string().optional(),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertTransaction = z.infer<typeof insertTransactionSchema>;
export type Transaction = typeof transactions.$inferSelect;
