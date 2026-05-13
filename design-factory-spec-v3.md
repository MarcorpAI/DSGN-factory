# DESIGN FACTORY — Full Site Spec
**Direction:** Cinematic Scroll Experience
**Reference feel:** GSAP.com, Linear.app, Framer templates
**Version:** 3.0 — Final

---

## 01. THE EXPERIENCE IN ONE SENTENCE

You land on a dark, breathing page. A silk-like background pulses behind a headline
that feels too big for a screen. You scroll and the page *performs* — text assembles
itself, numbers climb, sections pin and release, the whole thing feels authored.
By the time you hit the waitlist form, you already trust the people who made this.

---

## 02. TECH STACK

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js 14 (App Router) | SSR, routing, performance |
| Styling | Tailwind CSS | Layout and spacing only |
| Animation | GSAP + ScrollTrigger + SplitText | The core scroll engine |
| Smooth scroll | Lenis | That buttery physical scroll feel |
| Hero background | ReactBits — `<Silk />` | Cinematic, iridescent, design-world |
| Fonts | Instrument Serif + Bricolage Grotesque + Inter | Google Fonts, free |
| Waitlist backend | Supabase | `waitlist(id, email, position, created_at)` |
| Hosting | Vercel | Default for Next.js |

### Why Silk from ReactBits
Silk renders a flowing, iridescent cloth-like animation in canvas. It's not particles,
not a grid, not stars — it's pure form and color in motion. Behind a dark overlay and
a strong headline it reads as intentional art direction, not a template background.
It's also lightweight and GPU-accelerated.

Install: `npm install @reactbits/silk` (or copy the component directly from reactbits.dev)

### GSAP Setup Notes
- SplitText splits headlines into lines/words for staggered reveals
- ScrollTrigger ties animation progress to scroll position — not just on-enter
- The scrub value (e.g. `scrub: 1.5`) adds lag between scroll and animation,
  making it feel physical
- All ScrollTriggers use `start: "top 80%"` unless specified otherwise
- Lenis is initialized once in a root layout component and its raf loop
  feeds into GSAP's ticker: `gsap.ticker.add((time) => lenis.raf(time * 1000))`

---

## 03. COLOR SYSTEM

| Token | Value | Usage |
|---|---|---|
| `--bg` | `#06060A` | Primary background throughout |
| `--bg-alt` | `#0E0E16` | Alternate section backgrounds |
| `--white` | `#FFFFFF` | Primary text |
| `--muted` | `rgba(255,255,255,0.45)` | Secondary text, labels |
| `--dim` | `rgba(255,255,255,0.12)` | Borders, dividers |
| `--accent` | `#7C3AED` | Primary accent — violet |
| `--accent-2` | `#06B6D4` | Secondary accent — cyan |
| `--gradient` | `linear-gradient(135deg, #7C3AED, #06B6D4)` | CTAs, highlights |

Color rules:
- The page is almost entirely dark. This is non-negotiable.
- The gradient appears on: CTA buttons, the waitlist section headline,
  and one or two pulled highlights in the copy. Nowhere else.
- No white sections anywhere except the footer (which can go slightly lighter
  as a visual exhale after the intensity of the page).
- Borders and dividers are `--dim` — barely visible, felt more than seen.

---

## 04. TYPOGRAPHY

| Role | Font | Weight | Notes |
|---|---|---|---|
| Display / Hero | Instrument Serif | 400 italic | Emotional register, editorial |
| Headings | Bricolage Grotesque | 700–800 | Bold, geometric, contemporary |
| Body | Inter | 400 | Clean, neutral, never competes |
| Labels | Inter | 500 | Uppercase, tracked, small |

### Scale
```
Hero headline:    clamp(52px, 8vw, 96px)
Section heading:  clamp(36px, 5vw, 64px)
Sub-heading:      clamp(22px, 3vw, 36px)
Body:             16–18px, line-height 1.7
Label:            11–12px, letter-spacing 0.1em, uppercase
```

### Typography rules
- The serif italic is the emotional voice — use it for the headline and
  one key pull quote. Everything else is grotesque.
- Mix the two within a single line for contrast: a grotesque word next
  to a serif italic word in the same heading creates tension without effort.
- Body copy: max 60 characters per line. Use `max-width: 56ch` on paragraphs.
- No centered text except the final CTA section. Everything else: left-aligned.

---

## 05. ANIMATION SYSTEM

### Text Reveals — SplitText
Every section headline uses the same reveal pattern:
1. SplitText splits the element into lines
2. Each line starts at `y: 60, opacity: 0` with a clip-mask below the baseline
3. Lines stagger in with `0.12s` between each, `duration: 0.8`, ease `power3.out`
4. Triggered by ScrollTrigger on section enter

