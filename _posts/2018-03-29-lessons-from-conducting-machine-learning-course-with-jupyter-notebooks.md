---
title: Jupyter In Classroom
date: 2018-03-29 19:31:10 Z
tags:
- Deep Learning
- Jupyter Notebooks
- Tools
layour: post
excerpt: The problems and solutions for conducting a machine learning course in Jupyter
  Notebooks.
image: images/nnfl-app.png
layout: post
---

### Prologue

In recent years the popularity of machine learning and related courses has skyrocketed in BITS Pilani. Though during my junior year seven courses related to machine learning and data science were offered and each containing a term project none of these courses taught programming nuances required to implement these projects. I solved assignments from Stanford's [CS 231n](http://cs231n.stanford.edu) and [CS 224d](http://cs224d.stanford.edu/) in my free time to learn NumPy and TensorFlow however  with six courses and three term project it easily becomes a strenuous task. Hence, [Nikhil Verma](https://nikhilweee.github.io) and I approached our project adviser Prof. Bhanot with some ideas to introduce Python-based learning components in her course on Neural Networks and Fuzzy Logic. Over the summers we charted the plan for the course and decided to have three assignments each followed by a programming test. As a team of five senior year teaching assistants during we introduced the updated course during fall 2017.

### Original Setup

Jupyter notebooks were the obvious choice for creating assignments. But the students who opted for the course came from diverse backgrounds. About half of them had never programmed in Python, the majority of EE students had programming experience limited to C and Matlab. With 150 registered students, we did not want them to spend time setting up Python environment. Following are the tools we employed to conduct the programming components considering the aforementioned constraints

**Assignment Distribution:**  We used [Azure Notebooks](https://notebooks.azure.com/nnfl/libraries) to distribute assignments and tutorials for the course. Students could directly clone the assignment libraries and click to launch the notebooks.

**Evaluating Submissions:** An awesome open source project [nbgrader](http://nbgrader.readthedocs.io/en/stable/) turned out to be super helpful in creating and evaluating assignments in Jupyter notebooks.

**Test Portal:** We needed a way to collect the submissions during the lab tests. `nbgrader` integrates with JupyterLab but we could not cater to 150 users on the spare machine we had borrowed from one the general computer science labs to host the service. None of the competitive coding platforms provided on option to host Jupyter notebooks up to our knowledge. So we decided to write a simple [Express](https://expressjs.com) web app which allowed students to upload the solutions as zips. We installed [Anaconda 3.6](https://anaconda.org/) along with [nbopen](https://github.com/takluyver/nbopen) on each of the lab systems.

### The issues

Though Azure notebooks were handy, they were slow, combined with the slow internet connections in hostels they lead to a terrible user experience. The student uploaded zips, which hardly ever followed the instructions had different directory structures, multiple copies of notebooks and renamed notebooks. I wrote [this](https://gist.github.com/AgrawalAmey/4e499d0334e4d05c783cd8504fe7fe82) shell script to sanitise the submissions by comparing the notebooks to the original problem notebooks. The poor internet connection also made it difficult to download Anaconda and to install TensorFlow, Pytorch and other deep learning libraries which were crucial for the term project.

### Building the electron app

Due to the increased popularity of the course, it was decided to run the course during both the semester. I along with [Shrikant Sharda](https://github.com/shrikantsharda) decided to fix the issues we had faced in the previous offering of the course. We need to eliminate the need to hit the internet altogether and make all the resources available on the intranet. We decided to build an [electron](http://electron.atom.io) app which would be bundled with Anaconda. We decided to keep most of the back-end components intact form our original express server which used [ejs](https://www.npmjs.com/package/ejs) templates. Following are some of the neat features this app facilitated,

**Cross-Platform Zero-Setup Jupyter Notebooks:**  We bundled Anaconda 3.6 and archives for some deep learning libraries along with the app. With some hacks (read installing anaconda on Windows via command line) we were able to ensure that regardless of which platform you are on, opening the app for the first time automatically installs an isolated Anaconda environment with all the necessary libraries with zero efforts.

**Azure Notebooks/Google Colab Like Experience But Faster:** The app communicates with the express server to fetch the assignments for you and orchestrates Jupyter notebook server. Hence, the user gets the same click to launch notebook experience we loved about Azure notebooks but this time since the notebook server runs locally on the user's system.

**Hassle Free Submission:** With the new app, the workflow for students is identical whether they are solving assignments in their hostels or appearing for the test in labs. To submit a notebook the user just has to press the submit button. This also ensures the sanity of submissions.

**Bundled Docs:** We included documentations for Python, NumPy, Matplotlib along with several tutorials and cheat sheets in the app so that students do not have to navigate out to look for reference resources.

**Improved Performance On Web Server:** We still render most views displayed within the app on our back-end web server which enables us to push front-end updates without requiring a user-side update of the app. However, all the static resources are already bundled on the client app which dramatically improved the performance of our server; especially during the first few minutes of the test, when all the users would typically download the archives of Python documentation in the old workflow.


<iframe width="560" height="315" src="https://www.youtube.com/embed/fiKaIJcfsAs" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

[![Tour Video](https://j.gifs.com/l5EDy7.gif)](https://www.youtube.com/watch?v=fiKaIJcfsAs&feature=youtu.be)

The YouTube video above provides a tour of all the features for students. The source code for the app and server is available [here](https://github.com/AgrawalAmey/nnfl-app) on GitHub. Apart from the app, we are also running a [Jekyll](https://jekyllrb.com/) site for the listing of suggested term-project topics [here](https://nnfl.github.io). We used old-school google forms with [choice eliminator 2 ](https://chrome.google.com/webstore/detail/choice-eliminator-2/mnhoinjhhhafgieggnhjekliaodnkigj?utm_source=permalink) to allocate the project topics on a first come first serve basis.

### Some interesting ideas

Though the app's performance was functionally good during the two lab tests we conducted so far there are quite a few rough edges which need to be fixed. But following are some of the more interesting ideas we think could be incorporated in the app in future.

**Remote Storage of Notebooks:** Currently the notebooks are stored locally and any changes students make in their assignment notebooks do not reflect when logged in from another machine. Syncing the files to the remote server could fix this problem.

**Consensus Protocols For Real-Time Grading:** One of the biggest downsides of our current setup is that students cannot check if their submission passed the hidden test cases and receive the scores only after we manually run `nbgrader` on their submissions. One possible way to overcome the limitation put forward by the lack of server-side computer resources could be to use all the client systems with consensus protocol.

### Future of The Project

I would graduate from BITS next month and would be focusing more on my research projects here on. If anyone finds this project useful please help us maintain and improve it. 
