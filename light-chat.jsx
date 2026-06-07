/* ===== CHAT flow data + screen ===== */

const FLOWS2 = {
  machine: {
    key: 'machine', title: '농기계 제어', heroTitle: '농기계 제어', heroImg: asset('light/hero_machine.png'), statusTime: '오전 10:02',
    heroSub: '데이터와 경험을 바탕으로\n최적의 작업을 도와드릴게요!',
    pre: [
    { t: 'user', x: '이번 주 해야 될 작업이 뭐지?', ts: '오전 10:02' },
    { t: 'bot', x: '이번 주 금요일에 밭갈기 작업이 예정되어 있습니다. 다만 정식 예정일과 내일 비 예보를 고려하면, 오늘 오후 밭갈기 트랙터 작업을 추천합니다.', ts: '오전 10:02' },
    { t: 'user', x: '왜 지금 해야 해?', ts: '오전 10:03' },
    { t: 'bot', x: '내일 30mm 이상 비가 예보되어 있어 흙이 질어지면 밭갈기 작업이 어려울 수 있습니다. 작업 깊이는 15~20cm 정도가 적절합니다.', ts: '오전 10:03' }],

    recommend: { title: '오늘 오후 밭갈기 트랙터 작업', pill: 'AI 작업 추천', reasonLabel: '사유', button: '지금 예약', thumb: A2.thumbTractor, thumbFit: 'contain',
      fields: [
      { icon: 'cal', label: '일정', value: '오늘 오후\n02:00' },
      { icon: 'rain', label: '사유', value: '내일 30mm 이상 비 예보' },
      { icon: 'shovel', label: '권장 깊이', value: '15~20cm' }]
    },
    post: [
    { t: 'user', x: '그래. 실행해.', ts: '오전 10:04' },
    { t: 'bot', x: '밭갈기 트랙터 작업을 오늘 오후 02:00 일정으로 예약하겠습니다. ✅', ts: '오전 10:04' },
    { t: 'reserved', label: '예약 완료', title: '밭갈기 트랙터 작업', status: '오늘 오후 02:00' }]

  },
  greenhouse: {
    key: 'greenhouse', title: '온실 환경 제어', heroTitle: '스마트 팜 관리', heroImg: asset('light/hero_greenhouse.png'), statusTime: '오전 10:02',
    heroSub: '데이터와 경험을 바탕으로\n최적의 작업을 도와드릴게요!',
    pre: [
    { t: 'bot', x: '현재 온실 온도는 31℃, 습도는 82%입니다. 고온·다습 상태로 병 발생 가능성이 높아지고 있어 천창 개방 작업을 권장합니다.', ts: '오전 10:02' },
    { t: 'user', x: '오늘 관수를 해도 될까?', ts: '오전 10:02' },
    { t: 'bot', x: '아! 관개를 말씀하시는거죠? 현재 습도가 높아 지금은 관개를 하지 않는 것이 좋습니다. 먼저 천창을 열어 환기한 뒤, 온습도 상태를 확인하고 관개 여부를 다시 판단하세요. 참고로.. 관수는 벼가 물에 잠기는걸 의미해요. 앞으로는 관개라고 해주세요^^', ts: '오전 10:03' }],

    recommend: { title: '지금 천창 개방 작업', pill: 'AI 작업 추천', reasonLabel: '사유', button: '지금 시작', thumb: A2.thumbGreenhouse, thumbFit: 'contain',
      fields: [
      { icon: 'thermo', label: '현재 온도', value: '31℃', color: 'var(--red)' },
      { icon: 'drop', label: '현재 습도', value: '82%', color: 'var(--blue)' },
      { icon: 'fan', label: '권장 작업', value: '천창 개방' }],

      reason: '고온·다습 상태로 병 발생 위험 증가' },
    post: [
    { t: 'user', x: '알겠어. 천창 열어줘.', ts: '오전 10:04' },
    { t: 'bot', x: '천창 개방 작업을 실행하겠습니다. 환기 후 온습도 변화를 다시 알려드리겠습니다.', ts: '오전 10:04' },
    { t: 'reserved', label: '작업 실행 완료', title: '천창 개방 작업', status: '진행 중' }]

  },
  drone: {
    key: 'drone', title: '병해충 방제', heroTitle: '병해충 방제', statusTime: '오전 07:15',
    heroSub: '드론 영상과 생육 데이터를 분석해\n방제 의사결정을 도와드릴게요!',
    pre: [
    { t: 'bot', x: '오늘 새벽 드론 영상과 생육 데이터를 분석한 결과, 논 12필지 중 2구역에서 도열병 초기 징후가 감지되었습니다. 빠른 시일 내 방제 조치가 필요합니다.', ts: '오전 07:15' },
    { t: 'user', x: '방제 일정을 잡아줘.', ts: '오전 07:16' },
    { t: 'bot', x: '기상 조건을 고려하면 내일 오전 6시 30분 방제가 적합합니다. 해당 시간으로 방제 일정을 예약하겠습니다.', ts: '오전 07:16' }],

    recommend: { title: '내일 오전 드론 방제 작업', pill: 'AI 작업 추천', reasonLabel: '사유', button: '지금 예약', thumb: A2.thumbDrone, thumbFit: 'contain',
      fields: [
      { icon: 'pin', label: '대상 구역', value: '2구역' },
      { icon: 'shield', label: '이상 징후', value: '도열병 초기', color: 'var(--red)' },
      { icon: 'clock', label: '예약 시간', value: '내일 오전 6:30' },
      { icon: 'drone', label: '권장 작업', value: '드론 방제' }],

      reason: '도열병 초기 징후 감지 및 방제 적기' },
    post: [
    { t: 'user', x: '그래 작업을 예약해줘.', ts: '오전 07:18' },
    { t: 'bot', x: '네. 작업을 예약하였습니다. 아울러 도열병 등록 약제와 안전사용기준을 확인해 사용 가능한 방제 정보를 안내하겠습니다. 농업인 확인 후 주문 또는 구매로 연계할 수 있습니다.', ts: '오전 07:18' },
    { t: 'info' },
    { t: 'reserved', label: '방제 일정 예약 완료', title: '도열병 드론 방제', status: '내일 오전 6:30' }]

  }
};

