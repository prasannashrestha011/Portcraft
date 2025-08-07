"use client";

import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
  Font,
} from "@react-pdf/renderer";
Font.register({
  family: "Oswald",
  src: "https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf",
});

// Enhanced styles with better spacing and visual hierarchy
const styles = StyleSheet.create({
  page: {
    fontSize: 11,
    paddingTop: 30,
    paddingBottom: 40,
    paddingHorizontal: 40,
    color: "#2c3e50",
    lineHeight: 1.4,
  },

  header: {
    textAlign: "center",
    marginBottom: 25,
    borderBottom: "2 solid #3498db",
    paddingBottom: 15,
  },
  name: {
    fontSize: 32,
    fontFamily: "Oswald",
    color: "#2c3e50",
    marginBottom: 32,
    letterSpacing: 1,
  },
  jobTitleMain: {
    fontSize: 16,
    color: "#34495e",
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  contactInfo: {
    fontSize: 11,
    color: "#555555",
    textAlign: "center",
    lineHeight: 1.5,
  },

  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 15,
    fontFamily: "Oswald",
    color: "#2c3e50",
    marginBottom: 8,
    paddingBottom: 3,
    borderBottom: "1.5 solid #3498db",
    letterSpacing: 0.5,
  },

  paragraph: {
    fontSize: 11,
    marginBottom: 6,
    textAlign: "justify",
    lineHeight: 1.5,
    color: "#34495e",
  },

  jobContainer: {
    marginBottom: 14,
  },
  jobHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 3,
  },
  jobTitleCompany: {
    flex: 1,
  },
  jobTitle: {
    fontSize: 13,
    color: "#2c3e50",
    fontWeight: "bold",
    marginBottom: 2,
  },
  company: {
    fontSize: 12,
    color: "#3498db",
    fontStyle: "italic",
  },
  dateLocation: {
    fontSize: 11,
    color: "#7f8c8d",
    textAlign: "right",
  },
  bulletPoint: {
    fontSize: 11,
    marginLeft: 15,
    marginBottom: 3,
    lineHeight: 1.4,
    color: "#34495e",
  },

  skillCategory: {
    flexDirection: "row",
    marginBottom: 6,
    alignItems: "flex-start",
  },
  skillLabel: {
    fontSize: 11,
    color: "#2c3e50",
    fontWeight: "bold",
    width: 110,
  },
  skillItems: {
    fontSize: 11,
    color: "#34495e",
    flex: 1,
    lineHeight: 1.4,
  },

  projectContainer: {
    marginBottom: 10,
  },
  projectHeader: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: 3,
  },
  projectTitle: {
    fontSize: 12,
    color: "#2c3e50",
    fontWeight: "bold",
    marginRight: 8,
  },
  projectTech: {
    fontSize: 10,
    color: "#3498db",
    fontStyle: "italic",
  },
  projectDescription: {
    fontSize: 11,
    marginLeft: 15,
    lineHeight: 1.4,
    color: "#34495e",
  },

  educationContainer: {
    marginBottom: 8,
  },
  degree: {
    fontSize: 13,
    color: "#2c3e50",
    fontWeight: "bold",
    marginBottom: 2,
  },
  school: {
    fontSize: 11,
    color: "#34495e",
    marginBottom: 2,
  },
  educationDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  gpa: {
    fontSize: 11,
    color: "#3498db",
    fontWeight: "bold",
  },
  achievement: {
    fontSize: 11,
    color: "#27ae60",
    fontStyle: "italic",
  },

  pageNumber: {
    position: "absolute",
    fontSize: 9,
    bottom: 25,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "#95a5a6",
  },
});