This is the signature animation. It makes text feel like it's being revealed,
not loaded. Every major headline on the page uses it.

### Scrubbed Animations
Used when animation progress should be tied to scroll distance, not just entry.
The stat counters, the timeline draw, and the horizontal scroll section all use scrub.
`scrub: 1.5` gives a slight lag that feels physical, not mechanical.

### On-Enter Animations
Used for supporting content (body paragraphs, labels, secondary elements).
Simple `y: 30, opacity: 0` → resting state. Faster than text reveals: `duration: 0.5`.

### Hover Interactions
- CTA buttons: gradient border traces itself on hover (CSS clip-path animation)
- Navigation links: a thin gradient underline slides in from left on hover
- Testimonial quotes: very subtle scale (1.0 → 1.015) on hover

---

## 06. SITE STRUCTURE — FULL PAGE MAP

---

### 00 — NAVIGATION

**Behavior:** Starts transparent over the hero. On scroll past 80px becomes
a frosted glass bar (`backdrop-filter: blur(20px)`, `background: rgba(6,6,10,0.7)`).
Transition: `0.3s` ease.

**Left:** `Design Factory` in Bricolage Grotesque 600, 14px, white.

**Center:** Nav links — Program / Curriculum / Stories / FAQ.
Font: Inter 400, 13px, `--muted`. Hover: gradient underline slides in.

**Right:** `Join the Waitlist` — small, gradient border button.
On hover: gradient fills the background.

**Mobile:** Center and right collapse into a minimal hamburger.
Full-screen overlay menu on open.

---

### 01 — HERO

**Height:** 100vh, minimum 700px.

**Background:**
ReactBits `<Silk />` component fills the entire section.
Configuration:
```
speed: 5
scale: 1
noiseIntensity: 1.5
rotation: 0
color: '#7C3AED'   (the violet bleeds into its internal palette)
```
A dark overlay sits on top: `background: linear-gradient(to bottom, rgba(6,6,10,0.55), rgba(6,6,10,0.85))`
The overlay is heavier at the bottom so the hero content reads clearly
while the silk animation breathes through at the top.

**Layout:** Vertically centered content, left-aligned, max-width 780px, padded 80px left.

**Eyebrow:** Small label above the headline.
`— Cohort One, 2025` in Inter 500, 12px, uppercase, `--accent` color, letter-spacing wide.
Animates in: `opacity: 0 → 1`, `x: -20 → 0`, `duration: 0.6`, no scroll trigger (plays on load).

**Headline:** Two lines. Mix of serif italic and grotesque.
```
Where designers
learn to think.
```
"Where designers" in Bricolage Grotesque 800.
"learn to think." in Instrument Serif italic.
Size: `clamp(52px, 7.5vw, 92px)`. Tight line-height: 1.05.
Animates: SplitText line reveal, plays on load after eyebrow (0.3s delay).

**Subheadline:** Single line below the headline.
`An 8-week intensive for designers who want to understand the work — not just do it.`
Inter 400, 17px, `--muted`. Max-width 520px.
Animates in: `y: 20, opacity: 0 → rest`, 0.5s delay after headline.

**CTA Row:** Two elements side by side, gap 20px.
- Primary: `Reserve your spot` — gradient background button, white text, no border-radius.
  Padding: 14px 28px. Font: Inter 600, 14px.
- Secondary: `See the curriculum →` — no background, `--muted` text.
  Arrow nudges right 4px on hover.
Both animate in together: `y: 20, opacity: 0`, 0.7s delay.

**Bottom of hero — stats strip:**
Three numbers separated by vertical rules (`--dim`).
```
247         |    8 weeks    |    3 tracks
On waitlist |  Program      |  Core
```
Numbers: Bricolage Grotesque 700, 28px.
Labels: Inter 400, 12px, `--muted`.
This strip sits `40px` from the bottom of the hero viewport.
Animates: stagger fade-up, 0.9s delay (last thing to appear on load).

**Scroll indicator:** Bottom-center. A thin vertical line, 48px tall, animated
with a slow `scaleY` loop from top to bottom. `--muted` color. Disappears after
first scroll interaction.

---

### 02 — THE STATEMENT

**Height:** 100vh.
**Background:** `--bg`. Nothing else. This section breathes.

**Intent:** One idea. Maximum impact. No supporting content, no lists.
The whitespace does the work.

**Layout:** Centered vertically and horizontally. Max-width 800px.

