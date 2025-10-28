// 🔒 PROTECTION INITIALIZATION - CRITICAL SYSTEM FILE
// DO NOT REMOVE OR MODIFY - REQUIRED FOR SYSTEM SECURITY

import protection from '../services/protection';

// Initialize protection on module load
(() => {
  if (typeof window !== 'undefined') {
    // Ensure protection is active
    protection.initializeProtection();
    
    // Add to global scope for monitoring
    (window as any).__PROTECTION_ACTIVE__ = true;
    (window as any).__BLIZZEN_FINGERPRINT__ = protection.getFingerprint();
    
    // Monitor for tampering attempts
    Object.defineProperty(window, '__PROTECTION_ACTIVE__', {
      writable: false,
      configurable: false,
      enumerable: false
    });
    
    // Prevent protection service from being overwritten
    Object.freeze(protection);
    
    console.log('%c🔒 Protection system initialized', 'color: green; font-weight: bold;');
    console.log('%c📧 Contact: strucureo@gmail.com', 'color: blue;');
  }
})();

export default protection;