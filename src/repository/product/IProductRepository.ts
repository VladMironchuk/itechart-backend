export interface IProductRepository<T, K, U> {
  getProducts(query: U): Promise<T[]>;

  getProductById(id: K): Promise<T> | T;

  getProduct(query: U): Promise<T> | T

  createProduct(dto: U): Promise<void>;

  updateProduct(entity: U, dto: U): Promise<void>;

  deleteProduct(entity: U): Promise<void>;
}
