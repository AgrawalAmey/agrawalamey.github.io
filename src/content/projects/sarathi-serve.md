---
title: "Taming Throughput-Latency Tradeoff in LLM Inference with Sarathi-Serve"
published: 2024-08-01
venue: "OSDI'24"
authors: "Amey Agrawal, Nitin Kedia, Ashish Panwar, Jayashree Mohan, Nipun Kwatra, Bhargav S. Gulavani, Alexey Tumanov, and Ramachandran Ramjee"
description: "A system designed to optimize the throughput-latency tradeoff in LLM inference serving"
tags: ["LLM Inference", "Systems", "OSDI", "Performance"]
thumbnail: "/project-list-thumbnails/sarathi-serve.png"
links:
  pdf: "https://www.usenix.org/system/files/osdi24-agrawal.pdf"
  code: "https://github.com/microsoft/sarathi-serve"
  video: "https://www.usenix.org/conference/osdi24/presentation/agrawal"
featured: true
---

## Abstract

The widespread adoption of Large Language Models (LLMs) has led to a significant increase in the demand for efficient LLM inference serving systems. These systems must balance two critical metrics: throughput (requests processed per second) and latency (time to process each request). This paper presents Sarathi-Serve, a system designed to optimize this throughput-latency tradeoff in LLM inference serving.

## Key Contributions

- Novel techniques for efficient batching and scheduling of LLM requests
- Optimizations that achieve high throughput while maintaining low latency
- Comprehensive evaluation showing significant improvements over existing systems

## Impact

Sarathi-Serve has been widely adopted in production systems and has influenced the design of several subsequent LLM serving frameworks. The techniques introduced in this work are fundamental to achieving efficient LLM deployment at scale.
