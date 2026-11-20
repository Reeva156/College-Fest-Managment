import React, { useState } from 'react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { HelpCircle, Mail, Phone, MapPin, Send, MessageSquare, ChevronDown, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const { showToast } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [openFaq, setOpenFaq] = useState(0);

  const faqs = [
    {
      q: 'Can students from other colleges or universities participate?',
      a: 'Yes! PULSE 2026 is an open inter-collegiate fest. Students with any valid university/college ID card can register for solo and team competitions.'
    },
    {
      q: 'How does the QR Code Pass check-in work on fest day?',
      a: 'Upon registering, you will receive a digital QR Pass in the "My Tickets" section. When you reach the venue, present your pass on your smartphone to our student organizer at the verification desk.'
    },
    {
      q: 'How do team registrations and team codes work?',
      a: 'The team leader creates a squad and generates an 8-character Team Code (e.g., CYBER-749). Teammates can simply select the event, click "Join with Team Code", and be instantly added to the roster.'
    },
    {
      q: 'When and where can I download my participation or merit certificate?',
      a: 'Once your attendance is verified by the venue desk or when event results are published, an authenticated certificate with a unique verification code will be generated under the "Certificates" tab.'
    }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !message) {
      showToast('Please fill out all required fields.', 'error');
      return;
    }

    try {
      setSubmitting(true);
      const res = await api.submitContact({ name, email, subject, message });
      showToast(res.message, 'success');
      setSubmitted(true);
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-[1720px] w-full mx-auto px-4 sm:px-6 lg:px-10 py-8">
      
      
      <div className="text-center max-w-xl mx-auto mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-[#E60023] text-xs font-bold mb-2">
          <HelpCircle className="w-3.5 h-3.5" />
          FR-13 Fest Help & Support Desk
        </div>
        <h2 className="text-3xl font-black text-zinc-900 tracking-tight">
          Contact Organizers & FAQ
        </h2>
        <p className="text-xs text-zinc-500 mt-1">
          Have a question about rules, venues, or squad registrations? We are here to help!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200 shadow-pin">
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6 pb-6 border-b border-zinc-100">
            <div className="p-3 bg-zinc-50 rounded-2xl border border-zinc-100 text-center">
              <Mail className="w-5 h-5 text-[#E60023] mx-auto mb-1" />
              <span className="text-[10px] font-bold uppercase text-zinc-400 block">Email Desk</span>
              <span className="text-xs font-semibold text-zinc-800">fest@college.edu</span>
            </div>
            <div className="p-3 bg-zinc-50 rounded-2xl border border-zinc-100 text-center">
              <Phone className="w-5 h-5 text-[#E60023] mx-auto mb-1" />
              <span className="text-[10px] font-bold uppercase text-zinc-400 block">Helpline</span>
              <span className="text-xs font-semibold text-zinc-800">+91 98765 43210</span>
            </div>
            <div className="p-3 bg-zinc-50 rounded-2xl border border-zinc-100 text-center">
              <MapPin className="w-5 h-5 text-[#E60023] mx-auto mb-1" />
              <span className="text-[10px] font-bold uppercase text-zinc-400 block">Fest HQ</span>
              <span className="text-xs font-semibold text-zinc-800">Block C, CS Dept</span>
            </div>
          </div>

          <h3 className="font-extrabold text-base text-zinc-900 mb-4 flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-[#E60023]" />
            <span>Send a Message to Fest Committee</span>
          </h3>

          {submitted ? (
            <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-2">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h4 className="font-bold text-sm text-emerald-950">Inquiry Received!</h4>
              <p className="text-xs text-emerald-800">
                Our student volunteer team will review your query and reply via email.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-3 px-4 py-1.5 bg-emerald-700 text-white rounded-full text-xs font-bold"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-500 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Reeva Solani"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-2xl bg-zinc-50 border border-zinc-200 text-xs focus:bg-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-500 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="student@college.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-2xl bg-zinc-50 border border-zinc-200 text-xs focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-500 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="e.g. Question regarding Dance squad props"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-2xl bg-zinc-50 border border-zinc-200 text-xs focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-500 mb-1">
                  Your Message *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Please describe your question or issue in detail..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-2xl bg-zinc-50 border border-zinc-200 text-xs focus:bg-white focus:outline-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 rounded-full bg-[#E60023] hover:bg-[#B6001B] disabled:bg-zinc-300 text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>{submitting ? 'Submitting...' : 'Submit Message'}</span>
              </button>
            </form>
          )}

        </div>

        
        <div className="lg:col-span-5 space-y-3">
          <h3 className="font-extrabold text-base text-zinc-900 mb-3 flex items-center gap-2">
            <span>Frequently Asked Questions</span>
          </h3>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-zinc-200 overflow-hidden shadow-sm transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                  className="w-full p-4 text-left font-bold text-xs text-zinc-900 flex items-center justify-between gap-3 hover:bg-zinc-50"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-zinc-400 flex-shrink-0 transition-transform ${
                      openFaq === idx ? 'rotate-180 text-[#E60023]' : ''
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-4 pb-4 text-xs text-zinc-600 border-t border-zinc-100 pt-3 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

          
          <div className="bg-zinc-900 text-white p-5 rounded-3xl mt-5 shadow-pin">
            <h4 className="font-extrabold text-sm mb-1">Emergency Desk at Campus</h4>
            <p className="text-[11px] text-zinc-400 leading-relaxed">
              Facing issues on fest day? Visit the Main Help Desk at the College Central Quadrangle. Volunteers in Red PULSE tees are ready to assist.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}
