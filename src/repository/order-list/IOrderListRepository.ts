export interface IOrderListRepository<T, K> {
  updateList(userId: string, products: K[]): Promise<void>;

  deleteList(userId: string): Promise<void>;

  getList(userId: string): Promise<T>;
}
