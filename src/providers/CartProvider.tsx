"use client";

import {
  createContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { differenceInCalendarDays, startOfDay } from "date-fns";
import {
  type CartContextValue,
  type CartDateRange,
  type CartItem,
  type CartItemInput,
} from "@/types/cart";

const CART_STORAGE_KEY = "durent-cart";
const cartListeners = new Set<() => void>();
const EMPTY_CART: CartItem[] = [];

let cachedRawSnapshot: string | null = null;
let cachedCartSnapshot: CartItem[] = EMPTY_CART;

export const CartContext = createContext<CartContextValue | null>(null);

function normalizeDateRange(
  dateRange?: Partial<CartDateRange> | null,
): CartDateRange | null {
  if (!dateRange?.from) {
    return null;
  }

  const from = startOfDay(new Date(dateRange.from));
  const to = dateRange?.to ? startOfDay(new Date(dateRange.to)) : from;

  if (Number.isNaN(from.getTime()) || Number.isNaN(to.getTime())) {
    return null;
  }

  if (to < from) {
    return {
      from,
      to: from,
    };
  }

  return {
    from,
    to,
  };
}

function parseStoredCart(value: string | null): CartItem[] {
  if (!value) {
    return [];
  }

  try {
    const parsed = JSON.parse(value);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed
      .filter((item): item is CartItem => {
        return (
          typeof item?.id === "string" &&
          typeof item?.name === "string" &&
          typeof item?.city === "string" &&
          (typeof item?.price === "string" || typeof item?.price === "number")
        );
      })
      .map((item) => ({
        ...item,
        price: String(item.price),
        imageUrl:
          typeof item.imageUrl === "string" && item.imageUrl.length > 0
            ? item.imageUrl
            : "/hero.webp",
        tags: Array.isArray(item.tags)
          ? item.tags.filter((tag) => typeof tag === "string")
          : [],
        dateRange: normalizeDateRange(item.dateRange ?? null),
      }));
  } catch {
    return [];
  }
}

function readCartSnapshot() {
  if (typeof window === "undefined") {
    return EMPTY_CART;
  }

  const rawSnapshot = window.localStorage.getItem(CART_STORAGE_KEY);

  if (rawSnapshot === cachedRawSnapshot) {
    return cachedCartSnapshot;
  }

  cachedRawSnapshot = rawSnapshot;
  cachedCartSnapshot = parseStoredCart(rawSnapshot);

  return cachedCartSnapshot;
}

function getServerCartSnapshot() {
  return EMPTY_CART;
}

function subscribeCart(listener: () => void) {
  cartListeners.add(listener);

  if (typeof window === "undefined") {
    return () => {
      cartListeners.delete(listener);
    };
  }

  const handleStorage = (event: StorageEvent) => {
    if (event.key === CART_STORAGE_KEY) {
      listener();
    }
  };

  window.addEventListener("storage", handleStorage);

  return () => {
    cartListeners.delete(listener);
    window.removeEventListener("storage", handleStorage);
  };
}

function persistCart(items: CartItem[]) {
  if (typeof window === "undefined") {
    return;
  }

  const rawSnapshot = JSON.stringify(items);
  cachedRawSnapshot = rawSnapshot;
  cachedCartSnapshot = items;
  window.localStorage.setItem(CART_STORAGE_KEY, rawSnapshot);

  for (const listener of cartListeners) {
    listener();
  }
}

export function getCartItemDays(item: Pick<CartItem, "dateRange">) {
  if (!item.dateRange?.from || !item.dateRange?.to) {
    return 0;
  }

  return Math.max(
    1,
    differenceInCalendarDays(item.dateRange.to, item.dateRange.from) + 1,
  );
}

export function CartProvider({ children }: { children: ReactNode }) {
  const items = useSyncExternalStore(
    subscribeCart,
    readCartSnapshot,
    getServerCartSnapshot,
  );

  const value = useMemo<CartContextValue>(() => {
    const addItem = (item: CartItemInput) => {
      const currentItems = readCartSnapshot();

      if (currentItems.some((currentItem) => currentItem.id === item.id)) {
        return;
      }

      persistCart([
        ...currentItems,
        {
          id: item.id,
          name: item.name,
          city: item.city,
          price: String(item.price),
          imageUrl:
            item.imageUrl && item.imageUrl.length > 0
              ? item.imageUrl
              : "/hero.webp",
          tags: item.tags ?? [],
          dateRange: null,
        },
      ]);
    };

    const removeItem = (id: string) => {
      persistCart(
        readCartSnapshot().filter((currentItem) => currentItem.id !== id),
      );
    };

    const updateDateRange = (id: string, dateRange: CartDateRange) => {
      persistCart(
        readCartSnapshot().map((currentItem) =>
          currentItem.id === id
            ? {
                ...currentItem,
                dateRange: normalizeDateRange(dateRange),
              }
            : currentItem,
        ),
      );
    };

    const clearCart = () => {
      persistCart([]);
    };

    const isInCart = (id: string) => {
      return items.some((item) => item.id === id);
    };

    const getDays = (item: CartItem) => {
      return getCartItemDays(item);
    };

    return {
      items,
      totalItems: items.length,
      addItem,
      removeItem,
      updateDateRange,
      clearCart,
      isInCart,
      getDays,
    };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
