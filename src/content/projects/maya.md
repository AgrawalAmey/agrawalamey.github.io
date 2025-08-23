---
title: "Maya: Optimizing Deep Learning Training Workloads using Emulated Virtual Accelerators"
published: 2025-01-20
venue: "EuroSys'26"
authors: "Srihas Yarlagadda*, Amey Agrawal*, Elton Pinto*, Hakesh Darapaneni, Mitali Meratwal, Shivam Mittal, Pranavi Bajjuri, Srinivas Sridharan, Alexey Tumanov"
description: "Emulation-based approach for optimizing deep learning training workloads"
tags: ["Deep Learning", "Training", "Optimization", "Emulation"]
thumbnail: "/project-list-thumbnails/maya.png"
links:
  pdf: "https://arxiv.org/pdf/2503.20191"
featured: true
---

## Abstract

Training large foundation models costs hundreds of millions of dollars, making deployment optimization critical. Current approaches require machine learning engineers to manually craft training recipes through error-prone trial-and-error on expensive compute clusters. To enable efficient exploration of training configurations, researchers have developed performance modeling systems. However, these systems force users to translate their workloads into custom specification languages, introducing a fundamental semantic gap between the actual workload and its representation. This gap creates an inherent tradeoff: systems must either support a narrow set of workloads to maintain usability, require complex specifications that limit practical adoption, or compromise prediction accuracy with simplified models.

We present Maya, a performance modeling system that eliminates these tradeoffs through transparent device emulation. By operating at the narrow interface between training frameworks and accelerator devices, Maya can capture complete workload behavior without requiring code modifications or translations. Maya intercepts device API calls from unmodified training code to directly observe low-level operations, enabling accurate performance prediction while maintaining both ease of use and generality. Our evaluation shows Maya achieves less than 5% prediction error across diverse models and optimization strategies, identifying configurations that reduce training costs by up to 56% compared to existing approaches.