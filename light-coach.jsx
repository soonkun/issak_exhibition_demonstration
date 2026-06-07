/* ===== Coach marks: first-run guided tour of the home screen ===== */

const COACH_STEPS = [
  { key:'menu',       shape:'circle', title:'메뉴 열기',     desc:'햄버거 버튼을 누르면 기능 메뉴와 홈 화면을 열 수 있어요.' },
  { key:'title',      shape:'rect',   title:'홈으로 이동',   desc:'어느 화면에서든 ‘AI 이삭이’를 누르면 이 홈으로 돌아와요.' },
  { key:'machine',    shape:'circle', title:'농기계 제어',   desc:'밭갈기·정식·수확 등 농기계 작업을 이삭이와 대화하며 제어해요.' },
  { key:'greenhouse', shape:'circle', title:'스마트 팜 관리', desc:'온실 천창·환기·온습도를 관리하고 실시간으로 확인해요.' },
  { key:'drone',      shape:'circle', title:'병해충 방제',   desc:'드론 방제와 정밀 진단으로 병해충에 빠르게 대응해요.' },
];

function Coachmarks({ onDone }){
  const [i, setI] = useState(0);
  const [rect, setRect] = useState(null);
  const step = COACH_STEPS[i];

  const measure = ()=>{
    const scaler = document.querySelector('.scaler');
    const el = document.querySelector('#home [data-coach="' + step.key + '"]');
    if(!scaler || !el){ setRect(null); return; }
    const sr = scaler.getBoundingClientRect();
    const er = el.getBoundingClientRect();
    const scale = sr.width / 393;             // on-screen px per logical px
    setRect({
      x:(er.left - sr.left)/scale, y:(er.top - sr.top)/scale,
      w:er.width/scale, h:er.height/scale,
    });
  };

  useEffect(()=>{
    measure();
    const r=()=>measure();
    window.addEventListener('resize', r);
    const t1=setTimeout(measure, 60), t2=setTimeout(measure, 260);
    return ()=>{ window.removeEventListener('resize', r); clearTimeout(t1); clearTimeout(t2); };
  },[i]);

  if(!rect) return null;

  const pad = step.shape==='circle' ? 7 : 8;
  const cx  = rect.x + rect.w/2;
  const last = i === COACH_STEPS.length-1;
  const next = ()=> last ? onDone() : setI(i+1);

  let holeX, holeY, holeW, holeH, radius;
  if(step.shape==='circle'){
    const R = Math.max(rect.w, rect.h)/2 + pad;
    holeX = cx - R; holeY = (rect.y + rect.h/2) - R; holeW = R*2; holeH = R*2; radius = R;
  } else {
    holeX = rect.x - pad; holeY = rect.y - pad; holeW = rect.w + pad*2; holeH = rect.h + pad*2; radius = 12;
  }

  const tipY = holeY + holeH + 15;
  const arrowLeft = Math.max(16, Math.min(cx - 14, 393 - 28 - 24)); // relative to full-width tooltip

  return (
    <div style={{ position:'absolute', inset:0, zIndex:80, animation:'coachFade .3s ease' }}>
      {/* click-anywhere-to-advance catcher */}
      <div onClick={next} style={{ position:'absolute', inset:0, cursor:'pointer' }} />

      {/* spotlight cutout (visual only) */}
      <div style={{ position:'absolute', left:holeX, top:holeY, width:holeW, height:holeH, borderRadius:radius,
        boxShadow:'0 0 0 2000px rgba(14,24,18,.74)', border:'2px solid rgba(255,255,255,.92)',
        pointerEvents:'none', transition:'all .3s cubic-bezier(.4,0,.2,1)' }} />

      {/* tooltip */}
      <div style={{ position:'absolute', left:14, right:14, top:tipY, pointerEvents:'none', transition:'top .3s cubic-bezier(.4,0,.2,1)' }}>
        <div style={{ position:'relative', background:'#fff', borderRadius:15, padding:'14px 16px 13px',
          boxShadow:'0 18px 44px -12px rgba(0,0,0,.45)', pointerEvents:'auto' }}>
          <div style={{ position:'absolute', top:-8, left:arrowLeft, width:0, height:0,
            borderLeft:'8px solid transparent', borderRight:'8px solid transparent', borderBottom:'9px solid #fff' }} />

          <div style={{ display:'flex', alignItems:'center', gap:7, marginBottom:5 }}>
            <span style={{ fontSize:11, fontWeight:800, color:'var(--green)', letterSpacing:'.3px' }}>STEP {i+1} / {COACH_STEPS.length}</span>
          </div>
          <div style={{ fontSize:16.5, fontWeight:800, color:'#26302a', letterSpacing:'-.4px' }}>{step.title}</div>
          <div style={{ fontSize:13, fontWeight:500, color:'#5c655e', lineHeight:1.5, marginTop:5, wordBreak:'keep-all' }}>{step.desc}</div>

          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginTop:13 }}>
            <button onClick={onDone} style={{ background:'none', border:'none', cursor:'pointer', fontSize:12.5, fontWeight:700, color:'#9aa49c', padding:'4px 2px' }}>건너뛰기</button>
            <div style={{ display:'flex', gap:5 }}>
              {COACH_STEPS.map((s,k)=>(
                <span key={k} style={{ width: k===i?16:6, height:6, borderRadius:99, background: k===i?'var(--green)':'#d8e0d9', transition:'all .25s' }} />
              ))}
            </div>
            <button onClick={next} style={{ display:'inline-flex', alignItems:'center', gap:5, border:'none', cursor:'pointer',
              background:'linear-gradient(180deg,#5cba7e,#43a86a)', color:'#fff', fontSize:13.5, fontWeight:800,
              padding:'8px 15px', borderRadius:11, boxShadow:'0 8px 18px -8px rgba(67,168,106,.7)' }}>
              {last ? '시작하기' : '다음'} {!last && <I.back width={15} height={15} style={{ transform:'scaleX(-1)' }} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Coachmarks, COACH_STEPS });
