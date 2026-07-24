import { BrowserRouter, Routes, Route, useLocation } from "react-router";
import { useEffect, lazy, Suspense } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import { Navigation } from "./components/Navigation";
import { Footer } from "./components/Footer";
import { MarketTicker } from "./components/MarketTicker";

// Pages — lazy-loaded so a single page compile error never breaks App.tsx
const HomePage          = lazy(() => import("./components/pages/HomePage").then(m => ({ default: m.HomePage })));
const BrokersPage       = lazy(() => import("./components/pages/BrokersPage").then(m => ({ default: m.BrokersPage })));
const CalendarPage      = lazy(() => import("./components/pages/CalendarPage").then(m => ({ default: m.CalendarPage })));
const NewsPage          = lazy(() => import("./components/pages/NewsPage").then(m => ({ default: m.NewsPage })));
const AcademyPage       = lazy(() => import("./components/pages/AcademyPage").then(m => ({ default: m.AcademyPage })));
const ToolsPage         = lazy(() => import("./components/pages/ToolsPage").then(m => ({ default: m.ToolsPage })));
const ScamAlertsPage    = lazy(() => import("./components/pages/ScamAlertsPage").then(m => ({ default: m.ScamAlertsPage })));
const LoginPage         = lazy(() => import("./components/pages/auth/LoginPage").then(m => ({ default: m.LoginPage })));
const RegisterPage      = lazy(() => import("./components/pages/auth/RegisterPage").then(m => ({ default: m.RegisterPage })));
const BrokerProfilePage = lazy(() => import("./components/pages/brokers/BrokerProfilePage").then(m => ({ default: m.BrokerProfilePage })));
const BrokerComparePage = lazy(() => import("./components/pages/brokers/BrokerComparePage").then(m => ({ default: m.BrokerComparePage })));
const ArticlePage       = lazy(() => import("./components/pages/news/ArticlePage").then(m => ({ default: m.ArticlePage })));
const LevelPage         = lazy(() => import("./components/pages/academy/LevelPage").then(m => ({ default: m.LevelPage })));
const LessonPage        = lazy(() => import("./components/pages/academy/LessonPage").then(m => ({ default: m.LessonPage })));
const AboutPage         = lazy(() => import("./components/pages/company/AboutPage").then(m => ({ default: m.AboutPage })));
const ContactPage       = lazy(() => import("./components/pages/company/ContactPage").then(m => ({ default: m.ContactPage })));
const CareersPage       = lazy(() => import("./components/pages/company/CareersPage").then(m => ({ default: m.CareersPage })));
const PartnershipsPage  = lazy(() => import("./components/pages/company/PartnershipsPage").then(m => ({ default: m.PartnershipsPage })));
const AdvertisePage     = lazy(() => import("./components/pages/company/AdvertisePage").then(m => ({ default: m.AdvertisePage })));
const HowItWorksPage    = lazy(() => import("./components/pages/company/HowItWorksPage").then(m => ({ default: m.HowItWorksPage })));
const PrivacyPage       = lazy(() => import("./components/pages/legal/PrivacyPage").then(m => ({ default: m.PrivacyPage })));
const TermsPage         = lazy(() => import("./components/pages/legal/TermsPage").then(m => ({ default: m.TermsPage })));
const RiskDisclosurePage = lazy(() => import("./components/pages/legal/RiskDisclosurePage").then(m => ({ default: m.RiskDisclosurePage })));
const CookiePolicyPage  = lazy(() => import("./components/pages/legal/CookiePolicyPage").then(m => ({ default: m.CookiePolicyPage })));
const SitemapPage       = lazy(() => import("./components/pages/legal/SitemapPage").then(m => ({ default: m.SitemapPage })));
const ForumPage         = lazy(() => import("./components/pages/ForumPage").then(m => ({ default: m.ForumPage })));
const PremiumPage       = lazy(() => import("./components/pages/PremiumPage").then(m => ({ default: m.PremiumPage })));
const HelpPage          = lazy(() => import("./components/pages/HelpPage").then(m => ({ default: m.HelpPage })));
const AlertsPage        = lazy(() => import("./components/pages/AlertsPage").then(m => ({ default: m.AlertsPage })));
const DashboardPage     = lazy(() => import("./components/pages/DashboardPage").then(m => ({ default: m.DashboardPage })));
const ScamGuidePage     = lazy(() => import("./components/pages/scam-alerts/ScamGuidePage").then(m => ({ default: m.ScamGuidePage })));
const AdminPage         = lazy(() => import("./components/pages/admin/AdminPage").then(m => ({ default: m.AdminPage })));
const TutorialsPage     = lazy(() => import("./components/pages/TutorialsPage").then(m => ({ default: m.TutorialsPage })));
const AdminContentPage  = lazy(() => import("./components/pages/AdminContentPage").then(m => ({ default: m.AdminContentPage })));

