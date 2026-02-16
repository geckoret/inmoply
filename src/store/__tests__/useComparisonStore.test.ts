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

  test("should not add duplicate items (same reference)", () => {
    const property = mockProperty("1");
    useComparisonStore.getState().addItem(property);

    const previousItems = useComparisonStore.getState().items;
    useComparisonStore.getState().addItem(property);

    const currentItems = useComparisonStore.getState().items;
    expect(currentItems).toHaveLength(1);
    expect(currentItems).toBe(previousItems); // Verify reference equality
  });

  test("should not add duplicate items (different reference, same ID)", () => {
    const property1 = mockProperty("1");
    const property1Duplicate = mockProperty("1"); // Different object, same ID

    useComparisonStore.getState().addItem(property1);
    expect(useComparisonStore.getState().items).toHaveLength(1);

    const previousItems = useComparisonStore.getState().items;
    useComparisonStore.getState().addItem(property1Duplicate);

    const currentItems = useComparisonStore.getState().items;
    expect(currentItems).toHaveLength(1);
    expect(currentItems[0]).toBe(property1); // Should still be the first object
    expect(currentItems).toBe(previousItems); // Verify reference equality
  });

  test("should limit items to 3", () => {
    useComparisonStore.getState().addItem(mockProperty("1"));
    useComparisonStore.getState().addItem(mockProperty("2"));
    useComparisonStore.getState().addItem(mockProperty("3"));

    expect(useComparisonStore.getState().items).toHaveLength(3);

    const previousItems = useComparisonStore.getState().items;

    // Attempt to add a 4th item
    useComparisonStore.getState().addItem(mockProperty("4"));

    const currentItems = useComparisonStore.getState().items;
    expect(currentItems).toHaveLength(3);
    expect(currentItems).toBe(previousItems); // Verify items array reference is same
    expect(currentItems.find(i => i.id === "4")).toBeUndefined();
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
