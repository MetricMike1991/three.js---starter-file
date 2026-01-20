/**
 * AR Handler Module
 * Handles AR functionality across iOS (USDZ), Android (GLB), and Desktop (QR code)
 * v1.1 - Added branding support for iOS banner and Android link button
 */

export class ARHandler {
    constructor() {
        console.log('[FlexFrame AR] ARHandler initialized');
        this.currentConfig = null;
        this.qrModal = null;
        this.branding = {
            logoUrl: null,
            websiteUrl: 'https://thegymmanagerblog.com',
            companyName: 'FlexFrame',
            callToAction: 'Visit FlexFrame'
        };
        this.setupARButton();
    }

    /**
     * Set branding information for AR experiences
     */
    setBranding(options) {
        if (options.logoUrl) this.branding.logoUrl = options.logoUrl;
        if (options.websiteUrl) this.branding.websiteUrl = options.websiteUrl;
        if (options.companyName) this.branding.companyName = options.companyName;
        if (options.callToAction) this.branding.callToAction = options.callToAction;
        console.log('[FlexFrame AR] Branding updated:', this.branding);
    }

    /**
     * Detect device type
     */
    getDeviceType() {
        const ua = navigator.userAgent.toLowerCase();
        
        if (/iphone|ipad|ipod/.test(ua)) {
            return 'ios';
        } else if (/android/.test(ua)) {
            return 'android';
        } else {
            return 'desktop';
        }
    }

    /**
     * Check if device supports AR
     */
    supportsAR() {
        const deviceType = this.getDeviceType();
        
        if (deviceType === 'ios') {
            // iOS 12+ supports AR Quick Look
            const a = document.createElement('a');
            return a.relList && a.relList.supports && a.relList.supports('ar');
        } else if (deviceType === 'android') {
            // Android supports Scene Viewer
            return true;
        }
        
        return false;
    }

    /**
     * Update AR config when exercise changes
     */
    updateConfig(config) {
        this.currentConfig = config;
        console.log('[FlexFrame AR] Config updated:', config?.ar);
    }

