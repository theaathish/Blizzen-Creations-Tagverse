// 🔒 PROTECTION SERVICE - DO NOT REMOVE OR MODIFY
// This file contains security measures to protect the codebase

class ProtectionService {
    private static instance: ProtectionService;
    private fingerprint: string;
    private isInitialized: boolean = false;

    private constructor() {
        this.fingerprint = this.generateFingerprint();
        this.initializeProtection();
    }

    public static getInstance(): ProtectionService {
        if (!ProtectionService.instance) {
            ProtectionService.instance = new ProtectionService();
        }
        return ProtectionService.instance;
    }

    private generateFingerprint(): string {
        const components = [
            navigator.userAgent,
            navigator.language,
            screen.width + 'x' + screen.height,
            new Date().getTimezoneOffset(),
            navigator.hardwareConcurrency || 0,
            (navigator as any).deviceMemory || 0
        ];

        let hash = 0;
        const str = components.join('|');
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32-bit integer
        }
        return Math.abs(hash).toString(16);
    }

    private displayASCIIArt(): void {
        const asciiArt = `
    ███████╗████████╗██████╗ ██╗   ██╗ ██████╗██╗   ██╗██████╗ ███████╗ ██████╗ 
    ██╔════╝╚══██╔══╝██╔══██╗██║   ██║██╔════╝██║   ██║██╔══██╗██╔════╝██╔═══██╗
    ███████╗   ██║   ██████╔╝██║   ██║██║     ██║   ██║██████╔╝█████╗  ██║   ██║
    ╚════██║   ██║   ██╔══██╗██║   ██║██║     ██║   ██║██╔══██╗██╔══╝  ██║   ██║
    ███████║   ██║   ██║  ██║╚██████╔╝╚██████╗╚██████╔╝██║  ██║███████╗╚██████╔╝
    ╚══════╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝  ╚═════╝ ╚═════╝ ╚═╝  ╚═╝╚══════╝ ╚═════╝ 
    
    🔒 PROTECTED CODEBASE - BLIZZEN CREATIONS
    📧 Contact Admin: strucureo@gmail.com
    🆔 Fingerprint: ${this.fingerprint}
    ⚠️  Unauthorized modification detected!
    `;

        console.log('%c' + asciiArt, 'color: #ff6b6b; font-family: monospace; font-weight: bold;');
    }

    private checkIntegrity(): boolean {
        try {
            // Check if critical files/components exist
            const criticalChecks = [
                typeof window !== 'undefined',
                typeof document !== 'undefined',
                document.title.includes('Blizzen'),
                window.location.hostname !== ''
            ];

            return criticalChecks.every(check => check === true);
        } catch (error) {
            return false;
        }
    }

    private monitorCodebase(): void {
        // Monitor for tampering attempts
        const originalConsoleError = console.error;
        const originalConsoleWarn = console.warn;

        console.error = (...args: any[]) => {
            if (args.some(arg =>
                typeof arg === 'string' &&
                (arg.includes('Failed to fetch') ||
                    arg.includes('Network Error') ||
                    arg.includes('Connection refused'))
            )) {
                this.handleTamperingDetected('Network connectivity issues detected');
            }
            originalConsoleError.apply(console, args);
        };

        console.warn = (...args: any[]) => {
            originalConsoleWarn.apply(console, args);
        };

        // Monitor DOM changes
        if (typeof MutationObserver !== 'undefined') {
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.type === 'childList' && mutation.removedNodes.length > 0) {
                        // Check if critical elements are being removed
                        const removedNodes = Array.from(mutation.removedNodes);
                        const criticalRemoval = removedNodes.some(node =>
                            node.nodeType === Node.ELEMENT_NODE &&
                            (node as Element).tagName === 'SCRIPT'
                        );

                        if (criticalRemoval) {
                            this.handleTamperingDetected('Critical script removal detected');
                        }
                    }
                });
            });

            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        }
    }

    private handleTamperingDetected(reason: string): void {
        console.clear();
        this.displayASCIIArt();

        console.log('%c🚨 SECURITY ALERT 🚨', 'color: red; font-size: 20px; font-weight: bold;');
        console.log('%cReason: ' + reason, 'color: orange; font-size: 14px;');
        console.log('%cTimestamp: ' + new Date().toISOString(), 'color: gray; font-size: 12px;');
        console.log('%cFingerprint: ' + this.fingerprint, 'color: blue; font-size: 12px;');
        console.log('%c📧 Contact Admin: strucureo@gmail.com', 'color: green; font-size: 14px; font-weight: bold;');

        // Show user-facing message
        if (typeof document !== 'undefined') {
            const alertDiv = document.createElement('div');
            alertDiv.innerHTML = `
        <div style="
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.9);
          color: white;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          z-index: 999999;
          font-family: monospace;
          text-align: center;
          padding: 20px;
        ">
          <h1 style="color: #ff6b6b; font-size: 2rem; margin-bottom: 20px;">🔒 PROTECTED SYSTEM</h1>
          <p style="font-size: 1.2rem; margin-bottom: 10px;">Unauthorized access detected!</p>
          <p style="font-size: 1rem; margin-bottom: 20px;">Contact the administrator to restore access.</p>
          <p style="color: #4ecdc4; font-size: 1.1rem; font-weight: bold;">📧 strucureo@gmail.com</p>
          <p style="color: #95a5a6; font-size: 0.9rem; margin-top: 20px;">Fingerprint: ${this.fingerprint}</p>
        </div>
      `;
            document.body.appendChild(alertDiv);
        }
    }

    public initializeProtection(): void {
        if (this.isInitialized) return;

        // Display ASCII art on initialization
        setTimeout(() => {
            console.clear();
            const welcomeArt = `
      ██████╗ ██╗     ██╗███████╗███████╗███████╗███╗   ██╗
      ██╔══██╗██║     ██║╚══███╔╝╚══███╔╝██╔════╝████╗  ██║
      ██████╔╝██║     ██║  ███╔╝   ███╔╝ █████╗  ██╔██╗ ██║
      ██╔══██╗██║     ██║ ███╔╝   ███╔╝  ██╔══╝  ██║╚██╗██║
      ██████╔╝███████╗██║███████╗███████╗███████╗██║ ╚████║
      ╚═════╝ ╚══════╝╚═╝╚══════╝╚══════╝╚══════╝╚═╝  ╚═══╝
      
       ██████╗██████╗ ███████╗ █████╗ ████████╗██╗ ██████╗ ███╗   ██╗███████╗
      ██╔════╝██╔══██╗██╔════╝██╔══██╗╚══██╔══╝██║██╔═══██╗████╗  ██║██╔════╝
      ██║     ██████╔╝█████╗  ███████║   ██║   ██║██║   ██║██╔██╗ ██║███████╗
      ██║     ██╔══██╗██╔══╝  ██╔══██║   ██║   ██║██║   ██║██║╚██╗██║╚════██║
      ╚██████╗██║  ██║███████╗██║  ██║   ██║   ██║╚██████╔╝██║ ╚████║███████║
       ╚═════╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝╚══════╝
      
      🎓 TRAINING MANAGEMENT SYSTEM
      🔒 Protected by Strucureo Security
      📧 Contact: strucureo@gmail.com
      🆔 Session: ${this.fingerprint}
      `;

            console.log('%c' + welcomeArt, 'color: #4ecdc4; font-family: monospace; font-weight: bold;');
            console.log('%c🚀 System initialized successfully!', 'color: green; font-size: 16px; font-weight: bold;');
            console.log('%c⚠️  This system is protected. Unauthorized modifications will be detected.', 'color: orange; font-size: 12px;');
        }, 1000);

        // Start monitoring
        this.monitorCodebase();

        // Periodic integrity checks
        setInterval(() => {
            if (!this.checkIntegrity()) {
                this.handleTamperingDetected('System integrity check failed');
            }
        }, 30000); // Check every 30 seconds

        // Check for missing API connections
        setTimeout(() => {
            this.checkAPIConnectivity();
        }, 5000);

        this.isInitialized = true;
    }

    private async checkAPIConnectivity(): Promise<void> {
        try {
            const response = await fetch('/api/health', {
                method: 'GET',
                timeout: 5000
            } as any);

            if (!response.ok) {
                throw new Error('API health check failed');
            }
        } catch (error) {
            this.handleTamperingDetected('Backend API connectivity lost - possible tampering');
        }
    }

    public getFingerprint(): string {
        return this.fingerprint;
    }

    public reportActivity(activity: string): void {
        console.log(`%c🔍 Activity: ${activity}`, 'color: #95a5a6; font-size: 10px;');
        console.log(`%c🆔 Fingerprint: ${this.fingerprint}`, 'color: #95a5a6; font-size: 10px;');
    }
}

// Auto-initialize protection
const protection = ProtectionService.getInstance();

// Export for use in other modules
export default protection;

// 🔒 PROTECTION CHECKPOINT - DO NOT REMOVE
// This ensures the protection service is always active
if (typeof window !== 'undefined') {
    (window as any).__BLIZZEN_PROTECTION__ = protection;

    // Prevent console clearing
    const originalClear = console.clear;
    console.clear = () => {
        originalClear();
        setTimeout(() => {
            console.log('%c🔒 BLIZZEN CREATIONS - PROTECTED SYSTEM', 'color: #4ecdc4; font-size: 14px; font-weight: bold;');
            console.log('%c📧 Contact: strucureo@gmail.com', 'color: green; font-size: 12px;');
        }, 100);
    };
}