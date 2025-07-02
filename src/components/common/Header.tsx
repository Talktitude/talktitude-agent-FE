'use client';

import { usePathname, useRouter } from 'next/navigation';
import { IoPersonCircle } from 'react-icons/io5';
import Image from 'next/image';
import WhiteLogo from '/public/logo/white-logo.svg';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { label: '상담 서비스', path: '/support' },
    { label: '상담 리포트', path: '/reports' },
  ];

  return (
    <header className="bg-mainColor text-white px-16 py-2.5 flex items-center justify-between">
      <Image
        src={WhiteLogo}
        alt="Talktitude white Logo"
        width={140}
        height={29}
        priority
      />
      <div className="flex items-center gap-9">
        {navItems.map((item) => (
          <button
            key={item.path}
            onClick={() => router.push(item.path)}
            className={`text-l font-bold transition-colors ${
              pathname === item.path
                ? 'text-white'
                : 'text-[#C0C0C0] hover:text-white'
            }`}
          >
            {item.label}
          </button>
        ))}
        <button className="rounded-full w-9 h-9 flex items-center justify-center p-0 m-0 hover:bg-white/30 transition-colors">
          <IoPersonCircle className="w-full h-full" color="#C0C0C0" />
        </button>
      </div>
    </header>
  );
}
