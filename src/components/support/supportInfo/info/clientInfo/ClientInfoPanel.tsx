import React, { useState } from 'react';
import { TiArrowSortedDown } from 'react-icons/ti';
import { ClientInfoType } from '@/types/support';
import CouponDropdown from './CouponDropdown';

interface ClientInfoPanelProps {
  clientInfo: ClientInfoType;
}

export default function ClientInfoPanel({ clientInfo }: ClientInfoPanelProps) {
  const {
    clientName,
    clientId,
    phone,
    address,
    point,
    totalCouponCount,
    couponInfo,
  } = clientInfo;
  const [isCouponOpen, setIsCouponOpen] = useState(false);

  const infoList = [
    { label: '이름', value: clientName },
    { label: '아이디', value: clientId },
    { label: '전화번호', value: phone },
    { label: '주소', value: address },
    { label: '포인트', value: `${point}원` },
    {
      label: '쿠폰',
      value: `${totalCouponCount}장`,
      isToggle: true,
      isOpen: isCouponOpen,
      onToggle: () => setIsCouponOpen(!isCouponOpen),
    },
  ];

  const isCoupon = totalCouponCount !== 0;

  return (
    <div className="flex flex-col gap-3 px-7 py-4">
      {infoList.map((info) => (
        <div
          key={info.label}
          className="flex flex-row gap-2 items-center justify-between "
        >
          <div className="text-textGray text-base font-medium">
            {info.label}
          </div>
          <div className="flex items-center gap-2">
            <div className="text-textBlack text-base font-semibold">
              {info.value}
            </div>
            {isCoupon && info.isToggle && (
              <button
                onClick={info.isToggle ? info.onToggle : undefined}
                className="hover:bg-gray-100 rounded-full p-1 transition"
              >
                <TiArrowSortedDown
                  className={`w-5 h-5 transition-transform duration-200 ${
                    info.isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
            )}
          </div>
        </div>
      ))}

      {isCouponOpen && <CouponDropdown couponInfo={couponInfo} />}
    </div>
  );
}
