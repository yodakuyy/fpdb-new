import { CheckCircle2, Bell } from 'lucide-react';

interface NavbarProps {
  user: {
    name: string;
    nik: string;
    role: string;
    branch: string;
  };
  currentTitle: string;
  onLogout: () => void;
  onGoHome: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ user, currentTitle }) => {
  return (
    <header style={{
      backgroundColor: '#ffffff',
      borderBottom: '1px solid #e2e8f0',
      position: 'sticky',
      top: 0,
      zIndex: 30,
      padding: '0.75rem 2rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: '1rem',
      boxShadow: '0 1px 2px rgba(15, 23, 42, 0.03)'
    }}>
      {/* Left: Clean Subtle Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.825rem' }}>
          <span style={{ color: '#09090b', fontWeight: 700 }}>Portal FPDB</span>
          <span style={{ color: '#d4d4d8' }}>/</span>
          <span style={{ color: '#71717a', fontWeight: 500 }}>{currentTitle}</span>
        </div>
      </div>

      {/* Right: Notification Bell & User Badge */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
        {/* Notification Bell */}
        <div style={{
          backgroundColor: '#f4f4f5',
          border: '1px solid #e4e4e7',
          padding: '0.45rem',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          color: '#09090b',
          position: 'relative',
          cursor: 'pointer'
        }}>
          <Bell size={16} />
          <div style={{
            position: 'absolute',
            top: '4px',
            right: '4px',
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: '#ef4444'
          }} />
        </div>

        {/* Online User Badge */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.45rem',
          padding: '0.35rem 0.75rem',
          backgroundColor: '#ecfdf5',
          border: '1px solid #a7f3d0',
          borderRadius: '9999px',
          fontSize: '0.75rem',
          fontWeight: 600,
          color: '#047857'
        }}>
          <CheckCircle2 size={13} />
          <span>{user.name.split(' ')[0]} (Aktif)</span>
        </div>
      </div>
    </header>
  );
};
