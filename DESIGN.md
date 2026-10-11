---
name: TRZASK palarnia
description: Small-batch roastery shop where every coffee is a printed bag label in its own full colour field, roast date stamped on.
colors:
  ink: "#17120f"
  ink-2: "#4a403a"
  ink-3: "#6f6560"
  paper: "#ffffff"
  stock: "#f3f1ed"
  line: "#e2ddd6"
  roast: "#15110e"
  on-roast: "#f5efe8"
  on-roast-2: "#c9bdb2"
  saffron: "#f2b705"
  cobalt: "#2443c7"
  ok: "#1f6b45"
  bad: "#c23a22"
  label-tomato: "#c8321c"
  label-plum: "#6e2a63"
  label-raspberry: "#b8336d"
  label-forest: "#1f6b45"
  label-orange: "#f07a1a"
  label-sky: "#8cc5ea"
typography:
  display:
    fontFamily: "Anybody, Figtree, sans-serif"
    fontSize: "clamp(46px, 7.4vw, 104px)"
    fontWeight: 900
    lineHeight: 0.95
    letterSpacing: "-0.01em"
    fontVariation: "'wdth' 125"
  headline:
    fontFamily: "Anybody, Figtree, sans-serif"
    fontSize: "clamp(34px, 5.4vw, 72px)"
    fontWeight: 900
    lineHeight: 0.95
    letterSpacing: "-0.01em"
    fontVariation: "'wdth' 125"
  title:
    fontFamily: "Anybody, Figtree, sans-serif"
    fontSize: "18px"
    fontWeight: 900
    lineHeight: 1.1
    fontVariation: "'wdth' 118"
  body:
    fontFamily: "Figtree, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Figtree, system-ui, sans-serif"
    fontSize: "13px"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "0.06em"
  button:
    fontFamily: "Anybody, Figtree, sans-serif"
    fontSize: "15px"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "0.02em"
    fontVariation: "'wdth' 118"
rounded:
  none: "0px"
spacing:
  gutter: "clamp(16px, 4vw, 40px)"
  wrap: "1280px"
  section: "clamp(72px, 9vw, 128px)"
  section-tight: "clamp(64px, 8vw, 112px)"
  gap-sm: "8px"
  gap-md: "12px"
  gap-lg: "20px"
components:
  button-dark:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    padding: "0 26px"
    height: "52px"
  button-dark-hover:
    backgroundColor: "#3a2d24"
  button-light:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    padding: "0 26px"
    height: "52px"
  button-light-hover:
    backgroundColor: "{colors.saffron}"
  button-line:
    backgroundColor: "transparent"
    textColor: "{colors.paper}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    padding: "0 26px"
    height: "52px"
  button-line-hover:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
  filter-chip:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "0 18px"
    height: "44px"
  filter-chip-on:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  input:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "0 14px"
    height: "52px"
  cart-button:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.none}"
    padding: "0 14px 0 12px"
    height: "44px"
---

# Design System: TRZASK palarnia

## Overview

**Creative North Star: "The Bag Label"**

Every surface is printed matter from a roastery: white bag stock, roast-black ink, and one saturated label colour per coffee. The product grid is not a grid of cards; it is a shelf of labels, each a full colour field carrying its name in expanded black caps, an ink stamp with the roast date, and a perforated tear-off edge where the buying controls begin. Around the labels the system stays near-monochrome so the label colours are the only chroma on the page.

Type is loud and square: Anybody at weight 900, stretched wide and set in caps, does all headline work; Figtree carries reading text and controls at normal width. Corners are square everywhere. Structure comes from ink rules (3px and 6px tops, 2px frames, 1px and dashed dividers) rather than boxes and shadows. The cart is a waybill ("List przewozowy") with sender/recipient columns and a barcode; the order confirmation is a stamp. Data (prices, weights, brew ratios) is set in tables with tabular numerals.

The dark roast field (photo hero, roasting section, footer) is the one deep surface; it sits against white paper and warm grey stock sections that alternate down the page.

