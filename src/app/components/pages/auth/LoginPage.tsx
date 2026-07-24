import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Eye, EyeOff, ArrowRight, Chrome } from "lucide-react";
import logo from "../../../../imports/Frame_14.png";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) { setError("Please fill in all fields."); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); navigate("/dashboard"); }, 1200);
  };

  return (
    <div className="min-h-screen flex" style={{ fontFamily: "'Inter', sans-serif", backgroundColor: "#09090E" }}>
      {/* Left — form */}
      <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 py-16 max-w-lg mx-auto w-full">
        <Link to="/" className="inline-block mb-10">
          <img src={logo} alt="Namaa Markets" className="h-9 brightness-0 invert" />
        </Link>

        <div className="mb-8">
          <h1 className="text-[#EEF0F6] mb-2" style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400, fontSize: "1.8rem" }}>
            Welcome back
          </h1>
          <p className="text-[#6E7489] text-sm">Sign in to access your dashboard, alerts, and personalized feeds.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs text-[#6E7489] mb-1.5">Email address</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com"
              className="w-full px-4 py-3 bg-[#0E0F17] border border-[#1C1E2B] rounded-lg text-sm text-[#EEF0F6] placeholder:text-[#6E7489] focus:outline-none focus:border-[#C9A84C]/50 transition-colors" />
          </div>
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs text-[#6E7489]">Password</label>
              <span className="text-xs text-[#C9A84C] cursor-pointer hover:underline">Forgot password?</span>
            </div>
            <div className="relative">
              <input type={showPass ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••"
                className="w-full px-4 py-3 bg-[#0E0F17] border border-[#1C1E2B] rounded-lg text-sm text-[#EEF0F6] placeholder:text-[#6E7489] focus:outline-none focus:border-[#C9A84C]/50 transition-colors pr-10" />
              <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6E7489] hover:text-[#9AA0B4]">
                {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          {error && <p className="text-xs text-red-400 bg-red-500/8 border border-red-500/20 px-3 py-2 rounded-lg">{error}</p>}

          <button type="submit" disabled={loading}
            className="w-full py-3 bg-[#C9A84C] text-[#09090E] rounded-lg text-sm hover:bg-[#D4B55A] transition-colors flex items-center justify-center gap-2 disabled:opacity-60">
            {loading
              ? <span className="w-4 h-4 border-2 border-[#09090E]/30 border-t-[#09090E] rounded-full animate-spin" />
              : <><ArrowRight size={14} /> Sign In</>}
          </button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[#1C1E2B]" /></div>
          <div className="relative flex justify-center"><span className="bg-[#09090E] px-3 text-xs text-[#6E7489]">or continue with</span></div>
        </div>

        <button className="w-full py-3 border border-[#1C1E2B] text-[#9AA0B4] rounded-lg text-sm hover:border-[#2A2D3E] hover:text-[#EEF0F6] transition-colors flex items-center justify-center gap-2">
          <Chrome size={15} /> Google
        </button>

        <p className="text-center text-xs text-[#6E7489] mt-6">
          Don't have an account?{" "}
          <Link to="/register" className="text-[#C9A84C] hover:underline">Create one free</Link>
        </p>
      </div>

      {/* Right — panel */}
      <div className="hidden lg:flex flex-1 bg-[#0E0F17] border-l border-[#1C1E2B] flex-col justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(#C9A84C 1px, transparent 1px), linear-gradient(90deg, #C9A84C 1px, transparent 1px)", backgroundSize: "50px 50px" }} />
        <div className="relative max-w-sm">
          <h3 className="text-[#EEF0F6] mb-6" style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400, fontSize: "1.4rem" }}>
            Your trading intelligence hub
          </h3>
          <div className="space-y-3">
            {[
              { icon: "📊", label: "Live market rates & price alerts" },
              { icon: "🛡️", label: "Verified broker safety scores" },
              { icon: "📅", label: "Personalized economic calendar" },
              { icon: "🎓", label: "Track your Academy progress" },
              { icon: "⭐", label: "Save brokers to your watchlist" },
            ].map(({ icon, label }) => (
              <div key={label} className="flex items-center gap-3 p-3 rounded-xl bg-[#141622] border border-[#1C1E2B]">
                <span className="text-lg">{icon}</span>
                <span className="text-sm text-[#9AA0B4]">{label}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-[#6E7489] mt-6">Join 10,000+ traders using Namaa Markets daily.</p>
        </div>
      </div>
    </div>
  );
}
