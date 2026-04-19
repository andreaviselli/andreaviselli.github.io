---
title: "ETS4: Main Page"
date: 2025-10-10
draft: false
---

---

⚙️ **I am still implementing ETS4 (and hope it will be ready soon)**

---

&nbsp;

## The idea behind ETS4

I have always wanted to stay up to date with new and emerging **forecasting methodologies** in economics. However, in practice, it is difficult to come across work that develops outside one’s own strict and highly specific domain of expertise. It may well be that other researchers and practitioners share the same desire and, for the sake of intellectual exploration, do not want to miss these studies.

The aim of ETS4 is therefore to provide curated summaries of, and commentary on, relevant **working papers** on such topics. Why only working papers and not published work? Because it is simpler to collect newly released working papers, and to spot new trends in this setting, than it is in journals.

For each issue, I begin by using an AI-based engine to screen a large number of recent working papers (e.g. over the previous month) and to assign them an initial, rough score based on multiple essential criteria. I then continue the selection and pick works offering innovative insights, models, methods, or data for forecasting in macroeconomics, finance, energy, and possibly other areas of economics. 

I may also include works from outside economics when relevant from the perspective of economic forecasting.

&nbsp;

#### ✉️ If you are interested, you can subscribe
**{{< mailerlite-form >}}** and join the mailing list to receive each new issue directly in your **inbox**.

&nbsp;

#### 🗓️ Latest issue — **October 2025**

Read it [**here**](/ets4/2025-10) and explore this month’s selection.

&nbsp;

#### 🗂️ Archive

Browse the complete list of previous editions.  
View the [**ETS4 Archive**](/ets4/).

&nbsp;

## *Human-in-the-loop* methodology**

The working papers are drawn from leading academic and institutional sources — including **NEP (RePEc)**, **arXiv**, and **central banks** such as the ECB, Federal Reserve, and **institutions** such as the IMF, BIS, and CEPR.

The engine runs in Python:

1. 🛰️ **Paper collection**  
   The pipeline automatically retrieves and parses various RSS feeds that publish newly released working papers. Then each feed entry is cleaned, standardized, and time-stamped.

2. 🧩 **Initial AI-driven scoring**  
   For every paper, its title and abstract are quickly assessed by a **Large Language Model (LLM)** based on:
   - Whether the paper contains a clear **forecasting or predictive modeling** component.  
   - Its **methodological or empirical novelty** and **potential impact**.  
   - Its **applicability to economic forecasting** if the paper originates from another field (e.g., in machine learning).

3. 🧮 **Scoring**  
   The model assigns a **forecasting relevance score** (1–10) and categorizes each paper as:
   - **Directly Relevant** → Forecasting of economic time series (macroeconomic, financial, or energy).  
   - **Paper of Interest** → Methodological innovation from another domain that could be adapted to economics.  
   - **Not Relevant** → The paper is not focused on economic time series forecasting, nor it may be of interest.  

   In general, I only shortlist papers with a **score of 9.0 or higher**. Because quality is difficult both to define and to assess, it is not the primary objective of the scoring stage and is considered more carefully only in the next step.

4. 🗂️ **Curation**  
   I then pick a few shortlisted papers based on their innovative content, and periodically provide deeper insights and more extended commentary on them. This stage is **fully judgemental** and is not carried out automatically by any LLM, so it may reflect my own selection criteria and views.

More generally, the papers I choose reflect my intention to disseminate not only genuinely interesting academic research, but also material that may be especially useful to practitioners with a stronger interest in forecasting applications.

---

Feedback and suggestions on *ETS4* are **more than welcome**.

🔗 You can view the full collection and scoring engine on [**→ GitHub**](https://github.com/andreaviselli/andreaviselli.github.io).
