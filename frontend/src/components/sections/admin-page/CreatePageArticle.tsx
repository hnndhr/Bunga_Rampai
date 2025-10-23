"use client";
import React, { useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Quote from "@editorjs/quote";
import Embed from "@editorjs/embed";
import Paragraph from "@editorjs/paragraph";

type ArticleMeta = {
  title: string;
  slug: string;
  header_image?: string;
  period?: string;
  method?: string;
  survey_type?: string;
  author_username?: string;
  respondents?: Int16Array;
};

export default function AdminArticleCreatePage() {
  const editorRef = useRef<EditorJS | null>(null);
  const editorHolderRef = useRef<HTMLDivElement | null>(null);
  const [meta, setMeta] = useState<ArticleMeta>({ title: "", slug: "" });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  // initialize editor once
  React.useEffect(() => {
    let isMounted = true;

    const initializeEditor = async () => {
      if (editorRef.current) {
        return;
      }

      const editor = new EditorJS({
        holder: "editorjs",
        autofocus: true,
        tools: {
          header: Header,
          paragraph: Paragraph,
          list: List,
          quote: Quote,
          embed: Embed as any,
        },
        placeholder: "Start writing your article...",
      });

      await editor.isReady;

      if (isMounted) {
        editorRef.current = editor;
      }
    };

    initializeEditor();

    // The corrected cleanup function
    return () => {
      isMounted = false;

      if (
        editorRef.current &&
        typeof editorRef.current.destroy === "function"
      ) {
        try {
          // FIX 1: Call destroy() directly, as it does not return a promise.
          editorRef.current.destroy();
          editorRef.current = null;
        } catch (err: any) {
          // FIX 2: Explicitly type 'err' as 'any'.
          console.error("Error destroying Editor.js instance:", err);
        }
      }
    };
  }, []);

  function handleMetaChange(e: React.ChangeEvent<HTMLInputElement>) {
    setMeta((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function createArticleMeta(): Promise<boolean> {
    // basic validation
    if (!meta.title || !meta.slug) {
      setMessage("Title and slug are required");
      console.error("VALIDATION FAILED: Title atau Slug kosong."); // Log 1
      return false;
    }
    try {
      console.log("SENDING META:", JSON.stringify(meta)); // Log 2
      const res = await fetch("http://localhost:3001/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(meta),
      });

      console.log("META RESPONSE STATUS:", res.status, res.statusText); // Log 3

      if (!res.ok) {
        const txt = await res.text();
        console.error("BACKEND META ERROR:", txt); // Log 4: Ini yang paling penting!
        setMessage(`Gagal membuat artikel: ${txt}`);
        return false; // Gagal di sini
      }

      setMessage("Article meta created");
      console.log("META CREATED SUCCESSFULLY."); // Log 5
      return true; // Berhasil
    } catch (err: any) {
      console.error("ERROR DI DALAM createArticleMeta catch block:", err); // Log 6
      setMessage(err.message || "Error");
      return false;
    }
  }

  function mapEditorBlockToMyBlock(block: any, idx: number) {
    // Editor.js block types: header, paragraph (usually type "paragraph" from Paragraph tool),
    // list, quote, embed, etc.
    // We map to our block_type + content (string or object)
    const typeMap: Record<string, string> = {
      header: "headline",
      paragraph: "paragraph",
      list: "list",
      quote: "quote",
      embed: "embed",
      // add more mappings if you use other tools
    };

    const myType = typeMap[block.type] || block.type || "paragraph";

    // content conversion:
    let content: any = null;
    switch (block.type) {
      case "header":
        content = block.data.text;
        break;
      case "paragraph":
        content =
          block.data?.text || block.data?.html || JSON.stringify(block.data);
        break;
      case "list":
        // block.data.items is likely an array
        content = block.data?.items || block.data?.style || block.data;
        break;
      case "quote":
        content = block.data?.text || block.data;
        break;
      case "embed":
        // store embed data as object
        content = {
          service: block.data.service,
          source: block.data.source,
          embed: block.data.embed, // html
        };
        break;
      default:
        content = block.data || block;
    }

    return {
      ordering: idx + 1,
      block_type: myType,
      content,
    };
  }

  async function handleSave() {
    setMessage(null);
    setSaving(true);

    // 1. Validasi frontend dulu
    if (!meta.title || !meta.slug) {
      setMessage("Title dan slug wajib diisi");
      setSaving(false);
      return;
    }

    try {
      // 2. Buat artikel (metadata) terlebih dahulu
      // Fungsi createArticleMeta sudah melakukan POST ke /articles
      const metaCreated = await createArticleMeta();

      // Jika gagal membuat meta, hentikan proses
      if (!metaCreated) {
        // Pesan error sudah di-set di dalam createArticleMeta()
        setSaving(false);
        return;
      }

      // 3. Ambil data blok dari editor
      const output = await editorRef.current?.save();

      // Jika tidak ada konten, tidak perlu kirim blok. Selesai.
      if (!output || output.blocks.length === 0) {
        setMessage("Artikel berhasil dibuat (tanpa konten).");
        setSaving(false);
        return;
      }

      // 4. Format bloknya
      const blocksPayload = (output.blocks || []).map((b, i) =>
        mapEditorBlockToMyBlock(b, i)
      );

      // 5. POST blok-blok tersebut ke endpoint spesifik untuk artikel ini
      // Backend Anda harus punya route seperti: /articles/:slug/blocks
      const resBlocks = await fetch(
        `http://localhost:3001/articles/${meta.slug}/blocks`, // <-- PENTING: URL ini harus ada di backend
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(blocksPayload), // Kirim HANYA array of blocks
        }
      );

      if (!resBlocks.ok) {
        const txt = await resBlocks.text();
        // Tambahkan pesan error yang lebih jelas
        throw new Error(`Gagal menyimpan blok konten: ${txt}`);
      }

      const data = await resBlocks.json();
      setMessage(`Artikel dan ${blocksPayload.length} blok berhasil disimpan!`);
    } catch (err: any) {
      console.error(err);
      setMessage(err.message || "Terjadi error saat menyimpan");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Create Article (Admin)</h1>

      <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          name="title"
          value={meta.title}
          onChange={handleMetaChange}
          placeholder="Title"
          className="border p-2 rounded"
        />
        <input
          name="slug"
          value={meta.slug}
          onChange={handleMetaChange}
          placeholder="slug (unique, e.g. survey-kos-2025)"
          className="border p-2 rounded"
        />
        <input
          name="header_image"
          value={meta.header_image || ""}
          onChange={handleMetaChange}
          placeholder="Header image URL (optional)"
          className="border p-2 rounded md:col-span-2"
        />
        <input
          name="period"
          value={meta.period || ""}
          onChange={handleMetaChange}
          placeholder="period"
          className="border p-2 rounded"
        />
        <input
          name="method"
          value={meta.method || ""}
          onChange={handleMetaChange}
          placeholder="method"
          className="border p-2 rounded"
        />
        <input
          name="survey_type"
          value={meta.survey_type || ""}
          onChange={handleMetaChange}
          placeholder="survey_type"
          className="border p-2 rounded"
        />{" "}
        <input
          name="author_username"
          value={meta.author_username || ""}
          onChange={handleMetaChange}
          placeholder="author username"
          className="border p-2 rounded"
        />
        <input
          name="respondents"
          value={Number(meta.respondents) || ""}
          onChange={handleMetaChange}
          placeholder="respondents"
          className="border p-2 rounded"
        />
      </div>

      <div className="mb-4">
        <div
          id="editorjs"
          className="bg-white border rounded p-4 min-h-[200px]"
        ></div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {saving ? "Saving..." : "Save Article"}
        </button>
        <button
          onClick={() => {
            editorRef.current?.clear();
          }}
          className="px-4 py-2 border rounded"
        >
          Clear
        </button>
        {message && <div className="text-sm text-muted">{message}</div>}
      </div>
    </div>
  );
}
