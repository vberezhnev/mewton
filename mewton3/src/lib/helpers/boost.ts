import rest from '../services/rest';

export const getBoosts = async () => {
  const res = await rest.get('/boosts/user');

  return res.data;
};

export const buyBoost = async (boostId: number) => {
  const res = await rest.post(`/boosts/buy/${boostId}`);

  return res.data;
};