const fullscreenRoutes = ["/login", "/register", "/admin", "/admin/content"];

function PageFallback() {
  return (
    <div className="flex items-center justify-center min-h-[40vh]">
      <div className="w-6 h-6 border-2 border-[#C9A84C] border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function Layout() {
  const { pathname } = useLocation();
  const isFullscreen = fullscreenRoutes.includes(pathname);

  if (isFullscreen) {
    return (
      <Suspense fallback={<PageFallback />}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/admin/content" element={<AdminContentPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/*" element={<AdminPage />} />
        </Routes>
      </Suspense>
    );
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "'Inter', sans-serif" }}>
      <Navigation />
      <MarketTicker />
      <main className="flex-1">
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route path="/" element={<HomePage />} />

            {/* Brokers */}
            <Route path="/brokers" element={<BrokersPage />} />
            <Route path="/brokers/compare" element={<BrokerComparePage />} />
            <Route path="/brokers/:slug" element={<BrokerProfilePage />} />

            {/* Calendar */}
            <Route path="/calendar" element={<CalendarPage />} />

            {/* News */}
            <Route path="/news" element={<NewsPage />} />
            <Route path="/news/:slug" element={<ArticlePage />} />

            {/* Academy */}
            <Route path="/academy" element={<AcademyPage />} />
            <Route path="/academy/:level" element={<LevelPage />} />
            <Route path="/academy/:level/:lesson" element={<LessonPage />} />

            {/* Tools */}
            <Route path="/tools" element={<ToolsPage />} />

            {/* Tutorials */}
            <Route path="/tutorials" element={<TutorialsPage />} />

            {/* Scam Alerts */}
            <Route path="/scam-alerts" element={<ScamAlertsPage />} />
            <Route path="/scam-alerts/guide" element={<ScamGuidePage />} />

            {/* Company */}
            <Route path="/about" element={<AboutPage />} />
            <Route path="/how-it-works" element={<HowItWorksPage />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/partnerships" element={<PartnershipsPage />} />
            <Route path="/advertise" element={<AdvertisePage />} />
            <Route path="/contact" element={<ContactPage />} />

            {/* Legal */}
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/risk-disclosure" element={<RiskDisclosurePage />} />
            <Route path="/cookie-policy" element={<CookiePolicyPage />} />
            <Route path="/sitemap" element={<SitemapPage />} />

            {/* Community / Features */}
            <Route path="/forum" element={<ForumPage />} />
            <Route path="/premium" element={<PremiumPage />} />
            <Route path="/help" element={<HelpPage />} />
            <Route path="/alerts" element={<AlertsPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />

            {/* 404 */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="text-6xl mb-4" style={{ fontFamily: "'JetBrains Mono', monospace", color: "#1C1E2B" }}>404</div>
      <h1 className="text-[#EEF0F6] mb-2" style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400, fontSize: "1.6rem" }}>Page not found</h1>
      <p className="text-[#6E7489] text-sm mb-6">The page you&apos;re looking for doesn&apos;t exist.</p>
      <a href="/" className="px-5 py-2.5 bg-[#C9A84C] text-[#09090E] rounded-lg text-sm hover:bg-[#D4B55A] transition-colors">Go Home</a>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Layout />
      </BrowserRouter>
    </ThemeProvider>
  );
}
