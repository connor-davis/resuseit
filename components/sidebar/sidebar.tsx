import { ISidebarProps } from '../../types';
import React from 'react';
import SidebarItem from './sidebarItem';

let Sidebar: React.FC = ({ header, footer, children }: ISidebarProps) => {
  return (
    <div className="hidden md:flex md:w-64 h-full">
      <SidebarItem
        itemStart={[
          <div className="flex text-green-500 w-auto h-auto">Hello World</div>,
        ]}
        itemEnd={[
          <div className="flex text-green-500 w-auto h-auto">Hello World</div>,
        ]}
      >
        Hello World
      </SidebarItem>
    </div>
  );
};

export default Sidebar;
