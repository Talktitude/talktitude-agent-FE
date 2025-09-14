import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { ClientInfoType } from '@/types/support';
import CouponDropdown from './CouponDropdown';
import { User, AtSign, Phone, MapPin, Coins, Ticket } from 'lucide-react';

interface ClientInfoPanelProps {
  clientInfo: ClientInfoType;
}

function LabelCell({
  icon: Icon,
  label,
}: {
  icon: React.ElementType;
  label: string;
}) {
  return (
    <div className="w-24 md:w-28 flex items-center gap-2 text-textGray">
      <Icon className="w-5 h-5 shrink-0 text-textGray" aria-hidden />
      <span className="text-sm md:text-base">{label}</span>
    </div>
  );
}

function InfoRow({
  icon,
  label,
  value,
  toggle,
  valueClassName = '',
}: {
  icon: React.ElementType;
  label: string;
  value: React.ReactNode;
  toggle?: React.ReactNode;
  valueClassName?: string;
}) {
  return (
    <div className="flex items-center gap-3 py-1">
      <LabelCell icon={icon} label={label} />
      <div className="flex items-center gap-2 min-w-0">
        <div className={`font-semibold text-textBlack ${valueClassName}`}>
          {value}
        </div>
        {toggle}
      </div>
    </div>
  );
}

export default function ClientInfoPanel({ clientInfo }: ClientInfoPanelProps) {
  const {
    name,
    loginId,
    phoneNumber,
    address,
    point,
    totalCouponCount,
    couponInfo,
  } = clientInfo;
  const [isCouponOpen, setIsCouponOpen] = useState(false);

  const hasCoupons = (totalCouponCount ?? 0) > 0;

  return (
    <section className="flex flex-col gap-2 px-7 py-4">
      <InfoRow icon={User} label="이름" value={name} />
      <InfoRow icon={AtSign} label="아이디" value={loginId} />
      <InfoRow icon={Phone} label="전화번호" value={phoneNumber} />
      <InfoRow
        icon={MapPin}
        label="주소"
        value={address}
        valueClassName="whitespace-normal break-words"
      />
      <InfoRow icon={Coins} label="포인트" value={`${point}P`} />
      <InfoRow
        icon={Ticket}
        label="쿠폰"
        value={`${totalCouponCount}장`}
        toggle={
          hasCoupons && (
            <button
              type="button"
              onClick={() => setIsCouponOpen((v) => !v)}
              className="hover:bg-gray-100 rounded-full p-1 transition"
              aria-label="쿠폰 목록 열기"
              aria-expanded={isCouponOpen}
            >
              <ChevronDown
                className={`
                  w-5 h-5 transition-transform duration-200
                  ${isCouponOpen ? 'rotate-180' : ''}
                `}
                aria-hidden
              />
            </button>
          )
        }
      />

      {hasCoupons && isCouponOpen && <CouponDropdown couponInfo={couponInfo} />}
    </section>
  );
}
