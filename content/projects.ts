/**
 * Single source of truth for the portfolio.
 *
 * To ADD a project: append an object to `projects` (and drop its screenshot in /public/projects).
 * To HIDE one without deleting it: set `hidden: true`.
 * To REORDER: change `order` (lower = first). The detail page at /projects/<slug> is generated automatically.
 */

export type Category = "Data Engineering" | "Analytics Engineering" | "Business Intelligence" | "Python & Modeling";

export type Metric = { value: string; label: string };

export type Project = {
  slug: string;
  order: number;
  hidden?: boolean;
  featured?: boolean;
  title: string;
  kicker: string; // short context line shown above the title
  summary: string; // one sentence for the card
  category: Category;
  year: string;
  heroMetric: Metric; // the number the card leads with
  metrics: Metric[];
  problem: string;
  approach: string[];
  outcomes: string[];
  stack: string[];
  image?: { src: string; alt: string; width: number; height: number };
  links: { repo?: string; live?: string };
  architecture?: string[]; // optional flow rendered as a pipeline diagram
};

export const projects: Project[] = [
  {
    slug: "latam-fintech-lakehouse",
    order: 1,
    featured: true,
    title: "LATAM Fintech ELT Lakehouse",
    kicker: "Qversity 2026 · End-to-end pipeline",
    summary:
      "Containerized Bronze/Silver/Gold pipeline that turns raw nested JSON from S3 into analytics-ready models answering 24 business questions.",
    category: "Data Engineering",
    year: "2026",
    heroMetric: { value: "87,686", label: "transactions modeled" },
    metrics: [
      { value: "5,100", label: "raw records ingested" },
      { value: "6", label: "silver staging tables" },
      { value: "40", label: "dbt data tests" },
      { value: "24", label: "business questions answered" },
    ],
    problem:
      "A fictional fintech operating in 7 LATAM countries stored its customer data as deeply nested JSON in S3. Nothing was queryable, duplicates were common, and leadership had 24 open questions about revenue, credit risk and digital engagement.",
    approach: [
      "Orchestrated the full flow with an Apache Airflow DAG running inside Docker Compose.",
      "Landed raw JSON untouched in PostgreSQL as jsonb (Bronze) to keep a replayable source of truth.",
      "Flattened nested arrays and deduplicated with PySpark into six Silver staging tables.",
      "Standardized types and built dimensions and facts in dbt, guarded by 40 data tests.",
      "Modeled six Gold marts — revenue, risk, demographics, transactions, engagement, products — feeding a 4-page Power BI report.",
    ],
    outcomes: [
      "5,000 customers, 17,529 accounts, 87,686 transactions and 7,663 loans cleaned and modeled.",
      "Reproducible setup: one docker compose up brings up Airflow, Postgres and dbt.",
      "Every Gold model maps to specific business questions instead of generic reporting.",
    ],
    stack: ["Apache Airflow", "PySpark", "dbt", "PostgreSQL", "Docker", "AWS S3", "Power BI"],
    architecture: ["S3 · raw JSON", "Airflow DAG", "Bronze · jsonb", "Silver · PySpark", "Silver · dbt", "Gold · dbt", "Power BI"],
    image: {
      src: "/projects/qversity.png",
      alt: "Executive overview page of the fintech Power BI dashboard with customer, account and loan totals by country.",
      width: 1411,
      height: 798,
    },
    links: { repo: "https://github.com/Helian1505/qversity-data-2026-cali-helianfierro" },
  },
  {
    slug: "ecommerce-rfm-segmentation",
    order: 2,
    featured: true,
    title: "E-commerce RFM Segmentation",
    kicker: "Customer intelligence · BigQuery",
    summary:
      "A scalable RFM scoring model in BigQuery that segments 66k+ customers and shows where revenue actually comes from.",
    category: "Analytics Engineering",
    year: "2025",
    heroMetric: { value: "~60%", label: "of revenue from one segment" },
    metrics: [
      { value: "66k+", label: "customers scored" },
      { value: "0", label: "customers in 'Champions'" },
      { value: "~60%", label: "revenue from Potential Loyalists" },
      { value: "3", label: "markets concentrate revenue" },
    ],
    problem:
      "Standard reporting on the TheLook e-commerce dataset showed totals but not customer health. Marketing couldn't tell who to retain, who was drifting away, or whether a loyalty tier was even working.",
    approach: [
      "Joined orders, items and user demographics into a single 360° customer view.",
      "Excluded returns and cancellations so every figure reflects effective revenue.",
      "Scored Recency, Frequency and Monetary quintiles with NTILE window functions, exposed as BigQuery views.",
      "Collapsed the three scores into one health score and named segments a manager can act on.",
    ],
    outcomes: [
      "Found a 'Champions gap': zero customers qualified as top tier — a clear loyalty-program opportunity.",
      "Showed Potential Loyalists drive ~60% of revenue, arguing for retention over cold acquisition.",
      "Views scale from 66k to millions of rows without rewriting the model.",
    ],
    stack: ["BigQuery", "SQL", "Window functions", "Power BI"],
    image: {
      src: "/projects/rfm.png",
      alt: "Power BI customer value matrix showing recency versus monetary value by RFM segment.",
      width: 1442,
      height: 808,
    },
    links: { repo: "https://github.com/Helian1505/Ecommerce-RFM-Analysis" },
  },
  {
    slug: "chicago-fleet-control-tower",
    order: 3,
    title: "Chicago Fleet Control Tower",
    kicker: "Logistics telemetry · 100k+ trips",
    summary:
      "An operations control tower on Chicago taxi data that quantifies cost per mile, congestion drag and low-yield trips.",
    category: "Business Intelligence",
    year: "2025",
    heroMetric: { value: "−38%", label: "fleet speed at peak hours" },
    metrics: [
      { value: "100k+", label: "trip records" },
      { value: "$4.36", label: "avg. cost per mile" },
      { value: "18.44", label: "MPH at peak congestion" },
      { value: "0.1%", label: "deadhead risk rate" },
    ],
    problem:
      "Fleet operators had no consolidated view of where money leaked: expensive routes, congestion-driven idle time and long trips that barely paid went unmeasured.",
    approach: [
      "Extracted and cleaned 2024–2025 trips from the BigQuery public dataset with CTE-based SQL.",
      "Engineered three operating metrics: Operational Cost per Mile, Fleet Velocity and Deadhead Risk Rate.",
      "Modeled the data in Power BI with DAX and built a high-contrast telemetry layout for monitoring.",
    ],
    outcomes: [
      "Quantified a 38% speed drop during peak congestion to inform shift allocation.",
      "Flagged low-yield long trips, holding deadhead risk to 0.1% of trips.",
      "Surfaced tip yield by payment method to support pricing and payment decisions.",
    ],
    stack: ["BigQuery", "SQL", "Power BI", "DAX", "Power Query"],
    image: {
      src: "/projects/chicago.png",
      alt: "Chicago fleet dashboard with congestion heatmap by hour and weekday and cost-per-mile efficiency matrix.",
      width: 950,
      height: 732,
    },
    links: { repo: "https://github.com/Helian1505/Chicago-Fleet-Operations-Logistics-Telemetry-Dashboard" },
  },
  {
    slug: "retail-supply-chain-optimizer",
    order: 4,
    title: "Retail Supply Chain Optimizer",
    kicker: "Inventory & profitability",
    summary:
      "An executive dashboard linking sales performance to logistics bottlenecks for a multi-region retail chain.",
    category: "Business Intelligence",
    year: "2025",
    heroMetric: { value: "6.3%", label: "of profit from Furniture" },
    metrics: [
      { value: "$2.26M", label: "total sales analyzed" },
      { value: "3.96", label: "avg. lead time (days)" },
      { value: "6.3%", label: "net profit from Furniture" },
      { value: "4", label: "regions compared" },
    ],
    problem:
      "The company couldn't see which products were stuck in the supply chain or which categories truly drove profit, so inventory investment was made on volume instead of margin.",
    approach: [
      "Modeled sales and shipping relationships with SQL joins and calculated profitability fields.",
      "Built DAX measures for lead time and profit, with slicers by region, category and year.",
      "Plotted orders against lead time to isolate a 'crisis zone' of high-demand, slow-delivery products.",
    ],
    outcomes: [
      "Exposed a rigid ~4-day delivery cycle with no fast track for top sellers.",
      "Showed Furniture returns only 6.3% of net profit despite heavy storage cost.",
      "Gave managers a short list of SKUs to prioritize for stockout prevention.",
    ],
    stack: ["SQL", "Power BI", "DAX"],
    image: {
      src: "/projects/retail.png",
      alt: "Supply chain and profitability dashboard with profit per category and orders versus lead-time scatter plot.",
      width: 1444,
      height: 808,
    },
    links: { repo: "https://github.com/Helian1505/Retail-Inventory-Analysis" },
  },
  {
    slug: "avocado-quality-roi",
    order: 5,
    title: "Avocado Quality ROI Model",
    kicker: "Python simulation · Colombian retail",
    summary:
      "A Python simulation that prices the hidden cost of unripe fruit and tests whether grading technology pays for itself.",
    category: "Python & Modeling",
    year: "2025",
    heroMetric: { value: "29.27%", label: "projected ROI" },
    metrics: [
      { value: "$123M", label: "COP annual revenue leakage" },
      { value: "29.27%", label: "project ROI" },
      { value: "41", label: "months to payback" },
      { value: "2.5 / 5", label: "maturity rejection threshold" },
    ],
    problem:
      "Retailers track physical waste but not the customers who walk away from fruit that's too firm. That 'ghost demand' is invisible, so a COP $150M investment in grading technology had no business case.",
    approach: [
      "Simulated a full trading year at day level — demand and shelf maturity — with NumPy and pandas.",
      "Measured lost demand — customers who intended to buy but didn't — not just shrinkage.",
      "Built an ROI and payback model comparing the current state against an automated grading scenario.",
      "Re-ran the model over 3,000 independent years to report the case as a range instead of a single number.",
    ],
    outcomes: [
      "Located the rejection threshold: losses are zero above maturity 2.5 and ~2,300 units a day below it.",
      "Estimated COP 43.9M net annual benefit after operating costs — 29.27% ROI, 41-month payback.",
      "Stress-tested over 3,000 simulated years: profitable in 99.9% of them, median ROI 25.5% (p10–p90: 15.6%–35.9%), but only 76% pay back within five years.",
    ],
    stack: ["Python", "pandas", "NumPy", "Monte Carlo", "Financial modeling"],
    image: {
      src: "/projects/avocado.png",
      alt: "Waterfall chart: COP 123.3M of revenue lost today, minus 24.7M still lost with grading, gives 98.7M recovered; minus 54.8M operating cost leaves 43.9M net annual benefit.",
      width: 1440,
      height: 808,
    },
    links: { repo: "https://github.com/Helian1505/Avocado_Sales_Optimization" },
  },
];

export const visibleProjects = projects.filter((p) => !p.hidden).sort((a, b) => a.order - b.order);

export const categories = Array.from(new Set(visibleProjects.map((p) => p.category)));

export const getProject = (slug: string) => visibleProjects.find((p) => p.slug === slug);
