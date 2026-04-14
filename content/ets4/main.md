---
title: "ets4: Main Page"
date: 2025-10-10
draft: false
---

---

⚙️ **ets4 IS STILL UNDER CONSTRUCTION**

---

&nbsp;

## Economic Time Series Forecasting (*Selection*)

The purpose of **ets4** is twofold. First, it reflects a personal commitment: to keep learning and stay up to date with new and emerging **forecasting methodologies** across different strands of the literature, including work beyond economics. Second, it aims to provide researchers and practitioners with curated summaries and commentary on relevant **working papers** in this area.

For each issue, I begin by using an AI-based engine to screen a large number of recent working papers (e.g. over the previous month) and to assign them an initial, rough score based on multiple essential criteria. I then continue the selection and pick works offering innovative insights, models, methods, or data for forecasting in macroeconomics, finance, energy, and possibly other areas of economics. 

I may also include works from outside economics when relevant from the perspective of economic forecasting.

&nbsp;

#### ✉️ Not subscribed yet?
**{{< mailerlite-form >}}** and join the mailing list to receive each new issue directly in your **inbox**.

&nbsp;

#### 🗓️ Latest issue — **October 2025**

Read it [**here**](/ets4/2025-10) and explore this month’s selection.

&nbsp;

#### 🗂️ Archive of past issues

Browse the complete list of previous editions.  
View the [**ets4 Archive**](/ets4/).

&nbsp;

## *Human-in-the-loop* methodology behind **ets4**

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

Feedback and suggestions on *ets4* are **more than welcome**.

🔗 You can view the full collection and scoring engine on [**→ GitHub**](https://github.com/andreaviselli/andreaviselli.github.io).
