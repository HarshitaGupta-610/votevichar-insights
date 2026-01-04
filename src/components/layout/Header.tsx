import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/votevichar-logo.png";

const Header = () => {
  const location = useLocation();
  const isLandingPage = location.pathname === "/";

  return (
    <header className="w-full">
      {/* Tricolor bar */}
      <div className="tricolor-bar" />
      
      <div className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="VoteVichar Logo" className="h-10 w-auto" />
          </Link>
          
          {!isLandingPage && (
            <nav className="flex items-center gap-6">
              <Link 
                to="/dashboard" 
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Dashboard
              </Link>
              <Link 
                to="/comparison" 
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                History
              </Link>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;