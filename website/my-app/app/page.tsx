'use client';

import summaryData1990 from "../../plotly-json/1_SummaryPlot_1990.json";
import summaryData2010 from "../../plotly-json/1_SummaryPlot_2010.json";
import fertiliserData90s from '../../plotly-json/4_FertiliserUse_90s.json';
import fertiliserData10s from '../../plotly-json/4_FertiliserUse_10s.json';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Button } from "../components/ui/button";
import { Separator } from "../components/ui/separator";
import { motion } from "framer-motion";
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { ArrowDown, BarChart3, Users, Globe } from "lucide-react";

export default function Home() {
  const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="min-h-screen bg-background pt-16">
      {/* Hero Section */}
      <section
        id="home"
        className="flex flex-col items-center justify-center min-h-screen px-4 text-center bg-gradient-to-b from-background to-muted/20"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <h1 className="font-serif text-5xl md:text-7xl font-bold text-primary mb-4">
            NPK Impact Explorer
          </h1>
          <h2 className="text-2xl md:text-3xl text-secondary mb-6">
            Understanding Fertilizer&apos;s Role in Agricultural Transformation
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto text-center">
            Explore two decades of data across UK, Asia, and Africa to understand how
            NPK fertilizers have shaped global agriculture.
          </p>
          <Button size="lg" className="gap-2" onClick={() => scrollToSection('two-decade')}>
            <ArrowDown className="w-4 h-4" />
            Scroll to Explore
          </Button>
        </motion.div>
      </section>

      {/* Two Decade Analysis Section */}
      <motion.section
        id="two-decade"
        className="min-h-screen flex flex-col items-center justify-center px-4 py-16"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="max-w-6xl mx-auto w-full space-y-8">
          <div className="text-center space-y-4">
            <Badge variant="secondary" className="mb-4 text-lg px-4 py-2">
              <BarChart3 className="w-5 h-5 mr-2" />
              Historical Analysis
            </Badge>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary">
              1990–2000 vs 2010–2020
            </h2>
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto">
              This section compares agricultural data from the 1990s and 2010s, highlighting key changes in fertilizer usage, yields, weather patterns, and insect populations across different regions.
            </p>
          </div>
          <Card className="w-full border-0">
            <CardContent className="p-0">
              <div className="viz-container-primary" style={{ height: '600px' }}>
                <div className="viz-inner-wrapper" style={{ height: '600px' }}>
                  <Plot
                    data={summaryData1990.data as any}
                    layout={{
                      ...summaryData1990.layout,
                      margin: { t: 80, r: 40, b: 80, l: 80 },
                      paper_bgcolor: 'rgba(0,0,0,0)',
                      plot_bgcolor: 'rgba(0,0,0,0)',
                      height: 550
                    } as any}
                    config={{ responsive: true, displayModeBar: false }}
                    style={{ width: '100%', height: '100%' }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Analysis below chart */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <Card className="border-2 border-primary bg-primary text-primary-foreground">
              <CardHeader className="pb-2">
                <CardTitle className="font-serif text-primary-foreground flex items-center gap-2">
                  ⚠️ 1995-1996 Drought Impact
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-primary-foreground text-sm">Despite high fertiliser inputs (130+ kg N/ha), yields dropped significantly due to water stress. This demonstrates the critical role of weather in nutrient uptake efficiency.</p>
              </CardContent>
            </Card>

            <Card className="border-2 border-secondary bg-secondary text-secondary-foreground">
              <CardHeader className="pb-2">
                <CardTitle className="font-serif text-secondary-foreground flex items-center gap-2">
                  ⭐ 2010s Stability
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-secondary-foreground text-sm">More consistent rainfall patterns and improved water management led to stable, high yields even with reduced fertiliser inputs, showing the benefits of precision agriculture.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.section>

      {/* Team Section */}
      <motion.section
        id="team"
        className="py-16 px-4 bg-muted/30"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Badge variant="outline" className="text-lg px-4 py-2 mb-4">
              <Users className="w-5 h-5 mr-2" />
              Our Team
            </Badge>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-6">
              Meet Team Others
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A diverse group of researchers and data scientists passionate about understanding agricultural transformation through data.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Team Member 1 - Hamza */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <Avatar className="w-32 h-32 mx-auto mb-4">
                    <AvatarImage src="/img/hamza.jpg" alt="Hamza Wahbi" />
                    <AvatarFallback>HW</AvatarFallback>
                  </Avatar>
                  <h3 className="font-serif text-xl font-semibold mb-2">Hamza Wahbi</h3>
                  <p className="text-muted-foreground mb-4">Data Scientist & Research Lead</p>
                  <Button variant="outline" size="sm" asChild>
                    <a href="https://www.linkedin.com/in/hamzawahbi/" target="_blank" rel="noopener noreferrer">
                      LinkedIn Profile
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Team Member 2 - Furkan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <Avatar className="w-32 h-32 mx-auto mb-4">
                    <AvatarImage src="/api/placeholder/128/128" alt="Furkan T" />
                    <AvatarFallback>FT</AvatarFallback>
                  </Avatar>
                  <h3 className="font-serif text-xl font-semibold mb-2">Furkan T</h3>
                  <p className="text-muted-foreground mb-4">Agricultural Systems Analyst</p>
                  <Button variant="outline" size="sm" asChild>
                    <a href="https://www.linkedin.com/in/furkan-t-88926a155/" target="_blank" rel="noopener noreferrer">
                      LinkedIn Profile
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Team Member 3 - Emma */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <Avatar className="w-32 h-32 mx-auto mb-4">
                    <AvatarImage src="/img/emma.jpg" alt="Emma Watts" />
                    <AvatarFallback>EW</AvatarFallback>
                  </Avatar>
                  <h3 className="font-serif text-xl font-semibold mb-2">Emma Watts</h3>
                  <p className="text-muted-foreground mb-4">Environmental Data Specialist</p>
                  <Button variant="outline" size="sm" asChild>
                    <a href="https://www.linkedin.com/in/emma-watts-6a449119b/" target="_blank" rel="noopener noreferrer">
                      LinkedIn Profile
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Team Member 4 - Akram */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <Avatar className="w-32 h-32 mx-auto mb-4">
                    <AvatarImage src="/img/akram.jpg" alt="Akram Atmani" />
                    <AvatarFallback>AA</AvatarFallback>
                  </Avatar>
                  <h3 className="font-serif text-xl font-semibold mb-2">Akram Atmani</h3>
                  <p className="text-muted-foreground mb-4">Statistical Modeling Expert</p>
                  <Button variant="outline" size="sm" asChild>
                    <a href="https://www.linkedin.com/in/akram-atmani/" target="_blank" rel="noopener noreferrer">
                      LinkedIn Profile
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Team Member 5 - Shihan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <Avatar className="w-32 h-32 mx-auto mb-4">
                    <AvatarImage src="/api/placeholder/128/128" alt="Shihan Zhang" />
                    <AvatarFallback>SZ</AvatarFallback>
                  </Avatar>
                  <h3 className="font-serif text-xl font-semibold mb-2">Shihan Zhang</h3>
                  <p className="text-muted-foreground mb-4">Data Visualization Specialist</p>
                  <Button variant="outline" size="sm" asChild>
                    <a href="https://www.linkedin.com/in/shihan-zhang-a2749b219/" target="_blank" rel="noopener noreferrer">
                      LinkedIn Profile
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Team Member 6 - Isabella */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <Avatar className="w-32 h-32 mx-auto mb-4">
                    <AvatarImage src="/img/Isabella.jpg" alt="Isabella" />
                    <AvatarFallback>IB</AvatarFallback>
                  </Avatar>
                  <h3 className="font-serif text-xl font-semibold mb-2">Isabella</h3>
                  <p className="text-muted-foreground mb-4">Research Assistant</p>
                  <Button variant="outline" size="sm" disabled>
                    LinkedIn Coming Soon
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* UK Winter Barley Section */}
      <motion.section
        id="uk-winter-barley"
        className="min-h-screen flex flex-col items-center justify-center px-4 py-16"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="max-w-6xl mx-auto w-full space-y-8">
          <motion.div
            className="text-center space-y-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Badge variant="secondary" className="text-lg px-4 py-2">UK Case Study</Badge>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary">
              UK Winter Barley
            </h2>
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto">
              This case study examines the impact of NPK fertilizers on UK winter barley production over two decades, including trends in fertilizer usage, yields, weather conditions, and insect populations.
            </p>
          </motion.div>

          <div className="grid gap-8">
            {/* Fertiliser Usage Chart */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Card className="border-0">
                <CardHeader className="pb-2">
                  <CardTitle className="font-serif">Fertiliser Usage Over Time</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="viz-container-secondary" style={{ height: '500px' }}>
                    <div className="viz-inner-wrapper" style={{ height: '500px' }}>
                      <Plot
                        data={fertiliserData90s.data as any}
                        layout={{
                          ...fertiliserData90s.layout,
                          margin: { t: 80, r: 40, b: 80, l: 80 },
                          paper_bgcolor: 'rgba(0,0,0,0)',
                          plot_bgcolor: 'rgba(0,0,0,0)',
                          height: 450
                        } as any}
                        config={{ responsive: true, displayModeBar: false }}
                        style={{ width: '100%', height: '100%' }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Fertiliser insights below chart */}
              <div className="mt-6">
                <Card className="border-2 border-secondary bg-secondary text-secondary-foreground">
                  <CardHeader className="pb-2">
                    <CardTitle className="font-serif text-secondary-foreground">Fertiliser Insights</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-secondary-foreground text-sm">Fertiliser usage increased by 50% from 1990s to 2010s, indicating intensification of agricultural practices in UK winter barley production.</p>
                  </CardContent>
                </Card>
              </div>
            </motion.div>

            {/* Correlation Analysis Chart */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Card className="border-0">
                <CardHeader className="pb-2">
                  <CardTitle className="font-serif">Correlation: Grain/Straw vs Insect Species</CardTitle>
                  <p className="text-muted-foreground text-sm">
                    Analysis of correlations between grain and straw production with insect species populations across two decades
                  </p>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="w-full flex justify-center">
                    <Image 
                      src="/img/correlation-grain-straw-insect.png" 
                      alt="Correlation heatmap showing relationships between grain/straw production and insect species populations comparing 1990-2000 vs 2010-2020"
                      width={800}
                      height={400}
                      className="max-w-full h-auto rounded-lg shadow-lg"
                      style={{ maxHeight: '600px' }}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Correlation insights below chart */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-2 border-primary bg-primary text-primary-foreground">
                  <CardHeader className="pb-2">
                    <CardTitle className="font-serif text-primary-foreground">1990-2000 Patterns</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-primary-foreground text-sm">
                      Strong positive correlations (0.29-0.38) between grain production and insect populations, indicating a more balanced ecosystem with higher biodiversity supporting agricultural productivity.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-secondary bg-secondary text-secondary-foreground">
                  <CardHeader className="pb-2">
                    <CardTitle className="font-serif text-secondary-foreground">2010-2020 Shift</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-secondary-foreground text-sm">
                      Negative correlations (-0.12 to -0.30) suggest intensified farming practices may have disrupted natural insect-crop relationships, highlighting the need for sustainable agriculture approaches.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </motion.div>

            {/* Strip 8 Decade Comparison */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Card className="border-0">
                <CardHeader className="pb-2">
                  <CardTitle className="font-serif">Strip 8 Analysis: Two Decade Comparison</CardTitle>
                  <p className="text-muted-foreground text-sm">
                    Detailed comparison of agricultural metrics and weather patterns for Strip 8 across 1990-2000 vs 2010-2020
                  </p>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="w-full flex justify-center">
                    <Image 
                      src="/img/strip8-decade-comparison.png" 
                      alt="Box plot comparison showing grain yield, straw yield, summer rainfall, and summer temperature for Strip 8 comparing 1990-2000 vs 2010-2020 periods"
                      width={1000}
                      height={400}
                      className="max-w-full h-auto rounded-lg shadow-lg"
                      style={{ maxHeight: '500px' }}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Strip 8 insights below chart */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-2 border-primary bg-primary text-primary-foreground">
                  <CardHeader className="pb-2">
                    <CardTitle className="font-serif text-primary-foreground">📈 Yield Improvements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-primary-foreground text-sm">
                      Grain yields remained stable around 6 tonnes/ha in the 1990s but became more consistent in the 2010s (5.7 tonnes/ha), while straw yields showed similar patterns with reduced variability in recent decades.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-secondary bg-secondary text-secondary-foreground">
                  <CardHeader className="pb-2">
                    <CardTitle className="font-serif text-secondary-foreground">🌦️ Climate Patterns</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-secondary-foreground text-sm">
                      Summer rainfall decreased significantly from ~200mm in the 1990s to ~175mm in the 2010s, while summer temperatures remained stable around 16.5°C, indicating adaptation to drier conditions.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </motion.div>

            {/* Weather Patterns Chart */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Card className="border-0">
                <CardHeader className="pb-2">
                  <CardTitle className="font-serif">Weather Patterns</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="viz-container-primary" style={{ height: '500px' }}>
                    <div className="viz-inner-wrapper" style={{ height: '500px' }}>
                      <Plot
                        data={summaryData2010.data as any}
                        layout={{
                          ...summaryData2010.layout,
                          margin: { t: 80, r: 40, b: 80, l: 80 },
                          paper_bgcolor: 'rgba(0,0,0,0)',
                          plot_bgcolor: 'rgba(0,0,0,0)',
                          height: 450
                        } as any}
                        config={{ responsive: true, displayModeBar: false }}
                        style={{ width: '100%', height: '100%' }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Climate insights below chart */}
              <div className="mt-6">
                <Card className="border-2 border-primary bg-primary text-primary-foreground">
                  <CardHeader className="pb-2">
                    <CardTitle className="font-serif text-primary-foreground">Climate Impact</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-primary-foreground text-sm">Weather variability has increased significantly, with rainfall and temperature patterns showing greater year-to-year variation affecting crop yields.</p>
                  </CardContent>
                </Card>
              </div>
            </motion.div>

            {/* Insect Populations Chart */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <Card className="border-0">
                <CardHeader className="pb-2">
                  <CardTitle className="font-serif">Yearly Abundance of Aphid Species (1990-2020)</CardTitle>
                  <p className="text-muted-foreground text-sm">
                    Long-term monitoring of key aphid species showing population dynamics over three decades
                  </p>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="w-full flex justify-center">
                    <Image 
                      src="/img/yearly-aphid-abundance.png" 
                      alt="Bar chart showing yearly abundance of three aphid species - Metopolophium dirhodum (Rose-grain aphid), Rhopalosiphum padi (Bird cherry-oat aphid), and Sitobion avenae (English grain aphid) from 1990 to 2020"
                      width={1200}
                      height={500}
                      className="max-w-full h-auto rounded-lg shadow-lg"
                      style={{ maxHeight: '600px' }}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Ecosystem insights below chart */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-2 border-accent bg-accent text-accent-foreground">
                  <CardHeader className="pb-2">
                    <CardTitle className="font-serif text-accent-foreground">🐛 Population Peaks</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-accent-foreground text-sm">English grain aphid (Sitobion avenae) showed dramatic population spikes in 1996 (&gt;12,000) and 2011 (~6,000), indicating climate-driven outbreak years with potential crop damage.</p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-secondary bg-secondary text-secondary-foreground">
                  <CardHeader className="pb-2">
                    <CardTitle className="font-serif text-secondary-foreground">📉 Recent Decline</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-secondary-foreground text-sm">Overall aphid populations have declined significantly since 2014, with most recent years showing very low abundance across all species, potentially impacting natural pest control and pollination services.</p>
                  </CardContent>
                </Card>
              </div>
            </motion.div>

            <Card className="border-0">
              <CardHeader className="pb-2">
                <CardTitle className="font-serif">Decade Comparisons</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="viz-container-accent flex items-center justify-center bg-muted/20" style={{ height: '400px' }}>
                  <p className="text-muted-foreground">Comparison Chart Placeholder</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.section>

      {/* Fertiliser Usage Section */}
      <motion.section
        id="fertiliser-usage"
        className="min-h-screen flex flex-col items-center justify-center px-4 py-16 bg-muted/10"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="max-w-6xl mx-auto w-full space-y-8">
          <div className="text-center space-y-4">
            <Badge variant="secondary" className="text-lg px-4 py-2">Usage Analysis</Badge>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary">
              Fertiliser Usage
            </h2>
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto">
              This visualization compares average fertilizer inputs with nutrient uptake between the 1990s and 2010s, highlighting efficiency improvements.
            </p>
          </div>
          <Card className="border-0">
            <CardContent className="p-0">
              <div className="viz-container-accent" style={{ height: '600px' }}>
                <div className="viz-inner-wrapper" style={{ height: '600px' }}>
                  <Plot
                    data={summaryData2010.data as any}
                    layout={{
                      ...summaryData2010.layout,
                      margin: { t: 80, r: 40, b: 80, l: 80 },
                      paper_bgcolor: 'rgba(0,0,0,0)',
                      plot_bgcolor: 'rgba(0,0,0,0)',
                      height: 550
                    } as any}
                    config={{ responsive: true, displayModeBar: false }}
                    style={{ width: '100%', height: '100%' }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Analysis below chart */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <Card className="border-2 border-accent bg-accent text-accent-foreground">
              <CardHeader className="pb-2">
                <CardTitle className="font-serif text-accent-foreground">Efficiency Gains</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-accent-foreground text-sm">Fertilizer usage increased by 50% while yields improved by 30%, indicating better efficiency in the 2010s through precision agriculture techniques.</p>
              </CardContent>
            </Card>

            <Card className="border-2 border-primary bg-primary text-primary-foreground">
              <CardHeader className="pb-2">
                <CardTitle className="font-serif text-primary-foreground">Nutrient Optimization</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-primary-foreground text-sm">Modern fertilizer application methods show improved nutrient uptake efficiency, reducing environmental impact while maintaining productivity.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.section>

      {/* Global Implications Section */}
      <motion.section
        id="global-implications"
        className="min-h-screen flex flex-col items-center justify-center px-4 py-16"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="max-w-6xl mx-auto w-full space-y-8">
          <div className="text-center space-y-4">
            <Badge variant="secondary" className="text-lg px-4 py-2">
              <Globe className="w-5 h-5 mr-2" />
              Global Impact
            </Badge>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary">
              Global Implications
            </h2>
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto">
              The 1990s laid the foundation for modern agriculture, but the 2010s brought transformative changes in fertilizer efficiency and sustainability.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-0 bg-accent">
              <CardHeader>
                <CardTitle className="font-serif text-primary">Key Insight 1</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-primary">Fertilizer usage increased by 50% while yields improved by 30%, indicating better efficiency in the 2010s.</p>
              </CardContent>
            </Card>
            <Card className="border-0 bg-secondary">
              <CardHeader>
                <CardTitle className="font-serif text-primary-foreground">Key Insight 2</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-primary-foreground">Weather variability has greater impact on yields in recent decades, highlighting the need for climate-resilient practices.</p>
              </CardContent>
            </Card>
            <Card className="border-0 bg-primary">
              <CardHeader>
                <CardTitle className="font-serif text-primary-foreground">Key Insight 3</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-primary-foreground">Insect populations have declined, potentially affecting pollination and pest control in agricultural systems.</p>
              </CardContent>
            </Card>
            <Card className="border-0 bg-accent">
              <CardHeader>
                <CardTitle className="font-serif text-primary">Key Insight 4</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-primary">Global case studies show similar trends, suggesting universal challenges and opportunities in fertilizer management.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.section>

      {/* Asia Section */}
      <motion.section
        id="asia"
        className="min-h-screen flex flex-col items-center justify-center px-4 py-16 bg-muted/10"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="max-w-6xl mx-auto w-full space-y-8">
          <div
            className="text-center space-y-4"
          >
            <Badge variant="secondary" className="text-lg px-4 py-2">Asia Case Study</Badge>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary">
              Asia (Rice Case Study)
            </h2>
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto">
              This case study examines rice production in Asia, showing changes in yield over time and comparisons across decades.
            </p>
          </div>
          <Card className="border-0">
            <CardContent className="p-0">
              <div className="viz-container-primary" style={{ height: '600px' }}>
                <div className="viz-inner-wrapper" style={{ height: '600px' }}>
                  <Plot
                    data={summaryData1990.data as any}
                    layout={{
                      ...summaryData1990.layout,
                      margin: { t: 80, r: 40, b: 80, l: 80 },
                      paper_bgcolor: 'rgba(0,0,0,0)',
                      plot_bgcolor: 'rgba(0,0,0,0)',
                      height: 550
                    } as any}
                    config={{ responsive: true, displayModeBar: false }}
                    style={{ width: '100%', height: '100%' }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Analysis below chart */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <Card className="border-2 border-primary bg-primary text-primary-foreground">
              <CardHeader className="pb-2">
                <CardTitle className="font-serif text-primary-foreground">🌾 Rice Revolution</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-primary-foreground text-sm">Asia's rice production shows steady growth from 1990-2020, with fertilizer optimization playing a crucial role in feeding the world's largest population.</p>
              </CardContent>
            </Card>

            <Card className="border-2 border-secondary bg-secondary text-secondary-foreground">
              <CardHeader className="pb-2">
                <CardTitle className="font-serif text-secondary-foreground">Green Revolution Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-secondary-foreground text-sm">Modern rice varieties combined with balanced NPK fertilization have increased yields while adapting to changing climate conditions.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.section>

      {/* Africa Section */}
      <motion.section
        id="africa"
        className="min-h-screen flex flex-col items-center justify-center px-4 py-16"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="max-w-6xl mx-auto w-full space-y-8">
          <div className="text-center space-y-4">
            <Badge variant="secondary" className="text-lg px-4 py-2">Africa Case Study</Badge>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary">
              Africa (Maize Case Study)
            </h2>
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto">
              This case study examines maize production in Africa, showing changes in yield over time and comparisons across decades.
            </p>
          </div>
          <Card className="border-0">
            <CardContent className="p-0">
              <div className="viz-container-secondary" style={{ height: '600px' }}>
                <div className="viz-inner-wrapper" style={{ height: '600px' }}>
                  <Plot
                    data={summaryData2010.data as any}
                    layout={{
                      ...summaryData2010.layout,
                      margin: { t: 80, r: 40, b: 80, l: 80 },
                      paper_bgcolor: 'rgba(0,0,0,0)',
                      plot_bgcolor: 'rgba(0,0,0,0)',
                      height: 550
                    } as any}
                    config={{ responsive: true, displayModeBar: false }}
                    style={{ width: '100%', height: '100%' }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Analysis below chart */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <Card className="border-2 border-secondary bg-secondary text-secondary-foreground">
              <CardHeader className="pb-2">
                <CardTitle className="font-serif text-secondary-foreground">🌽 Maize Potential</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-secondary-foreground text-sm">Africa's maize production shows significant potential for growth with proper fertilizer management and improved agricultural practices.</p>
              </CardContent>
            </Card>

            <Card className="border-2 border-accent bg-accent text-accent-foreground">
              <CardHeader className="pb-2">
                <CardTitle className="font-serif text-accent-foreground">Food Security Focus</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-accent-foreground text-sm">Strategic NPK fertilization can help address food security challenges while building sustainable agricultural systems across the continent.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.section>

      {/* Future Pathways Section */}
      <motion.section
        id="future"
        className="min-h-screen flex flex-col items-center justify-center px-4 py-16 bg-muted/10"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="max-w-6xl mx-auto w-full space-y-8">
          <div className="text-center space-y-4">
            <Badge variant="secondary" className="text-lg px-4 py-2">Future Vision</Badge>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary">
              Future Pathways
            </h2>
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto">
              Exploring potential future scenarios for agriculture based on current trends and innovations.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-2 border-primary">
              <CardHeader>
                <CardTitle className="font-serif">Precision & Integration</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Advanced technologies for precise nutrient application and integrated farming systems to optimize resource use.</p>
              </CardContent>
            </Card>
            <Card className="border-2 border-secondary">
              <CardHeader>
                <CardTitle className="font-serif">Climate-Constrained</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Adaptation strategies for changing weather patterns, focusing on drought-resistant crops and water management.</p>
              </CardContent>
            </Card>
            <Card className="border-2 border-accent">
              <CardHeader>
                <CardTitle className="font-serif">Smart Intensification</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Sustainable intensification using data-driven approaches to increase productivity without environmental degradation.</p>
              </CardContent>
            </Card>
            <Card className="border-2 border-primary">
              <CardHeader>
                <CardTitle className="font-serif">Circular Systems</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Closed-loop systems that recycle nutrients and minimize waste, promoting long-term soil health and biodiversity.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.section>

      {/* Synthesis Section */}
      <motion.section
        id="synthesis"
        className="min-h-screen flex flex-col items-center justify-center px-4 py-16"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="max-w-6xl mx-auto w-full space-y-8">
          <div className="text-center space-y-4">
            <Badge variant="secondary" className="text-lg px-4 py-2">Final Analysis</Badge>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary">
              Synthesis
            </h2>
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto">
              This section summarizes the key findings from the two-decade analysis, highlighting trends in fertilizer use, yields, and overall efficiency.
            </p>
          </div>
          <Card className="border-0">
            <CardContent className="p-0">
              <div className="viz-container-accent" style={{ height: '600px' }}>
                <div className="viz-inner-wrapper" style={{ height: '600px' }}>
                  <Plot
                    data={fertiliserData90s.data as any}
                    layout={{
                      ...fertiliserData90s.layout,
                      margin: { t: 80, r: 40, b: 80, l: 80 },
                      paper_bgcolor: 'rgba(0,0,0,0)',
                      plot_bgcolor: 'rgba(0,0,0,0)',
                      height: 550
                    } as any}
                    config={{ responsive: true, displayModeBar: false }}
                    style={{ width: '100%', height: '100%' }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Key findings below chart */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <Card className="border-2 border-accent bg-accent text-accent-foreground">
              <CardHeader className="pb-2">
                <CardTitle className="font-serif text-accent-foreground">📈 Efficiency Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-accent-foreground text-sm">The 2010s showed 30% better fertilizer efficiency compared to the 1990s, demonstrating technological advancement and precision agriculture adoption.</p>
              </CardContent>
            </Card>

            <Card className="border-2 border-primary bg-primary text-primary-foreground">
              <CardHeader className="pb-2">
                <CardTitle className="font-serif text-primary-foreground">🌍 Global Patterns</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-primary-foreground text-sm">Consistent patterns across UK, Asia, and Africa show universal benefits of optimized NPK fertilization strategies for sustainable agriculture.</p>
              </CardContent>
            </Card>

            <Card className="border-2 border-secondary bg-secondary text-secondary-foreground">
              <CardHeader className="pb-2">
                <CardTitle className="font-serif text-secondary-foreground">🔮 Future Outlook</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-secondary-foreground text-sm">Data-driven fertilization combined with climate adaptation strategies will be crucial for meeting future food security challenges.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.section>

      {/* References Section */}
      <motion.section
        id="references"
        className="min-h-screen flex flex-col items-center justify-center px-4 py-16 bg-muted/10"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="max-w-6xl mx-auto w-full space-y-8">
          <div className="text-center space-y-4">
            <Badge variant="secondary" className="text-lg px-4 py-2">Documentation</Badge>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary">
              References
            </h2>
          </div>
          <div className="grid gap-6">
            <Card className="border-2 border-primary bg-card">
              <CardHeader>
                <CardTitle className="font-serif text-primary flex items-center gap-2">
                  📊 Agricultural Data Sources
                </CardTitle>
                <CardDescription>
                  Comprehensive datasets used in this analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1" className="border-b border-border">
                    <AccordionTrigger className="text-left font-serif hover:no-underline">
                      UK Agricultural Statistics - DEFRA
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      Department for Environment, Food and Rural Affairs. UK winter barley production data, fertilizer usage statistics, and yield measurements from 1990-2020. Published annually in the Agricultural Statistics bulletin.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-2" className="border-b border-border">
                    <AccordionTrigger className="text-left font-serif hover:no-underline">
                      FAO Global Rice Production Database
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      Food and Agriculture Organization of the United Nations. Rice production statistics for Asian countries, including yield per hectare, fertilizer application rates, and climate data. FAOSTAT database, accessed 2025.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-3" className="border-b border-border">
                    <AccordionTrigger className="text-left font-serif hover:no-underline">
                      African Maize Production Analysis - CGIAR
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      Consultative Group for International Agricultural Research. Comprehensive dataset on maize production across Sub-Saharan Africa, including fertilizer usage patterns and yield variations from 1990-2020.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-4" className="border-b border-border">
                    <AccordionTrigger className="text-left font-serif hover:no-underline">
                      Climate and Weather Data - Met Office
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      UK Met Office Historical Weather Data. Rainfall, temperature, and seasonal variation data used for weather pattern analysis and correlation with agricultural yields.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-5">
                    <AccordionTrigger className="text-left font-serif hover:no-underline">
                      Insect Population Monitoring - BISCIT
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      Biological Impacts of Sustainable Crop Intensification Technologies. Long-term ecological monitoring data on insect populations and biodiversity impacts in agricultural systems across the study regions.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            <Card className="border-2 border-secondary bg-secondary/5">
              <CardHeader>
                <CardTitle className="font-serif text-secondary flex items-center gap-2">
                  🔬 Methodology & Analysis
                </CardTitle>
                <CardDescription>
                  Technical approach and data processing methods
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-serif font-medium text-secondary mb-2">Statistical Analysis</h4>
                  <p className="text-sm text-muted-foreground">
                    Time series analysis using Python pandas and scipy.stats for trend identification and correlation analysis between fertilizer usage, weather patterns, and yield outcomes.
                  </p>
                </div>
                <div>
                  <h4 className="font-serif font-medium text-secondary mb-2">Data Visualization</h4>
                  <p className="text-sm text-muted-foreground">
                    Interactive charts created using Plotly.js and D3.js for comprehensive data exploration and pattern recognition across multiple decades and geographical regions.
                  </p>
                </div>
                <div>
                  <h4 className="font-serif font-medium text-secondary mb-2">Quality Assurance</h4>
                  <p className="text-sm text-muted-foreground">
                    Data validation through cross-referencing multiple sources, outlier detection, and statistical significance testing to ensure reliability of findings.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <Separator className="mb-6 bg-primary-foreground/20" />
          <div className="text-center space-y-4">
            <p className="text-primary-foreground/80">Data sourced from various agricultural databases and research institutions.</p>
            <p className="text-sm text-primary-foreground/60">© 2025 Team Others. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
