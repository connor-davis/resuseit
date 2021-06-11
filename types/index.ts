import React, { ReactNode } from 'react';

export type ISidebarProps = {
  header?: React.FC;
  footer?: React.FC;
  children?: any;
};

export type ISidebarItemProps = {
  itemStart?: ReactNode[];
  itemEnd?: ReactNode[];
  children?: ReactNode;
};
