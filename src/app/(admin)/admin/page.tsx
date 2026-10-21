import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin area',
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <main>
      <h1>Admin area</h1>
      <p>This frontend sample does not include an administration system.</p>
    </main>
  );
}