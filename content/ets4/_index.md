---
title: "ETS4"
draft: false
toc: true
plotly: true
layout: single
aliases:
  - "/ets4/main/"
  - "/ets4/2025-10/"
---

**Economic Time Series 4Casting** (ETS4) is an experimental, AI-driven review process designed to mimic the review mechanism used by academic journals, with a specific focus on research in economic time-series forecasting.

I created ETS4 to review my own research, but it may also be useful to other researchers working in the field. I share the source code so that it can be easily inspected, modified, adapted to other fields, or repurposed for other applications.

Feedback, criticism, and suggestions are more than welcome.

> 🧑‍💻 Open-source repository available on [**GitHub**](https://github.com/andreaviselli/ets4).

&nbsp;

## What is the goal?

To deliver automatic, specialized, and *targeted* referee reports for working papers in ETS4. The process is designed to mimic the work of a small group of referees assigned by an editor to review a manuscript, providing a deep, heterogeneous, yet complementary set of comments, critiques, and overall assessments of its content.

Of course, ETS4 is not intended to replace human referees, nor is it currently able to do so. However, it can provide a structured first review, helping us identify potential strengths and weaknesses, highlighting points that we might otherwise overlook, and, more generally, instilling doubt.

&nbsp;

## How does it work?

The process is initiated by an editor, who first reads the manuscript and then selects a panel of referees. The referees independently evaluate the manuscript and are elicited as specialized AI personas with complementary skills and expertise tailored to its topics.

The editor then collects their reports, synthesizes their common and non-overlapping content, and issues a final recommendation. This makes the process a *targeted review*, as the referee panel is constructed specifically for the manuscript under review.

ETS4 is written in Python and currently relies on OpenAI providers.

> 📋 Read the full [**methodology**]({{< relref "method.md" >}}) behind ETS4.

> 🌳 See the repository's [**README**](https://github.com/andreaviselli/ets4/blob/main/README.md) for installation, configuration, and usage details.

&nbsp;

## **The state of the academic publishing system**

As humans, we do not have infinite attention. It is a scarce resource that depletes over time.

Referees are motivated by their passion for research, a sense of professional duty, and goodwill. However, the current publishing system is coming under increasing pressure as research output grows rapidly, while there are few incentives to take on services to the profession, such as reviewing a paper.

If referee workloads continue to increase, reviewers will become increasingly scarce. This matters for research because productivity gains from AI adoption may push research output to [levels never seen before](https://www.datacamp.com/blog/open-ai-model-astra-solved-ten-open-math-problems?utm_source=substack&utm_medium=email), requiring new tools to process these [higher volumes](https://arxiv.org/stats/monthly_submissions).

This trend is already evident in arXiv submissions.

&nbsp;

{{< plotly json="/ETS4/arXiv_Submissions_Chart.json" height="510px" >}}

*Figure 1: Number of new arXiv submissions received each month since August 1991.*

&nbsp;

The incentive problem is equally difficult to ignore.

Referees are unpaid for their work. This creates a deeply perverse, yet well-established, short circuit in which academic publishers hold the rights to the intellectual output of highly educated professionals, while relying on those same professionals to review it for free. This becomes even harder to justify when looking at the [profit margins](https://www.molecularweights.com/p/academic-publishing-profit-margins-big-five) of academic publishers. It is also well recognized that this system generates poor career incentives in academia.

I am not the only one wishing for change. AI may help disrupt this system by increasing research output and, at the same time, laying the groundwork for alternative ways to share and assess research.
