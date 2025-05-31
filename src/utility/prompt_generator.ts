import { FormType } from "@/app/types/formType";
import { EscapeJSONStringForJSON } from "./unescapeJsonstring";



export function GeneratePrompt(data:FormType):string{
    const parsedDetails=JSON.stringify(data)
    const prompt=`
# Portfolio Generator Prompt for Gemini Flash 2.0 API

## Primary Instruction
Generate a complete, production-ready HTML file with embedded CSS for a modern portfolio website. Output only the HTML code with no explanations, comments, or additional text.

## Technical Requirements
- **Single file**: HTML with embedded CSS only (no external dependencies except FontAwesome CDN)
- **Responsive design**: Mobile-first approach using CSS Grid and Flexbox
- **Cross-browser compatibility**: Support for modern browsers
- **Performance optimized**: Minimal CSS, efficient selectors
Color Customization
Use smooth gradient colors with excellent readability:
Design Requirements
Smooth gradients with harmonious color transitions from same hue family
Minimum 4.5:1 contrast ratio between text and backgrounds for accessibility
Colors from same temperature family (warm/cool) for visual cohesion

Pre-built Color Options
Cool Blues & Purples: Gradient #667eea → #764ba2, white text, white card backgrounds
Warm Sunset: Gradient #ff9a9e → #fecfef, dark text, white card backgrounds
Professional Teal: Gradient #0d9488 → #06b6d4 → #3b82f6, white text, white card backgrounds
## Design Specifications

### Visual Style
- **Background**: Use the specified gradient colors from the Color Customization section above
- **Typography**: System font stack: apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, sans-serif
- **Color scheme**: Apply the custom color palette specified in the Color Customization section
- **Shadows**: Subtle box-shadows using the specified shadow color (max 0.5rem blur) for depth
- **Border radius**: Consistent 8-12px rounded corners
- **Spacing**: 16px base unit for consistent margins/padding

### Layout Structure
1. **Header**: Desktop only - sticky navigation with smooth scroll links (hidden on mobile/tablet)
2. **Hero section**: Name, role, brief intro with call-to-action
3. **About section**: Detailed description with contact info and social links
4. **Skills section**: Grid of skill badges with icons
5. **Projects section**: Card-based layout with hover effects
6. **Experience section**: Timeline or card layout
7. **Education section**: Clean list with institutions and degrees
8. **Certifications section**: Badge-style display
9. **Footer**: Simple with social links and copyright

### Interactive Elements
- **Hover transitions**: 0.3s ease-in-out for all interactive elements
- **Skill badges**: Colored backgrounds with subtle hover lift effect
- **Project cards**: Scale slightly on hover (transform: scale(1.02))
- **Buttons**: Gradient backgrounds with hover state changes
- **Navigation**: Smooth scroll behavior and active state highlighting, no navigation bar for mobile version

### Icons Integration
- **CDN**: Use FontAwesome 6.4.0 from cdnjs.cloudflare.com
- **Usage**: Include relevant icons for each section header and key elements
- **Style**: Consistent sizing (1.2rem for headers, 1rem for inline)

## Data Integration Instructions
Use the provided JSON data structure to populate ALL content. Map each field exactly:

***
About: name, role, email, socialLinks.githubURL, socialLinks.linkedinURL
Skills: Parse comma-separated skills string into individual badges (for displaying skills you can use icons from https://skillicons.dev/icons?i=next,react,django,python,go,js,postgresql) example
Projects: name, description, techStack (as tags), repo URL, live URL
Experience: company, role, duration, description
Education: institution, degree, duration  
Certifications: issuer, title
***

## Mobile Navigation Requirements
- **No navigation bar on mobile/tablet**: Complete removal of navigation menu below 1025px screen width
- **Clean mobile experience**: Let users naturally scroll through sections without navigation clutter
- **Desktop navigation only**: Sticky navigation appears only on screens 1025px and wider

## Responsive Breakpoints
- **Mobile**: 320px - 768px (single column, no navigation, stacked layout)
- **Tablet**: 769px - 1024px (two-column where appropriate, no navigation)
- **Desktop**: 1025px+ (multi-column grid layouts, sticky navigation visible)

## Quality Standards
- **Accessibility**: Proper semantic HTML, alt texts, ARIA labels where needed
- **Performance**: Optimized CSS with minimal redundancy
- **Code quality**: Clean, well-structured HTML and CSS
- **Visual hierarchy**: Clear contrast ratios and font size scaling

## Output Format
Provide only the complete HTML document starting with DOCTYPE html and ending with /html. No explanations, no code blocks, no additional text.

**important**
Do not include any explanations or descriptions, just the complete code.
**important**
if any of the json data is empty like experience,certification,avoid creating ui for that 
**here is the json data ** --
${parsedDetails}
`
const EscapedPrompt=EscapeJSONStringForJSON(prompt)
    console.log(EscapedPrompt)
    return EscapedPrompt
}