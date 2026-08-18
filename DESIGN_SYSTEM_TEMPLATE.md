---
name: NWOS Design System Template
version: 0.1.0
status: mould template — read-only; executing it produces a child document
scope: web · platform · document
defaults_status: provisional — Oracle refinement pending
produces: canon/DESIGN_SYSTEM.md (status: proposed) + theme/{{COMPANY_SLUG}}.tokens.json
reference_implementation: Khepri (Numen Games) — illustrative only, never normative
---
<!-- SPDX-License-Identifier: MIT -->
<!-- SPDX-FileCopyrightText: Numen Games S.L. -->

# NWOS Design System Template

A construction document, not a design system. It carries the **framework rules and the
decision slots**, never the fine detail: every visual decision here is either an
**invariant** (non-negotiable), a **slot** (to be decided from evidence), or a
**verified default** (used only when evidence yields nothing). An AI agent executes
this template inside a generated workspace and emits the organization's own design
system as a child document.

The vision this serves: **interchangeable UIs**. Like MMO addon ecosystems, skins are
possible only when the contract is frozen and the values are variable. This template
freezes the contract (§2). Everything else is a value.

---

## 0. How this template works

**Flow:** `nwos-workspace-template` (this mould) → `nwos-deploy` seeds it into each
generated workspace → an agent inside the workspace runs the Derivation Protocol (§4)
→ emits `canon/DESIGN_SYSTEM.md` with `status: proposed` → **the Oracle promotes it to
canon**. Promotion is a human act; the agent proposes and executes, never consecrates.

**This file is read-only.** The template never fills itself; it produces a child.
Generator and work stay separate.

**Every value in the child carries one of three provenance states:**

| State | Meaning | Format |
|---|---|---|
| `[DERIVED]` | Found in brand evidence | `[DERIVED · source-url · YYYY-MM-DD · confidence high/med/low]` |
| `[DEFAULT]` | No evidence; template default used | `[DEFAULT · template v0.1.0]` |
| `[ORACLE]` | Conflict or ambiguity; human decision required | `[ORACLE · question stated]` |

A value without a provenance label does not exist. Low-confidence derivations and any
trademark ambiguity escalate to `[ORACLE]`.

---

## 1. Invariants — framework rules, not slots

These hold in every child system, regardless of brand:

1. **Accessibility floor.** Text contrast ≥ 4.5:1 (≥ 3:1 for large text and graphical
   objects), computed and recorded — never assumed. Focus always visible (2 px outline,
   2 px offset, in the interactive color or ink). `prefers-reduced-motion` respected:
   content appears instantly; opacity may remain, displacement is removed.
2. **Interaction on filled controls darkens, never lightens.** Lightening destroys
   contrast at the exact moment of attention. Derive hover as the accent's text-variant
   shade; active one step darker.
3. **Tokens are semantic.** Values are consumed only through role names (§2). A raw hex
   in component code is a defect.
4. **No mute errors.** Every user-facing message states *what happened + what to do*.
   Tooltips never carry essential information.
5. **Self-hosted assets, licenses shipped.** Fonts and icons live in the repo with
   their license texts. No third-party requests at runtime.
6. **One primary action per view.** Everything else is secondary by form.
7. **Provenance or nothing** (§0). The child records how every value was decided.
8. **The contract keys are frozen** (§2). Renaming a key breaks the skin ecosystem;
   it is a breaking change of this template, never of a child.

---

## 2. The Contract — frozen token schema

The addon API. **Key names and structure are immutable; only `$value` varies per
organization.** Distributed alongside this template as `design.tokens.schema.json`,
generated from this block.

