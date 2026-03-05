import React from 'react';

const metrics = [
  { label: 'Daily Active Users', value: '4,231', change: '+12.4%', positive: true, data: [3200, 3400, 3100, 3700, 3900, 4100, 4231] },
  { label: 'Revenue', value: '$12,840', change: '+8.2%', positive: true, data: [10200, 10800, 11200, 11500, 12100, 12400, 12840] },
  { label: 'Churn Rate', value: '2.1%', change: '-0.3%', positive: true, data: [2.8, 2.6, 2.5, 2.4, 2.3, 2.2, 2.1] },
  { label: 'NPS Score', value: '67', change: '+5 pts', positive: true, data: [58, 60, 61, 63, 64, 66, 67] },
];

const Sparkline = ({ data, positive }) => {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const width = 80;
  const height = 32;
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((v - min) / (max - min || 1)) * height;
    return `${x},${y}`;
  }).join(' ');
  const color = positive ? '#22c55e' : '#ef4444';
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ overflow: 'visible' }}>
      <polyline points={points} fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
      <circle cx={parseFloat(points.split(' ').pop().split(',')[0])} cy={parseFloat(points.split(' ').pop().split(',')[1])} r="3" fill={color} />
    </svg>
  );
};

const MetricCard = ({ label, value, change, positive, data }) => (
  <div style={{
    background: '#1e293b',
    borderRadius: '10px',
    padding: '20px',
    marginBottom: '12px',
  }}>
    <div style={{ color: '#94a3b8', fontSize: '12px', fontWeight: 500, marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
      {label}
    </div>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
      <div>
        <div style={{ color: '#f1f5f9', fontSize: '26px', fontWeight: 700, lineHeight: 1 }}>
          {value}
        </div>
        <div style={{
          color: positive ? '#22c55e' : '#ef4444',
          fontSize: '12px', fontWeight: 600, marginTop: '6px',
          display: 'flex', alignItems: 'center', gap: '4px',
        }}>
          <span>{positive ? '↑' : '↓'}</span> {change}
        </div>
      </div>
      <Sparkline data={data} positive={positive} />
    </div>
  </div>
);

const AnalyticsSidebar = () => (
  <aside style={{
    width: '280px',
    background: '#0f172a',
    padding: '24px',
    fontFamily: "'Inter', -apple-system, sans-serif",
    minHeight: '100vh',
    borderRight: '1px solid #1e293b',
  }}>
    <div style={{ marginBottom: '24px' }}>
      <h2 style={{ color: '#f1f5f9', fontSize: '16px', fontWeight: 600 }}>Analytics</h2>
      <p style={{ color: '#475569', fontSize: '12px', marginTop: '4px' }}>Last 7 days</p>
    </div>
    {metrics.map((m) => (
      <MetricCard key={m.label} {...m} />
    ))}
    <div style={{
      marginTop: '16px', padding: '16px',
      background: '#1e293b', borderRadius: '10px',
      borderLeft: '3px solid #3b82f6',
    }}>
      <div style={{ color: '#94a3b8', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Period</div>
      <div style={{ color: '#f1f5f9', fontSize: '13px', marginTop: '4px', fontWeight: 500 }}>Mar 1 – Mar 7, 2025</div>
    </div>
  </aside>
);

export default AnalyticsSidebar;
