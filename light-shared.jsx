/* ===== light theme: shared icons, bars, bubbles, asset map ===== */
const { useState, useEffect, useRef } = React;

/* resolve an asset path through the standalone bundler's resource map when present */
const asset = (p)=> (window.__resources && window.__resources[p]) || p;

const A2 = {
  homeHero: asset('light/hero_mascot.png'),
  heroMascot: asset('light/hero_magnify.png'),
  monitorMascot: asset('light/monitor3_f.png'),
  avatar: asset('light/avatar_face.png'),
  iconTractor: asset('assets/icon_tractor.png'),
  iconThermo: asset('assets/icon_thermo.png'),
  iconBug: asset('assets/icon_bug.png'),
  mapField: asset('light/map_field2.png'),
  mapGreenhouse: asset('light/map_greenhouse2.png'),
  mapGrid: asset('light/map_grid2.png'),
  recGreenhouse: asset('light/rec_greenhouse.png'),
  recDrone: asset('light/rec_drone.png'),
  thumbTractor: asset('assets/icon_tractor.png'),
  thumbGreenhouse: asset('light/thumb_greenhouse2.png'),
  thumbDrone: asset('light/thumb_drone2.png'),
  videoPlow: asset('assets/video/1_plow.mp4'),
  videoGreenhouse: asset('assets/video/2_greenhouse.mp4'),
  videoDrone: asset('assets/video/3_drone.mp4'),
  posterPlow: asset('assets/poster_plow.jpg')
};

