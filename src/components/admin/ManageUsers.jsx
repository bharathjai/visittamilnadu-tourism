import React, { useState } from 'react'
import { User, ShieldCheck, UserCheck, Shield } from 'lucide-react'

export default function ManageUsers() {
  const [usersList, setUsersList] = useState([
    { id: 'usr-01', full_name: 'Sundar Raman', email: 'sundar@example.com', role: 'user', created_at: '2026-02-10' },
    { id: 'usr-02', full_name: 'Admin Coordinator', email: 'admin@visittamilnadu.org', role: 'admin', created_at: '2026-01-01' },
    { id: 'usr-03', full_name: 'Ananya Sharma', email: 'ananya@example.com', role: 'user', created_at: '2026-02-20' },
    { id: 'usr-04', full_name: 'Karthik Raja', email: 'karthik@example.com', role: 'user', created_at: '2026-02-24' }
  ])

  const toggleUserRole = (id) => {
    setUsersList(usersList.map(u => {
      if (u.id === id) {
        return { ...u, role: u.role === 'admin' ? 'user' : 'admin' }
      }
      return u
    }))
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-serif font-bold text-brand-ocean">Registered User Directory</h3>
        <p className="text-xs text-gray-500">Manage user accounts and promote platform administrators</p>
      </div>

      <div className="bg-white rounded-3xl border border-brand-sand shadow-sm overflow-hidden text-xs">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-brand-parchment font-serif font-bold border-b border-brand-sand">
              <th className="p-4">User</th>
              <th className="p-4">Email</th>
              <th className="p-4">Registered</th>
              <th className="p-4">Role</th>
              <th className="p-4 text-right">Toggle Role</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {usersList.map((usr) => (
              <tr key={usr.id} className="hover:bg-gray-50/50">
                <td className="p-4 font-bold text-brand-ocean flex items-center gap-2">
                  <div className="w-7 h-7 bg-brand-terracotta text-white rounded-full flex items-center justify-center font-bold text-xs">
                    {usr.full_name.charAt(0)}
                  </div>
                  <span>{usr.full_name}</span>
                </td>
                <td className="p-4 text-gray-600">{usr.email}</td>
                <td className="p-4 text-gray-500">{usr.created_at}</td>
                <td className="p-4">
                  <span className={`px-2.5 py-0.5 font-bold text-[10px] rounded uppercase ${
                    usr.role === 'admin' ? 'bg-brand-gold/20 text-brand-goldHover' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {usr.role}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button
                    onClick={() => toggleUserRole(usr.id)}
                    className="px-3 py-1.5 bg-brand-parchment hover:bg-brand-sand text-brand-ocean font-semibold rounded-lg"
                  >
                    Switch to {usr.role === 'admin' ? 'User' : 'Admin'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
