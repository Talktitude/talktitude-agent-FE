import { FiSearch } from 'react-icons/fi';
import { PLACEHOLDERS } from '@/lib/constants/placeholders';

interface SearchInputProps {
  onSearchClick: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchInput({
  onSearchClick,
  onChange,
}: SearchInputProps) {
  // const handleSearch = () => {
  //   console.log('검색 버튼 클릭');
  // };

  return (
    <div className="relative w-full px-5 py-3.5">
      <input
        type="text"
        placeholder={PLACEHOLDERS.CLIENT_SEARCH}
        onChange={onChange}
        className="w-full h-12 px-5 py-3 text-textBlack text-base font-medium outline-none shadow-inputShadow rounded-[1.25rem] border-[1px] border-lineGray focus:border-[1px] focus:border-mainColor resize-none flex-1"
      />
      <button
        className="w-7 h-7 absolute right-10 top-1/2 transform -translate-y-1/2 bg-white rounded-[1.25rem] flex items-center justify-center"
        onClick={onSearchClick}
      >
        <FiSearch className="w-full h-full text-mainColor" />
      </button>
    </div>
  );
}
