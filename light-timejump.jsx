/* ===== TIME-LAPSE interstitial: chat (now) → scheduled work time → monitor ===== */

/* per-flow jump config. greenhouse is '진행 중' (즉시) → no jump (handled in app). */
const TIMEJUMPS = {
  machine: { fromMin: 10*60,    toMin: 14*60,    nextDay:false, dur:4400, work:'밭갈기 트랙터 작업', toLabel:'오늘 오후' },
  drone:   { fromMin: 7*60+30, toMin: 6*60+30,  nextDay:true,  dur:5400, work:'도열병 드론 방제',  toLabel:'다음 날 오전' },
};

function fmtClock(min){
  let m = Math.round(((min % 1440) + 1440) % 1440);
  const h24 = Math.floor(m/60), mm = m%60;
  const ampm = h24 < 12 ? '오전' : '오후';
  let h12 = h24 % 12; if(h12===0) h12 = 12;
  return { ampm, hm: h12 + ':' + String(mm).padStart(2,'0') };
}

/* hex → [r,g,b] */
function hx(h){ h=h.replace('#',''); return [parseInt(h.slice(0,2),16),parseInt(h.slice(2,4),16),parseInt(h.slice(4,6),16)]; }
function mix(a,b,t){ const A=hx(a),B=hx(b); return 'rgb('+A.map((v,i)=>Math.round(v+(B[i]-v)*t)).join(',')+')'; }
/* interpolate across keyframes [{p, top, mid, bot}] at progress p → {top,mid,bot} */
function skyAt(keys, p){
  let i=0; while(i<keys.length-1 && p>keys[i+1].p) i++;
  const a=keys[i], b=keys[Math.min(i+1,keys.length-1)];
  const span=(b.p-a.p)||1, t=Math.max(0,Math.min(1,(p-a.p)/span));
  return { top:mix(a.top,b.top,t), mid:mix(a.mid,b.mid,t), bot:mix(a.bot,b.bot,t) };
}

/* ---- time-of-day driven sky + celestial ---- */
const SKY_TOD = [
  { m:0,    top:'#1b2647', mid:'#243056', bot:'#3a4470' }, // deep night
  { m:300,  top:'#1f2a4c', mid:'#2a3a64', bot:'#46517f' }, // 5:00 still night
  { m:345,  top:'#4a4f7e', mid:'#7e6f96', bot:'#cf9f86' }, // 5:45 pre-dawn
  { m:390,  top:'#7fb3da', mid:'#e7c39c', bot:'#fbdca0' }, // 6:30 dawn
  { m:480,  top:'#9fd3ef', mid:'#cfe8d6', bot:'#eef6ec' }, // 8:00 morning
  { m:720,  top:'#8fc8ec', mid:'#d4ecda', bot:'#f3f7ec' }, // noon
  { m:960,  top:'#a7d6ea', mid:'#dcebcf', bot:'#f6efde' }, // 16:00 afternoon
  { m:1080, top:'#f3b06a', mid:'#ef9d73', bot:'#e7c39c' }, // 18:00 sunset
  { m:1140, top:'#9c6a92', mid:'#6f5f93', bot:'#d39f88' }, // 19:00 dusk
  { m:1230, top:'#2c3a64', mid:'#28355e', bot:'#3a4470' }, // 20:30 night
];
function skyTodAt(tod){
  const ks=SKY_TOD;
  for(let i=0;i<ks.length;i++){
    const cur=ks[i], nxt=ks[(i+1)%ks.length];
    let lo=cur.m, hi=nxt.m; if(hi<=lo) hi+=1440;
    let x=tod; if(x<lo) x+=1440;
    if(x>=lo && x<=hi){ const t=(x-lo)/((hi-lo)||1); return { top:mix(cur.top,nxt.top,t), mid:mix(cur.mid,nxt.mid,t), bot:mix(cur.bot,nxt.bot,t) }; }
  }
  return { top:ks[0].top, mid:ks[0].mid, bot:ks[0].bot };
}
/* sun visible 6:00-18:00, moon 18:00-6:00; returns position + type for a time-of-day (min) */
function celestialAt(tod){
  if(tod>=360 && tod<=1080){
    const f=(tod-360)/720;                 // 0 at sunrise, 1 at sunset
    return { type:'sun', x:8 + f*84, y:84 - Math.sin(Math.PI*f)*62 };
  }
  const nm = tod>=1080 ? tod-1080 : tod+360; // minutes since 18:00 (0..720)
  const f = nm/720;
  return { type:'moon', x:8 + f*84, y:84 - Math.sin(Math.PI*f)*56 };
}

