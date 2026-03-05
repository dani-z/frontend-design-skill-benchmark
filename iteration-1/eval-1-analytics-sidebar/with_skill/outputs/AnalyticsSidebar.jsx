/**
 * AnalyticsSidebar — editorial/newspaper-register aesthetic
 * Monospace typography, raw ink-on-paper data presentation,
 * hand-drawn sparklines, no rounded corners, no gradients.
 */
import React, { useEffect, useRef } from 'react';

const PALETTE = {
  bg: '#f7f4ef',
  surface: '#ffffff',
  ink: '#0f0e0b',
  muted: '#7a7468',
  rule: 'rgba(15,14,11,0.10)',
  up: '#1a6b3c',
  down: '#b83232',
};

const FONTS = {
  mono: "'DM Mono', 'Courier New', monospace",
  serif: "'Playfair Display', Georgia, serif",
};

const metrics = [
  {
    id: 'dau',
    label: 'Daily Active',
    sublabel: 'Users',
    value: 4231,
    display: '4,231',
    change: +12.4,
    suffix: '',
    trend: [3201, 3444, 3112, 3701, 3894, 4108, 4231],
  },
  {
    id: 'rev',
    label: 'Revenue',
    sublabel: 'USD',
    value: 12840,
    display: '$12,840',
    change: +8.2,
    suffix: '',
    trend: [10240, 10810, 11200, 11520, 12080, 12430, 12840],
  },
  {
    id: 'churn',
    label: 'Churn',
    sublabel: 'Rate',
    value: 2.1,
    display: '2.1%',
    change: -0.3,   // negative change = good for churn
    isInverse: true,
    suffix: '%',
    trend: [2.8, 2.6, 2.5, 2.4, 2.3, 2.2, 2.1],
  },
  {
    id: 'nps',
    label: 'NPS',
    sublabel: 'Score',
    value: 67,
    display: '67',
    change: +5,
    suffix: ' pts',
    trend: [58, 60, 61, 63, 64, 66, 67],
  },
];

// SVG sparkline with rough hand-drawn feel via tiny random jitter
const Sparkline = ({ data, isGood }) => {
  const W = 72, H = 28;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * W;
    const y = H - ((v - min) / range) * (H - 2) - 1;
    return [x, y];
  });

  const d = pts.map(([x, y], i) => `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`).join(' ');
  const color = isGood ? PALETTE.up : PALETTE.down;
  const [lx, ly] = pts[pts.length - 1];

  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ display: 'block', overflow: 'visible' }}>
      <path d={d} fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
      <circle cx={lx} cy={ly} r="2.5" fill={color} />
    </svg>
  );
};

const MetricRow = ({ label, sublabel, display, change, isInverse, trend, index }) => {
  const isGood = isInverse ? change < 0 : change > 0;
  const sign = change > 0 ? '+' : '';
  const arrow = isGood ? '↑' : '↓';
  const changeColor = isGood ? PALETTE.up : PALETTE.down;

  return (
    <div style={{
      borderBottom: `1px solid ${PALETTE.rule}`,
      padding: '18px 0',
      display: 'grid',
      gridTemplateColumns: '1fr auto',
      gap: '12px',
      alignItems: 'center',
      opacity: 0,
      animation: `fadeIn 0.4s ${index * 0.08}s ease forwards`,
    }}>
      <div>
        <div style={{
          fontFamily: FONTS.mono,
          fontSize: '9px',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: PALETTE.muted,
          marginBottom: '6px',
        }}>
          {label} / {sublabel}
        </div>
        <div style={{
          fontFamily: FONTS.serif,
          fontSize: '30px',
          fontWeight: 700,
          letterSpacing: '-1px',
          lineHeight: 1,
          color: PALETTE.ink,
        }}>
          {display}
        </div>
        <div style={{
          fontFamily: FONTS.mono,
          fontSize: '10px',
          color: changeColor,
          marginTop: '6px',
          letterSpacing: '0.04em',
        }}>
          {arrow} {sign}{change}%{isInverse ? '' : ''}
        </div>
      </div>
      <div style={{ paddingTop: '4px' }}>
        <Sparkline data={trend} isGood={isGood} />
      </div>
    </div>
  );
};

const AnalyticsSidebar = () => (
  <>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Playfair+Display:wght@700&display=swap');
      @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
    `}</style>
    <aside style={{
      width: '280px',
      minHeight: '100vh',
      background: PALETTE.bg,
      borderRight: `1px solid ${PALETTE.rule}`,
      fontFamily: FONTS.mono,
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Header */}
      <div style={{
        padding: '28px 24px 20px',
        borderBottom: `2px solid ${PALETTE.ink}`,
      }}>
        <div style={{
          fontFamily: FONTS.mono,
          fontSize: '9px',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: PALETTE.muted,
          marginBottom: '4px',
        }}>
          Week of Mar 1–7
        </div>
        <div style={{
          fontFamily: FONTS.serif,
          fontSize: '20px',
          fontWeight: 700,
          color: PALETTE.ink,
          letterSpacing: '-0.5px',
        }}>
          Performance
        </div>
      </div>

      {/* Metrics */}
      <div style={{ padding: '0 24px', flex: 1 }}>
        {metrics.map((m, i) => (
          <MetricRow key={m.id} {...m} index={i} />
        ))}
      </div>

      {/* Footer note */}
      <div style={{
        padding: '16px 24px 24px',
        borderTop: `1px solid ${PALETTE.rule}`,
      }}>
        <div style={{
          fontFamily: FONTS.mono,
          fontSize: '9px',
          letterSpacing: '0.08em',
          color: PALETTE.muted,
          lineHeight: 1.6,
        }}>
          vs. prior 7 days<br />
          <span style={{ color: PALETTE.up }}>↑ positive</span>
          {' · '}
          <span style={{ color: PALETTE.down }}>↓ negative</span>
        </div>
      </div>
    </aside>
  </>
);

export default AnalyticsSidebar;
