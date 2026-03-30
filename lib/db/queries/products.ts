import { db } from "@/lib/db";
import { product } from "@/lib/db/schema";
import { eq, desc, asc, and, gte, lte, gt } from "drizzle-orm";

// ============================================
// ADVANCED QUERIES (With filters, pagination)
// ============================================

export interface GetProductsParams {
  category?: string;
  featured?: boolean;
  active?: boolean;
  minPrice?: number;
  maxPrice?: number;
  limit?: number;
  offset?: number;
}

export async function getProducts(params: GetProductsParams = {}) {
  const {
    category,
    featured,
    active = true,
    minPrice,
    maxPrice,
    limit = 10,
    offset = 0,
  } = params;

  const conditions = [];

  if (category) {
    conditions.push(eq(product.category, category));
  }

  if (featured !== undefined) {
    conditions.push(eq(product.featured, featured));
  }

  if (active !== undefined) {
    conditions.push(eq(product.active, active));
  }

  if (minPrice !== undefined) {
    conditions.push(gte(product.price, minPrice.toString()));
  }

  if (maxPrice !== undefined) {
    conditions.push(lte(product.price, maxPrice.toString()));
  }

  const products = await db
    .select()
    .from(product)
    .where(conditions.length > 0 ? and(...conditions) : undefined)
    .orderBy(desc(product.createdAt))
    .limit(limit)
    .offset(offset);

  return products;
}

export async function getProductById(id: string) {
  const [productData] = await db
    .select()
    .from(product)
    .where(eq(product.id, id))
    .limit(1);

  return productData;
}

export async function getFeaturedProducts(limit = 4) {
  const products = await db
    .select()
    .from(product)
    .where(and(eq(product.featured, true), eq(product.active, true)))
    .orderBy(desc(product.createdAt))
    .limit(limit);

  return products;
}

export async function getProductsByCategory(category: string, limit = 10) {
  const products = await db
    .select()
    .from(product)
    .where(and(eq(product.category, category), eq(product.active, true)))
    .orderBy(asc(product.name))
    .limit(limit);

  return products;
}

export async function searchProducts(query: string, limit = 10) {
  // Note: For production, use full-text search
  const products = await db
    .select()
    .from(product)
    .where(eq(product.active, true))
    .limit(limit);

  // Client-side search (replace with DB full-text search in production)
  const searchLower = query.toLowerCase();
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchLower) ||
      p.description?.toLowerCase().includes(searchLower),
  );
}

export async function getRelatedProducts(
  productId: string,
  category: string | null,
  limit = 4,
) {
  const products = await db
    .select()
    .from(product)
    .where(
      and(
        eq(product.active, true),
        category ? eq(product.category, category) : undefined,
        // Exclude current product
        // Note: You'll need to filter this in the calling code
      ),
    )
    .orderBy(desc(product.createdAt))
    .limit(limit + 1); // Get one extra in case we need to filter out current product

  return products;
}

export async function getProductStock(id: string) {
  const [productData] = await db
    .select({ stock: product.stock })
    .from(product)
    .where(eq(product.id, id))
    .limit(1);

  return productData?.stock || 0;
}

export async function updateProductStock(id: string, quantity: number) {
  const [updated] = await db
    .update(product)
    .set({
      stock: quantity,
      updatedAt: new Date(),
    })
    .where(eq(product.id, id))
    .returning();

  return updated;
}

export async function decreaseProductStock(id: string, quantity: number) {
  const currentStock = await getProductStock(id);
  const newStock = Math.max(0, currentStock - quantity);

  return updateProductStock(id, newStock);
}
