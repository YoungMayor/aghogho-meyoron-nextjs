# API Documentation

## Overview

The portfolio application provides secure RESTful API endpoints for accessing profile data and handling form submissions. All endpoints require authentication using time-based encrypted tokens.

## Authentication

### Token Generation

```typescript
import { createAuthHeaders } from '@/lib/utils/api-auth';

const secret = process.env.INTERNAL_API_SECRET!;
const headers = createAuthHeaders(secret);
```

### Token Format

**Header:** `X-Auth-Token`

**Value:** Encrypted timestamp (AES-256-CBC)

**Expiry:** 5 minutes

### Making Authenticated Requests

```typescript
const response = await fetch('/api/profile', {
  method: 'GET',
  headers: createAuthHeaders(secret),
});

const data = await response.json();
```

---

## Endpoints

### 1. GET /api/profile

Retrieve complete profile with all nested data.

**Authentication:** Required

**Response:**

```json
{
  "success": true,
  "data": {
    "name": "Aghogho Meyoron",
    "titles": ["Software Engineer"],
    "avatar_url": "...",
    "biography": "...",
    "notes": {
      "tagline": "...",
      "persona": "...",
      "about": "..."
    },
    "contact": {
      "email": "...",
      "phone": "...",
      "message": "..."
    },
    "copyright": { ... },
    "history": {
      "academic": [ ... ],
      "career": [ ... ]
    },
    "portfolio": {
      "projects": [ ... ],
      "articles": [ ... ]
    },
    "skills": [ ... ],
    "testimonials": [ ... ],
    "social_links": [ ... ],
    "hobbies": [ ... ],
    "badges": [ ... ]
  }
}
```

---

### 2. GET /api/projects

List projects with optional filtering and pagination.

**Authentication:** Required

**Query Parameters:**

| Parameter      | Type   | Description                    | Example                                                       |
| -------------- | ------ | ------------------------------ | ------------------------------------------------------------- |
| `type`         | string | Project type filter            | `web-app`, `mobile-app`, `api`, `js-pkg`, `dart-pkg`, `other` |
| `owner`        | string | Owner filter                   | `personal`, `client`, `open-source`, `other`                  |
| `technologies` | string | Comma-separated tech names     | `Laravel,Vue.js,React`                                        |
| `limit`        | number | Items per page (default: 10)   | `20`                                                          |
| `offset`       | number | Pagination offset (default: 0) | `40`                                                          |

**Examples:**

```typescript
// Get all web apps
fetch('/api/projects?type=web-app', { headers });

// Get projects using Laravel and Vue.js
fetch('/api/projects?technologies=Laravel,Vue.js', { headers });

// Get page 2 with 20 items per page
fetch('/api/projects?limit=20&offset=20', { headers });
```

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "slug": "project-name",
      "name": "Project Name",
      "description": "...",
      "features": [ ... ],
      "technologies": [ ... ],
      "type": "web-app",
      "owner": "client",
      "demo_link": "...",
      "repo_link": "...",
      "images": [ ... ],
      "show": true,
      "priority": 0
    }
  ],
  "pagination": {
    "total": 23,
    "page": 1,
    "perPage": 10,
    "totalPages": 3,
    "hasNext": true,
    "hasPrev": false
  }
}
```

---

### 3. GET /api/history

Retrieve career and/or academic history.

**Authentication:** Required

**Query Parameters:**

| Parameter | Type   | Description                           | Example  |
| --------- | ------ | ------------------------------------- | -------- |
| `type`    | string | History type (`career` or `academic`) | `career` |
| `limit`   | number | Items per page (default: 10)          | `20`     |
| `offset`  | number | Pagination offset (default: 0)        | `20`     |

**Examples:**

```typescript
// Get all career items
fetch('/api/history?type=career', { headers });

// Get all academic records
fetch('/api/history?type=academic', { headers });

// Get both career and academic (no type parameter)
fetch('/api/history', { headers });
```

**Response (with type parameter):**

```json
{
  "success": true,
  "data": [
    {
      "company_name": "Glover Techstars",
      "role": "Senior Backend Developer",
      "start_date": "2021-01-01",
      "end_date": "2025-01-01",
      "description": "...",
      "location": "Remote",
      "duties": [ ... ],
      "show": true,
      "priority": 0
    }
  ],
  "pagination": { ... }
}
```

**Response (without type parameter):**

```json
{
  "success": true,
  "data": {
    "career": [ ... ],
    "academic": [ ... ]
  }
}
```

---

### 4. GET /api/skills

Retrieve all skills categorized.

**Authentication:** Required

**Response:**

```json
{
  "success": true,
  "data": {
    "all": [
      {
        "name": "Frontend Development",
        "description": null,
        "type": "tech",
        "technologies": [
          {
            "name": "React",
            "icon": {
              "type": "devicon",
              "value": "react",
              "color": null
            }
          }
        ],
        "show": true,
        "priority": 1
      }
    ],
    "technical": [ ... ],
    "soft": [ ... ]
  }
}
```

---

### 5. POST /api/contact

Submit contact form.

**Authentication:** Required

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Project Inquiry",
  "message": "Hello, I would like to discuss...",
  "recaptchaToken": "03AGdBq24..."
}
```

**Validation Rules:**

- `name`: 2-100 characters
- `email`: Valid email format
- `subject`: 5-200 characters
- `message`: 20-2000 characters
- `recaptchaToken`: Valid ReCAPTCHA v3 token (score > 0.5)

**Process:**

