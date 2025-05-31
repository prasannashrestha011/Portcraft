import { FormType } from "@/app/types/formType";

export default function HTMLgenerator(formdata:FormType){
    const {certifications,name,email,educations,projects,role,skill:skills,socialLinks,experience}=formdata
    return(
        `html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Portfolio - ${name}</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" integrity="sha512-9usAa10IRO0HhonpyAIVpjrylPvoDwiPUiKdWk5t3PyolY1cOd4DSE0Ga+ri4AuTroPR5aQvXU9xC6qOPnzFeg==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <style>
        body {
            font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
            margin: 0;
            padding: 0;
            background: linear-gradient(to bottom, #f0f4f8, #e0e8ef);
            color: #333;
            line-height: 1.6;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }

        header {
            text-align: center;
            padding: 40px 0;
        }

        header h1 {
            font-size: 3em;
            margin-bottom: 10px;
            color: #2c3e50;
        }

        header p {
            font-size: 1.2em;
            color: #777;
        }

        section {
            margin-bottom: 40px;
        }

        section h2 {
            font-size: 2em;
            margin-bottom: 20px;
            color: #34495e;
        }

        .about-me p {
            font-size: 1.1em;
        }

        .skills-container {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
        }

        .skill-badge {
            background-color: #3498db;
            color: white;
            padding: 8px 15px;
            border-radius: 20px;
            font-size: 0.9em;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            transition: background-color 0.3s ease;
        }

        .skill-badge:hover {
            background-color: #2980b9;
        }

        .projects-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
        }

        .project-card {
            background-color: white;
            border-radius: 8px;
            padding: 20px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .project-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
        }

        .project-card h3 {
            font-size: 1.3em;
            margin-bottom: 10px;
            color: #2c3e50;
        }

        .project-card p {
            font-size: 1em;
            color: #555;
        }
        .project-card .tech-stack {
            font-size: 0.9em;
            color: #777;
        }

        .experience-list, .education-list, .certification-list {
            list-style: none;
            padding: 0;
        }

        .experience-item, .education-item, .certification-item {
            margin-bottom: 20px;
            padding: 20px;
            background-color: white;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .experience-item h3, .education-item h3, .certification-item h3 {
            font-size: 1.2em;
            margin-bottom: 5px;
            color: #34495e;
        }

        .experience-item p, .education-item p, .certification-item p {
            font-size: 1em;
            color: #555;
        }

        footer {
            text-align: center;
            padding: 20px 0;
            color: #777;
            border-top: 1px solid #ddd;
        }

        footer a {
            color: #3498db;
            text-decoration: none;
            transition: color 0.3s ease;
        }

        footer a:hover {
            color: #2980b9;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
            .container {
                padding: 15px;
            }

            header h1 {
                font-size: 2.5em;
            }

            .projects-grid {
                grid-template-columns: 1fr;
            }
        }

        .social-links a {
            display: inline-block;
            margin-right: 10px;
            font-size: 1.5em;
            color: #3498db;
            transition: color 0.3s ease;
        }

        .social-links a:hover {
            color: #2980b9;
        }

        .section-header {
            display: flex;
            align-items: center;
            margin-bottom: 20px;
        }

        .section-header i {
            margin-right: 10px;
            color: #3498db;
        }

    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>${name}</h1>
            <p>${role}</p>
            <div class="social-links">
                <a href="${socialLinks.githubURL}" target="_blank"><i class="fab fa-github"></i></a>
                <a href="${socialLinks.linkedinURL}" target="_blank"><i class="fab fa-linkedin"></i></a>
                <a href="mailto:${email}"><i class="fas fa-envelope"></i></a>
            </div>
        </header>

        <section class="about-me">
            <div class="section-header">
                <h2><i class="fas fa-user"></i> About Me</h2>
            </div>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.  ... (Insert actual About Me content here)</p>
        </section>

        <section class="skills">
            <div class="section-header">
                <h2><i class="fas fa-tools"></i> Skills</h2>
            </div>
            <div class="skills-container">
                ${skills.map((skill, index) => `<span class="skill-badge">${skills[index]}</span>`).join('')}
            </div>
        </section>

        <section class="projects">
            <div class="section-header">
                <h2><i class="fas fa-code"></i> Projects</h2>
            </div>
            <div class="projects-grid">
                ${projects.map((project, index) => `
                    <div class="project-card">
                        <h3>${projects[index].name}</h3>
                        <p>${projects[index].description}</p>
                        <p class="tech-stack">Tech Stack: ${projects[index].techStack}</p>
                        ${projects[index].repo ? `<a href="${projects[index].repo}" target="_blank"><i class="fab fa-github"></i> Repository</a><br>` : ''}
                        ${projects[index].link ? `<a href="${projects[index].link}" target="_blank"><i class="fas fa-external-link-alt"></i> Live Demo</a>` : ''}
                    </div>
                `).join('')}
            </div>
        </section>

        <section class="experience">
            <div class="section-header">
                <h2><i class="fas fa-briefcase"></i> Experience</h2>
            </div>
            <ul class="experience-list">
                ${experience ? experience.map((exp, index) => `
                    <li class="experience-item">
                        <h3>${experience[index].company}</h3>
                        <p>${experience[index].role}</p>
                        <p class="duration">${experience[index].duration}</p>
                        ${experience[index].description ? `<p>${experience[index].description}</p>` : ''}
                    </li>
                `).join('') : ''}
            </ul>
        </section>

        <section class="education">
            <div class="section-header">
                <h2><i class="fas fa-graduation-cap"></i> Education</h2>
            </div>
            <ul class="education-list">
                ${educations.map((edu, index) => `
                    <li class="education-item">
                        <h3>${educations[index].instituition}</h3>
                        <p>${educations[index].degree}</p>
                        <p class="duration">${educations[index].duration}</p>
                    </li>
                `).join('')}
            </ul>
        </section>

        <section class="certifications">
            <div class="section-header">
                <h2><i class="fas fa-certificate"></i> Certifications</h2>
            </div>
            <ul class="certification-list">
                ${certifications.map((cert, index) => `
                    <li class="certification-item">
                        <h3>${certifications[index].title}</h3>
                        <p>${certifications[index].issuer}</p>
                    </li>
                `).join('')}
            </ul>
        </section>

        <footer>
            <p>&copy; 2024 ${name}. All rights reserved.</p>
        </footer>
    </div>
</body>
</html>
`
    )
}