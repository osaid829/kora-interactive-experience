import { siteConfig } from "@/config/site";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-8 text-center select-none">
      <div className="max-w-2xl space-y-6">
        <p className="text-xs uppercase tracking-[0.3em] text-accent font-medium">
          {siteConfig.brand.nativeScript} • {siteConfig.brand.name}
        </p>
        <h1 className="font-serif text-4xl sm:text-6xl text-foreground font-light tracking-tight">
          {siteConfig.brand.tagline}
        </h1>
        <p className="text-sm sm:text-base text-muted font-light max-w-lg mx-auto leading-relaxed">
          {siteConfig.brand.positioning}
        </p>
        <div className="pt-8 flex items-center justify-center gap-4 text-xs text-muted/60">
          <span>Direction Locked</span>
          <span>•</span>
          <span>Awaiting Phase 2 Authorization</span>
        </div>
      </div>
    </main>
  );
}
