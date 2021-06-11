import { ISidebarItemProps } from '../../types';
import Link from 'next/link';
import React from 'react';

let SidebarItem = ({
  path,
  itemStart,
  itemEnd,
  children,
}: ISidebarItemProps) => {
  return path ? (
    <Link href={path}>
      <div className="flex justify-start items-center p-2 mx-1 mt-1 space-x-2 border-b border-gray-300 dark:border-gray-800 hover:bg-gray-300 relative dark:hover:bg-gray-800 cursor-pointer">
        <div>{itemStart}</div>
        <div>{children}</div>
        <div>{itemEnd}</div>
      </div>
    </Link>
  ) : (
    <div className="flex justify-start items-center p-2 mx-1 mt-1 space-x-2 border-b border-gray-300 dark:border-gray-800 hover:bg-gray-300 relative dark:hover:bg-gray-800 cursor-pointer">
      <div>{itemStart}</div>
      <div>{children}</div>
      <div>{itemEnd}</div>
    </div>
  );
};

export default SidebarItem;
