# Sitemiz — Bilingual Frontend Studio Website

<div align="center">

![Sitemiz](https://img.shields.io/badge/Sitemiz-Frontend%20Studio-C9A84C?style=for-the-badge&labelColor=0A0A0F)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![SEO](https://img.shields.io/badge/SEO-Optimized-4CAF50?style=for-the-badge)
![RTL](https://img.shields.io/badge/RTL-Supported-9C27B0?style=for-the-badge)

**وب‌سایت دوزبانه (فارسی / انگلیسی) برای استودیو طراحی سایت Sitemiz**

[🌐 Live Demo](https://amirdev404.github.io/SiteMiz/) · [🐙 GitHub](https://github.com/amirdev404) · [📬 Contact](mailto:amirf200282@gmail.com) · [📱 Telegram](https://t.me/amirfa404)

</div>

---

## 📸 Preview

```
Dark luxury design — gold (#C9A84C) on deep black (#0A0A0F)
Fully bilingual: EN ↔ FA with RTL/LTR switching
```

---

## ✨ Features

| Feature | Description |
|---|---|
| 🌍 **Bilingual** | Full FA ↔ EN switch with RTL/LTR layout flip |
| 🎯 **Custom Cursor** | Gold dot + lagging ring cursor |
| ⏳ **Loader Screen** | Animated percentage progress bar on page load |
| 🎬 **Scroll Reveal** | Elements animate in as you scroll |
| 🔢 **Counter Animation** | Numbers count up when stats section enters viewport |
| 🗂 **Portfolio Filter** | Filter projects by category (E-commerce, SaaS, Brand, Motion) |
| ❓ **FAQ Accordion** | Smooth open/close with bilingual answers |
| ✅ **Contact Form** | Validated form with chip selectors and budget dropdown |
| 📜 **Schema.org** | Full structured data: Business, Blog, FAQ |
| 🔝 **Scroll To Top** | Appears after 500px scroll |
| 📱 **Responsive** | Mobile-first, tested on all screen sizes |

---

## 🗂 Project Structure

```
sitemiz/
├── index.html      # Markup only — no inline CSS or JS
├── styles.css      # All styles, organized by section
├── main.js         # All JavaScript, modular functions
└── README.md       # You are here
```

---

## 📄 Sections

```
1.  Nav            — Fixed navbar with lang toggle & active link highlight
2.  Hero           — Full-screen hero with animated headline & stats
3.  Marquee        — Infinite scrolling tech stack strip
4.  Services       — 6 service cards with gold reveal on hover
5.  Portfolio      — Filterable project grid
6.  About          — Story, values, visual card
7.  Team           — 3 team member cards with socials
8.  Process        — 4-step numbered process
9.  Testimonials   — 3 client reviews
10. Blog           — 3 articles with Schema.org BlogPosting
11. Stats          — Animated counters (94+ projects, 97% Lighthouse...)
12. FAQ            — Accordion with Schema.org FAQPage (Google rich results)
13. Pricing        — 3 tiers, all negotiable
14. Contact        — Form with validation + contact details + socials
15. Footer         — Logo, links, socials, copyright
```

---

## 🔍 SEO

- `<title>` and `<meta description>` in both FA & EN
- `geo.region: IR` and `geo.placename: Iran`
- **Schema.org JSON-LD:**
  - `ProfessionalService` — name, phone, email, address, socials
  - `Blog` + `BlogPosting` — articles with author and date
  - `FAQPage` — eligible for Google featured snippets
- Open Graph + Twitter Card for social sharing
- `<link rel="canonical">` set to `https://amirdev404.github.io/SiteMiz/`
- `itemprop` microdata on blog articles

---

## ⚡ Performance

- Zero external JS dependencies
- Fonts loaded via Google Fonts with `preconnect`
- `<script defer>` — JS never blocks rendering
- CSS custom properties for instant theming
- Images replaced with CSS gradients (zero image requests)
- Intersection Observer for lazy scroll animations

---

## 🚀 Getting Started

### Clone the repo
```bash
git clone https://github.com/amirdev404/SiteMiz.git
cd SiteMiz
```

### Option 1 — Open locally
```bash
# Just open index.html in your browser
open index.html
```

### Option 2 — Serve locally
```bash
# Python
python3 -m http.server 3000

# Node (npx)
npx serve .
```

### Option 3 — Deploy to hosting
Upload all 3 files to your server root:
```
public_html/
├── index.html
├── styles.css
├── main.js
└── README.md
```

---

## 🌐 Language System

Switching language updates:
- `<html lang>` and `dir` attributes
- All `data-en` / `data-fa` text nodes
- Portfolio filter button labels
- Select option labels
- Portfolio arrow direction (→ / ←)
- Open FAQ answer text
- Form validation error messages
- Form success message

```javascript
// Switch to Farsi
setLang('fa');

// Switch to English
setLang('en');
```

---

## 🛠 Customization

### Change colors
Edit CSS variables in `styles.css`:
```css
:root {
  --gold:   #C9A84C;   /* primary accent */
  --black:  #0A0A0F;   /* page background */
  --dark:   #111118;   /* section backgrounds */
  --card:   #16161F;   /* card backgrounds */
  --white:  #F5F3EE;   /* text color */
  --muted:  #7A7A8C;   /* secondary text */
}
```

### Add a portfolio project
In `index.html`, inside `#portfolioGrid`:
```html
<div class="portfolio-item" data-category="saas">
  <div class="portfolio-bg" style="background: linear-gradient(135deg, #..., #...);"></div>
  <div class="portfolio-overlay">
    <div class="portfolio-cat" data-en="SaaS" data-fa="SaaS">SaaS</div>
    <div class="portfolio-name font-display" data-en="Project Name" data-fa="نام پروژه">Project Name</div>
    <div class="portfolio-arrow">→</div>
  </div>
</div>
```
Valid `data-category` values: `ecommerce` · `saas` · `brand` · `motion`

### Add an FAQ item
```html
<div class="faq-item" onclick="toggleFaq(this)">
  <div class="faq-q">
    <span data-en="Your question?" data-fa="سوال شما؟">Your question?</span>
    <span class="faq-icon">+</span>
  </div>
  <div class="faq-a"
       data-en="Your answer in English."
       data-fa="پاسخ شما به فارسی.">
    Your answer in English.
  </div>
</div>
```

---

## 📬 Contact

| Channel | Link |
|---|---|
| 📧 Email | [info@sitemiz.ir](mailto:amirf200282@gmail.com) |
| 📞 Phone | [09367091011](tel:+989367091011) |
| 💬 Telegram | [@amirf404](https://t.me/amirfa404) |
| 🐙 GitHub | [@amirdev404](https://github.com/amirdev404) |
| 📸 Instagram | [@amirdev404](https://instagram.com/amirdev404) |
| 💼 LinkedIn | [Amir Mohammad Farahani](https://linkedin.com/in/amir-mohammad-farahani) |

---

## 📝 License

```
amir-mohammad-farahaniMIT License — free to use, modify, and distribute.
© 2026 Sitemiz
```

---

<div align="center">

Made with ♥ by **[Sitemiz](https://amirdev404.github.io/SiteMiz/)** — طراحی سایت حرفه‌ای در ایران

</div>
