# NeuroSpring: Real-Time Cognitive Load Optimizer

![NeuroSpring App Screenshot](https://storage.googleapis.com/aistudio-hosting/workspace-storage/e99a224a-f350-466f-87d4-0322d9c0245a/preview.png)

**NeuroSpring** is a sleek, modern web dashboard that simulates real-time cognitive state analysis from EEG data. It provides live metrics, dynamic charts, and personalized AI-driven recommendations to help users optimize their focus, manage cognitive load, and enhance overall productivity and learning.

---

<details>
<summary><h2>✨ Core Features</h2></summary>

-   **🧠 Real-Time Simulation**: Experience a live simulation of cognitive data processing. Key metrics like **Focus Score** and **Cognitive Load** are generated and updated every second, mimicking a continuous data stream from a brain-computer interface.

-   **📈 Dynamic Visualization**: A responsive, real-time chart visualizes cognitive trends, allowing users to track their mental state over time. The chart smoothly updates, providing immediate visual feedback on performance.

-   **🚦 Cognitive State Analysis**: The system classifies the user's current mental state into one of four categories: **High Focus**, **Moderate Focus**, **Fatigue**, or **Stress**. Each state is assigned a distinct color code for immediate, at-a-glance recognition.

-   **💡 AI-Powered Interventions**: Get personalized, actionable suggestions based on your current cognitive state. Whether you need to take a break, hydrate, or perform a mindfulness exercise, NeuroSpring provides timely guidance to help you get back on track.

-   **🚀 On-Demand Suggestions**: A "New Suggestion" button allows you to manually request a new, contextually relevant intervention. The system intelligently avoids recently shown suggestions and highlights manually triggered ones for clarity.

-   **🔍 Explainable AI (XAI)**: Understand *why* the model makes its classifications. The XAI card breaks down the impact of different neural features (e.g., EEG band powers) on the current cognitive state prediction, fostering trust and transparency.

-   **📊 EEG Band Power Monitoring**: See a clear breakdown of EEG frequency bands (Delta, Theta, Alpha, Beta, Gamma) with proportional bar charts, offering a deeper look into the underlying brainwave activity associated with your mental state.

-   **📋 Session Summary**: After stopping the simulation, receive a comprehensive summary of your session. This includes total duration, average metrics, and a visual distribution of the time spent in each cognitive state, perfect for post-session review.

</details>

---

<details>
<summary><h2>🏗️ Architecture & Technical Stack</h2></summary>

### Technical Stack

-   **Framework**: **React** with **TypeScript** for robust, type-safe, and scalable component-based architecture.
-   **Styling**: **Tailwind CSS** for a utility-first, responsive, and modern design system that allows for rapid UI development.
-   **Visualization**: **Recharts** for creating beautiful, interactive, and real-time data visualizations.
-   **State Management**: Relies on React's built-in hooks (`useState`, `useEffect`, `useCallback`, `useRef`) for efficient and localized state management.

### Architectural Overview

NeuroSpring is a client-side single-page application (SPA) with a clean, unidirectional data flow. This simple yet powerful architecture ensures predictability and ease of maintenance.

```
+---------------------------------+
|   useCognitiveDataSimulator   |
|         (Custom Hook)         |
|---------------------------------|
| - Generates new data points   |
| - Manages data history        |
| - Controls simulation state   |
+-----------------^---------------+
                  |
        (State: latestData, history)
                  |
+-----------------v---------------+
|          Dashboard.tsx          |
|       (Orchestrator)            |
|---------------------------------|
| - Manages overall layout        |
| - Handles user interactions     |
| - Distributes data to children  |
+-----------------v---------------+
                  |
      (Props are passed down to...)
                  |
+-----------------v---------------+
|        Presentational           |
|          Components             |
| - RealTimeChart.tsx             |
| - CognitiveMetricsCard.tsx      |
| - InterventionsCard.tsx         |
| - ... and others                |
+---------------------------------+
```

The core logic is encapsulated within the `useCognitiveDataSimulator` custom hook. This hook acts as the single source of truth for the cognitive data, abstracting away the complexities of data generation and history management. The `Dashboard` component consumes this hook and passes the data down as props to its children, which are purely presentational components responsible for rendering specific parts of the UI.

</details>

---

<details>
<summary><h2>🧩 Component Breakdown</h2></summary>

The UI is modularized into several specialized components, each with a single responsibility.

-   **`App.tsx`**: The root component. It sets up the main application layout, including the `Header`, and renders the `Dashboard`.

-   **`Header.tsx`**: A simple, static header component displaying the application title and icon.

-   **`Dashboard.tsx`**: The central hub of the application.
    -   **Responsibility**: Orchestrates the entire UI. It initializes the `useCognitiveDataSimulator` hook, manages the simulation state (start/stop), handles user actions like requesting new interventions, and renders all other main components.
    -   **Key State**: `isRunning`, `latestData`, `history`, `sessionSummaryData`, `manualInterventions`.

-   **`RealTimeChart.tsx`**:
    -   **Responsibility**: Displays the live line chart of Focus Score and Cognitive Load over time.
    -   **Props**: `data: CognitiveData[]` (The historical data to plot).

-   **`CognitiveMetricsCard.tsx`**:
    -   **Responsibility**: A key information card showing the current cognitive state, core metrics (Focus, Load, Confidence) with progress bars, and the detailed EEG band power breakdown. It also contains the "New Suggestion" button.
    -   **Props**: `data: CognitiveData | null`, `onRequestNewIntervention: () => void`.

-   **`InterventionsCard.tsx`**:
    -   **Responsibility**: Lists the AI-driven and manually requested suggestions. It dynamically styles manually triggered interventions to distinguish them.
    -   **Props**: `data: CognitiveData | null`, `manualInterventions: string[]`.

-   **`ModelExplanationCard.tsx`**:
    -   **Responsibility**: Provides the XAI insights, showing the model's summary and the impact of each feature on the current prediction.
    -   **Props**: `data: CognitiveData | null`.

-   **`SessionSummaryCard.tsx`**:
    -   **Responsibility**: Appears only after a session is stopped. It calculates and displays aggregate statistics like session duration, average scores, and a distribution chart of time spent in each cognitive state.
    -   **Props**: `history: CognitiveData[]`.

</details>

---

<details>
<summary><h2>🚀 How to Use the App</h2></summary>

1.  **Start the Simulation**: On the welcome screen, click the **"Start Simulation"** button to begin the real-time data feed.
2.  **Observe Real-Time Data**:
    -   Watch the **Real-Time Cognitive Trends** chart update every second.
    -   Monitor the **Cognitive Metrics** card to see your current focus, cognitive load, and the classified cognitive state.
    -   Check the **EEG Frequency Bands** section for a detailed view of simulated brainwave activity.
3.  **Receive Guidance**:
    -   Keep an eye on the **Personalized Interventions** card for automated suggestions tailored to your current state.
    -   If you want a different suggestion, click the **"New Suggestion"** button. The new, manually requested intervention will appear highlighted at the top of the list.
4.  **Understand the "Why"**: Look at the **AI Model Explanation (XAI)** card to understand which factors are influencing the model's predictions.
5.  **End and Review**:
    -   Click the **"Stop Simulation"** button to pause the data feed.
    -   A **Session Summary** card will appear at the bottom, providing a comprehensive overview of your performance during the session.

</details>

---

<details>
<summary><h2>📁 Project Structure</h2></summary>

The project follows a standard feature-oriented structure, grouping files by their purpose.

```
/
├── components/
│   ├── CognitiveMetricsCard.tsx
│   ├── Dashboard.tsx
│   ├── Header.tsx
│   ├── InterventionsCard.tsx
│   ├── ModelExplanationCard.tsx
│   ├── RealTimeChart.tsx
│   └── SessionSummaryCard.tsx
├── hooks/
│   └── useCognitiveDataSimulator.ts
├── App.tsx
├── constants.ts
├── index.html
├── index.tsx
├── metadata.json
├── README.md
└── types.ts
```

</details>
