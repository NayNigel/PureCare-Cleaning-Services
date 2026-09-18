# PureCare Cleaning Services — WEDE5020 Part 2

## Student Information

**Student Name:** Rethabile Pitse
**Student Number:** ST10516238
**Module:** WEDE5020 Web Development (Introduction)
**Project:** Part 2 — CSS Styling and Responsive Design

---

## Project Overview

PureCare Cleaning Services is a Johannesburg-based cleaning business concept providing professional residential, commercial and specialised cleaning services.

Part 2 focuses on developing the visual presentation of the website using CSS and improving the website's responsiveness across desktop, tablet and mobile screen sizes.

The website consists of five main pages:

* Home
* About Us
* Services
* Enquiry
* Contact

The website maintains a consistent visual identity, navigation system and layout across all pages.

---

## Part 2 Objectives

The main objectives for Part 2 were to:

* Apply CSS styling to all website pages.
* Use an external stylesheet consistently across the website.
* Improve typography, spacing, colours and visual hierarchy.
* Create structured layouts using CSS Grid and Flexbox.
* Add borders, shadows, buttons and other visual styling.
* Add interactive pseudo-classes such as `:hover`, `:focus` and `:active`.
* Make the website responsive for desktop, tablet and mobile devices.
* Use relative and flexible CSS units.
* Adjust layouts and typography at different breakpoints.
* Improve navigation for smaller screen sizes.
* Optimise images for responsive screen sizes.
* Update the project documentation and references.

---

## Website Features

The website includes:

* Home page introducing PureCare Cleaning Services.
* About Us page explaining the business concept, approach and values.
* Services page covering residential, commercial and specialised cleaning.
* Enquiry page allowing customers to provide their details and cleaning requirements.
* Contact page containing contact information and a contact form.
* Consistent navigation across all pages.
* Consistent footer across all pages.
* Responsive layouts for different screen sizes.
* Descriptive alternative text for images.
* Styled enquiry and contact forms.
* Responsive buttons and calls to action.
* CSS Grid and Flexbox layouts.
* Responsive images using `srcset` and `sizes`.

---

## CSS Styling

The website uses a single external stylesheet:

```text
css/style.css
```

The stylesheet is linked to all five HTML pages.

The CSS includes:

* CSS custom properties for colours and reusable values.
* A global box-sizing reset.
* Base typography and line-height.
* Responsive image styling.
* Page width and spacing controls.
* Header and navigation styling.
* Hero section styling.
* Grid and Flexbox layouts.
* Service cards.
* Buttons and calls to action.
* Forms and form controls.
* Borders, shadows and rounded corners.
* Footer styling.
* Responsive media queries.
* Focus and hover states.

---

## Typography

The website uses a clean sans-serif font stack:

```css
font-family: Arial, Helvetica, sans-serif;
```

Typography was adjusted to provide a clear hierarchy between:

* Main headings
* Section headings
* Paragraph text
* Navigation links
* Buttons
* Form labels

Responsive typography and flexible sizing are used where appropriate.

---

## Layout

CSS Grid and Flexbox are used throughout the website.

The main layouts include:

* Header navigation using Flexbox.
* Hero section using CSS Grid.
* Service cards using CSS Grid.
* Split content sections using CSS Grid.
* Flexible buttons and navigation elements.
* Responsive footer content.

The layouts adjust automatically according to the available screen width.

---

## Responsive Design

The website was designed to work across:

* Desktop screens
* Tablet screens
* Mobile screens

Media queries are used to change the layout at different screen widths.

### Desktop

The desktop layout provides:

* Full navigation.
* Multi-column service cards.
* Two-column hero layout.
* Two-column content sections.
* Larger spacing and typography.

### Tablet

The tablet layout adjusts:

* Hero content proportions.
* Service cards to two columns.
* Content spacing.
* Navigation and other page elements.

### Mobile

The mobile layout changes to:

* Single-column content.
* Single-column service cards.
* Stacked hero content.
* Smaller typography.
* Full-width buttons where required.
* Mobile-friendly navigation.
* Reduced spacing to fit smaller screens.

---

## Responsive Breakpoints

The stylesheet uses media queries to adjust the website layout.

Examples include:

```css
@media (max-width: 900px)
```

```css
@media (max-width: 650px)
```

```css
@media (max-width: 420px)
```

These breakpoints allow the website to adapt its layout, navigation, typography, cards, images and buttons to different screen sizes.

---

## Relative Units

Relative and flexible units are used throughout the CSS instead of relying only on fixed pixel values.

Examples include:

* `%`
* `rem`
* `clamp()`
* `min()`
* Flexible Grid columns
* Flexible widths

This allows the website to scale more effectively across different devices.

---

## Pseudo-Classes and Interaction

Interactive states were added to improve usability.

The stylesheet includes pseudo-classes such as:

```css
:hover
```

```css
:focus
```

```css
:focus-visible
```

```css
:active
```

These are used for navigation links, buttons, form controls and other interactive elements.

A reduced-motion media query is also included to improve accessibility for users who prefer reduced motion.

---

## Responsive Images

The Home page uses responsive image techniques through:

