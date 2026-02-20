

# Website Text Updates -- 20 February 2026

This plan covers all changes from the uploaded document, grouped by area.

---

## 1. Social media text update (Global)

**File: `src/components/phakamani/PhakamaniNavbar.tsx` (line 253)**

Change the social bar text from:
- ~~"// Be sure to follow our socials"~~
- To: `"// Follow us on social media to stay updated"`

---

## 2. Homepage banner text updates

**File: `src/components/phakamani/PhakamaniHero.tsx`**

### Banner - "Advancing the economic agenda" (Slide 1, line 181)
Update the subtitle text from:
- ~~"Designed to accelerate economic participation and unlock opportunity, the Transformation Fund supports sustainable growth for emerging businesses across South Africa."~~
- To: `"Designed to accelerate economic participation and unlock opportunity, to support sustainable growth for emerging businesses across South Africa."`
- (Removes "the Transformation Fund" -- struck through in document)

### Banner - "Engineering an inclusive..." (Slide 0, lines 163-177)
Update the heading from:
- ~~"Engineering an inclusive microeconomic foundation for macroeconomic growth and social stability"~~
- To: `"Engineering an inclusive foundation for macroeconomic growth"`
- (Removes "microeconomic" and "and social stability" -- struck through in document)

Update the subtitle from:
- ~~"This isn't just funding, it's a national movement"~~
- To remove this line entirely (struck through in document)

Replace with new body text:
- `"Purposely structured to lower the barriers to entry and reduce the costs and risks of participation in the economy for the masses of South Africans who are currently marginalised."`

---

## 3. Navigation: Rename "Why" to "Fund purpose"

**File: `src/components/phakamani/PhakamaniNavbar.tsx`**
- Desktop dropdown (line 84): Change "Why" to "Fund purpose"
- Mobile menu (line 219): Change "Why" to "Fund purpose"

---

## 4. Why page hero text update

**File: `src/components/phakamani/PhakamaniHero.tsx`**

### Heading (line 5)
- Keep: `"Why the Transformation Fund?"`

### Description (line 14)
Remove the second paragraph (struck through):
- ~~"The Transformation Fund is designed as a strategic instrument to drive inclusive economic transformation in South Africa."~~

The first and third paragraphs remain unchanged.

---

## 5. Why Pillars -- Card 03 text update

**File: `src/components/transformation/WhyPillarsSection.tsx` (line 26)**

Remove the second paragraph from Card 03 "Coordinate and enhance ESD impact" (struck through in document):
- ~~"This approach simplifies compliance, reduces administrative burden, and ensures that ESD contributions are invested in a coherent portfolio of programmes with measurable outcomes in business growth and job creation, while also linking supported enterprises to real market opportunities within corporate supply chains."~~

---

## 6. Policy Choice page -- Rename and update text

### Navigation rename
**File: `src/components/phakamani/PhakamaniNavbar.tsx`**
- Desktop (line 86): Change "Policy Choice" to "Fund Policy"
- Mobile (line 220): Change "Policy Choice" to "Fund Policy"

### Hero heading rename
**File: `src/components/phakamani/PhakamaniHero.tsx` (line 6)**
- Change from: `"Policy Choice: The Transformation Fund"`
- To: `"Fund Policy"`

### Hero description update
**File: `src/components/phakamani/PhakamaniHero.tsx` (line 15)**
- Change from: `"Recognising the limitations, the Department of Trade..."`
- To: `"Despite laudable intentions, South Africa's existing transformation efforts have been fragmented and largely compliance-driven, yielding limited structural impact. Recognising the limitations, the Department of Trade, Industry and Competition (the dtic) has proposed establishing a dedicated Transformation Fund managed via a Special Purpose Vehicle (SPV). Key features of the Fund include:"`

### Replace bullet points with icons (visual improvement)
**File: `src/components/transformation/PolicyChoice.tsx`**
- The document notes bullet points are not visually appealing. The current implementation already uses icon cards with green circular icons, so this is already addressed. No change needed.

---

## 7. Delete 4 sub-pages (Theory, Value, Operating Model, National Agenda)

### Remove routes from App.tsx (lines 56-59)
Delete these route entries:
- `/about/why/theory`
- `/about/why/value`
- `/about/why/operating-model`
- `/about/why/national-agenda`

### Remove navigation links from PhakamaniNavbar.tsx
**Desktop dropdown** (lines 87-90): Remove the 4 sub-page links for Theory, Value, Operating Model, National Agenda

**Mobile menu** (lines 221-224): Remove the 4 sub-page links

### Remove from hero headings/descriptions
**File: `src/components/phakamani/PhakamaniHero.tsx` (lines 7-10, 16-19)**
Remove the entries for theory, value, operating-model, and national-agenda from `whyPageHeadings` and `whyPageDescriptions`.

### Remove lazy imports from App.tsx (lines 22-25)
Remove imports for TheoryPage, ValuePage, OperatingModelPage, NationalAgendaPage.

---

## Technical summary of files to modify

| File | Changes |
|------|---------|
| `src/components/phakamani/PhakamaniNavbar.tsx` | Social text, rename "Why" to "Fund purpose", rename "Policy Choice" to "Fund Policy", remove 4 sub-page nav links |
| `src/components/phakamani/PhakamaniHero.tsx` | Update 2 homepage banner texts, update Why page description, rename Policy Choice heading, update Policy Choice description, remove deleted page entries |
| `src/components/transformation/WhyPillarsSection.tsx` | Remove second paragraph from Card 03 |
| `src/App.tsx` | Remove 4 routes and 4 lazy imports for deleted pages |

Note: The page component files themselves (TheoryPage, ValuePage, OperatingModelPage, NationalAgendaPage and their content components) can remain in the codebase but will be unreachable. They can be cleaned up later if desired.

