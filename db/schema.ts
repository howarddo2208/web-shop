import { InferModel, relations } from "drizzle-orm";
import {
  int,
  json,
  mysqlEnum,
  real,
  serial,
  text,
  uniqueIndex,
  varchar,
} from "drizzle-orm/mysql-core";
import { mysqlTable } from "drizzle-orm/mysql-core";

const PRODUCT_PLACEHOLDER_IMG =
  "https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?format=webp&v=1530129081";
const USER_AVATAR_PLACEHOLDER_IMG =
  "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541";

export const UsersTable = mysqlTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 50 }).notNull(),
  email: text("email").notNull(),
  avatar: text("avatar").default(USER_AVATAR_PLACEHOLDER_IMG),
  role: mysqlEnum("role", ["ADMIN", "USER"]).notNull().default("USER"),
});

export const UsersRelations = relations(UsersTable, ({ one, many }) => ({
  orders: many(OrdersTable),
  cart: one(CartsTable, {
    fields: [UsersTable.id],
    references: [CartsTable.userId],
  }),
}));

export const ProductsTable = mysqlTable(
  "products",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 50 }).notNull(),
    description: text("description"),
    defaultPrice: real("default_price").notNull(),
    currentPrice: real("current_price").notNull(),
    image: text("image").notNull().default(PRODUCT_PLACEHOLDER_IMG),
    stock: int("stock").notNull().default(0),
  },
  (products) => ({
    nameIndex: uniqueIndex("name_idx").on(products.name),
  })
);

export const CartsTable = mysqlTable("carts", {
  id: serial("id").primaryKey(),
  userId: int("user_id"),
  items: json("items").notNull().default([]),
});

export const CartsRelations = relations(CartsTable, ({ one }) => ({
  user: one(UsersTable, {
    fields: [CartsTable.userId],
    references: [UsersTable.id],
  }),
}));

export const OrdersTable = mysqlTable("orders", {
  id: serial("id").primaryKey(),
  userId: int("user_id"),
  name: varchar("name", { length: 50 }).notNull(),
  email: text("email").notNull(),
  address: text("address").notNull(),
  // paymentId: text("payment_id").notNull(),
  total: real("total").notNull().default(0),
});

export const OrdersRelations = relations(OrdersTable, ({ one, many }) => ({
  user: one(UsersTable, {
    fields: [OrdersTable.userId],
    references: [UsersTable.id],
  }),
  orderItems: many(OrderItemsTable),
}));

export const OrderItemsTable = mysqlTable("order_items", {
  id: serial("id").primaryKey(),
  productId: int("product_id"),
  orderId: int("order_id"),
  quantity: int("quantity").notNull(),
});

export const OrderItemsRelations = relations(OrderItemsTable, ({ one }) => ({
  product: one(ProductsTable, {
    fields: [OrderItemsTable.productId],
    references: [ProductsTable.id],
  }),
  order: one(OrdersTable, {
    fields: [OrderItemsTable.orderId],
    references: [OrdersTable.id],
  }),
}));

// DB types
export type User = InferModel<typeof UsersTable, "select">;
export type NewUser = InferModel<typeof UsersTable, "insert">;
export type Cart = InferModel<typeof CartsTable, "select">;
export type NewCart = InferModel<typeof CartsTable, "insert">;
export type Product = InferModel<typeof ProductsTable, "select">;
export type NewProduct = InferModel<typeof ProductsTable, "insert">;
