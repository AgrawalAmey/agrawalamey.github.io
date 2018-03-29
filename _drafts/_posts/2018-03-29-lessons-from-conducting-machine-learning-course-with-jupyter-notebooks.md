---
title: Lessons From Conducting Machine Learning Course With Jupyter Notebooks
date: 2018-03-29 19:31:10 +0000
layour: post
excerpt: The problems and solutions for conducting a machine learning course in Jupyter
  Notebooks.
tags:
- Deep Learning
- Jupyter Notebooks
- Tools
image: "/uploads/2018/03/29/Screenshot from 2018-03-30 13-03-31.png"
layout: post
---
### Prologue

In recent years the popularity of machine learning and related courses has skyrocketed in BITS Pilani. Though during my junior seven courses related to machine learning and data science were offered and each containing a term project none of these courses taught programming nuances required to implement these projects. I solved assignments from Stanford's [CS 231n](cs231n.stanford.edu) and [CS 224d](http://cs224d.stanford.edu/) in my free time to learn NumPy and TensorFlow, however  with six courses and three term project it easily becomes a strenuous task. Hence, [Nikhil Verma](nikhilweee.github.io) and I approached out project adviser Prof. Bhanot with some ideas to introduce some Python based learning components in her course on Neural Networks and Fuzzy Logic. Over the summers we charted the plan for the course and decided to have three assignments each followed by a programming test. We developed the original course content for the course as a team of four senior year teaching assistants.

### Original Setup

Jupyter notebooks were the obvious choice for creating assignments. But we had to figure out how we would use 