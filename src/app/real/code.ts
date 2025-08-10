export default function DemoCodeLoader() {
  return `
    <!DOCTYPE html>
<html lang="en">


<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Jane Doe - Full Stack Developer</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
    integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
    crossorigin="anonymous" referrerpolicy="no-referrer" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">


  <style>
    :root {
      /* Purple Contrast Palette */
      --primary: #8B5CF6;
      --primary-dark: #5B21B6;
      --background: #4C1D95;
      --text-light: #EDE9FE;
      --text-medium: #C4B5FD;
      --white: #FFFFFF;


      /* General */
      --font-family: 'Inter', sans-serif;
    }


    body {
      font-family: var(--font-family);
      margin: 0;
      padding: 0;
      background-color: var(--background);
      color: var(--text-light);
      line-height: 1.6;
      scroll-behavior: smooth;
    }


    /* Navigation */
    nav {
      background-color: var(--primary-dark);
      color: var(--white);
      padding: 1rem 0;
      position: sticky;
      top: 0;
      z-index: 100;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      display: none; /* hidden in the beginning*/
    }


    nav ul {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      justify-content: center;
      align-items: center;
    }


    nav ul li {
      margin: 0 1.5rem;
    }


    nav a {
      color: var(--text-light);
      text-decoration: none;
      font-weight: 600;
      transition: color 0.3s ease;
    }


    nav a:hover {
      color: var(--white);
    }




    /* Hero Section */
    #hero {
      padding: 5rem 2rem;
      text-align: center;
    }


    #hero h1 {
      font-size: 3rem;
      margin-bottom: 0.5rem;
      color: var(--white);
    }


    #hero p {
      font-size: 1.5rem;
      color: var(--text-medium);
      margin-bottom: 2rem;
    }


    .cta-buttons {
      display: flex;
      justify-content: center;
      gap: 1rem;
    }


    .cta-button {
      display: inline-block;
      padding: 1rem 2rem;
      border-radius: 0.5rem;
      text-decoration: none;
      color: var(--white);
      font-weight: 600;
      transition: background-color 0.3s ease;
    }


    .cta-button.primary {
      background-color: var(--primary);
    }


    .cta-button.secondary {
      background-color: transparent;
      border: 2px solid var(--primary);
    }


    .cta-button.primary:hover {
      background-color: var(--primary-dark);
    }


    .cta-button.secondary:hover {
      background-color: var(--primary-dark);
      border-color: var(--primary-dark);
    }


    /* About Section */
    #about {
      padding: 5rem 2rem;
    }


    .about-container {
      display: flex;
      flex-wrap: wrap;
      gap: 2rem;
      align-items: center;
    }


    .about-image {
      flex: 1;
      min-width: 300px;
      max-width: 600px;
    }


    .about-image img {
      width: 100%;
      border-radius: 0.5rem;
    }


    .about-text {
      flex: 1;
      min-width: 300px;
    }


    .about-text h2 {
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }


    .about-text p {
      color: var(--text-medium);
    }


    /* Projects Section */
    #projects {
      padding: 5rem 2rem;
    }


    #projects h2 {
      font-size: 2.5rem;
      margin-bottom: 2rem;
      text-align: center;
    }


    .projects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
    }


    .project-card {
      background-color: #5828a4;
      padding: 1.5rem;
      border-radius: 0.5rem;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease;
    }


    .project-card:hover {
      transform: translateY(-5px);
    }


    .project-card h3 {
      font-size: 1.5rem;
      margin-bottom: 0.5rem;
    }


    .project-card p {
      color: var(--text-medium);
      margin-bottom: 1rem;
    }


    .project-card .tech-stack {
      font-size: 0.9rem;
      color: var(--text-light);
      margin-bottom: 1rem;
    }


    .project-card .project-buttons {
      display: flex;
      gap: 1rem;
    }


    .project-card .project-button {
      display: inline-block;
      padding: 0.5rem 1rem;
      border-radius: 0.3rem;
      text-decoration: none;
      color: var(--white);
      background-color: var(--primary);
      transition: background-color 0.3s ease;
    }


    .project-card .project-button:hover {
      background-color: var(--primary-dark);
    }


    /* Optional Sections */
    #experience,
    #education,
    #certifications {
      padding: 5rem 2rem;
    }


    #experience h2,
    #education h2,
    #certifications h2 {
      font-size: 2.5rem;
      margin-bottom: 2rem;
      text-align: center;
    }


    .experience-item,
    .education-item,
    .certification-item {
      margin-bottom: 2rem;
      padding: 1.5rem;
      background-color: #5828a4;
      border-radius: 0.5rem;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }


    .experience-item h3,
    .education-item h3,
    .certification-item h3 {
      font-size: 1.3rem;
      margin-bottom: 0.3rem;
    }


    .experience-item p,
    .education-item p,
    .certification-item p {
      color: var(--text-medium);
    }


    .experience-item .duration,
    .education-item .duration {
      font-style: italic;
    }


    /* Contact Section */
    #contact {
      padding: 5rem 2rem;
      text-align: center;
    }


    #contact h2 {
      font-size: 2.5rem;
      margin-bottom: 2rem;
    }


    .social-icons {
      display: flex;
      justify-content: center;
      gap: 2rem;
      font-size: 2rem;
    }


    .social-icons a {
      color: var(--text-light);
      transition: color 0.3s ease;
    }


    .social-icons a:hover {
      color: var(--white);
    }




    /* Footer */
    footer {
      background-color: var(--primary-dark);
      color: var(--text-light);
      text-align: center;
      padding: 1rem 0;
      font-size: 0.8rem;
    }


    /* Media Queries */
    @media (min-width: 1025px) {
      nav {
        display: block;
      }
    }


    @media (min-width: 769px) {
      .about-container {
        flex-direction: row;
      }
    }


    @media (max-width: 768px) {
      #hero h1 {
        font-size: 2.5rem;
      }


      #hero p {
        font-size: 1.2rem;
      }


      .cta-buttons {
        flex-direction: column;
        align-items: center;
      }
    }


    i {
      font-size: 1rem;
    }


    h1>i,
    h2>i,
    h3>i {
      font-size: 1.2rem;
      margin-right: 0.2rem;
    }
  </style>
</head>


<body>


  <nav aria-label="Main Navigation">
    <ul>
      <li><a href="#hero">Home</a></li>
      <li><a href="#about">About</a></li>
      <li><a href="#projects">Projects</a></li>
      <li><a href="#experience">Experience</a></li>
      <li><a href="#education">Education</a></li>
      <li><a href="#certifications">Certifications</a></li>
      <li><a href="#contact">Contact</a></li>
    </ul>
  </nav>


  <section id="hero">
    <h1>Jane Doe</h1>
    <p>Full Stack Developer</p>
    <div class="cta-buttons">
      <a href="#projects" class="cta-button primary">View My Projects</a>
      <a href="#contact" class="cta-button secondary">Contact Me</a>
    </div>
  </section>


  <section id="about">
    <div class="about-container">
      <div class="about-image">
        <img src="https://placehold.co/600x498?text=No+Preview" alt="Jane Doe">
      </div>
      <div class="about-text">
        <h2>About Me</h2>
        <p>
          I am a passionate Full Stack Developer with experience in building scalable web applications. I enjoy working
          with React, Node.js, and other modern technologies.
        </p>
        <p>
          My skills include: JavaScript, React, Node.js, TypeScript, PostgreSQL.
        </p>
      </div>
    </div>
  </section>


  <section id="projects">
    <h2><i class="fa-solid fa-code"></i>Projects</h2>
    <div class="projects-grid">


      <div class="project-card">
        <h3>Portfolio Website</h3>
        <p>A personal portfolio to showcase my projects and blogs.</p>
        <p class="tech-stack">React, Tailwind CSS</p>
        <div class="project-buttons">
          <a href="https://github.com/janedoe/portfolio" class="project-button" aria-label="GitHub Repository">GitHub</a>
          <a href="https://janedoe.dev" class="project-button" aria-label="Live Demo">Demo</a>
        </div>
      </div>


      <div class="project-card">
        <h3>Task Manager API</h3>
        <p>A RESTful API for managing tasks and users.</p>
        <p class="tech-stack">Node.js, Express, MongoDB</p>
        <div class="project-buttons">
          <a href="https://github.com/janedoe/task-manager-api" class="project-button" aria-label="GitHub Repository">GitHub</a>
        </div>
      </div>


      <div class="project-card">
        <h3>Chat App</h3>
        <p>A real-time chat app using WebSockets.</p>
        <p class="tech-stack">React, Socket.io, Node.js</p>
        <div class="project-buttons">
          <a href="https://github.com/janedoe/chat-app" class="project-button" aria-label="GitHub Repository">GitHub</a>
        </div>
      </div>


    </div>
  </section>


  <section id="experience">
    <h2><i class="fa-solid fa-briefcase"></i>Experience</h2>


    <div class="experience-item">
      <h3>Software Engineer</h3>
      <p class="company">TechCorp Inc.</p>
      <p class="duration">Jan 2022 - Present</p>
      <p>Developed scalable web apps using React and Node.js.</p>
    </div>


    <div class="experience-item">
      <h3>Frontend Developer</h3>
      <p class="company">WebWorks</p>
      <p class="duration">Jun 2020 - Dec 2021</p>
      <p>Built responsive UI components using React and Redux.</p>
    </div>


    <div class="experience-item">
      <h3>Intern Developer</h3>
      <p class="company">CodeCrafters</p>
      <p class="duration">Jan 2020 - May 2020</p>
      <p>Assisted in building internal tools with Angular.</p>
    </div>


  </section>


  <section id="education">
    <h2><i class="fa-solid fa-graduation-cap"></i>Education</h2>


    <div class="education-item">
      <h3>B.Sc. in Computer Science</h3>
      <p class="company">University of Example</p>
      <p class="duration">2016 - 2020</p>
    </div>


    <div class="education-item">
      <h3>Diploma in Web Development</h3>
      <p class="company">Example Community College</p>
      <p class="duration">2014 - 2016</p>
    </div>


    <div class="education-item">
      <h3>High School Diploma</h3>
      <p class="company">High School of Example</p>
      <p class="duration">2012 - 2014</p>
    </div>


  </section>


  <section id="certifications">
    <h2><i class="fa-solid fa-certificate"></i>Certifications</h2>


    <div class="certification-item">
      <h3>AWS Certified Developer – Associate</h3>
      <p>Amazon Web Services</p>
    </div>


    <div class="certification-item">
      <h3>Frontend Developer Nanodegree</h3>
      <p>Udacity</p>
    </div>


    <div class="certification-item">
      <h3>JavaScript Algorithms and Data Structures</h3>
      <p>freeCodeCamp</p>
    </div>


  </section>


  <section id="contact">
    <h2><i class="fa-solid fa-address-card"></i>Contact</h2>
    <div class="social-icons">
      <a href="https://github.com/janedoe" aria-label="GitHub"><i class="fab fa-github"></i></a>
      <a href="https://www.linkedin.com/in/janedoe/" aria-label="LinkedIn"><i class="fab fa-linkedin"></i></a>
    </div>
  </section>


  <footer>
    &copy; 2024 Jane Doe. All rights reserved.
  </footer>


</body>


</html>

    `;
}
