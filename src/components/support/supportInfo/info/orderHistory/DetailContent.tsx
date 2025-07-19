import React from 'react';
import { OrderDetailItemType } from '@/types/support';

interface DetailContentProps {
  orderDetail: OrderDetailItemType;
  activeTab: string;
}

const DetailContent = ({ orderDetail, activeTab }: DetailContentProps) => {
  const grayInfoStyle = 'text-textGray font-medium text-sm';
  const blackSemiBoldInfoStyle = 'text-textBlack font-semibold';
  const blackBoldInfoStyle = 'text-textBlack font-bold text-lg';

  const renderOrderMenu = () => (
    <div className="flex flex-col p-3 bg-gray-50 rounded-lg">
      {orderDetail?.orderMenuSummary?.orderMenuInfos.map((menu, index) => (
        <div key={index} className="flex justify-between items-center pb-2">
          <div className="flex flex-row gap-3 items-center">
            <span className="text-textBlack font-medium">
              {menu.menuName} ({menu.menuPrice.toLocaleString()}원)
            </span>
            <span className="text-textGray text-sm">{menu.menuQuantity}개</span>
          </div>
          <span className={blackSemiBoldInfoStyle}>
            {menu.totalMenuPrice.toLocaleString()}원
          </span>
        </div>
      ))}
      <div className="border-t pt-3 flex justify-between items-center">
        <span className={blackBoldInfoStyle}>총 주문 금액</span>
        <span className={`${blackBoldInfoStyle} text-[#5573E2]`}>
          {orderDetail?.orderMenuSummary?.totalPrice.toLocaleString()}원
        </span>
      </div>
    </div>
  );

  const renderPaymentInfo = () => (
    <div className="flex flex-col p-3 bg-gray-50 rounded-lg gap-2">
      <div className="flex justify-between items-center border-b pb-3">
        <span className={blackBoldInfoStyle}>총 결제 금액</span>
        <span className={`${blackBoldInfoStyle} text-[#5573E2]`}>
          {orderDetail.paymentInfo.paidAmount.toLocaleString()}원
        </span>
      </div>
      <div className="flex flex-col">
        <div className="flex justify-between items-center">
          <span className={blackSemiBoldInfoStyle}>총 금액</span>
          <span className={blackSemiBoldInfoStyle}>
            {orderDetail.paymentInfo.totalAmount.toLocaleString()}원
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className={grayInfoStyle}>메뉴 금액</span>
          <span className={grayInfoStyle}>
            {orderDetail.paymentInfo.menuPrice.toLocaleString()}원
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className={grayInfoStyle}>배달팁</span>
          <span className={grayInfoStyle}>
            {orderDetail.paymentInfo.deliveryFee.toLocaleString()}원
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className={grayInfoStyle}>결제 방법</span>
          <span className={grayInfoStyle}>
            {orderDetail.paymentInfo.method}
          </span>
        </div>
      </div>

      {(orderDetail.paymentInfo.discountAmount !== 0 ||
        orderDetail.paymentInfo.couponAmount !== 0) && (
        <div className="flex flex-col border-t pt-3">
          {orderDetail.paymentInfo.discountAmount !== 0 && (
            <div className="flex justify-between items-center">
              <span className={blackSemiBoldInfoStyle}>할인 금액</span>
              <span className={`${blackSemiBoldInfoStyle} text-textRed`}>
                {orderDetail.paymentInfo.discountAmount.toLocaleString()}원
              </span>
            </div>
          )}
          {orderDetail.paymentInfo.couponAmount !== 0 && (
            <div className="flex justify-between items-center">
              <span className={grayInfoStyle}>쿠폰 할인</span>
              <span className={grayInfoStyle}>
                {orderDetail.paymentInfo.couponAmount.toLocaleString()}원
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );

  const renderDeliveryInfo = () => (
    <div className="flex flex-col bg-gray-50 rounded-lg gap-1 px-3">
      <div className="flex flex-col border-b py-3">
        <span className={blackSemiBoldInfoStyle}>전화번호</span>
        <p className="text-textGray text-sm mt-1 ">
          {orderDetail.deliveryInfo.clientPhone}
        </p>
      </div>
      <div className="flex flex-col border-b py-3">
        <span className={blackSemiBoldInfoStyle}>배달 주소</span>
        <p className="text-textGray text-sm mt-1">
          {orderDetail.deliveryInfo.address}
        </p>
      </div>
      {orderDetail.deliveryInfo.deliveryNote && (
        <div className="flex flex-col border-b py-3">
          <span className={blackSemiBoldInfoStyle}>배달 요청사항</span>
          <p className="text-textGray text-sm mt-1">
            {orderDetail.deliveryInfo.deliveryNote}
          </p>
        </div>
      )}
      {orderDetail.deliveryInfo.restaurantNote && (
        <div className="flex flex-col py-3">
          <span className={blackSemiBoldInfoStyle}>매장 요청사항</span>
          <p className="text-textGray text-sm mt-1">
            {orderDetail.deliveryInfo.restaurantNote}
          </p>
        </div>
      )}
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case '주문 메뉴':
        return renderOrderMenu();
      case '결제 정보':
        return renderPaymentInfo();
      case '배달 정보':
        return renderDeliveryInfo();
      default:
        return renderOrderMenu();
    }
  };

  return <div className="bg-white">{renderContent()}</div>;
};

export default DetailContent;
