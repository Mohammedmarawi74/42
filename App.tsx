import React, { useState, useRef } from "react";
import { toPng } from "html-to-image";
import { v4 as uuidv4 } from "uuid"; // Simplified ID generation simulation
import {
  AppState,
  DEFAULT_THEME,
  INITIAL_SLIDES,
  SlideData,
  ThemeConfig,
} from "./types";
import { EditorSidebar } from "./components/EditorSidebar";
import { CanvasPreview } from "./components/CanvasPreview";
import { CarouselNav } from "./components/CarouselNav";
import { Icons } from "./components/ui/Icons";

// Simple ID generator since we don't have uuid lib installed in this environment
const generateId = () => Math.random().toString(36).substr(2, 9);

function App() {
  const [appState, setAppState] = useState<AppState>({
    logo: null,
    slides: INITIAL_SLIDES,
    activeSlideIndex: 0,
    theme: DEFAULT_THEME,
    customCSS: "",
  });

  const canvasRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);

  // -- Handlers --

  const handleUpdateSlide = (updates: Partial<SlideData>) => {
    setAppState((prev) => {
      const newSlides = [...prev.slides];
      newSlides[prev.activeSlideIndex] = {
        ...newSlides[prev.activeSlideIndex],
        ...updates,
      };
      return { ...prev, slides: newSlides };
    });
  };

  const handleUpdateTheme = (updates: Partial<ThemeConfig>) => {
    setAppState((prev) => ({
      ...prev,
      theme: { ...prev.theme, ...updates },
    }));
  };

  const handleUpdateLogo = (logo: string | null) => {
    setAppState((prev) => ({ ...prev, logo }));
  };

  const handleUpdateCSS = (css: string) => {
    setAppState((prev) => ({ ...prev, customCSS: css }));
  };

  const handleAddSlide = () => {
    setAppState((prev) => {
      const newSlide: SlideData = {
        id: generateId(),
        title: "عنوان جديد",
        subtitle: "عنوان فرعي",
        description: "اكتب وصفاً جذاباً هنا...",
        ctaText: "ابدأ الآن",
        highlight: "",
        image: null,
      };
      return {
        ...prev,
        slides: [...prev.slides, newSlide],
        activeSlideIndex: prev.slides.length, // Select the new slide
      };
    });
  };

  const handleDeleteSlide = (index: number) => {
    if (appState.slides.length <= 1) return;
    setAppState((prev) => {
      const newSlides = prev.slides.filter((_, i) => i !== index);
      const newIndex = index >= newSlides.length ? newSlides.length - 1 : index;
      return {
        ...prev,
        slides: newSlides,
        activeSlideIndex: newIndex,
      };
    });
  };

  const handleExport = async () => {
    if (!canvasRef.current) return;
    setIsExporting(true);

    try {
      // Ensure fonts are fully loaded before capturing
      await document.fonts.ready;

      // Artificial delay to ensure any re-renders are complete
      await new Promise((resolve) => setTimeout(resolve, 100));

      // toPng uses SVG foreignObject which preserves browser's native text rendering (fixing RTL issues)
      const dataUrl = await toPng(canvasRef.current, {
        cacheBust: true,
        pixelRatio: 3, // High resolution (3x)
        backgroundColor: appState.theme.backgroundColor,
        style: {
          // Explicitly force styles in the capture context
          direction: "rtl",
          fontFamily: appState.theme.fontFamily,
        },
      });

      const link = document.createElement("a");
      link.download = `radar-slide-${appState.activeSlideIndex + 1}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Export failed:", error);
      alert("حدث خطأ أثناء التصدير. يرجى المحاولة مرة أخرى.");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="app-container">
      {/* Top Header */}
      <header className="app-header">
        <div className="header-brand">
          <div className="brand-icon">
            <Icons.Layout style={{ color: '#000' }} size={20} />
          </div>
          <h1 className="brand-title">
            رادار المستثمر
            <span className="brand-badge">مصمم الكاروسيل</span>
          </h1>
        </div>

        <div className="header-actions">
          <div className="export-info">الدقة: 1080x1080px (PNG)</div>
          <button
            onClick={handleExport}
            disabled={isExporting}
            className="btn-export"
          >
            {isExporting ? (
              <span>جاري المعالجة...</span>
            ) : (
              <>
                <Icons.Download size={18} />
                <span>تصدير الصورة</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* Main Workspace */}
      <div className="main-workspace">
        {/* Sidebar Controls (Right) */}
        <EditorSidebar
          activeSlide={appState.slides[appState.activeSlideIndex]}
          appState={appState}
          onUpdateSlide={handleUpdateSlide}
          onUpdateTheme={handleUpdateTheme}
          onUpdateLogo={handleUpdateLogo}
          onUpdateCSS={handleUpdateCSS}
        />

        {/* Center Preview Area */}
        <div className="preview-container">
          {/* Scrollable Canvas Container */}
          <div className="canvas-scroller bg-pattern">
            {/* Scale Wrapper to fit screen if needed, currently fixed size for fidelity */}
            <div
              style={{
                transform: "scale(0.65)",
                transformOrigin: "center center",
              }}
            >
              <CanvasPreview
                ref={canvasRef}
                slide={appState.slides[appState.activeSlideIndex]}
                appState={appState}
                totalSlides={appState.slides.length}
                currentIndex={appState.activeSlideIndex}
              />
            </div>
          </div>

          {/* Bottom Navigation */}
          <CarouselNav
            slides={appState.slides}
            activeIndex={appState.activeSlideIndex}
            onSelect={(idx) =>
              setAppState((prev) => ({ ...prev, activeSlideIndex: idx }))
            }
            onAdd={handleAddSlide}
            onDelete={handleDeleteSlide}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
