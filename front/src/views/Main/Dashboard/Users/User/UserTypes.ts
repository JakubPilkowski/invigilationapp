export type ActivityType = {
  id: string;
  page: string;
  event: string;
  eventDate: string;
};

export type UserType = {
  id: string;
  username?: string;
  email?: string;
  avatar?: string;
  status: {
    state: string;
    lastInteraction: string;
  };
};