    /**
     * Setup AR button click handler
     */
    setupARButton() {
        // Wait for DOM to be ready
        const setupHandler = () => {
            const arBtn = document.getElementById('ar-btn');
            if (arBtn) {
                arBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    this.launchAR();
                });
                console.log('[FlexFrame AR] AR button handler attached');
            } else {
                // Retry after a short delay (button might be created dynamically)
                setTimeout(setupHandler, 500);
            }
        };
        
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', setupHandler);
        } else {
            setTimeout(setupHandler, 100);
        }
    }

    /**
     * Main AR launch function
     */
    launchAR() {
        console.log('[FlexFrame AR] Launch AR triggered');
        
        if (!this.currentConfig?.ar) {
            console.warn('[FlexFrame AR] No AR config available');
            this.showNoARMessage();
            return;
        }

        const deviceType = this.getDeviceType();
        console.log('[FlexFrame AR] Device type:', deviceType);

        switch (deviceType) {
            case 'ios':
                this.launchIOSAR();
                break;
            case 'android':
                this.launchAndroidAR();
                break;
            case 'desktop':
                this.showQRCodeModal();
                break;
        }
    }

    /**
     * Launch AR on iOS using AR Quick Look (USDZ)
     * Supports custom banner with logo and call-to-action
     */
    launchIOSAR() {
        const usdzUrl = this.currentConfig.ar.usdz;
        
        if (!usdzUrl) {
            console.warn('[FlexFrame AR] No USDZ file available');
            // Fallback to GLB
            this.launchAndroidAR();
            return;
        }

        console.log('[FlexFrame AR] Launching iOS AR with USDZ:', usdzUrl);

        // Build AR Quick Look URL with banner parameters
        // iOS AR Quick Look supports hash parameters for customization
        let arUrl = usdzUrl;
        const hashParams = [];
        
        // Add call-to-action banner (appears at bottom of AR view)
        if (this.branding.websiteUrl) {
            hashParams.push(`callToAction=${encodeURIComponent(this.branding.callToAction)}`);
            hashParams.push(`checkoutTitle=${encodeURIComponent(this.branding.companyName)}`);
            hashParams.push(`checkoutSubtitle=${encodeURIComponent('Tap to visit website')}`);
            // The banner links to this URL when tapped
            hashParams.push(`canonicalWebPageURL=${encodeURIComponent(this.branding.websiteUrl)}`);
        }
        
        // Add custom banner image if logo is available
        if (this.branding.logoUrl) {
            hashParams.push(`custom=${encodeURIComponent(this.branding.logoUrl)}`);
        }
        
        // Append hash parameters to URL
        if (hashParams.length > 0) {
            arUrl += '#' + hashParams.join('&');
        }

        console.log('[FlexFrame AR] iOS AR URL with branding:', arUrl);

        // Create an invisible anchor with rel="ar" for AR Quick Look
        const anchor = document.createElement('a');
        anchor.setAttribute('rel', 'ar');
        anchor.setAttribute('href', arUrl);
        
        // iOS requires an image as the anchor content
        const img = document.createElement('img');
        img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
        img.style.width = '1px';
        img.style.height = '1px';
        anchor.appendChild(img);
        
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
    }

    /**
     * Launch AR on Android using Scene Viewer (GLB)
     * Supports branded link button at bottom of AR view
     */
    launchAndroidAR() {
        const glbUrl = this.currentConfig.ar.glb;
        
        if (!glbUrl) {
            console.warn('[FlexFrame AR] No GLB file available for AR');
            this.showNoARMessage();
            return;
        }

        console.log('[FlexFrame AR] Launching Android AR with GLB:', glbUrl);

        // Build Scene Viewer URL with branding parameters
        let sceneViewerParams = [
            `file=${encodeURIComponent(glbUrl)}`,
            `mode=ar_preferred`,
            `title=${encodeURIComponent(this.currentConfig.exerciseId || 'Exercise')}`
        ];
        
        // Add branded link button (appears at bottom of AR view)
        if (this.branding.websiteUrl) {
            sceneViewerParams.push(`link=${encodeURIComponent(this.branding.websiteUrl)}`);
            sceneViewerParams.push(`linkText=${encodeURIComponent(this.branding.callToAction)}`);
        }

        // Use Google's Scene Viewer intent
        const intentUrl = `intent://arvr.google.com/scene-viewer/1.0?` +
            sceneViewerParams.join('&') +
            `#Intent;scheme=https;package=com.google.android.googlequicksearchbox;` +
            `action=android.intent.action.VIEW;` +
            `S.browser_fallback_url=${encodeURIComponent(glbUrl)};end;`;

        console.log('[FlexFrame AR] Android AR URL with branding:', intentUrl);
        window.location.href = intentUrl;
    }

    /**
     * Show QR code modal for desktop users
     */
    showQRCodeModal() {
        console.log('[FlexFrame AR] Showing QR code modal for desktop');
        
        // Create modal if it doesn't exist
        if (!this.qrModal) {
            this.createQRModal();
        }

        // Generate QR code URL - this would link to a mobile AR viewer page
        const arPageUrl = this.generateARPageUrl();
        
        // Update QR code
        this.updateQRCode(arPageUrl);
        
        // Show modal
        this.qrModal.style.display = 'flex';
    }

    /**
     * Create the QR code modal
     */
    createQRModal() {
        this.qrModal = document.createElement('div');
        this.qrModal.id = 'ar-qr-modal';
        this.qrModal.innerHTML = `
            <div class="ar-qr-modal-overlay" style="
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.85);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                backdrop-filter: blur(10px);
            ">
                <div class="ar-qr-modal-content" style="
                    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
                    border-radius: 20px;
                    padding: 40px;
                    text-align: center;
                    max-width: 400px;
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
                    border: 1px solid rgba(74, 158, 255, 0.3);
                ">
                    <div class="ar-qr-header" style="margin-bottom: 24px;">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" style="margin-bottom: 16px;">
                            <path d="M3 4v6h2V6h4V4H3zm18 0h-6v2h4v4h2V4zM3 20v-6h2v4h4v2H3zm18 0h-6v-2h4v-4h2v6z" fill="#4a9eff"/>
                            <path d="M12 8l-4 6h3v4h2v-4h3l-4-6z" fill="#4a9eff"/>
                        </svg>
                        <h2 style="
                            color: white;
                            font-size: 24px;
                            font-weight: 700;
                            margin: 0 0 8px 0;
                        ">View in AR</h2>
                        <p style="
                            color: rgba(255, 255, 255, 0.7);
                            font-size: 14px;
                            margin: 0;
                        ">Scan with your phone to view in augmented reality</p>
                    </div>
                    
                    <div id="ar-qr-code" style="
                        background: white;
                        padding: 20px;
                        border-radius: 12px;
                        display: inline-block;
                        margin-bottom: 24px;
                    ">
                        <!-- QR code will be inserted here -->
                        <div style="width: 200px; height: 200px; background: #f0f0f0; display: flex; align-items: center; justify-content: center;">
                            <span style="color: #666; font-size: 12px;">Loading QR...</span>
                        </div>
                    </div>
                    
                    <div class="ar-qr-instructions" style="
                        color: rgba(255, 255, 255, 0.6);
                        font-size: 12px;
                        margin-bottom: 24px;
                    ">
                        <p style="margin: 0 0 8px 0;"><strong style="color: white;">iOS:</strong> Open Camera app and point at QR code</p>
                        <p style="margin: 0;"><strong style="color: white;">Android:</strong> Use Google Lens or QR scanner</p>
                    </div>
                    
                    <button id="ar-qr-close" style="
                        background: rgba(255, 255, 255, 0.1);
                        border: 1px solid rgba(255, 255, 255, 0.2);
                        color: white;
                        padding: 12px 32px;
                        border-radius: 8px;
                        font-size: 14px;
                        font-weight: 600;
                        cursor: pointer;
                        transition: all 0.2s ease;
                    ">Close</button>
                </div>
            </div>
        `;

        document.body.appendChild(this.qrModal);

        // Close button handler
        const closeBtn = this.qrModal.querySelector('#ar-qr-close');
        closeBtn.addEventListener('click', () => {
            this.qrModal.style.display = 'none';
        });

        // Close on overlay click
        const overlay = this.qrModal.querySelector('.ar-qr-modal-overlay');
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                this.qrModal.style.display = 'none';
            }
        });

        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.qrModal.style.display === 'flex') {
                this.qrModal.style.display = 'none';
            }
        });
    }

    /**
     * Generate AR page URL for QR code
     */
    generateARPageUrl() {
        // Create a URL that will work on mobile for AR
        const glbUrl = this.currentConfig?.ar?.glb || this.currentConfig?.modelUrlSQ;
        const usdzUrl = this.currentConfig?.ar?.usdz;
        const exerciseId = this.currentConfig?.exerciseId || 'exercise';

        // Create AR viewer URL parameters
        const arParams = new URLSearchParams({
            glb: glbUrl || '',
            usdz: usdzUrl || '',
            title: exerciseId
        });

        // Use the AR viewer page from the WordPress plugin
        // This is located at /wp-content/plugins/flexframe-v28/viewer/ar-viewer.html
        const baseUrl = window.location.origin;
        const arViewerPath = '/wp-content/plugins/flexframe-v28/viewer/ar-viewer.html';
        
        return `${baseUrl}${arViewerPath}?${arParams.toString()}`;
    }

    /**
     * Update QR code with URL
     */
    updateQRCode(url) {
        const qrContainer = document.getElementById('ar-qr-code');
        if (!qrContainer) return;

        // Generate QR code using a simple canvas approach or use an external library
        // For now, we'll use Google Charts API for QR generation (simple solution)
        const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(url)}`;
        
        qrContainer.innerHTML = `
            <img src="${qrImageUrl}" alt="Scan to view in AR" style="width: 200px; height: 200px; display: block;">
        `;

        console.log('[FlexFrame AR] QR code generated for URL:', url);
    }

    /**
     * Show message when AR is not available
     */
    showNoARMessage() {
        alert('AR is not available for this exercise. Please ensure the exercise has AR models configured.');
    }

    /**
     * Hide QR modal
     */
    hideQRModal() {
        if (this.qrModal) {
            this.qrModal.style.display = 'none';
        }
    }
}

// Export singleton instance
export const arHandler = new ARHandler();
