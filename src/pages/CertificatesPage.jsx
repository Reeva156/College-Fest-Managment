import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useFest } from '../context/FestContext';
import { Award, Download, ShieldCheck, Search, CheckCircle2, XCircle, Sparkles } from 'lucide-react';

export default function CertificatesPage() {
  const { user, showToast } = useAuth();
  const { setCertModalData } = useFest();

  const [myCertificates, setMyCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [verifyCode, setVerifyCode] = useState('');
  const [verifyResult, setVerifyResult] = useState(null);
  const [verifying, setVerifying] = useState(false);

  const loadCerts = async () => {
    if (!user) return;
    try {
      setLoading(true);
      const res = await api.getMyCertificates();
      setMyCertificates(res.certificates || []);
    } catch (e) {
      console.error('Failed to load certificates:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCerts();
  }, [user]);

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    if (!verifyCode.trim()) return;

    try {
      setVerifying(true);
      const res = await api.verifyCertificate(verifyCode.trim());
      setVerifyResult(res);
      showToast('Certificate successfully validated against fest ledger!', 'success');
    } catch (err) {
      setVerifyResult({ valid: false, message: err.message });
      showToast(err.message, 'error');
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="max-w-[1720px] w-full mx-auto px-4 sm:px-6 lg:px-10 py-8">
      
      
      <div className="text-center max-w-xl mx-auto mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold mb-2">
          <Award className="w-3.5 h-3.5" />
          FR-10 Digital Credentials
        </div>
        <h2 className="text-3xl font-black text-zinc-900 tracking-tight">
          Released Certificates & Honors
        </h2>
        <p className="text-xs text-zinc-500 mt-1">
          Download tamper-proof, gold-embossed certificates for attended events and podium rankings.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        
        <div className="lg:col-span-7 space-y-4">
          <h3 className="font-extrabold text-base text-zinc-900 flex items-center gap-2">
            <span>My Issued Certificates</span>
            <span className="text-xs font-mono font-bold bg-zinc-100 text-zinc-700 px-2 py-0.5 rounded-full">
              {myCertificates.length}
            </span>
          </h3>

          {loading ? (
            <div className="bg-zinc-100 rounded-3xl h-48 animate-pulse"></div>
          ) : myCertificates.length === 0 ? (
            <div className="bg-white rounded-3xl p-10 text-center border border-zinc-200">
              <Award className="w-10 h-10 text-zinc-300 mx-auto mb-2" />
              <h4 className="font-bold text-sm text-zinc-800">No Certificates Released Yet</h4>
              <p className="text-xs text-zinc-500 mt-1 max-w-xs mx-auto">
                Certificates are issued once your QR pass is verified at the venue or when event results are published.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {myCertificates.map((cert) => (
                <div
                  key={cert.id}
                  className="bg-white rounded-3xl p-6 border border-zinc-200 shadow-pin hover:shadow-pin-hover transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-3.5">
                    <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center flex-shrink-0">
                      <Award className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                          {cert.position || 'Participation'}
                        </span>
                        <span className="text-[11px] font-mono text-zinc-400">
                          {cert.verificationCode}
                        </span>
                      </div>
                      <h4 className="font-extrabold text-base text-zinc-900 leading-snug">
                        {cert.eventTitle}
                      </h4>
                      <p className="text-xs text-zinc-500 mt-1">
                        Awarded to <span className="font-bold text-zinc-800">{cert.participantName}</span> • {cert.issueDate}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setCertModalData(cert)}
                    className="self-start sm:self-auto px-4 py-2.5 rounded-full bg-[#E60023] hover:bg-[#B6001B] text-white text-xs font-bold shadow flex items-center gap-1.5 transition-all"
                  >
                    <Download className="w-4 h-4" />
                    <span>View & Download</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        
        <div className="lg:col-span-5">
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-zinc-200 shadow-pin sticky top-28">
            <div className="flex items-center gap-2 text-zinc-900 font-extrabold text-base mb-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span>Verify Certificate Authenticity</span>
            </div>
            <p className="text-xs text-zinc-500 mb-5">
              Recruiters and institutions can enter a certificate security hash to confirm its legitimacy.
            </p>

            <form onSubmit={handleVerifyCode} className="space-y-3">
              <div className="relative">
                <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  placeholder="e.g. PULSE-2026-ART-00194"
                  value={verifyCode}
                  onChange={(e) => setVerifyCode(e.target.value.toUpperCase())}
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-zinc-50 border border-zinc-200 font-mono text-xs uppercase font-bold focus:bg-white focus:outline-none"
                />
              </div>

              <div className="text-[11px] text-zinc-400">
                Test code:{' '}
                <button
                  type="button"
                  onClick={() => setVerifyCode('PULSE-2026-ART-00194')}
                  className="font-mono text-zinc-700 underline font-semibold"
                >
                  PULSE-2026-ART-00194
                </button>
              </div>

              <button
                type="submit"
                disabled={verifying}
                className="w-full py-2.5 rounded-full bg-zinc-900 hover:bg-black text-white font-bold text-xs shadow transition-all"
              >
                {verifying ? 'Validating...' : 'Verify in Registry'}
              </button>
            </form>

            
            {verifyResult && (
              <div className={`mt-5 p-4 rounded-2xl border text-xs animate-in fade-in ${
                verifyResult.valid
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                  : 'bg-rose-50 border-rose-200 text-rose-950'
              }`}>
                {verifyResult.valid ? (
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-1.5 font-bold text-emerald-800">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>Authentic Certificate Verified!</span>
                    </div>
                    <div>Recipient: <strong>{verifyResult.certificate.participantName}</strong></div>
                    <div>Event: <strong>{verifyResult.certificate.eventTitle}</strong></div>
                    <div>Award: <strong>{verifyResult.certificate.position}</strong></div>
                    <div>Signee: <strong>{verifyResult.certificate.signatureAuthority}</strong></div>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 font-bold text-rose-800">
                    <XCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                    <span>{verifyResult.message || 'Verification record not found.'}</span>
                  </div>
                )}
              </div>
            )}

          </div>
        </div>

      </div>

    </div>
  );
}
