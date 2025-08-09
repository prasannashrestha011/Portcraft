import { FormType } from "@/app/types/formType";
import { EscapeJSONStringForJSON } from "./unescapeJsonstring";

export function GeneratePrompt(data: FormType): string {
  const parsedDetails = JSON.stringify(data);
  const prompt = `
Generate a complete, production-ready single HTML file for a modern personal portfolio website.

Requirements:

* Use pure CSS embedded inside a <style> tag in the <head>; no external frameworks.

* Use semantic HTML with accessibility (alt text for images, ARIA labels for form fields and navigation).

* Layout:

  * Sticky top navigation bar visible only on screens 1025px and wider, containing links: Home, About, Projects, Experience (if provided), Education (if provided), Certifications (if provided), Contact.
  * Hero section with:

    * Name (e.g., "Prasanna Shrestha")
    * Subtitle (e.g., "Frontend Developer")
    * Call-to-action buttons.
  * About section with two columns on desktop/tablet (image left, text right), stacked on mobile. Use this placeholder image URL if no user image is provided: [https://placehold.co/600x498?text=No+Preview](https://placehold.co/600x498?text=No+Preview)
  * Projects section with a responsive grid of at least 3 project cards. Each card includes:

    * Project title
    * Short description
    * Tech stack
    * GitHub and Demo buttons.
  * Optional sections: Experience, Education, Certifications — only include if corresponding JSON data exists.
  * Contact section with:
    - Do NOT generate any contact form in the Contact section under any circumstance. Only include social icons (GitHub, LinkedIn, etc.) here.
    * Social icons (GitHub, LinkedIn, etc.).
  * Footer with copyright.

* Responsive breakpoints:

  * Mobile (320–768px): stacked layout, no navigation bar visible.
  * Tablet (769–1024px): two-column where appropriate, no navigation bar.
  * Desktop (1025px+): full layout with sticky navigation bar.

* Use Google Fonts "Inter" from [https://fonts.googleapis.com/css2?family=Inter\:wght@400;600;700\&display=swap](https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap).

* Use FontAwesome 6.4.0 CDN from cdnjs.cloudflare.com for icons.

* Icons sizing: headers 1.2rem, inline icons 1rem.

* Smooth scrolling and subtle hover and transition effects.

* Use flexbox or CSS grid for layout.

* Map all content exactly from the provided JSON data variable named parsedDetails.

* Skip UI sections if the corresponding JSON data is empty or missing.

Choose exactly one color palette per generated website, randomly selected from the following 5 distinct palettes. Do not repeat the same palette for multiple generations, and do not assign colors randomly without following this rule strictly:

1. Light Blue Palette:

   * Primary: #2563EB
   * Primary Dark: #1E40AF
   * Background: #F9FAFB (very light gray)
   * Text Dark: #374151 (dark gray)
   * Text Medium: #6B7280 (medium gray)
   * White: #FFFFFF

2. Dark Green Palette:

   * Primary: #10B981
   * Primary Dark: #047857
   * Background: #064E3B (dark green)
   * Text Light: #D1FAE5 (light green)
   * Text Medium: #6B7280 (gray)
   * White: #FFFFFF

3. Purple Contrast Palette:

   * Primary: #8B5CF6
   * Primary Dark: #5B21B6
   * Background: #4C1D95 (deep purple)
   * Text Light: #EDE9FE (light lavender)
   * Text Medium: #C4B5FD (soft purple)
   * White: #FFFFFF

4. Warm Red Palette:

   * Primary: #EF4444
   * Primary Dark: #B91C1C
   * Background: #FEE2E2 (light red/pink)
   * Text Dark: #7F1D1D (dark red)
   * Text Medium: #B91C1C (red)
   * White: #FFFFFF

5. Teal Ocean Palette:

   * Primary: #14B8A6
   * Primary Dark: #0F766E
   * Background: #0E7490 (deep teal/blue)
   * Text Light: #CCFBF1 (light teal)
   * Text Medium: #5EEAD4 (medium teal)
   * White: #FFFFFF

Output only the complete HTML document, starting with <!DOCTYPE html> and ending with </html>, no comments or explanations, no code blocks, only raw HTML.

${parsedDetails}
`;
  const EscapedPrompt = EscapeJSONStringForJSON(prompt);
  console.log(EscapedPrompt);
  return EscapedPrompt;
}
