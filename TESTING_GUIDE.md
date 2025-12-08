# Testing Guide for Phase 7 & 8 Implementation

This guide provides instructions for testing the PWA, SEO, and rate limiting features after deployment.

## 1. PWA Testing

### Desktop Testing (Chrome/Edge)

1. **Open DevTools** (F12)
2. Go to **Application** tab
3. Navigate to **Service Workers** section
4. Verify service worker is registered and active
5. Check **Manifest** section to verify PWA configuration
6. Test offline functionality:
   - Go offline in DevTools Network tab (set to "Offline")
   - Navigate to different pages
   - Should see offline fallback page when trying to reach uncached pages
   - Cached pages should load normally

### Mobile Testing (Android)

1. Open the site in Chrome mobile
2. Tap the three-dot menu
3. Look for "Install app" or "Add to Home Screen"
4. Install the PWA
5. Open from home screen
6. Verify it opens in standalone mode (no browser UI)
7. Test offline functionality by turning on airplane mode

### Mobile Testing (iOS)

1. Open the site in Safari
2. Tap the Share button
3. Select "Add to Home Screen"
4. Install the PWA
5. Open from home screen
6. Test offline functionality by turning on airplane mode

## 2. SEO Testing

### Google Search Console

1. Submit sitemap: `https://yourdomain.com/sitemap.xml`
2. Wait for Google to index pages
3. Check for any crawl errors

### Metadata Verification

Use these tools to verify metadata:

1. **Open Graph Debugger**:
   - Facebook: https://developers.facebook.com/tools/debug/
   - LinkedIn: https://www.linkedin.com/post-inspector/
   - Test URLs:
     - Homepage: `/`
     - Project detail: `/projects/glover`
     - Contact: `/contact`
     - Mentorship: `/mentorship`

2. **Twitter Card Validator**:
   - https://cards-dev.twitter.com/validator
   - Test the same URLs as above

3. **Rich Results Test** (Google):
   - https://search.google.com/test/rich-results
   - Test homepage for Person and Website schemas
   - Test project pages for SoftwareApplication schema

### Manual Checks

1. View page source on each page
2. Verify `<meta>` tags are present:
   - `og:title`, `og:description`, `og:image`, `og:url`, `og:type`
   - `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`
   - Canonical URL
3. Verify JSON-LD structured data:
   - Look for `<script type="application/ld+json">` tags
   - Validate JSON is well-formed

### Lighthouse Audit

1. Open DevTools (F12)
2. Go to **Lighthouse** tab
3. Run audit for:
   - Performance
   - Accessibility
   - Best Practices
   - SEO
   - PWA
4. Target scores:
   - Performance: 90+
   - Accessibility: 100
   - Best Practices: 95+
   - SEO: 100
   - PWA: 100

## 3. Rate Limiting Testing

### Contact Form Rate Limiting

**Limit**: 3 requests per 5 minutes per IP address

**Test Steps**:

1. Open the contact page: `/contact`
2. Fill out and submit the form successfully (1st submission)
3. Immediately submit again (2nd submission)
4. Submit a third time (3rd submission)
5. Try to submit a 4th time - should get error: "Too many requests. Please try again in X seconds."
6. Wait 5 minutes and try again - should work

**Expected Behavior**:
- First 3 submissions succeed
- 4th submission fails with rate limit error
- After 5 minutes, rate limit resets

### Mentorship Form Rate Limiting

**Limit**: 3 requests per 5 minutes per IP address

**Test Steps**:

1. Open the mentorship page: `/mentorship`
2. Fill out and submit the form successfully (1st submission)
3. Immediately submit again (2nd submission)
4. Submit a third time (3rd submission)
5. Try to submit a 4th time - should get error: "Too many requests. Please try again in X seconds."
6. Wait 5 minutes and try again - should work

**Expected Behavior**:
- First 3 submissions succeed
- 4th submission fails with rate limit error
- After 5 minutes, rate limit resets

### Testing from Different IPs

To verify IP-based rate limiting:

1. Submit 3 times from one device/network (should hit limit)
2. Switch to a different network (mobile data, VPN, etc.)
3. Should be able to submit again (different IP)

## 4. Sitemap & Robots.txt Testing

### Sitemap

1. Access: `https://yourdomain.com/sitemap.xml`
2. Verify all pages are listed (should have ~48 URLs)
3. Check each URL is properly formatted
4. Verify lastModified dates are present
5. Check priority and changeFrequency values

### Robots.txt

1. Access: `https://yourdomain.com/robots.txt`
2. Verify it contains:
   ```
   User-agent: *
   Allow: /
   Disallow: /api/*
   Disallow: /_next/*
   Disallow: /private/*
   
   Sitemap: https://yourdomain.com/sitemap.xml
   ```

## 5. Form Functionality Testing

### Contact Form

1. **Valid Submission**:
   - Fill all required fields
   - Submit
   - Should see success message
   - Check if Telegram notification was received

2. **Validation Testing**:
   - Try submitting empty form (should show errors)
   - Enter invalid email (should show error)
   - Enter short message (<20 chars, should show error)

### Mentorship Form

1. **Valid Submission**:
   - Fill all required fields
   - Submit
   - Should see success message
   - Check if Telegram notification was received

2. **Validation Testing**:
   - Try submitting empty form (should show errors)
   - Enter invalid email (should show error)
   - Enter short background (<50 chars, should show error)
   - Enter short goals (<50 chars, should show error)

## 6. Performance Testing

### Core Web Vitals

Monitor these metrics in Google Search Console or Chrome DevTools:

1. **LCP (Largest Contentful Paint)**: < 2.5s
2. **FID (First Input Delay)**: < 100ms
3. **CLS (Cumulative Layout Shift)**: < 0.1

### Service Worker Caching

1. Open DevTools Network tab
2. Browse through the site
3. Check **Size** column:
   - First load: Should show actual sizes
   - Subsequent loads: Should show "(from ServiceWorker)" for cached resources

## 7. Cross-Browser Testing

Test the site in:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile Chrome (Android)
- Mobile Safari (iOS)

Check for:
- Layout issues
- Form functionality
- PWA installation
- Service worker registration

## Expected Results Summary

✅ **PWA**:
- Service worker registered and active
- Installable on mobile and desktop
- Works offline (cached pages)
- Offline fallback page for uncached pages

✅ **SEO**:
- All pages have comprehensive metadata
- Structured data validates correctly
- Sitemap accessible and contains all pages
- Robots.txt properly configured
- Lighthouse SEO score: 100

✅ **Rate Limiting**:
- Forms protected (3 requests per 5 minutes)
- IP-based tracking works correctly
- Error messages clear and helpful

✅ **Forms**:
- Client-side validation works
- Server-side validation works
- Submissions saved to MongoDB
- Telegram notifications sent
- No reCAPTCHA badge (better UX)

## Troubleshooting

### Service Worker Not Registering

- Check console for errors
- Ensure HTTPS is enabled (required for service workers)
- Clear cache and reload
- Unregister old service workers in DevTools

### Rate Limiting Not Working

- Check if IP address is being captured correctly
- Verify environment variables are set
- Check server logs for rate limit messages
- Test from different IPs/networks

### Metadata Not Showing

- View page source to verify meta tags are rendered
- Check if JavaScript is blocking rendering
- Verify environment variables (NEXT_PUBLIC_APP_URL)
- Clear social media cache (Facebook, Twitter, LinkedIn)

### Forms Not Submitting

- Check console for errors
- Verify API authentication is working
- Check MongoDB connection
- Verify Telegram bot token and chat ID
- Test with network tab open to see API responses
