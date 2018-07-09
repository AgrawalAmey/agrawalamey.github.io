---
title: Better Living Through Keras
date: 2017-09-19 11:51:25.221000000 Z
tags:
- Deep Learning
- Tips
- Tools
layout: post
excerpt: My homecoming to Keras.
image: images/stock/3.jpg
---

Like many, Keras was the first deep learning library I used to build custom
models. I loved the simplicity and clean API Keras offers, however, last summers
during my summer internship I abandoned Karas in favour of TensorFlow and
PyTorch.

Following are the reasons I had stopped using Keras:
- Inefficient data input pipeline.
- No first-party support for distributed training.
- Harder to setup a serving environment.
- Imperative programming in PyTorch.

While most of the above mentioned issues could be resolved by strange
Keras-TensorFlow spaghetti it seemed easier to write the complete code
in TensorFlow. But recently while working on a computer vision project
I decided to give a shot to Keras again. It turned out to be the most
delightful experience.

The improved  