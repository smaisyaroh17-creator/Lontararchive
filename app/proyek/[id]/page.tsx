"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/components/AuthProvider";
import Navbar from "@/components/Navbar";
import type { Project, Comment } from "@/types/detailproyek";

function getTechnologies(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.filter(
      (item): item is string => typeof item === "string"
    );
  }

  return [];
}

export default function ProjectDetail() {
  const params = useParams<{ id: string }>();
  const projectId = Number(params.id);

  const { isLoggedIn, email } = useAuth();

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    async function fetchProject() {
      if (!Number.isInteger(projectId) || projectId <= 0) {
        setError("ID proyek tidak valid.");
        setLoading(false);
        return;
      }

      const supabase = createClient();

      const { data, error } = await supabase
        .from("detailproyek")
        .select(
          "id, created_at, name, teknologi, deskripsi, url, komentar"
        )
        .eq("id", projectId)
        .maybeSingle();

      if (error) {
        setError("Gagal mengambil data proyek dari database.");
        setLoading(false);
        return;
      }

      if (!data) {
        setProject(null);
        setLoading(false);
        return;
      }

      setProject(data as Project);
      setLoading(false);
    }

    fetchProject();
  }, [projectId]);

  function handleLike() {
    if (!isLoggedIn) return;

    setLiked(!liked);
    setLikeCount((current) => liked ? current - 1 : current + 1);
  }

  function handleComment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!isLoggedIn || !commentText.trim()) return;

    const newComment: Comment = {
      id: Date.now(),
      author: email ? email.split("@")[0] : "Pengguna",
      content: commentText.trim(),
    };

    setComments((current) => [...current, newComment]);
    setCommentText("");
  }

  if (loading) {
    return (
      <main className="detail-page">
        <Navbar />
        <div className="detail-not-found">
          <p>Memuat data proyek...</p>
        </div>
      </main>
    );
  }

  if (error || !project) {
    return (
      <main className="detail-page">
        <Navbar />
        <div className="detail-not-found">
          <h1>Proyek Tidak Ditemukan</h1>
          <p>
            {error || "Maaf, proyek yang kamu cari tidak tersedia."}
          </p>
          <Link href="/" className="button">
            Kembali ke Beranda
          </Link>
        </div>
      </main>
    );
  }

  const technologies = getTechnologies(project.teknologi);
  const year = new Date(project.created_at).getFullYear();

  return (
    <main className="detail-page">
      <Navbar />

      <section className="detail-container">
        <Link href="/" className="detail-back">
          ← Kembali ke Beranda
        </Link>

        <div className="detail-heading">
          <span className="detail-category">
            Arsip Proyek
          </span>

          <h1>{project.name}</h1>

          <p>
            Dokumentasi proyek Kerja Praktik / Praktik Kerja
            Lapangan Lontarlab.
          </p>
        </div>

        <div className="detail-information">
          <div>
            <span>ID PROYEK</span>
            <strong>#{project.id}</strong>
          </div>

          <div>
            <span>TAHUN DATA</span>
            <strong>{year}</strong>
          </div>
        </div>

        <section className="detail-section">
          <h2>Deskripsi Proyek</h2>
          <p>{project.deskripsi}</p>
        </section>

        <section className="detail-section">
          <h2>Teknologi yang Digunakan</h2>

          <div className="technology-tags">
            {technologies.length > 0 ? (
              technologies.map((technology) => (
                <span className="technology-tag" key={technology}>
                  {technology}
                </span>
              ))
            ) : (
              <p className="detail-muted">
                Belum ada informasi teknologi.
              </p>
            )}
          </div>
        </section>

        <section className="detail-section">
          <h2>Dokumentasi Proyek</h2>
          <p className="detail-muted">
            Dokumentasi tampilan dan hasil pengerjaan proyek.
          </p>

          <div className="detail-gallery">
            {project.url ? (
              <div className="detail-image">
                <img
                  src={project.url}
                  alt={`Dokumentasi ${project.name}`}
                  className="detail-image-placeholder"
                  style={{
                    width: "100%",
                    height: "auto",
                    objectFit: "contain",
                  }}
                />
                <p>Dokumentasi proyek</p>
              </div>
            ) : (
              <p className="detail-muted">
                Belum ada gambar dokumentasi.
              </p>
            )}
          </div>
        </section>

        <section className="detail-section">
          <h2>Interaksi Proyek</h2>

          <div className="project-interactions">
            <button
              type="button"
              className={`interaction-button ${liked ? "liked" : ""}`}
              onClick={handleLike}
              disabled={!isLoggedIn}
              title={!isLoggedIn ? "Masuk untuk menyukai proyek" : "Sukai proyek"}
            >
              {liked ? "♥" : "♡"} {likeCount} Suka
            </button>

            <div className="rating-box">
              <span>Rating kamu:</span>

              <div className="rating-stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    disabled={!isLoggedIn}
                    className={star <= rating ? "star-active" : ""}
                    onClick={() => setRating(star)}
                    aria-label={`Beri rating ${star}`}
                  >
                    ★
                  </button>
                ))}
              </div>

              <span>
                {rating > 0 ? `${rating}/5` : "Belum memberi rating"}
              </span>
            </div>
          </div>

          {!isLoggedIn && (
            <div className="comment-notice">
              Masuk untuk memberikan like, rating, dan komentar pada proyek.
              <Link href="/masuk"> Masuk di sini.</Link>
            </div>
          )}
        </section>

        <section className="detail-section comment-section">
          <h2>Komentar ({comments.length})</h2>

          {comments.length > 0 ? (
            <div className="comment-list">
              {comments.map((comment) => (
                <article className="comment-item" key={comment.id}>
                  <strong>{comment.author}</strong>
                  <p>{comment.content}</p>
                </article>
              ))}
            </div>
          ) : (
            <p className="detail-muted">
              Belum ada komentar pada proyek ini.
            </p>
          )}

          {isLoggedIn ? (
            <form className="comment-form" onSubmit={handleComment}>
              <label htmlFor="project-comment">
                Tulis komentar
              </label>

              <textarea
                id="project-comment"
                rows={4}
                placeholder="Bagikan pendapat atau pertanyaanmu tentang proyek ini..."
                value={commentText}
                onChange={(event) => setCommentText(event.target.value)}
                required
              />

              <button type="submit" className="button">
                Kirim Komentar
              </button>
            </form>
          ) : (
            <p className="detail-muted">
              Kamu harus masuk untuk menulis komentar.
            </p>
          )}
        </section>
      </section>

      <footer className="footer">
        <Link className="brand footer-brand" href="/">
          <span className="brand-mark">L</span>
          <span>
            Lontar<span className="brand-accent">Archive</span>
          </span>
        </Link>

        <p>Arsip proyek KP & PKL di Lontarlab.</p>
        <span>© 2026 LontarArchive</span>
      </footer>
    </main>
  );
}