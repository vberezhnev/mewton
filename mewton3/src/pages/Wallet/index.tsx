import tonSvg from '@/assets/ton.svg';
import { BottomTabs } from '@/components/BottomTabs';
import { TopUp } from '@/components/Dialogs/top-up';
import { Withdraw } from '@/components/Dialogs/withdraw';
import { Header } from '@/components/Header';
import { formatWithSpaces } from '@/lib/helpers/txt';
import { useUserStore } from '@/lib/store/userStore';

export function Wallet() {
  const balance = useUserStore((state) => state.balance);
  return (
    <div className="flex justify-center">
      <div className="flex flex-col w-full h-screen max-w-xl py-10 font-bold text-white">
        <Header />
        <div className="flex-1 mx-4 my-10">
          <div className="flex items-center justify-between">
            <h1 className="mb-2 text-2xl ">Wallet</h1>
            <span className="px-4 py-2 text-xs font-medium bg-gray rounded-xl">Connect wallet</span>
          </div>
          <div className="flex justify-between mt-10 mb-5">
            <div className="flex items-center gap-2">
              <img className="w-[40px]" src={tonSvg} alt="" />
              <h2 className="text-4xl font-bold">{formatWithSpaces(balance)}</h2>
            </div>
            <div className="bg-gray w-[105px] h-[55px] rounded-md flex flex-col items-center justify-between p-2">
              <span className="text-xs">total earned</span>
              <span className="flex items-center gap-1 text-xs">
                <img className="w-[15px]" src={tonSvg} alt="" />
                0.00
              </span>
            </div>
          </div>
          <div className="flex flex-col w-2/5 gap-4">
            <TopUp title="Top up" />
            <Withdraw />
          </div>
          <div className="w-full h-[3px] bg-gray my-10" />
          <div className="flex flex-col gap-3">
            <p className="text-xs text-textColor">
              *all cash withdrawals are made automatically and arrive to the linked wallet instantly
            </p>
            <p className="text-xs text-textColor">
              **we also retain a 3% commission for the functioning of the ecosystem
            </p>
          </div>
        </div>
        <BottomTabs />
      </div>
    </div>
  );
}
