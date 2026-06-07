/* ===== App router (light · 575×1020 exhibition) + Tweaks ===== */

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#43a86a",
  "sky": true,
  "videoAutoplay": true,
  "progressSpeed": "보통"
}/*EDITMODE-END*/;

const PROG_MS = { "빠르게":900, "보통":1500, "천천히":2600 };

function App(){
  const [scr, setScr] = useState({name:'intro', flow:null});
  const [drawer, setDrawer] = useState(false);
  const [leaving, setLeaving] = useState(false); // intro page flipping away
  const [coach, setCoach] = useState(false);     // first-run guided tour on home
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const intro = ()=>{ setDrawer(false); setLeaving(false); setCoach(false); setScr({name:'intro', flow:null}); };  // drawer "홈 화면" → landing (resets tour)
  const home = ()=>{ setDrawer(false); setScr({name:'home', flow:null}); };    // app title → home (no tour)
  // 시작하기 → book page-turn into home, then run the guided tour once
  const startApp = ()=>{ setScr({name:'home', flow:null}); setLeaving(true); setTimeout(()=>setLeaving(false), 760); setTimeout(()=>setCoach(true), 920); };
  const openMenu = ()=>setDrawer(true);
  const goChat = (f)=>{ setDrawer(false); setScr({name:'chat', flow:f}); };
  // reserved card → time-lapse (if the work is scheduled for later), else straight to monitor
  const goMonitor = (f)=>{
    if(window.TIMEJUMPS && window.TIMEJUMPS[f]) setScr({name:'timejump', flow:f});
    else setScr({name:'monitor', flow:f});
  };

  // accent color → CSS vars
  useEffect(()=>{
    const root = document.documentElement.style;
    const a = t.accent || '#43a86a';
    root.setProperty('--green', a);
    root.setProperty('--green-d', shade(a,-14));
    root.setProperty('--green-2', shade(a,12));
  },[t.accent]);

  // sky gradient toggle (components hardcode .skybg, so gate it globally)
  useEffect(()=>{
    document.documentElement.classList.toggle('no-sky', t.sky===false);
  },[t.sky]);

  // expose runtime flags the screens read
  window.__VIDEO_AUTOPLAY = t.videoAutoplay !== false;
  window.__PROG_MS = PROG_MS[t.progressSpeed] || 1500;

  const CHATS = { machine: ChatMachine, greenhouse: ChatGreenhouse, drone: ChatDrone };
  const MONITORS = { machine: MonitorMachine, greenhouse: MonitorGreenhouse, drone: MonitorDrone };
  const ChatCmp = CHATS[scr.flow] || ChatMachine;
  const MonCmp = MONITORS[scr.flow] || MonitorMachine;

  return (
    <div className="stage">
      <div className="scaler">
        {scr.name==='intro' && <Intro onStart={startApp}/>}
        {scr.name==='home' && <div style={{height:'100%'}} className={leaving?'page-entering':undefined}><Home onNav={goChat} onMenu={openMenu} onHome={home}/></div>}
        {scr.name==='chat' && <ChatCmp key={'chat-'+scr.flow} onHome={home} onMenu={openMenu} onMonitor={()=>goMonitor(scr.flow)}/>}
        {scr.name==='timejump' && <TimeJump key={'tj-'+scr.flow} flowKey={scr.flow} onHome={home} onDone={()=>setScr({name:'monitor', flow:scr.flow})}/>}
        {scr.name==='monitor' && <MonCmp key={scr.flow+'-'+window.__PROG_MS+'-'+window.__VIDEO_AUTOPLAY} onHome={home} onMenu={openMenu}/>}
        {leaving && <div className="page-leaving"><Intro onStart={()=>{}}/></div>}
        {scr.name==='home' && coach && <Coachmarks onDone={()=>setCoach(false)}/>}
        <Drawer open={drawer} current={scr.flow} onSelect={goChat} onHome={intro} onClose={()=>setDrawer(false)}/>
      </div>

      <TweaksPanel title="Tweaks">
        <TweakSection label="브랜드"/>
        <TweakColor label="강조 색상" value={t.accent}
          options={["#43a86a","#2f9e8e","#3d7fd6","#d98a2b"]}
          onChange={(v)=>setTweak('accent', v)}/>
        <TweakSection label="화면"/>
        <TweakToggle label="하늘 배경 그라데이션" value={t.sky}
          onChange={(v)=>setTweak('sky', v)}/>
        <TweakSection label="모니터링"/>
        <TweakToggle label="실시간 영상 자동재생" value={t.videoAutoplay}
          onChange={(v)=>setTweak('videoAutoplay', v)}/>
        <TweakRadio label="진행률 애니메이션" value={t.progressSpeed}
          options={["빠르게","보통","천천히"]}
          onChange={(v)=>setTweak('progressSpeed', v)}/>
      </TweaksPanel>
    </div>
  );
}

/* tiny hex shade helper */
function shade(hex, amt){
  const n = hex.replace('#','');
  const r = Math.max(0,Math.min(255, parseInt(n.slice(0,2),16) + amt));
  const g = Math.max(0,Math.min(255, parseInt(n.slice(2,4),16) + amt));
  const b = Math.max(0,Math.min(255, parseInt(n.slice(4,6),16) + amt));
  return '#' + [r,g,b].map(v=>v.toString(16).padStart(2,'0')).join('');
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
