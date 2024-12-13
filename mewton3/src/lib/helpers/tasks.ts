import rest from '../services/rest';

export const getTasks = async () => {
  const res = await rest.get('/tasks/user');

  return res.data.tasks;
};

export const completeTask = async (taskId: number, channelLink: string) => {
  const res = await rest.post('/tasks/complete', { taskId, channelLink });
  return res.data;
};
