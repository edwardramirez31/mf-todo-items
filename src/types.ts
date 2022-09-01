export interface DjangoTask {
  text: string;
  completed: boolean;
  id: number;
}

export interface TaskUpdateRequest {
  id: number;
  text: string;
  completed: boolean;
}
