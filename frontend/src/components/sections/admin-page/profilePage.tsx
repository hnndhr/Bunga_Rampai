'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, User, ShieldCheck } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export default function ProfilePage() {
  // Contoh data awal — nanti bisa diganti dari Supabase / API
  const [profile, setProfile] = useState({
    name: 'Admin Bunga Rampai',
    username: 'admin123',
    role: 'Administrator',
  });

  const [newUsername, setNewUsername] = useState(profile.username);
  const [newPassword, setNewPassword] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    // Nanti di sini tambahkan fetch/update ke database
    setTimeout(() => {
      setProfile((prev) => ({ ...prev, username: newUsername }));
      setNewPassword('');
      setIsSaving(false);
      alert('Profile updated successfully!');
    }, 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md"
      >
        <Card className="bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl rounded-3xl overflow-hidden">
          <CardContent className="p-8 space-y-6 text-center text-white">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="space-y-2"
            >
              <h1 className="text-3xl font-semibold tracking-wide">
                Admin Profile
              </h1>
              <p className="text-gray-300 text-sm">Manage your account details</p>
            </motion.div>

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

              {/* Editable Fields */}
              <div className="space-y-3">
                <div className="text-left">
                  <label className="text-sm text-gray-400">Username</label>
                  <Input
                    type="text"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    className="mt-1 bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-white/30"
                    placeholder="Enter new username"
                  />
                </div>

                <div className="text-left">
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