const I = {
  menu: (p) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...p}><path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>,
  bell: (p) => <svg width="23" height="23" viewBox="0 0 24 24" fill="none" {...p}><path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" /><path d="M10 20a2 2 0 0 0 4 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>,
  back: (p) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" {...p}><path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  plus: (p) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" {...p}><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" /></svg>,
  mic: (p) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" {...p}><rect x="9" y="3" width="6" height="11" rx="3" fill="currentColor" /><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none" /><path d="M19 4.5l.6 1.4L21 6.5l-1.4.6L19 8.5l-.6-1.4L17 6.5l1.4-.6L19 4.5Z" fill="currentColor" /></svg>,
  cal: (p) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" {...p}><rect x="3.5" y="5" width="17" height="15" rx="3" stroke="currentColor" strokeWidth="1.7" /><path d="M3.5 9h17M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></svg>,
  rain: (p) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" {...p}><path d="M7 14a4 4 0 0 1 .5-7.9A5 5 0 0 1 17 7a3.5 3.5 0 0 1-.5 7H7Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /><path d="M8 17l-1 2.5M12 17l-1 2.5M16 17l-1 2.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></svg>,
  shovel: (p) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" {...p}><path d="M14 3l7 7-3 3-7-7 3-3Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /><path d="M11.5 8.5 4 16v4h4l7.5-7.5" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /></svg>,
  thermo: (p) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" {...p}><path d="M10 13.5V6a2 2 0 1 1 4 0v7.5a4 4 0 1 1-4 0Z" stroke="currentColor" strokeWidth="1.7" /><circle cx="12" cy="17" r="1.6" fill="currentColor" /></svg>,
  drop: (p) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" {...p}><path d="M12 3s6 6.5 6 10.5A6 6 0 0 1 6 13.5C6 9.5 12 3 12 3Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" /></svg>,
  fan: (p) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" {...p}><circle cx="12" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" /><path d="M12 10c0-4 .5-6-1.5-6S7 7 12 10Zm0 4c0 4-.5 6 1.5 6S17 17 12 14Zm-2-2c-4 0-6-.5-6 1.5S7 17 10 12Zm4 0c4 0 6 .5 6-1.5S17 7 14 12Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>,
  pin: (p) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" {...p}><path d="M12 21s7-6 7-11a7 7 0 1 0-14 0c0 5 7 11 7 11Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" /><circle cx="12" cy="10" r="2.4" stroke="currentColor" strokeWidth="1.7" /></svg>,
  clock: (p) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" {...p}><circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.7" /><path d="M12 7.5V12l3 2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></svg>,
  check: (p) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" {...p}><path d="M5 12.5 10 17.5 19 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  checkC: (p) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" {...p}><circle cx="12" cy="12" r="9" fill="currentColor" /><path d="M8 12.3l2.6 2.6L16 9.4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  tractor: (p) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" {...p}><circle cx="7" cy="16.5" r="3.2" stroke="currentColor" strokeWidth="1.6" /><circle cx="17.5" cy="17" r="2.5" stroke="currentColor" strokeWidth="1.6" /><path d="M10 16.5h4.5M6.5 13.5V8h4l2 4.8M10.5 8H15l1 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  drone: (p) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" {...p}><circle cx="5" cy="7" r="2.2" stroke="currentColor" strokeWidth="1.5" /><circle cx="19" cy="7" r="2.2" stroke="currentColor" strokeWidth="1.5" /><path d="M5 9.2 9 13m6 0 4-3.8M9 13h6l1.4 4h-8.8L9 13Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><path d="M2.8 7h4.4m9.6 0h4.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>,
  shield: (p) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" {...p}><path d="M12 3 5 6v5.5c0 4 3 7 7 8.5 4-1.5 7-4.5 7-8.5V6l-7-3Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /><path d="M9 12l2 2 4-4.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  leaf: (p) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" {...p}><path d="M5 19c0-7 5-12 14-13-1 9-6 14-13 14-.4 0-1-.4-1-1Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /><path d="M9 15c2-3 4.5-5 8-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>,
  signal: (p) => <svg width="20" height="16" viewBox="0 0 22 18" fill="none" {...p}><path d="M3 15v-2m5 2V9m5 6V5m5 10V2" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" /></svg>,
  expand: (p) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" {...p}><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  cam: (p) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" {...p}><rect x="3" y="7" width="13" height="10" rx="2.5" stroke="currentColor" strokeWidth="1.7" /><path d="M16 11l5-3v8l-5-3v-2Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" /></svg>,
  memo: (p) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" {...p}><rect x="5" y="3.5" width="14" height="17" rx="2.5" stroke="currentColor" strokeWidth="1.7" /><path d="M9 8h6M9 12h6M9 16h3.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></svg>,
  refresh: (p) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" {...p}><path d="M20 11a8 8 0 1 0-.6 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /><path d="M20 4v5h-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  med: (p) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...p}><path d="M9 4h6v3H9zM7.5 7h9l-.7 11a2 2 0 0 1-2 1.9h-3.6a2 2 0 0 1-2-1.9L7.5 7Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /><path d="M12 11v4M10 13h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>,
  clip: (p) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...p}><rect x="5" y="4" width="14" height="17" rx="2.5" stroke="currentColor" strokeWidth="1.6" /><rect x="9" y="2.5" width="6" height="3.5" rx="1.2" stroke="currentColor" strokeWidth="1.6" /><path d="M8.5 11l1.4 1.4 2.6-2.6M8.5 16l1.4 1.4 2.6-2.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  cart: (p) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...p}><path d="M3 4h2l2.2 11h10l2-8H6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /><circle cx="9" cy="19" r="1.5" fill="currentColor" /><circle cx="17" cy="19" r="1.5" fill="currentColor" /></svg>,
  spark: (p) => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" {...p}><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z" fill="currentColor" /></svg>
};

/* status bar */
function StatusBar2({ time = '오후 2:05' }) {
  return (
    <div className="statusbar">
      <span>{time}</span>
      <span className="sb-r">
        <I.signal />
        <svg width="18" height="14" viewBox="0 0 18 14" fill="none"><path d="M1.4 4.3C5.6 0.9 12.4 0.9 16.6 4.3" stroke="#1f241f" strokeWidth="1.7" strokeLinecap="round" /><path d="M3.8 7.1C6.6 4.9 11.4 4.9 14.2 7.1" stroke="#1f241f" strokeWidth="1.7" strokeLinecap="round" /><path d="M6.2 9.9C7.8 8.7 10.2 8.7 11.8 9.9" stroke="#1f241f" strokeWidth="1.7" strokeLinecap="round" /><circle cx="9" cy="12.3" r="1.15" fill="#1f241f" /></svg>
        <svg width="26" height="13" viewBox="0 0 26 13" fill="none"><rect x="0.6" y="0.6" width="22" height="11.8" rx="3.2" stroke="#1f241f" strokeOpacity="0.5" /><rect x="2.2" y="2.2" width="18.6" height="8.6" rx="2" fill="#222" /><rect x="24" y="4" width="2" height="5" rx="1" fill="#1f241f" fillOpacity="0.5" /></svg>
      </span>
    </div>);

}

