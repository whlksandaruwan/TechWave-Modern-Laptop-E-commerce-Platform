import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-tech-dark text-tech-light">
      {/* Navigation Bar */}
      <nav className="fixed top-0 w-full bg-tech-gray/80 backdrop-blur-md border-b border-tech-primary/20 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <span className="text-tech-primary font-mono font-bold text-xl">
                Tech<span className="text-tech-secondary">Hub</span>
              </span>
            </div>
            <div className="hidden md:block">
              <div className="flex items-center space-x-4">
                <NavLink href="#home">Home</NavLink>
                <NavLink href="#features">Features</NavLink>
                <NavLink href="#about">About</NavLink>
                <NavLink href="#contact">Contact</NavLink>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-tech-gray/50 border-t border-tech-primary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-tech-primary/60 text-sm">
              © 2024 TechHub. All rights reserved.
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <FooterLink href="#privacy">Privacy Policy</FooterLink>
              <FooterLink href="#terms">Terms of Service</FooterLink>
              <FooterLink href="#contact">Contact Us</FooterLink>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

const NavLink = ({ href, children }: { href: string; children: ReactNode }) => (
  <a
    href={href}
    className="text-tech-light/70 hover:text-tech-primary px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-tech-primary/10"
  >
    {children}
  </a>
);

const FooterLink = ({ href, children }: { href: string; children: ReactNode }) => (
  <a
    href={href}
    className="text-tech-light/50 hover:text-tech-primary text-sm transition-colors duration-200"
  >
    {children}
  </a>
); 