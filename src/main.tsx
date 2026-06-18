import { StrictMode, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Clock3,
  ExternalLink,
  Factory,
  FileText,
  Mail,
  MapPin,
  Menu,
  Phone,
  Scissors,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import "./styles.css";

type Page = "home" | "company" | "business" | "contact";

const company = {
  name: "株式会社AIR",
  englishName: "AIR LIMITED",
  representative: "白 鑫",
  representativeEnglish: "BAI XIN",
  established: "2013年7月25日",
  capital: "3000万円",
  postalCode: "〒150-0011",
  location: "東京都渋谷区東1-4-1 尚豊ビル306号",
  phone: "03-6427-4518",
  mobile: "080-9883-9439",
  email: "baixin_my@163.com",
  hours: "10:00 - 18:00",
  closed: "土曜・日曜・祝日",
};

const mapQuery = encodeURIComponent(company.location);
const googleMapUrl = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;
const googleMapEmbedUrl = `https://maps.google.com/maps?hl=ja&q=${mapQuery}&z=16&output=embed`;
const accessItems = [
  "JR・東京メトロ・東急・京王井の頭線「渋谷」駅より徒歩約6〜10分",
  "東京メトロ「表参道」駅より徒歩約11〜13分",
  "八幡通り沿い、尚豊ビル306号室",
];

const navItems: Array<{ page: Page; label: string }> = [
  { page: "home", label: "トップ" },
  { page: "company", label: "会社情報" },
  { page: "business", label: "事業内容" },
  { page: "contact", label: "お問い合わせ" },
];

const profile = [
  { label: "会社名", value: company.name },
  { label: "英文表記", value: company.englishName },
  { label: "代表者", value: `代表取締役　${company.representative}` },
  { label: "代表者英字", value: company.representativeEnglish },
  { label: "設立", value: company.established },
  { label: "資本金", value: company.capital },
  { label: "所在地", value: `${company.postalCode}　${company.location}` },
  { label: "電話番号", value: company.phone },
  { label: "携帯番号", value: company.mobile },
  { label: "メールアドレス", value: company.email },
  { label: "営業時間", value: company.hours },
  { label: "定休日", value: company.closed },
];

const businessItems = [
  {
    title: "衣料品等の企画・デザイン・製造・販売",
    text: "高級衣料品、アクセサリー、鞄及び靴に関する企画、デザイン、製造、輸出入及び販売を行います。素材選定から商品化まで、ブランド価値を意識した提案を行います。",
  },
  {
    title: "商品管理・検品・補修・入出荷",
    text: "衣料品その他商品の検品、補修、管理及び入出荷に対応し、品質と流通の安定化を支援します。見た目の美しさだけでなく、納品前の状態管理を大切にしています。",
  },
  {
    title: "縫製に関する技術指導",
    text: "縫製工程に関する技術的な助言・指導を通じて、製品品質の向上に取り組みます。シルエット、縫い目、仕上げの細部まで確認し、安定した完成度を追求します。",
  },
  {
    title: "経営・市場戦略コンサルティング",
    text: "アパレル領域における市場戦略、販売戦略、事業運営に関する相談を承ります。商品特性、販売先、ターゲットに応じた現実的な事業提案を行います。",
  },
];

const strengths = [
  "アパレル領域における企画から販売までの幅広い対応力",
  "検品・補修・入出荷までを考慮した実務的な品質管理",
  "縫製技術と市場戦略の両面から事業を支える提案力",
  "高級衣料品に求められる清潔感、素材感、仕立てへの理解",
  "小ロットの相談から継続的な取引まで対応できる柔軟性",
];

const qualityPolicies = [
  {
    title: "素材の表情を大切にする",
    text: "生地の厚み、落ち感、光沢、肌触りを確認し、商品が持つ上質さを損なわない企画・管理を行います。",
  },
  {
    title: "仕立ての完成度を高める",
    text: "縫製、補修、検品の各段階で細部を確認し、着用時の美しさと安心感につながる品質を目指します。",
  },
  {
    title: "取引先との信頼を重視する",
    text: "納期、仕様、品質基準を丁寧に共有し、長期的な事業関係を築ける誠実な対応を心がけています。",
  },
];

const businessDetails = [
  "高級衣料品の企画・デザイン・製造に関する相談",
  "アクセサリー、鞄、靴を含むファッション商品の取扱い",
  "海外との輸出入、販売、商品管理に関する業務",
  "検品、補修、入出荷管理など納品前後の品質支援",
  "縫製技術、商品改善、市場戦略に関する助言",
  "ブランド価値を高める商品構成・販売計画の検討",
];

const history = [
  { year: "2013年7月", text: "株式会社AIR 設立" },
  { year: "現在", text: "東京都渋谷区東1-4-1 尚豊ビル306号にて営業" },
];

function getInitialPage(): Page {
  const path = window.location.pathname.replace("/", "");
  if (path === "company" || path === "business" || path === "contact") {
    return path;
  }
  return "home";
}

function App() {
  const [page, setPage] = useState<Page>(getInitialPage);
  const [menuOpen, setMenuOpen] = useState(false);

  const pageTitle = useMemo(() => {
    const current = navItems.find((item) => item.page === page);
    return current?.label ?? "トップ";
  }, [page]);

  const goTo = (nextPage: Page) => {
    setPage(nextPage);
    setMenuOpen(false);
    const path = nextPage === "home" ? "/" : `/${nextPage}`;
    window.history.pushState(null, "", path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  window.onpopstate = () => setPage(getInitialPage());

  return (
    <>
      <header className="site-header">
        <button className="brand" onClick={() => goTo("home")} aria-label="トップへ">
          <img className="brand-mark" src="/air-logo.svg" alt="" />
          <span>
            <strong>{company.name}</strong>
            <small>{company.englishName}</small>
          </span>
        </button>

        <nav className="desktop-nav" aria-label="メインナビゲーション">
          {navItems.map((item) => (
            <button
              className={page === item.page ? "is-current" : ""}
              key={item.page}
              onClick={() => goTo(item.page)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <button
          className="menu-button"
          onClick={() => setMenuOpen((value) => !value)}
          aria-label="メニューを開閉"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </header>

      {menuOpen && (
        <div className="mobile-nav" aria-label="モバイルナビゲーション">
          {navItems.map((item) => (
            <button key={item.page} onClick={() => goTo(item.page)}>
              {item.label}
            </button>
          ))}
        </div>
      )}

      <main>
        {page === "home" && <HomePage goTo={goTo} />}
        {page === "company" && <CompanyPage />}
        {page === "business" && <BusinessPage />}
        {page === "contact" && <ContactPage />}
      </main>

      <footer className="site-footer">
        <div className="footer-inner">
          <div>
            <img className="brand-mark" src="/air-logo.svg" alt="" />
            <p>{company.name}</p>
          </div>
          <p>{company.location}</p>
          <p>© {new Date().getFullYear()} AIR Co., Ltd.</p>
        </div>
      </footer>
    </>
  );
}

function HomePage({ goTo }: { goTo: (page: Page) => void }) {
  return (
    <>
      <section className="home-hero">
        <div className="hero-image" />
        <div className="hero-shade" />
        <div className="hero-inner">
          <p className="label">APPAREL / PLANNING / MANUFACTURING</p>
          <h1>
            <span>衣料品事業に</span>
            <span>確かな品質を。</span>
          </h1>
          <p>
            株式会社AIRは、高級衣料品・アクセサリー・鞄・靴の企画、デザイン、製造、輸出入、販売を行うアパレル企業です。
            素材、仕立て、検品まで妥協せず、お客様に長く信頼されるものづくりを支えます。
          </p>
          <div className="hero-actions">
            <button className="primary-button" onClick={() => goTo("company")}>
              会社情報
              <ArrowRight aria-hidden="true" />
            </button>
            <button className="ghost-button" onClick={() => goTo("business")}>
              事業内容
            </button>
          </div>
        </div>
      </section>

      <section className="corporate-strip">
        <article>
          <span>Founded</span>
          <strong>2013</strong>
          <p>平成25年7月設立</p>
        </article>
        <article>
          <span>Capital</span>
          <strong>3000万円</strong>
          <p>より強固な事業基盤</p>
        </article>
        <article>
          <span>Location</span>
          <strong>Shibuya Higashi</strong>
          <p>東京都渋谷区東</p>
        </article>
      </section>

      <section className="section message-section">
        <div className="message-copy">
          <p className="label">MESSAGE</p>
          <h2>代表挨拶</h2>
          <p>
            衣服は、単に身にまとうものではなく、その人の品格、姿勢、日々の自信を静かに支える存在だと考えております。
            株式会社AIRは、高級衣料品にふさわしい素材感、仕立ての美しさ、細部の完成度を大切にしながら、
            企画、製造、管理、販売の各工程に誠実に向き合ってまいりました。
          </p>
          <p>
            アパレル事業において大切なのは、華やかな見た目だけではありません。
            検品、補修、入出荷、縫製技術、市場戦略までを丁寧に整えることで、商品に確かな価値が生まれ、
            お客様や取引先の皆様からの信頼につながると考えております。
          </p>
          <p>
            これからも、清潔感と高級感を備えたものづくりを追求し、長く選ばれる商品と事業の実現に貢献してまいります。
            皆様に安心してご相談いただける企業であり続けるため、誠実な姿勢と確かな品質を重んじて歩んでまいります。
          </p>
          <p className="signature">代表取締役　{company.representative}</p>
        </div>
        <figure className="message-image">
          <img src="/luxury-atelier.png" alt="高級衣料品の仕立てと素材を表現したアトリエイメージ" />
        </figure>
      </section>

      <section className="section formal-panel">
        <div>
          <p className="label">PHILOSOPHY</p>
          <h2>会社理念</h2>
          <p>
            上質な素材、正確な仕立て、丁寧な管理を通じて、身にまとう方の美しさと信頼を支える衣服を提供します。
            私たちは、商品一つひとつに誠実に向き合い、品格ある価値を社会へ届けてまいります。
          </p>
        </div>
        <Sparkles aria-hidden="true" />
      </section>

      <QualitySection />
    </>
  );
}

function CompanyPage() {
  return (
    <>
      <PageHeader title="会社情報" subtitle="COMPANY PROFILE" />
      <section className="section two-column">
        <div>
          <p className="label">ABOUT AIR</p>
          <h2>アパレル事業の品質と信頼を支える会社です。</h2>
        </div>
        <div className="text-block">
          <p>
            株式会社AIRは、衣料品、アクセサリー、鞄及び靴の企画・デザイン・製造・輸出入・販売を中心に、
            アパレル領域に関わる幅広い業務を展開しています。
          </p>
          <p>
            商品の見た目だけでなく、検品、補修、管理、入出荷までを含めた実務品質を重視し、
            継続的な取引にふさわしい信頼関係の構築を目指します。
          </p>
          <p>
            高級衣料品に求められるのは、素材やデザインの魅力だけではなく、
            仕立ての正確さ、納品時の清潔感、販売後まで見据えた安定した管理体制です。
            当社は、商品価値を守るための細やかな確認と、取引先に寄り添う柔軟な対応を大切にしています。
          </p>
        </div>
      </section>

      <QualitySection />

      <section className="section">
        <div className="section-headline">
          <p className="label">PROFILE</p>
          <h2>基本情報</h2>
        </div>
        <dl className="profile-table">
          {profile.map((item) => (
            <div key={item.label}>
              <dt>{item.label}</dt>
              <dd>{item.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="section">
        <div className="section-headline">
          <p className="label">HISTORY</p>
          <h2>沿革</h2>
        </div>
        <div className="history-list">
          {history.map((item) => (
            <article key={item.year}>
              <time>{item.year}</time>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

function BusinessPage() {
  return (
    <>
      <PageHeader title="事業内容" subtitle="BUSINESS" />
      <section className="section">
        <div className="section-headline">
          <p className="label">SERVICE</p>
          <h2>取扱業務</h2>
        </div>
        <div className="business-grid">
          {businessItems.map((item, index) => (
            <article key={item.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section two-column">
        <div>
          <p className="label">STRENGTH</p>
          <h2>当社の強み</h2>
        </div>
        <div className="strength-list">
          {strengths.map((strength) => (
            <p key={strength}>
              <CheckCircle2 aria-hidden="true" />
              {strength}
            </p>
          ))}
        </div>
      </section>

      <section className="section detail-panel">
        <div>
          <p className="label">SCOPE</p>
          <h2>対応できるご相談</h2>
          <p>
            株式会社AIRでは、商品づくりの初期相談から製造、管理、販売戦略まで、
            アパレル事業に関わる幅広いご相談を承ります。
          </p>
        </div>
        <ul>
          {businessDetails.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="section process">
        <div className="section-headline">
          <p className="label">FLOW</p>
          <h2>対応領域</h2>
        </div>
        <div className="process-row">
          <article>
            <Scissors aria-hidden="true" />
            <h3>企画・デザイン</h3>
          </article>
          <article>
            <Factory aria-hidden="true" />
            <h3>製造・縫製支援</h3>
          </article>
          <article>
            <ShieldCheck aria-hidden="true" />
            <h3>検品・品質管理</h3>
          </article>
          <article>
            <FileText aria-hidden="true" />
            <h3>販売・市場戦略</h3>
          </article>
        </div>
      </section>
    </>
  );
}

function QualitySection() {
  return (
    <section className="section quality-section">
      <div className="section-headline">
        <p className="label">QUALITY POLICY</p>
        <h2>品質への考え方</h2>
      </div>
      <div className="quality-grid">
        {qualityPolicies.map((item) => (
          <article key={item.title}>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function ContactPage() {
  return (
    <>
      <PageHeader title="お問い合わせ" subtitle="CONTACT" />
      <section className="section contact-layout">
        <div>
          <p className="label">INFORMATION</p>
          <h2>商品企画、製造、検品、販売に関するご相談を承ります。</h2>
          <p>
            お取引やご相談につきましては、お電話またはメールにてお問い合わせください。
          </p>
        </div>
        <div className="contact-card">
          <a href={`mailto:${company.email}`}>
            <Mail aria-hidden="true" />
            <span>{company.email}</span>
          </a>
          <a href={`tel:${company.phone.replaceAll("-", "")}`}>
            <Phone aria-hidden="true" />
            <span>{company.phone}</span>
          </a>
          <a href={`tel:${company.mobile.replaceAll("-", "")}`}>
            <Phone aria-hidden="true" />
            <span>{company.mobile}</span>
          </a>
          <p>
            <Clock3 aria-hidden="true" />
            <span>
              {company.hours} / {company.closed}
            </span>
          </p>
          <p>
            <MapPin aria-hidden="true" />
            <span>
              {company.postalCode}
              <br />
              {company.location}
            </span>
          </p>
        </div>
      </section>
      <AccessSection />
    </>
  );
}

function AccessSection() {
  return (
    <section className="section access-section">
      <div className="section-headline">
        <p className="label">ACCESS</p>
        <h2>所在地・アクセス</h2>
      </div>
      <div className="access-layout">
        <div className="access-info">
          <p className="address-line">
            {company.postalCode}
            <br />
            {company.location}
          </p>
          <ul>
            {accessItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <a className="map-link" href={googleMapUrl} target="_blank" rel="noreferrer">
            Googleマップで開く
            <ExternalLink aria-hidden="true" />
          </a>
        </div>
        <div className="map-frame">
          <iframe
            className="google-map"
            src={googleMapEmbedUrl}
            title="株式会社AIR 所在地 Googleマップ"
            loading="eager"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
          <p>
            地図が表示されない場合は、
            <a href={googleMapUrl} target="_blank" rel="noreferrer">
              Googleマップ
            </a>
            で所在地をご確認ください。
          </p>
        </div>
      </div>
    </section>
  );
}

function PageHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <section className="page-header">
      <div>
        <p className="label">{subtitle}</p>
        <h1>{title}</h1>
        <p>{company.name}</p>
      </div>
      <Building2 aria-hidden="true" />
    </section>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
