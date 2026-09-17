import React, { useState, useMemo } from 'react';
import type { SystemUser } from '../types/fpdb';
import { mockSystemUsers } from '../data/mockUsersAndMatrix';
import { 
  ArrowLeft, Search, Shield, Plus, 
  CheckCircle2, Mail, X, Layers
} from 'lucide-react';

interface UsersRolesPageProps {
  onBack: () => void;
  onNavigateToMatrix?: () => void;
}

export const UsersRolesPage: React.FC<UsersRolesPageProps> = ({
  onBack,
  onNavigateToMatrix,
}) => {
  const [users, setUsers] = useState<SystemUser[]>(mockSystemUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('ALL');
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);

  // New User Form State
  const [newNik, setNewNik] = useState('');
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newRole, setNewRole] = useState('Senior Field Sales Executive');
  const [newDept, setNewDept] = useState('Branch Sales Regional');
  const [newRegion, setNewRegion] = useState('Jawa Tengah Hub');
  const [newPhone, setNewPhone] = useState('0812-3456-7890');
  const [canApprove, setCanApprove] = useState(false);

  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const matchQuery =
        u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.nik.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.branchOrRegion.toLowerCase().includes(searchQuery.toLowerCase());

      const matchCategory = roleFilter === 'ALL' || u.roleCategory === roleFilter;
      return matchQuery && matchCategory;
    });
  }, [users, searchQuery, roleFilter]);

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newNik) return;

    const newUser: SystemUser = {
      id: `usr-${Date.now()}`,
      nik: newNik,
      name: newName,
      email: newEmail || `${newName.toLowerCase().replace(/\s+/g, '.')}@modena.com`,
      role: newRole,
      roleCategory: canApprove ? 'MANAGEMENT' : 'SALES',
      department: newDept,
      branchOrRegion: newRegion,
      phone: newPhone,
      status: 'Aktif',
      canApproveLimit: canApprove,
      approvalAuthorityLevel: canApprove ? 'Level Approval Terdaftar' : undefined,
    };

    setUsers([newUser, ...users]);
    setIsAddUserOpen(false);
    setNewNik('');
    setNewName('');
  };

  return (
    <div style={{ width: '100%', padding: '1.5rem 2rem 3rem' }}>
      {/* Top Header Navigation */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button
            type="button"
            onClick={onBack}
            className="btn-secondary"
            style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
          >
            <ArrowLeft size={16} /> Kembali ke Dashboard
          </button>
          {onNavigateToMatrix && (
            <button
              type="button"
              onClick={onNavigateToMatrix}
              className="btn-secondary"
              style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
            >
              <Layers size={15} /> Lihat Matriks Approval Limit
            </button>
          )}
        </div>

        <div style={{ textAlign: 'right' }}>
          <span style={{
            backgroundColor: '#f4f4f5',
            color: '#09090b',
            border: '1px solid #d4d4d8',
            padding: '0.2rem 0.6rem',
            borderRadius: '6px',
            fontSize: '0.75rem',
            fontWeight: 700,
          }}>
            HAK AKSES & OTORISASI ({users.length} PENGGUNA)
          </span>
          <h1 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#09090b', margin: '0.25rem 0 0', letterSpacing: '-0.02em' }}>
            Manajemen User & Role Access FPDB
          </h1>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1rem',
        marginBottom: '1.75rem'
      }}>
        <div style={{ backgroundColor: '#ffffff', border: '1px solid #e4e4e7', borderRadius: '10px', padding: '1.15rem 1.25rem' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#71717a', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Total Akun Terdaftar</div>
          <div style={{ fontSize: '1.45rem', fontWeight: 800, color: '#09090b' }}>{users.length} Akun</div>
          <p style={{ fontSize: '0.75rem', color: '#059669', margin: '0.25rem 0 0', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <CheckCircle2 size={13} /> Seluruh akun aktif SSO Entra ID
          </p>
        </div>

        <div style={{ backgroundColor: '#ffffff', border: '1px solid #e4e4e7', borderRadius: '10px', padding: '1.15rem 1.25rem' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#71717a', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Pejabat Penyetuju Limit</div>
          <div style={{ fontSize: '1.45rem', fontWeight: 800, color: '#09090b' }}>
            {users.filter((u) => u.canApproveLimit).length} Pejabat
          </div>
          <p style={{ fontSize: '0.75rem', color: '#71717a', margin: '0.25rem 0 0' }}>Senior Manager s/d Direksi</p>
        </div>

        <div style={{ backgroundColor: '#ffffff', border: '1px solid #e4e4e7', borderRadius: '10px', padding: '1.15rem 1.25rem' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#71717a', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Sales & Pembuat FPDB</div>
          <div style={{ fontSize: '1.45rem', fontWeight: 800, color: '#09090b' }}>
            {users.filter((u) => u.roleCategory === 'SALES').length} Personel
          </div>
          <p style={{ fontSize: '0.75rem', color: '#71717a', margin: '0.25rem 0 0' }}>Branch, KAM, Pro, Distributor, Project</p>
        </div>

        <div style={{ backgroundColor: '#ffffff', border: '1px solid #e4e4e7', borderRadius: '10px', padding: '1.15rem 1.25rem' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#71717a', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Credit Control Analyst</div>
          <div style={{ fontSize: '1.45rem', fontWeight: 800, color: '#09090b' }}>
            {users.filter((u) => u.roleCategory === 'CREDIT_CONTROL').length} Analis
          </div>
          <p style={{ fontSize: '0.75rem', color: '#71717a', margin: '0.25rem 0 0' }}>Finance & SLIK OJK Verification</p>
        </div>
      </div>

      {/* Main Container */}
      <div style={{
        backgroundColor: '#ffffff',
        border: '1px solid #e4e4e7',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
      }}>
        {/* Toolbar */}
        <div style={{
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid #e4e4e7',
          display: 'flex',
          gap: '1rem',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#ffffff'
        }}>
          {/* Search */}
          <div style={{ position: 'relative', flex: 1, minWidth: '260px' }}>
            <Search size={16} color="#71717a" style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Cari user berdasarkan NIK, nama pejabat, role, atau wilayah..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '0.65rem 1rem 0.65rem 2.4rem',
                borderRadius: '8px',
                border: '1px solid #d4d4d8',
                fontSize: '0.85rem'
              }}
            />
          </div>

          {/* Filter Roles */}
          <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
            {[
              { key: 'ALL', label: 'Semua User' },
              { key: 'SALES', label: 'Sales (Pembuat)' },
              { key: 'MANAGEMENT', label: 'Manager / VP (Approver)' },
              { key: 'EXECUTIVE', label: 'EVP / COO / Direksi' },
              { key: 'CREDIT_CONTROL', label: 'Credit Control' },
            ].map((f) => (
              <button
                key={f.key}
                type="button"
                onClick={() => setRoleFilter(f.key)}
                style={{
                  padding: '0.45rem 0.75rem',
                  borderRadius: '6px',
                  fontSize: '0.785rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: '1px solid',
                  backgroundColor: roleFilter === f.key ? '#09090b' : '#ffffff',
                  color: roleFilter === f.key ? '#ffffff' : '#52525b',
                  borderColor: roleFilter === f.key ? '#09090b' : '#d4d4d8'
                }}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Add User Button */}
          <button
            type="button"
            onClick={() => setIsAddUserOpen(true)}
            className="btn-primary"
            style={{
              padding: '0.6rem 1rem',
              fontSize: '0.825rem',
              backgroundColor: '#09090b',
              borderColor: '#000000',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            <Plus size={16} />
            <span>Tambah User / Role</span>
          </button>
        </div>

        {/* Users Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ backgroundColor: '#f4f4f5', borderBottom: '2px solid #e4e4e7' }}>
                <th style={{ padding: '0.85rem 1.25rem', textAlign: 'left', fontWeight: 700, color: '#09090b' }}>NIK & Nama Pejabat</th>
                <th style={{ padding: '0.85rem 1.25rem', textAlign: 'left', fontWeight: 700, color: '#09090b' }}>Role & Jabatan</th>
                <th style={{ padding: '0.85rem 1.25rem', textAlign: 'left', fontWeight: 700, color: '#09090b' }}>Departemen & Wilayah</th>
                <th style={{ padding: '0.85rem 1.25rem', textAlign: 'left', fontWeight: 700, color: '#09090b' }}>Otoritas Approval Limit</th>
                <th style={{ padding: '0.85rem 1.25rem', textAlign: 'center', fontWeight: 700, color: '#09090b' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ padding: '3rem', textAlign: 'center', color: '#71717a' }}>
                    User tidak ditemukan dengan kata kunci tersebut.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((u, idx) => (
                  <tr
                    key={u.id}
                    style={{
                      borderBottom: '1px solid #e4e4e7',
                      backgroundColor: idx % 2 === 0 ? '#ffffff' : '#fafafa'
                    }}
                  >
                    <td style={{ padding: '0.95rem 1.25rem' }}>
                      <div style={{ fontWeight: 800, color: '#09090b', fontSize: '0.9rem' }}>
                        {u.name}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', color: '#71717a', marginTop: '0.15rem' }}>
                        <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#09090b' }}>{u.nik}</span>
                        <span>•</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                          <Mail size={12} /> {u.email}
                        </span>
                      </div>
                    </td>

                    <td style={{ padding: '0.95rem 1.25rem' }}>
                      <div style={{ fontWeight: 700, color: '#09090b' }}>{u.role}</div>
                      <div style={{ marginTop: '0.2rem' }}>
                        <span style={{
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          padding: '0.1rem 0.45rem',
                          borderRadius: '4px',
                          border: '1px solid #e4e4e7',
                          backgroundColor: u.roleCategory === 'EXECUTIVE' ? '#09090b' : '#ffffff',
                          color: u.roleCategory === 'EXECUTIVE' ? '#ffffff' : '#3f3f46',
                        }}>
                          {u.roleCategory}
                        </span>
                      </div>
                    </td>

                    <td style={{ padding: '0.95rem 1.25rem', color: '#52525b', fontSize: '0.825rem' }}>
                      <div>{u.department}</div>
                      <div style={{ color: '#71717a', fontSize: '0.75rem', marginTop: '0.15rem' }}>{u.branchOrRegion}</div>
                    </td>

                    <td style={{ padding: '0.95rem 1.25rem' }}>
                      {u.canApproveLimit ? (
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.4rem' }}>
                          <Shield size={14} color="#059669" style={{ marginTop: '2px', flexShrink: 0 }} />
                          <div>
                            <span style={{ fontWeight: 700, color: '#09090b', fontSize: '0.8rem' }}>Approver Berwenang</span>
                            <div style={{ fontSize: '0.725rem', color: '#52525b', marginTop: '0.1rem' }}>
                              {u.approvalAuthorityLevel || 'Tingkat Approval Terdaftar'}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <span style={{ fontSize: '0.75rem', color: '#71717a', fontStyle: 'italic' }}>
                          Pembuat Formulir (Inisiator)
                        </span>
                      )}
                    </td>

                    <td style={{ padding: '0.95rem 1.25rem', textAlign: 'center' }}>
                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                        fontSize: '0.725rem',
                        fontWeight: 600,
                        backgroundColor: '#ecfdf5',
                        color: '#047857',
                        border: '1px solid #a7f3d0',
                        padding: '0.15rem 0.5rem',
                        borderRadius: '9999px'
                      }}>
                        <CheckCircle2 size={12} /> Aktif
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Add User Form Modal (Embedded Clean Form) */}
      {isAddUserOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(9, 9, 11, 0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 60,
          padding: '1rem'
        }}>
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            width: '100%',
            maxWidth: '520px',
            overflow: 'hidden',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2)',
            border: '1px solid #e4e4e7'
          }}>
            <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #e4e4e7', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#09090b', margin: 0 }}>
                Tambah Akun Pejabat / Sales Baru
              </h3>
              <button
                type="button"
                onClick={() => setIsAddUserOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#71717a' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddUser} style={{ padding: '1.5rem', display: 'grid', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#09090b', marginBottom: '0.35rem' }}>
                  NIK Karyawan Modena *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: SLS-2026-102"
                  value={newNik}
                  onChange={(e) => setNewNik(e.target.value)}
                  style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: '6px', border: '1px solid #d4d4d8', fontSize: '0.85rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#09090b', marginBottom: '0.35rem' }}>
                  Nama Lengkap & Gelar *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Nama Lengkap Pejabat / Sales"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: '6px', border: '1px solid #d4d4d8', fontSize: '0.85rem' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#09090b', marginBottom: '0.35rem' }}>
                    Email Kantor (@modena.com)
                  </label>
                  <input
                    type="email"
                    placeholder="nama.karyawan@modena.com"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: '6px', border: '1px solid #d4d4d8', fontSize: '0.85rem' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#09090b', marginBottom: '0.35rem' }}>
                    No. Handphone / WhatsApp
                  </label>
                  <input
                    type="text"
                    placeholder="0812-xxxx-xxxx"
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: '6px', border: '1px solid #d4d4d8', fontSize: '0.85rem' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#09090b', marginBottom: '0.35rem' }}>
                    Jabatan / Role *
                  </label>
                  <select
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                    style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: '6px', border: '1px solid #d4d4d8', fontSize: '0.85rem', backgroundColor: '#ffffff' }}
                  >
                    <option value="Senior Field Sales Executive">Senior Field Sales Executive</option>
                    <option value="Key Account Sales (KAM)">Key Account Sales (KAM)</option>
                    <option value="Professional Appliance Sales Dealer">Professional Appliance Sales Dealer</option>
                    <option value="Regional BBD Senior Manager">Regional BBD Senior Manager</option>
                    <option value="Dealership BD Vice President">Dealership BD Vice President</option>
                    <option value="Customer Management EVP">Customer Management EVP</option>
                    <option value="Distributor Manager">Distributor Manager</option>
                    <option value="Credit Risk Analyst">Credit Risk Analyst</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#09090b', marginBottom: '0.35rem' }}>
                    Departemen
                  </label>
                  <input
                    type="text"
                    value={newDept}
                    onChange={(e) => setNewDept(e.target.value)}
                    style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: '6px', border: '1px solid #d4d4d8', fontSize: '0.85rem' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#09090b', marginBottom: '0.35rem' }}>
                  Wilayah / Hub Cabang
                </label>
                <input
                  type="text"
                  value={newRegion}
                  onChange={(e) => setNewRegion(e.target.value)}
                  style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: '6px', border: '1px solid #d4d4d8', fontSize: '0.85rem' }}
                />
              </div>

              <div style={{
                backgroundColor: '#fafafa',
                border: '1px solid #e4e4e7',
                borderRadius: '8px',
                padding: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}>
                <input
                  type="checkbox"
                  id="canApprove"
                  checked={canApprove}
                  onChange={(e) => setCanApprove(e.target.checked)}
                  style={{ width: '16px', height: '16px', accentColor: '#09090b' }}
                />
                <label htmlFor="canApprove" style={{ fontSize: '0.8rem', color: '#09090b', fontWeight: 600, cursor: 'pointer' }}>
                  Memiliki Otoritas Approval Limit Kredit (Sesuai Matriks SOP)
                </label>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button
                  type="button"
                  onClick={() => setIsAddUserOpen(false)}
                  className="btn-secondary"
                  style={{ padding: '0.6rem 1rem' }}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                  style={{ padding: '0.6rem 1.25rem', backgroundColor: '#09090b', borderColor: '#000000' }}
                >
                  Simpan Akun
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
