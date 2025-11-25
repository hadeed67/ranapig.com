import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

/**
 * Custom hook for GSAP animations with automatic cleanup
 * @param {Function} animationFn - Animation function that receives gsap context
 * @param {Array} dependencies - Dependencies array for re-running animation
 * @returns {Object} Ref object to attach to animated element
 */
export function useGSAP(animationFn, dependencies = []) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    // Create GSAP context for automatic cleanup
    const ctx = gsap.context(() => {
      animationFn(gsap);
    }, ref);

    // Cleanup on unmount or dependency change
    return () => ctx.revert();
  }, dependencies);

  return ref;
}
