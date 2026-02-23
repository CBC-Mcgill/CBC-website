import Link from 'next/link';
import { NavIndicator } from '@/components/navigation/NavIndicator';

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container">
        <Link className="logo" href="/">
          <span className="logo-mark">CBC</span>
          <span className="logo-text">Claude Builder Club</span>
          <span className="logo-sub">McGill University</span>
        </Link>
        <NavIndicator />
      </div>
    </header>
  );
}
