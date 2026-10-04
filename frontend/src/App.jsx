import { useMemo, useState } from 'react';
import { ArrowRight, Check, ChefHat, CircleHelp, Minus, Plus, RotateCcw, ShoppingBag, Sparkles } from 'lucide-react';

const buns = [
  { name: 'Бриошь', note: 'Нежная и сливочная', icon: '🍞' },
  { name: 'Кунжутная', note: 'Золотистая классика', icon: '🥯' },
  { name: 'Цельнозерновая', note: 'Сытная и ароматная', icon: '🌾' },
];
const meats = [
  { name: 'Говядина', note: 'Сочная котлета', icon: '🥩' },
  { name: 'Курица', note: 'Нежная и хрустящая', icon: '🍗' },
  { name: 'Вегетарианская котлета', note: 'Растительная основа', icon: '🌱' },
];
const ingredients = [
  { name: 'Сыр', icon: '🧀' }, { name: 'Бекон', icon: '🥓' }, { name: 'Помидор', icon: '🍅' },
  { name: 'Салат', icon: '🥬' }, { name: 'Лук', icon: '🧅' }, { name: 'Огурец', icon: '🥒' },
];

function OptionCard({ item, selected, onClick }) {
  return <button className={`option-card ${selected ? 'selected' : ''}`} onClick={onClick} type="button" aria-pressed={selected}>
    <span className="option-icon">{item.icon}</span><span className="option-copy"><strong>{item.name}</strong><small>{item.note}</small></span>
    <span className="radio-mark">{selected && <Check size={13} strokeWidth={3} />}</span>
  </button>;
}

