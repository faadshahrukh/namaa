import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Eye, EyeOff, ArrowRight, Check, Chrome } from "lucide-react";
import logo from "../../../../imports/Frame_14.png";

const goals = ["Learn to trade forex", "Find a trusted broker", "Track market news", "Use trading tools", "Avoid broker scams"];

export function RegisterPage() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [experience, setExperience] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const toggleGoal = (g: string) =>
    setSelectedGoals((p) => p.includes(g) ? p.filter((x) => x !== g) : [...p, g]);

  const handleStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && name && password) setStep(2);
  };

  const handleComplete = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); navigate("/dashboard"); }, 1200);
  };

  const EyeIcon = showPass ? EyeOff : Eye;

  return (
    <div className="min-h-screen flex flex-col justify-center px-6 sm:px-12 py-12" style={{ fontFamily: "'Inter', sans-serif", backgroundColor: "#09090E" }}>
      <div className="max-w-md mx-auto w-full">
        <Link to="/" className="inline-block mb-8">
          <img src={logo} alt="Namaa Markets" className="h-8 brightness-0 invert" />
        </Link>

        {/* Progress */}
        <div className="flex items-center gap-2 mb-8">
          {[1, 2].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs transition-colors ${step >= s ? "bg-[#C9A84C] text-[#09090E]" : "bg-[#1C1E2B] text-[#6E7489]"}`}>
                {step > s ? <Check size={13} /> : s}
              </div>
              {s < 2 && <div className="h-px w-16 transition-colors" style={{ backgroundColor: step > s ? "#C9A84C" : "#1C1E2B" }} />}
            </div>
          ))}
          <span className="text-xs text-[#6E7489] ml-2">Step {step} of 2</span>
        </div>

        {step === 1 && (
          <>
            <div className="mb-6">
              <h1 className="text-[#EEF0F6] mb-1" style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400, fontSize: "1.8rem" }}>Create your account</h1>
              <p className="text-[#6E7489] text-sm">Free forever. No credit card required.</p>
            </div>

            <form onSubmit={handleStep1} className="space-y-4">
              <div>
                <label className="block text-xs text-[#6E7489] mb-1.5">Full name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" required
                  className="w-full px-4 py-3 bg-[#0E0F17] border border-[#1C1E2B] rounded-lg text-sm text-[#EEF0F6] placeholder:text-[#6E7489] focus:outline-none focus:border-[#C9A84C]/50 transition-colors" />
              </div>
              <div>
                <label className="block text-xs text-[#6E7489] mb-1.5">Email address</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required
                  className="w-full px-4 py-3 bg-[#0E0F17] border border-[#1C1E2B] rounded-lg text-sm text-[#EEF0F6] placeholder:text-[#6E7489] focus:outline-none focus:border-[#C9A84C]/50 transition-colors" />
              </div>
              <div>
                <label className="block text-xs text-[#6E7489] mb-1.5">Password</label>
                <div className="relative">
                  <input type={showPass ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Min. 8 characters" required
                    className="w-full px-4 py-3 bg-[#0E0F17] border border-[#1C1E2B] rounded-lg text-sm text-[#EEF0F6] placeholder:text-[#6E7489] focus:outline-none focus:border-[#C9A84C]/50 transition-colors pr-10" />
                  <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6E7489]">
                    <EyeIcon size={15} />
                  </button>
                </div>
              </div>
              <button type="submit" disabled={!email || !name || !password}
                className="w-full py-3 bg-[#C9A84C] text-[#09090E] rounded-lg text-sm hover:bg-[#D4B55A] transition-colors flex items-center justify-center gap-2 disabled:opacity-40">
                Continue <ArrowRight size={14} />
              </button>
            </form>

            <div className="relative my-5">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[#1C1E2B]" /></div>
              <div className="relative flex justify-center"><span className="bg-[#09090E] px-3 text-xs text-[#6E7489]">or</span></div>
            </div>
            <button className="w-full py-3 border border-[#1C1E2B] text-[#9AA0B4] rounded-lg text-sm hover:border-[#2A2D3E] hover:text-[#EEF0F6] transition-colors flex items-center justify-center gap-2">
              <Chrome size={15} /> Sign up with Google
            </button>
            <p className="text-center text-xs text-[#6E7489] mt-4">
              Already have an account? <Link to="/login" className="text-[#C9A84C] hover:underline">Sign in</Link>
            </p>
          </>
        )}

        {step === 2 && (
          <>
            <div className="mb-6">
              <h1 className="text-[#EEF0F6] mb-1" style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400, fontSize: "1.8rem" }}>Personalize your experience</h1>
              <p className="text-[#6E7489] text-sm">Tell us about yourself so we can tailor your feed.</p>
            </div>

            <div className="mb-6">
              <div className="text-xs text-[#6E7489] mb-3">What's your trading experience?</div>
              <div className="grid grid-cols-3 gap-2">
                {["Beginner", "Intermediate", "Advanced"].map((level) => (
                  <button key={level} onClick={() => setExperience(level)}
                    className={`py-2.5 rounded-lg text-xs border transition-colors ${experience === level ? "border-[#C9A84C]/50 bg-[#C9A84C]/10 text-[#C9A84C]" : "border-[#1C1E2B] text-[#9AA0B4] hover:border-[#2A2D3E]"}`}>
                    {level}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <div className="text-xs text-[#6E7489] mb-3">What brings you here? (select all that apply)</div>
              <div className="space-y-2">
                {goals.map((g) => (
                  <button key={g} onClick={() => toggleGoal(g)}
                    className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm border transition-colors ${selectedGoals.includes(g) ? "border-[#C9A84C]/40 bg-[#C9A84C]/8 text-[#EEF0F6]" : "border-[#1C1E2B] text-[#9AA0B4] hover:border-[#2A2D3E]"}`}>
                    <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${selectedGoals.includes(g) ? "border-[#C9A84C] bg-[#C9A84C]" : "border-[#2A2D3E]"}`}>
                      {selectedGoals.includes(g) && <Check size={10} className="text-[#09090E]" />}
                    </div>
                    {g}
                  </button>
                ))}
              </div>
            </div>

            <button onClick={handleComplete} disabled={loading}
              className="w-full py-3 bg-[#C9A84C] text-[#09090E] rounded-lg text-sm hover:bg-[#D4B55A] transition-colors flex items-center justify-center gap-2 disabled:opacity-60">
              {loading
                ? <span className="w-4 h-4 border-2 border-[#09090E]/30 border-t-[#09090E] rounded-full animate-spin" />
                : <>Complete Registration <ArrowRight size={14} /></>}
            </button>
            <p className="text-xs text-[#6E7489] text-center mt-4">
              By registering, you agree to our <Link to="/terms" className="text-[#C9A84C] hover:underline">Terms</Link> and <Link to="/privacy" className="text-[#C9A84C] hover:underline">Privacy Policy</Link>.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