```json
{
  "$schema": "https://design-tokens.github.io/community-group/format/",
  "$description": "NWOS Design System Contract v0.1.0 · keys frozen, values per organization",
  "color": {
    "brand": {
      "accent": { "$value": null, "$description": "Primary brand accent. May be null (monochrome brand)." },
      "accent-2": { "$value": null, "$description": "Optional support accent." },
      "accent-text": { "$value": null, "$description": "Accent shade valid as text on light (≥4.5:1)." }
    },
    "semantic": {
      "interactive": { "$value": null, "$description": "Links, focus, selection. Defaults to ink." },
      "action-fill": { "$value": null, "$description": "Primary button fill; its label must reach ≥4.5:1." },
      "action-hover": { "$value": null }, "action-active": { "$value": null },
      "success": { "$value": null }, "warning": { "$value": null }, "critical": { "$value": null },
      "success-on-light": { "$value": null }, "warning-on-light": { "$value": null }, "critical-on-light": { "$value": null }
    },
    "mode-light": {
      "bg-base": { "$value": null }, "bg-surface": { "$value": null }, "bg-elevated": { "$value": null },
      "line-subtle": { "$value": null }, "line-strong": { "$value": null },
      "text-primary": { "$value": null }, "text-secondary": { "$value": null }, "text-tertiary": { "$value": null }
    },
    "mode-dark": {
      "bg-base": { "$value": null }, "bg-surface": { "$value": null }, "bg-elevated": { "$value": null },
      "line-subtle": { "$value": null }, "line-strong": { "$value": null },
      "text-primary": { "$value": null }, "text-secondary": { "$value": null }, "text-tertiary": { "$value": null }
    }
  },
  "typography": {
    "family-sans": { "$value": null }, "family-mono": { "$value": null },
    "scale-ratio": { "$value": null }, "size-base": { "$value": null },
    "weight-body": { "$value": null }, "weight-heading": { "$value": null }
  },
  "space": { "unit": { "$value": null }, "scale": { "$value": null, "$description": "Ordered list of steps." } },
  "radius": { "control": { "$value": null }, "frame": { "$value": null }, "full": { "$value": "9999px" } },
  "motion": {
    "instant": { "$value": null }, "short": { "$value": null }, "long": { "$value": null },
    "easing": { "$value": null }
  },
  "density": { "row": { "$value": null, "$description": "Platform table/list row height." } },
  "assets": {
    "logo-primary": { "$value": null, "$description": "Path. SVG normalized to currentColor when mono-viable." },
    "logo-mark": { "$value": null }, "logo-min-width": { "$value": null }
  },
  "provenance": { "$value": null, "$description": "Filled by the agent: per-token source map." }
}
```

---

## 3. Decision slots

Each slot: the question, the evidence to seek, the derivation rule, the verification,
and the default. Reference lines cite Khepri as illustration — **never as a value to
copy**.

### S1 · Brand palette
- **Question:** what are the brand's accent(s), and which shades survive as text?
- **Evidence:** logo files, `theme-color` meta, CSS custom properties, dominant
  colors of hero imagery.
- **Derivation:** pick 1 primary accent (max 2 support). For each accent used on text
  or as action-fill, compute contrast; if it fails, **darken along its own hue until
  ≥4.5:1** and record as `accent-text` / `action-fill`. Map semantic roles to brand
  colors only when the brand plausibly uses them that way; otherwise keep semantics
  on defaults.
- **Verify:** every text-bearing use ≥4.5:1 in its mode; action-fill label ≥4.5:1.
- **Default:** no accent. **Action dresses in ink** — `action-fill` = `text-primary`
  of the mode (17:1 with inverted label), `interactive` = ink. Semantic defaults:
  light `#1E6B45 / #8A5200 / #A32121` (6.5 / 6.4 / 7.5 on paper); dark
  `#7FC79E / #E3A83F / #E8746E` (9.4 / 8.8 / 6.3 on bg).
