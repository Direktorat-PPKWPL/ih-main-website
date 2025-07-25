import { cookies } from 'next/headers';
import { verifyAccessToken } from '@/lib/auth';
import { redirect } from 'next/navigation';
import NewDashboardLayout from '@/app/components/NewDashboardLayout';
import SettingsContent from './SettingsContent';

export default async function SettingsPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth-token')?.value;

  if (!token) {
    redirect('/login');
  }

  const user = verifyAccessToken(token);
  if (!user || user.role !== 'High') {
    redirect('/login');
  }

  return (
    <NewDashboardLayout 
      user={{ email: user.email, role: user.role }} 
      title="Pengaturan"
    >
      <SettingsContent />
    </NewDashboardLayout>
  );
}
