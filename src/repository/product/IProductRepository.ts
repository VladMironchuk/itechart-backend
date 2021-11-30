export interface IProductRepository<T, K, U> {
  getAll(query: U): Promise<T[]>;

  getById(id: K): Promise<U> | U;

  getOne(query: U): Promise<T> | T

  create(dto: U): Promise<void>;

  update(entity: U, dto: U): Promise<void>;

  delete(entity: U): Promise<void>;
}
