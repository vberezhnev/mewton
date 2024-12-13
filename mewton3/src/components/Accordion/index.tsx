import { useCallback, useState } from 'react';

interface AccordionProps {
  title: string;
  children: React.ReactNode;
}
export const Accordion = ({ title, children }: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  return (
    <div className="w-full flex flex-col bg-gray rounded-lg px-4 py-4 gap-4">
      <div className="flex w-full justify-between items-center ">
        <span className="text-bold text-base w-2/3">{title}</span>
        <div className="flex flex-col gap-2">
          <button
            className="bg-orange rounded-lg py-1 px-5 font-bold text-xs"
            onClick={toggleAccordion}
          >
            {isOpen ? 'Hide' : 'Read'}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="bg-gray border-t-2 border-slate-300 pt-4 text-[13px]">{children}</div>
      )}
    </div>
  );
};
