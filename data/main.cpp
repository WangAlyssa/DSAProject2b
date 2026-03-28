#include <fstream>
#include <unordered_map>
#include <vector>
#include <string>
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

    result.set("path", path);
    result.set("timeMs", 0.0);
    result.set("nodesVisited", 0);

    return result;
}

EMSCRIPTEN_BINDINGS(connectome) {
    emscripten::function("loadData", &loadData);
    emscripten::function("runBFS", &runBFS);
}