import { useEffect, useRef } from 'react';

/**
 * Modal component for displaying calculators and reference sheets.
 * Handles key down listeners (Escape to close) and auto-scrolls to calculation results
 * or errors using MutationObserver when children change.
 * 
 * @param {object} props - Component props
 * @param {boolean} props.isOpen - Whether the modal is visible
 * @param {function} props.onClose - Callback when modal is requested to close
 * @param {string} props.title - Title of the modal
 * @param {React.ReactNode} props.children - Modal content elements
 * @returns {React.JSX.Element|null} The rendered Modal overlay
 */
export default function Modal({ isOpen, onClose, title, children }) {
  const modalContentRef = useRef(null);

  // Close modal on Escape key and handle auto-scroll to result
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    let observer;

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';

      // Auto-scroll to result/error when they appear within this modal
      observer = new MutationObserver((mutations) => {
        let shouldScroll = false;
        for (const mutation of mutations) {
          if (mutation.addedNodes.length > 0) {
            const hasNewTarget = Array.from(mutation.addedNodes).some(node =>
              node.nodeType === 1 && (
                node.classList.contains('result') ||
                node.classList.contains('error') ||
                node.querySelector('.result, .error')
              )
            );
            if (hasNewTarget) {
              shouldScroll = true;
              break;
            }
          }
        }

        if (shouldScroll && modalContentRef.current) {
          // Small delay to ensure styles are applied and layout is stable
          setTimeout(() => {
            const resultEl = modalContentRef.current.querySelector('.result, .error');
            if (resultEl) {
              resultEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
          }, 100);
        }
      });

      // Observe the modal content for changes
      if (modalContentRef.current) {
        observer.observe(modalContentRef.current, { childList: true, subtree: true });
      }
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
      if (observer) observer.disconnect();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content" ref={modalContentRef}>
        <div className="modal-header">
          <div className="modal-title">{title}</div>
          <button className="close" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}
