import { useState, useCallback, memo, useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TfMenu, TfClose, TfChevronDown } from "@/components/icons";
import { SearchDialog, SearchTrigger } from "@/components/search";
import SocialIconsRow from "@/components/shared/SocialIconsRow";
import { useNavItems, useDocuments, signedDocumentUrl } from "@/hooks/useCms";
import { useHiddenRoutes } from "@/hooks/usePageVisibility";
import { matchesRoute } from "@/lib/site-routes";
import { buildMenuTree, DEFAULT_MENU, isExternal, isFileLink, type MenuNode } from "@/lib/navigation";

const PORTAL_HREF = "/uat2_hta_portal";

const openDocument = async (storagePath: string) => {
  const url = await signedDocumentUrl(storagePath);
  if (url) window.open(url, "_blank", "noopener,noreferrer");
};

const PhakamaniNavbar = memo(() => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const { data: navItems } = useNavItems();
  const { data: documents } = useDocuments(true);
  const { hiddenRoutes } = useHiddenRoutes();
  const menu = useMemo(() => {
    const tree = buildMenuTree(navItems, documents) ?? DEFAULT_MENU;
    if (!hiddenRoutes.length) return tree;
    const isHidden = (href?: string | null) => {
      if (!href || /^https?:\/\//i.test(href)) return false;
      const path = href.split("#")[0] || "/";
      return hiddenRoutes.some((r) => matchesRoute(path, r));
    };
    const prune = (nodes: MenuNode[]): MenuNode[] =>
      nodes
        .filter((n) => !isHidden(n.href))
        .map((n) => ({ ...n, children: prune(n.children) }));
    return prune(tree);
  }, [navItems, documents, hiddenRoutes]);
  const isPortalSection = location.pathname.startsWith(PORTAL_HREF);

  const handleAnchorLink = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      setMobileMenuOpen(false);
      setOpenDropdown(null);
      const [path, sectionId] = href.split("#");
      if (location.pathname === path) {
        // Keep the URL in sync so the hash reflects the section being viewed.
        navigate(href, { replace: true });
        document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
      } else {
        navigate(href);
      }
    },
    [location.pathname, navigate]
  );

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen(prev => !prev);
  }, []);

  const openSearch = useCallback(() => {
    setSearchOpen(true);
  }, []);

  const isActive = (node: MenuNode) => {
    const paths = [node.href, ...node.children.map((c) => c.href)]
      .filter((h): h is string => !!h && h.startsWith("/") && !isFileLink(h))
      .map((h) => h.split("#")[0]);
    return paths.some((p) => location.pathname === p || (p !== "/" && location.pathname.startsWith(`${p}/`)));
  };

  /** Renders a single menu entry as the right kind of link (route, external, file, document or anchor). */
  const MenuLink = ({
    node,
    className,
    onNavigate,
    children,
  }: {
    node: MenuNode;
    className: string;
    onNavigate?: () => void;
    children?: React.ReactNode;
  }) => {
    const content = children ?? node.label;

    if (node.documentPath) {
      return (
        <a
          href="#"
          className={className}
          onClick={(e) => {
            e.preventDefault();
            onNavigate?.();
            openDocument(node.documentPath!);
          }}
        >
          {content}
        </a>
      );
    }

    if (!node.href) {
      return <span className={`${className} cursor-pointer`}>{content}</span>;
    }

    if (isExternal(node.href) || isFileLink(node.href)) {
      return (
        <a href={node.href} target="_blank" rel="noopener noreferrer" className={className} onClick={onNavigate}>
          {content}
        </a>
      );
    }

    if (node.href.includes("#")) {
      return (
        <a href={node.href} className={className} onClick={(e) => handleAnchorLink(e, node.href!)}>
          {content}
        </a>
      );
    }

    return (
      <Link to={node.href} className={className} onClick={onNavigate}>
        {content}
      </Link>
    );
  };

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
            {menu.map((node) => {
              const isPortal = node.href === PORTAL_HREF;
              const triggerClass = isPortal
                ? `flex items-center px-4 py-2 rounded bg-[#007847] text-white font-bold text-sm tracking-wide hover:bg-[#005c36] transition-colors ${isPortalSection ? "ring-2 ring-[#007847] ring-offset-2" : ""}`
                : `nav-link flex items-center ${isActive(node) ? "nav-link-active" : ""}`;

              if (!node.children.length) {
                return (
                  <MenuLink key={node.id} node={node} className={triggerClass}>
                    {node.label}
                  </MenuLink>
                );
              }

              return (
                <div
                  key={node.id}
                  className="relative dropdown"
                  onMouseEnter={() => setOpenDropdown(node.id)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <MenuLink node={node} className={triggerClass}>
                    <>
                      {node.label}
                      <TfChevronDown className="ml-1 h-4 w-4" />
                    </>
                  </MenuLink>
                  {openDropdown === node.id && (
                    <div className="dropdown-menu">
                      {node.children.map((child) => (
                        <MenuLink
                          key={child.id}
                          node={child}
                          className={`dropdown-item ${child.href && location.pathname === child.href ? "bg-[#004d30]" : ""}`}
                          onNavigate={() => setOpenDropdown(null)}
                        />
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

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
              {mobileMenuOpen ? <TfClose className="h-6 w-6" /> : <TfMenu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile TfMenu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200 max-h-[calc(100vh-100px)] overflow-y-auto">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {menu.map((node) => (
                <div key={node.id}>
                  <MenuLink
                    node={node}
                    className={`block px-3 py-2 text-base font-bold ${isActive(node) ? "text-[#007847]" : "text-gray-700 hover:text-[#007847]"}`}
                    onNavigate={closeMobileMenu}
                  />
                  {node.children.map((child) => (
                    <MenuLink
                      key={child.id}
                      node={child}
                      className={`block px-3 py-2 pl-6 text-sm font-semibold ${child.href && location.pathname === child.href ? "text-[#007847]" : "text-gray-700 hover:text-[#007847]"}`}
                      onNavigate={closeMobileMenu}
                    />
                  ))}
                </div>
              ))}
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
            Follow us on social media to stay updated
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
