import { useState } from "react";
import { Mail, MessageSquare, Globe, Clock, Send, CheckCircle } from "lucide-react";

const topics = ["General Inquiry", "Broker Listing / Partnership", "Scam Report", "Academy / Education", "Technical Support", "Press & Media", "Careers", "Advertise with Us"];

export function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1200);
  };

  return (
    <div className="pt-16 min-h-screen">
      <div className="border-b border-[#1C1E2B] bg-[#0E0F17]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
          <div className="flex items-center gap-2 mb-3">
            <Mail size={14} className="text-[#C9A84C]" />
            <span className="text-xs text-[#C9A84C] uppercase tracking-wider">Get in Touch</span>
          </div>
          <h1 className="text-[#EEF0F6] mb-2" style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400, fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}>Contact Us</h1>
          <p className="text-[#6E7489] text-sm">Questions, partnerships, or feedback — we read every message.</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Info */}
          <div className="space-y-5">
            {[
              { icon: Mail, label: "Email", value: "hello@namaamarkets.com", sub: "We reply within 24 hours" },
              { icon: MessageSquare, label: "Live Chat", value: "Available in-app", sub: "Mon–Fri, 9am–6pm GMT" },
              { icon: Globe, label: "Headquarters", value: "Dubai, UAE", sub: "DIFC — Dubai International Financial Centre" },
              { icon: Clock, label: "Response Time", value: "Under 24 hours", sub: "For general inquiries" },
            ].map(({ icon: Icon, label, value, sub }) => (
              <div key={label} className="flex gap-3 p-4 rounded-xl bg-[#0E0F17] border border-[#1C1E2B]">
                <div className="w-9 h-9 rounded-lg bg-[#C9A84C]/10 flex items-center justify-center shrink-0">
                  <Icon size={15} className="text-[#C9A84C]" />
                </div>
                <div>
                  <div className="text-xs text-[#6E7489] mb-0.5">{label}</div>
                  <div className="text-sm text-[#EEF0F6]">{value}</div>
                  <div className="text-xs text-[#6E7489] mt-0.5">{sub}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            {sent ? (
              <div className="flex flex-col items-center justify-center h-80 text-center">
                <div className="w-16 h-16 rounded-full bg-[#22C55E]/10 flex items-center justify-center mb-4">
                  <CheckCircle size={28} className="text-[#22C55E]" />
                </div>
                <h3 className="text-[#EEF0F6] mb-2" style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400 }}>Message sent!</h3>
                <p className="text-sm text-[#6E7489]">We'll get back to you at <span className="text-[#EEF0F6]">{email}</span> within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-[#6E7489] mb-1.5">Your name</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required placeholder="Full name" className="w-full px-4 py-3 bg-[#0E0F17] border border-[#1C1E2B] rounded-lg text-sm text-[#EEF0F6] placeholder:text-[#6E7489] focus:outline-none focus:border-[#C9A84C]/40 transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs text-[#6E7489] mb-1.5">Email address</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="you@example.com" className="w-full px-4 py-3 bg-[#0E0F17] border border-[#1C1E2B] rounded-lg text-sm text-[#EEF0F6] placeholder:text-[#6E7489] focus:outline-none focus:border-[#C9A84C]/40 transition-colors" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-[#6E7489] mb-1.5">Topic</label>
                  <select value={topic} onChange={(e) => setTopic(e.target.value)} required className="w-full px-4 py-3 bg-[#0E0F17] border border-[#1C1E2B] rounded-lg text-sm text-[#EEF0F6] focus:outline-none focus:border-[#C9A84C]/40 transition-colors">
                    <option value="" disabled>Select a topic...</option>
                    {topics.map((t) => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-[#6E7489] mb-1.5">Message</label>
                  <textarea value={message} onChange={(e) => setMessage(e.target.value)} required rows={6} placeholder="Tell us how we can help..." className="w-full px-4 py-3 bg-[#0E0F17] border border-[#1C1E2B] rounded-lg text-sm text-[#EEF0F6] placeholder:text-[#6E7489] focus:outline-none focus:border-[#C9A84C]/40 transition-colors resize-none" />
                </div>
                <button type="submit" disabled={loading} className="flex items-center gap-2 px-6 py-3 bg-[#C9A84C] text-[#09090E] rounded-lg text-sm hover:bg-[#D4B55A] transition-colors disabled:opacity-60">
                  {loading ? <span className="w-4 h-4 border-2 border-[#09090E]/30 border-t-[#09090E] rounded-full animate-spin" /> : <><Send size={13} /> Send Message</>}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