1. Verify authentication token
2. Validate form data
3. Verify ReCAPTCHA
4. Save to MongoDB (collection: `contacts`)
5. Send Telegram notification
6. Return success response

**Response (Success):**

```json
{
  "success": true,
  "message": "Your message has been sent successfully!"
}
```

**Response (Error):**

```json
{
  "error": "Validation error",
  "details": [
    {
      "field": "email",
      "message": "Please provide a valid email address"
    }
  ]
}
```

---

### 6. POST /api/mentorship

Submit mentorship application.

**Authentication:** Required

**Request Body:**

```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "phone": "+1234567890",
  "background": "I'm a junior developer with 2 years of experience...",
  "goals": "Looking to improve my backend development skills...",
  "commitment": "10 hours/week",
  "recaptchaToken": "03AGdBq24..."
}
```

**Validation Rules:**

- `name`: 2-100 characters
- `email`: Valid email format
- `phone`: Valid phone format (optional)
- `background`: 50-1000 characters
- `goals`: 50-1000 characters
- `commitment`: 2-50 characters
- `recaptchaToken`: Valid ReCAPTCHA v3 token (score > 0.5)

**Process:**

1. Verify authentication token
2. Validate form data
3. Verify ReCAPTCHA
4. Save to MongoDB (collection: `mentorship_applications`)
5. Send Telegram notification
6. Return success response

**Response (Success):**

```json
{
  "success": true,
  "message": "Your mentorship application has been submitted successfully!"
}
```

---

## Error Handling

### Authentication Errors

**Status Code:** `401 Unauthorized`

```json
{
  "error": "Unauthorized"
}
```

**Causes:**

- Missing `X-Auth-Token` header
- Invalid token
- Expired token (>5 minutes old)
- Decryption failure

---

### Validation Errors

**Status Code:** `400 Bad Request`

```json
{
  "error": "Validation error",
  "details": [
    {
      "field": "email",
      "message": "Please provide a valid email address"
    }
  ]
}
```

---

### Server Errors

**Status Code:** `500 Internal Server Error`

```json
{
  "error": "Internal server error",
  "message": "Failed to fetch profile data"
}
```

---

## ReCAPTCHA Integration

### Client-Side

```typescript
// Load ReCAPTCHA script in your layout
<Script
  src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
/>

// Execute ReCAPTCHA before form submission
async function getRecaptchaToken(): Promise<string> {
  return new Promise((resolve, reject) => {
    grecaptcha.ready(() => {
      grecaptcha.execute(
        process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!,
        { action: 'contact_form' }
      ).then(resolve).catch(reject);
    });
  });
}
```

---

## Telegram Notifications

### Contact Form Notification

```markdown
🔔 New Contact Form Submission

👤 Name: John Doe
📧 Email: john@example.com
📋 Subject: Project Inquiry

💬 Message:
I'm interested in discussing a potential collaboration...

⏰ Submitted: 2024-01-15 10:30 AM
🌐 IP: 192.168.1.1
```

### Mentorship Application Notification

```markdown
📚 New Mentorship Application

👤 Name: Jane Smith
📧 Email: jane@example.com
📱 Phone: +1234567890

📖 Background:
I'm a junior developer with 2 years of experience...

🎯 Goals:
Looking to improve my backend development skills...

⏳ Commitment: 10 hours/week

⏰ Submitted: 2024-01-15 10:30 AM
🌐 IP: 192.168.1.1
```

---

## Rate Limiting

Currently, there is no built-in rate limiting. Consider implementing:

1. **API Gateway Rate Limiting** (if using Vercel, AWS, etc.)
2. **Application-level Rate Limiting** (using Redis or in-memory store)
3. **ReCAPTCHA Score Threshold Adjustment** (higher threshold for suspicious traffic)

---

## Testing with cURL

### Profile Endpoint

```bash
# First, generate a token (in Node.js)
node -e "
const crypto = require('crypto');
const secret = 'your_secret_key';
const timestamp = Date.now().toString();
const key = crypto.createHash('sha256').update(secret).digest();
const iv = crypto.randomBytes(16);
const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
let encrypted = cipher.update(timestamp, 'utf8', 'hex');
encrypted += cipher.final('hex');
const token = iv.toString('hex') + ':' + encrypted;
console.log(token);
"

# Then make the request
curl -X GET http://localhost:3000/api/profile \
  -H "X-Auth-Token: YOUR_TOKEN_HERE"
```

### Contact Form

```bash
curl -X POST http://localhost:3000/api/contact \
  -H "X-Auth-Token: YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "Test",
    "message": "This is a test message for the contact form.",
    "recaptchaToken": "test_token"
  }'
```

---

## Best Practices

1. **Always Use HTTPS** in production
2. **Regenerate Tokens** for each request (don't reuse)
3. **Store Secrets Securely** (use environment variables, never commit to repo)
4. **Validate on Both Sides** (client and server)
5. **Handle Errors Gracefully** (show user-friendly messages)
6. **Log Security Events** (failed auth attempts, suspicious activity)
7. **Monitor API Usage** (track request rates, error rates)

---

## Future Enhancements

- [ ] Add API rate limiting
- [ ] Implement request caching (Redis)
- [ ] Add API versioning (`/api/v1/...`)
- [ ] Create API client library for easier consumption
- [ ] Add GraphQL endpoint as alternative
- [ ] Implement webhooks for real-time updates
- [ ] Add API usage analytics dashboard

---

## Support

For questions or issues with the API, please:

1. Check this documentation first
2. Review the implementation in `app/api/`
3. Check environment variables in `.env.example`
4. Contact the development team
