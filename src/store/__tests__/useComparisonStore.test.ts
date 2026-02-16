import { expect, test, describe, beforeEach } from "bun:test";
import { useComparisonStore } from "../useComparisonStore";
import { Property } from "@/types";

const mockProperty = (id: string): Property => ({
  id,
  title: `Property ${id}`,
  description: "Description",
  price: 100000,
  bedrooms: 2,
  bathrooms: 1,
  area: 80,
  address: "Address",
  city: "City",
  lat: 0,
  lng: 0,
  images: [],
  is_verified: true,
  seller_type: 'private',
  created_at: new Date().toISOString(),
  features: []
});

describe("useComparisonStore", () => {
  beforeEach(() => {
    useComparisonStore.getState().clearItems();
  });

  test("should start with an empty list", () => {
    const state = useComparisonStore.getState();
    expect(state.items).toEqual([]);
  });

  test("should add an item successfully", () => {
    const property = mockProperty("1");
    useComparisonStore.getState().addItem(property);

    const state = useComparisonStore.getState();
    expect(state.items).toHaveLength(1);
    expect(state.items[0].id).toBe("1");
  });

  test("should not add duplicate items", () => {
    const property = mockProperty("1");
    useComparisonStore.getState().addItem(property);
    useComparisonStore.getState().addItem(property);

    const state = useComparisonStore.getState();
    expect(state.items).toHaveLength(1);
  });

  test("should limit items to 3", () => {
    useComparisonStore.getState().addItem(mockProperty("1"));
    useComparisonStore.getState().addItem(mockProperty("2"));
    useComparisonStore.getState().addItem(mockProperty("3"));

    expect(useComparisonStore.getState().items).toHaveLength(3);

    // Attempt to add a 4th item
    useComparisonStore.getState().addItem(mockProperty("4"));

    expect(useComparisonStore.getState().items).toHaveLength(3);
    expect(useComparisonStore.getState().items.find(i => i.id === "4")).toBeUndefined();
  });

  test("should remove an item", () => {
    useComparisonStore.getState().addItem(mockProperty("1"));
    useComparisonStore.getState().addItem(mockProperty("2"));

    useComparisonStore.getState().removeItem("1");

    const state = useComparisonStore.getState();
    expect(state.items).toHaveLength(1);
    expect(state.items[0].id).toBe("2");
  });

  test("should clear all items", () => {
    useComparisonStore.getState().addItem(mockProperty("1"));
    useComparisonStore.getState().addItem(mockProperty("2"));

    useComparisonStore.getState().clearItems();

    const state = useComparisonStore.getState();
    expect(state.items).toEqual([]);
  });
});
