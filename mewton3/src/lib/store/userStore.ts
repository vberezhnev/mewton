import { getUser, refill } from '@/lib/helpers/user';
import { create } from 'zustand';

interface IUser {
  telegramId: number;
  username: string | undefined;
}

interface UserInterface {
  telegramId: number;
  username: string | undefined;
  firstName: string;
  lastName: string;
  points: number;
  energy: number;
  energyReFill: number;
  balance: number;
  isLoading: boolean;

  setUserData: (userInfo: IUser) => void;
  setPoints: (points: number) => void;
  setEnergy: (energy: number) => void;
  syncUserData: () => void;
  setIsLoading: (isLoading: boolean) => void;
}

export const useUserStore = create<UserInterface>((set) => ({
  telegramId: 0,
  username: '',
  firstName: '',
  lastName: '',
  points: 0,
  energy: 0,
  energyReFill: 0,
  balance: 0,
  isLoading: false,

  setUserData: (data: IUser) => set({ ...data }),
  setPoints: (points: number) => {
    set((state) => {
      if (state.energy < 0) return { points: state.points };

      return { points };
    });
  },
  syncUserData: async () => {
    set({ isLoading: true });
    const userData = await getUser();

    const data = {
      telegramId: userData.telegramId,
      points: userData.points,
      energy: userData.energy,
      energyReFill: userData.energyReFillList,
      balance: userData.balance,
      isLoading: false,
    };

    set(data);
  },
  setEnergy: async (energy: number) => {
    if (energy < 0) {
      set({ isLoading: true });
      await refill();
      const userData = await getUser();

      set({ energy: userData.energy, energyReFill: userData.energyReFillList });
      set({ isLoading: false });
      return;
    }
    set({ energy });
  },

  setIsLoading: (isLoading: boolean) => set({ isLoading }),
}));
