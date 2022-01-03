export default interface ICategoryRepository<K, U> {
  getById(id: K);

  getOne(query: U);

  create(dto: U): Promise<void>;

  update(query: U, dto: U): Promise<void>;

  delete(query: U): Promise<void>;
}
