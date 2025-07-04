type SectionHeaderProps = {
  title: string;
};

const SectionHeader = ({ title }: SectionHeaderProps) => {
  return (
    <div className="bg-[#ebebeb]">
      <div className="w-[25%] inline-flex items-center justify-center py-3 bg-white text-mainColor text-lg font-bold">
        {title}
      </div>
    </div>
  );
};

export default SectionHeader;
