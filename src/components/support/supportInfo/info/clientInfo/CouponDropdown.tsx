import { ClientInfoType } from '@/types/support';

interface CouponDropdownProps {
  couponInfo: ClientInfoType['couponInfo'];
}

const CouponDropdown = ({ couponInfo }: CouponDropdownProps) => {
  return (
    <div className="flex flex-col gap-2 p-3 bg-gray-50 rounded-lg max-h-[200px] overflow-y-auto w-[65%] ml-auto">
      {couponInfo.map((coupon) => (
        <div
          key={coupon.currency}
          className="flex justify-between text-sm text-textBlack"
        >
          <span>{coupon.currency}원</span>
          <span className="font-medium">{coupon.amount}장</span>
        </div>
      ))}
    </div>
  );
};

export default CouponDropdown;
