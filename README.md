# Narsimulu Portfolio — Netlify-ready static build

This is a static export of your Django portfolio. Same design, same content, same
CSS/JS — it's just plain HTML now, since Netlify only serves static files and
can't run a Django app.

## Deploy (drag-and-drop, no config)

1. Go to https://app.netlify.com/drop
2. Drag this whole folder onto the page.
3. Done — you get a live URL immediately.

## Deploy via Git (auto-redeploy on every push)

1. Push this folder to a GitHub repo.
2. In Netlify: **Add new site → Import an existing project** → pick the repo.
3. Build command: leave blank. Publish directory: `.` (already set in `netlify.toml`).
4. Deploy.

## What changed vs. the Django version (only what deployment required)

- Django template tags (`{% static %}`, `{% for %}`, etc.) were rendered out into
  plain HTML — the visual output is identical.
- Static files were flattened from `portfolio/static/portfolio/...` to
  `css/`, `js/`, `img/`, `files/` at the site root.
- The contact form now uses **Netlify Forms** instead of a Django view, since
  there's no server to receive the POST. Submissions will show up in your
  Netlify dashboard under Site → Forms, and redirect to `thank-you.html`.
  No signup or extra service needed — Netlify detects the form automatically
  at deploy time.
- The Django `messages` framework block was removed since there's no backend
  session to populate it on a static site.

Everything else — layout, styling, copy, projects, skills, resume link — is
untouched.
