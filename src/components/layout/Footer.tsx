const Footer = () => {
  return (
    <footer className="w-full mt-auto">
      <div className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <p className="text-sm font-medium">VoteVichar</p>
              <p className="text-xs opacity-80">
                Data-driven insights for election synchronization policy
              </p>
            </div>
            
            <div className="flex items-center gap-6 text-xs opacity-80">
              <span>Policy Simulation Platform</span>
              <span>•</span>
              <span>Neutral & Evidence-Based</span>
            </div>
          </div>
        </div>
      </div>
      {/* Tricolor bar */}
      <div className="tricolor-bar" />
    </footer>
  );
};

export default Footer;