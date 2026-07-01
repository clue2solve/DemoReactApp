import React from 'react';
import './App.css';

const ACCENT_GRADIENT = 'linear-gradient(135deg, #EA580C 0%, #F97316 50%, #FB923C 100%)';

type TimelineCard = {
  step: string;
  title: string;
  sub: React.ReactNode;
  icon: string;
};

type CTACard = {
  title: string;
  sub: React.ReactNode;
  icon: string;
  href?: string;
};

const REPO_URL = 'https://github.com/clue2solve/DemoReactApp';
const CONSOLE_URL = 'https://console.clue2.app';

const timeline: TimelineCard[] = [
  {
    step: '1',
    title: 'Code pushed to git',
    icon: 'git',
    sub: (
      <a href={REPO_URL} target="_blank" rel="noreferrer" className="welcome-link">
        clue2solve/DemoReactApp
      </a>
    ),
  },
  {
    step: '2',
    title: 'Built by Clue2App',
    icon: 'hammer',
    sub: 'Buildpacks auto-detected your stack — no Dockerfile needed',
  },
  {
    step: '3',
    title: 'Deployed live',
    icon: 'globe',
    sub: 'Knative serves your app and auto-scales it',
  },
];

const ctas: CTACard[] = [
  {
    title: 'Edit this page',
    icon: 'pencil',
    sub: (
      <>
        Open <code className="welcome-code">src/App.tsx</code> to make this yours
      </>
    ),
  },
  {
    title: 'Add a custom domain',
    icon: 'link',
    sub: (
      <a href={CONSOLE_URL} target="_blank" rel="noreferrer" className="welcome-link">
        console.clue2.app
      </a>
    ),
    href: CONSOLE_URL,
  },
  {
    title: 'View build logs / metrics',
    icon: 'chart',
    sub: (
      <a href={CONSOLE_URL} target="_blank" rel="noreferrer" className="welcome-link">
        console.clue2.app
      </a>
    ),
    href: CONSOLE_URL,
  },
];

const Icon: React.FC<{ name: string }> = ({ name }) => {
  const common = {
    width: 28,
    height: 28,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };
  switch (name) {
    case 'git':
      return (
        <svg {...common}>
          <circle cx="6" cy="6" r="2.5" />
          <circle cx="18" cy="6" r="2.5" />
          <circle cx="12" cy="18" r="2.5" />
          <path d="M6 8.5v3a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3v-3" />
          <path d="M12 14.5v1" />
        </svg>
      );
    case 'hammer':
      return (
        <svg {...common}>
          <path d="M14 3l7 7-3 3-7-7z" />
          <path d="M11 6L3 14l4 4 8-8" />
        </svg>
      );
    case 'globe':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
        </svg>
      );
    case 'pencil':
      return (
        <svg {...common}>
          <path d="M3 21l3-1 12-12-2-2L4 18l-1 3z" />
          <path d="M14 6l4 4" />
        </svg>
      );
    case 'link':
      return (
        <svg {...common}>
          <path d="M10 14a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1" />
          <path d="M14 10a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1" />
        </svg>
      );
    case 'chart':
      return (
        <svg {...common}>
          <path d="M3 21V3" />
          <path d="M21 21H3" />
          <rect x="7" y="13" width="3" height="6" />
          <rect x="12" y="9" width="3" height="10" />
          <rect x="17" y="5" width="3" height="14" />
        </svg>
      );
    default:
      return null;
  }
};

const Rocket: React.FC = () => (
  <svg
    width="120"
    height="120"
    viewBox="0 0 120 120"
    fill="none"
    aria-hidden="true"
    className="welcome-rocket"
  >
    <defs>
      <linearGradient id="rocketBody" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#EA580C" />
        <stop offset="50%" stopColor="#F97316" />
        <stop offset="100%" stopColor="#FB923C" />
      </linearGradient>
      <linearGradient id="flame" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FB923C" />
        <stop offset="100%" stopColor="#FBBF24" stopOpacity="0" />
      </linearGradient>
    </defs>
    {/* Flame */}
    <path
      d="M52 92 Q60 118 68 92 Q64 100 60 100 Q56 100 52 92 Z"
      fill="url(#flame)"
    />
    {/* Body */}
    <path
      d="M60 12 Q78 36 78 64 L78 88 Q78 92 74 92 L46 92 Q42 92 42 88 L42 64 Q42 36 60 12 Z"
      fill="url(#rocketBody)"
    />
    {/* Window */}
    <circle cx="60" cy="50" r="9" fill="#FFF7ED" stroke="#9A3412" strokeWidth="2" />
    <circle cx="60" cy="50" r="5" fill="#7DD3FC" />
    {/* Fins */}
    <path d="M42 72 L30 92 L42 88 Z" fill="#C2410C" />
    <path d="M78 72 L90 92 L78 88 Z" fill="#C2410C" />
    {/* Nose tip highlight */}
    <path d="M60 12 Q66 24 66 34 L54 34 Q54 24 60 12 Z" fill="#FED7AA" opacity="0.5" />
  </svg>
);

const App: React.FC = () => {
  return (
    <div className="welcome-root">
      <main className="welcome-container">
        <header className="welcome-hero">
          <Rocket />
          <h1 className="welcome-title">You shipped on Clue2App on June 30th 2026!</h1>
          <p className="welcome-subtitle">
            Your React 18 / TypeScript / CRA app is live and serving at this URL.
          </p>
        </header>

        <section className="welcome-section">
          <h2 className="welcome-section-title">What just happened</h2>
          <div className="welcome-grid">
            {timeline.map((card) => (
              <article key={card.step} className="welcome-card welcome-card--timeline">
                <div className="welcome-card-step">{card.step}</div>
                <div className="welcome-card-icon" style={{ background: ACCENT_GRADIENT }}>
                  <Icon name={card.icon} />
                </div>
                <h3 className="welcome-card-title">{card.title}</h3>
                <p className="welcome-card-sub">{card.sub}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="welcome-section">
          <h2 className="welcome-section-title">What's next</h2>
          <div className="welcome-grid">
            {ctas.map((card) => {
              const Tag = card.href ? 'a' : 'div';
              const tagProps = card.href
                ? { href: card.href, target: '_blank', rel: 'noreferrer' }
                : {};
              return (
                <Tag
                  key={card.title}
                  className={`welcome-card welcome-card--cta${card.href ? ' welcome-card--clickable' : ''}`}
                  {...tagProps}
                >
                  <div className="welcome-card-icon" style={{ background: ACCENT_GRADIENT }}>
                    <Icon name={card.icon} />
                  </div>
                  <h3 className="welcome-card-title">{card.title}</h3>
                  <p className="welcome-card-sub">{card.sub}</p>
                </Tag>
              );
            })}
          </div>
        </section>

        <footer className="welcome-footer">
          <span>Clue2App — push code, get apps</span>
          <span className="welcome-footer-sep">·</span>
          <a
            href="https://clue2app.ai"
            target="_blank"
            rel="noreferrer"
            className="welcome-link"
          >
            clue2app.ai
          </a>
        </footer>
      </main>
    </div>
  );
};

export default App;