**Key Characteristics:**
- One full-saturation colour field per coffee; neutrals everywhere else.
- Anybody 900, expanded 118 to 150 percent width, uppercase, for every heading and button.
- Square corners without exception (0px).
- Rotated ink stamps carry dates and confirmations.
- Ink rules and tables, not cards, organise information.
- Saffron is the single utility highlight outside the labels.

## Colors

A neutral ink-on-paper base, one utility highlight, and a categorical palette of label colours where each coffee owns one hue at full strength.

### Primary
- **Roast-Black Ink** (ink): text, solid dark buttons, frames around segmented controls and quantity steppers, the 3px rules that head tables and the 6px rule that caps the receipt. Selected states fill with it.

### Secondary
- **Saffron** (saffron): the single highlight outside the labels. Hover fill for light buttons, the cart count badge, text selection, the hero roast stamp on the dark photo, the free-shipping row, and the toast action. Always paired with ink text, never used as text on white.

### Tertiary
- **Label palette** (label-tomato, label-plum, label-raspberry, label-forest, label-orange, label-sky, plus saffron and cobalt): each coffee's bag-label field. Light fields (saffron, orange, sky) take ink text; dark fields (tomato, cobalt, plum, raspberry, forest) take white text. The same colour reappears as the small square chip beside the coffee in the cart and receipt lines.
- **Cobalt** (cobalt): a label colour that also serves as the focus ring (3px outline, 3px offset) and the input focus glow at 35 percent alpha.

### Neutral
- **Bag Stock White** (paper): page background, label buy panel, header, drawer, inputs.
- **Warm Stock Grey** (stock): alternating section background (shelf, delivery), order page background, progress track.
- **Ink 2** (ink-2): secondary prose and summary labels.
- **Ink 3** (ink-3): metadata, column heads, logo sublabel, placeholders for helper text.
- **Hairline** (line): 1px dividers, resting input and choice borders, dashed list separators.
- **Roast Field** (roast): hero base, roasting section, footer, browser theme colour.
- **On Roast / On Roast 2** (on-roast, on-roast-2): primary and secondary text on the roast field.
- **Status** (ok, bad): ok fills the free-shipping progress and colours the order-accepted stamp; bad marks invalid fields, form errors and the remove-item hover.

### Named Rules
**The One Label, One Colour Rule.** A coffee owns exactly one hue, used as a full flat field on its label and as its chip in the cart. No gradients, tints or second colours inside a label.

**The Labels Carry the Chroma Rule.** Outside the label faces the page is ink, paper, stock and roast. Saffron is the only exception and it marks utility (count, highlight, free threshold), never decoration.

## Typography

**Display Font:** Anybody (with Figtree, sans-serif), variable width 75 to 150, weights 500 to 900
**Body Font:** Figtree (with system-ui, sans-serif), weights 400 to 700

**Character:** A wide, heavy grotesk in caps reads like a label printed with a rubber stamp and a block press; Figtree underneath is plain, friendly and quiet so the headings can shout.

### Hierarchy
- **Display** (900, clamp(46px, 7.4vw, 104px), 0.95, width 125%, caps): the hero headline only. On phones it drops to clamp(34px, 10.2vw, 54px) at width 112%.
- **Headline** (900, clamp(34px, 5.4vw, 72px), 0.95, width 125%, caps, balanced wrap): section headings. Order page h1 runs clamp(40px, 6vw, 76px).
- **Label Name** (900, container-relative ~10.6 to 11.5cqi, 0.92, width 118%, caps): the coffee name on its label, sized to the label's own width so long and short names both fill the field.
- **Title** (900, 17 to 22px, 1.1, width 118 to 125%, caps): table row names, cart line names, fieldset legends (22px), drawer and receipt headings (24px).
- **Body** (400, 17px desktop, 16px under 640px, 1.6): prose capped at 30 to 40em.
- **Label** (700, 13px, 0.06em, caps): label meta row, table column heads; waybill party labels and columns run 11.5px at 0.08em.
- **Button** (800, 15px, 0.02em, width 118%, caps): all `.btn` buttons.