**Content:**
One paragraph. Large. In Instrument Serif italic, `clamp(28px, 3.5vw, 44px)`.
Line-height 1.45. Color: `--white`.

```
"Most design education teaches you to copy what works.
We teach you why it works — so you can make what's next."
```

A short rule line (60px wide, 1px, `--accent`) sits above the quote.
Below: `— Design Factory` in Inter 500, 13px, `--muted`.

**Animation:** The quote uses SplitText by word. Words fade + slide up
with a tight stagger (`0.04s` between words) triggered on scroll enter.
Feels like the sentence is being typed by a steady hand.

---

### 03 — THE PROBLEM

**Height:** auto (likely 120–150vh with padding).
**Background:** `--bg-alt`.

**Intent:** Hit the reader with the reality of design education in numbers.
No explanation needed — the stats speak.

**Layout:** Three rows, full-width, stacked. Each row is the entire viewport width.

Each row structure:
- A massive number on the left: Bricolage Grotesque 800,
  `clamp(80px, 14vw, 160px)`, `--white`, opacity 15% initially.
- A statement on the right: Inter 400, 18px, `--muted`, max-width 440px.
- A 1px `--dim` rule above each row.

```
93%     of design graduates can't explain
        why they made a single decision.

1 in 11 design programs teach systems thinking.
        The rest teach you to use the tools.

0       real-world briefs in most curriculums.
        We thought that was a problem worth fixing.
```

