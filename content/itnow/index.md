---
title: "IT-NOW"
date: 2023-11-19T22:38:36+01:00
draft: false
plotly: true
---

# IT-Nowcast
# A monthly real-time forecast of the Italian (2020 chain-linked) Gross Domestic Product (GDP)

We provide monthly nowcasts and backcasts for quarter-on-quarter (QoQ) GDP growth. The backcasts revise the nowcast for the previous month. Additionally, we offer quarterly nowcasts for the level of GDP and the associated error for the GDP growth nowcast. Monthly updates occur at the end of each month, while quarterly updates are provided at the end of each quarter.

Further details on the methodology and the historical nowcast series are available at the end of the page.

&nbsp;

# Quarterly nowcast (Last Update: July 22, 2025)

&nbsp;

<!-- Keep height="500px" for consistency with the Python generating code -->
{{< plotly json="/ITNOW/GDP_QoQ_Perc_Nowcasts.json" height="510px" >}}
*Figure 1: Italian QoQ GDP growth nowcasts and realizations in 2020 chain linked values. Notice that, prior to the latest nowcast, we display pseudo real time nowcasts. The empirical prediction intervals are computed using the history of the nowcast errors (zoom the chart for more details).*

&nbsp;

| QoQ % Change  (back) | QoQ % Change  (now)   |5% Pr. (now)   | 95% Pr. (now) |
|----------------------|-----------------------|---------------|---------------|
| 0.13                 | 0.20                  | -0.11          | 0.62          |     

*Table 1: Monthly nowcast and empirical prediction intervals at the 5% and 95% level for the QoQ GDP growth rate (see Figure 1).*

&nbsp;

# Reference quarter nowcast (Last Update: Q2-2025)

&nbsp;

{{< plotly json="/ITNOW/GDP_Level_Nowcasts.json" height="510px" >}} 
*Figure 2: Italian quarterly GDP level nowcasts and realizations in 2020 chain linked values and in thousands of millions of euros. Notice that, prior to the latest nowcast, we display pseudo real time nowcasts (zoom the chart for more details).*

&nbsp;

| QoQ % Change | YoY % Change | Carry Over | Level   |
|--------------|--------------|------------|---------|
| 0.20         | 0.67         | 0.46       | 486.15  |

*Table 2: Nowcasted QoQ and YoY growth rates, carry-over annual effect, and level for GDP (see Figure 2). Notice that the carry-over annual effect is not available on the first quarter of the year, whereas it coincides with the YoY % Change for the last quarter of the year.*

&nbsp;

{{< plotly json="/ITNOW/GDP_Nowcast_Error.json" height="510px" >}} 
*Figure 3: Italian QoQ GDP growth nowcast errors in 2020 chain linked values. The latest available figure is relative to Q1:2025. Notice that, prior to the latest nowcast, we display pseudo real time nowcasts (zoom the chart for more details).*
  
&nbsp;

# Methodological note

Nowcasting methods aim to provide the general public -— such as policymakers, media, and investors -— with real-time assessments of critical economic indicators that would otherwise be subject to significant publication delays. In brief, these methods leverage higher-frequency data to forecast indicators that are released less frequently.

For example, the quarterly Italian GDP figure is published approximately one and a half months after the reference quarter. This means e.g. the Q1 figure (covering January, February, and March) is only released in mid-April; however, industrial production, which shows a strong correlation with GDP, is released monthly and can be used to nowcast GDxP.

The econometric methodology used in this report is based on the working paper, *Nowcast Combinations in Presence of Instabilities, A. Viselli (2024)*, which has not yet been disseminated. The code will soon be made publicly available on GitHub.

&nbsp;

# Historical nowcasts

<!--The next update will be on Friday, December 22, 2024, 10 am.-->
Updates generally take place at the end of third week of the month. 

The next update will be on **Monday, September 1, 2025**.

Click [here](/ITNOW/ITNOW_History.xlsx) to download the historical nowcast series. Notice that the nowcasts prior to October 2024 are not provided as they are derived from an out-of-sample exercise. The latest ISTAT release can be found [here](https://www.istat.it/en/press-release/quarterly-national-accounts-q4-2024/). An Italian economic calendar is available [here](https://it.tradingeconomics.com/italy/calendar).

Please, cite this report as: *IT-Nowcast: a monthly real-time forecast of the Italian GDP, A. Viselli (2024)*.