import React from 'react';
import { 
  Building2, LayoutDashboard, PlusCircle, Database, 
  FileText, AlertTriangle, HelpCircle, LogOut, 
  ChevronLeft, ChevronRight, ShieldCheck, Users
} from 'lucide-react';

export type SidebarMenuKey = 
  | 'DASHBOARD'
  | 'NEW_DEALER'
  | 'EXISTING_DEALERS'
  | 'ALL_SUBMISSIONS'
  | 'NEEDS_REVISION'
  | 'GUIDELINES'
  | 'APPROVAL_MATRIX'
  | 'USER_ROLES';

interface SidebarProps {
  currentMenu: SidebarMenuKey;
  onSelectMenu: (menu: SidebarMenuKey) => void;
  onLogout: () => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentMenu,
  onSelectMenu,
  onLogout,
  isCollapsed,
  onToggleCollapse,
}) => {
  const menuItems = [
    {
      key: 'DASHBOARD' as SidebarMenuKey,
      label: 'Dashboard Sales',
      icon: LayoutDashboard,
    },
    {
      key: 'NEW_DEALER' as SidebarMenuKey,
      label: 'Pengajuan Baru',
      icon: PlusCircle,
    },
    {
      key: 'EXISTING_DEALERS' as SidebarMenuKey,
      label: 'Data Dealer Aktif',
      icon: Database,
    },
    {
      key: 'ALL_SUBMISSIONS' as SidebarMenuKey,
      label: 'Daftar Pengajuan FPDB',
      icon: FileText,
    },
    {
      key: 'NEEDS_REVISION' as SidebarMenuKey,
      label: 'Perlu Revisi',
      icon: AlertTriangle,
    },
    {
      key: 'GUIDELINES' as SidebarMenuKey,
      label: 'Pedoman & SOP FPDB',
      icon: HelpCircle,
    },
    {
      key: 'APPROVAL_MATRIX' as SidebarMenuKey,
      label: 'Matriks Approval Limit',
      icon: ShieldCheck,
    },
    {
      key: 'USER_ROLES' as SidebarMenuKey,
      label: 'Manajemen User & Role',
      icon: Users,
    },
  ];

  return (
    <aside style={{
      width: isCollapsed ? '76px' : '260px',
      backgroundColor: '#09090b',
      borderRight: '1px solid #18181b',
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      position: 'fixed',
      left: 0,
      top: 0,
      bottom: 0,
      zIndex: 50,
      transition: 'width 0.2s ease',
      boxShadow: '2px 0 8px rgba(0, 0, 0, 0.25)'
    }}>
      {/* Brand Header */}
      <div style={{
        padding: isCollapsed ? '1.25rem 0.5rem' : '1.35rem 1.25rem',
        borderBottom: '1px solid #18181b',
        display: 'flex',
        alignItems: 'center',
        justifyContent: isCollapsed ? 'center' : 'space-between',
        backgroundColor: '#09090b',
        color: '#ffffff',
        overflow: 'hidden'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', overflow: 'hidden' }}>
          <div style={{
            backgroundColor: '#ffffff',
            color: '#09090b',
            padding: '0.5rem',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <Building2 size={19} />
          </div>
          {!isCollapsed && (
            <div style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}>
              <div style={{ fontWeight: 800, fontSize: '0.975rem', letterSpacing: '-0.02em', lineHeight: 1.2, color: '#ffffff' }}>
                MODENA FPDB
              </div>
              <div style={{ fontSize: '0.685rem', color: '#71717a', marginTop: '0.1rem' }}>
                Dealer Portal System
              </div>
            </div>
          )}
        </div>

        {!isCollapsed && (
          <button
            type="button"
            onClick={onToggleCollapse}
            title="Sembunyikan / Kecilkan Menu"
            style={{
              background: 'none',
              border: 'none',
              color: '#71717a',
              cursor: 'pointer',
              padding: '0.25rem',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <ChevronLeft size={18} />
          </button>
        )}
      </div>

      {isCollapsed && (
        <div style={{ textAlign: 'center', padding: '0.5rem 0', borderBottom: '1px solid #18181b' }}>
          <button
            type="button"
            onClick={onToggleCollapse}
            title="Buka Menu"
            style={{
              background: 'none',
              border: 'none',
              color: '#71717a',
              cursor: 'pointer',
              padding: '0.25rem'
            }}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      )}

      {/* Navigation Links */}
      <nav style={{ flex: 1, padding: '1.25rem 0.65rem', display: 'flex', flexDirection: 'column', gap: '0.35rem', overflowY: 'auto' }}>
        {!isCollapsed && (
          <div style={{ fontSize: '0.685rem', fontWeight: 700, color: '#52525b', textTransform: 'uppercase', letterSpacing: '0.06em', padding: '0 0.65rem 0.5rem' }}>
            Menu Utama
          </div>
        )}

        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentMenu === item.key;
          return (
            <button
              key={item.key}
              type="button"
              onClick={() => onSelectMenu(item.key)}
              title={item.label}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: isCollapsed ? 'center' : 'flex-start',
                gap: '0.75rem',
                width: '100%',
                padding: isCollapsed ? '0.75rem 0' : '0.65rem 0.85rem',
                borderRadius: '8px',
                border: isActive ? '1px solid #27272a' : '1px solid transparent',
                backgroundColor: isActive ? '#18181b' : 'transparent',
                color: isActive ? '#ffffff' : '#a1a1aa',
                fontWeight: isActive ? 700 : 500,
                fontSize: '0.825rem',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.15s ease'
              }}
              onMouseOver={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = '#18181b';
                  e.currentTarget.style.color = '#ffffff';
                }
              }}
              onMouseOut={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#a1a1aa';
                }
              }}
            >
              <Icon size={18} color={isActive ? '#ffffff' : '#71717a'} style={{ flexShrink: 0 }} />
              {!isCollapsed && (
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {item.label}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Clean Bottom Bar: Logout Button Only */}
      <div style={{
        padding: '1rem 0.75rem',
        borderTop: '1px solid #18181b',
        backgroundColor: '#09090b'
      }}>
        <button
          type="button"
          onClick={onLogout}
          title="Keluar dari sesi ini"
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: isCollapsed ? 'center' : 'flex-start',
            gap: '0.65rem',
            padding: isCollapsed ? '0.65rem 0' : '0.65rem 0.85rem',
            backgroundColor: '#18181b',
            color: '#f87171',
            border: '1px solid #27272a',
            borderRadius: '8px',
            fontSize: '0.825rem',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.15s ease'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = '#27272a';
            e.currentTarget.style.borderColor = '#3f3f46';
            e.currentTarget.style.color = '#ef4444';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = '#18181b';
            e.currentTarget.style.borderColor = '#27272a';
            e.currentTarget.style.color = '#f87171';
          }}
        >
          <LogOut size={16} />
          {!isCollapsed && <span>Keluar / Logout</span>}
        </button>
      </div>
    </aside>
  );
};
