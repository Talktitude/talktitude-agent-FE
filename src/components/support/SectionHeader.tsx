type SectionHeaderProps = {
  title: string;
};

const SectionHeader = ({ title }: SectionHeaderProps) => {
  return (
    <div className="bg-[#ebebeb]">
      <div className="inline-flex items-center justify-center h-14 px-5 py-3 bg-white text-mainColor text-lg font-bold">
        {title}
      </div>
    </div>
  );
};

export default SectionHeader;
