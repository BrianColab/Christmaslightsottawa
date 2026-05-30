# Christmas Lights Ottawa

Static marketing homepage for Christmas Lights Ottawa, built to deploy on Railway as a small Node-served site.

## Local Preview

```bash
npm start
```

Then open:

```text
http://localhost:3000
```

## Railway

Railway should detect this as a Node app and run:

```bash
npm start
```

The server listens on `process.env.PORT`, with `3000` as the local fallback.

## Main Files

- `index.html` - homepage structure
- `styles.css` - responsive Christmas visual system
- `data.js` - editable services, process steps, testimonials, areas, and gallery content
- `script.js` - section rendering, mobile nav, testimonial controls
- `assets/images/` - local site images
- `server.js` - static server for Railway

## Asset Note

Current site images are AI-generated placeholders focused on lower-level holiday lighting. Replace them with real project photos when available for stronger local trust and proof.
