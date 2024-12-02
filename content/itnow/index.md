---
title: "IT-NOW"
date: 2023-11-19T22:38:36+01:00
draft: false
---

# IT-Nowcast
# A monthly real-time estimate of the Italian (2020 chain-linked) Gross Domestic Product (GDP)

The estimate is updated two times each month as quarter-on-quarter and year-over-year (henceforth respectively denoted as QoQ and YoY) growth rates. More specifically, a backcast of the previous month is produced at the beginning of the month and a nowcast of the current month at the middle of the month.

More information and the historical *nowcast* series is provided at the end of the page.

# Update (November 2024)

![GDP_QoQ_Growth](images/ITNOW/GDP_QoQ_Perc_Nowcasts.png "Italian QoQ GDP growth (percentage change) nowcasts and realizations in 2020 chain linked values. Notice that the nowcasts prior to November 2024 are produced in pseudo real time, that is as a backtesting exercise as if we were in real time. The (empirical) prediction intervals are produced using the history of the nowcast errors.")

![GDP_Level](images/ITNOW/GDP_Level_Nowcasts.png "Italian GDP level nowcasts and realizations in 2020 chain linked values and millions of euros.")


| 5% Pr. Bound | QoQ % Change | 95% Pr. Bound |
|---------------|--------------|---------------|
| -0.11         | 0.2          | 0.63          |

*Table 1: Prediction intervals at the 5% and 95% level and nowcasted QoQ growth rate (percentage change).*

| QoQ % Change | YoY % Change | Carry Over | Level  |
|--------------|--------------|------------|--------|
| -0.11        | 0.63         | 0.37       | 482.691 |

*Table 2: Nowcasted QoQ and YoY growth rates, carry-over annual effect, and level.*

# Methodological note

Nowcasting methods are aimed at providing the general public (e.g. policymakers, media, and investors) with a real-time assessment of important economic indicators which would otherwise be available only with a huge publication delay. In brief, these methodologies use data that is released with higher frequencies to forecast indicators that are released more unfrequently.

To give an example, the quarterly Italian GDP datum is released one and a half months later than its reference quarter. This means that the Q1 figure (including January, February and March) is only released by mid April! However, the industrial production diplays a pretty strong correlation with GDP and is released on a monthly basis, so it can be used to *nowcast* the GDP.

The econometric methodology to produce this report is based on my working paper *Nowcast combinations in presence of instabilities*, which has not been disseminated nor published yet. The code will be made publicly available on GitHub very soon.


# Next month update & Historical nowcasts

The next update will be on Friday, December 22, 2024, 10 am.

Click [here](/ITNOW/20241127Hist.csv) to download the historical nowcast series. Notice that the nowcasts prior to November 2024 are not in real time, but are the result of an out-of-sample exercise. You can find the latest ISTAT release [here](https://www.istat.it/wp-content/uploads/2024/10/FLASH_24q3_EN.pdf). An Italian economic calendar is available [here](https://it.tradingeconomics.com/italy/calendar).

Please, cite this report as *IT-Nowcast: a monthly real-time estimate of the Italian GDP, by A. Viselli (2024)*.