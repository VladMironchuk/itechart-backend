export interface ILastRatingsRepository {
  get(): Promise<any>

  add(product: string, user: string, rating: number, comment?: string): Promise<void>
}