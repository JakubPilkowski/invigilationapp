export type ActivityType = {
  id: number;
  page: string;
  event: string;
  date: string;
};

export type UserType = {
  id: number;
  username?: string;
  email?: string;
  avatar?: string;
  status: string;
  lastEventDate: string;
};