/* app header */
function AppBar({ onMenu, onHome }) {
  return (
    <div className="appbar">
      <button className="hbtn" onClick={onMenu} aria-label="menu" data-coach="menu"><I.menu /></button>
      <h1 onClick={onHome} data-coach="title" style={{ cursor: onHome ? 'pointer' : 'default' }}>AI 이삭이</h1>
      <div className="right">
        <button className="hbtn" style={{ width: 34, height: 34, position: 'relative' }} aria-label="alerts">
          <I.bell />
          <span style={{ position: 'absolute', top: 6, right: 6, width: 7, height: 7, borderRadius: '50%', background: 'var(--red)' }} />
        </button>
        <button className="avatarbtn"><img src={A2.avatar} alt="" /></button>
      </div>
    </div>);

}

/* left nav drawer */
const NAV = [
{ key: 'machine', label: '농기계 제어', desc: '밭갈기 · 정식 · 수확 · 제초', img: A2.iconTractor },
{ key: 'greenhouse', label: '스마트 팜 관리', desc: '천창 · 환기 · 온습도', img: A2.iconThermo },
{ key: 'drone', label: '병해충 방제', desc: '드론 방제 · 정밀 진단', img: A2.iconBug }];


function Drawer({ open, current, onSelect, onHome, onClose }) {
  return (
    <React.Fragment>
      <div className="drawer-backdrop" onClick={onClose}
      style={{ opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none' }} />
      <aside className="drawer-panel"
      style={{ transform: open ? 'translateX(0)' : 'translateX(-106%)' }}>
        <div className="drawer-head">
          <button className="avatarbtn" style={{ width: 46, height: 46 }} onClick={onHome}><img src={A2.avatar} alt="" /></button>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 17, fontWeight: 800, color: '#1d231e', letterSpacing: '-.4px', whiteSpace: 'nowrap' }}>AI 이삭이</div>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#8a948c', marginTop: 2, whiteSpace: 'nowrap' }}>스마트 농사 비서</div>
          </div>
          <button className="hbtn" style={{ marginLeft: 'auto' }} onClick={onClose} aria-label="close">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
          </button>
        </div>
        <div className="drawer-cap">기능 메뉴</div>
        <nav className="drawer-list">
          {NAV.map((n) =>
          <button key={n.key} className={"drawer-item" + (current === n.key ? " active" : "")} onClick={() => onSelect(n.key)}>
              <span className="di-icon"><img src={n.img} alt="" style={{ width: 36, height: 36, objectFit: 'contain' }} /></span>
              <span className="di-txt">
                <span className="di-label">{n.label}</span>
                <span className="di-desc">{n.desc}</span>
              </span>
              <span className="di-go"><I.back width={18} height={18} style={{ transform: 'scaleX(-1)' }} /></span>
            </button>
          )}
        </nav>
        <button className="drawer-home" onClick={onHome}>
          <span style={{ color: 'var(--green)', display: 'grid', placeItems: 'center' }}><I.leaf width={18} height={18} /></span> 홈 화면
        </button>
      </aside>
    </React.Fragment>);

}

/* chat input bar */
function ChatBar() {
  return (
    <div className="chatbar">
      <button className="plus"><I.plus /></button>
      <div className="field">이삭이에게 질문해 보세요...</div>
      <button className="mic"><I.mic /></button>
    </div>);

}

/* chat bubbles */
function Bot({ children, ts, showAva = true }) {
  return (
    <div className="row-bot">
      <div className="ava" style={{ visibility: showAva ? 'visible' : 'hidden' }}><img src={A2.avatar} alt="" /></div>
      <div className="bubble-bot">{children}</div>
      <span className="ts">{ts}</span>
    </div>);

}
function User({ children, ts }) {
  return (
    <div className="row-user">
      <span className="ts">{ts}</span>
      <div className="bubble-user">{children}</div>
    </div>);

}
/* typing indicator (bot is composing) */
function Typing() {
  return (
    <div className="row-bot">
      <div className="ava"><img src={A2.avatar} alt="" /></div>
      <div className="bubble-bot" style={{ padding: '13px 16px' }}>
        <span className="typing"><i /><i /><i /></span>
      </div>
    </div>);

}

Object.assign(window, { A2, I, StatusBar2, AppBar, ChatBar, Bot, User, Typing, Drawer, NAV });