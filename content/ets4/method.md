---
title: "How does the review work?"
draft: false
toc: true
---

The workflow follows three stages. The editor opens the process, separate referees review the manuscript, and the editor closes it. The editor and referees are model roles, but the order, file handling, retries, and separation between reviews are controlled in Python.

### The initial editor designs the panel

The initial editor reads the complete manuscript and identifies five to eight main components or claims that need review. These may concern the forecasting contribution, data, research design, model assumptions, evaluation setup, comparison methods, interpretation, or reproducibility.

It then creates the requested number of referee profiles. Each profile has a plausible research viewpoint, a main area of expertise, several specialist topics, a broad task for the paper, a unique contribution, and clear limits on what that referee is expected to judge. The editor does not write review comments at this stage, search for real researchers, predict the final decision, or steer a referee towards a particular conclusion.

The main selection principles are manuscript fit, coverage, vertical expertise, marginal contribution, and limited redundancy. In plain terms, every referee should be relevant to the paper, all important parts of the manuscript should be assigned, each profile should offer genuine depth, and no profile should pretend to be an expert in everything.

The planned division of labour is recorded in a coverage matrix. For each review need, a referee may have primary responsibility, a supporting role, or no assigned role. This makes the panel design visible before any report is written and provides a benchmark for checking the review afterwards.

### The referees work independently

Each referee receives the full PDF, the shared review guide, and only their own profile. They do not see the other profiles, the other reports, an editor's summary, or a shared model conversation. This separation reduces direct influence between referees, although reports produced by the same model family can still share biases or ways of reasoning.

Every referee writes a concise report with a neutral summary, an overall assessment, ordered major comments, a short set of minor comments, and private comments for the editor. The report also gives a recommendation — Accept, Minor revision, Major revision, or Reject — together with the referee's confidence and any ethical or integrity concern.

The shared questions ask whether the forecasting contribution is clear and relevant; whether the paper is properly placed in the literature; whether the methods, data, and research design are sound; whether the forecasting evaluation is credible and fair; whether the results support the conclusions; whether the limitations are discussed; and whether the paper is clear enough to understand and replicate. Answers use a common scale from Yes to No, including intermediate and not-applicable options.

Referees are instructed not to assume that a paper must be flawed, impose their preferred method, request unrelated work, invent references, or demand a robustness check without explaining what alternative explanation it would test. The aim is a demanding review, not criticism for its own sake.

### The final editor synthesizes the reports

The final editor receives the full manuscript, the original panel design and coverage matrix, and every completed referee report. It starts from a neutral account of the paper and checks whether the claims, evidence, and conclusions fit together.

The final report is organized by issue rather than by referee. Similar comments are merged, but meaningful differences in reasoning are kept. The editor distinguishes consensus findings from specialist contributions and genuine disagreement. It does not count votes, average recommendations, or treat the initial panel design as another referee report.

For each main issue, the editor explains where it appears, what is missing or uncertain, why it matters, what should change, and what conclusion follows. It then gives one overall recommendation: Accept, Minor revision, Major revision, Reject and resubmit, or Reject.

The report ends with a coverage appendix comparing the work the panel was expected to do with the reasoning that actually appeared in the reports. It records missed areas, useful unplanned work, excessive overlap, and whether the referee roles remained distinct. The panel is fixed for a run, so the final editor cannot invite extra referees or turn the coverage check into a new review.

## How can the process be evaluated?

The broad objective is to reduce recommendation error, but that is difficult to measure without a reliable set of past manuscripts, reports, and editorial decisions. ETS4 has not been trained or validated on such a dataset, so I do not claim that its recommendations are statistically reliable.

For now, evaluation is built around the three stages. First, does the chosen panel cover the manuscript's important dimensions with suitable and complementary expertise? Second, do the referees identify well-supported strengths and weaknesses without searching for problems merely to sound critical? Third, does the final editor combine the reports faithfully, preserve real disagreements, avoid repetition, and connect its recommendation to the evidence?

The coverage matrix makes the first and third questions easier to inspect. The repository also contains a fixed synthetic paper and a human scoring guide for repeatable tests. These checks can reveal workflow failures and weak outputs, but they are not a substitute for broader evaluation by researchers and editors.

## Current status and limits

ETS4 currently works as a local Python package and command-line tool. It accepts a readable PDF from a local file or a supported public link, keeps the complete manuscript together, runs the editor and referee stages, checks the structure of their outputs, and saves the reports in readable Markdown and structured JSON.

There is a free mock provider for testing the workflow and an OpenAI provider for real reviews. Note that ETS4 must be used carefully: it was not trained nor tested against a sample of manuscripts.

There is no hosted service, login, upload portal, or public API, and ETS4 is not yet published on PyPI. It has no OCR, so a fully image-based PDF cannot be reviewed. A very long manuscript is rejected if the full paper is unlikely to fit the selected model's context; ETS4 does not silently shorten it. Model output can also vary between runs, and valid structured output does not guarantee an intellectually sound review.

Local runs save the manuscript, extracted text, reports, and audit information in the chosen output folder. Because manuscripts are sent to an OpenAI provider, confidential papers should be used only after considering the relevant journal or institutional rules.

The software, installation instructions, review protocol, and current limitations are documented in the [**ETS4 repository**](https://github.com/andreaviselli/ets4).
