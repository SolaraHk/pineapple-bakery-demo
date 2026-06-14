import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { ArrowUpRight, Boxes, Clock3, Languages, MapPin, MessageCircle, ShieldCheck, Sparkles } from 'lucide-react';
import './v2.css';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const assetBase = import.meta.env.BASE_URL;
const instagramUrl = 'https://www.instagram.com/pineapplebakeryhk/';
const instagramDmUrl = 'https://ig.me/m/pineapplebakeryhk';
const openRiceUrl = 'https://www.openrice.com/en/hongkong/r-pineapple-bakery-sheung-wan-hong-kong-style-bakery-r998564';
const mapsUrl = 'https://www.google.com/maps/search/?api=1&query=Shop%202%2C%20G%2FF%2C%2087%20Wing%20Lok%20Street%2C%20Sheung%20Wan%2C%20Hong%20Kong';
const storageKey = 'pineapple-bakery-v2-language';

const copy = {
  en: {
    nav: { menu: 'Bakes', visit: 'Visit', proof: 'Proof', language: 'Language' },
    hero: {
      eyebrow: 'Version 2 concept • independent visual direction',
      title: 'A bakery launch page built like a fresh-batch signal board.',
      text: 'A sharper, night-market-meets-production-floor take for Pineapple Bakery: fast decisions, verified public details, and one clean Instagram DM path for catering enquiries.',
      primary: 'See the batch board',
      secondary: 'DM catering',
      tag: 'Draft only — public info needs client approval'
    },
    board: [
      ['Batch status', 'Check Instagram for today’s buns', 'Live opening / sold-out details should be confirmed on the bakery’s public profile.'],
      ['Walk-in window', 'Wed–Thu 10:00–15:00 · Fri–Sat 10:00–17:00', 'Public snippets only; label remains unverified until approved.'],
      ['Address', 'Shop 2, G/F, 87 Wing Lok Street, Sheung Wan', 'Map link uses public address search, not an invented listing.']
    ],
    productsTitle: 'Four customer actions, no invented promises.',
    products: [
      ['01', 'Signature bun', 'Brioche-style pineapple bun with a golden crackly top. Price to confirm.'],
      ['02', 'Classic butter', 'Warm bun plus cold butter; written as a product direction, not a confirmed menu.'],
      ['03', 'Nitro milk tea', 'A cool pairing mentioned in public snippets; details need verification.'],
      ['04', 'Party boxes', 'Office treats and small events routed to Instagram DM instead of fake phone numbers.']
    ],
    proofTitle: 'Trust comes from restraint.',
    proof: [
      ['Public-source labels', 'Every uncertain detail is marked as a draft or verification item.'],
      ['Real social route', 'CTA uses the public Instagram profile and ig.me DM route.'],
      ['Launch-ready placeholders', 'Privacy/terms copy stays scoped to current demo behavior: language preference only, no forms or payments.']
    ],
    footer: 'Version 2 speculative demo. Not affiliated with Pineapple Bakery. Public imagery/details require approval or replacement before launch.'
  },
  zh: {
    nav: { menu: '出爐', visit: '到訪', proof: '佐證', language: '語言' },
    hero: {
      eyebrow: 'Version 2 概念 • 全新視覺方向',
      title: '像新鮮出爐訊號板一樣的麵包店網站。',
      text: '為 Pineapple Bakery 做一個更俐落、夜市 x 生產線感覺的版本：快速找到重點、清楚標示公開資料，並以 Instagram DM 處理到會查詢。',
      primary: '查看出爐板',
      secondary: 'DM 到會',
      tag: '草稿示意 — 公開資料需客戶確認'
    },
    board: [
      ['出爐狀態', '請到 Instagram 確認今日菠蘿包', '最新營業／售罄資訊應以店舖公開 profile 為準。'],
      ['Walk-in 時段', '三至四 10:00–15:00 · 五至六 10:00–17:00', '只屬公開片段資料；正式前仍標示需核實。'],
      ['地址', '香港上環永樂街87號地下2號舖', '地圖按鈕使用公開地址搜尋，沒有虛構資料。']
    ],
    productsTitle: '四個顧客動作，不虛構承諾。',
    products: [
      ['01', '招牌菠蘿包', 'Brioche 口感配金黃酥皮；價錢有待確認。'],
      ['02', '經典菠蘿油', '熱包配凍牛油；以產品方向表達，不假裝已確認餐單。'],
      ['03', '氮氣奶茶', '公開片段曾提及的配搭飲品；詳情需核實。'],
      ['04', '派對分享盒', '辦公室小食及小型活動直接引導至 Instagram DM，不虛構電話。']
    ],
    proofTitle: '克制，才建立信任。',
    proof: [
      ['公開資料標示', '所有未確定資料都清楚標示為草稿或需核實項目。'],
      ['真實社交路徑', 'CTA 使用公開 Instagram profile 及 ig.me DM 路徑。'],
      ['上線前 placeholder', '私隱／條款文字只描述現有 demo 行為：只記住語言，沒有表格或付款。']
    ],
    footer: 'Version 2 示意網站。非 Pineapple Bakery 官方或關聯網站。公開圖片及資料正式使用前必須批准或替換。'
  }
};

