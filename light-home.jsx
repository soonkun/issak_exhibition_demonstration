/* ===== HOME (weather-app style) ===== */

function WeatherIcon({ size = 54 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      {/* sun peeking top-left */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a) =>
      <rect key={a} x="24.6" y="2.5" width="2.8" height="7" rx="1.4" fill="#ffc02e"
      transform={`rotate(${a} 26 23)`} />
      )}
      <circle cx="26" cy="23" r="10.5" fill="#ffd24d" />
      {/* cloud shadow for depth */}
      <path d="M22 51.5 A8.6 8.6 0 0 1 22.6 34.4 A11.6 11.6 0 0 1 44.4 35.2 A8.1 8.1 0 0 1 44 51.5 Z"
        fill="#d6e2e9" transform="translate(0 2.4)" />
      {/* main cloud */}
      <path d="M22 51.5 A8.6 8.6 0 0 1 22.6 34.4 A11.6 11.6 0 0 1 44.4 35.2 A8.1 8.1 0 0 1 44 51.5 Z"
        fill="#ffffff" stroke="#cddbe3" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>);

}

function FuncCircle({ img, label, onClick, tint, coach }) {
  return (
    <button onClick={onClick} data-coach={coach} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
      background: 'none', border: 'none', cursor: 'pointer', flex: 1 }}>
      <span className="floaty" style={{ width: 78, height: 78, borderRadius: '50%', display: 'grid', placeItems: 'center',
        background: `radial-gradient(circle at 50% 32%, #ffffff, ${tint})`,
        boxShadow: '0 12px 24px -12px rgba(40,80,55,.4), inset 0 0 0 1px rgba(255,255,255,.7)' }}>
        <img src={img} alt="" style={{ width: 60, height: 60, objectFit: 'contain', filter: 'drop-shadow(0 4px 6px rgba(0,0,0,.12))' }} />
      </span>
      <span style={{ fontSize: 13.5, fontWeight: 700, color: '#34403a' }}>{label}</span>
    </button>);

}

function Home({ onNav, onMenu, onHome }) {
  return (
    <div className="screen" id="home" data-screen-label="home">
      <div className="skybg" />
      <StatusBar2 time="오전 10:00" />
      <AppBar onMenu={onMenu} onHome={onHome} />
      <div className="body" style={{ padding: '4px 20px 4px' }}>
        {/* function circles */}
        <div style={{ display: 'flex', gap: 8, marginTop: 4, marginBottom: 16 }}>
          <FuncCircle img={A2.iconTractor} label="농기계 제어" tint="#e3f2e6" coach="machine" onClick={() => onNav('machine')} />
          <FuncCircle img={A2.iconThermo} label="스마트 팜 관리" tint="#fdeae6" coach="greenhouse" onClick={() => onNav('greenhouse')} />
          <FuncCircle img={A2.iconBug} label="병해충 방제" tint="#efe8fb" coach="drone" onClick={() => onNav('drone')} />
        </div>

        {/* hero mascot */}
        <div style={{ display: 'flex', justifyContent: 'center', margin: '0 0 2px' }}>
          <img src={A2.homeHero} alt="이삭이" className="floaty" style={{ width: '62%', maxWidth: 235, display: 'block',
            filter: 'drop-shadow(0 16px 20px rgba(40,80,55,.2))' }} />
        </div>

        {/* greeting */}
        <h2 style={{ textAlign: 'center', margin: '8px 0 14px', fontSize: 23, fontWeight: 800, lineHeight: 1.32,
          color: '#3a9d5d', letterSpacing: '-.6px' }}>
          안녕하세요, 이삭이가<br />풍년농사를 도와드릴께요!
        </h2>

        {/* weather card */}
        <div className="card" style={{ padding: '16px 18px', marginBottom: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13.5, fontWeight: 700, color: '#39413b', whiteSpace: 'nowrap' }}>
              <span style={{ color: 'var(--green)' }}><I.pin width={17} height={17} /></span>
              충청북도 청주시 흥덕구
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 12, color: '#9aa49c', fontWeight: 600, whiteSpace: 'nowrap' }}>
              현재 06.18 <I.refresh width={15} height={15} />
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <WeatherIcon size={56} />
              <span style={{ fontSize: 42, fontWeight: 800, letterSpacing: '-2px', color: '#26302a' }}>24.8°</span>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 20, fontWeight: 800, color: '#39413b' }}>다소 흐림</div>
              <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 3, fontSize: 14, fontWeight: 700 }}>
                <span style={{ color: 'var(--red)' }}>↑ 30.2°</span>
                <span style={{ color: 'var(--blue)' }}>↓ 22.5°</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ChatBar />
    </div>);

}

Object.assign(window, { Home, WeatherIcon, FuncCircle });