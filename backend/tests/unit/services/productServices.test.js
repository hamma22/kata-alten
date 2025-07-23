const mockingoose = require("mockingoose");
const Product = require("../../../models/Product.model");
const { listProducts } = require("../../../services/products.services");

describe("listProducts service", () => {
  beforeEach(() => {
    mockingoose.resetAll();
  });

  it("should return all products without pagination or search", async () => {
    const fakeProducts = [
      { name: "Product 1", description: "Desc 1", category: "A" },
      { name: "Product 2", description: "Desc 2", category: "B" },
    ];

    mockingoose(Product).toReturn(fakeProducts, "find");

    const result = await listProducts({});

    expect(result.products).toHaveLength(2);
    expect(result.total).toBe(2);
    expect(result.page).toBeUndefined();
    expect(result.pages).toBeUndefined();
  });

  it("should apply search query", async () => {
    const search = "test";
    const fakeProducts = [{ name: "Test Product", description: "..." }];

    mockingoose(Product).toReturn(fakeProducts, "find");
    mockingoose(Product).toReturn(1, "countDocuments");

    const result = await listProducts({ search, page: 1, limit: 10 });

    expect(result.products).toHaveLength(1);
    expect(result.total).toBe(1);
    expect(result.page).toBe(1);
    expect(result.pages).toBe(1);
  });

  it("should apply pagination", async () => {
    const fakeProducts = new Array(5).fill({ name: "Paged" });

    mockingoose(Product).toReturn(fakeProducts, "find");
    mockingoose(Product).toReturn(50, "countDocuments");

    const result = await listProducts({ page: 1, limit: 5 });

    expect(result.products).toHaveLength(5);
    expect(result.total).toBe(50);
    expect(result.page).toBe(1);
    expect(result.pages).toBe(10);
  });
});
