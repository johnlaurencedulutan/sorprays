# 💜 Monthsary Website (Static, No Backend)

A pure HTML/CSS/JS romantic Monthsary surprise page — the playful YES/NO
question, a NO button that runs away, a growing YES button, and a heart-filled
celebration screen. No server, no database, no admin page — just the site.
Because there's no backend, there's also no way to see what she picked; it's
all in-browser.

## Files

```text
monthsary-static/
├── index.html
├── style.css
├── script.js
└── assets/
    ├── music/     ← put your own song.mp3 here (optional)
    └── images/
```

## Open it in VS Code

1. Open the `monthsary-static` folder in VS Code (**File → Open Folder…**).
2. Install the **Live Server** extension (search it in the Extensions panel) — this lets you preview the site with auto-refresh.
3. Right-click `index.html` → **Open with Live Server**. It opens in your browser at something like `http://127.0.0.1:5500`.

That's it — no `npm install`, no terminal commands needed, since there's no backend at all.

## Adding your own music (optional)

Drop an MP3 into `assets/music/` named `song.mp3`, or edit the `<source src="...">` line in `index.html` to match your filename. Music never autoplays — she taps the "Music 💜" button to turn it on.

## Publishing it online

See the main chat for step-by-step instructions on uploading this to GitHub and turning it on with GitHub Pages to get a public link.
