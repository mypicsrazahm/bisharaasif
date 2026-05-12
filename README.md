# Wedding Invitation Website

This is a complete static wedding invitation website inspired by the style and section flow of the reference you shared.

## Files

- `index.html`: Main page structure
- `styles.css`: Design and responsive layout
- `content.js`: All editable wedding content
- `script.js`: Dynamic behavior like opening animation, RSVP, and countdown

## How to change content

Open `content.js` and edit the values inside `window.WEDDING_CONTENT`.

### Change names

Edit:

```js
hero: {
  partnerOne: "Amaan Rashid",
  partnerTwo: "Sana Fathima"
}
```

### Change date

Edit:

```js
hero: {
  dateMain: "Sunday, 18 October 2026",
  dateAlternate: "06 Rabi' al-Thani 1448 AH"
},
countdown: {
  target: "2026-10-18T11:30:00+05:30"
}
```

Important:

- `dateMain` is the visible main date text.
- `dateAlternate` is optional extra date text.
- `countdown.target` controls the live countdown.

### Change family names and addresses

Edit:

```js
families: {
  sideOne: {
    label: "Groom",
    names: "Rashid K\n& Sameera Rashid",
    address: "Noor Manzil\nKottakkal Road\nMalappuram, Kerala",
    phone: "+919876543210"
  }
}
```

Use `\n` to move text to a new line.

### Change event names, venues, times, and map links

Edit:

```js
events: {
  options: [
    {
      label: "Nikah Ceremony",
      venue: "Masjid Noor\nMain Hall",
      details: "11:30 AM to 12:30 PM\nKottakkal, Kerala",
      mapUrl: "https://maps.google.com/?q=Masjid+Noor+Kottakkal"
    }
  ]
}
```

### Change RSVP email

Edit:

```js
rsvp: {
  email: "your-email@example.com",
  subject: "Wedding RSVP"
}
```

When guests submit the form, their email app opens and prepares the RSVP message to this email address.

## How to run

You can open `index.html` directly in a browser, or host it on:

- Netlify
- Vercel
- GitHub Pages
- Any normal web hosting

## Notes

- The design is mobile-friendly and desktop-friendly.
- No build step is required.
- If you want, this can be extended next with photo gallery, background music, WhatsApp RSVP, gift section, or story timeline.