/* assistant hero strip */
function AssistantHero({ sub, title, img }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '4px 6px 14px' }}>
      <img src={img || A2.heroMascot} alt="" style={{ width: 100, flex: 'none' }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 18.5, fontWeight: 800, color: '#26302a', letterSpacing: '-.5px', display: 'flex', alignItems: 'center', gap: 5, whiteSpace: 'nowrap' }}>
          {title} <span style={{ color: 'var(--green)' }}><I.leaf width={18} height={18} /></span>
        </div>
        <div style={{ fontSize: 13, fontWeight: 600, color: '#7d877f', marginTop: 6, lineHeight: 1.45, whiteSpace: 'pre-line' }}>{sub}</div>
      </div>
    </div>);

}

/* recommend card */
function RecommendCard({ data, onExecute }) {
  return (
    <div className="card" style={{ border: '1.6px solid #bfe3ca', borderRadius: 20, padding: '15px 16px 16px', margin: '2px 0 16px',
      boxShadow: '0 12px 30px -16px rgba(67,168,106,.5)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 13 }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '5px 11px', borderRadius: 999,
          background: 'var(--green-soft)', color: 'var(--green-d)', fontSize: 12.5, fontWeight: 800, whiteSpace: 'nowrap', flex: 'none' }}>
          {data.pill || 'AI 작업 추천'} <span style={{ color: 'var(--green)' }}><I.spark /></span>
        </span>
        <span style={{ color: '#b9c2bb' }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M6 15l6-6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 13, marginBottom: 14 }}>
        <img src={data.thumb} alt="" style={{ width: 74, height: 60, objectFit: data.thumbFit || 'cover', borderRadius: 13, flex: 'none', border: '1px solid #e7ece7', background: '#f1f6f1' }} />
        <div style={{ fontSize: 19.5, fontWeight: 800, color: '#222a24', letterSpacing: '-.5px', lineHeight: 1.25 }}>{data.title}</div>
      </div>
      <div style={{ display: 'flex', background: '#f6f9f6', borderRadius: 14, padding: '13px 6px' }}>
        {data.fields.map((f, i) =>
        <div key={i} style={{ flex: 1, textAlign: 'center', padding: '0 6px',
          borderLeft: i ? '1px solid #e6ebe6' : 'none' }}>
            <div style={{ color: 'var(--green)', display: 'flex', justifyContent: 'center', marginBottom: 6 }}>
              {React.cloneElement(I[f.icon](), { width: 20, height: 20 })}
            </div>
            <div style={{ fontSize: 11.5, color: '#9aa49c', fontWeight: 700, marginBottom: 3 }}>{f.label}</div>
            <div style={{ fontSize: 13, color: f.color || '#2b322c', fontWeight: 800, lineHeight: 1.3, wordBreak: 'keep-all', whiteSpace: 'pre-line' }}>{f.value}</div>
          </div>
        )}
      </div>
      {data.reason &&
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', background: '#f3f6f3', borderRadius: 11, padding: '10px 13px', marginTop: 10 }}>
          <span style={{ fontSize: 11.5, fontWeight: 800, color: '#8a948c', flex: 'none' }}>{data.reasonLabel || '사유'}</span>
          <span style={{ fontSize: 13, color: '#4a534b', fontWeight: 600, lineHeight: 1.4 }}>{data.reason}</span>
        </div>
      }
      <button className="btn-run" style={{ marginTop: 14 }} onClick={onExecute}>
        <I.check width={20} height={20} /> {data.button || '지금 시작'}
      </button>
    </div>);

}

