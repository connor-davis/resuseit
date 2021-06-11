import React, { ReactNode } from 'react';

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
