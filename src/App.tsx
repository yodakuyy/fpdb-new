import React, { useState } from 'react';
import { LoginPage } from './components/LoginPage';
import { Navbar } from './components/Navbar';
import { Sidebar, type SidebarMenuKey } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { DealersPage } from './components/DealersPage';
import { RevisionsPage } from './components/RevisionsPage';
import { FPDBForm } from './components/FPDBForm';
import { SubmissionDetailModal } from './components/SubmissionDetailModal';
import { GuidelinesPage } from './components/GuidelinesPage';
import { ApprovalMatrixPage } from './components/ApprovalMatrixPage';
import { UsersRolesPage } from './components/UsersRolesPage';
import { SubmissionsPage } from './components/SubmissionsPage';
import { mockDealers, mockSubmissions } from './data/mockDealers';
import type { Dealer, FPDBSubmission } from './types/fpdb';
import { CheckCircle2, X } from 'lucide-react';

interface AuthUser {
  name: string;
  nik: string;
  role: string;
  region: string;
  branch: string;
}

export const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>({
    name: 'Rian Prasetya',
    nik: 'SLS-2021-089',
    role: 'Senior Field Sales Executive',
    region: 'Jawa Barat 1',
    branch: 'Regional Office Jawa Barat 1 - Bandung Hub',
  });

  const [currentView, setCurrentView] = useState<
    | 'DASHBOARD'
    | 'FORM_NEW'
    | 'FORM_EDIT'
    | 'DEALERS_LIST'
    | 'ALL_SUBMISSIONS'
    | 'REVISIONS_LIST'
    | 'GUIDELINES'
    | 'APPROVAL_MATRIX'
    | 'USER_ROLES'
  >('DASHBOARD');
  const [currentSidebarMenu, setCurrentSidebarMenu] = useState<SidebarMenuKey>('DASHBOARD');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const [dealers] = useState<Dealer[]>(mockDealers);
  const [submissions, setSubmissions] = useState<FPDBSubmission[]>(mockSubmissions);

  // Active selections
  const [selectedDealerForEdit, setSelectedDealerForEdit] = useState<Dealer | null>(null);
  const [activeDetailSubmission, setActiveDetailSubmission] = useState<FPDBSubmission | null>(null);

  // Success Notification Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 5000);
  };

  const handleLoginSuccess = (user: AuthUser) => {
    setCurrentUser(user);
    setCurrentView('DASHBOARD');
    setCurrentSidebarMenu('DASHBOARD');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('DASHBOARD');
  };

  const handleStartNewDealer = () => {
    setSelectedDealerForEdit(null);
    setCurrentView('FORM_NEW');
    setCurrentSidebarMenu('NEW_DEALER');
  };

  const handleStartEditDealer = () => {
    setCurrentView('DEALERS_LIST');
    setCurrentSidebarMenu('EXISTING_DEALERS');
  };

  const handleSelectDealer = (dealer: Dealer) => {
    setSelectedDealerForEdit(dealer);
    setCurrentView('FORM_EDIT');
  };

  const handleFormSubmit = (newSubmission: FPDBSubmission) => {
    setSubmissions((prev) => [newSubmission, ...prev]);
    setCurrentView('ALL_SUBMISSIONS');
    setCurrentSidebarMenu('ALL_SUBMISSIONS');
    showToast(`Formulir FPDB (${newSubmission.id}) untuk "${newSubmission.storeProfile.name}" berhasil disimpan dengan status "${newSubmission.status}".`);
  };

  const handleEditRevision = (sub: FPDBSubmission) => {
    if (sub.dealerId) {
      const match = dealers.find((d) => d.id === sub.dealerId);
      if (match) {
        setSelectedDealerForEdit(match);
        setCurrentView('FORM_EDIT');
        return;
      }
    }
    setSelectedDealerForEdit(null);
    setCurrentView('FORM_NEW');
  };

  // Sidebar Menu Selection Handler
  const handleSelectSidebarMenu = (menuKey: SidebarMenuKey) => {
    setCurrentSidebarMenu(menuKey);
    if (menuKey === 'DASHBOARD') {
      setCurrentView('DASHBOARD');
    } else if (menuKey === 'NEW_DEALER') {
      handleStartNewDealer();
    } else if (menuKey === 'EXISTING_DEALERS') {
      setCurrentView('DEALERS_LIST');
    } else if (menuKey === 'ALL_SUBMISSIONS') {
      setCurrentView('ALL_SUBMISSIONS');
    } else if (menuKey === 'NEEDS_REVISION') {
      setCurrentView('REVISIONS_LIST');
    } else if (menuKey === 'GUIDELINES') {
      setCurrentView('GUIDELINES');
    } else if (menuKey === 'APPROVAL_MATRIX') {
      setCurrentView('APPROVAL_MATRIX');
    } else if (menuKey === 'USER_ROLES') {
      setCurrentView('USER_ROLES');
    }
  };

  const getPageTitle = () => {
    if (currentView === 'FORM_NEW') return 'Pengajuan Dealer Baru (FPDB Baru)';
    if (currentView === 'FORM_EDIT') return `Perubahan Data Dealer: ${selectedDealerForEdit?.name || ''}`;
    if (currentView === 'DEALERS_LIST') return 'Database Master Dealer (SAP & ACCPAC)';
    if (currentView === 'ALL_SUBMISSIONS') return 'Daftar Pengajuan FPDB (Semua Berkas)';
    if (currentView === 'REVISIONS_LIST') return 'Daftar Pengajuan Perlu Tindakan Revisi';
    if (currentView === 'GUIDELINES') return 'Pedoman & Standar Operasional Pengajuan FPDB';
    if (currentView === 'APPROVAL_MATRIX') return 'Matriks Kewenangan Approval Kredit Limit (Point 4 SOP)';
    if (currentView === 'USER_ROLES') return 'Manajemen User & Role Access FPDB';
    return 'Dashboard Manajemen FPDB';
  };

  // If not logged in, render LoginPage
  if (!currentUser) {
    return <LoginPage onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      width: '100vw',
      backgroundColor: '#f8fafc',
      overflowX: 'hidden'
    }}>
      {/* 1. Left Fixed Sidebar Navigation */}
      <Sidebar
        currentMenu={currentSidebarMenu}
        onSelectMenu={handleSelectSidebarMenu}
        onLogout={handleLogout}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      {/* 2. Main Right Full-Screen Content Area */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        minWidth: 0,
        marginLeft: isSidebarCollapsed ? '76px' : '260px',
        transition: 'margin-left 0.2s ease',
        overflowX: 'hidden'
      }}>
        {/* Top Header Bar */}
        <Navbar
          user={currentUser}
          currentTitle={getPageTitle()}
          onLogout={handleLogout}
          onGoHome={() => {
            setCurrentView('DASHBOARD');
            setCurrentSidebarMenu('DASHBOARD');
          }}
        />

        {/* Floating Success Toast */}
        {toastMessage && (
          <div style={{
            position: 'fixed',
            bottom: '1.5rem',
            right: '1.5rem',
            zIndex: 100,
            backgroundColor: '#065f46',
            color: '#ffffff',
            padding: '0.85rem 1.25rem',
            borderRadius: '8px',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.2)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            maxWidth: '450px',
            fontSize: '0.825rem'
          }}>
            <CheckCircle2 size={18} color="#34d399" />
            <span style={{ flex: 1 }}>{toastMessage}</span>
            <button
              onClick={() => setToastMessage(null)}
              style={{ background: 'none', border: 'none', color: '#ffffff', cursor: 'pointer', padding: 0 }}
            >
              <X size={16} />
            </button>
          </div>
        )}

        {/* Main Content View (Each Feature has its own dedicated page!) */}
        <main style={{ flex: 1, width: '100%' }}>
          {currentView === 'DASHBOARD' && (
            <Dashboard
              user={currentUser}
              dealers={dealers}
              submissions={submissions}
              onStartNewDealer={handleStartNewDealer}
              onStartEditDealer={handleStartEditDealer}
              onViewSubmission={(sub) => setActiveDetailSubmission(sub)}
              onEditRevision={handleEditRevision}
              onNavigateToAllSubmissions={() => {
                setCurrentView('ALL_SUBMISSIONS');
                setCurrentSidebarMenu('ALL_SUBMISSIONS');
              }}
            />
          )}

          {currentView === 'ALL_SUBMISSIONS' && (
            <SubmissionsPage
              submissions={submissions}
              onViewSubmission={(sub) => setActiveDetailSubmission(sub)}
              onStartRevision={handleEditRevision}
              onStartNewDealer={handleStartNewDealer}
              onBack={() => {
                setCurrentView('DASHBOARD');
                setCurrentSidebarMenu('DASHBOARD');
              }}
            />
          )}

          {currentView === 'DEALERS_LIST' && (
            <DealersPage
              dealers={dealers}
              onSelectDealer={handleSelectDealer}
              onBack={() => {
                setCurrentView('DASHBOARD');
                setCurrentSidebarMenu('DASHBOARD');
              }}
            />
          )}

          {currentView === 'REVISIONS_LIST' && (
            <RevisionsPage
              submissions={submissions}
              onStartRevision={handleEditRevision}
              onBack={() => {
                setCurrentView('DASHBOARD');
                setCurrentSidebarMenu('DASHBOARD');
              }}
            />
          )}

          {currentView === 'GUIDELINES' && (
            <GuidelinesPage
              onBack={() => {
                setCurrentView('DASHBOARD');
                setCurrentSidebarMenu('DASHBOARD');
              }}
              onNavigateToMatrix={() => {
                setCurrentView('APPROVAL_MATRIX');
                setCurrentSidebarMenu('APPROVAL_MATRIX');
              }}
            />
          )}

          {currentView === 'APPROVAL_MATRIX' && (
            <ApprovalMatrixPage
              onBack={() => {
                setCurrentView('DASHBOARD');
                setCurrentSidebarMenu('DASHBOARD');
              }}
              onNavigateToUsers={() => {
                setCurrentView('USER_ROLES');
                setCurrentSidebarMenu('USER_ROLES');
              }}
            />
          )}

          {currentView === 'USER_ROLES' && (
            <UsersRolesPage
              onBack={() => {
                setCurrentView('DASHBOARD');
                setCurrentSidebarMenu('DASHBOARD');
              }}
              onNavigateToMatrix={() => {
                setCurrentView('APPROVAL_MATRIX');
                setCurrentSidebarMenu('APPROVAL_MATRIX');
              }}
            />
          )}

          {(currentView === 'FORM_NEW' || currentView === 'FORM_EDIT') && (
            <FPDBForm
              mode={currentView === 'FORM_NEW' ? 'NEW' : 'EDIT'}
              existingDealer={selectedDealerForEdit}
              onBack={() => {
                setCurrentView('DASHBOARD');
                setCurrentSidebarMenu('DASHBOARD');
              }}
              onSubmit={handleFormSubmit}
              salesman={currentUser}
            />
          )}
        </main>

        {/* Corporate Edge-to-Edge Footer */}
        <footer style={{
          backgroundColor: '#ffffff',
          borderTop: '1px solid #e2e8f0',
          padding: '1.15rem 2rem',
          fontSize: '0.75rem',
          color: '#64748b'
        }}>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center' }}>
            <div>
              © 2026 PT Modena Centro Indonesia • Sistem FPDB Terintegrasi SAP SD/FI & Credit Risk Management
            </div>
            <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
              <span>SLA Persetujuan: Maks. 3 Hari Kerja</span>
              <span>•</span>
              <span>Regional: {currentUser.region}</span>
              <span>•</span>
              <span>Helpdesk IT SAP: ext 4401</span>
            </div>
          </div>
        </footer>
      </div>

      {/* Modal Detail & Timeline Approval (Hanya muncul saat klik tombol 'Detail' di tabel riwayat) */}
      <SubmissionDetailModal
        isOpen={!!activeDetailSubmission}
        submission={activeDetailSubmission}
        onClose={() => setActiveDetailSubmission(null)}
        onEditRevision={handleEditRevision}
      />
    </div>
  );
};

export default App;
