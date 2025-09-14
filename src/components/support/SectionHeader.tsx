type SectionHeaderProps = {
  title: string;
};

const SectionHeader = ({ title }: SectionHeaderProps) => {
  const isFullWidth = title === '내 정보 수정' || title === '비밀번호 변경';
  return (
    <div className="bg-[#ebebeb]">
      <div
        className={`${
          isFullWidth ? 'w-[10%] px-4' : 'w-[25%]'
        } inline-flex items-center justify-center py-3 bg-white text-mainColor text-lg font-bold whitespace-nowrap min-w-fit overflow-hidden`}
      >
        {title}
      </div>
    </div>
  );
};

export default SectionHeader;
