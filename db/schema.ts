import {
  real,
  serial,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/mysql-core";
import { mysqlTable } from "drizzle-orm/mysql-core";

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
