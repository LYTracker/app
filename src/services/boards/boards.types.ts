import type { BoardNodeData } from './nodes.types'

export interface CreateBoardPayload {
  title: string
  ownerId: string
}

export interface Board {
  id: string
  title: string
  ownerId: string
  createdAt: string
  updatedAt: string
}

export interface BoardWithNodes extends Board {
  nodes: BoardNodeData[]
}

export interface UpdateBoardPayload {
  title?: string
}
