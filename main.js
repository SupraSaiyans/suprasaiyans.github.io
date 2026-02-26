        // Medium RSS Feed Integration - Deferred loading
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', loadMediumFeed);
        } else {
            loadMediumFeed();
        }
        
        function loadMediumFeed() {
            // Delay medium feed loading to not block initial render
            setTimeout(function() {
                (function() {
                    const MEDIUM_USERNAME = 'suprasaiyans';
                    const MEDIUM_RSS_URL = `https://medium.com/feed/@${MEDIUM_USERNAME}`;
                    const RSS_TO_JSON_API = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(MEDIUM_RSS_URL)}`;
                    const MAX_ARTICLES = 6;

                    const loadingElement = document.getElementById('medium-feed-loading');
                    const errorElement = document.getElementById('medium-feed-error');
                    const articlesContainer = document.getElementById('medium-feed-articles');

                    function formatDate(dateString) {
                        const date = new Date(dateString);
                        const options = { year: 'numeric', month: 'short', day: 'numeric' };
                        return date.toLocaleDateString('en-US', options);
                    }

                    function stripHtml(html) {
                        const tmp = document.createElement('DIV');
                        tmp.innerHTML = html;
                        return tmp.textContent || tmp.innerText || '';
                    }

                    function truncateText(text, maxLength) {
                        if (text.length <= maxLength) return text;
                        return text.substr(0, maxLength).trim() + '...';
                    }

                    function createArticleCard(article) {
                        const description = stripHtml(article.description);
                        const truncatedDescription = truncateText(description, 120);

                        return `
                    <article class="medium-article">
                        <div class="medium-article-thumbnail">
                            <img src="fractal-artifact.svg" alt="SupraVerse Artifact" class="medium-icon">
                        </div>
                        <div class="medium-article-info">
                            <h4>
                                <a href="${article.link}" target="_blank" rel="noopener noreferrer">
                                    ${article.title}
                                </a>
                            </h4>
                            <div class="medium-article-date">${formatDate(article.pubDate)}</div>
                        </div>
                        <div class="medium-article-actions">
                            <a href="${article.link}" class="medium-article-action" target="_blank" rel="noopener noreferrer">
                                <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                                    <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
                                </svg>
                                Read
                            </a>
                            <a href="https://medium.com/@suprasaiyans" class="medium-article-action share" target="_blank" rel="noopener noreferrer">
                                <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                                    <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/>
                                </svg>
                                Share
                            </a>
                        </div>
                    </article>
                `;
            }

            function displayArticles(articles) {
                loadingElement.style.display = 'none';
                errorElement.style.display = 'none';
                
                if (!articles || articles.length === 0) {
                    errorElement.style.display = 'block';
                    return;
                }

                const limitedArticles = articles.slice(0, MAX_ARTICLES);
                articlesContainer.innerHTML = limitedArticles
                    .map(article => createArticleCard(article))
                    .join('');
            }

            function displayError() {
                loadingElement.style.display = 'none';
                errorElement.style.display = 'block';
            }

                    // Fetch Medium articles
                    fetch(RSS_TO_JSON_API)
                        .then(response => {
                            if (!response.ok) {
                                throw new Error('Network response was not ok');
                            }
                            return response.json();
                        })
                        .then(data => {
                            if (data.status === 'ok' && data.items) {
                                displayArticles(data.items);
                            } else {
                                displayError();
                            }
                        })
                        .catch(error => {
                            console.error('Error fetching Medium articles:', error);
                            displayError();
                        });
                })();
            }, 1000); // Delay by 1 second to prioritize critical rendering
        }

        (function() {
            'use strict';
            
            // Configuration
            const COOKIE_CONSENT_KEY = 'ssy_cookie_consent';
            const POLICY_VERSION = 'v1.0-2025-10-16';
            
            // DOM Elements
            const consentBanner = document.getElementById('cookie-consent-banner');
            const privacySettingsBtn = document.getElementById('privacy-settings-btn');
            const privacyModal = document.getElementById('privacy-modal');
            const acceptBtn = document.getElementById('accept-cookies');
            const declineBtn = document.getElementById('decline-cookies');
            const manageBtn = document.getElementById('manage-cookies');
            const viewPolicyLink = document.getElementById('view-privacy-policy');
            const closeModalBtn = document.getElementById('close-privacy-modal');
            
            // Check if consent is already given
            function getConsent() {
                const stored = localStorage.getItem(COOKIE_CONSENT_KEY);
                if (!stored) return null;
                
                try {
                    return JSON.parse(stored);
                } catch (e) {
                    return null;
                }
            }
            
            // Save consent to localStorage
            function saveConsent(consent) {
                const consentData = {
                    ...consent,
                    timestamp: new Date().toISOString(),
                    policyVersion: POLICY_VERSION
                };
                localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consentData));
            }
            
            // Show/hide cookie banner
            function showBanner() {
                setTimeout(() => {
                    consentBanner.classList.add('show');
                }, 500);
            }
            
            function hideBanner() {
                consentBanner.classList.remove('show');
                privacySettingsBtn.classList.add('show');
            }
            
            // Show/hide privacy modal
            function showPrivacyModal() {
                privacyModal.classList.add('show');
                document.body.style.overflow = 'hidden';
            }
            
            function hidePrivacyModal() {
                privacyModal.classList.remove('show');
                document.body.style.overflow = '';
            }
            
            // Handle Accept All
            function acceptAllCookies() {
                saveConsent({
                    essential: true,
                    analytics: true,
                    marketing: true,
                    preferences: true
                });
                hideBanner();
                
                // Here you can enable analytics/tracking scripts
                // Example: enableAnalytics();
            }
            
            // Handle Decline Optional
            function declineOptionalCookies() {
                saveConsent({
                    essential: true,
                    analytics: false,
                    marketing: false,
                    preferences: false
                });
                hideBanner();
            }
            
            // Handle Manage Preferences (show modal with options)
            function managePreferences() {
                // For now, just show the privacy policy
                // In a full implementation, you'd show a preferences interface
                showPrivacyModal();
            }
            
            // Initialize
            function init() {
                const consent = getConsent();
                
                // Check if we need to show the banner
                // Show if: no consent OR policy version changed
                if (!consent || consent.policyVersion !== POLICY_VERSION) {
                    showBanner();
                } else {
                    // Consent already given, show settings button
                    privacySettingsBtn.classList.add('show');
                    
                    // Apply consent settings
                    if (consent.analytics) {
                        // Enable analytics
                    }
                    if (consent.marketing) {
                        // Enable marketing cookies
                    }
                }
                
                // Event listeners
                acceptBtn.addEventListener('click', acceptAllCookies);
                declineBtn.addEventListener('click', declineOptionalCookies);
                manageBtn.addEventListener('click', managePreferences);
                privacySettingsBtn.addEventListener('click', showBanner);
                viewPolicyLink.addEventListener('click', (e) => {
                    e.preventDefault();
                    showPrivacyModal();
                });
                closeModalBtn.addEventListener('click', hidePrivacyModal);
                
                // Close modal when clicking outside
                privacyModal.addEventListener('click', (e) => {
                    if (e.target === privacyModal) {
                        hidePrivacyModal();
                    }
                });
                
                // Close modal with Escape key
                document.addEventListener('keydown', (e) => {
                    if (e.key === 'Escape' && privacyModal.classList.contains('show')) {
                        hidePrivacyModal();
                    }
                });
            }
            
            // Run when DOM is ready
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', init);
            } else {
                init();
            }
        })();

        (function() {
            'use strict';

            const SPOTLIGHT_DATA_URL = 'assets/data/spotlight.json';
            const FEATURED_CONTAINER_ID = 'spotlight-featured-container';
            const CARDS_CONTAINER_ID = 'spotlight-cards-grid';
            const HISTORY_CONTAINER_ID = 'spotlight-history';

            /**
             * Fetch and render the Spotlight section
             */
            async function loadSpotlight() {
                const featuredContainer = document.getElementById(FEATURED_CONTAINER_ID);
                const cardsContainer = document.getElementById(CARDS_CONTAINER_ID);
                const historyContainer = document.getElementById(HISTORY_CONTAINER_ID);

                if (!featuredContainer || !cardsContainer || !historyContainer) {
                    console.warn('Spotlight containers not found');
                    return;
                }

                try {
                    // Fetch spotlight data
                    const response = await fetch(SPOTLIGHT_DATA_URL);
                    if (!response.ok) {
                        throw new Error(`Failed to load spotlight data: ${response.status}`);
                    }

                    const data = await response.json();
                    
                    // Sort items by datePublished (newest first)
                    const sortedItems = data.items.sort((a, b) => {
                        return new Date(b.datePublished) - new Date(a.datePublished);
                    });

                    // Clear loading indicator
                    featuredContainer.innerHTML = '';
                    cardsContainer.innerHTML = '';
                    historyContainer.innerHTML = '';

                    if (sortedItems.length === 0) {
                        featuredContainer.innerHTML = '<div class="gallery-loading">No spotlight items available.</div>';
                        return;
                    }

                    // Render featured item (newest)
                    if (sortedItems.length >= 1) {
                        const featuredTile = createFeaturedTile(sortedItems[0]);
                        featuredContainer.appendChild(featuredTile);
                    }

                    // Render next 3 items as cards
                    const cardItems = sortedItems.slice(1, 4);
                    cardItems.forEach(item => {
                        const card = createSpotlightCard(item);
                        cardsContainer.appendChild(card);
                    });

                    // Render remaining items in history list
                    const historyItems = sortedItems.slice(4);
                    if (historyItems.length > 0) {
                        const historySection = createHistorySection(historyItems);
                        historyContainer.appendChild(historySection);
                    }

                    // Apply hover optimizations
                    setupSpotlightHoverOptimizations();

                } catch (error) {
                    console.error('Error loading Spotlight:', error);
                    featuredContainer.innerHTML = `
                        <div class="gallery-loading" style="color: var(--accent-warm);">
                            Unable to load Spotlight. Please try again later.
                        </div>
                    `;
                }
            }

            /**
             * Create featured spotlight tile (extra large)
             */
            function createFeaturedTile(item) {
                const tile = document.createElement('div');
                tile.className = 'spotlight-featured-tile gallery-featured-tile';
                tile.setAttribute('data-item-id', item.id);

                tile.innerHTML = `
                    <div class="spotlight-featured-image gallery-featured-image">
                        <img src="${escapeHtml(item.image)}" 
                             loading="eager" 
                             width="600"
                             height="600"
                             alt="${escapeHtml('Spotlight #' + item.number + ' - ' + item.title)}">
                    </div>
                    <div class="spotlight-featured-content gallery-featured-content">
                        <h3>
                            <span class="spotlight-number gallery-number">Spotlight #${escapeHtml(item.number.toString())}</span>
                            ${escapeHtml(item.title)}
                        </h3>
                        <p>${escapeHtml(item.description)}</p>
                        <div class="spotlight-featured-actions gallery-featured-actions">
                            ${item.mintUrl ? `
                                <div class="spotlight-featured-action gallery-featured-action mint">
                                    <a href="${escapeHtml(item.mintUrl)}" 
                                       target="_blank" 
                                       rel="noopener noreferrer">Mint</a>
                                </div>
                            ` : ''}
                            ${item.tradeUrl ? `
                                <div class="spotlight-featured-action gallery-featured-action trade">
                                    <a href="${escapeHtml(item.tradeUrl)}" 
                                       target="_blank" 
                                       rel="noopener noreferrer">Trade</a>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                `;

                return tile;
            }

            /**
             * Create spotlight card (standard size)
             */
            function createSpotlightCard(item) {
                const card = document.createElement('div');
                card.className = 'spotlight-card gallery-card';
                card.setAttribute('data-item-id', item.id);

                card.innerHTML = `
                    <img src="${escapeHtml(item.image)}" 
                         loading="lazy" 
                         alt="${escapeHtml('Spotlight #' + item.number + ' - ' + item.title)}">
                    <div class="spotlight-card-caption gallery-card-caption">
                        <h4>Spotlight #${escapeHtml(item.number.toString())} - ${escapeHtml(item.title)}</h4>
                        <p>${escapeHtml(item.description)}</p>
                        <div class="spotlight-card-actions gallery-card-actions">
                            ${item.mintUrl ? `
                                <div class="spotlight-card-action gallery-card-action mint">
                                    <a href="${escapeHtml(item.mintUrl)}" 
                                       target="_blank" 
                                       rel="noopener noreferrer">Mint</a>
                                </div>
                            ` : ''}
                            ${item.tradeUrl ? `
                                <div class="spotlight-card-action gallery-card-action trade">
                                    <a href="${escapeHtml(item.tradeUrl)}" 
                                       target="_blank" 
                                       rel="noopener noreferrer">Trade</a>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                `;

                return card;
            }

            /**
             * Create history section with minimal list items
             */
            function createHistorySection(items) {
                const section = document.createElement('div');
                
                const heading = document.createElement('h3');
                heading.className = 'history-heading';
                heading.textContent = 'Spotlight History';
                section.appendChild(heading);

                const list = document.createElement('div');
                list.className = 'history-list spotlight-history-list';

                items.forEach(item => {
                    const historyItem = createHistoryItem(item);
                    list.appendChild(historyItem);
                });

                section.appendChild(list);
                return section;
            }

            /**
             * Create a history list item
             */
            function createHistoryItem(item) {
                const div = document.createElement('div');
                div.className = 'history-item spotlight-history-item';
                div.setAttribute('data-item-id', item.id);

                div.innerHTML = `
                    <div class="history-thumbnail spotlight-history-thumbnail">
                        <img src="${escapeHtml(item.image)}" 
                             loading="lazy" 
                             width="60"
                             height="60"
                             alt="${escapeHtml('Spotlight #' + item.number)}">
                    </div>
                    <div class="history-info spotlight-history-info">
                        <h4>Spotlight #${escapeHtml(item.number.toString())} - ${escapeHtml(item.title)}</h4>
                    </div>
                    <div class="history-actions spotlight-history-actions">
                        ${item.mintUrl ? `
                            <div class="history-action spotlight-history-action mint">
                                <a href="${escapeHtml(item.mintUrl)}" 
                                   target="_blank" 
                                   rel="noopener noreferrer">Mint</a>
                            </div>
                        ` : ''}
                        ${item.tradeUrl ? `
                            <div class="history-action spotlight-history-action trade">
                                <a href="${escapeHtml(item.tradeUrl)}" 
                                   target="_blank" 
                                   rel="noopener noreferrer">Trade</a>
                            </div>
                        ` : ''}
                    </div>
                `;

                return div;
            }

            /**
             * Setup hover optimizations for Spotlight elements
             */
            function setupSpotlightHoverOptimizations() {
                // Featured tile
                const featuredTile = document.querySelector('.spotlight-featured-tile');
                if (featuredTile) {
                    featuredTile.addEventListener('mouseenter', function() {
                        this.style.willChange = 'transform, opacity';
                        const img = this.querySelector('img');
                        if (img) {
                            img.style.willChange = 'transform, opacity';
                        }
                    }, { passive: true });

                    featuredTile.addEventListener('mouseleave', function() {
                        setTimeout(() => {
                            this.style.willChange = 'auto';
                            const img = this.querySelector('img');
                            if (img) {
                                img.style.willChange = 'auto';
                            }
                        }, 300);
                    }, { passive: true });
                }

                // Spotlight cards (includes gallery-card class)
                const cards = document.querySelectorAll('.spotlight-card, .gallery-card');
                cards.forEach(card => {
                    card.addEventListener('mouseenter', function() {
                        this.style.willChange = 'transform, opacity';
                        const img = this.querySelector('img');
                        if (img) {
                            img.style.willChange = 'transform, opacity';
                        }
                    }, { passive: true });

                    card.addEventListener('mouseleave', function() {
                        setTimeout(() => {
                            this.style.willChange = 'auto';
                            const img = this.querySelector('img');
                            if (img) {
                                img.style.willChange = 'auto';
                            }
                        }, 300);
                    }, { passive: true });
                });

                // History items
                const historyItems = document.querySelectorAll('.spotlight-history-item, .history-item');
                historyItems.forEach(item => {
                    item.addEventListener('mouseenter', function() {
                        this.style.willChange = 'transform, background';
                    }, { passive: true });

                    item.addEventListener('mouseleave', function() {
                        setTimeout(() => {
                            this.style.willChange = 'auto';
                        }, 200);
                    }, { passive: true });
                });
            }

            /**
             * Basic XSS prevention - escape HTML characters
             */
            function escapeHtml(text) {
                const div = document.createElement('div');
                div.textContent = text;
                return div.innerHTML;
            }

            // Initialize when DOM is ready
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', loadSpotlight);
            } else {
                loadSpotlight();
            }
        })();

        (function() {
            'use strict';

            const NFT_DATA_URL = 'assets/data/nft-gallery.json';
            const FEATURED_CONTAINER_ID = 'nft-featured-container';
            const CARDS_CONTAINER_ID = 'nft-cards-grid';
            const HISTORY_CONTAINER_ID = 'nft-history';

            /**
             * Fetch and render the NFT Gallery section
             */
            async function loadNFTGallery() {
                const featuredContainer = document.getElementById(FEATURED_CONTAINER_ID);
                const cardsContainer = document.getElementById(CARDS_CONTAINER_ID);
                const historyContainer = document.getElementById(HISTORY_CONTAINER_ID);

                if (!featuredContainer || !cardsContainer || !historyContainer) {
                    console.warn('NFT Gallery containers not found');
                    return;
                }

                try {
                    // Fetch NFT data
                    const response = await fetch(NFT_DATA_URL);
                    if (!response.ok) {
                        throw new Error(`Failed to load NFT data: ${response.status}`);
                    }

                    const data = await response.json();
                    
                    // Sort items by datePublished (newest first)
                    const sortedItems = data.items.sort((a, b) => {
                        return new Date(b.datePublished) - new Date(a.datePublished);
                    });

                    // Clear loading indicator
                    featuredContainer.innerHTML = '';
                    cardsContainer.innerHTML = '';
                    historyContainer.innerHTML = '';

                    if (sortedItems.length === 0) {
                        featuredContainer.innerHTML = '<div class="gallery-loading">No NFT items available.</div>';
                        return;
                    }

                    // Render featured item (newest - item 0)
                    if (sortedItems.length >= 1) {
                        const featuredTile = createNFTFeaturedTile(sortedItems[0]);
                        featuredContainer.appendChild(featuredTile);
                    }

                    // Render next 15 items as cards (items 1-15)
                    const cardItems = sortedItems.slice(1, 16);
                    cardItems.forEach(item => {
                        const card = createNFTCard(item);
                        cardsContainer.appendChild(card);
                    });

                    // Render remaining items in history list (items 16+)
                    const historyItems = sortedItems.slice(16);
                    if (historyItems.length > 0) {
                        const historySection = createNFTHistorySection(historyItems);
                        historyContainer.appendChild(historySection);
                    }

                    // Apply hover optimizations
                    setupNFTHoverOptimizations();

                } catch (error) {
                    console.error('Error loading NFT Gallery:', error);
                    featuredContainer.innerHTML = `
                        <div class="gallery-loading" style="color: var(--accent-warm);">
                            Unable to load NFT Gallery. Please try again later.
                        </div>
                    `;
                }
            }

            /**
             * Create featured NFT tile (extra large)
             */
            function createNFTFeaturedTile(item) {
                const tile = document.createElement('div');
                tile.className = 'nft-featured-tile gallery-featured-tile';
                tile.setAttribute('data-item-id', item.id);

                tile.innerHTML = `
                    <div class="nft-featured-image gallery-featured-image">
                        <img src="${escapeHtml(item.image)}" 
                             fetchpriority="high"
                             decoding="async"
                             loading="eager"
                             alt="${escapeHtml('SSY #' + item.number + ' - ' + item.title)}"
                             width="600"
                             height="600">
                    </div>
                    <div class="nft-featured-content gallery-featured-content">
                        <h3>
                            <span class="nft-number gallery-number">SSY #${escapeHtml(item.number.toString())}</span>
                            ${escapeHtml(item.title)}
                        </h3>
                        <p>${escapeHtml(item.description)}</p>
                        <div class="nft-featured-actions gallery-featured-actions">
                            ${item.mintUrl ? `
                                <div class="nft-featured-action gallery-featured-action mint">
                                    <a href="${escapeHtml(item.mintUrl)}" 
                                       target="_blank" 
                                       rel="noopener noreferrer">Mint</a>
                                </div>
                            ` : ''}
                            ${item.tradeUrl ? `
                                <div class="nft-featured-action gallery-featured-action trade">
                                    <a href="${escapeHtml(item.tradeUrl)}" 
                                       target="_blank" 
                                       rel="noopener noreferrer">Trade</a>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                `;

                return tile;
            }

            /**
             * Create NFT card (standard size)
             */
            function createNFTCard(item) {
                const card = document.createElement('div');
                card.className = 'nft-card gallery-card';
                card.setAttribute('data-item-id', item.id);

                card.innerHTML = `
                    <img src="${escapeHtml(item.image)}" 
                         loading="lazy" 
                         alt="${escapeHtml('SSY #' + item.number + ' - ' + item.title)}"
                         width="300"
                         height="300">
                    <div class="nft-card-caption gallery-card-caption">
                        <h4>SSY #${escapeHtml(item.number.toString())} - ${escapeHtml(item.title)}</h4>
                        <p>${escapeHtml(item.description)}</p>
                        <div class="nft-card-actions gallery-card-actions">
                            ${item.mintUrl ? `
                                <div class="nft-card-action gallery-card-action mint">
                                    <a href="${escapeHtml(item.mintUrl)}" 
                                       target="_blank" 
                                       rel="noopener noreferrer">Mint</a>
                                </div>
                            ` : ''}
                            ${item.tradeUrl ? `
                                <div class="nft-card-action gallery-card-action trade">
                                    <a href="${escapeHtml(item.tradeUrl)}" 
                                       target="_blank" 
                                       rel="noopener noreferrer">Trade</a>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                `;

                return card;
            }

            /**
             * Create NFT history section with minimal list items
             */
            function createNFTHistorySection(items) {
                const section = document.createElement('div');
                
                const heading = document.createElement('h3');
                heading.className = 'history-heading';
                heading.textContent = 'NFT Gallery History';
                section.appendChild(heading);

                const list = document.createElement('div');
                list.className = 'history-list nft-history-list';

                items.forEach(item => {
                    const historyItem = createNFTHistoryItem(item);
                    list.appendChild(historyItem);
                });

                section.appendChild(list);
                return section;
            }

            /**
             * Create an NFT history list item
             */
            function createNFTHistoryItem(item) {
                const div = document.createElement('div');
                div.className = 'history-item nft-history-item';
                div.setAttribute('data-item-id', item.id);

                div.innerHTML = `
                    <div class="history-thumbnail nft-history-thumbnail">
                        <img src="${escapeHtml(item.image)}" 
                             loading="lazy" 
                             alt="${escapeHtml('SSY #' + item.number)}"
                             width="60"
                             height="60">
                    </div>
                    <div class="history-info nft-history-info">
                        <h4>SSY #${escapeHtml(item.number.toString())} - ${escapeHtml(item.title)}</h4>
                    </div>
                    <div class="history-actions nft-history-actions">
                        ${item.mintUrl ? `
                            <div class="history-action nft-history-action mint">
                                <a href="${escapeHtml(item.mintUrl)}" 
                                   target="_blank" 
                                   rel="noopener noreferrer">Mint</a>
                            </div>
                        ` : ''}
                        ${item.tradeUrl ? `
                            <div class="history-action nft-history-action trade">
                                <a href="${escapeHtml(item.tradeUrl)}" 
                                   target="_blank" 
                                   rel="noopener noreferrer">Trade</a>
                            </div>
                        ` : ''}
                    </div>
                `;

                return div;
            }

            /**
             * Setup hover optimizations for NFT elements
             */
            function setupNFTHoverOptimizations() {
                // Featured tile
                const featuredTile = document.querySelector('.nft-featured-tile');
                if (featuredTile) {
                    featuredTile.addEventListener('mouseenter', function() {
                        this.style.willChange = 'transform, opacity';
                        const img = this.querySelector('img');
                        if (img) {
                            img.style.willChange = 'transform, opacity';
                        }
                    }, { passive: true });

                    featuredTile.addEventListener('mouseleave', function() {
                        setTimeout(() => {
                            this.style.willChange = 'auto';
                            const img = this.querySelector('img');
                            if (img) {
                                img.style.willChange = 'auto';
                            }
                        }, 300);
                    }, { passive: true });
                }

                // NFT cards (includes gallery-card class)
                const cards = document.querySelectorAll('.nft-card, .gallery-card');
                cards.forEach(card => {
                    card.addEventListener('mouseenter', function() {
                        this.style.willChange = 'transform, opacity';
                        const img = this.querySelector('img');
                        if (img) {
                            img.style.willChange = 'transform, opacity';
                        }
                    }, { passive: true });

                    card.addEventListener('mouseleave', function() {
                        setTimeout(() => {
                            this.style.willChange = 'auto';
                            const img = this.querySelector('img');
                            if (img) {
                                img.style.willChange = 'auto';
                            }
                        }, 300);
                    }, { passive: true });
                });

                // History items
                const historyItems = document.querySelectorAll('.nft-history-item, .history-item');
                historyItems.forEach(item => {
                    item.addEventListener('mouseenter', function() {
                        this.style.willChange = 'transform, background';
                    }, { passive: true });

                    item.addEventListener('mouseleave', function() {
                        setTimeout(() => {
                            this.style.willChange = 'auto';
                        }, 200);
                    }, { passive: true });
                });
            }

            /**
             * Basic XSS prevention - escape HTML characters
             */
            function escapeHtml(text) {
                const div = document.createElement('div');
                div.textContent = text;
                return div.innerHTML;
            }

            // Initialize when DOM is ready
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', loadNFTGallery);
            } else {
                loadNFTGallery();
            }
        })();

/* ============================================================
   SCROLL PROGRESS INDICATOR
   ============================================================ */
(function() {
    const bar = document.getElementById('scroll-progress');
    if (!bar) return;
    window.addEventListener('scroll', function() {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        bar.style.width = pct + '%';
    }, { passive: true });
})();

/* ============================================================
   SCROLL-REVEAL ANIMATIONS (IntersectionObserver)
   ============================================================ */
(function() {
    if (!('IntersectionObserver' in window)) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.reveal').forEach(function(el) {
        observer.observe(el);
    });
})();

/* ============================================================
   BUTTON RIPPLE EFFECT
   ============================================================ */
(function() {
    document.addEventListener('click', function(e) {
        const btn = e.target.closest('.btn-ripple');
        if (!btn) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        const ripple = document.createElement('span');
        ripple.classList.add('ripple-wave');
        const rect = btn.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.cssText = 'width:' + size + 'px;height:' + size + 'px;left:' + (e.clientX - rect.left - size/2) + 'px;top:' + (e.clientY - rect.top - size/2) + 'px;';
        btn.appendChild(ripple);
        ripple.addEventListener('animationend', function() { ripple.remove(); });
    });
})();
