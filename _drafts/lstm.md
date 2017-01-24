---
layout: post
title: "Backprop in LSTMs"
excerpt: "Understanding gradient flow in LSTMs."
image: "images/apogee.png"
tags:
  - Deep Learning
  - NLP
  - LSTM
---


Inspired by Andrej Karpathy's <a target="_blank" href="http://cs231n.stanford.edu">CS231n: Convolutional Neural Networks for Visual Recognition</a>, last semester me and my friends decided to try image captioning using LSTMs as our "Neural Networks and Fuzzy logic" course project. The most fun and challenging part was to calculate gradients for the backward pass. This post comes as my attempt with <a target="_blank" href="https://www.youtube.com/watch?v=tkm0TNFzIeg">Fynman's learning technique</a>.

Reccurent neural networks (RNNs) give amazing results on sequential data, <a target="_blank" href="http://karpathy.github.io/2015/05/21/rnn-effectiveness/"> [1] </a> is a great read which explains the capablities of RNNs.
Typical recurrent neural networks unfold into a repeated multiplication of hidden state with weight matrix as the following figure shows.

<figure>
    <img src="/images/posts/lstm/rnn_unfold.jpg" />
    <figsource>Figure by: <a target="_blank" href="http://wildml.com">wildml</a></figsource>
    <figcaption>Reccurent Neural Network</figcaption>
</figure>

 This lead to the <a target="_blank" href="http://neuralnetworksanddeeplearning.com/chap5.html#the_vanishing_gradient_problem">vanishing gradient problem</a>. Hence we adopt Long Short Term Memmory (LSTM) units. If you are not comfortable with forward propogation in LSTMs, <a target="_target" href="http://colah.github.io/posts/2015-08-Understanding-LSTMs/">[2]</a> is a great place to get started.

 <figure class="half">
     <img src="/images/posts/lstm/lstm_gate.png" />
     <img src="/images/posts/lstm/forward.png" />
      <figsource>Figure inspired by: <a target="_blank" href="https://arxiv.org/abs/1412.3555">Chung et al.</a></figsource>
     <figcaption>Caption describing these two images.</figcaption>
 </figure>

The computations LSTMs can be seen as a two step process. Where in the first step we calculate the gate values, while in the second stage we compute cell state (c) and output (h).

<figure>
    <img src="/images/posts/lstm/ifog.png" />
     <figsource>Figure by: <a target="_blank" href="http://nikhilweee.me">Nikhil Verma</a></figsource>
    <figcaption>Phase I: Computing gate values</figcaption>
</figure>

<figure>
    <img src="/images/posts/lstm/0.jpg" />
    <figcaption>Phase II: Computing c & h</figcaption>
</figure>
