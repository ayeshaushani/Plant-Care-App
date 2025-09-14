export interface Plant {
  id?: string
  name: string
  species?: string
  description?: string
  imageUrl?: string   // ✅ store uploaded image URL
  userId: string
  createdAt?: string
}
