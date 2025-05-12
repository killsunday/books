export interface Book {
  id: number
  title: string
  description: string | null
  completedAt: Date | null
  expectedWordCount: number | null
  createdAt: Date
  updatedAt: Date
  userId: number
  user: {
    name: string | null
    email: string
  }
  assignees: {
    id: number
    name: string | null
    email: string
  }[]
} 