### Named Rules
**The Stretched Caps Rule.** Every heading, legend, product name and button is Anybody 900 (800 for buttons) in uppercase with width stretched to 118 percent or more. Figtree never sets a heading.

**The Tabular Figures Rule.** Prices, quantities, sums, brew ratios and the receipt use tabular numerals so columns align.

## Layout

Content sits in a 1280px wrap with a fluid gutter of clamp(16px, 4vw, 40px). Sections stack full-bleed and alternate background: roast hero, stock shelf, roast split section, paper brew table, stock delivery, roast footer. Section padding is clamp(72px, 9vw, 128px) top on major sections, clamp(64px, 8vw, 112px) on lighter ones.

The header is sticky, solid white, 68px tall (60px under 640px), with a 1px hairline beneath; scroll padding matches. The hero fills the viewport below the header with a left-weighted headline over a darkened photo; on phones the copy anchors to the bottom and the scrim turns vertical.

Grids: the label shelf runs 4 columns at 20px gap, 2 under 1180px, 1 under 640px. The roasting section is a 1:1 photo/text split, the brew section 5:7 intro/table, the order page 1.5:1 form/receipt; all collapse to one column under 900px, with the receipt moving above the form. Data rows (brew, delivery) are grids under a 3px ink top rule with 1px hairline bottoms, reflowing to two columns on phones.

Small gaps step 8, 12, 20px; inner padding on panels is 20 to 24px.

## Elevation & Depth

Mostly flat: hierarchy comes from ink rules, frames and the paper/stock/roast alternation. Where something sits on top of the page it gets a soft, tightly negative-spread lift, like a sheet of paper resting on another, never a hard or offset shadow. The hero uses a dark gradient scrim over the photo purely for legibility.

### Shadow Vocabulary
- **Label lift** (`box-shadow: 0 18px 30px -24px rgba(23,18,15,.45)`): under each coffee label on the stock shelf.
- **Receipt lift** (`box-shadow: 0 20px 40px -30px rgba(23,18,15,.5)`): under the sticky order receipt.
- **Drawer edge** (`box-shadow: -20px 0 40px -20px rgba(0,0,0,.4)`): the cart drawer's leading edge over a 55 percent roast scrim.
- **Toast lift** (`box-shadow: 0 14px 30px -12px rgba(0,0,0,.5)`): the add-to-cart toast.

### Named Rules
**The Paper Lift Rule.** Shadows are soft and pulled in with negative spread, used only for objects that physically sit on the page (label, receipt, drawer, toast). No shadow on buttons, inputs or sections.

## Shapes

