import { relations } from "drizzle-orm";
import {
  foreignKey,
  int,
  mysqlEnum,
  real,
  serial,
  text,
  uniqueIndex,
  varchar,
} from "drizzle-orm/mysql-core";
import { mysqlTable } from "drizzle-orm/mysql-core";

export const UsersTable = mysqlTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 50 }).notNull(),
  email: text("email").notNull(),
  avatar: text("avatar"),
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
  },
  (products) => ({
    nameIndex: uniqueIndex("name_idx").on(products.name),
  })
);

export const CartsTable = mysqlTable("carts", {
  id: serial("id").primaryKey(),
  userId: int("user_id"),
  total: real("total").notNull().default(0),
});

export const CartsRelations = relations(CartsTable, ({ one, many }) => ({
  user: one(UsersTable, {
    fields: [CartsTable.userId],
    references: [UsersTable.id],
  }),
  cartItems: many(CartItemsTable),
}));

export const CartItemsTable = mysqlTable("cart_items", {
  id: serial("id").primaryKey(),
  productId: int("product_id"),
  cartId: int("cart_id"),
  quantity: int("quantity").notNull(),
});

export const CartItemsRelations = relations(CartItemsTable, ({ one }) => ({
  product: one(ProductsTable, {
    fields: [CartItemsTable.productId],
    references: [ProductsTable.id],
  }),
  cart: one(CartsTable, {
    fields: [CartItemsTable.cartId],
    references: [CartsTable.id],
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
