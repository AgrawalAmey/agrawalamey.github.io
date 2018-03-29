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

In recent years the popularity of machine learning and related courses has skyrocketed in BITS Pilani. Though during my junior seven courses related to machine learning and data science were offered and each containing a term project none of these courses taught programming nuances required to implement these projects. I solved assignments from Stanford's [CS 231n](cs231n.stanford.edu) and [CS 224d](http://cs224d.stanford.edu/) in my free time to learn NumPy and TensorFlow, however  with six courses and three term project it easily becomes a strenuous task. Hence, [Nikhil Verma](nikhilweee.github.io) and I approached out project adviser Prof. Bhanot with some ideas to introduce some Python based learning components in her course on Neural Networks and Fuzzy Logic. Over the summers we charted the plan for the course and decided to have three assignments each followed by a programming test. We developed the original course content for the course as a team of five senior year teaching assistants.

### Original Setup

Jupyter notebooks were the obvious choice for creating assignments. But the students who opted for the course came from diverse backgrounds. About half of them had never programmed in Python, majority of EE students had programming experience limited to C and Matlab. With 150 registered students, we did not want to them to spend time setting up Python environment. Following are the tools we employed to conduct the programming components considering the aforementioned constraints

**Assignment Distribution:**  We used [Azure Notebooks](https://notebooks.azure.com/nnfl/libraries) to distribute assignments and tutorials for the course. Students could directly clone the assignment libraries and launch the notebooks.

**Evaluating Submissions:** An awesome open source project `[nbgrader](http://nbgrader.readthedocs.io/en/stable/)` turned out to be super helpful creating and evaluating assignments in Jupyter notebooks.

**Test Portal:** We needed a way to collect the submissions during the lab tests. `nbgrader` integrates with JupyterLab but we could not cater to 150 user on the spare machine we had borrowed from one the general computer science labs to host the service. None of the competitive coding platforms provided option to host Jupyter notebooks up to our knowledge. So we decided to write a simple [Express]() web app which allowed students to upload the solutions as zips. We installed [Anaconda 3.6](https://anaconda.org/) along with `[nbopen](https://github.com/takluyver/nbopen)` on each of the lab systems.

### The issues

Though Azure notebooks were handy they were slow, combined with the slow internet connections in hostels they lead to a terrible user experience. The student uploaded zips, which hardly ever followed the instructions had different directory structure, multiple copies of notebooks and renamed notebooks. I wrote [this](https://gist.github.com/AgrawalAmey/4e499d0334e4d05c783cd8504fe7fe82) shell script to sanitise the submissions 