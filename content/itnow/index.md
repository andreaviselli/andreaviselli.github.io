---
title: "IT-NOW"
date: 2023-11-19T22:38:36+01:00
draft: false
plotly: true
---

---

⚙️ **UPDATES ARE CURRENTLY SUSPENDED DUE TO ONGOING IMPROVEMENTS TO THE METHODOLOGY**

---

&nbsp;

## 🇮🇹 A Monthly Real-Time Forecast of Italian Gross Domestic Product

We provide monthly nowcasts and backcasts for quarter-on-quarter (QoQ) Gross Domestic Product (GDP, 2020 chain-linked) growth. The backcasts revise the nowcast from the previous month. In addition, we provide quarterly nowcasts for the GDP level and the associated forecast error. 

Monthly updates are released at the end of each month, while quarterly updates are published at the end of each quarter.

Further details on the methodology and the historical nowcast series are available at the end of the page.

&nbsp;

## 📈 Quarterly Nowcast (Last Update: July 22, 2025)

&nbsp;

<!-- Keep height="500px" for consistency with the Python generating code -->
{{< plotly json="/ITNOW/GDP_QoQ_Perc_Nowcasts.json" height="510px" >}}

*Figure 1: Italian QoQ GDP growth nowcasts and realizations in 2020 chain-linked values. Note that, prior to the latest nowcast, pseudo–real-time nowcasts are displayed. The empirical prediction intervals are computed using the history of nowcast errors (zoom in for more details).*

&nbsp;

| QoQ % Change (back) | QoQ % Change (now) | 5% Pr. (now) | 95% Pr. (now) |
|----------------------|--------------------|---------------|---------------|
| 0.13                | 0.20               | -0.11         | 0.62          |

*Table 1: Monthly nowcast and empirical prediction intervals at the 5% and 95% levels for the QoQ GDP growth rate (see Figure 1).*

&nbsp;

## 🧭 Reference Quarter Nowcast (Last Update: Q2-2025)

&nbsp;

{{< plotly json="/ITNOW/GDP_Level_Nowcasts.json" height="510px" >}}  

*Figure 2: Italian quarterly GDP level nowcasts and realizations in 2020 chain-linked values (thousands of millions of euros). Note that, prior to the latest nowcast, pseudo–real-time nowcasts are displayed (zoom in for more details).*

&nbsp;

| QoQ % Change | YoY % Change | Carry-Over | Level |
|---------------|--------------|-------------|--------|
| 0.20          | 0.67         | 0.46        | 486.15 |

*Table 2: Nowcasted QoQ and YoY growth rates, carry-over annual effect, and GDP level (see Figure 2). Note that the carry-over annual effect is unavailable for the first quarter of the year, and coincides with the YoY % Change in the last quarter.*

&nbsp;

{{< plotly json="/ITNOW/GDP_Nowcast_Error.json" height="510px" >}}  

*Figure 3: Italian QoQ GDP growth nowcast errors in 2020 chain-linked values. The latest available observation refers to Q1-2025. Note that, prior to the latest nowcast, pseudo–real-time nowcasts are displayed (zoom in for more details).*

&nbsp;

## 🧮 Methodological Note

Nowcasting methods aim to provide the general public — such as policymakers, media, and investors — with real-time assessments of key economic indicators that would otherwise be subject to significant publication delays. In short, these methods leverage higher-frequency data to forecast indicators that are released less frequently.

For example, the quarterly Italian GDP figure is published one month after the reference quarter. This means that, for instance, the Q1 figure (covering January, February, and March) is only released at the beginning of April. However, industrial production — which is a strong predictor of the GDP — is released monthly and can therefore be used to nowcast GDP.

The econometric methodology applied in this report is based on the working paper *“Nowcast Combinations in the Presence of Instabilities”* (A. Viselli, submitted), which has not yet been disseminated. The corresponding code will soon be made publicly available on GitHub.

&nbsp;

## 📜 Historical Nowcasts

Click [here](/ITNOW/ITNOW_History.xlsx) to download the historical nowcast series. Note that nowcasts prior to October 2024 are excluded, as they were derived from an out-of-sample exercise.  

The latest ISTAT release can be found [here](https://www.istat.it/en/press-release/quarterly-national-accounts-q4-2024/), and an Italian economic calendar is available [here](https://it.tradingeconomics.com/italy/calendar).


&nbsp;

---

You can **cite** this initiative as: 

*IT-NOW: a monthly real-time forecast of the Italian Gross Domestic Product*, A. Viselli.