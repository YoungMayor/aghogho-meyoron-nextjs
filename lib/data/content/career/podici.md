---
title: Lead Backend Engineer at Podici
---

## Overview

At **Podici**, a technology-driven e-commerce platform, I was brought on board to establish the technical direction and ensure architectural consistency across all backend microservices. I led a dedicated backend engineering team through periods of rapid growth, bridging the gap between product requirements and scalable, highly available systems.

## Key Architectural Wins

### Core Banking & Transaction APIs

E-commerce intrinsically relies on infallible transaction models. I architected and shipped scalable APIs directly interacting with core banking gateways, prioritizing low latency and absolute data integrity. By designing idempotency into every transaction request, we effectively eliminated double-charges and race conditions.

### Microservice Deployment & Rollouts

To expedite feature rollouts without risking the stability of the entire ecosystem, I compartmentalized the previous monolithic codebase into distinct, domain-driven microservices. This modular architecture drastically reduced deployment bottlenecks and allowed concurrent workstreams to thrive.

## Strategic Impact

- **Engineering Leadership:** Instituted rigorous best practices regarding version control, CI/CD pipelines, and deep code reviews. I mentored junior developers, elevating the overall bar of engineering quality through pair programming and comprehensive technical documentation.
- **Identity & Access Management:** Built an industry-standard user authentication and authorization matrix, tightly securing access tokens and locking down potential vulnerabilities associated with e-commerce data.
- **Database Optimization:** Directed the optimization of deeply nested schemas, leveraging indexing and partitioning to guarantee high availability across heavy read/write operations.

## Technologies Used

- **Languages / Stack:** TypeScript, Node.js, NextJS
- **Microservices & Messaging:** AWS SQS, Docker, Kubernetes
- **Databases:** PostgreSQL, MongoDB
- **Security:** JWT, OAuth 2.0, SSL/TLS, Idempotency keys
