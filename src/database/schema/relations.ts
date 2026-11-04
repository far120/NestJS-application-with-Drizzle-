import { relations } from "drizzle-orm";
import { products } from "./product.schema.js";
import { users } from "./users.schema.js";

export const userrelations = relations(users, ({ many }) => ({
    products: many(products),
}));

export const productrelations = relations(products, ({ one }) => ({
    seller: one(users, {
        fields: [products.sellerId],
        references: [users.id],
    }),
}));
    
