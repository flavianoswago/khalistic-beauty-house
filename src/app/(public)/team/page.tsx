import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Team',
  description: 'Meet the fictional beauty professionals for The Khalistic Beauty House and explore their sample specialties.',
  openGraph: {
    title: 'Our Team',
    description: 'Meet the fictional beauty professionals for The Khalistic Beauty House and explore their sample specialties.',
    images: [{ url: '/images/team/amara-portrait.jpg', alt: 'Representative stock portrait from the fictional team' }],
  },
};
import { Breadcrumbs } from '../../../components/ui/breadcrumbs';
import { staff } from '../../../data/staff';
import { StaffCard } from '../../../components/team/staff-card';
import { Container } from '../../../components/ui/container';
import { SectionHeading } from '../../../components/ui/section-heading';

export default function TeamPage() {
  return <main className="team-page"><section className="team-intro"><Container size="wide"><Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Our team' }]} /><SectionHeading as="h1" eyebrow="Meet the team � fictional profiles" title="Good hands. Kind hearts." description="Meet the imagined professionals behind The Khalistic Beauty House sample studio concept." /><p className="team-disclosure">All names, biographies and roles below are fictional. Portraits are representative stock photography and do not depict actual staff.</p></Container></section><section className="team-list"><Container size="wide"><div className="team-grid">{staff.map((profile) => <StaffCard profile={profile} selectHref={`/booking?staff=${encodeURIComponent(profile.id)}`} key={profile.id} />)}</div><p className="team-selection-note">Selecting a professional opens the sample booking preview with their name preselected.</p></Container></section></main>;
}
