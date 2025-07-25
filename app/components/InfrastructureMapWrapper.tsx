"use client";

import { Suspense } from 'react';
import dynamic from 'next/dynamic';

const InfrastructureMap = dynamic(
  () => import('./InfrastructureMap'),
  { 
    ssr: false,
    loading: () => (
      <div className="h-96 lg:h-[500px] rounded-xl bg-gray-100 animate-pulse flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat peta infrastruktur hijau...</p>
        </div>
      </div>
    )
  }
);

interface InfrastructureMapWrapperProps {
  className?: string;
}

export default function InfrastructureMapWrapper({ className = '' }: InfrastructureMapWrapperProps) {
  return (
    <Suspense fallback={
      <div className="h-96 lg:h-[500px] rounded-xl bg-gray-100 animate-pulse flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat peta infrastruktur hijau...</p>
        </div>
      </div>
    }>
      <InfrastructureMap className={className} />
    </Suspense>
  );
}
