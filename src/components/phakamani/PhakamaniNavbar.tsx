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
  const [portalDropdownOpen, setPortalDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const isWhySection = location.pathname.startsWith("/about/why");
  const isPathToFundingSection = location.pathname.startsWith("/eligibility");
  const isAboutPage = location.pathname === "/about";
  const isContactsPage = location.pathname === "/contacts";
  const isNewsMediaPage = location.pathname === "/news-media";
  const isResourcesPage = location.pathname === "/resources";
  const isCareersPage = location.pathname.startsWith("/careers");
  const isInvestorsSection = location.pathname.startsWith("/investors");
  const isPortalSection = location.pathname.startsWith("/uat2_hta_portal");

  const handlePathToFundingLink = useCallback((e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    setPathToFundingDropdownOpen(false);
    
    if (location.pathname === "/eligibility") {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(`/eligibility#${sectionId}`);
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
              src="/images/logo-transformation-fund.jpg" 
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
                  <Link to="/about/why" className={`dropdown-item font-bold ${location.pathname === '/about/why' ? 'bg-[#004d30]' : ''}`} onClick={() => setAboutDropdownOpen(false)}>Fund purpose</Link>
                  <Link to="/about/why/policy-choice" className={`dropdown-item font-bold ${location.pathname === '/about/why/policy-choice' ? 'bg-[#004d30]' : ''}`} onClick={() => setAboutDropdownOpen(false)}>Fund Policy</Link>
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
                to="/eligibility" 
                className={`nav-link flex items-center ${isPathToFundingSection ? 'nav-link-active' : ''}`}
              >
                Eligibility
                <ChevronDown className="ml-1 h-4 w-4" />
              </Link>
              {pathToFundingDropdownOpen && (
                <div className="dropdown-menu">
                  <Link to="/eligibility/process" className="dropdown-item" onClick={() => setPathToFundingDropdownOpen(false)}>Funding Process</Link>
                  <Link to="/eligibility/market-segments" className="dropdown-item" onClick={() => setPathToFundingDropdownOpen(false)}>Market segments</Link>
                  <Link to="/eligibility/products" className="dropdown-item" onClick={() => setPathToFundingDropdownOpen(false)}>Products</Link>
                  <a href="/eligibility#path-to-funding" className="dropdown-item" onClick={(e) => handlePathToFundingLink(e, 'path-to-funding')}>Eligibility Checklist</a>
                </div>
              )}
            </div>

            {/* Investorss Dropdown */}
            <div 
              className="relative dropdown"
              onMouseEnter={() => setInvestorsDropdownOpen(true)}
              onMouseLeave={() => setInvestorsDropdownOpen(false)}
            >
              <span 
                className={`nav-link flex items-center cursor-pointer ${isInvestorsSection ? 'nav-link-active' : ''}`}
              >
                Investors
                <ChevronDown className="ml-1 h-4 w-4" />
              </span>
              {investorsDropdownOpen && (
                <div className="dropdown-menu">
                  <Link to="/investors" className={`dropdown-item ${location.pathname === '/investors' ? 'bg-[#004d30]' : ''}`} onClick={() => setInvestorsDropdownOpen(false)}>Capitalisation</Link>
                  <Link to="/investors/governance" className="dropdown-item" onClick={() => setInvestorsDropdownOpen(false)}>Governance</Link>
                </div>
              )}
            </div>

            {/* News & Stories Link */}
            <Link 
              to="/news-media" 
              className={`nav-link ${isNewsMediaPage ? 'nav-link-active' : ''}`}
            >
              News
            </Link>

            {/* Resources Dropdown */}
            <div 
              className="relative dropdown"
              onMouseEnter={() => setResourcesDropdownOpen(true)}
              onMouseLeave={() => setResourcesDropdownOpen(false)}
            >
              <Link 
                to="/resources" 
                className={`nav-link flex items-center ${isResourcesPage || location.pathname === '/faq' || isCareersPage ? 'nav-link-active' : ''}`}
              >
                Resources
                <ChevronDown className="ml-1 h-4 w-4" />
              </Link>
              {resourcesDropdownOpen && (
                <div className="dropdown-menu">
                  <Link to="/faq" className="dropdown-item" onClick={() => setResourcesDropdownOpen(false)}>FAQ</Link>
                  <Link to="/careers" className="dropdown-item" onClick={() => setResourcesDropdownOpen(false)}>Careers</Link>
                </div>
              )}
            </div>

            <Link to="/contacts" className={`nav-link ${isContactsPage ? 'nav-link-active' : ''}`}>Contacts</Link>
            
            {/* uat2_hta_portal Dropdown */}
            <div 
              className="relative dropdown"
              onMouseEnter={() => setPortalDropdownOpen(true)}
              onMouseLeave={() => setPortalDropdownOpen(false)}
            >
              <Link 
                to="/uat2_hta_portal" 
                className={`flex items-center px-4 py-2 rounded bg-[#007847] text-white font-bold text-sm tracking-wide hover:bg-[#005c36] transition-colors ${isPortalSection ? 'ring-2 ring-[#007847] ring-offset-2' : ''}`}
              >
                Portal
                <ChevronDown className="ml-1 h-4 w-4" />
              </Link>
              {portalDropdownOpen && (
                <div className="dropdown-menu">
                  <a href="https://dev-online.sa-transformationfund.co.za/" target="_blank" rel="noopener noreferrer" className="dropdown-item" onClick={() => setPortalDropdownOpen(false)}>Login</a>
                  <a href="https://dev-online.sa-transformationfund.co.za/Account/Register" target="_blank" rel="noopener noreferrer" className="dropdown-item" onClick={() => setPortalDropdownOpen(false)}>Register</a>
                </div>
              )}
            </div>
            
            <SearchTrigger onClick={openSearch} />
          </div>


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
              <Link to="/about/why" className={`block px-3 py-2 pl-6 text-base font-bold ${isWhySection && location.pathname !== '/about/why/policy-choice' ? 'text-[#007847]' : 'text-gray-700 hover:text-[#007847]'}`} onClick={closeMobileMenu}>Fund purpose</Link>
              <Link to="/about/why/policy-choice" className={`block px-3 py-2 pl-6 text-base font-bold ${location.pathname === '/about/why/policy-choice' ? 'text-[#007847]' : 'text-gray-700 hover:text-[#007847]'}`} onClick={closeMobileMenu}>Fund Policy</Link>
              
              <Link to="/eligibility" className={`block px-3 py-2 text-base font-bold ${isPathToFundingSection ? 'text-[#007847]' : 'text-gray-700 hover:text-[#007847]'}`} onClick={closeMobileMenu}>Eligibility</Link>
              <Link to="/eligibility/process" className="block text-gray-700 hover:text-[#007847] px-3 py-2 pl-6 text-sm font-semibold" onClick={closeMobileMenu}>Funding Process</Link>
              <Link to="/eligibility/market-segments" className="block text-gray-700 hover:text-[#007847] px-3 py-2 pl-6 text-sm font-semibold" onClick={closeMobileMenu}>Market segments</Link>
              <Link to="/eligibility/products" className="block text-gray-700 hover:text-[#007847] px-3 py-2 pl-6 text-sm font-semibold" onClick={closeMobileMenu}>Products</Link>
              <a href="/eligibility#path-to-funding" className="block text-gray-700 hover:text-[#007847] px-3 py-2 pl-6 text-sm font-semibold" onClick={(e) => handlePathToFundingLink(e, 'path-to-funding')}>Eligibility Checklist</a>
              <span className="block px-3 py-2 text-base font-bold text-gray-700 cursor-default">Investors</span>
              <Link to="/investors" className={`block text-gray-700 hover:text-[#007847] px-3 py-2 pl-6 text-sm font-semibold ${location.pathname === '/investors' ? 'text-[#007847]' : ''}`} onClick={closeMobileMenu}>Capitalisation</Link>
              <Link to="/investors/governance" className="block text-gray-700 hover:text-[#007847] px-3 py-2 pl-6 text-sm font-semibold" onClick={closeMobileMenu}>Governance</Link>
              <Link to="/news-media" className={`block px-3 py-2 text-base font-bold ${isNewsMediaPage ? 'text-[#007847]' : 'text-gray-700 hover:text-[#007847]'}`} onClick={closeMobileMenu}>News</Link>
              <Link to="/resources" className={`block px-3 py-2 text-base font-bold ${isResourcesPage ? 'text-[#007847]' : 'text-gray-700 hover:text-[#007847]'}`} onClick={closeMobileMenu}>Resources</Link>
              <Link to="/faq" className="block text-gray-700 hover:text-[#007847] px-3 py-2 pl-6 text-sm font-semibold" onClick={closeMobileMenu}>FAQ</Link>
              <Link to="/contacts" className={`block px-3 py-2 text-base font-bold ${isContactsPage ? 'text-[#007847]' : 'text-gray-700 hover:text-[#007847]'}`} onClick={closeMobileMenu}>Contacts</Link>
              
              <Link to="/uat2_hta_portal" className={`block px-3 py-2 text-base font-bold ${isPortalSection ? 'text-[#007847]' : 'text-gray-700 hover:text-[#007847]'}`} onClick={closeMobileMenu}>Portal</Link>
              <a href="https://dev-online.sa-transformationfund.co.za/" target="_blank" rel="noopener noreferrer" className="block text-gray-700 hover:text-[#007847] px-3 py-2 pl-6 text-sm font-semibold" onClick={closeMobileMenu}>Login</a>
              <a href="https://dev-online.sa-transformationfund.co.za/Account/Register" target="_blank" rel="noopener noreferrer" className="block text-gray-700 hover:text-[#007847] px-3 py-2 pl-6 text-sm font-semibold" onClick={closeMobileMenu}>Register</a>
              <a href="https://dev-online.sa-transformationfund.co.za/" target="_blank" rel="noopener noreferrer" className="block bg-[#007847] text-white px-3 py-2 text-base font-bold hover:opacity-90 transition-all">Login</a>
            </div>
          </div>
        )}
      </nav>

      {/* Social Icons Bar - Fixed position below navbar */}
      <div className="fixed top-[100px] lg:top-[120px] left-0 w-full bg-white z-40">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-10 py-3">
          <SocialIconsRow className="!mb-2 !justify-start" />
            <span className="font-mono text-[#00703C] font-bold text-sm">
            // Follow us on social media to stay updated
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
