'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import WhiteLogo from '/public/logo/white-logo.svg';
import MyInfoModal from '@/components/account/Info/MyInfoModal';
import { getUserInfo } from '@/api/accountApi';
import { UserInfoType } from '@/types/account';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const date = new Date().toLocaleDateString('sv-SE', {
    timeZone: 'Asia/Seoul',
  });
  const [userInfoModalOpen, setUserInfoModalOpen] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfoType | null>(null);

  const navItems = [
    { label: '상담 서비스', path: '/support' },
    { label: '상담 리포트', path: `/reports?date=${date}` },
  ];

  useEffect(() => {
    const fetchUserInfo = async () => {
      const response = await getUserInfo();
      setUserInfo(response.data);
    };
    const token =
      typeof window !== 'undefined'
        ? localStorage.getItem('accessToken')
        : null;
    if (token) fetchUserInfo();
  }, []);

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
          <button
            className={`relative rounded-full w-10 h-10 flex items-center justify-center p-0 m-0 hover:bg-white/40 transition-colors ${
              userInfoModalOpen ? 'bg-white/40' : ''
            }`}
            onClick={() => setUserInfoModalOpen(true)}
          >
            <Image
              src={
                userInfo?.profileImageUrl ||
                'https://i.pinimg.com/736x/d5/cc/bb/d5ccbb3c0796509fdaa7696da65cc8e2.jpg'
              }
              alt="profile"
              width={30}
              height={30}
              unoptimized={true}
              sizes="28px"
              className="rounded-full object-cover"
            />
          </button>
          {userInfoModalOpen && (
            <div className="absolute">
              <MyInfoModal
                open={userInfoModalOpen}
                onOpenChange={setUserInfoModalOpen}
              />
            </div>
          )}
        </div>
      )}
    </header>
  );
}
