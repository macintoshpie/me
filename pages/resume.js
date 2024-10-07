import styles from '../styles/resume.module.css'

import Head from 'next/head'
import Image from 'next/image'
import Layout from '../components/layout'

const courseNames = [
  'Algorithms',
  'C Programming',
  'Operating Systems',
  'Networks',
  'Parallel Programming',
  'Big Data',
  'Application Security',
  'Intro to Computer Systems',
  'Discrete Math',
]

const frameworks = [
  'Pandas', 'Numpy', 'Docker', 'Kubernetes', 'Jenkins', 'Django', 'Flask', 'Git', 'Jira'
]

const languages = [
  'Python', 'Go', 'JavaScript', 'C', 'Bash'
]

function ResumeSection({ title, children }) {
  return (
    <div className={styles.resumeSection}>
      <h2>{title}</h2>
      {children}
    </div>
  )
}

function ResumeSubSection({ title, children }) {
  return (
    <>
      <h3>{title}</h3>
      {children}
    </>
  )
}

export default function Resume() {
  return (
    <Layout>
      <section>
        <h1>resume</h1>
        <ResumeSection title="education">
          <ResumeSubSection title="M.S. in computer science">
            <p><em>University of Chicago</em>, 3.9 / 4.0, 2018-2019</p>
            <p>
              {courseNames.join(", ")}
            </p>
          </ResumeSubSection>
          <ResumeSubSection title="B.S. double major neuroscience & chinese studies">
            <p><em>Furman University</em>, 3.48 / 4.0, 2012-2016</p>
          </ResumeSubSection>
        </ResumeSection>

        <ResumeSection title="work experience">
          <ResumeSubSection title="product engineer">
            <p><em>replit</em>, February 2022 - September 2024</p>
            <p>
              Bringing the the next billion software creators online.
            </p>
          </ResumeSubSection>
          <ResumeSubSection title="senior software engineer">
            <p><em>Devetry</em>, September 2019 - February 2022</p>
            <p>
              <ul>
                <li>
                  Solving complex problems for clients with custom software and codebase improvements (Python, Django, Golang, JavaScript, XML Schema, PHP)
                </li>
                <li>
                  Technical lead for the rebuilding of the Devetry website (Netlify, React)
                </li>
              </ul>
            </p>
          </ResumeSubSection>
          <ResumeSubSection title="graduate practicum student, developer">
            <p><em>University of Chicago - Globus Labs</em>, January 2019 - June 2019</p>
            <p>
              <ul>
                <li>
                  Created Python package which automates the process of deploying, running, and optimizing arbitrary programs
                </li>
                <li>
                  Used Bayesian Optimization to significantly reduce the amount of time required optimize tool configuration
                </li>
                <li>
                  Created RESTful web service for running jobs with the package on AWS and storing results using Flask, Redis, Docker Compose and PostgreSQL
                </li>
              </ul>
            </p>
          </ResumeSubSection>
          <ResumeSubSection title="software developer">
            <p><em>University of Chicago - Center for Translational Data Science</em>, May 2018 - May 2019</p>
            <p>
              <ul>
                <li>
                  Used Node.js, Groovy, Bash, and Docker to develop tools and automation for Kubernetes management and CI/CD pipelines in Jenkins
                </li>
                <li>
                  Created custom canary rollout method using Kubernetes, JavaScript, and NGINX
                </li>
              </ul>
            </p>
          </ResumeSubSection>
          <ResumeSubSection title="graduate research assistant II, software developer">
            <p><em>National Opinions Research Center - App Development Team</em>, November 2017 - November 2018</p>
            <p>
              <ul>
                <li>
                  Refactored, enhanced, and fixed previous bugs in Django web application backend
                </li>
                <li>
                  Designed and created a custom survey frontend using vanilla JavaScript, primarily targeted at mobile use
                </li>
                <li>
                  Created tools and statistical analysis reports on data collected through the platform using Pandas
                </li>
              </ul>
            </p>
          </ResumeSubSection>
          <ResumeSubSection title="lab coordinator">
            <p><em>Furman University - Sleep Lab</em>, June 2016 - July 2017</p>
            <p>
              <ul>
                <li>
                  Created data processing pipelines for organizing, cleaning, and merging eye tracking, EEG and behavioral data using Jupyter notebooks, Pandas, Numpy, and matplotlib
                </li>
                <li>
                  Created an embedded database application in Java with functional GUI for more effective recruitment
                </li>
              </ul>
            </p>
          </ResumeSubSection>
        </ResumeSection>
        <ResumeSection title="frameworks and tools">
          <ul>
            {frameworks.map((f, i) => <li key={i}>{f}</li>)}
          </ul>
        </ResumeSection>
        <ResumeSection title="languages">
          <ul>
            {languages.map((l, i) => <li key={i}>{l}</li>)}
          </ul>
        </ResumeSection>
      </section>
    </Layout>
  )
}
