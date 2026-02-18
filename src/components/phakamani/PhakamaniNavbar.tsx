import { useState, useCallback, memo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { SearchDialog, SearchTrigger } from "@/components/search";
import SocialIconsRow from "@/components/shared/SocialIconsRow";

const PhakamaniNavbar = memo(() => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [pathToFundingDropdownOpen, setPathToFundingDropdownOpen] = useState(false);
  const [investorsDropdownOpen, setInvestorsDropdownOpen] = useState(false);
  const [resourcesDropdownOpen, setResourcesDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const isWhySection = location.pathname.startsWith("/about/why");
  const isPathToFundingSection = location.pathname.startsWith("/path-to-funding");
  const isAboutPage = location.pathname === "/about";
  const isContactsPage = location.pathname === "/contacts";
  const isNewsMediaPage = location.pathname === "/news-media";
  const isResourcesPage = location.pathname === "/resources";
  const isInvestorsSection = location.pathname.startsWith("/investors");

  const handlePathToFundingLink = useCallback((e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    setPathToFundingDropdownOpen(false);
    
    if (location.pathname === "/path-to-funding") {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(`/path-to-funding#${sectionId}`);
    }
  }, [location.pathname, navigate]);

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen(prev => !prev);
  }, []);

  const openSearch = useCallback(() => {
    setSearchOpen(true);
  }, []);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full h-[100px] lg:h-[120px] bg-white border-b border-gray-200 z-50 shadow-sm" role="navigation" aria-label="Main navigation">
        <div className="flex items-center w-full max-w-[1400px] h-full mx-auto px-4 lg:px-10">
          {/* Logo */}
          <Link to="/" className="h-[80px] lg:h-[100px] flex items-center mr-8 lg:mr-16 flex-shrink-0" onClick={closeMobileMenu}>
            <img 
              src="https://sa-transformationfund.co.za/images/logo-transformation-fund.jpg" 
              alt="Transformation Fund"
              className="h-full w-auto object-contain"
              loading="eager"
              fetchPriority="high"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1 mr-auto">
            {/* About Dropdown (includes Why sub-nav) */}
            <div 
              className="relative dropdown"
              onMouseEnter={() => setAboutDropdownOpen(true)}
              onMouseLeave={() => setAboutDropdownOpen(false)}
            >
              <Link 
                to="/about" 
                className={`nav-link flex items-center ${isAboutPage || isWhySection ? 'nav-link-active' : ''}`}
              >
                About
                <ChevronDown className="ml-1 h-4 w-4" />
              </Link>
              {aboutDropdownOpen && (
                <div className="dropdown-menu">
                  <Link to="/about/why" className={`dropdown-item font-bold ${location.pathname === '/about/why' ? 'bg-[#004d30]' : ''}`} onClick={() => setAboutDropdownOpen(false)}>Why</Link>
                  <div className="ml-4 border-l-4 border-[#007847]">
                    <Link to="/about/why/policy-choice" className={`dropdown-item pl-6 text-sm hover:!text-white flex items-center gap-2 ${location.pathname === '/about/why/policy-choice' ? 'text-white bg-[#004d30]' : 'text-white/70'}`} onClick={() => setAboutDropdownOpen(false)}><span className="w-1.5 h-1.5 rounded-full bg-[#007847] flex-shrink-0" />Policy Choice</Link>
                    <Link to="/about/why/theory" className={`dropdown-item pl-6 text-sm hover:!text-white flex items-center gap-2 ${location.pathname === '/about/why/theory' ? 'text-white bg-[#004d30]' : 'text-white/70'}`} onClick={() => setAboutDropdownOpen(false)}><span className="w-1.5 h-1.5 rounded-full bg-[#007847] flex-shrink-0" />Theory</Link>
                    <Link to="/about/why/value" className={`dropdown-item pl-6 text-sm hover:!text-white flex items-center gap-2 ${location.pathname === '/about/why/value' ? 'text-white bg-[#004d30]' : 'text-white/70'}`} onClick={() => setAboutDropdownOpen(false)}><span className="w-1.5 h-1.5 rounded-full bg-[#007847] flex-shrink-0" />Value</Link>
                    <Link to="/about/why/operating-model" className={`dropdown-item pl-6 text-sm hover:!text-white flex items-center gap-2 ${location.pathname === '/about/why/operating-model' ? 'text-white bg-[#004d30]' : 'text-white/70'}`} onClick={() => setAboutDropdownOpen(false)}><span className="w-1.5 h-1.5 rounded-full bg-[#007847] flex-shrink-0" />Operating Model</Link>
                    <Link to="/about/why/national-agenda" className={`dropdown-item pl-6 text-sm hover:!text-white flex items-center gap-2 ${location.pathname === '/about/why/national-agenda' ? 'text-white bg-[#004d30]' : 'text-white/70'}`} onClick={() => setAboutDropdownOpen(false)}><span className="w-1.5 h-1.5 rounded-full bg-[#007847] flex-shrink-0" />National Agenda</Link>
                  </div>
                </div>
              )}
            </div>

            {/* Path to Funding Dropdown */}
            <div 
              className="relative dropdown"
              onMouseEnter={() => setPathToFundingDropdownOpen(true)}
              onMouseLeave={() => setPathToFundingDropdownOpen(false)}
            >
              <Link 
                to="/path-to-funding" 
                className={`nav-link flex items-center ${isPathToFundingSection ? 'nav-link-active' : ''}`}
              >
                Eligibility & criteria
                <ChevronDown className="ml-1 h-4 w-4" />
              </Link>
              {pathToFundingDropdownOpen && (
                <div className="dropdown-menu">
                  <Link to="/path-to-funding/process" className="dropdown-item" onClick={() => setPathToFundingDropdownOpen(false)}>Funding Process</Link>
                  <Link to="/path-to-funding/market-segments" className="dropdown-item" onClick={() => setPathToFundingDropdownOpen(false)}>Market segments</Link>
                  <Link to="/path-to-funding/products" className="dropdown-item" onClick={() => setPathToFundingDropdownOpen(false)}>Products</Link>
                  <a href="/path-to-funding#path-to-funding" className="dropdown-item" onClick={(e) => handlePathToFundingLink(e, 'path-to-funding')}>Funding Conditions</a>
                  <a href="/path-to-funding#how-it-works" className="dropdown-item" onClick={(e) => handlePathToFundingLink(e, 'how-it-works')}>Investment Criteria</a>
                </div>
              )}
            </div>

            {/* Investors Dropdown */}
            <div 
              className="relative dropdown"
              onMouseEnter={() => setInvestorsDropdownOpen(true)}
              onMouseLeave={() => setInvestorsDropdownOpen(false)}
            >
              <Link 
                to="/investors" 
                className={`nav-link flex items-center ${isInvestorsSection ? 'nav-link-active' : ''}`}
              >
                Investors
                <ChevronDown className="ml-1 h-4 w-4" />
              </Link>
              {investorsDropdownOpen && (
                <div className="dropdown-menu">
                  <Link to="/investors/governance" className="dropdown-item" onClick={() => setInvestorsDropdownOpen(false)}>Governance</Link>
                </div>
              )}
            </div>

            {/* News & Stories Link */}
            <Link 
              to="/news-media" 
              className={`nav-link ${isNewsMediaPage ? 'nav-link-active' : ''}`}
            >
              News & Stories
            </Link>

            {/* Resources Dropdown */}
            <div 
              className="relative dropdown"
              onMouseEnter={() => setResourcesDropdownOpen(true)}
              onMouseLeave={() => setResourcesDropdownOpen(false)}
            >
              <Link 
                to="/resources" 
                className={`nav-link flex items-center ${isResourcesPage || location.pathname === '/faq' ? 'nav-link-active' : ''}`}
              >
                Resources
                <ChevronDown className="ml-1 h-4 w-4" />
              </Link>
              {resourcesDropdownOpen && (
                <div className="dropdown-menu">
                  <Link to="/faq" className="dropdown-item" onClick={() => setResourcesDropdownOpen(false)}>FAQ</Link>
                  <a 
                    href="/resources/TransformationFundDocument_v2.4_28Sept25.pdf" 
                    className="dropdown-item" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    TF Framework
                  </a>
                  <a 
                    href="/resources/Transformation_Fund_Executive_Summary_v1_29Sept.pdf" 
                    className="dropdown-item" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    TF Executive Summary
                  </a>
                </div>
              )}
            </div>

            <Link to="/contacts" className={`nav-link ${isContactsPage ? 'nav-link-active' : ''}`}>Contacts</Link>
            
            
            <SearchTrigger onClick={openSearch} />
          </div>

          {/* CTA Button - Desktop */}
          <a 
            href="https://tfportaltest-bjggc8febhc3aucy.southafricanorth-01.azurewebsites.net/" 
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:block phakamani-nav-cta"
          >
            PORTAL LOGIN
          </a>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center gap-2 ml-auto">
            <SearchTrigger onClick={openSearch} variant="mobile" />
            <button 
              onClick={toggleMobileMenu}
              className="text-gray-700 hover:text-[#007847] focus:outline-none p-2"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200 max-h-[calc(100vh-100px)] overflow-y-auto">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link to="/about" className={`block px-3 py-2 text-base font-bold ${isAboutPage || isWhySection ? 'text-[#007847]' : 'text-gray-700 hover:text-[#007847]'}`} onClick={closeMobileMenu}>About</Link>
              <Link to="/about/why" className={`block px-3 py-2 pl-6 text-base font-bold ${isWhySection ? 'text-[#007847]' : 'text-gray-700 hover:text-[#007847]'}`} onClick={closeMobileMenu}>Why</Link>
              <Link to="/about/why/policy-choice" className={`flex items-center gap-2 hover:text-[#007847] px-3 py-2 pl-14 text-sm border-l-4 border-[#007847] ml-6 ${location.pathname === '/about/why/policy-choice' ? 'text-[#007847] font-bold' : 'text-gray-600'}`} onClick={closeMobileMenu}><span className="w-1.5 h-1.5 rounded-full bg-[#007847] flex-shrink-0" />Policy Choice</Link>
              <Link to="/about/why/theory" className={`flex items-center gap-2 hover:text-[#007847] px-3 py-2 pl-14 text-sm border-l-4 border-[#007847] ml-6 ${location.pathname === '/about/why/theory' ? 'text-[#007847] font-bold' : 'text-gray-600'}`} onClick={closeMobileMenu}><span className="w-1.5 h-1.5 rounded-full bg-[#007847] flex-shrink-0" />Theory</Link>
              <Link to="/about/why/value" className={`flex items-center gap-2 hover:text-[#007847] px-3 py-2 pl-14 text-sm border-l-4 border-[#007847] ml-6 ${location.pathname === '/about/why/value' ? 'text-[#007847] font-bold' : 'text-gray-600'}`} onClick={closeMobileMenu}><span className="w-1.5 h-1.5 rounded-full bg-[#007847] flex-shrink-0" />Value</Link>
              <Link to="/about/why/operating-model" className={`flex items-center gap-2 hover:text-[#007847] px-3 py-2 pl-14 text-sm border-l-4 border-[#007847] ml-6 ${location.pathname === '/about/why/operating-model' ? 'text-[#007847] font-bold' : 'text-gray-600'}`} onClick={closeMobileMenu}><span className="w-1.5 h-1.5 rounded-full bg-[#007847] flex-shrink-0" />Operating Model</Link>
              <Link to="/about/why/national-agenda" className={`flex items-center gap-2 hover:text-[#007847] px-3 py-2 pl-14 text-sm border-l-4 border-[#007847] ml-6 ${location.pathname === '/about/why/national-agenda' ? 'text-[#007847] font-bold' : 'text-gray-600'}`} onClick={closeMobileMenu}><span className="w-1.5 h-1.5 rounded-full bg-[#007847] flex-shrink-0" />National Agenda</Link>
              
              <Link to="/path-to-funding" className={`block px-3 py-2 text-base font-bold ${isPathToFundingSection ? 'text-[#007847]' : 'text-gray-700 hover:text-[#007847]'}`} onClick={closeMobileMenu}>Eligibility & criteria</Link>
              <Link to="/path-to-funding/process" className="block text-gray-700 hover:text-[#007847] px-3 py-2 pl-6 text-sm font-semibold" onClick={closeMobileMenu}>Funding Process</Link>
              <Link to="/path-to-funding/market-segments" className="block text-gray-700 hover:text-[#007847] px-3 py-2 pl-6 text-sm font-semibold" onClick={closeMobileMenu}>Market segments</Link>
              <Link to="/path-to-funding/products" className="block text-gray-700 hover:text-[#007847] px-3 py-2 pl-6 text-sm font-semibold" onClick={closeMobileMenu}>Products</Link>
              <a href="/path-to-funding#path-to-funding" className="block text-gray-700 hover:text-[#007847] px-3 py-2 pl-6 text-sm font-semibold" onClick={(e) => handlePathToFundingLink(e, 'path-to-funding')}>Funding Conditions</a>
              <a href="/path-to-funding#how-it-works" className="block text-gray-700 hover:text-[#007847] px-3 py-2 pl-6 text-sm font-semibold" onClick={(e) => handlePathToFundingLink(e, 'how-it-works')}>Investment Criteria</a>
              <Link to="/investors" className={`block px-3 py-2 text-base font-bold ${isInvestorsSection ? 'text-[#007847]' : 'text-gray-700 hover:text-[#007847]'}`} onClick={closeMobileMenu}>Investors</Link>
              <Link to="/investors/governance" className="block text-gray-700 hover:text-[#007847] px-3 py-2 pl-6 text-sm font-semibold" onClick={closeMobileMenu}>Governance</Link>
              <Link to="/news-media" className={`block px-3 py-2 text-base font-bold ${isNewsMediaPage ? 'text-[#007847]' : 'text-gray-700 hover:text-[#007847]'}`} onClick={closeMobileMenu}>News & Stories</Link>
              <Link to="/resources" className={`block px-3 py-2 text-base font-bold ${isResourcesPage ? 'text-[#007847]' : 'text-gray-700 hover:text-[#007847]'}`} onClick={closeMobileMenu}>Resources</Link>
              <Link to="/faq" className="block text-gray-700 hover:text-[#007847] px-3 py-2 pl-6 text-sm font-semibold" onClick={closeMobileMenu}>FAQ</Link>
              <a href="/resources/TransformationFundDocument_v2.4_28Sept25.pdf" target="_blank" rel="noopener noreferrer" className="block text-gray-700 hover:text-[#007847] px-3 py-2 pl-6 text-sm font-semibold">TF Framework</a>
              <a href="/resources/Transformation_Fund_Executive_Summary_v1_29Sept.pdf" target="_blank" rel="noopener noreferrer" className="block text-gray-700 hover:text-[#007847] px-3 py-2 pl-6 text-sm font-semibold">TF Executive Summary</a>
              <Link to="/contacts" className={`block px-3 py-2 text-base font-bold ${isContactsPage ? 'text-[#007847]' : 'text-gray-700 hover:text-[#007847]'}`} onClick={closeMobileMenu}>Contacts</Link>
              
              
              <a href="https://tfportaltest-bjggc8febhc3aucy.southafricanorth-01.azurewebsites.net/" target="_blank" rel="noopener noreferrer" className="block bg-[#007847] text-white px-3 py-2 text-base font-bold hover:opacity-90 transition-all">Portal Login</a>
            </div>
          </div>
        )}
      </nav>

      {/* Social Icons Bar - Fixed position below navbar */}
      <div className="fixed top-[100px] lg:top-[120px] left-0 w-full bg-white z-40">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-10 py-3">
          <SocialIconsRow className="!mb-2 !justify-start" />
          <span className="font-mono text-[#00703C] font-bold text-sm">
            // Be sure to follow our socials
          </span>
        </div>
      </div>

      {/* Search Dialog */}
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
});

PhakamaniNavbar.displayName = "PhakamaniNavbar";

export default PhakamaniNavbar;
