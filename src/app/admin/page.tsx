'use client';
import { useAuth } from '@/components/Auth/Context/AuthContext';
import LoadingSpinner from '@/components/LoadingSpinner';
import AdminChart from 'components/Admin';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const Admin = () => {
  const { user, isLogin, isLoading } = useAuth();
  const { push } = useRouter();
  useEffect(() => {
    console.log(user);
    if (!isLoading) {
      if (!user) push('/login');
      if (user && user?.admin == null) push('/');
    }
  });

  return !isLogin || (isLogin && user?.admin == null) ? (
    <div className='relative flex flex-row h-screen'>
      <LoadingSpinner />
    </div>
  ) : (
    <AdminChart />
  );
};

export default Admin;