* `srcset`
* `sizes`

Different image sizes are available so that the browser can select an appropriate image depending on the screen size.

This helps improve image performance and ensures images fit different devices.

---

## Screenshots

Screenshots were captured to demonstrate the responsive design at different screen sizes.

### Desktop

`desktop-home.png`

### Tablet

`tablet-home.png`

### Mobile

`mobile-home.png`

These screenshots demonstrate how the website changes from a multi-column desktop layout to a more compact tablet layout and finally to a single-column mobile layout.

---

## File and Folder Structure

```text
PureCare 23/
│
├── index.html
├── about.html
├── services.html
├── enquiry.html
├── contact.html
│
├── css/
│   └── style.css
│
├── js/
│   └── script.js
│
├── images/
│   ├── image1.jpg
│   ├── image2.jpg
│   ├── image3.jpg
│   ├── image4.jpg
│   ├── image5.jpg
│   └── responsive image versions
│
├── desktop-home.png
├── tablet-home.png
├── mobile-home.png
│
├── Wireframes.docx
└── README.md
```

---

## Development Tools

The project was developed using:

* Visual Studio Code
* HTML5
* CSS3
* Git
* GitHub
* Web browser developer tools

JavaScript functionality is reserved for Part 3.

---

## Changelog

### Version 2.0 — Part 2

* Updated the website from the Part 1 HTML structure.
* Applied a complete external CSS stylesheet.
* Added consistent styling across all five pages.
* Added CSS custom properties.
* Added typography and spacing improvements.
* Added CSS Grid and Flexbox layouts.
* Added service cards and responsive content sections.
* Added borders, shadows and rounded corners.
* Styled forms and form controls.
* Added button and navigation styling.
* Added `:hover`, `:focus`, `:focus-visible` and `:active` states.
* Added responsive media queries.
* Added desktop, tablet and mobile layout adjustments.
* Changed multi-column layouts to single-column layouts on smaller screens.
* Adjusted typography for smaller screen sizes.
* Adjusted navigation for mobile screens.
* Added responsive image handling using `srcset` and `sizes`.
* Added responsive design screenshots.
* Updated the README documentation.
* Updated references for Part 2.
* Incorporated corrections and improvements based on Part 1 feedback.

### Version 1.0 — Part 1

* Created the PureCare Cleaning Services project.
* Created five main website pages.
* Added navigation between all pages.
* Added service information.
* Added enquiry and contact forms.
* Added images and alternative text.
* Created the initial website structure.
* Created sitemap and wireframes.
* Created GitHub repository.
* Added project documentation.

---

## References

The Independent Institute of Education (IIE). 2026. *WEDE5020 Web Development (Introduction): Assessment Type: POE (Paper and Marking Rubric).*

Mozilla Developer Network (MDN). 2025. *Responsive web design.* Available at: https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Responsive_Design [Accessed 18 September 2026].

Mozilla Developer Network (MDN). 2025. *CSS media queries.* Available at: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries/Using_media_queries [Accessed 18 September 2026].

Mozilla Developer Network (MDN). 2025. *Responsive images.* Available at: https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Responsive_images [Accessed 18 September 2026].

Mozilla Developer Network (MDN). 2025. *CSS Grid Layout.* Available at: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout [Accessed 18 September 2026].

Mozilla Developer Network (MDN). 2025. *Basic concepts of Flexbox.* Available at: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Flexible_box_layout/Basic_concepts_of_flexbox [Accessed 18 September 2026].

Iyana Cleaning Solutions. 2026. *Services.* Available at: https://iyanacleaningsolutions.co.za/services/ [Accessed 18 September 2026].

CleanServ. 2026. *CleanServ.* Available at: https://cleanserv.co.za/ [Accessed 18 September 2026].

---

## Image Sources

**Image 1:** Vitaly Gariev. 2025. *A woman vacuuming a bright, modern living room.* Unsplash. Available at: https://unsplash.com/photos/a-woman-vacuuming-a-bright-modern-living-room-u8knk6Hl8JA [Accessed 18 September 2026].

**Image 2:** Curated Lifestyle. 2024. *Woman cleaning the house.* Unsplash. Available at: https://unsplash.com/photos/woman-cleaning-the-house-w5f1SZvkzcU [Accessed 18 September 2026].

**Image 3:** La Miko. *Cleaning Supplies.* Pexels. Available at: https://www.pexels.com/photo/cleaning-supplies-3616735/ [Accessed 18 September 2026].

**Image 4:** Unsplash. *Carpet Cleaning.* Available at: https://unsplash.com/s/photos/carpet-cleaning [Accessed 18 September 2026].

**Image 5:** Pexels. *Cleaning Supplies Photos.* Available at: https://www.pexels.com/search/cleaning%20supplies/ [Accessed 18 September 2026].

---

## AI Disclosure

AI assistance was used during the preparation and development of this assignment. The required institutional AI disclosure and supporting evidence will be included with the final submission.

---

## Project Status

**Part 2 — CSS Styling and Responsive Design completed.**

The project is prepared for the next stage of development, which will focus on JavaScript functionality, form validation, SEO improvements and other interactive features in Part 3.