/* drone 방제 정보 안내 card */
function InfoCard() {
  const cols = [
  { icon: 'med', l1: '등록 약제', l2: '확인' },
  { icon: 'clip', l1: '안전사용기준', l2: '안내' },
  { icon: 'cart', l1: '주문·구매', l2: '연계 가능' }];

  return (
    <div className="card" style={{ border: '1.4px solid #d2ead9', borderRadius: 18, padding: '14px 15px 16px', margin: '2px 0 16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 14, fontWeight: 800, color: '#2b322c' }}>
          <span style={{ color: 'var(--green)' }}><I.clip width={19} height={19} /></span> 방제 정보 안내
        </span>
        <span className="pill" style={{ background: '#fef3e6', color: '#d98a2b' }}>농업인 확인 필요</span>
      </div>
      <div style={{ display: 'flex' }}>
        {cols.map((c, i) =>
        <div key={i} style={{ flex: 1, textAlign: 'center', padding: '0 6px', borderLeft: i ? '1px solid #eef1ee' : 'none' }}>
            <div style={{ color: 'var(--green)', display: 'flex', justifyContent: 'center', marginBottom: 8 }}>
              {React.cloneElement(I[c.icon](), { width: 26, height: 26 })}
            </div>
            <div style={{ fontSize: 12.5, fontWeight: 800, color: '#39413b', lineHeight: 1.35 }}>{c.l1}<br />{c.l2}</div>
          </div>
        )}
      </div>
    </div>);

}

/* reserved confirmation card (tappable -> monitor) */
function ReservedCard({ label, title, status, onTap }) {
  return (
    <button onClick={onTap} style={{ display: 'flex', alignItems: 'center', gap: 12, width: '100%', textAlign: 'left',
      background: '#eef7f0', border: '1.4px solid #cfe9d6', borderRadius: 16, padding: '13px 15px', cursor: 'pointer', margin: '2px 0 6px' }}>
      <span style={{ width: 38, height: 38, borderRadius: 11, flex: 'none', display: 'grid', placeItems: 'center',
        background: '#fff', color: 'var(--green)', border: '1px solid #d6ead9' }}><I.cal width={21} height={21} /></span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 11.5, fontWeight: 700, color: 'var(--green-d)' }}>{label}</div>
        <div style={{ fontSize: 15.5, fontWeight: 800, color: '#28302a', marginTop: 1 }}>{title}</div>
      </div>
      <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13.5, fontWeight: 800, color: '#52a874', whiteSpace: 'nowrap' }}>
        {status} <I.back width={17} height={17} style={{ transform: 'scaleX(-1)' }} />
      </span>
    </button>);

}

