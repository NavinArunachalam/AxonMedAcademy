import { R as React__default } from "./react.mjs";
var DefaultContext = {
  color: void 0,
  size: void 0,
  className: void 0,
  style: void 0,
  attr: void 0
};
var IconContext = React__default.createContext && /* @__PURE__ */ React__default.createContext(DefaultContext);
var _excluded = ["attr", "size", "title"];
function _objectWithoutProperties(e, t) {
  if (null == e) return {};
  var o, r, i = _objectWithoutPropertiesLoose(e, t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
  }
  return i;
}
function _objectWithoutPropertiesLoose(r, e) {
  if (null == r) return {};
  var t = {};
  for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
    if (-1 !== e.indexOf(n)) continue;
    t[n] = r[n];
  }
  return t;
}
function _extends() {
  return _extends = Object.assign ? Object.assign.bind() : function(n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends.apply(null, arguments);
}
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), true).forEach(function(r2) {
      _defineProperty(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty(e, r, t) {
  return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function Tree2Element(tree) {
  return tree && tree.map((node, i) => /* @__PURE__ */ React__default.createElement(node.tag, _objectSpread({
    key: i
  }, node.attr), Tree2Element(node.child)));
}
function GenIcon(data) {
  return (props) => /* @__PURE__ */ React__default.createElement(IconBase, _extends({
    attr: _objectSpread({}, data.attr)
  }, props), Tree2Element(data.child));
}
function IconBase(props) {
  var elem = (conf) => {
    var {
      attr,
      size,
      title
    } = props, svgProps = _objectWithoutProperties(props, _excluded);
    var computedSize = size || conf.size || "1em";
    var className;
    if (conf.className) className = conf.className;
    if (props.className) className = (className ? className + " " : "") + props.className;
    return /* @__PURE__ */ React__default.createElement("svg", _extends({
      stroke: "currentColor",
      fill: "currentColor",
      strokeWidth: "0"
    }, conf.attr, attr, svgProps, {
      className,
      style: _objectSpread(_objectSpread({
        color: props.color || conf.color
      }, conf.style), props.style),
      height: computedSize,
      width: computedSize,
      xmlns: "http://www.w3.org/2000/svg"
    }), title && /* @__PURE__ */ React__default.createElement("title", null, title), props.children);
  };
  return IconContext !== void 0 ? /* @__PURE__ */ React__default.createElement(IconContext.Consumer, null, (conf) => elem(conf)) : elem(DefaultContext);
}
function LuX(props) {
  return GenIcon({ "attr": { "viewBox": "0 0 24 24", "fill": "none", "stroke": "currentColor", "strokeWidth": "2", "strokeLinecap": "round", "strokeLinejoin": "round" }, "child": [{ "tag": "path", "attr": { "d": "M18 6 6 18" }, "child": [] }, { "tag": "path", "attr": { "d": "m6 6 12 12" }, "child": [] }] })(props);
}
function LuVideo(props) {
  return GenIcon({ "attr": { "viewBox": "0 0 24 24", "fill": "none", "stroke": "currentColor", "strokeWidth": "2", "strokeLinecap": "round", "strokeLinejoin": "round" }, "child": [{ "tag": "path", "attr": { "d": "m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5" }, "child": [] }, { "tag": "rect", "attr": { "x": "2", "y": "6", "width": "14", "height": "12", "rx": "2" }, "child": [] }] })(props);
}
function LuUsers(props) {
  return GenIcon({ "attr": { "viewBox": "0 0 24 24", "fill": "none", "stroke": "currentColor", "strokeWidth": "2", "strokeLinecap": "round", "strokeLinejoin": "round" }, "child": [{ "tag": "path", "attr": { "d": "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" }, "child": [] }, { "tag": "circle", "attr": { "cx": "9", "cy": "7", "r": "4" }, "child": [] }, { "tag": "path", "attr": { "d": "M22 21v-2a4 4 0 0 0-3-3.87" }, "child": [] }, { "tag": "path", "attr": { "d": "M16 3.13a4 4 0 0 1 0 7.75" }, "child": [] }] })(props);
}
function LuUpload(props) {
  return GenIcon({ "attr": { "viewBox": "0 0 24 24", "fill": "none", "stroke": "currentColor", "strokeWidth": "2", "strokeLinecap": "round", "strokeLinejoin": "round" }, "child": [{ "tag": "path", "attr": { "d": "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }, "child": [] }, { "tag": "polyline", "attr": { "points": "17 8 12 3 7 8" }, "child": [] }, { "tag": "line", "attr": { "x1": "12", "x2": "12", "y1": "3", "y2": "15" }, "child": [] }] })(props);
}
function LuTrash2(props) {
  return GenIcon({ "attr": { "viewBox": "0 0 24 24", "fill": "none", "stroke": "currentColor", "strokeWidth": "2", "strokeLinecap": "round", "strokeLinejoin": "round" }, "child": [{ "tag": "path", "attr": { "d": "M3 6h18" }, "child": [] }, { "tag": "path", "attr": { "d": "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" }, "child": [] }, { "tag": "path", "attr": { "d": "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" }, "child": [] }, { "tag": "line", "attr": { "x1": "10", "x2": "10", "y1": "11", "y2": "17" }, "child": [] }, { "tag": "line", "attr": { "x1": "14", "x2": "14", "y1": "11", "y2": "17" }, "child": [] }] })(props);
}
function LuSend(props) {
  return GenIcon({ "attr": { "viewBox": "0 0 24 24", "fill": "none", "stroke": "currentColor", "strokeWidth": "2", "strokeLinecap": "round", "strokeLinejoin": "round" }, "child": [{ "tag": "path", "attr": { "d": "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" }, "child": [] }, { "tag": "path", "attr": { "d": "m21.854 2.147-10.94 10.939" }, "child": [] }] })(props);
}
function LuRadio(props) {
  return GenIcon({ "attr": { "viewBox": "0 0 24 24", "fill": "none", "stroke": "currentColor", "strokeWidth": "2", "strokeLinecap": "round", "strokeLinejoin": "round" }, "child": [{ "tag": "path", "attr": { "d": "M4.9 19.1C1 15.2 1 8.8 4.9 4.9" }, "child": [] }, { "tag": "path", "attr": { "d": "M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5" }, "child": [] }, { "tag": "circle", "attr": { "cx": "12", "cy": "12", "r": "2" }, "child": [] }, { "tag": "path", "attr": { "d": "M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5" }, "child": [] }, { "tag": "path", "attr": { "d": "M19.1 4.9C23 8.8 23 15.1 19.1 19" }, "child": [] }] })(props);
}
function LuPlus(props) {
  return GenIcon({ "attr": { "viewBox": "0 0 24 24", "fill": "none", "stroke": "currentColor", "strokeWidth": "2", "strokeLinecap": "round", "strokeLinejoin": "round" }, "child": [{ "tag": "path", "attr": { "d": "M5 12h14" }, "child": [] }, { "tag": "path", "attr": { "d": "M12 5v14" }, "child": [] }] })(props);
}
function LuPlay(props) {
  return GenIcon({ "attr": { "viewBox": "0 0 24 24", "fill": "none", "stroke": "currentColor", "strokeWidth": "2", "strokeLinecap": "round", "strokeLinejoin": "round" }, "child": [{ "tag": "polygon", "attr": { "points": "6 3 20 12 6 21 6 3" }, "child": [] }] })(props);
}
function LuMegaphone(props) {
  return GenIcon({ "attr": { "viewBox": "0 0 24 24", "fill": "none", "stroke": "currentColor", "strokeWidth": "2", "strokeLinecap": "round", "strokeLinejoin": "round" }, "child": [{ "tag": "path", "attr": { "d": "m3 11 18-5v12L3 14v-3z" }, "child": [] }, { "tag": "path", "attr": { "d": "M11.6 16.8a3 3 0 1 1-5.8-1.6" }, "child": [] }] })(props);
}
function LuEye(props) {
  return GenIcon({ "attr": { "viewBox": "0 0 24 24", "fill": "none", "stroke": "currentColor", "strokeWidth": "2", "strokeLinecap": "round", "strokeLinejoin": "round" }, "child": [{ "tag": "path", "attr": { "d": "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" }, "child": [] }, { "tag": "circle", "attr": { "cx": "12", "cy": "12", "r": "3" }, "child": [] }] })(props);
}
function LuEyeOff(props) {
  return GenIcon({ "attr": { "viewBox": "0 0 24 24", "fill": "none", "stroke": "currentColor", "strokeWidth": "2", "strokeLinecap": "round", "strokeLinejoin": "round" }, "child": [{ "tag": "path", "attr": { "d": "M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" }, "child": [] }, { "tag": "path", "attr": { "d": "M14.084 14.158a3 3 0 0 1-4.242-4.242" }, "child": [] }, { "tag": "path", "attr": { "d": "M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143" }, "child": [] }, { "tag": "path", "attr": { "d": "m2 2 20 20" }, "child": [] }] })(props);
}
function LuDownload(props) {
  return GenIcon({ "attr": { "viewBox": "0 0 24 24", "fill": "none", "stroke": "currentColor", "strokeWidth": "2", "strokeLinecap": "round", "strokeLinejoin": "round" }, "child": [{ "tag": "path", "attr": { "d": "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }, "child": [] }, { "tag": "polyline", "attr": { "points": "7 10 12 15 17 10" }, "child": [] }, { "tag": "line", "attr": { "x1": "12", "x2": "12", "y1": "15", "y2": "3" }, "child": [] }] })(props);
}
function LuCopy(props) {
  return GenIcon({ "attr": { "viewBox": "0 0 24 24", "fill": "none", "stroke": "currentColor", "strokeWidth": "2", "strokeLinecap": "round", "strokeLinejoin": "round" }, "child": [{ "tag": "rect", "attr": { "width": "14", "height": "14", "x": "8", "y": "8", "rx": "2", "ry": "2" }, "child": [] }, { "tag": "path", "attr": { "d": "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" }, "child": [] }] })(props);
}
function LuClock(props) {
  return GenIcon({ "attr": { "viewBox": "0 0 24 24", "fill": "none", "stroke": "currentColor", "strokeWidth": "2", "strokeLinecap": "round", "strokeLinejoin": "round" }, "child": [{ "tag": "circle", "attr": { "cx": "12", "cy": "12", "r": "10" }, "child": [] }, { "tag": "polyline", "attr": { "points": "12 6 12 12 16 14" }, "child": [] }] })(props);
}
function LuClipboardList(props) {
  return GenIcon({ "attr": { "viewBox": "0 0 24 24", "fill": "none", "stroke": "currentColor", "strokeWidth": "2", "strokeLinecap": "round", "strokeLinejoin": "round" }, "child": [{ "tag": "rect", "attr": { "width": "8", "height": "4", "x": "8", "y": "2", "rx": "1", "ry": "1" }, "child": [] }, { "tag": "path", "attr": { "d": "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" }, "child": [] }, { "tag": "path", "attr": { "d": "M12 11h4" }, "child": [] }, { "tag": "path", "attr": { "d": "M12 16h4" }, "child": [] }, { "tag": "path", "attr": { "d": "M8 11h.01" }, "child": [] }, { "tag": "path", "attr": { "d": "M8 16h.01" }, "child": [] }] })(props);
}
function LuCircleDot(props) {
  return GenIcon({ "attr": { "viewBox": "0 0 24 24", "fill": "none", "stroke": "currentColor", "strokeWidth": "2", "strokeLinecap": "round", "strokeLinejoin": "round" }, "child": [{ "tag": "circle", "attr": { "cx": "12", "cy": "12", "r": "10" }, "child": [] }, { "tag": "circle", "attr": { "cx": "12", "cy": "12", "r": "1" }, "child": [] }] })(props);
}
function LuCheck(props) {
  return GenIcon({ "attr": { "viewBox": "0 0 24 24", "fill": "none", "stroke": "currentColor", "strokeWidth": "2", "strokeLinecap": "round", "strokeLinejoin": "round" }, "child": [{ "tag": "path", "attr": { "d": "M20 6 9 17l-5-5" }, "child": [] }] })(props);
}
function LuCalendar(props) {
  return GenIcon({ "attr": { "viewBox": "0 0 24 24", "fill": "none", "stroke": "currentColor", "strokeWidth": "2", "strokeLinecap": "round", "strokeLinejoin": "round" }, "child": [{ "tag": "path", "attr": { "d": "M8 2v4" }, "child": [] }, { "tag": "path", "attr": { "d": "M16 2v4" }, "child": [] }, { "tag": "rect", "attr": { "width": "18", "height": "18", "x": "3", "y": "4", "rx": "2" }, "child": [] }, { "tag": "path", "attr": { "d": "M3 10h18" }, "child": [] }] })(props);
}
function LuBookOpen(props) {
  return GenIcon({ "attr": { "viewBox": "0 0 24 24", "fill": "none", "stroke": "currentColor", "strokeWidth": "2", "strokeLinecap": "round", "strokeLinejoin": "round" }, "child": [{ "tag": "path", "attr": { "d": "M12 7v14" }, "child": [] }, { "tag": "path", "attr": { "d": "M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" }, "child": [] }] })(props);
}
function LuArrowLeft(props) {
  return GenIcon({ "attr": { "viewBox": "0 0 24 24", "fill": "none", "stroke": "currentColor", "strokeWidth": "2", "strokeLinecap": "round", "strokeLinejoin": "round" }, "child": [{ "tag": "path", "attr": { "d": "m12 19-7-7 7-7" }, "child": [] }, { "tag": "path", "attr": { "d": "M19 12H5" }, "child": [] }] })(props);
}
export {
  LuArrowLeft as L,
  LuBookOpen as a,
  LuCalendar as b,
  LuCheck as c,
  LuCircleDot as d,
  LuClipboardList as e,
  LuClock as f,
  LuCopy as g,
  LuDownload as h,
  LuEye as i,
  LuEyeOff as j,
  LuMegaphone as k,
  LuPlay as l,
  LuPlus as m,
  LuRadio as n,
  LuSend as o,
  LuTrash2 as p,
  LuUpload as q,
  LuUsers as r,
  LuVideo as s,
  LuX as t
};
