import React, { useEffect } from 'react';
import { Toaster } from 'sonner';
import { useThemeStore } from '../store/themeStore';

export const AppProviders = ({ children }) => {
  const theme = useThemeStore((state) => state.theme);

  useEffect(() => {
    // Sync theme class on documentElement
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  return (
    <>
      {children}
      <Toaster
        richColors
        position="top-right"
        theme={theme === 'dark' ? 'dark' : 'light'}
        closeButton
      />
    </>
  );
};

export default AppProviders;

