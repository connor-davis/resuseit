import { ISidebarItemProps } from '../../types';
import React from 'react';

let SidebarItem = ({ itemStart, itemEnd, children }: ISidebarItemProps) => {
  return (
    <div className="flex justify-start items-center">
      {itemStart}
      {children}
      {itemEnd}
    </div>
  );
};

export default SidebarItem;
