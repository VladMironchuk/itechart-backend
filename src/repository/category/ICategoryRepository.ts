export default interface ICategoryRepository<K, U> {
  getAll(query: U, keys: K): unknown;

  getById(id: K): unknown;

  getOne(query: U): unknown;

  create(dto: U): Promise<void>;

  update(query: U, dto: U): Promise<void>;

  delete(query: U): Promise<void>;
}
