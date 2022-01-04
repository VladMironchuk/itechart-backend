export interface ILastRatingsRepository {
  get(): Promise<unknown>

  add(product: string, user: string, rating: number, comment?: string): Promise<void>
}