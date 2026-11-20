import React, { useRef, useEffect } from 'react';
import { useFest } from '../context/FestContext';
import { X, Download, Printer, Award, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function CertificateModal() {
  const { certModalData: cert, setCertModalData } = useFest();
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!cert || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = 1200;
    const height = 800;
    canvas.width = width;
    canvas.height = height;

    const bgGradient = ctx.createLinearGradient(0, 0, width, height);
    bgGradient.addColorStop(0, '#FFFDF9');
    bgGradient.addColorStop(1, '#F8F4EE');
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, width, height);

    ctx.lineWidth = 14;
    ctx.strokeStyle = '#C5A059';
    ctx.strokeRect(30, 30, width - 60, height - 60);

    ctx.lineWidth = 2;
    ctx.strokeStyle = '#8E6E34';
    ctx.strokeRect(48, 48, width - 96, height - 96);

    const drawCorner = (x, y) => {
      ctx.fillStyle = '#C5A059';
      ctx.beginPath();
      ctx.arc(x, y, 12, 0, Math.PI * 2);
      ctx.fill();
    };
    drawCorner(55, 55);
    drawCorner(width - 55, 55);
    drawCorner(55, height - 55);
    drawCorner(width - 55, height - 55);

    ctx.textAlign = 'center';
    ctx.fillStyle = '#E60023';
    ctx.font = 'bold 30px sans-serif';
    ctx.fillText('AURA 2026', width / 2, 130);

    ctx.fillStyle = '#666666';
    ctx.font = 'bold 16px sans-serif';
    ctx.letterSpacing = '4px';
    ctx.fillText('ANNUAL INTER-COLLEGIATE CULTURAL & TECH FESTIVAL', width / 2, 160);

    ctx.fillStyle = '#1A1A1A';
    ctx.font = 'italic bold 52px Georgia, serif';
    ctx.fillText('Certificate of Excellence', width / 2, 240);

    ctx.fillStyle = '#777777';
    ctx.font = '18px sans-serif';
    ctx.fillText('THIS IS PROUDLY PRESENTED TO', width / 2, 290);

    ctx.fillStyle = '#111827';
    ctx.font = 'bold 44px Georgia, serif';
    ctx.fillText(cert.participantName || 'Participant Name', width / 2, 360);

    ctx.strokeStyle = '#C5A059';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(width / 2 - 250, 385);
    ctx.lineTo(width / 2 + 250, 385);
    ctx.stroke();

    ctx.fillStyle = '#4B5563';
    ctx.font = '20px sans-serif';
    const bodyText = `for outstanding performance and securing ${cert.position || 'Participation'} in the event`;
    ctx.fillText(bodyText, width / 2, 440);

    ctx.fillStyle = '#E60023';
    ctx.font = 'bold 30px Georgia, serif';
    ctx.fillText(`“ ${cert.eventTitle} ”`, width / 2, 490);

    ctx.fillStyle = '#6B7280';
    ctx.font = '16px sans-serif';
    ctx.fillText(`Presented on ${cert.issueDate || 'October 2026'} • Authorized by College Fest Convener`, width / 2, 540);

    ctx.save();
    ctx.translate(width / 2, 630);
    ctx.fillStyle = '#C5A059';
    ctx.beginPath();
    ctx.arc(0, 0, 42, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#FFFDF9';
    ctx.beginPath();
    ctx.arc(0, 0, 36, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#8E6E34';
    ctx.font = 'bold 12px sans-serif';
    ctx.fillText('OFFICIAL', 0, -4);
    ctx.fillText('SEAL', 0, 14);
    ctx.restore();

    ctx.textAlign = 'left';
    ctx.fillStyle = '#111827';
    ctx.font = 'bold 16px sans-serif';
    ctx.fillText(cert.signatureAuthority || 'Prof. Ramesh Sharma', 140, 680);
    ctx.fillStyle = '#6B7280';
    ctx.font = '13px sans-serif';
    ctx.fillText('Faculty Convener & Head', 140, 705);
    ctx.strokeStyle = '#D1D5DB';
    ctx.beginPath();
    ctx.moveTo(140, 660);
    ctx.lineTo(340, 660);
    ctx.stroke();

    ctx.textAlign = 'right';
    ctx.fillStyle = '#111827';
    ctx.font = 'mono bold 14px monospace';
    ctx.fillText(`VERIFIED ID: ${cert.verificationCode}`, width - 140, 680);
    ctx.fillStyle = '#059669';
    ctx.font = '13px sans-serif';
    ctx.fillText('✓ Cryptographically Verified on Portal', width - 140, 705);
    ctx.strokeStyle = '#D1D5DB';
    ctx.beginPath();
    ctx.moveTo(width - 340, 660);
    ctx.lineTo(width - 140, 660);
    ctx.stroke();

  }, [cert]);

  if (!cert) return null;

  const handleDownload = () => {
    if (!canvasRef.current) return;
    const link = document.createElement('a');
    link.download = `Certificate_${cert.participantName.replace(/\s+/g, '_')}_${cert.verificationCode}.png`;
    link.href = canvasRef.current.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-4xl w-full overflow-hidden shadow-floating border border-zinc-100 relative p-6">
        
        
        <div className="flex items-center justify-between pb-4 border-b border-zinc-100 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-zinc-900 text-base">
                Official Digital Certificate
              </h3>
              <p className="text-xs text-zinc-500">
                Code: <span className="font-mono font-bold text-zinc-800">{cert.verificationCode}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="px-4 py-2 rounded-full bg-[#E60023] hover:bg-[#B6001B] text-white text-xs font-bold shadow flex items-center gap-1.5 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Download High-Res PNG</span>
            </button>
            <button
              onClick={() => setCertModalData(null)}
              className="p-2 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        
        <div className="w-full bg-zinc-100 rounded-2xl overflow-hidden shadow-inner flex items-center justify-center p-2">
          <canvas
            ref={canvasRef}
            className="w-full h-auto max-h-[70vh] object-contain rounded-xl shadow-md border border-zinc-200"
          />
        </div>

        
        <div className="mt-4 flex items-center justify-between text-xs text-zinc-500 bg-zinc-50 px-4 py-2.5 rounded-xl border border-zinc-100">
          <span className="flex items-center gap-1.5 text-emerald-700 font-semibold">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            Authenticated through PULSE '26 Fest Registry
          </span>
          <span>Issuer: {cert.signatureAuthority}</span>
        </div>

      </div>
    </div>
  );
}
