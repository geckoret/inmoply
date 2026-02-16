# Deploying to Cloudflare Pages

This project is configured to be deployed on Cloudflare Pages using Cloudflare Workers via `@cloudflare/next-on-pages`.

## Prerequisites

- A Cloudflare account.
- This repository pushed to GitHub/GitLab.

## Configuration

The project is already configured with:
- `@cloudflare/next-on-pages` adapter.
- `wrangler.toml` with `nodejs_compat` compatibility flag.
- Edge runtime enabled for API routes (`src/app/api/ai-search/route.ts`).

## Deployment Steps

1.  **Log in to Cloudflare Dashboard** and go to **Workers & Pages**.
2.  Click **Create Application** > **Pages** > **Connect to Git**.
3.  Select this repository.
4.  **Configure the build settings**:
    - **Framework Preset**: Select `Next.js`.
    - **Build command**: `npx @cloudflare/next-on-pages`
    - **Build output directory**: `.vercel/output/static`
    - **Node.js Version**: Ensure it is set to a recent version. You can set an environment variable `NODE_VERSION` to `20` if needed.

5.  **Environment Variables**:
    - Add any required environment variables (e.g., `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `GOOGLE_GENERATIVE_AI_API_KEY`, etc.) in the Cloudflare Pages settings under **Settings** > **Environment variables**.

6.  **Deploy**: Click **Save and Deploy**.

## Local Preview

To preview the build locally with Wrangler:

1.  Run the build:
    ```bash
    npm run pages:build
    ```
2.  Preview using Wrangler (requires Wrangler installed or use npx):
    ```bash
    npx wrangler pages dev .vercel/output/static --compatibility-flags=nodejs_compat
    ```

## Important Notes

- **Image Optimization**: Cloudflare Pages does not support the default Next.js Image Optimization API out of the box. Images using `<Image />` might fail to load or not be optimized unless you use a custom loader (e.g., Cloudflare Images, Cloudinary) or enable `unoptimized: true` in `next.config.ts`.
- **Edge Runtime**: API routes and dynamic pages run on the Edge. Ensure any third-party libraries used in these routes are compatible with the Edge Runtime (or use `nodejs_compat`).
