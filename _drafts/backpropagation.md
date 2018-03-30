---
title: Backpropagation
date: 2018-01-04 10:18:00 Z
tags:
- Deep Learning
- Notes
layout: post
excerpt: Understanding backpropogration.
image: images/apogee.png
crosspost_to_medium: true
---

Backpropagation is one the fundamental algorithms in deep learning. In this blog post, I am trying to explore backpropagation the way my [IIT-JEE](https://en.wikipedia.org/wiki/Joint_Entrance_Examination_%E2%80%93_Advanced) maths teacher would do. First, we would list few basics results then derive some handy rules and finally analyze some common graphs. I strongly recommend reading Christopher Olah's  [blog](http://colah.github.io/posts/2015-08-Backprop/) if you are unfamiliar with backpropagation.

## General Idea

<figure>
    <img style="width:250px" src="/images/posts/backprop/addition.svg" />
    $$c = f(a, b)$$
    $$z = g(c)$$
</figure>

In a given computation graph, we have two input variables \\(a\\) and \\(b\\) and output variable \\(z\\). 

## Basics

### Tensor Addition

<figure>
    <img style="width:250px" src="/images/posts/backprop/addition.svg" />
    $$f = a + b$$
</figure>

An increase in \\(a\\) or \\(b\\) cause \\(f\\) to increase by the same ammount. Hence,

$$\frac{\partial f}{\partial a} = 1, \frac{\partial f}{\partial b} = 1$$

I