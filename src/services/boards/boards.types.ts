export interface CreateBoardPayload {
  title: string
  description?: string
  ownerId: string
}

export interface Board {
  id: string
  title: string
  description?: string
  ownerId: string
}

export interface UpdateBoardPayload {
  title?: string
  description?: string
}
