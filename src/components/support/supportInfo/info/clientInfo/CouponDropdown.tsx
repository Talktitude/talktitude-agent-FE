import { ClientInfoType } from '@/types/support';

interface CouponDropdownProps {
  couponInfo: ClientInfoType['couponInfo'];
}

const CouponDropdown = ({ couponInfo }: CouponDropdownProps) => {
  return (
    <div className="flex flex-col gap-2 ml-4 mt-2 p-3 bg-gray-50 rounded-lg overflow-y-auto max-h-[200px]">
      {couponInfo.map((coupon) => (
        <div
          key={coupon.currency}
          className="flex flex-row gap-2 items-center justify-between"
        >
          <div className="text-sm text-textBlack">{coupon.currency}원</div>
          <div className="text-sm text-textBlack font-medium">
            {coupon.amount}장
          </div>
        </div>
      ))}
    </div>
  );
};

export default CouponDropdown;
