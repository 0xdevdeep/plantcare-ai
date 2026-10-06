import React from 'react';
import { Sprout, Heart, GitBranch, Terminal, Shield } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-emerald-950/80 bg-[#060c07] py-12 text-xs text-emerald-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-emerald-950">
          
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300">
                <Sprout className="w-4 h-4 text-emerald-400" />
              </div>
              <span className="font-extrabold text-base tracking-tight text-white">
                TrailMate<span className="text-emerald-400">.ai</span>
              </span>
            </div>
            <p className="text-emerald-100/70 text-xs leading-relaxed max-w-sm">
              An open-source outdoor companion built for the <strong>“Touch Grass” AI challenge</strong>.
              Designed with one core mission: to make screens as brief and unnecessary as possible.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-emerald-400">
              <Shield className="w-3.5 h-3.5" />
              <span>100% Privacy-Preserving • Open Weights • Local Inference</span>
            </div>
          </div>

          <div className="md:col-span-3 space-y-2">
            <h5 className="font-bold text-white text-xs uppercase tracking-wider">Navigation</h5>
            <ul className="space-y-1.5">
              <li><a href="#planner" className="hover:text-emerald-400 transition-colors">AI Outdoor Planner</a></li>
              <li><a href="#how-it-works" className="hover:text-emerald-400 transition-colors">How It Works</a></li>
              <li><a href="#challenges" className="hover:text-emerald-400 transition-colors">Touch Grass Challenges</a></li>
              <li><a href="#why-open-ai" className="hover:text-emerald-400 transition-colors">Why Open AI?</a></li>
              <li><a href="#take-it-outside" className="hover:text-emerald-400 transition-colors">Take It Outside Checklist</a></li>
            </ul>
          </div>

          <div className="md:col-span-4 space-y-2">
            <h5 className="font-bold text-white text-xs uppercase tracking-wider">Open Intelligence</h5>
            <p className="text-emerald-100/60 leading-relaxed">
              Run inference locally without internet connection:
            </p>
            <div className="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-500/20 font-mono text-[11px] text-emerald-300 flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-emerald-400" />
              <span>ollama run llama3.2</span>
            </div>
          </div>

        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <div>
            &copy; {new Date().getFullYear()} TrailMate AI. Open Source under MIT License.
          </div>
          <div className="italic text-emerald-300/80">
            “Plan quickly &rarr; Leave the screen &rarr; Touch Grass.”
          </div>
        </div>

      </div>
    </footer>
  );
}
