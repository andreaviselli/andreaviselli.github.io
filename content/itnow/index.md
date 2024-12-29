---
title: "IT-NOW"
date: 2023-11-19T22:38:36+01:00
draft: false
plotly: true
---

# IT-Nowcast
# A monthly real-time estimate of the Italian (2020 chain-linked) Gross Domestic Product (GDP)

We provide monthly nowcasts and backcasts for quarter-on-quarter (QoQ) GDP growth. The backcasts revise the nowcast for the previous month. Additionally, we offer quarterly nowcasts for the level of GDP and the associated error for the GDP growth nowcast. Monthly updates occur at the end of each month, while quarterly updates are provided at the end of each quarter.

Further details on the methodology and the historical nowcast series are available at the end of the page.

&nbsp;

# Monthly Nowcast (Last Update: December 2024)

&nbsp;

<!-- Keep height="500px" for consistency with the Python generating code -->
{{< plotly json="/ITNOW/GDP_QoQ_Perc_Nowcasts.json" height="510px" >}}
*Figure 1: Italian QoQ GDP growth nowcasts and realizations in 2020 chain linked values. Notice that, prior to October 2024, we display pseudo real time nowcasts. The empirical prediction intervals are computed using the history of the nowcast errors (zoom the chart for more details).*

&nbsp;

| QoQ % Change  (back) | QoQ % Change  (now)   |5% Pr. (now)   | 95% Pr. (now) |
|----------------------|-----------------------|---------------|---------------|
| 0.02                 | 0.03                  | -0.27         | 0.47          |     

*Table 1: Monthly nowcast and empirical prediction intervals at the 5% and 95% level for the QoQ GDP growth rate relative to December 2024 (see Figure 1).*

&nbsp;

# Quarterly Nowcast (Last Update: November 2024)

&nbsp;

{{< plotly json="/ITNOW/GDP_Level_Nowcasts.json" height="510px" >}} 
*Figure 2: Italian quarterly GDP level nowcasts and realizations in 2020 chain linked values and in thousands of millions of euros. Notice that, prior to October 2024, we display pseudo real time nowcasts (zoom the chart for more details).*

&nbsp;

| QoQ % Change | YoY % Change | Carry Over | Level  |
|--------------|--------------|------------|--------|
| -0.07        | 0.52         | 0.16       | 482.35 |

*Table 2: Nowcasted QoQ and YoY growth rates, carry-over annual effect, and level for Q3:2024 GDP (see Figure 2).*

&nbsp;

{{< plotly json="/ITNOW/GDP_Nowcast_Error.json" height="510px" >}} 
*Figure 3: Italian QoQ GDP growth nowcast errors in 2020 chain linked values. Notice that, prior to October 2024, we display pseudo real time nowcasts (zoom the chart for more details).*
  
&nbsp;

# Methodological note

Nowcasting methods aim to provide the general public -— such as policymakers, media, and investors -— with real-time assessments of critical economic indicators that would otherwise be subject to significant publication delays. In brief, these methods leverage higher-frequency data to forecast indicators that are released less frequently.

For example, the quarterly Italian GDP figure is published approximately one and a half months after the reference quarter. This means e.g. the Q1 figure (covering January, February, and March) is only released in mid-April; however, industrial production, which shows a strong correlation with GDP, is released monthly and can be used to nowcast GDP.

The econometric methodology used in this report is based on the working paper, *Nowcast Combinations in Presence of Instabilities, A. Viselli (2024)*, which has not yet been disseminated. The code will soon be made publicly available on GitHub.

&nbsp;

# Historical nowcasts

<!--The next update will be on Friday, December 22, 2024, 10 am.-->

Click [here](/ITNOW/ITNOW_History.csv) to download the historical nowcast series. Notice that the nowcasts prior to October 2024 are not provided as they are derived from an out-of-sample exercise. The latest ISTAT release can be found [here](https://www.istat.it/wp-content/uploads/2024/10/FLASH_24q3_EN.pdf). An Italian economic calendar is available [here](https://it.tradingeconomics.com/italy/calendar).

Please, cite this report as: *IT-Nowcast: a monthly real-time estimate of the Italian GDP, A. Viselli (2024)*.