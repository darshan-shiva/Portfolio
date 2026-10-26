# Darshan S — Portfolio

React + TypeScript + Vite, with Lenis smooth scrolling and react-router.

```bash
npm install
npm run dev      # local dev server
npm run build    # production build in dist/
```

## Editing content
All text lives in `src/data.ts` (profile, projects, experience, skills, certifications).

## Photo
Drop a transparent-background cut-out of yourself at `public/profile.png`. The hero uses it automatically (the reference design places a cut-out portrait behind the big name); until then a large "DS" monogram is shown.

## LinkedIn
Set `profile.linkedin` in `src/data.ts` to your real profile URL and it will appear in the menu, contact page and footer.

## Deploy
`vercel.json` rewrites all routes to `index.html`, so `/work`, `/about` etc. work when opened directly.
