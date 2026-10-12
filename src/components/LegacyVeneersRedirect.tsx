import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getLegacyVeneersPath } from '@/constants/legacyVeneers';

/** Covers programmatic navigation, such as selecting a main-site search result. */
const LegacyVeneersRedirect = () => {
  const { pathname, search, hash } = useLocation();
  const archivePath = getLegacyVeneersPath(pathname);

  useEffect(() => {
    if (archivePath) window.location.replace(`${archivePath}${search}${hash}`);
  }, [archivePath, search, hash]);

  return null;
};

export default LegacyVeneersRedirect;
