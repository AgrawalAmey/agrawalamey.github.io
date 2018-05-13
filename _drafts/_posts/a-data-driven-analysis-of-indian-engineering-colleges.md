---
title: 'A Data Driven Analysis of Indian Engineering Colleges '
date: 2018-05-12 18:30:00 Z
layout: post
excerpt: We do we rank so low?
tags:
- Data Analysis
- Research In India
- BITS Pilani
image: ''
---

During the recent protests against the fee hike at BITS Pilani certain students claimed that the quality of education at the institute had fallen in the recent years. The rankings released under the National Institute Ranking Framework (NIRF) 2018 were cited to corroborate the claim.  BITS is ranked at 17th overall and 26th by research in the MHRD approved rankings, hence i decided to investigate the ranking parameters. NIRF provides a rough outline of the methodology used  in [this document](https://nirfcdn.azureedge.net/2018/framework/Engineering.pdf). The data provided by the institutes is also available for download in PDFs. However some of the critical details are missed out in the documentation, prohibiting the re-implementation of the ranking scores. [Nirant Kasliwal](https://github.com/NirantK) provided an insightful analysis of some of the aspects of the ranking in his [quora answer](https://www.quora.com/Why-wasn%E2%80%99t-BITS-Pilani-on-the-list-of-the-Top-100-engineering-colleges-in-India-published-by-the-Ministry-of-Human-Resource-Development-Why-is-BITS-ranked-below-universities-like-JNU-and-Tezpur-University-whereas-IITs-are-nowhere-to-be-found/answer/Nirant-Kasliwal?share=52b709fa&srid=p2LP). I would only focus on certain aspects. Some of the following results also provide hints to why Indian academic research ecosystem fails to perform at par with it's international counterparts.

## Understanding the research score criterion

NIRF defines Research and Professional Practice (RP) score which reflects the publications and patents published along with sponsored research and consultancy projects undertaken in past three years. RP is a combination of four individual matrices defined as,

$$ RP = PU + QP + IPR + FPPP $$

### Combined metric for Publications (PU)

$$ PU = 35 × f(P/F_{RQ}) $$

Here, $P$ is the total number of publications and $F_{RQ}$ is the nominal number of faculty members. $f$ is some function whose value lies between $[0, 1]$, however the exact definition is missing.

### Combined metric for Quality of Publications (QP)

$$ QP = 20 × f (CC/P) + 20× f (\text{TOP25P}/P) $$

Here, CC is Total Citation Count over previous three years and $\text{TOP25P}$ is the number of citations in top 25 percentile averaged over the previous three years.