export type Fasting = {
  _id: string;
  totalDuration: number; // as seconds
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  updatedAt: Date;
  isCompleted: boolean;
  isActive: boolean;
};

export type FastingsGetRequest = {
  userId: string;
  limit?: number;
  page?: number;
};

export type FastingDeleteRequest = {
  userId: string;
  fastingId: string;
};
