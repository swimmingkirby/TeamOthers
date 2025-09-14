# Product Requirements Document (PRD)

## 1. Overview

Build a Vite-based React website using only [shadcn](https://ui.shadcn.com/) components (with the [tweakcn](https://tweakcn.com/r/themes/cmfjeh9rj000604jxazv03ytg) theme). The site will present a sequential, scroll-driven narrative with animated Plotly visualizations (from Python/Jupyter) and supporting text. All icons will use [Lucide React](https://lucide.dev/), and images will be sourced from [Unsplash](https://unsplash.com/). Animations will use [Framer Motion](https://www.framer.com/motion/).

## 1.1. Theme Installation

To apply the custom theme, run:

```sh
npx shadcn@latest add https://tweakcn.com/r/themes/cmfjeh9rj000604jxazv03ytg
```

This will install the tweakcn theme for shadcn components.

## 2. Colour Scheme

- **Dark Navy** `#1B2744`: headers, nav, key text, lines
- **Muted Teal** `#5A8C89`: bars, highlights, secondary accents
- **Soft Yellow-Green** `#D6D890`: annotation backgrounds, highlights
- **White** `#FFFFFF`: main background
- **Dark Grey/Navy** `#2B2B2B` or `#1B2744`: body text
- **Supporting Accents** (for charts/multi-series):
  - Muted Mustard `#C6A85B`
  - Dusty Coral `#C97B6A`
  - Soft Olive `#A7A77D`
  - Clay Taupe `#8B7765`
  - Dusty Lavender `#8C7FA7`

## 3. Website Structure

- **Top-to-bottom, scroll-driven layout**
- Each section contains:
  - A Plotly visualization (animated in with fade-up effect)
  - Supporting text explaining the visualization
  - Optional: Lucide icon, Unsplash image

---

## 3.1. Detailed Site Structure & Sections

### 🌍 Global Site Setup

- Single-page scrolling site with anchored navigation.

### 🔝 Navigation Bar

- Fixed at top, dark navy background.
- Left: “NPK Impact Explorer” (serif, white).
- Right: links → Home | UK Winter Barley | Asia | Africa | Global | Future | References.

### 🏠 Hero Section

- Large serif title + subtitle.
- Short one-line explainer.
- CTA: “Scroll to Explore ↓”.

### 📊 Two-Decade Analysis (Intro)

- Title: “1990–2000 vs 2010–2020”.
- Text block describing differences between the decades.

### 👥 Team Section

- Title: “Meet Team Others”.
- Grid of member cards (photo + name + role).
- Mission statement underneath.

### 🌾 UK Winter Barley Section

- Intro text about UK case study.
- Visual 1: Fertiliser usage over time.
- Visual 2: Grain vs straw yields over time.
- Visual 3: Weather (rainfall/temp) over time.
- Visual 4: Insect populations over time.
- Visual 5: Comparisons across decades (fertiliser efficiency, yield stability, etc).

### 🌱 Fertiliser Usage Section

- Visualisation comparing average fertiliser inputs between decades.
- Comparison of nutrient uptake (grain vs straw).

### ☀ Weather Section

- Visualisation showing rainfall & temperature patterns across decades.
- Comparison highlighting anomalies (e.g. droughts).

### 🐞 Insect Populations Section

- Visualisation showing insect counts across decades.
- Comparison of changes in pressure (e.g. aphids, pollinators).

### 🔗 Relationships Section

- Visualisations showing relationships between datasets (e.g. fertiliser vs yield, weather vs insects).
- Integrated “dashboard-style” comparison of multiple factors.

### ⚖ Decade Comparison Tool

- Interactive element where users can select two decades.
- Output: side-by-side averages for fertiliser use, yields, weather, insects.

### 🌾 Asia Section (Rice Case Study)

- Text summary.
- At least one visualisation showing change over time and comparison across decades.

### 🌽 Africa Section (Maize Case Study)

- Text summary.
- At least one visualisation showing change over time and comparison across decades.

### 🌍 Global Implications Section

- Text with highlights: 1990s legacy vs 2010s transformation.
- Muted highlight boxes for key insights.

### 🔮 Future Pathways Section

- Four flat-style cards: Precision & Integration | Climate-Constrained | Smart Intensification | Circular Systems.

### 📌 Synthesis Section

- Short text summary of key findings.
- One visualisation comparing averages across decades.

### 📚 References Section

- Collapsible reference list.
- Footer with data source + team credit.

## 4. Components & Libraries

- **UI**: shadcn (tweakcn theme)
- **Charts**: Plotly.js ([docs](https://plotly.com/javascript/))
- **Animations**: Framer Motion (no other animation libs)
- **Icons**: Lucide React
- **Images**: Unsplash
- **Build Tool**: Vite ([docs](https://vite.dev/guide/))


## 5. Plotly Integration Workflow

### From Jupyter Notebook (Python) to React

You can use two approaches for Plotly visualizations:

#### A. JSON Export (for direct React integration)
1. **Create Plotly Figure in Python**  
   In Jupyter, create your figure:
   ```python
   import plotly.io as pio
   fig = ...  # your plotly figure
   pio.write_json(fig, 'my_figure.json')
   ```
2. **Export as JSON**  
   Save the figure as a `.json` file.
3. **Import JSON in React**  
   Place the JSON file in your `public/` or `src/assets/` directory.
4. **Render in React with Plotly.js**  
   Use [react-plotly.js](https://github.com/plotly/react-plotly.js) or load Plotly.js directly:
   ```jsx
   // Example using react-plotly.js
   import Plot from 'react-plotly.js';
   import figData from './assets/my_figure.json';

   <Plot data={figData.data} layout={figData.layout} config={figData.config} />
   ```
5. **Apply Colour Scheme**  
   - In Python, set the figure’s colors to match your palette.
   - Or, override colors in the imported JSON/layout in React.

#### B. HTML Export (for interactive embeds)
1. **Export Plotly Figure as HTML**  
   In Jupyter, export your figure as an interactive HTML file:
   ```python
   fig.write_html('my_figure.html')
   ```
2. **Place HTML Files in Website Folder**  
   Create a folder (e.g. `website/plotly_html/`) and put all Plotly HTML exports inside it.
3. **Import and Embed HTML in React**  
   Use an `<iframe>` or a React component to embed the HTML file:
   ```jsx
   <iframe src={require('./plotly_html/my_figure.html')} title="Plotly Chart" style={{width: '100%', height: 500, border: 'none'}} />
   ```
   Or, copy the HTML content and render it using `dangerouslySetInnerHTML` if needed.

> **Note:** The HTML export preserves all Plotly interactivity. Use this method for complex or highly interactive charts that are easier to export as HTML than JSON.

## 6. Animation Requirements

- All visualizations and supporting text must animate in (fade up) as the user scrolls.
- Use Framer Motion for all animations.

## 7. Accessibility & Responsiveness

- All components must be accessible and responsive.
- Use shadcn’s accessibility features.

## 8. Documentation & References

- [Plotly.js docs](https://plotly.com/javascript/)
- [Vite guide](https://vite.dev/guide/)
- [shadcn](https://ui.shadcn.com/)
- [Lucide React](https://lucide.dev/)
- [Framer Motion](https://www.framer.com/motion/)
- [Unsplash](https://unsplash.com/)

---

**Next Steps:**  
- Confirm the section breakdown and content based on the PDF.
- Decide on the initial set of visualizations and their supporting text.
- Set up the Vite + React + shadcn + tweakcn + Plotly + Framer Motion stack.

Let me know if you want to expand on any section or need implementation details for any part!