export default function App() {
  const [customer, setCustomer] = useState('');
  const [bun, setBun] = useState('Бриошь');
  const [meat, setMeat] = useState('');
  const [chosen, setChosen] = useState(['Сыр']);
  const [quantity, setQuantity] = useState(1);
  const [status, setStatus] = useState({ type: '', message: '' });
  const toggle = name => setChosen(old => old.includes(name) ? old.filter(x => x !== name) : [...old, name]);
  const total = useMemo(() => 490 * quantity + chosen.length * 40 * quantity, [quantity, chosen]);

  async function submitOrder(event) {
    event.preventDefault();
    if (!meat) {
      setStatus({ type: 'error', message: 'Выберите мясо, чтобы продолжить.' });
      document.getElementById('meat-heading')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    if (!customer.trim()) {
      setStatus({ type: 'error', message: 'Напишите, как к вам обращаться.' });
      document.getElementById('customer')?.focus();
      return;
    }
    setStatus({ type: 'loading', message: '' });
    try {
      const response = await fetch(import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api/orders/', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customer: customer.trim(), bun, meat, ingredients: chosen, quantity }),
      });
      const data = await response.json();
      if (!response.ok) {
        const errors = Object.values(data).flat().join(' ');
        throw new Error(errors || 'Не удалось оформить заказ. Проверьте данные.');
      }
      const addOns = data.ingredients.length ? data.ingredients.join(', ') : 'без добавок';
      setStatus({ type: 'success', message: `✅ Заказ создан! Бургер: ${data.bun} + ${data.meat}. Добавки: ${addOns}. Количество: ${data.quantity}` });
    } catch (error) {
      setStatus({ type: 'error', message: error.message === 'Failed to fetch' ? 'Не удалось связаться с сервером. Запустите Django и попробуйте ещё раз.' : error.message });
    }
  }

  function reset() {
    setCustomer(''); setBun('Бриошь'); setMeat(''); setChosen(['Сыр']); setQuantity(1); setStatus({ type: '', message: '' });
  }

  return <main className="page-shell">
    <header className="topbar"><a className="brand" href="#top"><span className="brand-icon">🍔</span><span>булка<span className="brand-amp">&</span>дело<small>БУРГЕРНАЯ МАСТЕРСКАЯ</small></span></a><div className="topbar-note"><span className="open-dot" /> Кухня открыта <span className="topbar-divider">·</span> 25–35 минут</div><button type="button" className="help-button" aria-label="Помощь"><CircleHelp size={20} /></button></header>
    <section className="intro" id="top"><div className="eyebrow"><Sparkles size={14} /> ТВОЙ ВКУС — ТВОИ ПРАВИЛА</div><h1>Собери свой<br /><span>бургер мечты.</span></h1><p>Хороший бургер начинается с тебя.<br className="desktop-break" /> Выбирай любимое — остальное мы приготовим.</p></section>
    <form className="builder-layout" onSubmit={submitOrder}>
      <div className="builder-form">
        <section className="form-section customer-section"><div className="section-heading"><span className="step-number">01</span><div><h2>Как к тебе обращаться?</h2><p>Чтобы мы знали, кому готовить</p></div></div><label className="sr-only" htmlFor="customer">Ваше имя</label><input id="customer" className="name-input" value={customer} onChange={e => setCustomer(e.target.value)} placeholder="Например, Мага" maxLength={100} /></section>
        <section className="form-section"><div className="section-heading"><span className="step-number">02</span><div><h2>Выбери булочку</h2><p>Основа идеального сочетания</p></div></div><div className="option-grid">{buns.map(item => <OptionCard key={item.name} item={item} selected={bun === item.name} onClick={() => setBun(item.name)} />)}</div></section>
        <section className="form-section" aria-labelledby="meat-heading"><div className="section-heading"><span className="step-number">03</span><div><h2 id="meat-heading">Выбери мясо <span className="required">*</span></h2><p>Без котлеты никуда — это обязательно</p></div></div><div className="option-grid">{meats.map(item => <OptionCard key={item.name} item={item} selected={meat === item.name} onClick={() => { setMeat(item.name); if (status.type === 'error') setStatus({ type: '', message: '' }); }} />)}</div></section>
        <section className="form-section ingredients-section"><div className="section-heading"><span className="step-number">04</span><div><h2>Добавь что-нибудь</h2><p>Каждая добавка — ещё + 40 ₽</p></div><span className="optional-tag">ПО ЖЕЛАНИЮ</span></div><div className="ingredient-grid">{ingredients.map(item => <button className={`ingredient-chip ${chosen.includes(item.name) ? 'ingredient-selected' : ''}`} key={item.name} type="button" aria-pressed={chosen.includes(item.name)} onClick={() => toggle(item.name)}><span>{item.icon}</span>{item.name}{chosen.includes(item.name) && <Check size={13} />}</button>)}</div></section>
      </div>
      <aside className="order-card"><div className="card-topline"><span><ChefHat size={17} /> ТВОЙ БУРГЕР</span><span className="live-badge"><span /> В ПРОЦЕССЕ</span></div><div className="burger-illustration" aria-label="Иллюстрация бургера"><span className="burger-sesame sesame-one" /><span className="burger-sesame sesame-two" /><span className="burger-sesame sesame-three" /><div className="bun-top" /><div className="burger-lettuce" /><div className="burger-cheese" /><div className="burger-patty" /><div className="bun-bottom" /></div><div className="burger-name"><strong>{bun} {meat ? `с ${meat.toLowerCase()}` : '— выбери мясо'}</strong><span>{chosen.length ? chosen.join(' · ') : 'Без добавок'}</span></div><div className="card-rule" /><div className="quantity-row"><div><strong>Сколько бургеров?</strong><small>Одинаковых, конечно</small></div><div className="quantity-control"><button type="button" onClick={() => setQuantity(q => Math.max(1, q - 1))} aria-label="Уменьшить количество"><Minus size={15} /></button><span>{quantity}</span><button type="button" onClick={() => setQuantity(q => Math.min(20, q + 1))} aria-label="Увеличить количество"><Plus size={15} /></button></div></div><div className="card-rule" /><div className="price-row"><span>Итого</span><strong>{total.toLocaleString('ru-RU')} <small>₽</small></strong></div><button className="submit-button" type="submit" disabled={status.type === 'loading'}><ShoppingBag size={18} />{status.type === 'loading' ? 'Отправляем…' : 'Заказать'}<ArrowRight size={17} /></button>{status.message && <div role={status.type === 'error' ? 'alert' : 'status'} className={`feedback ${status.type}`}>{status.message}</div>}<div className="card-footer"><span>✦</span> Приготовим с любовью и без спешки</div><button type="button" className="reset-button" onClick={reset}><RotateCcw size={13} /> Начать заново</button></aside>
    </form>
    <footer className="page-footer"><span>© 2026 Булка & Дело</span><span>Сделано с любовью к хорошим бургерам <span className="footer-heart">♥</span></span></footer>
  </main>;
}
