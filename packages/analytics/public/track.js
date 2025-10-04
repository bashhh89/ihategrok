(function() {
    // Configuration
    const ANALYTICS_URL = '';
    
    // Get or create visitor ID
    function getVisitorId() {
        let visitorId = localStorage.getItem('sowb_visitor_id');
        if (!visitorId) {
            visitorId = 'visitor_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
            localStorage.setItem('sowb_visitor_id', visitorId);
        }
        return visitorId;
    }
    
    // Get or create session ID (expires after 30 minutes of inactivity)
    function getSessionId() {
        const now = Date.now();
        const sessionData = JSON.parse(localStorage.getItem('sowb_session') || '{}');
        
        if (sessionData.id && sessionData.lastActivity && (now - sessionData.lastActivity) < 30 * 60 * 1000) {
            // Update last activity
            sessionData.lastActivity = now;
            localStorage.setItem('sowb_session', JSON.stringify(sessionData));
            return sessionData.id;
        } else {
            // Create new session
            const sessionId = 'session_' + Math.random().toString(36).substr(2, 9) + '_' + now;
            localStorage.setItem('sowb_session', JSON.stringify({
                id: sessionId,
                startTime: now,
                lastActivity: now
            }));
            return sessionId;
        }
    }
    
    // Send analytics data
    function track(type, data) {
        const payload = {
            type: type,
            visitor_id: getVisitorId(),
            session_id: getSessionId(),
            timestamp: new Date().toISOString(),
            user_agent: navigator.userAgent,
            referrer: document.referrer,
            ...data
        };
        
        // Use sendBeacon for reliability, fallback to fetch
        if (navigator.sendBeacon) {
            navigator.sendBeacon(ANALYTICS_URL + '/track', JSON.stringify(payload));
        } else {
            fetch(ANALYTICS_URL + '/track', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            }).catch(() => {}); // Silent fail
        }
    }
    
    // Track page view
    function trackPageView() {
        track('page_view', {
            page_url: window.location.pathname + window.location.search,
            page_title: document.title,
            page_host: window.location.hostname
        });
    }
    
    // Track custom events
    function trackEvent(eventName, eventData = {}) {
        track('event', {
            event_name: eventName,
            event_data: eventData
        });
    }
    
    // Track user interactions
    function setupInteractionTracking() {
        // Track clicks on important elements
        document.addEventListener('click', function(e) {
            const target = e.target.closest('button, a, [data-track]');
            if (target) {
                const eventName = target.dataset.track || 
                                 (target.tagName === 'A' ? 'link_click' : 'button_click');
                const eventData = {
                    element: target.tagName.toLowerCase(),
                    text: target.textContent?.trim().substring(0, 100),
                    href: target.href,
                    class: target.className
                };
                trackEvent(eventName, eventData);
            }
        });
        
        // Track form submissions
        document.addEventListener('submit', function(e) {
            const form = e.target;
            trackEvent('form_submit', {
                form_id: form.id,
                form_action: form.action,
                form_method: form.method
            });
        });
    }
    
    // Track time on page
    let pageStartTime = Date.now();
    let isPageVisible = !document.hidden;
    
    function trackTimeOnPage() {
        if (isPageVisible) {
            const timeSpent = Math.round((Date.now() - pageStartTime) / 1000);
            if (timeSpent > 5) { // Only track if spent more than 5 seconds
                trackEvent('time_on_page', {
                    seconds: timeSpent,
                    page_url: window.location.pathname
                });
            }
        }
    }
    
    // Handle visibility changes
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            isPageVisible = false;
            trackTimeOnPage();
        } else {
            isPageVisible = true;
            pageStartTime = Date.now();
        }
    });
    
    // Track before page unload
    window.addEventListener('beforeunload', trackTimeOnPage);
    
    // Initialize tracking
    function init() {
        // Track initial page view
        trackPageView();
        
        // Setup interaction tracking
        setupInteractionTracking();
        
        // Track SOW-specific events
        if (window.location.pathname.includes('/workbench')) {
            trackEvent('workbench_visit');
        }
        
        if (window.location.pathname.includes('/sow/')) {
            trackEvent('sow_view');
        }
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    // Expose trackEvent globally for manual tracking
    window.sowbAnalytics = {
        trackEvent: trackEvent,
        trackPageView: trackPageView
    };
})();