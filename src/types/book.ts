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
  milestones: {
    id: number
    title: string
    description: string | null
    startDate: Date
    endDate: Date
    expectedWordCount: number | null
    tasks: {
      id: number
      title: string
      description: string | null
      dueDate: Date
      completedAt: Date | null
    }[]
  }[]
  characters: {
    id: number
    name: string
    description: string | null
    imageUrl: string | null
    notes: string | null
  }[]
  writingSessions: {
    id: number
    wordCount: number
    minutes: number
    date: Date
    notes: string | null
    milestone: {
      id: number
      title: string
    } | null
  }[]
} 