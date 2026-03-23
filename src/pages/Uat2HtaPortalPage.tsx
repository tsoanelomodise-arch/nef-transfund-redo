import { useState, memo, useEffect, useRef, useCallback } from "react";
import { Play, RotateCcw } from "lucide-react";
import PhakamaniNavbar from "@/components/phakamani/PhakamaniNavbar";
import Footer from "@/components/transformation/Footer";

const tabs = [
  { id: "tab-capital", label: "Access to Capital" },
  { id: "tab-markets", label: "Access to Markets" },
  { id: "tab-capabilities", label: "Access to Capabilities" },
  { id: "tab-aggregators", label: "Other Aggregators" },
  { id: "tab-sectors", label: "Sectors" },
] as const;

const Uat2HtaPortalPage = memo(() => {
  const [activeTab, setActiveTab] = useState("tab-capital");
  const [showVideo, setShowVideo] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>(null);

  const handleReplay = useCallback(() => {
    setVideoEnded(false);
    if (playerRef.current?.seekTo) {
      playerRef.current.seekTo(0);
      playerRef.current.playVideo();
    }
  }, []);

  useEffect(() => {
    if (!showVideo) return;

    const loadAPI = () => {
      if ((window as any).YT?.Player) {
        createPlayer();
        return;
      }
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(tag);
      (window as any).onYouTubeIframeAPIReady = createPlayer;
    };

    const createPlayer = () => {
      if (!playerContainerRef.current) return;
      playerRef.current = new (window as any).YT.Player(playerContainerRef.current, {
        videoId: "8UX1guPBADg",
        playerVars: { autoplay: 1, rel: 0, modestbranding: 1, enablejsapi: 1 },
        events: {
          onStateChange: (event: any) => {
            if (event.data === (window as any).YT.PlayerState.ENDED) {
              setVideoEnded(true);
            }
          },
        },
      });
    };

    loadAPI();

    return () => {
      if (playerRef.current?.destroy) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, [showVideo]);

  return (
    <>
      <PhakamaniNavbar />
      <style>{`
        .hta-portal-page {
          --color-navy: #111111;
          --color-navy-light: #1a1a1a;
          --color-coral: #007847;
          --color-coral-dark: #004b28;
          --color-white: #ffffff;
          --color-gray-light: #F4F4F4;
          --color-text-dark: #0F172A;
          --logo-red: #E31C23;
          --logo-blue: #004B8D;
          --logo-green: #007847;
          --logo-yellow: #FDB913;
          --logo-black: #000000;
          --font-family: 'Montserrat', sans-serif;
          --spacing-xs: 4px;
          --spacing-sm: 8px;
          --spacing-md: 16px;
          --spacing-lg: 32px;
          --spacing-xl: 40px;
          --spacing-xxl: 64px;
          --container-width: 1400px;
          font-family: var(--font-family);
          color: var(--color-text-dark);
          line-height: 1.6;
          background-color: var(--color-gray-light);
          overflow-x: hidden;
        }
        .hta-portal-page a { text-decoration: none; color: inherit; }
        .hta-portal-page ul { list-style: none; }
        .hta-portal-page h1, .hta-portal-page h2, .hta-portal-page h3, .hta-portal-page h4 {
          font-weight: 700; line-height: 1.2; text-transform: none; letter-spacing: normal;
        }
        .hta-portal-page h1 {
          font-size: clamp(2rem, 4vw, 3.5rem); margin-bottom: var(--spacing-md);
          color: var(--color-white); text-shadow: 0 2px 4px rgba(0,0,0,0.5);
        }
        .hta-portal-page h2 {
          font-size: clamp(1.5rem, 3vw, 2.5rem); margin-bottom: var(--spacing-lg);
        }
        .hta-portal-page .hta-support-text {
          font-size: 1.1rem; color: #ffffff; margin-bottom: var(--spacing-lg);
          max-width: 600px; text-shadow: 0 1px 3px rgba(0,0,0,0.8); font-weight: 400;
        }
        .hta-portal-page .hta-container {
          width: 100%; max-width: var(--container-width); margin: 0 auto; padding: 0 40px;
        }
        .hta-portal-page .hta-hero {
          position: relative; min-height: 80vh; display: flex; align-items: center;
          background-image: url('/images/hero/WomanOnPhone.jpg');
          background-size: cover; background-position: center; background-repeat: no-repeat;
        }
        .hta-portal-page .hta-hero::before {
          content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 100%;
          background-color: rgba(0, 0, 0, 0.60); z-index: 1;
        }
        .hta-portal-page .hta-hero-content {
          position: relative; z-index: 2; display: grid;
          grid-template-columns: 1fr 1.4fr; gap: 80px; align-items: center;
        }
        .hta-portal-page .hta-hero-text-block {
          padding: var(--spacing-lg);
        }
        .hta-portal-page .hta-hero-video-block {
          position: relative; width: 100%; background: var(--color-coral);
          padding: var(--spacing-md); box-shadow: 20px 20px 0px 0px rgba(0, 120, 71, 0.2);
          border: 4px solid #007847;
        }
        .hta-portal-page .hta-video-wrapper {
          position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; background: #000;
        }
        .hta-portal-page .hta-video-wrapper iframe {
          position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;
        }
        .hta-portal-page .hta-btn-group {
          display: flex; gap: var(--spacing-md); margin-top: var(--spacing-lg);
        }
        .hta-portal-page .hta-btn {
          display: inline-block; padding: 14px 32px; font-size: 0.9rem; font-weight: bold;
          text-transform: uppercase; letter-spacing: 0.5px; text-align: center; cursor: pointer;
          transition: all 0.3s ease; border: 2px solid transparent;
        }
        .hta-portal-page .hta-btn:focus {
          outline: 2px solid var(--color-white); outline-offset: 4px;
        }
        .hta-portal-page .hta-btn-primary {
          background-color: var(--color-coral); color: var(--color-white);
        }
        .hta-portal-page .hta-btn-primary:hover, .hta-portal-page .hta-btn-primary:active {
          background-color: var(--color-coral-dark);
        }
        .hta-portal-page .hta-btn-secondary {
          background-color: rgba(0,0,0,0.5); color: var(--color-white); border-color: var(--color-white);
        }
        .hta-portal-page .hta-btn-secondary:hover, .hta-portal-page .hta-btn-secondary:active {
          background-color: var(--color-white); color: var(--color-navy);
        }
        .hta-portal-page .hta-bg-navy {
          background-color: var(--color-navy); color: var(--color-white);
        }
        .hta-portal-page .hta-tabs-wrapper {
          display: grid; grid-template-columns: 300px 1fr; gap: 40px; margin-top: 0;
        }
        .hta-portal-page .hta-tabs-list {
          display: flex; flex-direction: column; gap: var(--spacing-sm);
        }
        .hta-portal-page .hta-tab-btn {
          padding: var(--spacing-md) var(--spacing-lg); background: var(--color-white);
          border: 1px solid rgba(0,0,0,0.05); text-align: left;
          font-family: var(--font-family); font-size: 1.1rem; font-weight: bold;
          color: var(--color-navy); cursor: pointer; transition: all 0.3s ease;
          box-shadow: 0 2px 4px rgba(0,0,0,0.02); border-left: 4px solid transparent;
        }
        .hta-portal-page .hta-tab-btn.active {
          background: var(--color-white); box-shadow: 0 4px 12px rgba(0,0,0,0.08);
          transform: translateX(5px);
        }
        .hta-portal-page .hta-tab-btn:hover, .hta-portal-page .hta-tab-btn.active {
          color: var(--color-coral); border-left-color: var(--color-coral);
        }
        .hta-portal-page .hta-tab-btn:hover:not(.active) {
          background: var(--color-gray-light); transform: translateX(5px);
        }
        .hta-portal-page .hta-tab-content-container {
          position: relative; min-height: 350px;
        }
        .hta-portal-page .hta-tab-pane {
          display: none; padding: 32px; border-radius: 4px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05); animation: htaFadeIn 0.4s ease forwards;
        }
        .hta-portal-page .hta-tab-pane.active { display: block; }
        @keyframes htaFadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .hta-portal-page .hta-tab-pane h2 { margin-bottom: var(--spacing-md); font-size: 1.8rem; }
        .hta-portal-page .hta-data-table {
          width: 100%; border-collapse: collapse; margin-top: var(--spacing-md);
          background: rgba(255, 255, 255, 0.05);
        }
        .hta-portal-page .hta-data-table th, .hta-portal-page .hta-data-table td {
          padding: var(--spacing-md); text-align: left;
          border-bottom: 1px solid rgba(128, 128, 128, 0.2);
        }
        .hta-portal-page .hta-bg-navy .hta-data-table th {
          color: rgba(255, 255, 255, 0.7); font-weight: normal;
          text-transform: uppercase; font-size: 0.85rem; letter-spacing: 1px;
        }
        .hta-portal-page .hta-data-table tr:last-child td { border-bottom: none; }
        .hta-portal-page .hta-data-table td { font-size: 1.1rem; font-weight: 500; }
        .hta-portal-page .hta-content-list { list-style: none; padding: 0; margin: 0; }
        .hta-portal-page .hta-content-list li {
          padding: var(--spacing-sm) 0; border-bottom: 1px solid rgba(255, 255, 255, 0.2);
          font-size: 1.1rem; font-weight: 500;
        }
        .hta-portal-page .hta-content-list li:last-child { border-bottom: none; }
        @media (max-width: 992px) {
          .hta-portal-page .hta-hero-content, .hta-portal-page .hta-tabs-wrapper {
            grid-template-columns: 1fr;
          }
          .hta-portal-page .hta-hero-video-block { margin-top: var(--spacing-xl); }
          .hta-portal-page h1 { font-size: 2.5rem; }
          .hta-portal-page .hta-tabs-list { flex-direction: row; flex-wrap: wrap; }
          .hta-portal-page .hta-tab-btn {
            flex: 1 1 auto; text-align: center;
            border-left: 1px solid rgba(0,0,0,0.05); border-bottom: 4px solid transparent;
          }
          .hta-portal-page .hta-tab-btn:hover, .hta-portal-page .hta-tab-btn.active {
            transform: translateX(0); border-left: 1px solid rgba(0,0,0,0.05);
          }
          .hta-portal-page .hta-tab-btn:hover, .hta-portal-page .hta-tab-btn.active { border-bottom-color: var(--color-coral); }
        }
        @media (max-width: 768px) {
          .hta-portal-page .hta-btn-group { flex-direction: column; }
          .hta-portal-page .hta-section { padding: var(--spacing-xl) 0; }
        }
      `}</style>

      <div className="hta-portal-page" style={{ paddingTop: "180px" }}>
        {/* Hero Section */}
        <section className="hta-hero">
          <div className="hta-container hta-hero-content">
            <div className="hta-hero-text-block">
              <h1>What to know about the portal</h1>
              <p className="hta-support-text">Follow this structured guidance to successfully navigate the funding application streams and grow your business.</p>
              <div className="hta-btn-group">
                <a href="https://dev-online.sa-transformationfund.co.za" className="hta-btn hta-btn-primary" aria-label="Login to Portal">Login</a>
                <a href="https://dev-online.sa-transformationfund.co.za/Account/Register" className="hta-btn hta-btn-secondary" aria-label="Register for Portal">Register</a>
              </div>
            </div>
            <div className="hta-hero-video-block">
              <div className="hta-video-wrapper">
                {showVideo ? (
                  <>
                    <div ref={playerContainerRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />
                    {videoEnded && (
                      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 10, cursor: 'pointer', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={handleReplay}>
                        <img
                          src="https://img.youtube.com/vi/8UX1guPBADg/hqdefault.jpg"
                          alt="Video ended"
                          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                        <div style={{ position: 'relative', zIndex: 1, width: 64, height: 64, borderRadius: '50%', background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <RotateCcw style={{ width: 28, height: 28, color: '#fff' }} />
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <button
                    onClick={() => setShowVideo(true)}
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', cursor: 'pointer', background: '#000', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    aria-label="Play video"
                  >
                    <img
                      src="https://img.youtube.com/vi/8UX1guPBADg/hqdefault.jpg"
                      alt="Video thumbnail"
                      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                      loading="lazy"
                    />
                    <div style={{ position: 'relative', zIndex: 1, width: 64, height: 64, borderRadius: '50%', background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Play style={{ width: 32, height: 32, color: '#fff', marginLeft: 4 }} />
                    </div>
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Tabs Section */}
        <main>
          <section style={{ padding: "var(--spacing-xl) 0 var(--spacing-xl) 0", backgroundColor: "var(--color-gray-light)" }}>
            <div className="hta-container">
              <div style={{ paddingBottom: "var(--spacing-md)", marginBottom: "var(--spacing-lg)" }}>
                <h2 style={{ color: "#000000", fontSize: "clamp(2rem, 4vw, 3rem)", margin: 0 }}>Access Streams:</h2>
              </div>

              <div className="hta-tabs-wrapper">
                <div className="hta-tabs-list">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      className={`hta-tab-btn${activeTab === tab.id ? " active" : ""}`}
                      onClick={() => setActiveTab(tab.id)}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                <div className="hta-tab-content-container">
                  {/* Tab 1: Access to Capital */}
                  <div className={`hta-tab-pane hta-bg-navy${activeTab === "tab-capital" ? " active" : ""}`}>
                    <h2>1. Access to Capital (R13bn)</h2>
                    <table className="hta-data-table">
                      <thead>
                        <tr><th>Funding Partner</th><th>Notes</th></tr>
                      </thead>
                      <tbody>
                        <tr><td>Afreximbank (African Export-Import Bank)</td><td>Direct</td></tr>
                        <tr><td>African Bank</td><td>R300m</td></tr>
                        <tr><td>National Empowerment Fund (NEF)</td><td>R1.2bn</td></tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Tab 2: Access to Markets */}
                  <div className={`hta-tab-pane hta-bg-navy${activeTab === "tab-markets" ? " active" : ""}`}>
                    <h2>2. Access to Markets</h2>
                    <table className="hta-data-table">
                      <thead>
                        <tr><th>Market Partners</th></tr>
                      </thead>
                      <tbody>
                        <tr><td>Uber</td></tr>
                        <tr><td>PepsiCo</td></tr>
                        <tr><td>NAAMSA</td></tr>
                        <tr><td>Proudly South African</td></tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Tab 3: Access to Capabilities */}
                  <div className={`hta-tab-pane hta-bg-navy${activeTab === "tab-capabilities" ? " active" : ""}`}>
                    <h2>3. Access to Capabilities</h2>
                    <table className="hta-data-table">
                      <thead>
                        <tr><th>Capability Partners</th></tr>
                      </thead>
                      <tbody>
                        <tr><td>Sector Education and Training Authorities (SETAs)</td></tr>
                        <tr><td>Takealot</td></tr>
                        <tr><td>Johannesburg Stock Exchange (JSE)</td></tr>
                        <tr><td>African Bank</td></tr>
                        <tr><td>Uber</td></tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Tab 4: Other Aggregators */}
                  <div className={`hta-tab-pane hta-bg-navy${activeTab === "tab-aggregators" ? " active" : ""}`}>
                    <h2>4. Other Aggregators</h2>
                    <table className="hta-data-table">
                      <thead>
                        <tr><th>Aggregators</th></tr>
                      </thead>
                      <tbody>
                        <tr><td>Vodacom</td></tr>
                        <tr><td>PepsiCo</td></tr>
                        <tr><td>Tirisano Fund</td></tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Tab 5: Sectors */}
                  <div className={`hta-tab-pane hta-bg-navy${activeTab === "tab-sectors" ? " active" : ""}`}>
                    <h2>Sectors</h2>
                    <ul className="hta-content-list">
                      <li>Industrialisation</li>
                      <li>Finance</li>
                      <li>Mining</li>
                      <li>Agroprocessing</li>
                      <li>Pharmaceutical</li>
                      <li>Etc.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>

      <Footer />
    </>
  );
});

Uat2HtaPortalPage.displayName = "Uat2HtaPortalPage";

export default Uat2HtaPortalPage;
