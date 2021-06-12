import { ReactNode } from 'react';

export const IUserType = {
  ADMIN: 'Admin',
  STAFF: 'Staff',
  COLLECTOR: 'Collector',
};

export type INavbarProps = { title?: string; children?: ReactNode };

export type ISidebarProps = {
  header?: JSX.Element;
  footer?: JSX.Element;
  children?: any;
};

export type ISidebarItemProps = {
  path?: string;
  itemStart?: JSX.Element[];
  itemEnd?: JSX.Element[];
  children?: ReactNode;
};
