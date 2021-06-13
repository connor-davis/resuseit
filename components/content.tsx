import CollectionsPage from '../pages/page/collections';
import React from 'react';
import { Route } from 'react-router-dom';

let Content: React.FC = () => {
  return (
    <div className="relative w-full h-full flex flex-col z-0">
      <Route path="/page/collections" component={() => <CollectionsPage />} />
      <Route path="/page/collectors">Collectors Page</Route>
      <Route path="/page/users">Users Page</Route>
      <Route path="/page/items">Items Page</Route>
    </div>
  );
};

export default Content;
