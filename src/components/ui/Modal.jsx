import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import classNames from 'classnames';
import './Modal.css';

export function Modal({ isOpen, onClose, children, className }) {
  const modalRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (!modalRef.current || !contentRef.current) return;

    if (isOpen) {
      // Prevent body scroll
      document.body.classList.add('modal-open');
      
      // Animate in
      gsap.to(modalRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
      gsap.fromTo(contentRef.current,
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.4)' }
      );
    }

    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [isOpen]);

  const handleClose = () => {
    if (!modalRef.current) return;
    
    gsap.to(modalRef.current, {
      opacity: 0,
      duration: 0.2,
      onComplete: onClose
    });
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      ref={modalRef} 
      className={classNames('modal', className)}
      onClick={handleOverlayClick}
    >
      <div 
        ref={contentRef}
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={handleClose}>
          ×
        </button>
        {children}
      </div>
    </div>
  );
}
