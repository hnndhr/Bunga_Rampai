'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, User, ShieldCheck } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { jwtDecode } from 'jwt-decode';
import { supabase } from '@/lib/supabaseClient';

// ✅ Tipe token yang disimpan di localStorage (misalnya hasil login)
interface DecodedToken {
  id: string; // sesuai payload JWT kamu
}

// ✅ Struktur data admin dari tabel Supabase
interface AdminProfile {
  name: string;
  username: string;
  role: string;
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<AdminProfile | null>(null);
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // 🔹 Ambil data admin berdasarkan id dari token
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('Token not found');
          return;
        }

        // Decode token dan ambil id
        const decoded = jwtDecode<DecodedToken>(token);
        const { id } = decoded;

        // 🔹 Query berdasarkan kolom "id", bukan "id"
        const { data, error } = await supabase
          .from('admins')
          .select('name, username, role')
          .eq('id', id)
          .maybeSingle();

        if (error) throw error;

        if (data) {
          setProfile(data);
          setNewUsername(data.username);
        } else {
          console.error('No profile data returned');
        }
      } catch (err) {
        console.error('Error fetching profile:', err);
      }
    };

    fetchProfile();
  }, []);

  // 🔹 Update username & password
  const handleSave = async () => {
    if (!profile) return;
    setIsSaving(true);

    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const decoded = jwtDecode<DecodedToken>(token);
      const { id } = decoded;

      const { error } = await supabase
        .from('admins')
        .update({
          username: newUsername,
          ...(newPassword && { password: newPassword }),
        })
        .eq('id', id);

      if (error) throw error;

      setProfile((prev) =>
        prev ? { ...prev, username: newUsername } : prev
      );
      setNewPassword('');
      alert('Profile updated successfully!');
    } catch (err) {
      console.error('Error updating profile:', err);
    } finally {
      setIsSaving(false);
    }
  };

  // 🔹 Loading state
  if (!profile) {
    return (
      <div className="h-screen flex items-center justify-center text-white">
        Loading profile...
      </div>
    );
  }

  // 🔹 UI
  return (
    <div className="h-screen flex items-center justify-center overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md"
      >
        <Card className="bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl rounded-3xl overflow-hidden">
          <CardContent className="p-8 space-y-6 text-center text-white">
            <h1 className="text-3xl font-semibold tracking-wide">
              Admin Profile
            </h1>
            <p className="text-gray-300 text-sm">
              Manage your account details
            </p>

            {/* Profile Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 bg-white/10 px-4 py-3 rounded-xl border border-white/10">
                <User size={20} className="text-white/70" />
                <div className="text-left">
                  <p className="text-xs text-gray-400">Name</p>
                  <p className="font-medium">{profile.name}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white/10 px-4 py-3 rounded-xl border border-white/10">
                <ShieldCheck size={20} className="text-white/70" />
                <div className="text-left">
                  <p className="text-xs text-gray-400">Role</p>
                  <p className="font-medium">{profile.role}</p>
                </div>
              </div>

              {/* Update Inputs */}
              <div className="text-left space-y-3">
                <div>
                  <label className="text-sm text-gray-400">Username</label>
                  <Input
                    type="text"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    className="mt-1 bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-white/30"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-400">New Password</label>
                  <div className="relative">
                    <Lock
                      size={16}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <Input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="pl-9 mt-1 bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-white/30"
                      placeholder="Enter new password"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Save Button */}
            <motion.div whileTap={{ scale: 0.97 }}>
              <Button
                onClick={handleSave}
                disabled={isSaving}
                className="w-full bg-white/20 hover:bg-white/30 text-white border border-white/30 rounded-full mt-4 backdrop-blur-lg transition-all"
              >
                {isSaving ? 'Saving...' : 'Save Changes'}
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
