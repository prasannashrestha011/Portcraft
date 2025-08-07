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
import { useResumeStore } from "@/store/resumeDataStore";
import { Experience, Project } from "@/app/types/resumeType";
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

const PdfViewerTemplate_1 = () => {
  const { resumeValues: data } = useResumeStore();
  if (!data) {
    return <div>Failed to generate PDF.</div>;
  }
  return (
    <PDFViewer className="h-screen w-full">
      <Document>
        <Page size="TABLOID" style={styles.page}>
          {/* Header Section */}
          <View style={styles.header}>
            <Text style={styles.name}>{data.personalInfo.name}</Text>
            <Text style={styles.jobTitleMain}>
              {data.personalInfo.jobTitle}
            </Text>
            <Text style={styles.contactInfo}>
              {`${data.personalInfo.phone} • ${data.personalInfo.email} • ${data.personalInfo.linkedin} • ${data.personalInfo.github} • ${data.personalInfo.location}`}
            </Text>
          </View>

          {/* Summary */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>PROFESSIONAL SUMMARY</Text>
            <Text style={styles.paragraph}>{data.summary}</Text>
          </View>

          {/* Skills */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>TECHNICAL EXPERTISE</Text>

            <View style={styles.skillCategory}>
              <Text style={styles.skillLabel}>Languages:</Text>
              <Text style={styles.skillItems}>{data.skills.languages}</Text>
            </View>
            <View style={styles.skillCategory}>
              <Text style={styles.skillLabel}>Frontend:</Text>
              <Text style={styles.skillItems}>{data.skills.frontend}</Text>
            </View>
            <View style={styles.skillCategory}>
              <Text style={styles.skillLabel}>Backend:</Text>
              <Text style={styles.skillItems}>{data.skills.backend}</Text>
            </View>
            <View style={styles.skillCategory}>
              <Text style={styles.skillLabel}>Database & Cloud:</Text>
              <Text style={styles.skillItems}>{data.skills.databaseCloud}</Text>
            </View>
            <View style={styles.skillCategory}>
              <Text style={styles.skillLabel}>Tools & Practices:</Text>
              <Text style={styles.skillItems}>
                {data.skills.toolsPractices}
              </Text>
            </View>
          </View>

          {/* Experience */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>PROFESSIONAL EXPERIENCE</Text>

            {data.experience.length > 0 &&
              data.experience.map((job: Experience, index: number) => (
                <View key={index} style={styles.jobContainer}>
                  <View style={styles.jobHeader}>
                    <View style={styles.jobTitleCompany}>
                      <Text style={styles.jobTitle}>{job.jobTitle}</Text>
                      <Text style={styles.company}>
                        {job.company}, {job.location}
                      </Text>
                    </View>
                    <Text style={styles.dateLocation}>
                      {job.startDate} – {job.current ? "Present" : job.endDate}
                    </Text>
                  </View>
                  {job.achievements.map((achievement, i) => (
                    <Text key={i} style={styles.bulletPoint}>
                      • {achievement}
                    </Text>
                  ))}
                </View>
              ))}
          </View>

          {/* Projects */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>KEY PROJECTS</Text>

            {data.projects.map((project: Project, index: number) => (
              <View key={index} style={styles.projectContainer}>
                <View style={styles.projectHeader}>
                  <Text style={styles.projectTitle}>{project.title}</Text>
                  <Text style={styles.projectTech}>
                    ({project.technologies})
                  </Text>
                </View>
                {project.descriptions.map((desc, i) => (
                  <Text key={i} style={styles.projectDescription}>
                    • {desc}
                  </Text>
                ))}
              </View>
            ))}
          </View>

          {/* Education */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>EDUCATION</Text>
            <View style={styles.educationContainer}>
              <Text style={styles.degree}>{data.education.degree}</Text>
              <Text style={styles.school}>
                {data.education.institution}, {data.education.location} •{" "}
                {data.education.startYear} – {data.education.endYear}
              </Text>
              <View style={styles.educationDetails}>
                <Text style={styles.gpa}>CGPA: {data.education.gpa}</Text>
                <Text style={styles.achievement}>
                  {data.education.achievements}
                </Text>
              </View>
            </View>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};
export default PdfViewerTemplate_1;
