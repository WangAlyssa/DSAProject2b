import { useState } from "react";

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

    // this runs when the button is clicked
    function handleRunSearch() {
        // make sure both boxes have something
        if (sourceNode === "" || targetNode === "") {
            alert("Please enter both node IDs.");
            return;
        }

        // fake results for now
        const fakeBfsTime = Math.floor(Math.random() * 100) + 80;
        const fakeBfsNodes = Math.floor(Math.random() * 4000) + 3000;

        const fakeBiBfsTime = Math.floor(Math.random() * 50) + 20;
        const fakeBiBfsNodes = Math.floor(Math.random() * 2000) + 1000;

        // update the screen
        setBfsTime(fakeBfsTime);
        setBfsNodes(fakeBfsNodes);
        setBiBfsTime(fakeBiBfsTime);
        setBiBfsNodes(fakeBiBfsNodes);

        // fake path using the numbers the user typed
        setPath(sourceNode + " → 45 → 78 → " + targetNode);
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