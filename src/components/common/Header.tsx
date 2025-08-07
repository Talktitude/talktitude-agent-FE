'use client';

import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import WhiteLogo from '/public/logo/white-logo.svg';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const date = new Date().toLocaleDateString('sv-SE', {
    timeZone: 'Asia/Seoul',
  });

  const navItems = [
    { label: '상담 서비스', path: '/support' },
    { label: '상담 리포트', path: `/reports?date=${date}` },
  ];

  return (
    <header className="bg-mainColor text-white px-16 py-2.5 flex items-center justify-between">
      <button onClick={() => router.push('/support')}>
        <Image
          src={WhiteLogo}
          alt="Talktitude white Logo"
          width={140}
          height={29}
          style={{ width: '140px', height: '29px' }}
          priority={true}
        />
      </button>
      {pathname !== '/signup' && (
        <div className="flex items-center gap-9">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => router.push(item.path)}
              className={`text-l font-bold transition-colors ${
                pathname.startsWith(item.path.split('?')[0])
                  ? 'text-white'
                  : 'text-[#C0C0C0] hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
          <button className="rounded-full w-9 h-9 flex items-center justify-center p-0 m-0 hover:bg-white/70 transition-colors">
            <Image
              src="https://i.pinimg.com/736x/d5/cc/bb/d5ccbb3c0796509fdaa7696da65cc8e2.jpg"
              alt="profile"
              width={28}
              height={28}
              className="rounded-full object-cover"
            />
          </button>
        </div>
      )}
    </header>
  );
}
