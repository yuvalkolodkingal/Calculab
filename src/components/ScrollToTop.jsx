import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop component ensures that the viewport scrolls back to the top (0,0)
 * whenever a user navigates between routes.
 * 
 * Only triggers on actual router pathname changes, preventing interference with modal opens/closes.
 * 
 * @returns {null} Renders no UI elements
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top when route changes
    // Use auto behavior for instant scroll (widely supported)
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);

  return null;
}
