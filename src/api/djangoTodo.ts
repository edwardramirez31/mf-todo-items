import axios from 'axios';

import type { DjangoTask } from '../types';

const axiosInstance = axios.create({
  baseURL: 'https://edwardramirez.pythonanywhere.com',
});

class DjangoTodo {
  static async getTasks(): Promise<DjangoTask[]> {
    const response = await axiosInstance.get<DjangoTask[]>('/');
    return response.data;
  }

  static async deleteTask(id: number): Promise<void> {
    await axiosInstance.delete(`/task/${id}`);
  }

  static async updateTask(
    id: number,
    data: { text: string; completed: boolean }
  ): Promise<DjangoTask> {
    const response = await axiosInstance.put<DjangoTask>(`/task/${id}/`, data);
    return response.data;
  }
}

export default DjangoTodo;
