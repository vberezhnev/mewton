import cat8 from '@/assets/cat8.png';
import convertSvg from '@/assets/convert.png';
import monetaSvg from '@/assets/moneta.png';
import tonSvg from '@/assets/ton.svg';
import { BottomTabs } from '@/components/BottomTabs';
import { TopUpBalance } from '@/components/Dialogs/top-up-balance';
import { Header } from '@/components/Header';
import { buyBoost, getBoosts } from '@/lib/helpers/boost';
import { formatWithSpaces } from '@/lib/helpers/txt';
import { useUserStore } from '@/lib/store/userStore';
import dayjs from 'dayjs';
import { Clock } from 'lucide-react';
import { useEffect, useState } from 'react';

interface IBoost {
  boostLastBuyDate: Date;
  boostPrice: number;
  buyPrice: number;
  createdAt: Date;
  id: number;
  imageUrl: string;
  isAvailable: boolean;
  name: string;
  updatedAt: Date;
}

export default function Boost() {
  const balance = useUserStore((state) => state.balance);
  const [boosts, setBoosts] = useState<IBoost[]>([]);

  useEffect(() => {
    (async () => {
      const res = await getBoosts();

      setBoosts(res);
    })();
  }, []);

  const handleBuyBoost = (boostId: number) => async () => {
    const res = await buyBoost(boostId);
    console.log(res);
  };

  return (
    <div className="flex justify-center ">
      <div className="flex flex-col w-full h-screen max-w-xl py-5 font-bold text-white">
        <Header />
        <div className="flex-1 mx-3 mt-5 w-[93%] flex flex-col items-center overflow-auto scrollbar-hide">
          <div className="flex flex-col items-center w-full gap-7">
            <h1 className="flex items-center gap-2 text-3xl">
              <img className="w-[40px]" src={tonSvg} alt="" />
              {formatWithSpaces(balance)}
            </h1>
            <TopUpBalance title="Top up balance" />

            <span className="text-3xl">Boosts</span>
          </div>
          <span className="text-[10px] my-4">
            boost can be purchased again only after some time
          </span>
          <div className="grid grid-cols-2 gap-3 w-[95%] mb-32">
            {boosts.map((boost) => {
              const isBoostAvailable =
                (dayjs().diff(dayjs(boost.boostLastBuyDate), 'minutes') > 30 &&
                  boost.isAvailable) ||
                boost.name === 'Loki';

              return (
                <div
                  key={boost.id}
                  className="flex flex-col items-center justify-between gap-2 p-4 bg-cardBg rounded-2xl"
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="text-[10px] flex gap-2 items">
                      <img className="w-[12px]" src={boost.imageUrl || convertSvg} alt="" />
                      {boost.name}
                    </span>
                    <span className="text-[10px] flex gap-1 items-center">
                      {boost.name === 'Loki' ? (
                        <img className="w-[12px]" src={monetaSvg} alt="" />
                      ) : (
                        <img className="w-[12px]" src={tonSvg} alt="" />
                      )}
                      {boost.boostPrice}
                    </span>
                  </div>
                  <img className="w-[79px]" src={cat8} alt="" />
                  <button
                    disabled={!isBoostAvailable}
                    className="flex flex-col items-center w-full p-1 text-xs font-bold rounded-lg bg-orange"
                    onClick={handleBuyBoost(boost.id)}
                  >
                    {isBoostAvailable ? (
                      <>
                        Buy{' '}
                        <span className="text-[8px] flex gap-1 items-center">
                          +{boost.buyPrice} <img className="w-[10px]" src={tonSvg} alt="" />
                        </span>
                      </>
                    ) : (
                      <Clock size={32} />
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
        <BottomTabs />
      </div>
    </div>
  );
}
