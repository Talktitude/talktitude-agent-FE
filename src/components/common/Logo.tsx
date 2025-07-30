import React from 'react';
import Image from 'next/image';

const Logo = () => {
  return (
    <div className="px-10">
      <Image
        src="/logo/large-logo.svg"
        alt="logo"
        width={280}
        height={62}
        style={{ width: '280px', height: '62px' }}
        priority={true}
      />
    </div>
  );
};

export default Logo;
