import { db } from "@/db/drizzle";
import { NewProduct, NewUser, ProductsTable, UsersTable } from "@/db/schema";
import { sql } from "drizzle-orm";

const newUsers: NewUser[] = [
  {
    name: "test 1",
    email: "test1@test.com",
    avatar: "https://i.pravatar.cc/300?u=test1",
  },
  {
    name: "test 2",
    email: "test2@test.com",
    avatar: "https://i.pravatar.cc/300?u=test2",
  },
  {
    name: "test 3",
    email: "test3@test.com",
    avatar: "https://i.pravatar.cc/300?u=test3",
  },
  {
    name: "test 4",
    email: "test4@test.com",
    avatar: "https://i.pravatar.cc/300?u=test4",
  },
];

const seedUsers = async () => {
  const countUser = await db
    .select({ count: sql<number>`count(*)` })
    .from(UsersTable);
  if (countUser[0].count == 0) {
    await db.insert(UsersTable).values(newUsers)
  }
};

const sampleProducts: NewProduct[] = [
  {
    name: "fan",
    description: "a fan",
    defaultPrice: 100,
    currentPrice: 80,
  },
  {
    name: "keyboard",
    description: "apple magic keyboard",
    defaultPrice: 120,
    currentPrice: 90,
  },
  {
    name: "kindle",
    description: "Amazon reader tablet",
    defaultPrice: 150,
    currentPrice: 100,
  },
  {
    name: "airpods",
    description: "apple airpods",
    defaultPrice: 100,
    currentPrice: 80,
  },
];

const seedProducts = async () => {
  const countProduct = await db
    .select({ count: sql<number>`count(*)` })
    .from(ProductsTable);
  if (countProduct[0].count == 0) {
    await db.insert(ProductsTable).values(sampleProducts);
  }
};

export async function seed() {
  seedUsers();
  seedProducts();
}
