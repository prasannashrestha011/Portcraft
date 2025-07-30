export const rawCode=`
<!DOCTYPE htfasdfasdfml>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Jane Doe - Portfolio</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <style>
        :root {
            --gradient-start: #0d9488;
            --gradient-end: #3b82f6;
            --text-color: white;
            --card-bg-color: white;
            --shadow-color: rgba(0, 0, 0, 0.1);
        }

        body {
            font-family: apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            margin: 0;
            padding: 0;
            background: linear-gradient(to right, var(--gradient-start), var(--gradient-end));
            color: var(--text-color);
            line-height: 1.6;
        }

        /* Layout Structure */
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }

        /* Header (Desktop Only) */
        header {
            display: none; /* Hidden by default */
            position: sticky;
            top: 0;
            background-color: rgba(0, 0, 0, 0.5);
            padding: 10px 0;
            z-index: 100;
        }

        header nav ul {
            list-style: none;
            padding: 0;
            margin: 0;
            display: flex;
            justify-content: center;
        }

        header nav ul li {
            margin: 0 20px;
        }

        header nav ul li a {
            color: var(--text-color);
            text-decoration: none;
            transition: color 0.3s ease-in-out;
        }

        header nav ul li a:hover {
            color: #ddd;
        }

        /* Hero Section */
        #hero {
            text-align: center;
            padding: 50px 0;
        }

        #hero h1 {
            font-size: 3em;
            margin-bottom: 10px;
        }

        #hero p {
            font-size: 1.2em;
            margin-bottom: 20px;
        }

        .cta-button {
            display: inline-block;
            padding: 12px 24px;
            background: linear-gradient(to right, var(--gradient-start), var(--gradient-end));
            color: var(--text-color);
            text-decoration: none;
            border-radius: 8px;
            transition: background 0.3s ease-in-out;
        }

        .cta-button:hover {
            background: linear-gradient(to right, lighten(var(--gradient-start, 10%)), lighten(var(--gradient-end), 10%));
        }

        /* About Section */
        #about {
            background-color: var(--card-bg-color);
            color: #333;
            padding: 30px;
            border-radius: 12px;
            box-shadow: 0 4px 8px var(--shadow-color);
            margin-bottom: 20px;
        }

        #about h2 {
            color: var(--gradient-start);
        }

        #about p {
            margin-bottom: 15px;
        }

        .contact-info {
            margin-top: 20px;
        }

        .contact-info a {
            color: var(--gradient-end);
            text-decoration: none;
            margin-right: 10px;
            transition: color 0.3s ease-in-out;
        }

        .contact-info a:hover {
            color: darken(var(--gradient-end), 10%);
        }

        /* Skills Section */
        #skills {
            margin-top: 30px;
        }

        #skills h2 {
            text-align: center;
        }

        .skills-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
            gap: 16px;
            margin-top: 20px;
        }

        .skill-badge {
            background-color: #f0f0f0;
            color: #333;
            padding: 10px 15px;
            border-radius: 8px;
            text-align: center;
            box-shadow: 0 2px 4px var(--shadow-color);
            transition: transform 0.3s ease-in-out;
        }

        .skill-badge:hover {
            transform: translateY(-5px);
        }

        /* Projects Section */
        #projects {
            margin-top: 30px;
        }

        #projects h2 {
            text-align: center;
        }

        .projects-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
            margin-top: 20px;
        }

        .project-card {
            background-color: var(--card-bg-color);
            color: #333;
            border-radius: 12px;
            box-shadow: 0 4px 8px var(--shadow-color);
            transition: transform 0.3s ease-in-out;
            padding: 20px;
        }

        .project-card:hover {
            transform: scale(1.02);
        }

        .project-card h3 {
            margin-bottom: 10px;
        }

        .project-card p {
            margin-bottom: 15px;
        }

        .tech-stack {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-bottom: 15px;
        }

        .tech-stack span {
            background-color: #e0e0e0;
            color: #555;
            padding: 5px 10px;
            border-radius: 5px;
            font-size: 0.8em;
        }

        .project-links a {
            color: var(--gradient-end);
            text-decoration: none;
            margin-right: 10px;
            transition: color 0.3s ease-in-out;
        }

        .project-links a:hover {
            color: darken(var(--gradient-end), 10%);
        }

        /* Experience Section */
        #experience {
            margin-top: 30px;
             background-color: var(--card-bg-color);
            color: #333;
            padding: 30px;
            border-radius: 12px;
            box-shadow: 0 4px 8px var(--shadow-color);
            margin-bottom: 20px;
        }
         #experience h2 {
             text-align: center;
        }
        .experience-item {
             margin-bottom: 20px;
            padding: 15px;
        }
        .experience-item h3{
            font-size: 1.2em;
        }

        /* Education Section */
        #educations {
            margin-top: 30px;
             background-color: var(--card-bg-color);
            color: #333;
            padding: 30px;
            border-radius: 12px;
            box-shadow: 0 4px 8px var(--shadow-color);
            margin-bottom: 20px;
        }

        #educations h2 {
            text-align: center;
        }

        #educations ul {
            list-style: none;
            padding: 0;
        }

        #educations li {
            margin-bottom: 10px;
            padding: 15px;
        }
        #educations li h3{
            font-size: 1.2em;
        }

        /* Certifications Section */
        #certifications {
            margin-top: 30px;
        }

        #certifications h2 {
            text-align: center;
        }

        .certifications-list {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 16px;
            margin-top: 20px;
        }

        .certification-badge {
            background-color: #e0e0e0;
            color: #555;
            padding: 10px 15px;
            border-radius: 20px;
            font-size: 0.9em;
        }

        /* Footer */
        footer {
            text-align: center;
            padding: 20px 0;
            font-size: 0.8em;
        }
        footer a {
            color: var(--text-color);
             text-decoration: none;
            margin: 0 10px;
            transition: color 0.3s ease-in-out;
        }
        /* Mobile Styles */
        @media (min-width: 1025px) {
            header {
                display: block; /* Show on desktop */
            }
        }

        @media (max-width: 768px) {
            .projects-grid {
                grid-template-columns: 1fr;
            }
        }
        #skills i{
            font-size: 3rem;
        }
        #skills p{
            margin-top: 1rem;
        }
        #skills h2{
            font-size: 2rem;
        }
         #about h2 {
            font-size: 2rem;
        }
        #projects h2{
            font-size: 2rem;
        }
         #experience h2{
            font-size: 2rem;
        }
         #educations h2{
            font-size: 2rem;
        }
         #certifications h2{
            font-size: 2rem;
        }
        .social-links a {
        display: inline-block;
        margin-right: 10px; /* Adjust as needed */
    }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <nav>
                <ul>
                    <li><a href="#hero">Home</a></li>
                    <li><a href="#about">About</a></li>
                    <li><a href="#skills">Skills</a></li>
                    <li><a href="#projects">Projects</a></li>
                    <li><a href="#experience">Experience</a></li>
                    <li><a href="#educations">Education</a></li>
                    <li><a href="#certifications">Certifications</a></li>
                </ul>
            </nav>
        </header>

        <section id="hero">
            <h1>Jane Doe</h1>
            <p>Full Stack Developer</p>
            <a href="#projects" class="cta-button">View My Work</a>
        </section>

        <section id="about">
            <h2>About Me</h2>
            <p>A passionate full-stack developer with experience in building scalable web applications.</p>
            <div class="contact-info">
                <p>Email: <a href="mailto:jane.doe@example.com">jane.doe@example.com</a></p>
                <div class="social-links">
                    <a href="https://github.com/janedoe" target="_blank"><i class="fab fa-github fa-2x"></i></a>
                    <a href="https://www.linkedin.com/in/janedoe/" target="_blank"><i class="fab fa-linkedin fa-2x"></i></a>
                </div>
            </div>
        </section>

        <section id="skills">
            <h2>Skills</h2>
            <div class="skills-grid">
                <div class="skill-badge">
                    <i class="fa-brands fa-js"></i>
                    <p>JavaScript</p>
                </div>
                <div class="skill-badge">
                    <i class="fa-brands fa-react"></i>
                    <p>React</p>
                </div>
                <div class="skill-badge">
                  <img src="https://skillicons.dev/icons?i=nodejs" alt="Node.js" width="50" height="50"/>
                    <p>Node.js</p>
                </div>
                <div class="skill-badge">
                    <i class="fa-brands fa-js"></i>
                    <p>TypeScript</p>
                </div>
                <div class="skill-badge">
                    <img src="https://skillicons.dev/icons?i=postgresql" alt="PostgreSQL" width="50" height="50"/>
                    <p>PostgreSQL</p>
                </div>
            </div>
        </section>

        <section id="projects">
            <h2>Projects</h2>
            <div class="projects-grid">
                <div class="project-card">
                    <h3>Portfolio Website</h3>
                    <p>A personal portfolio to showcase my projects and blogs.</p>
                    <div class="tech-stack">
                        <span>React</span>
                        <span>Tailwind CSS</span>
                    </div>
                    <div class="project-links">
                        <a href="https://github.com/janedoe/portfolio" target="_blank">Repo</a>
                        <a href="https://janedoe.dev" target="_blank">Live Demo</a>
                    </div>
                </div>
                <div class="project-card">
                    <h3>Task Manager API</h3>
                    <p>A RESTful API for managing tasks and users.</p>
                    <div class="tech-stack">
                        <span>Node.js</span>
                        <span>Express</span>
                        <span>MongoDB</span>
                    </div>
                    <div class="project-links">
                        <a href="https://github.com/janedoe/task-manager-api" target="_blank">Repo</a>
                    </div>
                </div>
                <div class="project-card">
                    <h3>Chat App</h3>
                    <p>A real-time chat app using WebSockets.</p>
                    <div class="tech-stack">
                        <span>React</span>
                        <span>Socket.io</span>
                        <span>Node.js</span>
                    </div>
                    <div class="project-links">
                        <a href="https://github.com/janedoe/chat-app" target="_blank">Repo</a>
                    </div>
                </div>
            </div>
        </section>

        <section id="experience">
            <h2>Experience</h2>
             <div class="experience-item">
                <h3>TechCorp Inc.</h3>
                <p>Software Engineer</p>
                <p>Jan 2022 - Present</p>
                <p>Developed scalable web apps using React and Node.js.</p>
            </div>
             <div class="experience-item">
                <h3>WebWorks</h3>
                <p>Frontend Developer</p>
                <p>Jun 2020 - Dec 2021</p>
                <p>Built responsive UI components using React and Redux.</p>
            </div>
            <div class="experience-item">
                <h3>CodeCrafters</h3>
                <p>Intern Developer</p>
                <p>Jan 2020 - May 2020</p>
                <p>Assisted in building internal tools with Angular.</p>
            </div>
        </section>

        <section id="educations">
            <h2>Education</h2>
            <ul>
                 <li>
                    <h3>University of Example</h3>
                    <p>B.Sc. in Computer Science</p>
                    <p>2016 - 2020</p>
                </li>
                 <li>
                    <h3>Example Community College</h3>
                    <p>Diploma in Web Development</p>
                    <p>2014 - 2016</p>
                </li>
                <li>
                    <h3>High School of Example</h3>
                    <p>High School Diploma</p>
                    <p>2012 - 2014</p>
                </li>
            </ul>
        </section>

        <section id="certifications">
            <h2>Certifications</h2>
            <div class="certifications-list">
                 <span class="certification-badge">AWS Certified Developer – Associate</span>
                 <span class="certification-badge">Frontend Developer Nanodegree</span>
                 <span class="certification-badge">JavaScript Algorithms and Data Structures</span>
            </div>
        </section>

        <footer>
           <div class="social-links">
                    <a href="https://github.com/janedoe" target="_blank"><i class="fab fa-github fa-2x"></i></a>
                    <a href="https://www.linkedin.com/in/janedoe/" target="_blank"><i class="fab fa-linkedin fa-2x"></i></a>
                </div>
            <p>&copy; 2024 Jane Doe. All rights reserved.</p>
        </footer>
    </div>
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            // Smooth scrolling for navigation links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();

                    document.querySelector(this.getAttribute('href')).scrollIntoView({
                        behavior: 'smooth'
                    });
                });
            });
        });
    </script>
</body>
</html>

`
