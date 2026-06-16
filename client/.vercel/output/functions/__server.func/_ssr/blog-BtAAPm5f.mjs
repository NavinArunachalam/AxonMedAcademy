import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { P as PublicLayout } from "./Layout-dYQ0o33O.mjs";
import { f as api } from "./router-D7_rFoRj.mjs";
import { e as ArrowUpRight, v as Clock } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
function Blog() {
  const [posts, setPosts] = reactExports.useState([]);
  reactExports.useEffect(() => {
    const loadBlogs = async () => {
      try {
        const res = await api.get("/public/blogs");
        if (res.success && res.blogs) {
          setPosts(res.blogs);
        }
      } catch (err) {
        console.error("Error fetching blogs:", err);
      }
    };
    loadBlogs();
  }, []);
  const hero = posts.find((p) => p.featured) || posts[0] || null;
  const rest = hero ? posts.filter((p) => p !== hero) : [];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PublicLayout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-20 lg:py-28", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-5 lg:px-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-mono uppercase tracking-[0.2em] text-plum", children: "— Journal" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "mt-3 max-w-3xl font-display text-4xl lg:text-7xl font-bold text-plum-dark tracking-[-0.03em] leading-[1.02]", children: [
      "Notes from the",
      /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-plum", children: "clinical floor." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "mt-14 group grid lg:grid-cols-2 gap-8 rounded-3xl border border-border bg-card overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[16/10] lg:aspect-auto bg-gradient-to-br from-plum to-plum-dark overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-noise opacity-30" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "absolute top-4 left-4 rounded-full bg-lime px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-plum-dark", children: [
          "Featured · ",
          hero.cat || hero.category
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-8 lg:p-10 flex flex-col justify-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-foreground/55 font-mono", children: [
          hero.date,
          " · ",
          hero.read || hero.readTime,
          " read"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-3 font-display text-2xl lg:text-4xl font-bold text-plum-dark leading-tight", children: hero.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-foreground/70 leading-relaxed", children: hero.excerpt }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/blog", className: "mt-6 inline-flex items-center gap-2 text-sm font-semibold text-plum-dark w-fit", children: [
          "Read article ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "h-4 w-4" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3", children: rest.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "group rounded-3xl border border-border bg-card overflow-hidden hover:-translate-y-1 transition-all", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[16/10] bg-gradient-to-br from-plum-dark to-plum overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-noise opacity-30" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute top-4 left-4 rounded-full bg-cream/95 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-plum-dark", children: p.cat || p.category })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-foreground/55 font-mono flex items-center gap-2", children: [
          p.date,
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "·" }),
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3 w-3" }),
            p.read || p.readTime,
            " read"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-3 font-display font-semibold text-plum-dark leading-snug", children: p.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-foreground/70 line-clamp-2", children: p.excerpt })
      ] })
    ] }, p.title)) })
  ] }) }) });
}
export {
  Blog as component
};
