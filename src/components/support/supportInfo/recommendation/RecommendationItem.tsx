import React from 'react';

const RecommendationItem = ({ recommendation }: { recommendation: string }) => {
  return (
    <div className="w-full px-5 py-3 bg-[#EEEEEE] rounded-[20px] shadow-[0px_0px_10px_0px_rgba(0,0,0,0.20)] inline-flex justify-start items-center overflow-hidden">
      <div className="justify-start text-textBlack text-base font-medium">
        {recommendation}
      </div>
    </div>
  );
};

export default RecommendationItem;
