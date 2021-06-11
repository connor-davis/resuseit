import { ISidebarProps } from '../../types';
import React from 'react';

let Sidebar = ({ header, footer, children }: ISidebarProps) => {
  return (
    <div className="flex flex-col border-r border-gray-300 dark:border-gray-800 hidden md:flex">
      <div className="relative overflow-y-auto flex-col w-64 relative h-full">
        {children}
      </div>
      <div>{footer}</div>
    </div>
  );
};

export default Sidebar;