const PdfViewer = () => (
  <PDFViewer className="h-screen w-full">
    <Document>
      <Page size="TABLOID" style={styles.page}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.name}>PRASANNA SHRESTHA</Text>
          <Text style={styles.jobTitleMain}>
            Senior Full-Stack Engineer • System Architect
          </Text>
          <Text style={styles.contactInfo}>
            +977-98XXXXXXX • prasanna@email.com • linkedin.com/in/prasanna •
            github.com/prasanna • Kathmandu, Nepal
          </Text>
        </View>

        {/* Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>PROFESSIONAL SUMMARY</Text>
          <Text style={styles.paragraph}>
            Innovative Full-Stack Engineer with 4+ years of experience
            architecting and developing high-performance web applications.
            Expert in modern JavaScript frameworks, cloud infrastructure, and
            agile methodologies. Demonstrated success in reducing system latency
            by 40% and improving deployment efficiency by 75% through strategic
            technical implementations.
          </Text>
        </View>

        {/* Skills */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>TECHNICAL EXPERTISE</Text>
          <View style={styles.skillCategory}>
            <Text style={styles.skillLabel}>Languages:</Text>
            <Text style={styles.skillItems}>
              JavaScript (ES6+), TypeScript, Go, Python, SQL, GraphQL
            </Text>
          </View>
          <View style={styles.skillCategory}>
            <Text style={styles.skillLabel}>Frontend:</Text>
            <Text style={styles.skillItems}>
              React.js, Next.js, Redux, Tailwind CSS, Material-UI, Webpack, Vite
            </Text>
          </View>
          <View style={styles.skillCategory}>
            <Text style={styles.skillLabel}>Backend:</Text>
            <Text style={styles.skillItems}>
              Node.js, Express.js, NestJS, GraphQL, REST APIs, Microservices
            </Text>
          </View>
          <View style={styles.skillCategory}>
            <Text style={styles.skillLabel}>Database & Cloud:</Text>
            <Text style={styles.skillItems}>
              PostgreSQL, MongoDB, Redis, AWS (EC2, S3, Lambda), Docker,
              Kubernetes, CI/CD
            </Text>
          </View>
          <View style={styles.skillCategory}>
            <Text style={styles.skillLabel}>Tools & Practices:</Text>
            <Text style={styles.skillItems}>
              Git, Jenkins, Jest, Cypress, Agile/Scrum, TDD, Code Review,
              Performance Optimization
            </Text>
          </View>
        </View>

        {/* Experience */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>PROFESSIONAL EXPERIENCE</Text>

          <View style={styles.jobContainer}>
            <View style={styles.jobHeader}>
              <View style={styles.jobTitleCompany}>
                <Text style={styles.jobTitle}>Senior Software Engineer</Text>
                <Text style={styles.company}>TechX Solutions, Kathmandu</Text>
              </View>
              <Text style={styles.dateLocation}>Jan 2023 – Present</Text>
            </View>
            <Text style={styles.bulletPoint}>
              • Architected real-time analytics dashboard using React,
              WebSocket, and D3.js, reducing data latency by 40%
            </Text>
            <Text style={styles.bulletPoint}>
              • Designed and implemented scalable microservices architecture
              using Go and Node.js, handling 10K+ concurrent users
            </Text>
            <Text style={styles.bulletPoint}>
              • Led DevOps transformation with Docker, Kubernetes, and GitLab
              CI/CD, reducing deployment time from 3 hours to 45 minutes
            </Text>
            <Text style={styles.bulletPoint}>
              • Mentored team of 5 junior developers, conducting code reviews
              and establishing best practices
            </Text>
          </View>

          <View style={styles.jobContainer}>
            <View style={styles.jobHeader}>
              <View style={styles.jobTitleCompany}>
                <Text style={styles.jobTitle}>Full-Stack Developer</Text>
                <Text style={styles.company}>
                  DevCo Technologies, Kathmandu
                </Text>
              </View>
              <Text style={styles.dateLocation}>Jun 2021 – Dec 2022</Text>
            </View>
            <Text style={styles.bulletPoint}>
              • Migrated legacy monolithic application to Next.js + TypeScript,
              improving page load speed by 60%
            </Text>
            <Text style={styles.bulletPoint}>
              • Integrated OAuth 2.0, Stripe payment gateway, and third-party
              APIs for secure e-commerce transactions
            </Text>
            <Text style={styles.bulletPoint}>
              • Optimized PostgreSQL queries and implemented Redis caching,
              reducing API response time by 50%
            </Text>
            <Text style={styles.bulletPoint}>
              • Developed comprehensive test suites using Jest and Cypress,
              achieving 85% code coverage
            </Text>
          </View>

          <View style={styles.jobContainer}>
            <View style={styles.jobHeader}>
              <View style={styles.jobTitleCompany}>
                <Text style={styles.jobTitle}>Junior Software Developer</Text>
                <Text style={styles.company}>StartupHub, Kathmandu</Text>
              </View>
              <Text style={styles.dateLocation}>Jan 2021 – May 2021</Text>
            </View>
            <Text style={styles.bulletPoint}>
              • Built responsive web applications using React.js and Node.js
              following agile methodologies
            </Text>
            <Text style={styles.bulletPoint}>
              • Collaborated with UI/UX team to implement pixel-perfect designs
              with mobile-first approach
            </Text>
          </View>
        </View>

        {/* Projects */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>KEY PROJECTS</Text>

          <View style={styles.projectContainer}>
            <View style={styles.projectHeader}>
              <Text style={styles.projectTitle}>
                AI-Powered Page Builder Platform
              </Text>
              <Text style={styles.projectTech}>
                (Next.js, OpenAI API, GrapesJS, AWS)
              </Text>
            </View>
            <Text style={styles.projectDescription}>
              • Developed intelligent UI generator that converts natural
              language prompts to responsive HTML/CSS/React components
            </Text>
            <Text style={styles.projectDescription}>
              • Implemented real-time preview and export functionality
              supporting multiple formats (HTML, PDF, React)
            </Text>
          </View>

          <View style={styles.projectContainer}>
            <View style={styles.projectHeader}>
              <Text style={styles.projectTitle}>
                E-Commerce Microservices Platform
              </Text>
              <Text style={styles.projectTech}>
                (Go, gRPC, MongoDB, RabbitMQ)
              </Text>
            </View>
            <Text style={styles.projectDescription}>
              • Built distributed system handling inventory, orders, and
              payments with 99.9% uptime
            </Text>
            <Text style={styles.projectDescription}>
              • Implemented event-driven architecture supporting 50K+ daily
              transactions
            </Text>
          </View>

          <View style={styles.projectContainer}>
            <View style={styles.projectHeader}>
              <Text style={styles.projectTitle}>
                Unity 3D Third-Person Shooter Game
              </Text>
              <Text style={styles.projectTech}>
                (C#, Unity Engine, Photon Networking)
              </Text>
            </View>
            <Text style={styles.projectDescription}>
              • Developed complete weapon system with advanced physics,
              animations, and multiplayer support
            </Text>
          </View>
        </View>

        {/* Education */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>EDUCATION</Text>
          <View style={styles.educationContainer}>
            <Text style={styles.degree}>
              Bachelor of Computer Application (BCA)
            </Text>
            <Text style={styles.school}>
              Tribhuvan University, Kathmandu, Nepal • 2019 – 2023
            </Text>
            <View style={styles.educationDetails}>
              <Text style={styles.gpa}>CGPA: 3.85 / 4.0</Text>
              <Text style={styles.achievement}>
                Dean&apos; List • Top 5% of Class
              </Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  </PDFViewer>
);
export default PdfViewer;
