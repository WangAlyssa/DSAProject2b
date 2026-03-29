#include <fstream>
#include <unordered_map>
#include <unordered_set>
#include <vector>
#include <string>
#include <queue>
#include <chrono>
#include <algorithm>
#include <emscripten/bind.h>

using namespace std;
using namespace emscripten;

unordered_map<int, vector<int>> adjList;

bool loadData(string filePath) {
    ifstream file(filePath);
    if (!file.is_open()) return false;

    int u, v;
    while (file >> u >> v) {
        adjList[u].push_back(v);
    }
    file.close();
    printf("Successfully loaded %lu nodes into the graph!\n", adjList.size());
    return true;
}

val runBFS(int source, int target, int algoType) {
    val result = val::object();
    val path = val::array();
    
    auto start = chrono::high_resolution_clock::now();
    
    int nodesVisited = 0;
    vector<int> pathVec;

    if (adjList.find(source) == adjList.end() || adjList.find(target) == adjList.end()) {
    } 
    else if (source == target) {
        pathVec.push_back(source);
        nodesVisited = 1;
    } 

    else if (algoType == 0) {
        queue<int> q;
        unordered_set<int> visited;
        unordered_map<int, int> parentMap;

        q.push(source);
        visited.insert(source);
        parentMap[source] = -1;
        
        bool found = false;

        while (!q.empty()) {
            int curr = q.front();
            q.pop();
            nodesVisited++;

            if (curr == target) {
                found = true;
                break;
            }

            for (int neighbor : adjList[curr]) {
                if (visited.find(neighbor) == visited.end()) {
                    visited.insert(neighbor);
                    parentMap[neighbor] = curr;
                    q.push(neighbor);
                }
            }
        }

        if (found) {
            int curr = target;
            while (curr != -1) {
                pathVec.push_back(curr);
                curr = parentMap[curr];
            }
            reverse(pathVec.begin(), pathVec.end());
        }
    } 

    else {
        queue<int> qStart, qTarget;
        unordered_map<int, int> parentStart, parentTarget;

        qStart.push(source);
        qTarget.push(target);
        
        parentStart[source] = -1;
        parentTarget[target] = -1;

        int intersectNode = -1;

        while (!qStart.empty() && !qTarget.empty()) {
            int currStart = qStart.front();
            qStart.pop();
            nodesVisited++;

            if (parentTarget.find(currStart) != parentTarget.end()) {
                intersectNode = currStart;
                break;
            }

            for (int neighbor : adjList[currStart]) {
                if (parentStart.find(neighbor) == parentStart.end()) {
                    parentStart[neighbor] = currStart;
                    qStart.push(neighbor);
                }
            }

            if (intersectNode != -1) break;

            int currTarget = qTarget.front();
            qTarget.pop();
            nodesVisited++;

            if (parentStart.find(currTarget) != parentStart.end()) {
                intersectNode = currTarget;
                break;
            }

            for (int neighbor : adjList[currTarget]) {
                if (parentTarget.find(neighbor) == parentTarget.end()) {
                    parentTarget[neighbor] = currTarget;
                    qTarget.push(neighbor);
                }
            }
        }

        if (intersectNode != -1) {
            vector<int> pStart, pTarget;
            
            int curr = intersectNode;
            while (curr != -1) {
                pStart.push_back(curr);
                curr = parentStart[curr];
            }
            reverse(pStart.begin(), pStart.end());

            curr = parentTarget[intersectNode];
            while (curr != -1) {
                pTarget.push_back(curr);
                curr = parentTarget[curr];
            }

            pathVec = pStart;
            for (int node : pTarget) {
                pathVec.push_back(node);
            }
        }
    }

    auto end = chrono::high_resolution_clock::now();
    double duration = chrono::duration<double, milli>(end - start).count();

    for (size_t i = 0; i < pathVec.size(); i++) {
        path.set(i, pathVec[i]);
    }

    result.set("path", path);
    result.set("timeMs", duration);
    result.set("nodesVisited", nodesVisited);

    return result;
}

EMSCRIPTEN_BINDINGS(connectome) {
    emscripten::function("loadData", &loadData);
    emscripten::function("runBFS", &runBFS);
}
