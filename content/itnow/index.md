---
title: "IT-NOW"
date: 2023-11-19T22:38:36+01:00
draft: false
---

# IT-Nowcast (WORK IN PROGRESS)
# A monthly real-time estimate of the Italian (2020 chain-linked) Gross Domestic Product (GDP)

The estimate is updated monthly, typically during the third week of each month, and includes quarter-on-quarter (QoQ) and year-over-year (YoY) growth rates. We provide both a nowcast -- a prediction for the current month -- and a backcast, which revises the estimate for the previous month.

Additional details on the methodology and the historical nowcast series can be found at the end of the page.

&nbsp;

# Update (December 2024)

![GDP_QoQ_Growth](images/ITNOW/GDP_QoQ_Perc_Nowcasts.png "Figure 1: Italian QoQ GDP growth (percentage change) nowcasts and realizations in 2020 chain linked values. Notice that the nowcasts prior to November 2024 are produced in pseudo real time, that is as a backtesting exercise as if we were in real time. The (empirical) prediction intervals are produced using the history of the nowcast errors.")

<!--

![GDP_Level](images/ITNOW/GDP_Level_Nowcasts.png "Figure 2: Italian GDP level nowcasts and realizations in 2020 chain linked values and millions of euros.")


| 5% Pr. Bound | QoQ % Change | 95% Pr. Bound |
|---------------|--------------|---------------|
| -0.24         | 0.07          | 0.5          |

*Table 1: Prediction intervals at the 5% and 95% level and nowcasted QoQ growth rate (percentage change). See Figure 1.*

| QoQ % Change | YoY % Change | Carry Over | Level  |
|--------------|--------------|------------|--------|
| -0.07        | 0.52         | 0.16       | 482.35 |

<!--*Table 2: Nowcasted QoQ and YoY growth rates, carry-over annual effect, and level.*
*Table 2: Q3:2024 backcasted QoQ and YoY growth rates, carry-over annual effect, and level. See Figure 2.*

-->  

&nbsp;

# Methodological note

Nowcasting methods aim to provide the general public—such as policymakers, media, and investors—with real-time assessments of critical economic indicators that would otherwise be subject to significant publication delays. In brief, these methods leverage higher-frequency data to forecast indicators that are released less frequently.

For example, the quarterly Italian GDP figure is published approximately one and a half months after the reference quarter. This means the Q1 figure (covering January, February, and March) is only released in mid-April. However, industrial production, which shows a strong correlation with GDP, is released monthly and can be used to nowcast GDP.

The econometric methodology used in this report is based on the working paper, *Nowcast Combinations in Presence of Instabilities, A. Viselli (2024)*, which has not yet been disseminated. The code will soon be made publicly available on GitHub.

&nbsp;

# Historical nowcasts

<!--The next update will be on Friday, December 22, 2024, 10 am.-->

Click [here](/ITNOW/ITNOW_History.csv) to download the historical nowcast series. Notice that the nowcasts prior to November 2024 are not provided as they are derived from an out-of-sample exercise. The latest ISTAT release can be found [here](https://www.istat.it/wp-content/uploads/2024/10/FLASH_24q3_EN.pdf). An Italian economic calendar is available [here](https://it.tradingeconomics.com/italy/calendar).

Please, cite this report as: *IT-Nowcast: a monthly real-time estimate of the Italian GDP, A. Viselli (2024)*.