- *Reference: Khepri derived a turquoise action-fill (#017C8D) because its canonical
  turquoise failed at 3.9:1 — the darken rule in action.*

### S2 · Typography
- **Question:** which sans and mono, at what scale?
- **Evidence:** `@font-face` declarations, computed `font-family` of body and
  headings, brand guidelines if published.
- **Derivation:** if the found family is openly licensed (OFL/Apache), self-host it,
  license included. If proprietary and unlicensed, choose the nearest open neighbor
  and record the substitution `[DERIVED · nearest-open · confidence med]`. Scale
  ratio from observed heading steps when consistent.
- **Verify:** files present with licenses; body size ≥ 16px web.
- **Default:** system stacks — sans `system-ui, -apple-system, "Segoe UI", Roboto,
  sans-serif`; mono `ui-monospace, "SF Mono", Consolas, monospace`. Ratio `1.25`,
  base `16px`, body `400`, headings `600`.

### S3 · Neutrals & modes
- **Question:** light-first, dark-first, or both — and on which neutrals?
- **Evidence:** the brand site's default scheme; `prefers-color-scheme` handling;
  background/ink of their materials.
- **Derivation:** adopt the brand's base neutrals if they pass the floor; derive the
  missing mode by inverting roles, not colors. Documents are always light.
- **Verify:** the full text ladder (primary/secondary/tertiary) ≥ 4.5:1 against
  **every surface it sits on**, both modes — tertiary tends to fail on elevated
  surfaces; restrict or fix.
- **Default (verified):** light — paper `#FFFFFF`, surface `#F6F6F4`, elevated
  `#FFFFFF`+shadow, lines `#E5E5E2 / #C9C9C4`, ink `#1A1A1A` (17.4), secondary
  `#4A4A46` (8.9), tertiary `#6E6E68` (5.1). Dark — bg `#131313`, surface `#1D1D1C`,
  text `#F4F4F1` (16.9), secondary `#C7C7C2` (11.0), tertiary `#8F8F89` (5.7).
- *Reference: Khepri is dark-first with warm neutrals — a brand decision, not a rule.*

### S4 · Shape
- **Question:** the two radii — control and frame.
- **Evidence:** corner radii of the brand's existing buttons, cards, logo geometry.
- **Derivation:** read 2–3 samples; snap to the nearest of `0 / 2 / 4 / 6 / 8 / 12`.
  Two radii only; content inside a frame carries no radius of its own.
- **Default:** control `4px`, frame `8px`.

### S5 · Space & density
- **Question:** base unit, scale, platform row height.
- **Evidence:** observed padding rhythm; density of their product screens.
- **Default:** unit `4px`; scale `4 8 12 16 24 32 48 64 96`; row `40px`.

### S6 · Motion
- **Question:** how much movement, at what speed?
- **Evidence:** brand site's transitions (present/absent, duration).
- **Derivation:** classify restrained vs expressive; expressive still obeys the
  invariants and one orchestrated moment per piece at most.
- **Default:** instant `120ms`, short `240ms`, long `400ms`; easing
  `cubic-bezier(0.2, 0, 0, 1)`; content reveals once on first view.

### S7 · Voice
- **Question:** how does this organization sound?
- **Evidence:** 3 headlines + 2 paragraphs from their site; classify register
  (playful / plain / formal), harvest 5 tone words and recurring lexicon.
- **Derivation:** define **two registers minimum**: interface (plain, verbs first)
  and document (formal). Record forbidden clichés if the brand states them.
- **Default:** plain and direct; interface messages follow Invariant 4.

### S8 · Brand assets intake
- **Question:** which marks exist, and in what state?
- **Evidence:** header logo, favicon, `apple-touch-icon`, `og:image`, press pages.
- **Derivation:** prefer SVG; normalize to `currentColor` when mono-viable
  (**preserve every element type — paths, rects, circles**; partial extraction
  mutilates letterforms). Record minimum sizes. Trademark doubts → `[ORACLE]`.
- **Default:** no logo found → **text lockup**: `{{COMPANY_NAME}}` set in
  `family-sans`, heading weight, ink — the honest zero-asset identity.

### S9 · Surfaces in scope
- **Question:** which of web / platform / document does this org actually produce?
- **Derivation:** map from the org's declared services; emit only the needed
  blueprints in the child.
- **Note:** expressive registers (pixel art, low-poly 3D, era flavoring, brand play)
  are **extension registers** — adopt only by Oracle decision, from the reference
  implementation or the org's own canon. They are not part of this framework.

---

## 4. Derivation Protocol — operational order

- **P0 Inputs:** `company_name`, `domain(s)`, optional brand files. No domain → all
  slots resolve to `[DEFAULT]`; skip to P6.
- **P1 Fetch** the home page and up to 2 key pages. Extract: CSS custom properties,
  `@font-face`, computed body/heading families, `theme-color`, `og:image`.
- **P2 Logo hunt:** header `img/svg`, favicon set, press/brand pages. Note format
  and mono-viability.
- **P3 Palette:** sample logo + theme-color → candidate accents → apply S1. Compute
  every claimed contrast; write the numbers down.
- **P4 Typography:** apply S2, including the license check before self-hosting.
- **P5 Voice:** apply S7 on harvested copy.
- **P6 Fill the Contract.** Every `$value` set; every value labeled; conflicts and
  low confidence → `[ORACLE]` with the question stated.
- **P7 Verification battery:** contrast ladder both modes on all surfaces; focus
  visible; reduced-motion path; tokens JSON parses; assets present with licenses;
  zero unlabeled values. Any failure blocks emission.
- **P8 Emit** the child (§5) and `theme/{{COMPANY_SLUG}}.tokens.json` (the filled
  contract). Optionally generate `theme.css` from tokens — generated files carry a
  header naming their source; editing them without editing the source is drift.
- **P9 Register the decision:** append an entry to the workspace's decision log
  (date, inputs, confidence summary, open `[ORACLE]` items). Status of the child:
  `proposed` until the Oracle promotes it.

---

## 5. The child document — required skeleton

Uniform children make organizations comparable and their themes swappable.

```
---
organization: {{COMPANY_NAME}}
generated_from: NWOS Design System Template v0.1.0
date: YYYY-MM-DD
status: proposed            # → canon, only by Oracle act
confidence: high|med|low    # lowest confidence among derived values
open_oracle_items: N
---
1. Identity summary        — what the evidence said this brand is (5 lines max)
2. Filled contract         — the tokens, every value with provenance
3. Decisions log           — per slot: evidence → rule applied → result
4. Verification record     — the computed numbers, both modes
5. Surface blueprints      — only the surfaces in scope (S9)
6. Open questions          — the [ORACLE] list
```

---

## 6. Themes & interchangeability

A **theme is a filled contract**: `theme/{{COMPANY_SLUG}}.tokens.json`. Because keys
are frozen (§2), swapping a UI is replacing that file — components consume roles,
never values. This is the addon-ecosystem bet: today one theme per organization;
tomorrow, `nwos-deploy` can offer a gallery, and any workspace can install another
org's skin — or publish its own. Nothing in a child may depend on a specific theme's
values; if it does, it belongs in that theme, not in the child.

---

## 7. Governance hooks

- The agent **proposes and executes; the Oracle consecrates.** Promotion of the child
  to canon, adoption of extension registers, and any trademark-adjacent decision are
  Oracle acts.
- Template changes are versioned here (semver; key renames in §2 are MAJOR).
  Children record which template version generated them and may be regenerated.
- `defaults_status: provisional` — the default set awaits Oracle refinement; children
  built on defaults inherit that flag until it clears.

---

## 8. Reference implementation

**Khepri** (Numen Games Design System) is the living proof of this framework: a
dark-first, three-era, ink-active system where every rule is demonstrated by the
guide that obeys it. Study it to see what a *decided* system looks like — mixture,
registers, easter eggs and all. Copy its discipline, never its values: your evidence
is your brand.

---

## Changelog

| Version | Date | Changes |
|---|---|---|
| 0.1.0 | 2026-08-15 | First template: frozen contract, 9 decision slots, operational derivation protocol (P0–P9), verified neutral defaults (provisional), child skeleton, theme interchangeability model, governance hooks. |
