"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { loginDummy } from "@/lib/auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const success = loginDummy(email, password);

    if (success) {
      setMessage("Login berhasil. Mengalihkan halaman...");

      window.location.href = "/";
    } else {
      setMessage("Email atau kata sandi salah. Silakan coba lagi.");
    }
  }

  return (
    <main className="auth-page">
      <Link href="/" className="auth-back">
        ← Kembali ke beranda
      </Link>

      <section className="auth-card">
        <Link href="/" className="brand auth-brand">
          <span className="brand-mark">L</span>
          <span>
            Lontar<span className="brand-accent">Archive</span>
          </span>
        </Link>

        <div className="auth-heading">
          <h1>Selamat datang kembali</h1>
          <p>Masuk untuk melanjutkan ke LontarArchive.</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label htmlFor="email">Alamat email</label>

          <input
            id="email"
            type="email"
            placeholder="Masukkan alamat email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            required
          />

          <label htmlFor="password">Kata sandi</label>

          <input
            id="password"
            type="password"
            placeholder="Masukkan kata sandi"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
            required
          />

          <button
            className="button auth-submit login-button"
            type="submit"
          >
            Masuk
          </button>

          {message && (
            <p className="auth-message" role="status">
              {message}
            </p>
          )}
        </form>
      </section>

      <p className="auth-footer">
        © 2026 LontarArchive · Arsip proyek KP & PKL Lontarlab
      </p>
    </main>
  );
}