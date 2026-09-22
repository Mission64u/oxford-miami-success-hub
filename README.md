# Oxford-Miami Community Toastmasters — Destination: Distinguished

A static Club Success Hub designed for GitHub Pages.

## What is included

- Success Plan dashboard
- Pathways progress bars
- Journey-to-Distinguished visual roadmap
- Virtual passport stamps
- Brag Board
- Confetti celebration
- Short original browser-generated fanfare (no music file required)
- Social celebration banner generator (downloads a PNG)
- Two virtual invitation cards with Copy / Email / Share buttons
- Personal member goal plan saved in the visitor's browser
- Print / Save-as-PDF for the goal plan
- Responsive mobile layout

## Files

- `index.html` — site structure
- `styles.css` — all visual styling
- `club-data.js` — **the main file officers edit**
- `app.js` — dashboard, celebration, sharing, banner generator, and goal-plan logic

## The easiest way to update the site

Open `club-data.js`.

You can change:

- dashboard metrics
- education completion counts
- projected member names
- journey milestones
- passport stamps
- Brag Board achievements
- invitation wording
- the live website address

### Add a new achievement

Inside `achievements`, add:

```js
{
  name: "Member Name",
  achievement: "Completed Pathways Level 2",
  date: "October 2026",
  badge: "LEVEL 2"
}
```

The newest item (last in the list) is used by the celebration popup and social-banner generator.

### Mark a passport stamp as earned

Change:

```js
earned: false
```

to:

```js
earned: true
```

## Publish with GitHub Pages

1. Create a new GitHub repository, for example `oxford-miami-success-hub`.
2. Upload all files from this folder to the repository root.
3. In GitHub, open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Choose the `main` branch and `/ (root)`, then save.
6. GitHub will provide the public website URL.
7. Put that URL in `club-data.js` under `club.website`.

## Work in VS Code

1. Open this folder in VS Code.
2. Install the optional **Live Server** extension if you want one-click local preview.
3. Open `index.html` in Live Server, or simply open `index.html` in a browser.
4. Edit `club-data.js` as progress changes.

## About member goal data

The goal form uses `localStorage`. That means:

- a member's entries stay in that browser/device;
- the entries are **not sent to GitHub**;
- the club cannot see other members' goals from this version;
- members can print/save their own goal sheet as a PDF.

This is intentional for Version 1 because it avoids collecting personal member data.

## About the sound

The celebration sound is generated in the browser using the Web Audio API. It is not a copyrighted song or a clip from *Mission: Impossible*.

## Branding note

No official Toastmasters logo or protected artwork is embedded in this starter. If your club has permission to use official brand assets, you can add them to the page while following Toastmasters International brand guidance.

## Good Version 2 upgrades

- Google Sheet or database-backed shared progress
- officer-only update form
- member photo uploads
- automatic badge assignment
- QR code invitation
- monthly archive of Brag Board celebrations
- admin login
