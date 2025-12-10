---
title: Glover
date: '2024-01-01'
---

As a **Senior Backend Engineer** at Glover, a premier Nigerian Fintech company, I was instrumental in fortifying and scaling a platform that serves thousands of users daily. Glover provides a suite of digital services including gift card trading, crypto payments, and airtime-to-cash conversions. My tenure was defined by solving critical infrastructure challenges, enhancing system security, and enabling rapid product growth through robust backend architecture.

## Key Contributions & Technical Impact

### 🔐 Advanced Login Security & Fraud Prevention

I architected a custom security layer designed to detect and flag suspicious login activities. By analyzing user behavior patterns—such as cross-border logins within suspicious timeframes—the system proactively protects user accounts.

- **Impact**: Significantly reduced account takeovers and provided users with transparent audit logs of their account activity.

### 🚀 Zero-Downtime Infrastructure Migration

One of my most significant technical achievements was leading the migration of the core monolithic application from **Laravel v7 to v12**.

- **Challenge**: The codebase was legacy, containing redundant logic and deprecated dependencies, operating on a live system with high daily active users.
- **Solution**: Executed a strategic, incremental upgrade plan that modernized the framework without a single minute of downtime.
- **Outcome**: Boosted system performance, patched critical security vulnerabilities, and improved developer velocity for the entire team.

### 💳 Secure Giftcard OCR System

To combat fraud and reduce manual review overhead, I built a smart validation system for gift card trading.

- **Innovation**: Integrated **Google's OCR API** to automatically scan and extract card details.
- **Security**: Implemented a complex validation logic that checks encrypted card data against a massive database of historical records to prevent duplicate usage.
- **Performance**: Optimized the search algorithm to perform these duplicate checks on encrypted data in real-time, ensuring a seamless user experience without compromising security.

### 🎁 High-Volume Rewards Distribution System

I engineered a resilient rewards engine for the company's "Holidays Reward" event.

- **Scale**: The system successfully processed and delivered card pins to thousands of users simultaneously via email.
- **Reliability**: Designed for fault tolerance to ensure every single reward was accounted for and delivered, maintaining 100% data integrity under heavy load.

### 🤝 Brand Ambassador & Affiliate Platform

I developed a comprehensive dashboard for managing the company's marketing campaigns.

- **Features**: Enabled brand ambassadors to track their performance, manage campaigns, and view real-time leaderboards.
- **Backend**: Built the logic for tracking referrals, calculating complex commission structures, and automating reward payouts.

### 💡 Infrastructure Optimization

Beyond feature development, I consistently worked on **system infrastructure upgrades**. I identified and removed dead code, optimized database queries, and introduced rigorous testing standards using **PestPHP** (migrated to industry-standard tools) to ensure code reliability.

## Technologies Used

- **Languages**: PHP, JavaScript (Node.js)
- **Frameworks**: Laravel, Nuxt.js
- **Databases**: PostgreSQL, MariaDB, Redis
- **Tools**: Docker, Google OCR API, Postman
