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
    image: 'https://images.unsplash.com/photo-1565151443833-29bf2ba5dd8d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1035&q=80',
  },
  {
    name: "keyboard",
    description: "apple magic keyboard",
    defaultPrice: 120,
    currentPrice: 90,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1165&q=80',
  },
  {
    name: "kindle",
    description: "Amazon reader tablet",
    defaultPrice: 150,
    currentPrice: 100,
    image: 'https://images.unsplash.com/photo-1592685855723-11ec58598a6d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80',
  },
  {
    name: "airpods",
    description: "apple airpods",
    defaultPrice: 100,
    currentPrice: 80,
    image: 'https://images.unsplash.com/photo-1605464315542-bda3e2f4e605?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
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
