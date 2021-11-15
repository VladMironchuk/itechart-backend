export default interface ICategoryRepository<T, K, U> {
  getCategories(): Promise<T[]> | T[];

  getCategoryById(id: K): Promise<T> | T;

  getCategory(query: U): Promise<T> | T;

  createCategory(dto: U): Promise<void>;

  updateCategory(query: U, dto: U): Promise<void>;

  deleteCategory(query: U): Promise<void>;
}
