export default interface ICategoryRepository<T, K, U> {
  getAll(): Promise<T[]> | T[];

  getById(id: K): Promise<T> | T;

  getOne(query: U): Promise<T> | T;

  create(dto: U): Promise<void>;

  update(query: U, dto: U): Promise<void>;

  delete(query: U): Promise<void>;
}
