import { Outlet } from 'react-router-dom';

const RootLayout = () => {
  return (
    <div className="root-layout">
      <Outlet />
    </div>
  );
};

export default RootLayout;