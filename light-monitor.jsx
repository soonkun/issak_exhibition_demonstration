/* ===== MONITORING screen ===== */

const MON = {
  machine:{
    title:'농기계 제어', sub:'밭갈기 트랙터 작업을\n실시간으로 확인하고 있어요.', statusTime:'오후 2:16',
    badge:'대상 필지 A-3', workLabel:'밭갈기 작업', progress:63, map:A2.mapField, mascot:asset('light/hero_machine.png'),
    stats:[
      {icon:'tractor', label:'현재 상태', value:'밭갈기 중', color:'var(--green)'},
      {icon:'pin', label:'대상 필지', value:'A-3'},
      {icon:'clock', label:'작업 시작', value:'오후 02:00'},
      {icon:'checkC', label:'예상 완료', value:'오후 02:30'},
    ],
    videoLabel:'농기계 실시간 영상',
    monitorTitle:'실시간 작업 모니터링', statusText:'작업 진행 중', memoLabel:'작업 메모',
    media:{type:'video', src:A2.videoPlow, poster:A2.posterPlow},
    memo:'밭갈기 작업 정상 진행 중',
  },
  greenhouse:{
    title:'온실 환경 제어', sub:'천창 개방 작업을\n실시간으로 확인하고 있어요.', statusTime:'오전 10:08',
    badge:'대상 온실 1동', workLabel:'고온·다습 대응', progress:58, map:A2.mapGreenhouse, mascot:asset('light/hero_greenhouse.png'),
    stats:[
      {icon:'fan', label:'현재 상태', value:'천창 개방 중', color:'var(--green)'},
      {icon:'thermo', label:'현재 온도', value:'31℃', color:'var(--red)'},
      {icon:'drop', label:'현재 습도', value:'82%', color:'var(--blue)'},
      {icon:'clock', label:'작업 시작', value:'오전 10:04'},
      {icon:'checkC', label:'예상 완료', value:'오전 10:12'},
    ],
    videoLabel:'온실 실시간 영상',
    monitorTitle:'실시간 작업 모니터링', statusText:'작업 진행 중', memoLabel:'작업 메모',
    media:{type:'video', src:A2.videoGreenhouse, poster:A2.recGreenhouse},
    memo:'천창 개방 후 환기 진행 중',
  },
  drone:{
    title:'병해충 방제', sub:'드론 방제 작업을\n실시간으로 확인하고 있어요.', statusTime:'오전 06:59',
    badge:'대상 구역 2구역', workLabel:'논 12필지 중', progress:67, map:A2.mapGrid, mascot:asset('light/hero_magnify.png'),
    stats:[
      {icon:'drone', label:'현재 상태', value:'방제 중', color:'var(--green)'},
      {icon:'pin', label:'대상 구역', value:'2구역'},
      {icon:'clock', label:'작업 시작', value:'오전 06:30'},
      {icon:'checkC', label:'예상 완료', value:'오전 07:10'},
    ],
    videoLabel:'드론 실시간 영상',
    monitorTitle:'실시간 작업 모니터링', statusText:'작업 진행 중', memoLabel:'작업 메모',
    media:{type:'video', src:A2.videoDrone, poster:A2.recDrone},
    memo:'도열병 초기 징후 구역 방제 진행 중',
  },
};

function ProgressBar({target}){
  const [p, setP] = useState(0);
  useEffect(()=>{
    const start = Date.now(), dur=(window.__PROG_MS||1500);
    const id = setInterval(()=>{
      const k = Math.min(1, (Date.now()-start)/dur);
      setP(Math.round(target*k));
      if(k>=1) clearInterval(id);
    }, 50);
    return ()=>clearInterval(id);
  },[target]);
  return (
    <div style={{display:'flex', alignItems:'center', gap:12}}>
      <div style={{flex:1, height:11, borderRadius:999, background:'#eef0ec', overflow:'hidden'}}>
        <div style={{height:'100%', width:p+'%', borderRadius:999,
          background:'linear-gradient(90deg,#6cc28a,#43a86a)', transition:'width .1s linear'}}/>
      </div>
      <span style={{fontSize:15, fontWeight:800, color:'var(--green-d)', fontVariantNumeric:'tabular-nums', minWidth:42, textAlign:'right'}}>{p}%</span>
    </div>
  );
}

function StatRow({stats}){
  return (
    <div style={{display:'flex', marginTop:4}}>
      {stats.map((s,i)=>(
        <div key={i} style={{flex:1, textAlign:'center', padding:'2px 3px', borderLeft:i?'1px solid #eef1ee':'none'}}>
          <div style={{color:s.color||'var(--green)', display:'flex', justifyContent:'center', marginBottom:5}}>
            {React.cloneElement(I[s.icon](),{width:19,height:19})}
          </div>
          <div style={{fontSize:10.5, color:'#9aa49c', fontWeight:700, marginBottom:3, whiteSpace:'nowrap'}}>{s.label}</div>
          <div style={{fontSize:12, color:s.color||'#2b322c', fontWeight:800, whiteSpace:'nowrap'}}>{s.value}</div>
        </div>
      ))}
    </div>
  );
}

