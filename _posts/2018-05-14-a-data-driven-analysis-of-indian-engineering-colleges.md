---
title: 'A Data Driven Analysis of Indian Engineering Colleges '
date: 2018-05-12 18:30:00 Z
layout: post
excerpt: We do we rank so low?
tags:
- Data Analysis
- Research In India
- BITS Pilani
image: images/posts/nirf/side.jpeg
---

During the recent protests against the fee hike at BITS Pilani, certain students claimed that the quality of education at the institute had fallen in the recent years. The rankings released under the National Institute Ranking Framework (NIRF) 2018 were cited to corroborate the claim.  BITS is ranked at 17th overall and 26th by research in the MHRD approved rankings, hence I decided to investigate the ranking parameters. NIRF provides a rough outline of the methodology used  in [this document](https://nirfcdn.azureedge.net/2018/framework/Engineering.pdf). The data provided by the institutes is also available for download in PDFs. However some of the critical details are missed out in the documentation, prohibiting the re-implementation of the ranking scores. [Nirant Kasliwal](https://github.com/NirantK) provided an insightful analysis of some of the aspects of the ranking in his [quora answer](https://www.quora.com/Why-wasn%E2%80%99t-BITS-Pilani-on-the-list-of-the-Top-100-engineering-colleges-in-India-published-by-the-Ministry-of-Human-Resource-Development-Why-is-BITS-ranked-below-universities-like-JNU-and-Tezpur-University-whereas-IITs-are-nowhere-to-be-found/answer/Nirant-Kasliwal?share=52b709fa&srid=p2LP). I would only focus on certain aspects. Some of the following results also provide hints to why Indian academic research ecosystem fails to perform at par with it's international counterparts.

## Understanding the research score criterion

NIRF defines Research and Professional Practice (RP) score which reflects the publications and patents published along with sponsored research and consultancy projects undertaken in past three years. RP is a combination of four individual matrices defined as,

$$ RP = PU + QP + IPR + FPPP $$

### Combined metric for publications (PU)

$$ PU = 35 × f(P/F_{RQ}) $$

Here, $$P$$ is the total number of publications and $$F_{RQ}$$ is the nominal number of faculty members. $$f$$ is some function whose value lies between $$[0, 1]$$, however the exact definition is missing.

### Combined metric for quality of publications (QP)

$$ QP = 20 × f (CC/P) + 20× f (TOP25P/P) $$

Here, $$CC$$ is Total Citation Count over previous three years and $$TOP25P$$ is the number of citations in top 25 percentile averaged over the previous three years.

### Patents published and granted (IPR)

$$ IPR = 10× f (PG) + 5 × f (PP)$$

$$PG$$ is the number of patents granted while $$PP$$ is the number of patents published over the previous three years.

### Footprint of projects and professional practice (FPPP)

$$ FPPP = 7.5 × f (RF) + 2.5 × f (CF) $$

Where, $$RF$$ is average annual research funding earnings and $$CF$$ annual consultancy amount per faculty at institute level in previous three years.

### Factors which decide the rankings

The largest contributor to the final score is the quality index, $$QP$$ which caries forty-percent weightage. The following graph represents the average number of citations per paper.

<iframe width="700" height="500" frameborder="0" scrolling="no" src="/images/posts/nirf/scatter_plots/citation.html"></iframe>

One can notice that the variation in the average number of citations is small and mostly lies between two and four citations. This implies that there is only a small variation in the quality of an average publication among the top 100 colleges. Hence, we would expect $$QP$$ to not cause as much of difference. The small weight for $$IPR$$ and $$FPPP$$ makes them insignificant while analyzing the overall trend of RP rankings. $$PU$$ or the average publications per faculty seems to be the single biggest factor in deciding the RP rankings. Since, the function $$f$$ is not defined in the document I assume it to be the min-max scaling function for rest of this article.

$$ f(X) = \frac{X - X_{min}}{X_{max} - X_{min}} $$

At this point one might be tempted to think why are we considering the publication per faculty and not the total number of publications. This is probably to accommodate for the different sizes of colleges. The following plot shows the number of variation of publication per faculty with change in number of faculty and change in number of PhD students. The color of marker represents the RP score.

<iframe width="700" height="500" frameborder="0" scrolling="no" src="/images/posts/nirf/scatter_plots/und_rp.html"></iframe>

We notice that as per our assumption higher publication per faculty leads to higher RP scores. Also, the metric does not show any direct trend with the number of faculty members as per intended. But a clear trend is observable when compared by the total number of PhD students. Higher the number of PhD scholars leads to higher per faculty publication and hence higher RP. Since PhD students are directly responsible for publications this seems logical to compare publications per PhD student instead of faculty.

### The PhD student crisis

PhD students drive the research outcome at any university. Only five colleges among NIRF's list of top hundred engineering colleges have a healthy average of more than four PhD students per faculty. 37 colleges have less than a single PhD student per faculty.

<iframe width="700" height="500" frameborder="0" scrolling="no" src="/images/posts/nirf/misc/pfr_line.html"></iframe>

For reference MIT's school of engineering admitted 2105 PhD students in 2017-2018 alone [\[1\]](http://web.mit.edu/facts/enrollment.html), while it has 378 faculty members [\[2\]](http://web.mit.edu/facts/faculty-by-school.html). Similarly, UC Berkeley engineering has 229 faculty [\[3\]](https://engineering.berkeley.edu/about/facts-and-figures) and enrolled 1332 PhD students in Fall 2017 [\[4\]](http://grad.berkeley.edu/wp-content/uploads/berkeley_grad_profile.pdf).

Notably, a new UGC guidelines which restricts the number a professor, an associate professor and an assistant professor can guide to eight, six and four respectively lead to a strike in JNU [\[5\]](https://scroll.in/article/832721/jnu-is-on-strike-against-drastic-cut-in-phd-and-mphil-seats-but-all-universities-will-be-hit) last year.

BITS Pilani is one of the worst hit universities with a mere PhD to faculty ratio of 0.41. Probably some of the readers know more about why BITS has so few PhD scholars. The following plot shows the top 20 colleges ranked by publication per PhD student over last three years.

<iframe width="700" height="500" frameborder="0" scrolling="no" src="/images/posts/nirf/bar_graphs/pubphdr.html"></iframe>

## Accommodating for the skew

To equate for this high imbalance in the number of PhD students I defined a function which quantifies the productivity of a faculty member as a function of number of PhD students.

<iframe width="700" height="500" frameborder="0" scrolling="no" src="/images/posts/nirf/misc/fac_emp.html"></iframe>

We can use the above stated function to define 'Effective Faculty Units' ($$EFU$$) as the product of total number of faculty and productivity function. Also, the original $$IPR$$ score does not factor for the number of faculty so I decided to update the metric to factor in for $$EFU$$ as well.

$$RP_{EFU} = PU_{EFU} + QP + IPR_{EFU} + FPPP_{EFU}$$

$$PU_{EFU} = 35 × f(P/EFU)$$

$$IPR_{EFU} = 10× f(PG/EFU) + 5 × f(PP/EFU)$$

$$FPPP_{EFU} = 7.5 × f (\frac{RF * F}{EFU}) + 2.5 × f (\frac{CF * F}{EFU})$$

The following plot shows that unlike $$RF$$, $$RF_{EFU}$$ is not biased towards colleges with large number of PhD students.

**Note:** Here on for most of the analysis we only consider the colleges which have more than two hundred faculty members and hundred PhD students.

<iframe width="700" height="500" frameborder="0" scrolling="no" src="/images/posts/nirf/scatter_plots/und_rp_norm_fac.html"></iframe>

### Does our metric capture the quality of research?

One concern I had while adding more importance to publications per PhD student was, what if the pressure of publishing more on a PhD student adversely affect the quality of publications. As it turns out $$RP_{EFU}$$ captures the quality of publication pretty well.

<iframe width="700" height="500" frameborder="0" scrolling="no" src="/images/posts/nirf/scatter_plots/citation_pfr.html"></iframe>

The above plot shows that the citations per paper increase with increasing $$RP_{EFU}$$ score. The plot also shows that a lower PhD student to faculty ratio (denoted by color) does not imply lower publication quality.

Following are the top twenty colleges based on $$RP_{EFU}$$.

<iframe width="700" height="500" frameborder="0" scrolling="no" src="/images/posts/nirf/bar_graphs/rp_by_fac_prod.html"></iframe>

Please note that some of the institutes listed are barely above the threshold of size specified earlier.

### Sponsored research projects

$$RP$$ takes into account sponsored research project and consultancy project funding. Following graphs represent the top 20 colleges bagging most funding in the past three years. The old IITs received significantly larger funds. Here we only show plots for sponsored research funding as it represents the majority of contribution. BITS looks largely underfunded compared to IITs.

<iframe width="700" height="500" frameborder="0" scrolling="no" src="/images/posts/nirf/bar_graphs/res_funding_bar.html"></iframe>

The following graph represents the research project funding (represented by the color) in past three year per PhD student against $$RP_{EFU}$$ and perception score.

<iframe width="700" height="500" frameborder="0" scrolling="no" src="/images/posts/nirf/scatter_plots/srpa_phd_rp_scatter.html"></iframe>

## Graduate outcome

The graduate outcome metric puts twenty percent weight on average number of PhD scholars graduated in past three years. Which makes quite biased towards institutes with large number of PhD students. It also involves a term considering the number of students who opted higher studies in past years, however the document does not provide sufficient information on how this number is calculated. However, we do get some interesting placement statistics.

<iframe width="700" height="500" frameborder="0" scrolling="no" src="/images/posts/nirf/bar_graphs/ug_salary.html"></iframe>

The above plot shows the top 20 colleges based on the median salary of placed students. However, these numbers should be taken with a grain of salt as they do not carry sector-wise figures.

<iframe width="700" height="500" frameborder="0" scrolling="no" src="/images/posts/nirf/bar_graphs/ug_salary.html"></iframe>

When plotted against the median salary the popularly known 'premier' institutes of India become distinctly recognizable.

<iframe width="700" height="500" frameborder="0" scrolling="no" src="/images/posts/nirf/scatter_plots/place_rp_ps.html"></iframe>

## Perception score

Perception score only counts 10% towards the final ranking but is probably the most biased component of the rankings. The methodology for calculating perception score is not documented. Commonly Indian engineering colleges are perceived in tiers, the tier one institutes consisting of old IITs, tier two involving NITs and so on. However, the perception score is modeled as an exponentially decreasing function, which might lead to larger changes in overall ranking despite it's small weight. The last plot also depicts the bias in perception score.

<iframe width="700" height="500" frameborder="0" scrolling="no" src="/images/posts/nirf/bar_graphs/ps.html"></iframe>

## Scholarships

Scholarships provides for welfare of underprivileged students. But it also serves as a means to attract students. Surprisingly, the top ranking colleges are not the ones receiving the largest government scholarships.

<iframe width="700" height="500" frameborder="0" scrolling="no" src="/images/posts/nirf/scatter_plots/gov_schol_scatter.html"></iframe>
<iframe width="700" height="500" frameborder="0" scrolling="no" src="/images/posts/nirf/scatter_plots/insti_schol_scatter.html"></iframe>

## Epilogue

BITS is home to some of the professors and students I deeply admire. The significantly lower research funding and lack of PhD students makes it much harder for professors to do research. But still we do perform fairly well when compared in fair conditions. Maintaining the quality of education and research is a continuous effort and requires a combined effort from administration, faculty members and students. Those who feel that the quality of education at BITS has declined should find ways contributing towards it's improvement, you would discover some of the most supportive teachers.

I have added many more interesting plots and tables [here](/nirf-supplementary.html). The code for this project is available on [GitHub](https://github.com/AgrawalAmey/nirf). Although I only presented analysis for engineering colleges here, the parsers works for all categories in the ranking framework.

With <span style="color:red; font-size:24px">&hearts;</span> for BITS,
Signing off 2014A7PS0148P.