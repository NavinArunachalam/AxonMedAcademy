import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { D as getAssetUrl } from "./router-CXHGCxdL.mjs";
import { ap as X, v as Clock } from "../_libs/lucide-react.mjs";
function BlogDetailModal({ post, onClose }) {
  if (!post) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "fixed inset-0 z-50 flex items-center justify-center p-4",
      onClick: onClose,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-black/70 backdrop-blur-sm" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-card border border-border shadow-2xl",
            onClick: (e) => e.stopPropagation(),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: onClose,
                  className: "absolute top-4 right-4 z-10 h-8 w-8 rounded-full bg-black/40 text-white grid place-items-center hover:bg-black/60 transition-colors",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" })
                }
              ),
              post.image && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[16/9] overflow-hidden", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: getAssetUrl(post.image),
                    alt: post.title,
                    className: "h-full w-full object-cover"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-8 lg:p-10", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 flex-wrap", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold uppercase tracking-wider text-lime bg-lime/10 px-2.5 py-1 rounded-full", children: post.cat || post.category }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-foreground/55 font-mono", children: post.date }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-foreground/55 font-mono inline-flex items-center gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3 w-3" }),
                    post.read || post.readTime,
                    " read"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-5 font-display text-2xl lg:text-4xl font-bold text-plum-dark leading-tight", children: post.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 text-foreground/80 leading-relaxed text-base space-y-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: post.excerpt }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground/60 italic", children: "This is a preview of the full article. The complete content with detailed analysis, charts, and references would be displayed here in a production implementation." })
                ] })
              ] })
            ]
          }
        )
      ]
    }
  );
}
export {
  BlogDetailModal as B
};