function getInitialLanguage() {
  const params = new URLSearchParams(window.location.search);
  const requested = params.get('lang');
  if (requested === 'en' || requested === 'zh') return requested;
  const saved = window.localStorage.getItem(storageKey);
  if (saved === 'en' || saved === 'zh') return saved;
  return [navigator.language, ...(navigator.languages || [])]
    .filter(Boolean)
    .some((lang) => lang.toLowerCase().startsWith('zh')) ? 'zh' : 'en';
}

export default function V2App() {
  const rootRef = useRef(null);
  const [language, setLanguage] = useState(getInitialLanguage);
  const t = copy[language];

  useEffect(() => {
    document.documentElement.lang = language === 'zh' ? 'zh-Hant-HK' : 'en';
    document.body.dataset.siteVersion = 'v2';
    window.localStorage.setItem(storageKey, language);
    return () => { delete document.body.dataset.siteVersion; };
  }, [language]);

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.from('.v2-nav, .v2-hero__copy > *, .v2-hero__stage', {
      y: 28,
      opacity: 0,
      duration: 0.8,
      stagger: 0.08,
      ease: 'power3.out'
    });
    gsap.utils.toArray('.v2-reveal').forEach((item) => {
      gsap.from(item, {
        y: 34,
        opacity: 0,
        duration: 0.72,
        ease: 'power3.out',
        scrollTrigger: { trigger: item, start: 'top 82%' }
      });
    });
  }, { scope: rootRef, dependencies: [language], revertOnUpdate: true });

  return (
    <main className="v2-site" ref={rootRef}>
      <section className="v2-hero" id="v2-top">
        <nav className="v2-nav" aria-label="Version 2 navigation">
          <a className="v2-brand" href="#v2-top" aria-label="Pineapple Bakery V2 top">
            <img src={`${assetBase}social/pineapple-bakery-instagram-icon.jpg`} alt="Pineapple Bakery public Instagram profile icon" />
            <span>PBK-02</span>
          </a>
          <div className="v2-nav__links">
            <a href="#v2-menu">{t.nav.menu}</a>
            <a href="#v2-visit">{t.nav.visit}</a>
            <a href="#v2-proof">{t.nav.proof}</a>
            <a href="./" title="Open version 1">V1</a>
          </div>
          <div className="v2-lang" aria-label={t.nav.language}>
            {['en', 'zh'].map((item) => (
              <button key={item} type="button" className={language === item ? 'active' : ''} aria-pressed={language === item} onClick={() => setLanguage(item)}>{item === 'en' ? 'EN' : '繁'}</button>
            ))}
          </div>
        </nav>

        <div className="v2-hero__grid">
          <div className="v2-hero__copy">
            <p className="v2-eyebrow">{t.hero.eyebrow}</p>
            <h1>{t.hero.title}</h1>
            <p>{t.hero.text}</p>
            <div className="v2-actions">
              <a className="v2-button v2-button--primary" href="#v2-menu">{t.hero.primary}<ArrowUpRight size={18} /></a>
              <a className="v2-button" href={instagramDmUrl} target="_blank" rel="noreferrer"><MessageCircle size={18} />{t.hero.secondary}</a>
            </div>
            <span className="v2-audit-tag"><ShieldCheck size={16} />{t.hero.tag}</span>
          </div>

          <div className="v2-hero__stage" aria-label="Version 2 image composition using public social photos">
            <div className="v2-screen v2-screen--main">
              <img src={`${assetBase}social/official-brioche-pineapple-buns.jpg`} alt="Public social photo of pineapple buns" />
              <span>Fresh batch / public social image</span>
            </div>
            <img className="v2-orbit v2-orbit--one" src={`${assetBase}social/social-reel-milk-tea.jpg`} alt="Public social thumbnail of milk tea" />
            <img className="v2-orbit v2-orbit--two" src={`${assetBase}social/food-reel-pineapple-bun.jpg`} alt="Public social thumbnail of pineapple bun" />
            <div className="v2-signal"><Sparkles size={18} /><strong>IG first</strong><small>latest status</small></div>
          </div>
        </div>
      </section>

      <section className="v2-section v2-board" id="v2-visit">
        {t.board.map((row, index) => (
          <article className="v2-board__row v2-reveal" key={row[0]}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <div><h2>{row[0]}</h2><strong>{row[1]}</strong><p>{row[2]}</p></div>
            {index === 0 && <a href={instagramUrl} target="_blank" rel="noreferrer" aria-label="Open Instagram"><ArrowUpRight /></a>}
            {index === 2 && <a href={mapsUrl} target="_blank" rel="noreferrer" aria-label="Open map search"><MapPin /></a>}
          </article>
        ))}
      </section>

      <section className="v2-section" id="v2-menu">
        <div className="v2-section__head v2-reveal">
          <p className="v2-eyebrow">Batch board</p>
          <h2>{t.productsTitle}</h2>
        </div>
        <div className="v2-product-grid">
          {t.products.map((item, index) => (
            <article className="v2-product v2-reveal" key={item[0]}>
              <span>{item[0]}</span>
              <img src={`${assetBase}social/${['official-brioche-pineapple-buns.jpg', 'food-reel-pineapple-bun.jpg', 'social-reel-milk-tea.jpg', 'social-reel-bun-closeup.jpg'][index]}`} alt="Public social draft-use product thumbnail" />
              <h3>{item[1]}</h3>
              <p>{item[2]}</p>
              {index === 3 && <a href={instagramDmUrl} target="_blank" rel="noreferrer"><MessageCircle size={16} />{t.hero.secondary}</a>}
            </article>
          ))}
        </div>
      </section>

      <section className="v2-section v2-proof" id="v2-proof">
        <div className="v2-section__head v2-reveal">
          <p className="v2-eyebrow">Verification posture</p>
          <h2>{t.proofTitle}</h2>
        </div>
        <div className="v2-proof__grid">
          {t.proof.map((item, index) => (
            <article className="v2-proof-card v2-reveal" key={item[0]}>
              {[ShieldCheck, MessageCircle, Boxes].map((Icon, i) => i === index ? <Icon key={item[0]} size={24} /> : null)}
              <h3>{item[0]}</h3>
              <p>{item[1]}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="v2-section v2-cta v2-reveal">
        <Clock3 size={28} />
        <h2>Open the channels customers actually need.</h2>
        <div className="v2-actions">
          <a className="v2-button v2-button--primary" href={instagramUrl} target="_blank" rel="noreferrer">Instagram<ArrowUpRight size={18} /></a>
          <a className="v2-button" href={openRiceUrl} target="_blank" rel="noreferrer">OpenRice<ArrowUpRight size={18} /></a>
          <a className="v2-button" href={mapsUrl} target="_blank" rel="noreferrer">Map<MapPin size={18} /></a>
        </div>
      </section>

      <a className="v2-float" href={instagramDmUrl} target="_blank" rel="noreferrer" aria-label="Open Instagram DM enquiry"><MessageCircle size={20} /> DM</a>

      <footer className="v2-footer">
        <span><Languages size={16} /> EN / 繁</span>
        <p>{t.footer}</p>
      </footer>
    </main>
  );
}
