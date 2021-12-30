export interface IOrderListRepository<T, K> {
  getAll(userId: string): Promise<T | Partial<T>>;

  create(userId: string): Promise<void>

  add(userId: string, products: K): Promise<void>

  update(userId: string, products: K): Promise<void>;

  clear(userId: string): Promise<void>
}