Square corners everywhere (0px), including inputs, selects and buttons, which explicitly reset browser rounding. Borders are the form language: 2px ink frames for controls, 2px hairline for resting fields, 3px ink rules heading tables and the drawer footer, 6px ink rule capping the receipt, dashed hairlines between list items. Two signature silhouettes come from the label world: the **rotated stamp** (a 2 to 4px currentColor box, rotated -9 to +5 degrees) and the **perforated edge** (a row of white dots along the top of the label's buy panel, as if torn from the bag). The only circle in the system is the loading spinner.

## Components

### Buttons
Heavy, square, block-printed.
- **Shape:** square (0px), 52px minimum height, 2px border slot.
- **Dark:** ink fill, white Anybody 800 caps, 0 26px padding (0 18px on phones). Hover deepens to a warm brown-black; active presses down 1px.
- **Light:** white fill, ink text, for the dark hero. Hover fills saffron.
- **Line:** transparent with a 70 percent white border on the dark field; hover inverts to white fill with ink text.
- **Loading:** disabled at 60 percent opacity with a currentColor spinner after the label.
- **Transitions:** background, colour, border and transform at .2s on the house ease cubic-bezier(.16,1,.3,1).

### Chips (filters)
- **Style:** 44px tall, 2px ink border, transparent, Figtree 700 15px. Hover fills white.
- **State:** the active filter fills ink with white text and carries aria-pressed.

### Segmented control (weight)
Two halves inside a 2px ink frame divided by a 2px ink rule; each half stacks the weight and its price (ink-3, tabular). The checked half fills ink with white text. Focus shows the cobalt ring inset.

### Cards / Containers
There are no generic cards. Containers are either a coffee label (below), the receipt (white, 24px padding, 6px ink top rule, receipt lift) or a plain white panel for empty and done states (clamp(28px, 5vw, 56px) padding, no border).

### Inputs / Fields
- **Style:** 52px tall, white, 2px hairline border, square, 16px text; label above in Figtree 700 14px.
- **Hover:** border darkens to ink-3.
- **Focus:** border goes ink with a 3px cobalt glow at 35 percent alpha.
- **Error:** border and label turn bad red; a bold red form message appears below.
- **Selects:** same frame with an inline ink chevron. **Radio choices:** 60px white tiles with hairline border; the checked tile gets a 2px ink border plus 1px inset ink.

### Navigation
Solid white sticky bar. Wordmark "TRZASK" in Anybody 900 at width 150 percent with a small caps "palarnia" sublabel in ink-3. Text links Figtree 600 15px; hover draws a 2px ink underline bar. The cart button is a solid ink block with a stroked bag icon and a square saffron count badge (dark grey when zero) that scales up briefly when an item is added. Under 900px the text links hide and the cart button stays; under 640px its word label hides.

### Coffee Label (signature)
A full colour field (min 330px, 260px on phones) with the roast-date stamp rotated +5 degrees top right, the coffee name in container-sized stretched caps pushed to the bottom, origin and tasting notes, and a meta row under a 2px currentColor rule: a five-square roast scale (filled squares for the roast level) and the brew use. Below the perforated edge sits the white buy panel: weight segmented control, grind select, a full-width dark "Do koszyka" button and a "Profil kawy" disclosure with a dashed definition list. On add, a "W koszyku" stamp slams in at -9 degrees and fades over 1.8s.

### Roast Stamp (signature)
Rotated ink box in currentColor: tracked caps word ("Wypalone", "Przyjęte") over a big Anybody 900 date or number. Saffron on the hero photo at -6 degrees, label ink on each label, ok green on the order confirmation.

### Waybill Cart (signature)
Right drawer (max 440px) sliding in on .45s house ease over a roast scrim. Ink header titled as a waybill with a generated number, a free-shipping progress bar in ok green, sender/recipient columns, column heads, lines with the coffee's colour chip in a 2px ink square, quantity stepper in a 2px ink frame, then sums with tabular figures, an SVG barcode and a full-width dark checkout button under a 3px ink rule.

## Do's and Don'ts

### Do:
- **Do** give every new coffee exactly one label colour as a flat full field, with ink text on light hues and white text on dark hues.
- **Do** set every heading, legend and button in Anybody 900/800 caps with stretched width (118 percent or more).
- **Do** keep all corners at 0px and build structure from ink rules: 3px ink top on tables, 2px ink frames on controls, 1px hairline or dashed dividers between rows.
- **Do** show the roast date as a rotated ink stamp wherever a coffee appears.
- **Do** use tabular numerals for prices, weights, sums and ratios.
- **Do** use the house ease cubic-bezier(.16,1,.3,1) for state changes (.2s) and sliding surfaces (.45s), and honour reduced motion.
- **Do** use the 3px cobalt outline for keyboard focus everywhere.

### Don't:
- **Don't** round corners on any control, panel or image.
- **Don't** put product information in white cards on a beige grid; coffees are colour-field labels.
- **Don't** introduce colour outside the label palette, saffron and the status pair; no decorative gradients (the only gradients are the hero photo scrim and the perforation dots).
- **Don't** use hard or offset shadows; lifts are soft and negative-spread, reserved for label, receipt, drawer and toast.
- **Don't** set saffron or other light label hues as text on white.
- **Don't** set headings in Figtree or at normal width.
