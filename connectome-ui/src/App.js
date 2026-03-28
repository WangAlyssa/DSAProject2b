import { useState, useEffect } from "react";

function App() {
    // this stores what the user types
    const [sourceNode, setSourceNode] = useState("");
    const [targetNode, setTargetNode] = useState("");

    // this stores the results shown on screen
    const [bfsTime, setBfsTime] = useState("--");
    const [bfsNodes, setBfsNodes] = useState("--");
    const [biBfsTime, setBiBfsTime] = useState("--");
    const [biBfsNodes, setBiBfsNodes] = useState("--");
    const [path, setPath] = useState("No path yet");

    useEffect(() => {
        // load backend script only once
        if (window.Module && window.Module.runBFS) {
            console.log("Backend already loaded");
            return;
        }

        if (document.querySelector('script[src="/connectome.js"]')) {
            return;
        }

        const script = document.createElement("script");
        script.src = "/connectome.js";
        script.async = true;
        document.body.appendChild(script);

        script.onload = () => {
            if (window.Module) {
                window.Module.onRuntimeInitialized = () => {
                    console.log("Backend loaded");

                    const success = window.Module.loadData("twitter_combined.txt");

                    if (success) {
                        console.log("Data loaded successfully!");
                    } else {
                        console.log("Data failed to load");
                    }
                };
            } else {
                console.log("Module not found");
            }
        };
    }, []);

    // this runs when the button is clicked
    function handleRunSearch() {
        if (sourceNode === "" || targetNode === "") {
            alert("Please enter both node IDs.");
            return;
        }

        if (!window.Module || !window.Module.runBFS) {
            alert("Backend not ready yet.");
            return;
        }

        // convert inputs to numbers
        const sourceId = parseInt(sourceNode);
        const targetId = parseInt(targetNode);

        // run standard BFS
        const bfsResult = window.Module.runBFS(sourceId, targetId, "bfs");

        // run bidirectional BFS
        const biResult = window.Module.runBFS(sourceId, targetId, "bidirectional");

        // update UI with real data
        if (bfsResult && biResult) {
            setBfsTime(bfsResult.timeMs);
            setBfsNodes(bfsResult.nodesVisited);

            setBiBfsTime(biResult.timeMs);
            setBiBfsNodes(biResult.nodesVisited);

            // convert path array to string
            if (bfsResult.path && bfsResult.path.length > 0) {
                setPath(bfsResult.path.join(" → "));
            } else {
                setPath("No path found");
            }
        } else {
            alert("No results returned.");
        }
    }

    return (
        <div style={styles.page}>
            {/* title */}
            <h1 style={styles.title}>Connectome Dashboard</h1>
            <p style={styles.subtitle}>
                Compare Standard BFS vs Bidirectional BFS
            </p>

            {/* input section */}
            <div style={styles.inputBox}>
                <input
                    type="text"
                    placeholder="Source Node ID"
                    value={sourceNode}
                    onChange={(event) => setSourceNode(event.target.value)}
                    style={styles.input}
                />

                <input
                    type="text"
                    placeholder="Target Node ID"
                    value={targetNode}
                    onChange={(event) => setTargetNode(event.target.value)}
                    style={styles.input}
                />

                <button style={styles.button} onClick={handleRunSearch}>
                    Run Search
                </button>
            </div>

            {/* result cards */}
            <div style={styles.cardRow}>
                {/* BFS card */}
                <div style={styles.card}>
                    <h2 style={styles.cardTitle}>Standard BFS</h2>
                    <p>Execution Time: {bfsTime} ms</p>
                    <p>Nodes Explored: {bfsNodes}</p>
                </div>

                {/* Bi-BFS card */}
                <div style={styles.card}>
                    <h2 style={styles.cardTitle}>Bidirectional BFS</h2>
                    <p>Execution Time: {biBfsTime} ms</p>
                    <p>Nodes Explored: {biBfsNodes}</p>
                </div>
            </div>

            {/* path section */}
            <div style={styles.pathCard}>
                <h2 style={styles.cardTitle}>Shortest Path</h2>
                <p>{path}</p>
            </div>
        </div>
    );
}

/* this controls how everything looks */
const styles = {
    page: {
        minHeight: "100vh",
        backgroundColor: "#f6f8fc",
        padding: "40px",
        fontFamily: "'Trebuchet MS', 'Segoe UI', sans-serif",
    },

    title: {
        textAlign: "center",
        color: "#1e2a3a",
        marginBottom: "10px",
    },

    subtitle: {
        textAlign: "center",
        marginBottom: "30px",
        color: "#5f6c85",
    },

    inputBox: {
        display: "flex",
        justifyContent: "center",
        gap: "10px",
        marginBottom: "30px",
        flexWrap: "wrap",
    },

    input: {
        padding: "12px",
        borderRadius: "10px",
        border: "1px solid #ccc",
        width: "200px",
        fontSize: "15px",
    },

    button: {
        padding: "12px 18px",
        borderRadius: "10px",
        border: "none",
        backgroundColor: "#4c7cff",
        color: "white",
        cursor: "pointer",
        fontSize: "15px",
    },

    cardRow: {
        display: "flex",
        gap: "20px",
        justifyContent: "center",
        flexWrap: "wrap",
    },

    card: {
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "15px",
        width: "280px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
    },

    cardTitle: {
        marginTop: 0,
        color: "#1e2a3a",
    },

    pathCard: {
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "15px",
        marginTop: "20px",
        maxWidth: "600px",
        marginLeft: "auto",
        marginRight: "auto",
        boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
    },
};

export default App;