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
  report_link?: string;
  respondents?: number;
  infographic_link?: string;
  // NOTE: infographic_desc moved OUT of meta (we keep separate state below)
};

export default function AdminArticleCreatePage() {
  const editorRef = useRef<EditorJS | null>(null);
  const [meta, setMeta] = useState<ArticleMeta>({ title: "", slug: "" });
  const [infographicDesc, setInfographicDesc] = useState<string>(""); // <-- separate state
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

    return () => {
      isMounted = false;

      if (
        editorRef.current &&
        typeof editorRef.current.destroy === "function"
      ) {
        try {
          editorRef.current.destroy();
          editorRef.current = null;
        } catch (err: any) {
          console.error("Error destroying Editor.js instance:", err);
        }
      }
    };
  }, []);

  const handleMetaChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setMeta((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // create article meta (without infographic_desc)
  async function createArticleMeta(): Promise<boolean> {
    if (!meta.title || !meta.slug) {
      setMessage("Title and slug are required");
      console.error("VALIDATION FAILED: Title atau Slug kosong.");
      return false;
    }
    try {
      // clone meta but ensure infographic_desc is NOT included (safety)
      const metaPayload: any = { ...meta };
      if ("infographic_desc" in metaPayload) delete metaPayload.infographic_desc;

      console.log("SENDING META:", JSON.stringify(metaPayload));
      const res = await fetch("http://localhost:3001/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(metaPayload),
      });

      console.log("META RESPONSE STATUS:", res.status, res.statusText);

      if (!res.ok) {
        const txt = await res.text();
        console.error("BACKEND META ERROR:", txt);
        setMessage(`Gagal membuat artikel: ${txt}`);
        return false;
      }

      setMessage("Article meta created");
      return true;
    } catch (err: any) {
      console.error("ERROR DI DALAM createArticleMeta catch block:", err);
      setMessage(err.message || "Error");
      return false;
    }
  }

  function mapEditorBlockToMyBlock(block: any, idx: number) {
    const typeMap: Record<string, string> = {
      header: "headline",
      paragraph: "paragraph",
      list: "list",
      quote: "quote",
      embed: "embed",
      // keep mapping flexible for custom types too
      infographic_desc: "infographic_desc", // safety: if ever created internally
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
        content = block.data?.items || block.data?.style || block.data;
        break;
      case "quote":
        content = block.data?.text || block.data;
        break;
      case "embed":
        content = {
          service: block.data.service,
          source: block.data.source,
          embed: block.data.embed,
        };
        break;
      case "infographic_desc":
        // If somehow an EditorJS block has this type, prefer data.text or raw data
        content = block.data?.text ?? block.data ?? block;
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
      const metaCreated = await createArticleMeta();

      if (!metaCreated) {
        setSaving(false);
        return;
      }

      // 3. Ambil data blok dari editor
      const output = await editorRef.current?.save();

      // Build blocksPayload from editor blocks
      const editorBlocks = (output?.blocks || []).map((b: any, i: number) =>
        mapEditorBlockToMyBlock(b, i + (infographicDesc ? 1 : 0)) // shift ordering if infographicDesc will be prepended
      );

      // 4. If infographicDesc present, create a block and prepend
      let blocksPayload: any[] = editorBlocks;
      if (infographicDesc && infographicDesc.trim() !== "") {
        const infographicBlock = {
          ordering: 1,
          block_type: "infographic_desc",
          content: infographicDesc.trim(),
        };
        // reindex editor blocks ordering to start from 2
        blocksPayload = [
          infographicBlock,
          ...editorBlocks.map((b, idx) => ({ ...b, ordering: idx + 2 })),
        ];
      } else {
        // ensure ordering starts at 1 sequentially
        blocksPayload = editorBlocks.map((b, i) => ({ ...b, ordering: i + 1 }));
      }

      // If there are no blocks (including infographic), finish
      if (blocksPayload.length === 0) {
        setMessage("Artikel berhasil dibuat (tanpa konten).");
        setSaving(false);
        return;
      }

      // 5. POST blocks to backend
      const resBlocks = await fetch(
        `http://localhost:3001/articles/${encodeURIComponent(meta.slug)}/blocks`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(blocksPayload),
        }
      );

      if (!resBlocks.ok) {
        const txt = await resBlocks.text();
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
          placeholder="Judul Survei"
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
          placeholder="Link Image Header"
          className="border p-2 rounded md:col-span-2"
        />
        <input
          name="period"
          value={meta.period || ""}
          onChange={handleMetaChange}
          placeholder="Periode Survei"
          className="border p-2 rounded"
        />
        <input
          name="method"
          value={meta.method || ""}
          onChange={handleMetaChange}
          placeholder="Metode Survei"
          className="border p-2 rounded"
        />
        <select
          name="survey_type"
          value={meta.survey_type || ""}
          onChange={handleMetaChange}
          className="border p-2 rounded"
        >
          <option value="">Pilih tipe survei</option>
          <option value="kolaborasi">Kolaborasi</option>
          <option value="mandiri">Mandiri</option>
        </select>

        <input
          name="report_link"
          value={meta.report_link || ""}
          onChange={handleMetaChange}
          placeholder="Link Laporan"
          className="border p-2 rounded"
        />
        <input
          name="respondents"
          type="number"
          value={meta.respondents || ""}
          onChange={handleMetaChange}
          placeholder="Jumlah Responden"
          className="border p-2 rounded"
        />
        <input
          name="infographic_link"
          value={meta.infographic_link || ""}
          onChange={handleMetaChange}
          placeholder="Link Infografis"
          className="border p-2 rounded md:col-span-2"
        />

        {/* Separate textarea for infographic block (NOT meta) */}
        <textarea
          name="infographic_desc_block"
          value={infographicDesc}
          onChange={(e) => setInfographicDesc(e.target.value)}
          placeholder="Deskripsi singkat infografis (akan disimpan sebagai block)"
          className="border p-2 rounded md:col-span-2 h-28"
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
            setInfographicDesc("");
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
