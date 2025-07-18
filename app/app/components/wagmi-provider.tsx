"use client";

import { ReactNode } from 'react';
import { cookieToInitialState } from 'wagmi';
import { config } from '../wagmi';
import { Providers } from '../providers';

export function WagmiProvider({ 
  children,
  cookie 
}: { 
  children: ReactNode;
  cookie: string | null;
}) {
  const initialState = cookieToInitialState(
    config,
    cookie
  );

  return (
    <Providers initialState={initialState}>
      {children}
    </Providers>
  );
} 