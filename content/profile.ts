/**
 * Everything personal lives here. Edit this file to change the hero, about and contact copy.
 */
export const profile = {
  name: "Helian Fierro",
  fullName: "Helian Fierro Oyola",
  role: "Analytics Engineer",
  location: "Cali, Colombia",
  photo: "/helian.jpg",
  headline: "I build the pipelines behind the numbers.",
  intro:
    "Economist turned analytics engineer. I design ELT pipelines with SQL, dbt, PySpark and Airflow, and translate the output into decisions a business can act on. Today I work in product compliance across five LATAM markets, where messy regulatory data is the daily raw material.",
  about: [
    "I studied Economics and International Business at Universidad Icesi on a national merit scholarship. That training shaped how I work: every model starts with the business question, not the tool.",
    "Since 2023 I've worked in product compliance at Dollar City, covering Colombia, Mexico, Peru, Guatemala and El Salvador. Reconciling SKU data across systems and regulatory rules taught me that most analytics problems are really data-quality problems.",
    "Now I'm building the engineering side end to end: containerized pipelines, medallion architectures, tested transformations, and dashboards that answer specific questions.",
  ],
  availability: "Open to Analytics Engineering and Data Engineering roles — remote or hybrid.",
  email: "helian1505@gmail.com",
  links: {
    github: "https://github.com/Helian1505",
    linkedin: "https://www.linkedin.com/in/helianfierro/",
  },
  stack: [
    { group: "Engineering", items: ["SQL", "dbt", "PySpark", "Apache Airflow", "PostgreSQL", "Docker"] },
    { group: "Cloud & Warehousing", items: ["Google BigQuery", "AWS S3", "Window functions", "Medallion architecture"] },
    { group: "Analysis", items: ["Python", "pandas", "NumPy", "Statistical modeling", "Financial modeling"] },
    { group: "BI & Storytelling", items: ["Power BI", "DAX", "Power Query", "Executive dashboards"] },
  ],
} as const;
