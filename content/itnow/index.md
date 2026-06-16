---
title: "ITNOW"
date: 2023-11-19T22:38:36+01:00
draft: false
plotly: true
---

&nbsp;

## 🇮🇹 Nowcasting Italian Quarterly Gross Domestic Product

This initiative provides nowcasts and backcasts for quarter-on-quarter (QoQ) nominal Gross Domestic Product (GDP, 2020 chain-linked) growth on a **monthly** basis.

Further details on the methodology and the historical nowcast series are available at the end of the page.

&nbsp;

## 📊 Quarterly Growth Nowcast Density (Last Update: May, 2026)

&nbsp;

<!-- Keep height="500px" for consistency with the Python generating code -->
{{< plotly json="/ITNOW/GDP_KDE_Ncast.json" height="510px" >}}  

*Figure 1: Kernel density estimate of the Italian quarterly nominal GDP growth nowcasts in 2020 chain-linked values. Full and Skilled correspond to time-varying combinations schemes using, respectively, the full and the selected "skilled" set of top five nowcasts, while Median corresponds to the median nowcast.*

&nbsp;

## 📈 Historical Quarterly Growth Nowcasts

&nbsp;

{{< plotly json="/ITNOW/GDP_Growth_Ncast.json" height="510px" >}}

*Figure 2: History of the Italian quarterly nominal GDP growth nowcasts using the skilled combination of top five methods and realizations in 2020 chain-linked values. Note that, prior to the latest nowcast, pseudo–real-time nowcasts are displayed. The empirical prediction intervals are computed using the history of the skilled combination nowcast errors (zoom in for more details).*

&nbsp;

| QoQ % Change (back) | QoQ % Change (now) | 5% Pr. (now) | 95% Pr. (now) |
|----------------------|--------------------|---------------|---------------|
| 0.23                 | 0.53               | -0.15         | 1.33          |

*Table 1: Latest nowcast and empirical prediction intervals at the 5% and 95% levels (see Figure 1).*

&nbsp;

## 🧭 Reference Quarter Nowcast (Last Update: Q1-2026)

&nbsp;

**Note**: This section is not updated during the quarter; it is intended solely for end-of-quarter nowcasts.

{{< plotly json="/ITNOW/GDP_Level_Ncast.json" height="510px" >}}  

*Figure 3: History of the Italian quarterly Nominal GDP level nowcasts using the skilled combination of top five methods and realizations in 2020 chain-linked values (billions of euros). Note that, prior to the latest nowcast, pseudo–real-time nowcasts are displayed (zoom in for more details).*

&nbsp;

| QoQ % Change  | YoY % Change | Carry-Over  | Level (Billion €) |
|---------------|--------------|-------------|--------|
| 0.05          | 0.55         | 0.05        | 489.21 |

*Table 2: Nowcasted QoQ and YoY growth rates, carry-over annual effect, and GDP level (see Figure 2). Note that the carry-over annual effect is unavailable for the first quarter of the year, and coincides with the YoY % Change in the last quarter.*

&nbsp;

## 🧮 Methodological Note

Nowcasting methods aim to provide the general public — such as policymakers, media, and investors — with real-time assessments of key economic indicators that would otherwise be subject to significant publication delays. These methods leverage higher-frequency data to forecast indicators that are released less frequently.

For example, the quarterly Italian GDP figure is published one month after the reference quarter. This means that the Q1 figure (covering January, February, and March) is only released at the beginning of April. However, industrial production — which is a strong predictor of the GDP — is released monthly and can therefore be used to nowcast GDP.

The econometric methodology applied in this initiative is based on the working paper *“Skilled nowcast combinations during crises”* (A. Viselli). The corresponding code will soon be made publicly available on GitHub.

&nbsp;

## 📜 Historical Nowcasts

Click [here](/ITNOW/ITNOW_History.xlsx) to download the historical nowcast series. Note that nowcasts prior to October 2024 are excluded, as they were derived from an out-of-sample exercise.  

The latest ISTAT release (Q1:2026, preliminary estimate of GDP) can be found [here](https://www.istat.it/en/press-release/preliminary-estimate-of-gdp-q1-2026/).

An Italian economic calendar is available [here](https://it.tradingeconomics.com/italy/calendar).


&nbsp;

---

You can **cite** this initiative through the paper: 

A. Viselli, **Skilled nowcast combinations during crises** (R&R at *Studies in Nonlinear Dynamics and Econometrics*).