function MediaFrame({media}){
  const vid = useRef(null);
  useEffect(()=>{ const v=vid.current; if(v){ v.muted=true; if(window.__VIDEO_AUTOPLAY!==false){ const p=v.play(); if(p&&p.catch)p.catch(()=>{}); } else { v.pause(); } } },[]);
  return (
    <div style={{position:'relative', borderRadius:14, overflow:'hidden', background:'#0c1410', aspectRatio:'16/9'}}>
      {media.type==='video'
        ? <video ref={vid} src={media.src} poster={media.poster} autoPlay muted loop playsInline preload="auto"
            style={{width:'100%', height:'100%', objectFit:'cover'}}/>
        : <img src={media.src} alt="" style={{width:'100%', height:'100%', objectFit:'cover'}}/>}
    </div>
  );
}

function MonitorScreenBase({flowKey, onHome, onMenu}){
  const m = MON[flowKey];
  return (
    <div className="screen" id={'mon-' + flowKey} data-screen-label={'mon-' + flowKey}>
      <div className="skybg"/>
      <StatusBar2 time={m.statusTime || '오후 2:05'}/>
      <AppBar onMenu={onMenu} onHome={onHome}/>
      <div className="body" style={{padding:'0 16px 8px'}}>
        {/* hero */}
        <div style={{display:'flex', alignItems:'center', gap:12, padding:'2px 6px 14px', minHeight:118}}>
          <img src={m.mascot || A2.monitorMascot} alt="" style={{width:100, flex:'none'}}/>
          <div style={{flex:1, minWidth:0}}>
            <h2 style={{fontSize:25, fontWeight:800, color:'#26302a', letterSpacing:'-.8px', whiteSpace:'nowrap'}}>{m.title}</h2>
            <div style={{fontSize:13.5, fontWeight:600, color:'#7d877f', marginTop:6, lineHeight:1.45, whiteSpace:'pre-line'}}>{m.sub}</div>
          </div>
        </div>

        {/* monitoring card */}
        <div className="card" style={{padding:'16px 16px 14px', marginBottom:14}}>
          <div style={{display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:10}}>
            <span style={{display:'inline-flex', alignItems:'center', gap:6, fontSize:13.5, fontWeight:800, color:'var(--green-d)', whiteSpace:'nowrap'}}>
              <I.signal/> {m.monitorTitle || '실시간 작업 모니터링'}
            </span>
            <span className="pill" style={{fontSize:12}}>{m.badge}</span>
          </div>
          <div style={{display:'flex', alignItems:'baseline', justifyContent:'space-between', marginBottom:11, gap:8}}>
            <span style={{fontSize:20, fontWeight:800, color:'var(--red)', letterSpacing:'-.5px', whiteSpace:'nowrap'}}>{m.statusText || '작업 진행 중'}</span>
            <span style={{fontSize:13, fontWeight:700, color:'#9aa49c', whiteSpace:'nowrap'}}>{m.workLabel}</span>
          </div>
          <ProgressBar target={m.progress}/>
          <div style={{borderRadius:14, overflow:'hidden', margin:'14px 0 4px', border:'1px solid #eef1ee'}}>
            <img src={m.map} alt="" style={{width:'100%', display:'block'}}/>
          </div>
          <div style={{height:1, background:'#f0f2ef', margin:'12px 0 2px'}}/>
          <StatRow stats={m.stats}/>
        </div>

        {/* live video card */}
        <div className="card" style={{padding:'14px 15px 14px', marginBottom:8}}>
          <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:11}}>
            <span style={{display:'inline-flex', alignItems:'center', gap:7, fontSize:14.5, fontWeight:800, color:'#2b322c', whiteSpace:'nowrap'}}>
              <span style={{color:'var(--green)'}}><I.cam/></span> {m.videoLabel}
            </span>
            <span style={{display:'flex', alignItems:'center', gap:10, color:'#9aa49c'}}>
              <span style={{color:'var(--green)'}}><I.signal/></span><I.expand/>
            </span>
          </div>
          <MediaFrame media={m.media}/>
          <div style={{display:'flex', alignItems:'center', gap:10, background:'#eef7f0', borderRadius:12, padding:'11px 14px', marginTop:12}}>
            <span style={{display:'inline-flex', alignItems:'center', gap:6, fontSize:13, fontWeight:800, color:'var(--green-d)', flex:'none'}}>
              <I.memo width={18} height={18}/> {m.memoLabel || '작업 메모'}
            </span>
            <span style={{width:1, height:14, background:'#cfe2d4', flex:'none'}}/>
            <span style={{fontSize:13.5, fontWeight:600, color:'#46504a'}}>{m.memo}</span>
          </div>
        </div>
      </div>
      <ChatBar/>
    </div>
  );
}

/* Per-flow wrappers → flow-unique React path so monitor edits stay scoped. */
function MonitorMachine(props){ return <MonitorScreenBase flowKey="machine" {...props}/>; }
function MonitorGreenhouse(props){ return <MonitorScreenBase flowKey="greenhouse" {...props}/>; }
function MonitorDrone(props){ return <MonitorScreenBase flowKey="drone" {...props}/>; }

Object.assign(window, { MON, MonitorScreenBase, MonitorMachine, MonitorGreenhouse, MonitorDrone, ProgressBar, StatRow, MediaFrame });