function ChatScreenBase({ flowKey, onHome, onMenu, onMonitor }) {
  const flow = FLOWS2[flowKey];
  const [list, setList] = useState([]); // revealed transcript; bot items stream `text`, keep full `x`
  const [typing, setTyping] = useState(false);
  const [showRec, setShowRec] = useState(false);
  const [ran, setRan] = useState(false);
  const tok = useRef(0);
  const bodyRef = useRef(null);

  // pacing (ms) — slower, human-readable
  const P = { userGap: 680, botThink: 720, char: 34, recGap: 680, cardGap: 600 };

  // keep pinned to the newest content as text streams in
  useEffect(() => {const b = bodyRef.current;if (b) b.scrollTop = b.scrollHeight;});

  const wait = (ms, t) => new Promise((res) => setTimeout(() => res(tok.current === t), ms));

  async function streamBot(it, t) {
    setTyping(true);
    if (!(await wait(P.botThink, t))) return false; // "composing…" dots
    setTyping(false);
    setList((l) => [...l, { ...it, text: '' }]); // empty bubble appears
    for (let i = 1; i <= it.x.length; i++) {
      if (!(await wait(P.char, t))) return false;
      const part = it.x.slice(0, i);
      setList((l) => {const n = l.slice();n[n.length - 1] = { ...n[n.length - 1], text: part };return n;});
    }
    setList((l) => {const n = l.slice();n[n.length - 1] = { ...n[n.length - 1], done: true };return n;});
    return true;
  }

  async function play(items, t) {
    for (const it of items) {
      if (tok.current !== t) return;
      if (it.t === 'bot') {if (!(await streamBot(it, t))) return;} else
      if (it.t === 'user') {if (!(await wait(P.userGap, t))) return;setList((l) => [...l, it]);} else
      {if (!(await wait(P.cardGap, t))) return;setList((l) => [...l, it]);} // info / reserved
    }
  }

  // play the pre-conversation whenever the flow opens
  useEffect(() => {
    tok.current++;const t = tok.current;
    setList([]);setTyping(false);setShowRec(false);setRan(false);
    (async () => {
      await play(flow.pre, t);
      if (tok.current !== t) return;
      if (!(await wait(P.recGap, t))) return;
      setShowRec(true);
    })();
    return () => {tok.current++;}; // cancel timers on unmount / flow switch
  }, [flowKey]);

  const onExecute = () => {if (ran) return;setRan(true);setShowRec(false);play(flow.post, tok.current);};

  const renderItem = (it, i) => {
    if (it.t === 'bot') {
      const streaming = it.text !== undefined && !it.done;
      return (
        <div className="appear" key={i}>
          <Bot ts={it.done ? it.ts : ''}>
            {it.text !== undefined ? it.text : it.x}
            {streaming && <span className="caret" />}
          </Bot>
        </div>);

    }
    if (it.t === 'user') return <div className="appear" key={i}><User ts={it.ts}>{it.x}</User></div>;
    if (it.t === 'info') return <div className="appear" key={i}><InfoCard /></div>;
    if (it.t === 'reserved') return <div className="appear" key={i}><ReservedCard {...it} onTap={onMonitor} /></div>;
    return null;
  };

  return (
    <div className="screen" id={'chat-' + flowKey} data-screen-label={'chat-' + flowKey}>
      <div className="skybg" />
      <StatusBar2 time={flow.statusTime || '오후 2:05'} />
      <AppBar onMenu={onMenu} onHome={onHome} />
      <div className="body" ref={bodyRef} style={{ padding: '0 16px 6px' }}>
        <AssistantHero title={flow.heroTitle} sub={flow.heroSub} img={flow.heroImg} />
        {list.map(renderItem)}
        {typing && <div className="appear"><Typing /></div>}
        {showRec && <div className="appear"><RecommendCard data={flow.recommend} onExecute={onExecute} /></div>}
        <div style={{ height: 4 }} />
      </div>
      <ChatBar />
    </div>);

}

/* Per-flow wrapper components: distinct names give the inline editor a
   flow-unique React path (App › ChatMachine › … vs App › ChatGreenhouse › …),
   so edits to one screen never leak into another. */
function ChatMachine(props) {return <ChatScreenBase flowKey="machine" {...props} />;}
function ChatGreenhouse(props) {return <ChatScreenBase flowKey="greenhouse" {...props} />;}
function ChatDrone(props) {return <ChatScreenBase flowKey="drone" {...props} />;}

Object.assign(window, { FLOWS2, AssistantHero, RecommendCard, InfoCard, ReservedCard, ChatScreenBase, ChatMachine, ChatGreenhouse, ChatDrone });