import monetaSvg from '@/assets/moneta.png';
import tonSvg from '@/assets/ton.svg';
import { Accordion } from '@/components/Accordion';
import { BottomTabs } from '@/components/BottomTabs';
import { Header } from '@/components/Header';

export function Info() {
  return (
    <div className="flex justify-center ">
      <div className="flex flex-col w-full h-screen max-w-xl py-10 font-bold text-white">
        <Header />
        <div className="flex-1 pb-32 mx-4 mt-10 overflow-auto scrollbar-hide">
          <h1 className="flex items-center gap-3 mb-10 text-3xl">Information</h1>
          <div className="flex flex-col gap-3">
            <Accordion title="How to play?">
              <div>
                Click on the cat and get free MEW
                <img className="w-[15px] h-[15px] mx-1 inline-block" src={monetaSvg} alt="" />{' '}
                coins. Also buy boosts and get additional TON
                <img className="w-[15px] h-[15px] mx-1 inline-block" src={tonSvg} alt="" /> coins
              </div>
            </Accordion>
            <Accordion title="What are “boosts” and what do they give?">
              <div className="flex flex-col gap-1">
                <div>
                  <span className="font-bold text-orange">Boosts</span> - these are improvements for
                  your account
                </div>
                With them you can get: TON
                <div>
                  <span className="font-bold text-orange">Attention!</span>
                  All boosts are valid no more than 24 hours.
                </div>
                <span>You can buy several boosts at once different types</span>
              </div>
            </Accordion>
            <Accordion title="What bonuses for friends?">
              <div className="flex flex-col gap-1">
                <span>You can invite friends to Friends section</span>
                <div>
                  <span className="font-bold text-orange">For every friend you invite</span> you
                  guaranteed to get 0.001 TON
                </div>
                <div>
                  <span className="font-bold text-orange">For each active* friend</span>
                  you will receive 0.005 TON + 5% from each of his profits
                </div>
                <span className="mt-5">
                  *an active friend is one who top up your balance with the minimum amount
                </span>
              </div>
            </Accordion>
            <Accordion title="How quickly it comes withdrawal?">
              <div className="flex flex-col gap-4">
                <span>The withdrawal comes instantly</span>
                <span>Exception - Transaction Delay in the TON blockchain itself</span>
              </div>
            </Accordion>
            <Accordion title="Our contacts and resources">
              <div className="flex flex-col gap-1">
                <div>
                  <span className="font-bold text-orange">Support</span> chatbot -
                </div>
                <div>
                  <span className="font-bold text-orange">Our</span> channel -
                </div>
              </div>
            </Accordion>
          </div>
        </div>
        <BottomTabs />
      </div>
    </div>
  );
}