**Animation:** Each row is a ScrollTrigger scrubbed animation.
As the row enters the viewport, the number counts up from 0 to its value
(using GSAP's `TextPlugin` or a simple JS counter) and jumps from
`opacity: 0.15` to `opacity: 1`. The statement slides in from the right
simultaneously. Scrub is off here — these are on-enter, fast, punchy.

---

### 04 — THE PROGRAM

**Height:** 100vh.
**Background:** `--bg`.

**Intent:** Explain what Design Factory actually is in plain, confident language.
This is a manifesto paragraph, not a feature list.

**Layout:** Left-aligned. Top-left has a small label. Below: a large heading.
Below that: two short paragraphs of body copy. That's it.

**Label:** `What we do` — Inter 500, 11px, uppercase, `--accent`.

**Heading:**
```
We build designers
who build things.
```
Bricolage Grotesque 800, large. The second line in Instrument Serif italic
for contrast.

**Body:** Two paragraphs max, 3 sentences each. The writing needs to be tight.
Placeholder tone:
```
Design Factory is an 8-week program built around one belief:
that good design is reasoned, not intuited.

Every week, you'll work through real briefs with real feedback.
No recreating Dribbble shots. No tutorial loops.
Just the kind of work that makes a portfolio mean something.
```

**Animation:** Label fades in. Heading does SplitText line reveal.
Body paragraphs fade up line by line with a gentle stagger.

---

### 05 — CURRICULUM (PINNED HORIZONTAL SCROLL)

**This is the GSAP showcase section.**

**Behavior:** The section pins to the viewport as you scroll. Instead of
scrolling down, the three curriculum tracks slide horizontally from right
to left. Each track gets its own full-screen moment. After the third track
passes, the pin releases and vertical scroll resumes.

**Implementation:**
```javascript
gsap.to('.tracks-container', {
  x: () => -(tracksContainer.scrollWidth - window.innerWidth),
  ease: 'none',
  scrollTrigger: {
    trigger: '.curriculum-section',
    start: 'top top',
    end: () => `+=${tracksContainer.scrollWidth - window.innerWidth}`,
    pin: true,
    scrub: 1,
    anticipatePin: 1,
  }
})
```

**Before the pin:** A full-width header section that slides up into the pinned area:
```
The Curriculum
Three tracks. Built in sequence.
```

**Each track panel (full viewport width):**
Track number: `01 / 03` in Inter 500, 12px, `--muted`.
Track name: Bricolage Grotesque 800, 72px, white. (e.g. `Foundations`)
Description: Inter 400, 17px, `--muted`, max-width 480px, below the name.
Week breakdown: 4–5 short lines listing what each week covers.
A vertical rule on the right edge separates tracks (except last).

**Track names and content:**
```
01  Foundations
    The thinking behind every design decision.
    Weeks: Visual perception / Grid systems /
    Typography / Hierarchy / Colour theory

02  Systems
    How design scales across products.
    Weeks: Design systems / Component logic /
    Pattern libraries / Documentation / Handoff

03  Production
    Real briefs. Real feedback. Real output.
    Weeks: Brief interpretation / Ideation /
    Iteration / Critique / Final presentation
```

**Background shift:** Each track has a very subtle background tint shift.
Track 01: `--bg`. Track 02: slightly warmer. Track 03: `--bg-alt`.
Done with `backgroundColor` tween tied to scroll progress.

---

### 06 — THE PROCESS (SCRUBBED TIMELINE)

**Height:** 200vh (tall section — scroll draws it out).
**Background:** `--bg`.

**Intent:** Show the 8-week journey as a timeline that literally draws itself
as you scroll. The scroll IS time passing.

**Layout:** A vertical center line runs top to bottom of the section.
Eight nodes sit on this line — one per week. Left side: odd weeks.
Right side: even weeks. Each node has a week number and a 2-line description.

**Animation:**
- The center line starts at 0 height and grows to 100% as scroll progresses.
  `scaleY: 0 → 1` from the top, `transformOrigin: 'top center'`, scrubbed.
- Each week's content starts invisible. When the timeline reaches that node,
  the content fades in and the node dot scales up (`scale: 0 → 1`).
- Each week animates in sequence, tied to scroll position.
- Uses `ScrollTrigger.create` with individual start points per node.

**Week content (abbreviated):**
```
Wk 01  Orientation + Visual Foundations
Wk 02  Grid Systems + Spatial Reasoning
Wk 03  Typography as Communication
Wk 04  Colour, Contrast, Hierarchy
Wk 05  Design Systems Introduction
Wk 06  Component Architecture
Wk 07  Real Brief — Week One
Wk 08  Real Brief — Presentation + Critique
```

---

### 07 — WHO IT'S FOR

**Height:** 100vh.
**Background:** `--bg-alt`.

**Intent:** Let the reader self-select. Two columns — who this IS for,
who it's NOT for. No hedging.

**Layout:** Two columns, equal width, generous gap. Left column is white text.
Right column is `--muted` text. A vertical rule separates them.

**Left — This is for you if:**
(No bullet points — each item is its own line, body size, left-aligned)
```
You've been designing for 1–3 years and feel stuck.
You can execute but don't understand why things work.
You want a portfolio that reflects thinking, not just craft.
You're ready to be challenged.
```

**Right — This probably isn't for you if:**
```
You're looking for another tool tutorial.
You want a certificate to hang on a wall.
You're not ready to share work for critique.
```

**Below both columns:** A single line in Instrument Serif italic, large:
`"If you're unsure, you're probably ready."`

**Animation:** Left column items stagger in from the left.
Right column items stagger in from the right. Both triggered on enter.

---

### 08 — TESTIMONIALS

**Height:** auto — one quote at a time, stacked with generous padding.
**Background:** `--bg`.

**Intent:** Quotes at a scale that makes them impossible to skim.
Not a carousel. Not a card grid. Just quotes.

**Layout:** Each testimonial is its own section block — 80vh tall, centered content.
One quote per block. Large. The attribution below is small.

**Quote typography:** Instrument Serif italic, `clamp(24px, 3.2vw, 40px)`,
`--white`, max-width 720px, centered.

**Attribution:** Inter 500, 13px, `--muted`. Two lines: name + role.

**Number of testimonials:** 3 is enough. Any more and it loses weight.

**Animation:** Each quote does the SplitText word-stagger reveal on enter.
Attribution fades in 0.3s after the last word lands.

**Visual detail:** A large, barely-visible quotation mark (`"`) in
Instrument Serif, 240px, `opacity: 0.04`, sits behind each quote.
Decorative — gives the section depth without adding noise.

---

### 09 — PRICING / COHORT

**Height:** auto.
**Background:** `--bg-alt`.

**Intent:** Simple. One cohort, one price, what's included.
No pricing table. No comparison tiers. One clear offer.

**Layout:** Two columns. Left: the offer. Right: what's included.

**Left:**
Label: `Cohort One`
Price: Large number. Bricolage Grotesque 800. (Mark fills actual price)
Duration: `8 weeks · Remote-friendly · Starts [Date]`
CTA: `Reserve your spot` button.

**Right — What's included:**
Not a bullet list — each item is its own line, Inter 400, 16px, `--muted`.
Left border `--dim` on the entire column.
```
Three full curriculum tracks
Weekly live sessions + recordings
Real brief project with feedback
Portfolio review at close
Private cohort community
```

**Animation:** Left column slides in from left. Right column fades in.

---

### 10 — FAQ

**Height:** auto.
**Background:** `--bg`.

**Layout:** Stacked accordion. Each item is a row with a question on the left
and a `+` icon on the right. On click, the answer expands smoothly below.
GSAP handles the expand: `height: 0 → auto` using `gsap.set` + `gsap.to`.

**Typography:** Questions: Bricolage Grotesque 600, 17px, white.
Answers: Inter 400, 16px, `--muted`.

**Dividers:** 1px `--dim` rule between each item. That's all.

**Suggested questions:**
```
Who is this program for?
Is this fully remote?
What's the time commitment per week?
Do I need a portfolio to apply?
What happens after the waitlist?
Will there be more cohorts?
```

---

### 11 — FINAL CTA / WAITLIST

**Height:** 100vh.
**Background:** Gradient — `linear-gradient(135deg, #1A0533 0%, #06060A 60%)`
A deep violet fade to near-black. The only section where the gradient
lives in the background.

**Intent:** The payoff. Everything on the page has built to this moment.
Keep it simple. Don't explain again — just convert.

**Layout:** Centered. Vertically and horizontally.

**Headline:**
```
You're next.
```
Instrument Serif italic, massive — `clamp(64px, 11vw, 128px)`.
The gradient applied to the text itself (webkit background-clip).

**Subline:** `Cohort One is forming. Reserve your spot before it fills.`
Inter 400, 16px, `--muted`. Below the headline.

**Form:**
Single email input + submit button on one row.
- Input: `--bg` background, `--dim` border, white text, 16px, height 52px.
  Placeholder: `your@email.com` in `--muted`. No border-radius.
- Button: gradient background, white text, Inter 600, 14px, height 52px,
  min-width 180px, no border-radius. Text: `Reserve my spot`.
  On hover: brightness + 10%.

**On submit:** The form smoothly crossfades to:
```
You're #248 in line.
We'll reach out when your cohort opens.
```
The number is the gradient text, large. The message is `--muted`, small.

**Below the form:** `No spam. No newsletter. Just your spot.`
Inter 400, 12px, `--muted`.

**Animation:** The headline does a massive SplitText reveal —
by character, not line. Each letter sweeps up with `stagger: 0.04`.
The form fades in below after the headline lands.

---

### 12 — FOOTER

**Height:** auto, generous padding.
**Background:** `--bg` — back to base.
**Border:** 1px `--dim` top.

**Layout:** Three columns.
Left: `Design Factory` wordmark + one-line description below it.
Center: Nav links repeated (Program / Curriculum / Stories / FAQ / Waitlist).
Right: `Abuja, Nigeria` + `© 2025 Design Factory`.

**Typography:** All Inter, small, `--muted`. Wordmark in Bricolage 600, white.

---

## 07. RESPONSIVE STRATEGY

| Breakpoint | Key Changes |
|---|---|
| `< 1024px` | Horizontal scroll curriculum becomes vertical stacked panels |
| `< 768px` | Hero headline drops ~30%, stats strip goes 2+1 layout |
| `< 768px` | Who It's For columns stack vertically |
| `< 768px` | Timeline goes single column (all items on right side of line) |
| `< 480px` | Nav center links hidden, hamburger only |
| `< 480px` | Final CTA form stacks (input above button) |

---

## 08. PERFORMANCE NOTES

- Lenis + GSAP ticker: initialize once in `layout.tsx`, expose via context
- SplitText: run inside `useLayoutEffect` after fonts load (use `document.fonts.ready`)
- ReactBits Silk: lazy-loaded, wrapped in `dynamic(() => import(...), { ssr: false })`
- ScrollTrigger: refresh on route change and window resize
- GSAP registered plugins once at module level: `gsap.registerPlugin(ScrollTrigger, SplitText, TextPlugin)`
- All GSAP contexts cleaned up on component unmount

---

## 09. COMPONENT TREE

```
/app
  layout.tsx          ← Lenis init, GSAP ticker, font loading
  page.tsx            ← Section assembly

/components
  /nav
    Nav.tsx
  /sections
    Hero.tsx
    Statement.tsx
    Problem.tsx
    Program.tsx
    Curriculum.tsx    ← Horizontal scroll + pin
    Process.tsx       ← Scrubbed timeline
    WhoItsFor.tsx
    Testimonials.tsx
    Pricing.tsx
    FAQ.tsx
    Waitlist.tsx
    Footer.tsx
  /ui
    SplitHeadline.tsx    ← Reusable SplitText wrapper
    AnimatedStat.tsx     ← Count-up number
    HorizontalScroll.tsx ← GSAP pin + scrub wrapper
    Timeline.tsx         ← Scrubbed draw animation
    WaitlistForm.tsx     ← Form + success state
    FAQItem.tsx          ← Accordion item
  /backgrounds
    SilkHero.tsx         ← ReactBits Silk, lazy loaded
```

---

*Spec v3.0 — Final direction. Ready to build.*
