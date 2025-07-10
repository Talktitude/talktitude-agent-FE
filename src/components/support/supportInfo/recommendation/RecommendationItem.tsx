import React from 'react';

interface RecommendationItemProps {
  recommendation: string;
  setInputMessage?: (message: string) => void;
}

const RecommendationItem = ({
  recommendation,
  setInputMessage,
}: RecommendationItemProps) => {
  const handleClick = () => {
    if (setInputMessage) {
      setInputMessage(recommendation);
    }
  };

  return (
    <button
      className="w-full px-5 py-3 bg-[#EEEEEE] rounded-[20px] shadow-[0px_0px_10px_0px_rgba(0,0,0,0.20)] inline-flex justify-start items-center overflow-hidden"
      onClick={handleClick}
    >
      <div className="justify-start text-textBlack text-base font-medium text-left">
        {recommendation}
      </div>
    </button>
  );
};

export default RecommendationItem;
