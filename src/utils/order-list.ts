import { OrderListRepository } from '../repository/order-list/OrderListRepository';

export default async function (userId: string) {
  const orderList = await OrderListRepository.getAll(userId)
  if(!orderList) {
    await OrderListRepository.create(userId)
  }
}
