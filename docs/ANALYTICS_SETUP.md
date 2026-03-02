# Site Analytics - GoatCounter Integration

## Overview

SupraSaiyans uses **GoatCounter** for privacy-friendly traffic analytics.

- **Dashboard URL**: https://suprasaiyans.goatcounter.com
- **Service**: [GoatCounter](https://www.goatcounter.com/) (free, open-source)
- **Privacy**: No cookies, no personal data, GDPR/CCPA compliant

## What's Tracked

GoatCounter collects minimal, anonymous data:
- Page views and paths
- Referral sources (where visitors come from)
- Browser and OS type
- Screen size
- Country (approximate, from timezone)
- Language preference

## What's NOT Tracked

- No cookies or local storage
- No IP addresses (not stored, not logged)
- No cross-site tracking
- No fingerprinting
- No personal data of any kind

## Public Dashboard

The analytics dashboard is **publicly accessible** — anyone can view site traffic:

🔗 **https://suprasaiyans.goatcounter.com**

This transparency aligns with our open-source ethos.

## Technical Details

### Script Integration
The tracking script is loaded asynchronously in `index.html`:
```html
<script data-goatcounter="https://suprasaiyans.goatcounter.com/count"
        async src="https://gc.zgo.at/count.js"></script>
```

### Performance Impact
- Script size: ~3.5KB (gzipped)
- Loaded with `async` attribute — non-blocking
- No render-blocking resources
- No impact on Core Web Vitals

### Footer Link
A "📊 Traffic Dashboard" link in the site footer provides direct access to analytics.

## Administration

To manage the GoatCounter account:
1. Visit https://suprasaiyans.goatcounter.com
2. Dashboard settings can be configured at https://suprasaiyans.goatcounter.com/settings

## Alternatives Considered

| Service | Cost | Cookies | Self-hosted | Public Dashboard |
|---------|------|---------|-------------|-----------------|
| **GoatCounter** ✅ | Free | None | Optional | Yes |
| Google Analytics | Free | Yes | No | No |
| Plausible | $9/mo | None | Yes ($) | Yes |
| Umami | Free (self-host) | None | Required | Yes |
| Fathom | $14/mo | None | No | Yes |

GoatCounter was chosen for its free tier, zero-cookie approach, and public dashboard capability.
