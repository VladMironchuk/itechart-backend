export interface IOrderListRepository<T, K> {
  update(userId: string, products: K[]): Promise<void>;

  getAll(userId: string): Promise<T | Partial<T>>;
}
