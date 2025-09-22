'use client';

import summaryData1990 from "./data/1_SummaryPlot_1990.json";
import summaryData2010 from "./data/1_SummaryPlot_2010.json";
import fertiliserData90s from './data/4_FertiliserUse_90s.json';
import fertiliserData10s from './data/4_FertiliserUse_10s.json';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Button } from "../components/ui/button";
import { Separator } from "../components/ui/separator";
import { motion } from "framer-motion";
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { ArrowDown, BarChart3, Users, Globe, X, Maximize2, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

export default function Home() {
  const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });
  
  // Lightbox state
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [lightboxAlt, setLightboxAlt] = useState<string>('');
  
  // Fullscreen Plotly state
  const [fullscreenChart, setFullscreenChart] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState<boolean | null>(null); // null until we know for sure
  
  // Simple carousel state
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Team members data
  const teamMembers = [
    {
      name: "Hamza Wahbi",
      role: "Software Engineer",
      image: "/img/hamza.jpg",
      linkedin: "https://www.linkedin.com/in/hamzawahbi/",
      initials: "HW"
    },
    {
      name: "Furkan T",
      role: "Data Scientist", 
      image: "/img/furkan.jpg",
      linkedin: "https://www.linkedin.com/in/furkan-t-88926a155/",
      initials: "FT"
    },
    {
      name: "Emma Watts",
      role: "Biotechnology PhD Student",
      image: "/img/emma.jpg", 
      linkedin: "https://www.linkedin.com/in/emma-watts-6a449119b/",
      initials: "EW"
    },
    {
      name: "Akram Atmani",
      role: "UX/UI Designer",
      image: "/img/akram.jpg",
      linkedin: "https://www.linkedin.com/in/akram-atmani/", 
      initials: "AA"
    },
    {
      name: "Isabella",
      role: "Agriculture Scientist",
      image: "/img/Isabella.jpg",
      linkedin: "https://www.linkedin.com/in/shihan-zhang-a2749b219/",
      initials: "IB"
    }
  ];

  // Simple carousel functions
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % teamMembers.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + teamMembers.length) % teamMembers.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement && fullscreenChart) {
        setFullscreenChart(null);
        document.body.style.overflow = 'unset';
      }
    };
    
    // Set initial mobile state immediately to prevent flash
    checkMobile();
    window.addEventListener('resize', checkMobile);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
    };
  }, [fullscreenChart]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openLightbox = (src: string, alt: string) => {
    setLightboxImage(src);
    setLightboxAlt(alt);
    document.body.style.overflow = 'hidden'; // Prevent scrolling
  };

  const closeLightbox = () => {
    setLightboxImage(null);
    setLightboxAlt('');
    document.body.style.overflow = 'unset'; // Restore scrolling
  };

  const toggleFullscreenChart = async (chartId: string) => {
    if (fullscreenChart === chartId) {
      // Exit fullscreen
      if (document.fullscreenElement) {
        try {
          await document.exitFullscreen();
        } catch (err) {
          console.log('Error exiting fullscreen:', err);
        }
      }
      setFullscreenChart(null);
      document.body.style.overflow = 'unset';
    } else {
      // Enter fullscreen
      setFullscreenChart(chartId);
      document.body.style.overflow = 'hidden';
      
      // Try to enter native fullscreen
      try {
        const element = document.documentElement;
        if (element.requestFullscreen) {
          await element.requestFullscreen();
        }
      } catch (err) {
        console.log('Fullscreen not supported or denied:', err);
      }
    }
  };

  // Helper function to get mobile-friendly chart config
  const getChartConfig = (mobile: boolean) => ({
    responsive: true,
    displayModeBar: !mobile,
    doubleClick: 'reset' as const,
    scrollZoom: !mobile,
    displaylogo: false,
    modeBarButtonsToRemove: mobile ? ['zoom2d', 'pan2d', 'select2d', 'lasso2d', 'autoScale2d'] as any : [],
    showTips: !mobile
  });

  // Helper function to get mobile-friendly layout
  const getChartLayout = (baseLayout: {
    width?: number;
    height?: number;
    showlegend?: boolean;
    xaxis?: Record<string, unknown>;
    yaxis?: Record<string, unknown>;
    [key: string]: unknown;
  }, mobile: boolean) => ({
    ...baseLayout,
    margin: { 
      t: mobile ? 40 : 50, 
      r: mobile ? 10 : 20, 
      b: mobile ? 50 : 60, 
      l: mobile ? 50 : 60 
    },
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)',
    font: { 
      size: mobile ? 10 : 12,
      family: 'system-ui, -apple-system, sans-serif'
    },
    autosize: true,
    width: undefined,
    height: mobile ? 400 : (baseLayout.height || 500),
    showlegend: mobile ? false : (baseLayout.showlegend !== false),
    legend: mobile ? {} : {
      ...(baseLayout as any).legend,
      orientation: 'h',
      x: 0,
      y: -0.1
    },
    xaxis: {
      ...(baseLayout.xaxis || {}),
      tickangle: mobile ? -45 : ((baseLayout.xaxis as any)?.tickangle || 0),
      tickfont: { size: mobile ? 9 : 10 },
      automargin: true,
      title: {
        ...((baseLayout.xaxis as any)?.title || {}),
        font: { size: mobile ? 10 : 12 }
      }
    },
    yaxis: {
      ...(baseLayout.yaxis || {}),
      tickfont: { size: mobile ? 9 : 10 },
      automargin: true,
      title: {
        ...((baseLayout.yaxis as any)?.title || {}),
        font: { size: mobile ? 10 : 12 }
      }
    },
    title: {
      ...((baseLayout as any).title || {}),
      font: { size: mobile ? 12 : 14 },
      x: 0.5,
      xanchor: 'center'
    }
  });

  return (
    <main className="min-h-screen bg-background pt-12 sm:pt-16 w-full max-w-[100vw] overflow-x-hidden">
      {/* Hero Section */}
      <section
        id="home"
        className={`relative flex flex-col items-center justify-center min-h-screen text-center ${
          isMobile === null ? 'bg-white' : isMobile ? 'bg-white' : ''
        }`}
        style={isMobile === null ? {} : isMobile ? {} : {
          backgroundImage: `url('/img/farm-bg.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Dark overlay for text visibility - only on desktop */}
        {isMobile === false && <div className="absolute inset-0 bg-black/50"></div>}
        
        {/* Content with higher z-index */}
        <div className="relative z-10 w-full max-w-5xl mx-auto sm:px-4">
          <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-4 sm:space-y-6"
        >
          <h1 className={`font-serif font-bold mb-2 sm:mb-4 leading-tight ${
            isMobile === null || isMobile
              ? 'text-2xl text-primary' 
              : 'text-3xl sm:text-4xl md:text-5xl lg:text-7xl text-white drop-shadow-lg'
          }`}>
            NPK Impact Explorer
          </h1>
          <h2 className={`mb-4 sm:mb-6 leading-relaxed ${
            isMobile === null || isMobile
              ? 'text-base text-muted-foreground' 
              : 'text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/90 drop-shadow-md'
          }`}>
            Understanding Fertilizer&apos;s Role in Agricultural Transformation
          </h2>
          <p className={`mb-6 sm:mb-8 max-w-3xl mx-auto text-center leading-relaxed ${
            isMobile === null || isMobile
              ? 'text-sm text-muted-foreground' 
              : 'text-sm sm:text-base md:text-lg text-white/80 drop-shadow-sm'
          }`}>
            Explore two decades of data across UK, Asia, and Africa to understand how
            NPK fertilizers have shaped global agriculture.
          </p>
          <Button 
            size={isMobile === null || isMobile ? "default" : "lg"} 
            className="gap-2" 
            onClick={() => scrollToSection('two-decade')}
            variant="default"
          >
            <ArrowDown className="w-4 h-4" />
            <span className="hidden sm:inline">Scroll to Explore</span>
            <span className="sm:hidden">Explore</span>
          </Button>
        </motion.div>
        </div>
      </section>

      {/* Two Decade Analysis Section */}
      <motion.section
        id="two-decade"
        className="min-h-screen flex flex-col items-center justify-center py-12 sm:py-16"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="max-w-6xl mx-auto w-full space-y-6 sm:space-y-8 sm:px-4">
          <div className="text-center space-y-3 sm:space-y-4">
            <Badge variant="secondary" className="mb-2 sm:mb-4 text-sm sm:text-lg px-3 sm:px-4 py-1 sm:py-2">
              <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Historical Analysis
            </Badge>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary">
              1990–2000 vs 2010–2020
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-4xl mx-auto">
              This section compares agricultural data from the 1990s and 2010s, highlighting key changes in fertilizer usage, yields, weather patterns, and insect populations across different regions.
            </p>
          </div>
          <Card className="w-full border-0">
            <CardHeader className="relative p-4 pb-2">
              <Button
                variant="outline"
                size="sm"
                className="absolute top-4 right-4 z-10"
                onClick={() => toggleFullscreenChart('two-decade')}
              >
                <Maximize2 className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent className="p-2 sm:p-4">
              <div className={`w-full overflow-hidden ${isMobile ? 'h-[400px]' : 'h-[600px]'}`}>
                <Plot
                  data={summaryData1990.data as any}
                  layout={getChartLayout(summaryData1990.layout, isMobile) as any}
                  config={getChartConfig(isMobile)}
                  style={{ width: '100%', height: '100%' }}
                  useResizeHandler={true}
                  className="w-full h-full"
                />
              </div>
            </CardContent>
          </Card>

          {/* Analysis */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <Card className="border-2 border-primary bg-primary text-primary-foreground">
              <CardHeader className="pb-2 p-3 sm:p-4">
                <CardTitle className="font-serif text-primary-foreground flex items-center gap-2 text-sm sm:text-base">
                  ⚠️ 1995-1996 Drought Impact
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3 sm:p-4 pt-0">
                <p className="text-primary-foreground text-xs sm:text-sm">Despite high fertiliser inputs (130+ kg N/ha), yields dropped significantly due to water stress. This demonstrates the critical role of weather in nutrient uptake efficiency.</p>
              </CardContent>
            </Card>

            <Card className="border-2 border-secondary bg-secondary text-secondary-foreground">
              <CardHeader className="pb-2 p-3 sm:p-4">
                <CardTitle className="font-serif text-secondary-foreground flex items-center gap-2 text-sm sm:text-base">
                  ⭐ 2010s Stability
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3 sm:p-4 pt-0">
                <p className="text-secondary-foreground text-xs sm:text-sm">More consistent rainfall patterns and improved water management led to stable, high yields even with reduced fertiliser inputs, showing the benefits of precision agriculture.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.section>

      {/* Team Section */}
      <motion.section
        id="team"
        className="py-12 sm:py-16 bg-muted/30"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto sm:px-4">
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

          {/* Simple Mobile Carousel */}
          {isMobile === true ? (
            <div className="relative w-full max-w-sm mx-auto">
              {/* Single Card Display */}
              <div className="sm:px-12">
                <Card className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6 pb-6">
                    <Avatar className="w-24 h-24 mx-auto mb-4">
                      <AvatarImage 
                        src={teamMembers[currentSlide].image} 
                        alt={teamMembers[currentSlide].name} 
                      />
                      <AvatarFallback className="bg-muted text-muted-foreground">
                        {teamMembers[currentSlide].initials}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="font-serif text-lg font-semibold mb-2">
                      {teamMembers[currentSlide].name}
                    </h3>
                    <p className="text-muted-foreground mb-4 text-sm">
                      {teamMembers[currentSlide].role}
                    </p>
                    <Button variant="outline" size="sm" asChild>
                      <a 
                        href={teamMembers[currentSlide].linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        LinkedIn Profile
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 bg-background border border-border rounded-full p-2 shadow-md hover:bg-accent transition-colors z-10"
                aria-label="Previous team member"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              
              <button
                onClick={nextSlide}
                className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 bg-background border border-border rounded-full p-2 shadow-md hover:bg-accent transition-colors z-10"
                aria-label="Next team member"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              {/* Dots Indicator */}
              <div className="flex justify-center mt-6 space-x-2">
                {teamMembers.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentSlide ? 'bg-primary' : 'bg-muted-foreground/30'
                    }`}
                    aria-label={`Go to team member ${index + 1}`}
                  />
                ))}
              </div>

              {/* Debug Info */}
              <div className="text-center mt-2 text-xs text-muted-foreground">
                Member {currentSlide + 1} of {teamMembers.length}: {teamMembers[currentSlide].name}
              </div>
            </div>
          ) : isMobile === false ? (
            /* Desktop Grid Layout */
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto justify-center">
                {teamMembers.slice(0, 3).map((member, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 * (index + 1) }}
                    viewport={{ once: true }}
                    className="w-full max-w-sm mx-auto"
                  >
                    <Card className="text-center hover:shadow-lg transition-shadow w-full">
                      <CardContent className="pt-6">
                        <Avatar className="w-32 h-32 mx-auto mb-4">
                          <AvatarImage src={member.image} alt={member.name} />
                          <AvatarFallback>{member.initials}</AvatarFallback>
                        </Avatar>
                        <h3 className="font-serif text-xl font-semibold mb-2">{member.name}</h3>
                        <p className="text-muted-foreground mb-4">{member.role}</p>
                        <Button variant="outline" size="sm" asChild>
                          <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                            LinkedIn Profile
                          </a>
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Bottom row - centered for the last 2 members */}
              <div className="flex flex-wrap justify-center gap-8 max-w-4xl mx-auto mt-8">
                {teamMembers.slice(3).map((member, index) => (
                  <motion.div
                    key={index + 3}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 * (index + 4) }}
                    viewport={{ once: true }}
                    className="w-full max-w-sm"
                  >
                    <Card className="text-center hover:shadow-lg transition-shadow w-full">
                      <CardContent className="pt-6">
                        <Avatar className="w-32 h-32 mx-auto mb-4">
                          <AvatarImage src={member.image} alt={member.name} />
                          <AvatarFallback>{member.initials}</AvatarFallback>
                        </Avatar>
                        <h3 className="font-serif text-xl font-semibold mb-2">{member.name}</h3>
                        <p className="text-muted-foreground mb-4">{member.role}</p>
                        <Button variant="outline" size="sm" asChild>
                          <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                            LinkedIn Profile
                          </a>
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </>
          ) : (
            /* Loading state - show nothing until we know the screen size */
            <div className="w-full h-64 flex items-center justify-center">
              <div className="text-muted-foreground">Loading...</div>
            </div>
          )}

        </div>
      </motion.section>

      {/* UK Winter Barley Section */}
      <motion.section
        id="uk-winter-barley"
        className="min-h-screen flex flex-col items-center justify-center py-12 sm:py-16"
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
                <CardHeader className="relative pb-2">
                  <CardTitle className="font-serif">Fertiliser Usage Over Time</CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    className="absolute top-2 right-2 z-10"
                    onClick={() => toggleFullscreenChart('fertiliser-usage')}
                  >
                    <Maximize2 className="w-4 h-4" />
                  </Button>
                </CardHeader>
                <CardContent className="p-2 sm:p-4">
                  <div className={`w-full overflow-hidden ${isMobile ? 'h-[400px]' : 'h-[500px]'}`}>
                    <Plot
                      data={fertiliserData90s.data as any}
                      layout={getChartLayout(fertiliserData90s.layout, isMobile) as any}
                      config={getChartConfig(isMobile)}
                      style={{ width: '100%', height: '100%' }}
                      useResizeHandler={true}
                      className="w-full h-full"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Fertiliser insights below chart */}
              <div className="mt-4 sm:mt-6">
                <Card className="border-2 border-secondary bg-secondary text-secondary-foreground">
                  <CardHeader className="pb-2 p-3 sm:p-4">
                    <CardTitle className="font-serif text-secondary-foreground text-sm sm:text-base">Fertiliser Insights</CardTitle>
                  </CardHeader>
                  <CardContent className="p-3 sm:p-4 pt-0">
                    <p className="text-secondary-foreground text-xs sm:text-sm">Fertiliser usage increased by 50% from 1990s to 2010s, indicating intensification of agricultural practices in UK winter barley production.</p>
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
                <CardContent className="p-2 sm:p-4">
                  <div className="w-full flex justify-center">
                    <div 
                      className="relative group cursor-pointer w-full max-w-4xl"
                      onClick={() => openLightbox("/img/correlation-grainstraw-vs-insec-species.jpg", "Correlation heatmap showing relationships between grain/straw production and insect species populations comparing 1990-2000 vs 2010-2020")}
                    >
                      <Image 
                        src="/img/correlation-grainstraw-vs-insec-species.jpg" 
                        alt="Correlation heatmap showing relationships between grain/straw production and insect species populations comparing 1990-2000 vs 2010-2020"
                        width={800}
                        height={400}
                        className="w-full h-auto rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                        style={{ maxHeight: isMobile ? '300px' : '600px', objectFit: 'contain' }}
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-40 transition-all duration-300 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <span className="text-white font-medium text-sm sm:text-lg">Click to enlarge</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Correlation insights below chart */}
              <div className="mt-4 sm:mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <Card className="border-2 border-primary bg-primary text-primary-foreground">
                  <CardHeader className="pb-2 p-3 sm:p-4">
                    <CardTitle className="font-serif text-primary-foreground text-sm sm:text-base">1990-2000 Patterns</CardTitle>
                  </CardHeader>
                  <CardContent className="p-3 sm:p-4 pt-0">
                    <p className="text-primary-foreground text-xs sm:text-sm">
                      Strong positive correlations (0.29-0.38) between grain production and insect populations, indicating a more balanced ecosystem with higher biodiversity supporting agricultural productivity.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-secondary bg-secondary text-secondary-foreground">
                  <CardHeader className="pb-2 p-3 sm:p-4">
                    <CardTitle className="font-serif text-secondary-foreground text-sm sm:text-base">2010-2020 Shift</CardTitle>
                  </CardHeader>
                  <CardContent className="p-3 sm:p-4 pt-0">
                    <p className="text-secondary-foreground text-xs sm:text-sm">
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
                <CardContent className="p-2 sm:p-4">
                  <div className="w-full flex justify-center">
                    <div 
                      className="relative group cursor-pointer w-full max-w-5xl"
                      onClick={() => openLightbox("/img/strip-8-comparison.jpg", "Box plot comparison showing grain yield, straw yield, summer rainfall, and summer temperature for Strip 8 comparing 1990-2000 vs 2010-2020 periods")}
                    >
                      <Image 
                        src="/img/strip-8-comparison.jpg" 
                        alt="Box plot comparison showing grain yield, straw yield, summer rainfall, and summer temperature for Strip 8 comparing 1990-2000 vs 2010-2020 periods"
                        width={1000}
                        height={400}
                        className="w-full h-auto rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                        style={{ maxHeight: isMobile ? '300px' : '500px', objectFit: 'contain' }}
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-40 transition-all duration-300 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <span className="text-white font-medium text-sm sm:text-lg">Click to enlarge</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Strip 8 insights below chart */}
              <div className="mt-4 sm:mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <Card className="border-2 border-primary bg-primary text-primary-foreground">
                  <CardHeader className="pb-2 p-3 sm:p-4">
                    <CardTitle className="font-serif text-primary-foreground text-sm sm:text-base">📈 Yield Improvements</CardTitle>
                  </CardHeader>
                  <CardContent className="p-3 sm:p-4 pt-0">
                    <p className="text-primary-foreground text-xs sm:text-sm">
                      Grain yields remained stable around 6 tonnes/ha in the 1990s but became more consistent in the 2010s (5.7 tonnes/ha), while straw yields showed similar patterns with reduced variability in recent decades.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-secondary bg-secondary text-secondary-foreground">
                  <CardHeader className="pb-2 p-3 sm:p-4">
                    <CardTitle className="font-serif text-secondary-foreground text-sm sm:text-base">🌦️ Climate Patterns</CardTitle>
                  </CardHeader>
                  <CardContent className="p-3 sm:p-4 pt-0">
                    <p className="text-secondary-foreground text-xs sm:text-sm">
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
                 <CardContent className="p-2 sm:p-4">
                   <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                     {/* Rainfall Patterns */}
                     <div className="w-full flex flex-col items-center">
                       <h4 className="font-serif text-base sm:text-lg font-semibold mb-2 sm:mb-4 text-center px-2">Rainfall Patterns (1853-2024)</h4>
                       <div 
                         className="relative group cursor-pointer w-full max-w-lg"
                         onClick={() => openLightbox("/img/01-fig-rain-1853-2024.png", "Rainfall patterns from 1853 to 2024 showing long-term trends and variability in precipitation")}
                       >
                         <Image 
                           src="/img/01-fig-rain-1853-2024.png" 
                           alt="Rainfall patterns from 1853 to 2024 showing long-term trends and variability in precipitation"
                           width={600}
                           height={400}
                           className="w-full h-auto rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                           style={{ maxHeight: isMobile ? '250px' : '400px', objectFit: 'contain' }}
                         />
                         <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-40 transition-all duration-300 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100">
                           <span className="text-white font-medium text-sm sm:text-lg">Click to enlarge</span>
                         </div>
                       </div>
                     </div>
                     
                     {/* Sunshine Patterns */}
                     <div className="w-full flex flex-col items-center">
                       <h4 className="font-serif text-base sm:text-lg font-semibold mb-2 sm:mb-4 text-center px-2">Sunshine Patterns (1891-2024)</h4>
                       <div 
                         className="relative group cursor-pointer w-full max-w-lg"
                         onClick={() => openLightbox("/img/01-fig-sun-1891-2024.png", "Sunshine patterns from 1891 to 2024 showing long-term trends and variability in solar radiation")}
                       >
                         <Image 
                           src="/img/01-fig-sun-1891-2024.png" 
                           alt="Sunshine patterns from 1891 to 2024 showing long-term trends and variability in solar radiation"
                           width={600}
                           height={400}
                           className="w-full h-auto rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                           style={{ maxHeight: isMobile ? '250px' : '400px', objectFit: 'contain' }}
                         />
                         <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-40 transition-all duration-300 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100">
                           <span className="text-white font-medium text-sm sm:text-lg">Click to enlarge</span>
                         </div>
                       </div>
                     </div>
                   </div>
                 </CardContent>
              </Card>

              {/* Climate insights below chart */}
              <div className="mt-4 sm:mt-6">
                <Card className="border-2 border-primary bg-primary text-primary-foreground">
                  <CardHeader className="pb-2 p-3 sm:p-4">
                    <CardTitle className="font-serif text-primary-foreground text-sm sm:text-base">Climate Impact</CardTitle>
                  </CardHeader>
                  <CardContent className="p-3 sm:p-4 pt-0">
                    <p className="text-primary-foreground text-xs sm:text-sm">Weather variability has increased significantly, with rainfall and temperature patterns showing greater year-to-year variation affecting crop yields.</p>
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
                <CardContent className="p-2 sm:p-4">
                  <div className="w-full flex justify-center">
                    <div 
                      className="relative group cursor-pointer w-full max-w-6xl"
                      onClick={() => openLightbox("/img/Yearly-abundance-of-aphids.jpg", "Bar chart showing yearly abundance of three aphid species - Metopolophium dirhodum (Rose-grain aphid), Rhopalosiphum padi (Bird cherry-oat aphid), and Sitobion avenae (English grain aphid) from 1990 to 2020")}
                    >
                      <Image 
                        src="/img/Yearly-abundance-of-aphids.jpg" 
                        alt="Bar chart showing yearly abundance of three aphid species - Metopolophium dirhodum (Rose-grain aphid), Rhopalosiphum padi (Bird cherry-oat aphid), and Sitobion avenae (English grain aphid) from 1990 to 2020"
                        width={1200}
                        height={500}
                        className="w-full h-auto rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                        style={{ maxHeight: isMobile ? '300px' : '600px', objectFit: 'contain' }}
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-40 transition-all duration-300 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <span className="text-white font-medium text-sm sm:text-lg">Click to enlarge</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Ecosystem insights below chart */}
              <div className="mt-4 sm:mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <Card className="border-2 border-accent bg-accent text-accent-foreground">
                  <CardHeader className="pb-2 p-3 sm:p-4">
                    <CardTitle className="font-serif text-accent-foreground text-sm sm:text-base">🐛 Population Peaks</CardTitle>
                  </CardHeader>
                  <CardContent className="p-3 sm:p-4 pt-0">
                    <p className="text-accent-foreground text-xs sm:text-sm">English grain aphid (Sitobion avenae) showed dramatic population spikes in 1996 (&gt;12,000) and 2011 (~6,000), indicating climate-driven outbreak years with potential crop damage.</p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-secondary bg-secondary text-secondary-foreground">
                  <CardHeader className="pb-2 p-3 sm:p-4">
                    <CardTitle className="font-serif text-secondary-foreground text-sm sm:text-base">📉 Recent Decline</CardTitle>
                  </CardHeader>
                  <CardContent className="p-3 sm:p-4 pt-0">
                    <p className="text-secondary-foreground text-xs sm:text-sm">Overall aphid populations have declined significantly since 2014, with most recent years showing very low abundance across all species, potentially impacting natural pest control and pollination services.</p>
                  </CardContent>
                </Card>
              </div>
            </motion.div>

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
            <CardContent className="p-2 sm:p-4">
              <div className={`w-full overflow-hidden ${isMobile ? 'h-[400px]' : 'h-[600px]'}`}>
                <Plot
                  data={fertiliserData10s.data as any}
                  layout={getChartLayout(fertiliserData10s.layout, isMobile) as any}
                  config={getChartConfig(isMobile)}
                  style={{ width: '100%', height: '100%' }}
                  useResizeHandler={true}
                  className="w-full h-full"
                />
              </div>
            </CardContent>
          </Card>

          {/* Analysis */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
        className="min-h-screen flex flex-col items-center justify-center py-12 sm:py-16"
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

      {/* Global Case Studies Section */}
      <motion.section
        id="global-case-studies"
        className="min-h-screen flex flex-col items-center justify-center px-4 py-16 bg-muted/10"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="max-w-6xl mx-auto w-full space-y-8">
          <div className="text-center space-y-4">
            <Badge variant="secondary" className="text-lg px-4 py-2">Global Case Studies</Badge>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary">
              Asia & Africa Case Studies
            </h2>
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto">
              Examining rice production in Asia and maize production in Africa, showcasing global applications of NPK fertilization strategies across different crops and regions.
            </p>
          </div>

          {/* Asia Case Study */}
          <div className="space-y-6">
            <h3 className="font-serif text-2xl font-semibold text-center">Asia (Rice Case Study)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-2 border-primary bg-primary text-primary-foreground">
                <CardHeader className="pb-2">
                  <CardTitle className="font-serif text-primary-foreground">🌾 Rice Revolution</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-primary-foreground text-sm">Asia&apos;s rice production shows steady growth from 1990-2020, with fertilizer optimization playing a crucial role in feeding the world&apos;s largest population.</p>
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

          {/* Africa Case Study */}
          <div className="space-y-6">
            <h3 className="font-serif text-2xl font-semibold text-center">Africa (Maize Case Study)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-2 border-secondary bg-secondary text-secondary-foreground">
                <CardHeader className="pb-2">
                  <CardTitle className="font-serif text-secondary-foreground">🌽 Maize Potential</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-secondary-foreground text-sm">Africa&apos;s maize production shows significant potential for growth with proper fertilizer management and improved agricultural practices.</p>
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
        className="min-h-screen flex flex-col items-center justify-center py-12 sm:py-16"
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
          <div className="space-y-8">
            {/* 1990s Summary */}
            <Card className="border-0">
              <CardHeader className="pb-2">
                <CardTitle className="font-serif text-center">1990-2000 Summary</CardTitle>
              </CardHeader>
              <CardContent className="p-2 sm:p-4">
                <div className={`w-full overflow-hidden ${isMobile ? 'h-[400px]' : 'h-[500px]'}`}>
                  <Plot
                    data={summaryData1990.data as any}
                    layout={getChartLayout(summaryData1990.layout, isMobile) as any}
                    config={getChartConfig(isMobile)}
                    style={{ width: '100%', height: '100%' }}
                    useResizeHandler={true}
                    className="w-full h-full"
                  />
                </div>
              </CardContent>
            </Card>

            {/* 2010s Summary */}
            <Card className="border-0">
              <CardHeader className="pb-2">
                <CardTitle className="font-serif text-center">2010-2020 Summary</CardTitle>
              </CardHeader>
              <CardContent className="p-2 sm:p-4">
                <div className={`w-full overflow-hidden ${isMobile ? 'h-[400px]' : 'h-[500px]'}`}>
                  <Plot
                    data={summaryData2010.data as any}
                    layout={getChartLayout(summaryData2010.layout, isMobile) as any}
                    config={getChartConfig(isMobile)}
                    style={{ width: '100%', height: '100%' }}
                    useResizeHandler={true}
                    className="w-full h-full"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

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
                  Datasets from Rothamsted Research Long-term Experiments used in this analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1" className="border-b border-border">
                    <AccordionTrigger className="text-left font-serif hover:no-underline">
                      Rothamsted Long-term Experiments - Weather Data
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      Electronic Rothamsted Archive (e-RA). Temperature, rainfall, and sunshine data from Rothamsted Research long-term experiments. Including monthly and annual data from 1853-2024. Available at: <a href="https://www.era.rothamsted.ac.uk/info/datasets" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://www.era.rothamsted.ac.uk/info/datasets</a>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-2" className="border-b border-border">
                    <AccordionTrigger className="text-left font-serif hover:no-underline">
                      Broadbalk Wheat Experiment - Hoosfield Barley
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      Rothamsted Research. Long-term agricultural yield and fertilizer data from the world&apos;s longest-running agricultural experiments. Crop yields, nutrient data, and fertilizer treatments from 1852 onwards. Electronic Rothamsted Archive.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-3" className="border-b border-border">
                    <AccordionTrigger className="text-left font-serif hover:no-underline">
                      Rothamsted Insect Survey Data
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      Rothamsted Research Insect Survey (RIS). Long-term aphid monitoring data including Rhopalosiphum padi, Metopolophium dirhodum, and Sitobion avenae populations from 1990-2020. Available through the Electronic Rothamsted Archive.
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
      <footer className="bg-primary text-primary-foreground py-8">
        <div className="max-w-7xl mx-auto">
          <Separator className="mb-6 bg-primary-foreground/20" />
          <div className="text-center space-y-4">
            <p className="text-primary-foreground/80">Data sourced from the Electronic Rothamsted Archive (e-RA) - Rothamsted Research Long-term Experiments.</p>
            <p className="text-sm text-primary-foreground/60">© 2025 Team Others. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={closeLightbox}
        >
          <div className="relative max-w-[90vw] max-h-[90vh] flex items-center justify-center">
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-60 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2 transition-all duration-200"
              aria-label="Close lightbox"
            >
              <X className="w-6 h-6 text-white" />
            </button>
            <Image
              src={lightboxImage}
              alt={lightboxAlt}
              width={1200}
              height={800}
              className="max-w-full max-h-full object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}

      {/* Fullscreen Chart Modal */}
      {fullscreenChart && (
        <div 
          className="fixed inset-0 bg-background z-[9999] w-screen h-screen overflow-hidden"
          style={{ width: '100vw', height: '100vh', maxWidth: '100vw' }}
          onClick={() => toggleFullscreenChart(fullscreenChart)}
        >
          <div className="relative w-full h-full flex flex-col">
            <div className="absolute top-4 right-4 z-[10000] flex gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFullscreenChart(fullscreenChart);
                }}
                className="bg-primary text-primary-foreground rounded-lg px-3 py-2 transition-all duration-200 hover:bg-primary/80 shadow-lg"
                aria-label="Exit fullscreen"
              >
                <X className="w-5 h-5 inline mr-2" />
                Exit Fullscreen
              </button>
            </div>
            <div 
              className="flex-1 w-full h-full overflow-hidden"
              style={{ width: '100vw', height: '100vh', maxWidth: '100vw' }}
              onClick={(e) => e.stopPropagation()}
            >
              {fullscreenChart === 'two-decade' && (
                <Plot
                  data={summaryData1990.data as any}
                  layout={{
                    ...summaryData1990.layout,
                    margin: { t: 80, r: 60, b: 80, l: 80 },
                    paper_bgcolor: 'rgba(0,0,0,0)',
                    plot_bgcolor: 'rgba(0,0,0,0)',
                    font: { size: 16 },
                    autosize: true
                  } as any}
                  config={{ 
                    responsive: true, 
                    displayModeBar: true,
                    doubleClick: 'reset',
                    scrollZoom: true,
                    displaylogo: false
                  }}
                  style={{ width: '100%', height: '100%', maxWidth: '100vw' }}
                  useResizeHandler={true}
                />
              )}
              
              {fullscreenChart === 'fertiliser-usage' && (
                <Plot
                  data={fertiliserData90s.data as any}
                  layout={{
                    ...fertiliserData90s.layout,
                    margin: { t: 80, r: 60, b: 80, l: 80 },
                    paper_bgcolor: 'rgba(0,0,0,0)',
                    plot_bgcolor: 'rgba(0,0,0,0)',
                    font: { size: 16 },
                    autosize: true
                  } as any}
                  config={{ 
                    responsive: true, 
                    displayModeBar: true,
                    doubleClick: 'reset',
                    scrollZoom: true,
                    displaylogo: false
                  } }
                  style={{ width: '100%', height: '100%', maxWidth: '100vw' }}
                  useResizeHandler={true}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
