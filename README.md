# Twitter Degrees of Separation: BFS vs. Bidirectional BFS

A high-performance graph traversal system designed to calculate the shortest path (degrees of separation) between any two users in a massive social network (1.7M+ edges) using WebAssembly-accelerated C++.

## Table of Contents
- [Project Overview](#project-overview)
- [System Architecture](#system-architecture)
- [File Structure](#file-structure)
- [Setup & Installation](#setup--installation)
- [Algorithms & Complexity](#algorithms--complexity)
- [Data Description](#data-description)
- [Team & Roles](#team--roles)

---

## Project Overview
In massive, unweighted social networks like Twitter, finding the shortest connection between two random users manually is functionally impossible. This project addresses the **Shortest Path Retrieval** problem. By implementing and comparing **Standard BFS** with **Bidirectional BFS**, we demonstrate how searching from both the source and target simultaneously can drastically truncate the search tree, mitigating exponential growth and ensuring real-time performance.

---

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
````

* **Core Engine:** Written in C++17 for maximum memory efficiency and traversal speed
* **WebAssembly:** The C++ logic is compiled into `.wasm` via Emscripten, enabling the 1.7M-edge graph to be processed locally in the browser
* **Frontend:** A responsive React dashboard for user queries and real-time benchmarking

---

## File Structure

```text
DSAProject2b/
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
```

---

## Setup & Installation

### Prerequisites

* Node.js (v16+)
* Emscripten SDK (only if recompiling C++ logic)

### Installation

Clone the repository:

```bash
git clone https://github.com/WangAlyssa/DSAProject2b.git
cd DSAProject2b
```

Install frontend dependencies:

```bash
npm install
```

### Running the App

Start the development server:

```bash
npm start
```

Open: http://localhost:3000

---

## Algorithms & Complexity

| Algorithm             | Worst-Case Time | Space Complexity | Practical Advantage              |
| --------------------- | --------------- | ---------------- | -------------------------------- |
| **Standard BFS**      | O(V + E)        | O(V)             | Guarantees shortest path         |
| **Bidirectional BFS** | O(b^(d/2))      | O(V)             | Drastically reduces search space |

* **Graph Storage:** Implemented via `std::unordered_map<int, std::vector<int>>` for **O(1)** average neighbor lookup
* **WASM Memory:** Compiled with `ALLOW_MEMORY_GROWTH=1` to dynamically handle the **30MB+** graph heap in-browser

---

## Data Description

We utilized the **Social circles: Twitter** dataset from the [Stanford Large Network Dataset Collection (SNAP)](http://snap.stanford.edu/data).

* **Nodes:** 81,306 unique users
* **Edges:** 1,768,149 directed connections
* **Format:** Adjacency list stored in `twitter_combined.txt`

---

## What ID to Use
For the best experience, please use these validated Twitter ID pairs to see our WASM engine in action across 1.7M connections: try a Direct Connection (Source 214328887, Target 34428380), a Short Path (Source 214328887, Target 17116707), or a Deep Search (Source 19397785, Target 1050221). These IDs are guaranteed to exist in our dataset and will perfectly demonstrate the millisecond-level efficiency and correctness of our BFS algorithms.
You can also try this!
<img width="1052" height="964" alt="image" src="https://github.com/user-attachments/assets/c0939ece-34dc-4c86-9b96-a0d4bc77401d" />



## Team & Roles

* **Bruce Wang** ([@bwang0403](https://github.com/bwang0403))
  *Algorithm Engineer*
  Responsible for C++ backend architecture, adjacency list optimization, and core BFS/Bi-BFS logic

* **Alyssa Wang** ([@WangAlyssa](https://github.com/WangAlyssa))
  *Systems Integration*
  Managed the Emscripten build pipeline, WASM-to-JS bindings, and client-side data preloading

* **Jade Garcia** ([@jadechahwan](https://github.com/jadechahwan))
  *Frontend Engineer*
  Developed the React dashboard, implemented real-time performance visualization, and managed UI state
