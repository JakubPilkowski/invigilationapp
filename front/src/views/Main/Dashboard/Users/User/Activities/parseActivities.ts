import { ActivityType } from '../UserTypes';

export default (data: ActivityType[]): ActivityType[] => {
  if (!data) return [];
  return data.map((activity) => ({
    ...activity,
    date: new Date(activity.date).toLocaleString().split(',')[1],
  }));
};
