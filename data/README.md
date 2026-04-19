# Mock Data Structure

This directory contains mock data extracted from the Portfolio API. The data is structured to match the actual API responses so that the landing page can be populated with realistic content.

## Files

### `mock-data.ts`

Contains the following mock data objects:

#### `dashboardData`
Core portfolio information and branding
- `intro`: Name and primary roles
- `bio`: Professional bio/tagline
- `tagline`: Catchy professional statement
- `email`: Contact email
- `location`: Geographic location
- `expertise`: Primary and secondary skills

#### `portfolioProjects`
Array of portfolio project objects with:
- `id`, `name`, `description`
- `image_url`: Project screenshot/thumbnail
- `core_skill`: Primary technology stack
- `category`: Project category
- `tier`: Quality/complexity tier (S, A, B, C)
- `slug`: URL-friendly identifier
- `is_live`: Project status
- `skill_count`: Number of technologies used

#### `certificates`
Array of professional certifications with:
- `id`, `title`, `issuer`
- `date`: Certification date
- `image_url`: Certificate image/badge
- `credential_id`: Official credential identifier
- `featured`: Whether to highlight this cert

#### `jobExperience`
Array of job/role information with:
- `id`, `title`, `company`
- `duration`: Employment period
- `description`: Role description
- `type`: Employment type (FULL_TIME, CONTRACT, etc.)
- `location`: Job location
- `key_achievements`: List of major accomplishments

#### `blogs`
Array of blog post metadata with:
- `id`, `name`, `description`, `slug`
- `timestamp`: Publication date
- `author`: Post author
- `category`: Blog category
- `image_url`, `png_url`: Featured images
- `is_active`: Publication status

#### `skills`
Categorized skill listings:
- `languages`: Programming languages
- `frontend`: Frontend frameworks/tools
- `backend`: Backend frameworks/tools
- `ml`: Machine learning frameworks
- `cloud`: Cloud platforms
- `devops`: DevOps tools/practices
- `tools`: General tools and utilities

#### `stats`
High-level portfolio statistics:
- Projects completed
- GitHub contributions
- Certifications
- Years of experience
- Client satisfaction metrics

## Current Implementation

The landing page currently uses:
- **Hero Section**: Uses dashboard data for introduction and tagline
- **Feature Grid**: Placeholder for portfolio projects showcase (Terminal card now shows AI chatbot)
- **About Section**: Displays certification stats and professional summary
- **Pricing Section**: Shows collaboration/service offerings
- **Skill Stack**: Integrated in workflow diagram

## Future Integration

When connecting to the actual API:
1. Replace mock data imports with API calls
2. Create API client utilities for each endpoint
3. Implement caching strategy (SWR/React Query)
4. Handle loading and error states
5. Build individual project/blog detail pages

## API Endpoints Reference

Based on the Portfolio API documentation:
- `GET /api/dashboard/` - Portfolio overview
- `GET /api/portfolios/` - List all projects
- `GET /api/portfolios/{slug}/` - Project details
- `GET /api/certificates/` - List certifications
- `GET /api/jobs/` - List job experiences
- `GET /api/blogs/` - List blog posts
- `GET /api/blogs/{slug}/` - Blog post details
- `POST /api/contact/` - Contact form submission
- `POST /api/chatbot/chat/` - AI chatbot interaction
