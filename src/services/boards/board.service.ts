import { api } from '../api/client'
import type { CreateBoardPayload, Board, UpdateBoardPayload, BoardWithNodes } from './boards.types'

export const boardService = {
  async create(payload: CreateBoardPayload) {
    const newBoard = await api.post('/boards', payload)
    return newBoard.data
  },
  async list(): Promise<Board[]> {
    const boards = await api.get('/boards')
    return boards.data
  },
  async find(id: string): Promise<BoardWithNodes> {
    const board = await api.get(`/boards/${id}`)
    return board.data
  },
  async update(id: string, payload: UpdateBoardPayload) {
    const updatedBoard = await api.put(`/boards/${id}`, payload)
    return updatedBoard.data
  },
  async delete(id: string) {
    await api.delete(`/boards/${id}`)
  },
}
export default boardService
