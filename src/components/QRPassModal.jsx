import React from 'react';
import { useFest } from '../context/FestContext';
import { QRCodeSVG } from 'qrcode.react';
import { X, Download, Printer, CheckCircle2, Ticket, MapPin, Calendar, Clock, ShieldCheck } from 'lucide-react';

export default function QRPassModal() {
  const { qrModalData: reg, setQrModalData } = useFest();
  if (!reg) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-floating border border-zinc-100 relative">
        
        
        <button
          onClick={() => setQrModalData(null)}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-700 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        
        <div id="printable-ticket" className="p-6 sm:p-7 text-center">
          
          
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-full bg-[#E60023] text-white flex items-center justify-center font-black text-sm">
              A
            </div>
            <span className="font-extrabold tracking-tight text-lg text-zinc-900">
              AURA<span className="text-[#E60023]">'26</span> TICKET PASS
            </span>
          </div>

          <p className="text-[11px] text-zinc-500 font-semibold tracking-wider uppercase mb-5">
            Official Participant Entry Pass
          </p>

          
          <div className="bg-zinc-900 text-white rounded-2xl p-4 mb-5 text-left relative overflow-hidden">
            <div className="absolute right-0 top-0 translate-x-4 -translate-y-4 w-24 h-24 rounded-full bg-white/5 pointer-events-none"></div>
            <div className="flex items-center gap-2 text-xs text-rose-400 font-bold mb-1">
              <Ticket className="w-3.5 h-3.5" />
              <span>{reg.isTeam ? `Squad: ${reg.teamName}` : 'Solo Registration'}</span>
            </div>
            <h3 className="font-black text-lg leading-snug tracking-tight text-white mb-2">
              {reg.eventTitle}
            </h3>

            <div className="grid grid-cols-2 gap-2 text-[11px] text-zinc-300 pt-2 border-t border-zinc-800">
              <div className="flex items-center gap-1.5 truncate">
                <Calendar className="w-3.5 h-3.5 text-zinc-400 flex-shrink-0" />
                <span>{reg.eventDate || 'Oct 24-26'}</span>
              </div>
              <div className="flex items-center gap-1.5 truncate">
                <MapPin className="w-3.5 h-3.5 text-zinc-400 flex-shrink-0" />
                <span className="truncate">{reg.eventVenue || 'Campus Grounds'}</span>
              </div>
            </div>
          </div>

          
          <div className="bg-zinc-50 p-5 rounded-3xl border-2 border-dashed border-zinc-200 inline-block mx-auto mb-4 relative shadow-inner">
            <QRCodeSVG
              value={reg.qrToken}
              size={180}
              level="H"
              includeMargin={false}
              className="mx-auto"
            />
            {reg.status === 'Attended' && (
              <div className="absolute inset-0 bg-emerald-950/80 backdrop-blur-[2px] rounded-2xl flex flex-col items-center justify-center text-white">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mb-1 animate-bounce" />
                <span className="font-bold text-xs uppercase tracking-wider">Checked In</span>
                <span className="text-[10px] text-emerald-200">Attendance Marked</span>
              </div>
            )}
          </div>

          
          <div className="mb-4">
            <div className="font-mono text-xs font-bold bg-zinc-100 text-zinc-800 py-1.5 px-3 rounded-full inline-block tracking-wider">
              {reg.qrToken}
            </div>
            {reg.teamCode && (
              <div className="text-xs text-zinc-500 mt-1.5">
                Team Code: <span className="font-mono font-bold text-zinc-900">{reg.teamCode}</span>
              </div>
            )}
          </div>

          
          <div className="text-left bg-zinc-50 p-3.5 rounded-2xl border border-zinc-100 text-xs space-y-1 mb-5">
            <div className="flex justify-between">
              <span className="text-zinc-500 font-medium">Attendee:</span>
              <span className="font-bold text-zinc-900">{reg.participantName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500 font-medium">Email:</span>
              <span className="text-zinc-700 font-medium">{reg.participantEmail}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500 font-medium">Status:</span>
              <span className={`font-bold ${reg.status === 'Attended' ? 'text-emerald-600' : 'text-blue-600'}`}>
                {reg.status}
              </span>
            </div>
          </div>

          
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex-1 py-3 px-4 rounded-full bg-zinc-900 hover:bg-black text-white text-xs font-bold shadow transition-all flex items-center justify-center gap-1.5"
            >
              <Printer className="w-4 h-4" />
              <span>Print Pass</span>
            </button>
            <button
              onClick={() => setQrModalData(null)}
              className="py-3 px-6 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-bold transition-all"
            >
              Done
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