function TimeJump({ flowKey, onDone, onHome }){
  const cfg = TIMEJUMPS[flowKey] || TIMEJUMPS.machine;
  const dur = cfg.dur || (cfg.nextDay ? 5400 : 4400);
  const span = cfg.nextDay ? (cfg.toMin + 1440 - cfg.fromMin) : (cfg.toMin - cfg.fromMin);
  const [p, setP] = useState(0);
  const raf = useRef(0); const done = useRef(false);

  const finish = ()=>{ if(done.current) return; done.current=true; cancelAnimationFrame(raf.current); onDone(); };

  useEffect(()=>{
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if(reduce){ setP(1); const t=setTimeout(finish, 900); return ()=>clearTimeout(t); }
    const t0 = performance.now();
    const tick = (now)=>{
      const e = Math.min(1, (now-t0)/dur);
      // ease in-out so the clock eases to a stop on the target
      const eased = e<0.5 ? 2*e*e : 1-Math.pow(-2*e+2,2)/2;
      setP(eased);
      if(e<1){ raf.current = requestAnimationFrame(tick); }
      else { setTimeout(finish, 620); }
    };
    raf.current = requestAnimationFrame(tick);
    return ()=>cancelAnimationFrame(raf.current);
  },[]);

  const nowMin = cfg.fromMin + span*p;
  const tod = ((Math.round(nowMin) % 1440) + 1440) % 1440;
  const clock = fmtClock(nowMin);
  const sky = skyTodAt(tod);

  // celestial body placed by real time-of-day
  const body = celestialAt(tod);
  const cx = body.x, cy = body.y, celest = body.type;

  // night-ness for stars + text contrast (shift early-morning past midnight)
  const nd = tod < 345 ? tod + 1440 : tod;              // 1140..1785 == 19:00..05:45
  const starsOpacity = (nd>=1140) ? Math.min(1,(nd-1140)/55) * Math.min(1,(1785-nd)/55) : 0;
  const darkUI = nd>=1130 && nd<=1755;

  const celestColor = celest==='moon' ? '#eef2ff'
    : (tod<420 ? mix('#ff9d63','#ffd66b',(tod-360)/60)          // sunrise warm
    : tod>1020 ? mix('#ffd66b','#ff8a4d',(tod-1020)/60)         // sunset warm
    : '#ffd66b');
  const celestGlow = celest==='moon' ? 'rgba(220,228,255,.55)' : 'rgba(255,196,92,.6)';
  const txtCol = darkUI ? '#eaf0ff' : '#243029';
  const subCol = darkUI ? 'rgba(234,240,255,.78)' : 'rgba(36,48,41,.6)';
  return (
    <div className="screen" id={'timejump-' + flowKey} data-screen-label={'timejump-' + flowKey} onClick={finish}
      style={{ cursor:'pointer', background:`linear-gradient(180deg, ${sky.top} 0%, ${sky.mid} 52%, ${sky.bot} 100%)`, transition:'none' }}>
      <StatusBar2 time={clock.ampm + ' ' + clock.hm}/>

      {/* stars (night) */}
      <div style={{ position:'absolute', inset:0, opacity: starsOpacity, transition:'opacity .2s', pointerEvents:'none' }}>
        {STAR_POS.map((s,i)=>(
          <span key={i} style={{ position:'absolute', left:s.x+'%', top:s.y+'%', width:s.r, height:s.r, borderRadius:'50%', background:'#fff', boxShadow:'0 0 6px rgba(255,255,255,.8)' }}/>
        ))}
      </div>

      {/* celestial body on its arc */}
      <div style={{ position:'absolute', left:cx+'%', top:cy+'%', transform:'translate(-50%,-50%)', pointerEvents:'none' }}>
        <div style={{ width:64, height:64, borderRadius:'50%', background:celestColor,
          boxShadow:`0 0 0 14px ${celestGlow.replace(/[\d.]+\)$/,'0.18)')}, 0 0 46px 12px ${celestGlow}` }}/>
        {celest==='moon' && <div style={{ position:'absolute', top:8, left:20, width:46, height:46, borderRadius:'50%', background:sky.top }}/>}
      </div>

      {/* rolling hills silhouette */}
      <svg viewBox="0 0 393 150" preserveAspectRatio="none" style={{ position:'absolute', left:0, right:0, bottom:150, width:'100%', height:150, opacity:.9 }}>
        <path d="M0,120 C70,70 130,110 210,80 C280,55 340,95 393,70 L393,150 L0,150 Z"
          fill={darkUI ? 'rgba(20,30,52,.55)' : 'rgba(72,140,96,.32)'}/>
        <path d="M0,140 C90,100 160,135 250,112 C320,95 360,120 393,108 L393,150 L0,150 Z"
          fill={darkUI ? 'rgba(12,20,38,.7)' : 'rgba(54,118,78,.45)'}/>
      </svg>

      {/* center HUD: clock + caption */}
      <div style={{ position:'absolute', left:0, right:0, bottom:150, display:'flex', flexDirection:'column', alignItems:'center', gap:14, padding:'0 30px 36px' }}>
        <div style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'7px 16px', borderRadius:999,
          background: darkUI ? 'rgba(255,255,255,.12)' : 'rgba(255,255,255,.62)', backdropFilter:'blur(6px)',
          border:`1px solid ${darkUI?'rgba(255,255,255,.22)':'rgba(255,255,255,.8)'}`, color:txtCol, fontSize:13.5, fontWeight:800, whiteSpace:'nowrap' }}>
          <span className="fastfwd">⏩</span> 예약된 시간으로 이동 중
        </div>

        <div style={{ display:'flex', alignItems:'baseline', gap:10, whiteSpace:'nowrap', color:txtCol, textShadow: darkUI?'0 2px 14px rgba(0,0,0,.4)':'none' }}>
          <span style={{ fontSize:22, fontWeight:800, opacity:.85, letterSpacing:'-.5px' }}>{clock.ampm}</span>
          <span style={{ fontSize:74, fontWeight:800, letterSpacing:'-2px', lineHeight:.9, fontVariantNumeric:'tabular-nums' }}>{clock.hm}</span>
        </div>

        {cfg.nextDay && (
          <div style={{ fontSize:13, fontWeight:800, color: tod<420 ? '#cf7a2e' : subCol, whiteSpace:'nowrap',
            opacity: nowMin>=1080?1:0, transition:'opacity .4s' }}>
            ☾ 밤을 지나 다음 날 아침으로
          </div>
        )}

        <div style={{ textAlign:'center', color:subCol, fontSize:14, fontWeight:600, lineHeight:1.5, marginTop:2, wordBreak:'keep-all' }}>
          {cfg.work}이<br/>
          <b style={{ color: txtCol }}>{cfg.toLabel} {fmtClock(cfg.toMin).hm}</b>에 시작됩니다
        </div>
      </div>

      {/* progress + skip hint */}
      <div style={{ position:'absolute', left:0, right:0, bottom:46, padding:'0 40px', display:'flex', flexDirection:'column', alignItems:'center', gap:12 }}>
        <div style={{ width:'100%', height:5, borderRadius:99, background: darkUI?'rgba(255,255,255,.2)':'rgba(60,90,70,.16)', overflow:'hidden' }}>
          <div style={{ width:(p*100)+'%', height:'100%', borderRadius:99,
            background: darkUI?'linear-gradient(90deg,#ffd66b,#ffb15a)':'linear-gradient(90deg,var(--green-2),var(--green))', transition:'none' }}/>
        </div>
        <span style={{ fontSize:11.5, fontWeight:700, color:subCol, letterSpacing:'.3px', whiteSpace:'nowrap' }}>화면을 누르면 바로 이동합니다</span>
      </div>
    </div>
  );
}

const STAR_POS = [
  {x:14,y:14,r:2},{x:28,y:9,r:1.5},{x:42,y:18,r:2.5},{x:58,y:11,r:1.5},{x:71,y:20,r:2},
  {x:83,y:13,r:2.5},{x:90,y:26,r:1.5},{x:9,y:30,r:1.5},{x:22,y:24,r:2},{x:36,y:32,r:1.5},
  {x:64,y:28,r:2},{x:77,y:34,r:1.5},{x:50,y:6,r:2},{x:6,y:20,r:2},{x:94,y:18,r:1.5},
];

Object.assign(window, { TIMEJUMPS, TimeJump });
