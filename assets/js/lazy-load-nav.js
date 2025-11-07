/**
 * Lazy-Load Top Navigation Script
 * 
 * This script defers loading of the top navigation until:
 * - Browser idle time (requestIdleCallback with 2000ms timeout)
 * - First meaningful user interaction (touchstart, mousemove, keydown)
 * - Focus on navigation placeholder (keyboard accessibility)
 * - Fallback: window.load + 1200ms
 * 
 * Features:
 * - Preserves keyboard accessibility
 * - Graceful fallback on fetch failure
 * - Respects prefers-reduced-motion
 * - Single load guard to prevent duplicate loading
 */

(function() {
    'use strict';

    // Guard to ensure nav only loads once
    let navLoaded = false;
    let loadingInProgress = false;

    const NAV_PLACEHOLDER_ID = 'nav-placeholder';
    const NAV_PARTIAL_URL = '/assets/partials/top-nav.html';
    const LOAD_DELAY_AFTER_WINDOW_LOAD = 1200; // ms
    const IDLE_TIMEOUT = 2000; // ms

    /**
     * Get the navigation placeholder element
     */
    function getPlaceholder() {
        return document.getElementById(NAV_PLACEHOLDER_ID);
    }

    /**
     * Create fallback navigation on fetch failure
     */
    function createFallbackNav() {
        const nav = document.createElement('nav');
        nav.className = 'nav-menu';
        nav.setAttribute('role', 'navigation');
        nav.setAttribute('aria-label', 'Main Navigation');
        nav.style.cssText = 'display: flex; gap: 10px; padding: 10px 20px; background: rgba(6, 34, 46, 0.85); border-radius: 8px;';
        
        const links = [
            { href: '#home', text: 'Lǎo Shīfu' },
            { href: '#spotlight', text: 'Spotlight' },
            { href: '#nft-gallery', text: 'NFT Gallery' },
            { href: '#lore', text: 'SupraVerse' },
            { href: '#powerlevel', text: 'Powerlevel' },
            { href: '#saiyans-9000', text: 'Over 9000' }
        ];

        links.forEach(linkData => {
            const link = document.createElement('a');
            link.href = linkData.href;
            link.textContent = linkData.text;
            link.className = 'nav-link';
            link.style.cssText = 'color: #ffffff; text-decoration: none; padding: 8px 12px; white-space: nowrap;';
            nav.appendChild(link);
        });

        return nav;
    }

    /**
     * Load and inject the navigation HTML
     */
    function loadNavigation() {
        // Guard against multiple loads
        if (navLoaded || loadingInProgress) {
            return;
        }
        loadingInProgress = true;

        const placeholder = getPlaceholder();
        if (!placeholder) {
            console.warn('Navigation placeholder not found');
            loadingInProgress = false;
            return;
        }

        // Fetch the navigation partial
        fetch(NAV_PARTIAL_URL, { 
            cache: 'no-store',
            headers: {
                'Accept': 'text/html'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load navigation: ${response.status}`);
            }
            return response.text();
        })
        .then(html => {
            // Create a temporary container to parse HTML
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = html.trim();
            
            // Get the nav element
            const navElement = tempDiv.querySelector('nav');
            if (!navElement) {
                throw new Error('No nav element found in partial');
            }

            // Check for prefers-reduced-motion
            const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            
            // Inject the navigation
            placeholder.parentNode.replaceChild(navElement, placeholder);
            
            // Mark as loaded
            navLoaded = true;
            loadingInProgress = false;

            // Run initialization function if it exists
            if (typeof window.initTopNav === 'function') {
                window.initTopNav();
            }

            // Add subtle entrance animation if motion is allowed
            if (!prefersReducedMotion) {
                navElement.style.opacity = '0';
                navElement.style.transform = 'translateY(-10px)';
                
                // Force reflow
                navElement.offsetHeight;
                
                // Animate in
                navElement.style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out';
                navElement.style.opacity = '1';
                navElement.style.transform = 'translateY(0)';
                
                // Clean up inline styles after animation
                setTimeout(() => {
                    navElement.style.removeProperty('opacity');
                    navElement.style.removeProperty('transform');
                    navElement.style.removeProperty('transition');
                }, 300);
            }
        })
        .catch(error => {
            console.error('Error loading navigation:', error);
            
            // Use fallback navigation
            const fallbackNav = createFallbackNav();
            placeholder.parentNode.replaceChild(fallbackNav, placeholder);
            
            navLoaded = true;
            loadingInProgress = false;
        });
    }

    /**
     * Remove event listeners after navigation is loaded
     */
    function removeInteractionListeners() {
        document.removeEventListener('touchstart', loadNavigation, { passive: true });
        document.removeEventListener('mousemove', loadNavigation, { passive: true });
        document.removeEventListener('keydown', loadNavigation);
    }

    /**
     * Set up interaction-based loading
     */
    function setupInteractionLoading() {
        // Load on first touch
        document.addEventListener('touchstart', function onTouch() {
            loadNavigation();
            removeInteractionListeners();
        }, { passive: true, once: true });

        // Load on first mouse movement
        document.addEventListener('mousemove', function onMouseMove() {
            loadNavigation();
            removeInteractionListeners();
        }, { passive: true, once: true });

        // Load on first keyboard interaction
        document.addEventListener('keydown', function onKeyDown() {
            loadNavigation();
            removeInteractionListeners();
        }, { once: true });
    }

    /**
     * Set up focus-based loading for keyboard accessibility
     */
    function setupFocusLoading() {
        const placeholder = getPlaceholder();
        if (!placeholder) {
            return;
        }

        // Make placeholder focusable
        placeholder.setAttribute('tabindex', '0');
        placeholder.setAttribute('role', 'navigation');
        placeholder.setAttribute('aria-label', 'Main Navigation (loading)');

        // Load immediately if placeholder receives focus
        placeholder.addEventListener('focus', function onFocus() {
            loadNavigation();
        }, { once: true });

        // Also watch for focus within placeholder
        placeholder.addEventListener('focusin', function onFocusIn() {
            loadNavigation();
        }, { once: true });
    }

    /**
     * Initialize lazy loading
     */
    function init() {
        // Ensure placeholder exists
        if (!getPlaceholder()) {
            console.warn('Navigation placeholder not found, skipping lazy load');
            return;
        }

        // Set up focus-based loading for keyboard users
        setupFocusLoading();

        // Set up interaction-based loading
        setupInteractionLoading();

        // Try to load on idle if supported
        if ('requestIdleCallback' in window) {
            requestIdleCallback(
                () => {
                    loadNavigation();
                    removeInteractionListeners();
                },
                { timeout: IDLE_TIMEOUT }
            );
        } else {
            // Fallback: load after window load + delay
            if (document.readyState === 'complete') {
                setTimeout(() => {
                    loadNavigation();
                    removeInteractionListeners();
                }, LOAD_DELAY_AFTER_WINDOW_LOAD);
            } else {
                window.addEventListener('load', function() {
                    setTimeout(() => {
                        loadNavigation();
                        removeInteractionListeners();
                    }, LOAD_DELAY_AFTER_WINDOW_LOAD);
                }, { once: true });
            }
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
