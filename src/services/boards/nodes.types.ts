export type NodeType = 'TEXT' | 'TODO' | 'GRAPH'

export interface TextContent {
  text: string
}

export interface TodoItem {
  id: string
  text: string
  done: boolean
}

export interface TodoContent {
  items: TodoItem[]
}

export interface GraphContent {
  points: { x: number; y: number }[]
}

export interface Coordinates {
  x: number
  y: number
}

interface BaseNode {
  id: string
  title: string
  boardId: string
  width: number
  coordinates: Coordinates
  createdAt: string
  updatedAt: string
}

export type BoardNodeData =
  | (BaseNode & { type: 'TEXT'; content: TextContent })
  | (BaseNode & { type: 'TODO'; content: TodoContent })
  | (BaseNode & { type: 'GRAPH'; content: GraphContent })
