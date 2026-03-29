# Twitter Degrees of Separation: BFS vs. Bidirectional BFS

A high-performance graph traversal system designed to calculate the shortest path (degrees of separation) between any two users in a massive social network (1.7M+ edges) using WebAssembly-accelerated C++.

## Table of Contents
1. [Project Overview](#project-overview)
2. [System Architecture](#system-architecture)
3. [File Structure](#file-structure)
4. [Setup & Installation](#setup--installation)
5. [Algorithms & Complexity](#algorithms--complexity)
6. [Data Description](#data-description)
7. [Team & Roles](#team--roles)

---

## Project Overview
In massive, unweighted social networks like Twitter, finding the shortest connection between two random users manually is functionally impossible. This project addresses the **Shortest Path Retrieval** problem. By implementing and comparing **Standard BFS** with **Bidirectional BFS**, we demonstrate how searching from both the source and target simultaneously can drastically truncate the search tree, mitigating exponential growth and ensuring real-time performance.

## System Architecture
The system uses a hybrid architecture to combine C++ performance with a modern web interface:

```text
Browser (Client-Side)
       |
  React UI (Dashboard) <------> WASM Bridge (Emscripten)
       |                              |
       +------------------------------+
                      |
             C++ Backend Engine
      (Adjacency List | BFS Algorithms)
Core Engine: Written in C++17 for maximum memory efficiency and traversal speed.WebAssembly: The C++ logic is compiled into .wasm via Emscripten, enabling the 1.7M-edge graph to be processed locally in the browser.Frontend: A responsive React dashboard for user queries and real-time benchmarking.File StructurePlaintextDSAProject2b/
├── public/
│   ├── wasm/                 # Compiled WebAssembly binaries (.wasm, .js)
│   └── data/                 # Twitter dataset preloaded into WASM memory
├── src/
│   ├── components/           # React UI components (Dashboard, Charts)
│   └── App.js                # Main frontend entry point
├── core/
│   ├── main.cpp              # C++ Algorithm implementations (BFS & Bi-BFS)
│   ├── Graph.h               # Adjacency List data structure
│   └── bindings.cpp          # Emscripten / WebAssembly bindings
├── data/
│   └── twitter_combined.txt  # SNAP Twitter dataset (1.7M edges)
├── package.json              # Node.js dependencies
└── README.md                 # Project documentation
Setup & InstallationPrerequisitesNode.js (v16+)Emscripten SDK (Only if recompiling C++ logic)InstallationClone the repository:Bashgit clone [https://github.com/WangAlyssa/DSAProject2b.git](https://github.com/WangAlyssa/DSAProject2b.git)
cd DSAProject2b
Install frontend dependencies:Bashnpm install
Running the AppStart the development server:Bashnpm start
Open http://localhost:3000 in your browser.Algorithms & ComplexityAlgorithmWorst-Case TimeSpace ComplexityPractical AdvantageStandard BFS$O(V + E)$$O(V)$Guarantees shortest path.Bidirectional BFS$O(b^{d/2})$$O(V)$Drastically reduces search space for large $d$.Graph Storage: Implemented via std::unordered_map<int, std::vector<int>> for $O(1)$ average neighbor lookup.WASM Memory: Configured with ALLOW_MEMORY_GROWTH=1 to handle the 30MB+ graph heap.Data DescriptionWe utilized the Social circles: Twitter dataset from the Stanford Large Network Dataset Collection (SNAP).Nodes: 81,306 unique users.Edges: 1,768,149 directed connections.Team & RolesBruce Wang (@bwang0403): Lead Algorithm Engineer. Responsible for C++ backend, Adjacency List construction, and BFS variants.Alyssa Wang (@WangAlyssa): Systems Integration. Responsible for Emscripten build pipeline, WASM bindings, and data management.Jade Garcia (@jadechahwan): Frontend Lead. Responsible for React dashboard, state management, and performance visualization.
