import { ReactNode } from 'react';

interface MainBackgroundProps {
  children: ReactNode;
}

function MainBackground({ children }: MainBackgroundProps) {
  return (
    <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
      {children}
    </div>
  );
}

export default MainBackground;
