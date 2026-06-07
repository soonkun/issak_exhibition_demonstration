/* ===== INTRO / landing screen ===== */

function Intro({ onStart }) {
  return (
    <div className="screen" id="intro" data-screen-label="intro"
    style={{ background: 'linear-gradient(180deg, #bfe6f5 0%, #d4eede 40%, #eaf6ea 70%, #f3f7f3 100%)' }}>
      <StatusBar2 time="오전 6:30" />

      {/* soft sun glow top-right */}
      <div style={{ position: 'absolute', top: 64, right: 54, width: 96, height: 96, borderRadius: '50%',
        background: 'radial-gradient(circle at 50% 50%, #ffe79f, #ffd06b)',
        boxShadow: '0 0 0 18px rgba(255,214,107,.18), 0 0 60px 18px rgba(255,196,92,.55)', pointerEvents: 'none' }} />

      {/* hero */}
      <div style={{ position: 'relative', zIndex: 2, flex: 1, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', padding: '0 30px', textAlign: 'center' }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '7px 15px', borderRadius: 999,
          background: 'rgba(255,255,255,.7)', border: '1px solid rgba(255,255,255,.9)', backdropFilter: 'blur(4px)',
          color: 'var(--green-d)', fontSize: 13, fontWeight: 800, whiteSpace: 'nowrap', marginBottom: 6 }}>
          <span style={{ color: 'var(--green)' }}><I.leaf width={16} height={16} /></span> 스마트 농사 비서
        </span>

        <img src={A2.homeHero} alt="이삭이" className="floaty"
        style={{ width: '72%', maxWidth: 268, display: 'block', filter: 'drop-shadow(0 20px 24px rgba(40,80,55,.24))' }} />

        <h1 style={{ fontSize: 42, fontWeight: 800, letterSpacing: '-1.2px', color: '#1d231e', marginTop: 6, whiteSpace: 'nowrap' }}>
          AI <span style={{ color: 'var(--green)' }}>이삭이</span>
        </h1>
        <p style={{ fontSize: 15.5, fontWeight: 600, color: '#6c766e', marginTop: 12, lineHeight: 1.55, wordBreak: 'keep-all' }}>
          데이터와 경험으로 짓는 똑똑한 농사,<br />이삭이가 처음부터 끝까지 함께할게요.
        </p>
      </div>

      {/* rolling meadow */}
      <svg viewBox="0 0 393 130" preserveAspectRatio="none" style={{ position: 'absolute', left: 0, right: 0, bottom: 150, width: '100%', height: 130, zIndex: 1 }}>
        <path d="M0,95 C70,55 130,95 210,68 C280,46 340,80 393,58 L393,130 L0,130 Z" fill="rgba(92,186,126,.28)" />
        <path d="M0,112 C90,80 160,112 250,92 C320,77 360,100 393,90 L393,130 L0,130 Z" fill="rgba(67,168,106,.4)" />
      </svg>

      {/* CTA */}
      <div style={{ position: 'relative', zIndex: 3, padding: '0 26px 30px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
        <button className="btn-run" onClick={onStart} style={{ fontSize: 17, padding: '17px', borderRadius: 17 }}>
          시작하기 <I.back width={20} height={20} style={{ transform: 'scaleX(-1)' }} />
        </button>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 11, flexWrap: 'nowrap' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4.5, fontSize: 12, fontWeight: 700, color: '#7a857c', whiteSpace: 'nowrap' }}>
            <span style={{ color: 'var(--green)', display: 'flex' }}><I.cal width={14} height={14} /></span> 6월 18일
          </span>
          <span style={{ width: 1, height: 11, background: '#c9d4cb', flex: 'none' }} />
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4.5, fontSize: 12, fontWeight: 700, color: '#7a857c', whiteSpace: 'nowrap' }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><circle cx="9" cy="8.4" r="3.7" fill="#ffce4d" /><path d="M8 18a4 4 0 0 1 .3-7.97A5 5 0 0 1 18 11a3.6 3.6 0 0 1-.4 7H8Z" fill="#fff" stroke="#c4d3da" strokeWidth="1.2" strokeLinejoin="round" /></svg> 다소 흐림
          </span>
          <span style={{ width: 1, height: 11, background: '#c9d4cb', flex: 'none' }} />
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4.5, fontSize: 12, fontWeight: 700, color: '#7a857c', whiteSpace: 'nowrap' }}>
            <span style={{ color: 'var(--green)', display: 'flex' }}><I.pin width={14} height={14} /></span> 충청북도 청주시 흥덕구
          </span>
        </div>
      </div>
    </div>);

}

Object.assign(window, { Intro });