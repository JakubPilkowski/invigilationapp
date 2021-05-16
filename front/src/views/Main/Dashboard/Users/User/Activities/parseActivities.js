export default (data) => {
  if (!data) return;
  return data.map((activity) => ({
    ...activity,
    eventDate: activity.eventDate.split(' ')[1].split('.')[0],
  }));
};
