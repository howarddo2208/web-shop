import { InferModel, relations } from "drizzle-orm";
import {
  int,
  mysqlEnum,
  real,
  serial,
  text,
  uniqueIndex,
  varchar,
} from "drizzle-orm/mysql-core";
import { mysqlTable } from "drizzle-orm/mysql-core";

export const UsersTable = mysqlTable(
  "users",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 50 }).notNull(),
    email: text("email").notNull(),
    avatar: text("avatar"),
    role: mysqlEnum("role", ["ADMIN", "USER"]).notNull().default("USER"),
  },
  (users) => ({
    emailIndex: uniqueIndex("email_idx").on(users.email),
  })
);

export const UsersRelations = relations(UsersTable, ({ one, many }) => ({
  orders: many(OrdersTable),
  cartItems: many(CartItemsTable),
}));

export const ProductsTable = mysqlTable(
  "products",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 50 }).notNull(),
    description: text("description"),
    defaultPrice: real("default_price").notNull(),
    currentPrice: real("current_price").notNull(),
  },
  (products) => ({
    nameIndex: uniqueIndex("name_idx").on(products.name),
  })
);

export const CartItemsTable = mysqlTable("cart_items", {
  id: serial("id").primaryKey(),
  productId: int("product_id"),
  userId: int("user_id"),
  quantity: int("quantity").notNull(),
});

export const CartItemsRelations = relations(CartItemsTable, ({ one }) => ({
  product: one(ProductsTable, {
    fields: [CartItemsTable.productId],
    references: [ProductsTable.id],
  }),
  user: one(UsersTable, {
    fields: [CartItemsTable.userId],
    references: [UsersTable.id],
  }),
}));

export const OrdersTable = mysqlTable("orders", {
  id: serial("id").primaryKey(),
  userId: int("user_id"),
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

export type Product = InferModel<typeof ProductsTable, "select">;
export type NewProduct = InferModel<typeof ProductsTable, "insert">;
