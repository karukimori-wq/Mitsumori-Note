const projects = [
  { name: "コーポレートサイト制作", client: "株式会社ABC", status: "作業中", amount: "¥320,000", due: "7/25", progress: 68 },
  { name: "LPデザイン・実装", client: "山田商店", status: "見積提出済", amount: "¥180,000", due: "8/02", progress: 0 },
  { name: "ブランドロゴ制作", client: "Studio N", status: "作業中", amount: "¥90,000", due: "7/28", progress: 42 },
];

export default function Home() {
  return <main className="shell">
    <aside><h2>Mitsumori Note</h2><nav><b>ダッシュボード</b><span>案件</span><span>カレンダー</span><span>顧客</span><span>過去案件</span><span>設定</span></nav></aside>
    <section className="content">
      <header><div><h1>ダッシュボード</h1><p>見積もりから入金まで、仕事をひとつにつなげる。</p></div><button>＋ 新規案件</button></header>
      <div className="stats"><Card t="今週の納期" v="3件"/><Card t="進行中案件" v="5件"/><Card t="見積提出中" v="2件"/><Card t="今月の売上見込" v="¥650,000"/></div>
      <div className="panel"><h3>進行中の案件</h3>{projects.map(p=><div className="project" key={p.name}><div><strong>{p.name}</strong><small>{p.client}</small></div><em>{p.status}</em><b>{p.amount}</b><span>納期 {p.due}</span><span>{p.progress}%</span></div>)}</div>
      <div className="panel review"><div><h3>見積もりの答え合わせ</h3><p>案件が終わったら、想定と実績を比較。次の見積もりに経験を残します。</p></div><b>見積 → 受注 → 実績 → 答え合わせ → 次の見積へ</b></div>
    </section>
  </main>
}
function Card({t,v}:{t:string,v:string}){return <div className="card"><small>{t}</small><strong>{v}</strong></div>}
