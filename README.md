Gator37 - Twitter Degrees of Separation


🚀 Project Overview

This project is a high-performance web application designed to solve the Shortest Path Retrieval problem within massive social networks. Using the SNAP Twitter dataset (1.7M edges), we compare the efficiency of Standard Breadth-First Search (BFS) versus Bidirectional BFS.

To achieve near-native speeds in a browser environment, the core graph algorithms and data structures are implemented in C++ and compiled to WebAssembly (WASM) using Emscripten.


👥 Team Members (Gator37)
Bruce Wang (@bwang0403) - Algorithm Design & Core C++ Logic
Alyssa Wang (@WangAlyssa) - Data Engineering & WASM Integration
Jade Garcia (@jadechahwan) - Frontend UI/UX & Data Visualization


🛠️ Tech Stack
Backend Logic: C++17 (optimized with std::unordered_map and std::vector)
Frontend: React.js
Bridge: WebAssembly (WASM) & Emscripten
Data Source: Stanford Large Network Dataset Collection (SNAP) - Twitter


✨ Key Features
Massive Graph Support: Efficiently handles over 1.7 million edges directly in the browser.
Algorithm Comparison: Real-time benchmarking of Standard BFS vs. Bidirectional BFS.
Interactive UI: Query any two Twitter User IDs to see the shortest path and performance metrics.
WASM Acceleration: Near-instant execution by running compiled C++ code on the client side.

🚦How to Run the Project
1. PrerequisitesEnsure you have the following installed:Node.js (v16+) Emscripten SDK (Only if you need to recompile the C++ source)
2. Installation
   Clone the repository and install dependencies:
     git clone https://github.com/WangAlyssa/DSAProject2b.git
     cd DSAProject2b
     npm install
3. Compilation (C++ to WASM)
     If the .wasm binary is not present or needs updating, run:
       emcc core/main.cpp -o public/wasm/module.js -s WASM=1 -s ALLOW_MEMORY_GROWTH=1 --bind --preload-file data/twitter_combined.txt
4. Launch the Application
     Start the developmentserver:
       npm start
The app will be available at http://localhost:3000.


📊 Complexity Analysis
      Standard BFS: O(V + E) Time | O(V) Space
      Bidirectional BFS: O(b^{d/2}) 
      Practical Time | O(V) Space
      Graph Storage: O(V + E) via Adjacency List
      

📚 References
      Cormen, T. H., et al. (2009). Introduction to Algorithms. MIT Press.
      Leskovec, J., & Krevl, A. (2014). SNAP Datasets. Stanford University.
