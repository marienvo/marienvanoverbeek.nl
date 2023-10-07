/* ---------------------------------------------------------------------- */
/*    Touch Swipe plugin
/* ---------------------------------------------------------------------- */

(function (d) {
  var l = "left",
    k = "right",
    c = "up",
    r = "down",
    b = "in",
    s = "out",
    i = "none",
    o = "auto",
    u = "horizontal",
    p = "vertical",
    f = "all",
    e = "start",
    h = "move",
    g = "end",
    m = "cancel",
    a = "ontouchstart" in window,
    t = "TouchSwipe";
  var j = {
    fingers: 1,
    threshold: 75,
    maxTimeThreshold: null,
    swipe: null,
    swipeLeft: null,
    swipeRight: null,
    swipeUp: null,
    swipeDown: null,
    swipeStatus: null,
    pinchIn: null,
    pinchOut: null,
    pinchStatus: null,
    click: null,
    triggerOnTouchEnd: true,
    allowPageScroll: "auto",
    fallbackToMouseEvents: true,
    excludedElements: "button, input, select, textarea, a, .noSwipe",
  };
  d.fn.swipe = function (x) {
    var w = d(this),
      v = w.data(t);
    if (v && typeof x === "string") {
      if (v[x]) {
        return v[x].apply(this, Array.prototype.slice.call(arguments, 1));
      } else {
        d.error("Method " + x + " does not exist on jQuery.swipe");
      }
    } else {
      if (!v && (typeof x === "object" || !x)) {
        return q.apply(this, arguments);
      }
    }
    return w;
  };
  d.fn.swipe.defaults = j;
  d.fn.swipe.phases = {
    PHASE_START: e,
    PHASE_MOVE: h,
    PHASE_END: g,
    PHASE_CANCEL: m,
  };
  d.fn.swipe.directions = { LEFT: l, RIGHT: k, UP: c, DOWN: r, IN: b, OUT: s };
  d.fn.swipe.pageScroll = { NONE: i, HORIZONTAL: u, VERTICAL: p, AUTO: o };
  d.fn.swipe.fingers = { ONE: 1, TWO: 2, THREE: 3, ALL: f };
  function q(v) {
    if (
      v &&
      v.allowPageScroll === undefined &&
      (v.swipe !== undefined || v.swipeStatus !== undefined)
    ) {
      v.allowPageScroll = i;
    }
    if (!v) {
      v = {};
    }
    v = d.extend({}, d.fn.swipe.defaults, v);
    return this.each(function () {
      var x = d(this);
      var w = x.data(t);
      if (!w) {
        w = new n(this, v);
        x.data(t, w);
      }
    });
  }
  function n(J, R) {
    var aj = a || !R.fallbackToMouseEvents,
      ae = aj ? "touchstart" : "mousedown",
      K = aj ? "touchmove" : "mousemove",
      ac = aj ? "touchend" : "mouseup",
      I = "touchcancel";
    var P = 0;
    var E = null;
    var S = 0;
    var af = 0;
    var w = 0;
    var U = 1;
    var ak = 0;
    var A = d(J);
    var F = "start";
    var ai = 0;
    var T = null;
    var B = 0;
    var M = 0;
    try {
      A.bind(ae, aa);
      A.bind(I, D);
    } catch (ag) {
      d.error("events not supported " + ae + "," + I + " on jQuery.swipe");
    }
    this.enable = function () {
      A.bind(ae, aa);
      A.bind(I, D);
      return A;
    };
    this.disable = function () {
      H();
      return A;
    };
    this.destroy = function () {
      H();
      A.data(t, null);
      return A;
    };
    function aa(ao) {
      if (L()) {
        return;
      }
      if (d(ao.target).closest(R.excludedElements, A).length > 0) {
        return;
      }
      ao = ao.originalEvent;
      var an,
        am = a ? ao.touches[0] : ao;
      F = e;
      if (a) {
        ai = ao.touches.length;
      } else {
        ao.preventDefault();
      }
      P = 0;
      E = null;
      ak = null;
      S = 0;
      af = 0;
      w = 0;
      U = 1;
      T = al();
      if (!a || ai === R.fingers || R.fingers === f || W()) {
        T[0].start.x = T[0].end.x = am.pageX;
        T[0].start.y = T[0].end.y = am.pageY;
        B = x();
        if (ai == 2) {
          T[1].start.x = T[1].end.x = ao.touches[1].pageX;
          T[1].start.y = T[1].end.y = ao.touches[1].pageY;
          af = w = N(T[0].start, T[1].start);
        }
        if (R.swipeStatus || R.pinchStatus) {
          an = ah(ao, F);
        }
      } else {
        D(ao);
        an = false;
      }
      if (an === false) {
        F = m;
        ah(ao, F);
        return an;
      } else {
        V(true);
        A.bind(K, G);
        A.bind(ac, O);
      }
    }
    function G(ap) {
      ap = ap.originalEvent;
      if (F === g || F === m) {
        return;
      }
      var an,
        am = a ? ap.touches[0] : ap;
      T[0].end.x = a ? ap.touches[0].pageX : am.pageX;
      T[0].end.y = a ? ap.touches[0].pageY : am.pageY;
      M = x();
      E = Z(T[0].start, T[0].end);
      if (a) {
        ai = ap.touches.length;
      }
      F = h;
      if (ai == 2) {
        if (af == 0) {
          T[1].start.x = ap.touches[1].pageX;
          T[1].start.y = ap.touches[1].pageY;
          af = w = N(T[0].start, T[1].start);
        } else {
          T[1].end.x = ap.touches[1].pageX;
          T[1].end.y = ap.touches[1].pageY;
          w = N(T[0].end, T[1].end);
          ak = X(T[0].end, T[1].end);
        }
        U = v(af, w);
      }
      if (ai === R.fingers || R.fingers === f || !a) {
        y(ap, E);
        P = z(T[0].start, T[0].end);
        S = C(T[0].start, T[0].end);
        if (R.swipeStatus || R.pinchStatus) {
          an = ah(ap, F);
        }
        if (!R.triggerOnTouchEnd) {
          var ao = !Y();
          if (Q() === true) {
            F = g;
            an = ah(ap, F);
          } else {
            if (ao) {
              F = m;
              ah(ap, F);
            }
          }
        }
      } else {
        F = m;
        ah(ap, F);
      }
      if (an === false) {
        F = m;
        ah(ap, F);
      }
    }
    function O(at) {
      at = at.originalEvent;
      if (at.touches && at.touches.length > 0) {
        return true;
      }
      at.preventDefault();
      M = x();
      if (af != 0) {
        w = N(T[0].end, T[1].end);
        U = v(af, w);
        ak = X(T[0].end, T[1].end);
      }
      P = z(T[0].start, T[0].end);
      E = Z(T[0].start, T[0].end);
      S = C();
      if (R.triggerOnTouchEnd || (R.triggerOnTouchEnd === false && F === h)) {
        F = g;
        var ap = ad() || !W();
        var an = ai === R.fingers || R.fingers === f || !a;
        var am = T[0].end.x !== 0;
        var ao = an && am && ap;
        if (ao) {
          var aq = Y();
          var ar = Q();
          if ((ar === true || ar === null) && aq) {
            ah(at, F);
          } else {
            if (!aq || ar === false) {
              F = m;
              ah(at, F);
            }
          }
        } else {
          F = m;
          ah(at, F);
        }
      } else {
        if (F === h) {
          F = m;
          ah(at, F);
        }
      }
      A.unbind(K, G, false);
      A.unbind(ac, O, false);
      V(false);
    }
    function D() {
      ai = 0;
      M = 0;
      B = 0;
      af = 0;
      w = 0;
      U = 1;
      V(false);
    }
    function ah(ao, am) {
      var an = undefined;
      if (R.swipeStatus) {
        an = R.swipeStatus.call(A, ao, am, E || null, P || 0, S || 0, ai);
      }
      if (R.pinchStatus && ad()) {
        an = R.pinchStatus.call(A, ao, am, ak || null, w || 0, S || 0, ai, U);
      }
      if (am === m) {
        if (R.click && (ai === 1 || !a) && (isNaN(P) || P === 0)) {
          an = R.click.call(A, ao, ao.target);
        }
      }
      if (am == g) {
        if (R.swipe) {
          an = R.swipe.call(A, ao, E, P, S, ai);
        }
        switch (E) {
          case l:
            if (R.swipeLeft) {
              an = R.swipeLeft.call(A, ao, E, P, S, ai);
            }
            break;
          case k:
            if (R.swipeRight) {
              an = R.swipeRight.call(A, ao, E, P, S, ai);
            }
            break;
          case c:
            if (R.swipeUp) {
              an = R.swipeUp.call(A, ao, E, P, S, ai);
            }
            break;
          case r:
            if (R.swipeDown) {
              an = R.swipeDown.call(A, ao, E, P, S, ai);
            }
            break;
        }
        switch (ak) {
          case b:
            if (R.pinchIn) {
              an = R.pinchIn.call(A, ao, ak || null, w || 0, S || 0, ai, U);
            }
            break;
          case s:
            if (R.pinchOut) {
              an = R.pinchOut.call(A, ao, ak || null, w || 0, S || 0, ai, U);
            }
            break;
        }
      }
      if (am === m || am === g) {
        D(ao);
      }
      return an;
    }
    function Q() {
      if (R.threshold !== null) {
        return P >= R.threshold;
      }
      return null;
    }
    function Y() {
      var am;
      if (R.maxTimeThreshold) {
        if (S >= R.maxTimeThreshold) {
          am = false;
        } else {
          am = true;
        }
      } else {
        am = true;
      }
      return am;
    }
    function y(am, an) {
      if (R.allowPageScroll === i || W()) {
        am.preventDefault();
      } else {
        var ao = R.allowPageScroll === o;
        switch (an) {
          case l:
            if ((R.swipeLeft && ao) || (!ao && R.allowPageScroll != u)) {
              am.preventDefault();
            }
            break;
          case k:
            if ((R.swipeRight && ao) || (!ao && R.allowPageScroll != u)) {
              am.preventDefault();
            }
            break;
          case c:
            if ((R.swipeUp && ao) || (!ao && R.allowPageScroll != p)) {
              am.preventDefault();
            }
            break;
          case r:
            if ((R.swipeDown && ao) || (!ao && R.allowPageScroll != p)) {
              am.preventDefault();
            }
            break;
        }
      }
    }
    function C() {
      return M - B;
    }
    function N(ap, ao) {
      var an = Math.abs(ap.x - ao.x);
      var am = Math.abs(ap.y - ao.y);
      return Math.round(Math.sqrt(an * an + am * am));
    }
    function v(am, an) {
      var ao = (an / am) * 1;
      return ao.toFixed(2);
    }
    function X() {
      if (U < 1) {
        return s;
      } else {
        return b;
      }
    }
    function z(an, am) {
      return Math.round(
        Math.sqrt(Math.pow(am.x - an.x, 2) + Math.pow(am.y - an.y, 2)),
      );
    }
    function ab(ap, an) {
      var am = ap.x - an.x;
      var ar = an.y - ap.y;
      var ao = Math.atan2(ar, am);
      var aq = Math.round((ao * 180) / Math.PI);
      if (aq < 0) {
        aq = 360 - Math.abs(aq);
      }
      return aq;
    }
    function Z(an, am) {
      var ao = ab(an, am);
      if (ao <= 45 && ao >= 0) {
        return l;
      } else {
        if (ao <= 360 && ao >= 315) {
          return l;
        } else {
          if (ao >= 135 && ao <= 225) {
            return k;
          } else {
            if (ao > 45 && ao < 135) {
              return r;
            } else {
              return c;
            }
          }
        }
      }
    }
    function x() {
      var am = new Date();
      return am.getTime();
    }
    function H() {
      A.unbind(ae, aa);
      A.unbind(I, D);
      A.unbind(K, G);
      A.unbind(ac, O);
      V(false);
    }
    function W() {
      return R.pinchStatus || R.pinchIn || R.pinchOut;
    }
    function ad() {
      return ak && W();
    }
    function L() {
      return A.data(t + "_intouch") === true ? true : false;
    }
    function V(am) {
      am = am === true ? true : false;
      A.data(t + "_intouch", am);
    }
    function al() {
      var am = [];
      for (var an = 0; an <= 5; an++) {
        am.push({
          start: { x: 0, y: 0 },
          end: { x: 0, y: 0 },
          delta: { x: 0, y: 0 },
        });
      }
      return am;
    }
  }
})(jQuery);

/* ---------------------------------------------------------------------- */
/*    Adipoli jQuery Image Hover Plugin
/* ---------------------------------------------------------------------- */

/*
 * Adipoli jQuery Image Hover Plugin
 * http://jobyj.in/adipoli
 *
 * Copyright 2012, Joby Joseph
 * Free to use under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 */
(function (a) {
  a.fn.adipoli = function (b) {
    function g(a) {
      var b = document.createElement("canvas");
      var c = b.getContext("2d");
      var d = new Image();
      d.src = a;
      b.width = d.width;
      b.height = d.height;
      c.drawImage(d, 0, 0);
      var e = c.getImageData(0, 0, b.width, b.height);
      for (var f = 0; f < e.height; f++) {
        for (var g = 0; g < e.width; g++) {
          var h = f * 4 * e.width + g * 4;
          var i = (e.data[h] + e.data[h + 1] + e.data[h + 2]) / 3;
          e.data[h] = i;
          e.data[h + 1] = i;
          e.data[h + 2] = i;
        }
      }
      c.putImageData(e, 0, 0, 0, 0, e.width, e.height);
      return b.toDataURL();
    }
    function f(a) {
      for (
        var b, c, d = a.length;
        d;
        b = parseInt(Math.random() * d), c = a[--d], a[d] = a[b], a[b] = c
      );
      return a;
    }
    function e(b, c) {
      var d = Math.round(b.width() / c.boxCols);
      var e = Math.round(b.height() / c.boxRows);
      for (var f = 0; f < c.boxRows; f++) {
        for (var g = 0; g < c.boxCols; g++) {
          if (g == c.boxCols - 1) {
            b.children(".adipoli-after").append(
              a('<div class="adipoli-box"></div>').css({
                opacity: 0,
                left: d * g + "px",
                top: e * f + "px",
                width: b.width() - d * g + "px",
                height: e + "px",
                background:
                  'url("' +
                  b.children("img").attr("src") +
                  '") no-repeat -' +
                  (d + g * d - d) +
                  "px -" +
                  (e + f * e - e) +
                  "px",
              }),
            );
          } else {
            b.children(".adipoli-after").append(
              a('<div class="adipoli-box"></div>').css({
                opacity: 0,
                left: d * g + "px",
                top: e * f + "px",
                width: d + "px",
                height: e + "px",
                background:
                  'url("' +
                  b.children("img").attr("src") +
                  '") no-repeat -' +
                  (d + g * d - d) +
                  "px -" +
                  (e + f * e - e) +
                  "px",
              }),
            );
          }
        }
      }
    }
    function d(b, c) {
      for (var d = 0; d < c.slices; d++) {
        var e = Math.round(b.width() / c.slices);
        if (d == c.slices - 1) {
          b.children(".adipoli-after").append(
            a('<div class="adipoli-slice"></div>').css({
              left: e * d + "px",
              width: b.width() - e * d + "px",
              height: "0px",
              opacity: "0",
              background:
                'url("' +
                b.children("img").attr("src") +
                '") no-repeat -' +
                (e + d * e - e) +
                "px 0%",
            }),
          );
        } else {
          b.children(".adipoli-after").append(
            a('<div class="adipoli-slice"></div>').css({
              left: e * d + "px",
              width: e + "px",
              height: "0px",
              opacity: "0",
              background:
                'url("' +
                b.children("img").attr("src") +
                '") no-repeat -' +
                (e + d * e - e) +
                "px 0%",
            }),
          );
        }
      }
    }
    var c = a.extend(
      {
        startEffect: "transparent",
        hoverEffect: "normal",
        imageOpacity: 0.5,
        animSpeed: 300,
        fillColor: "#000",
        textColor: "#fff",
        overlayText: "",
        slices: 10,
        boxCols: 5,
        boxRows: 3,
        popOutMargin: 10,
        popOutShadow: 10,
      },
      b,
    );
    a(this)
      .one("load", function () {
        a(this).wrap(function () {
          return (
            '<div class="adipoli-wrapper ' +
            a(this).attr("class") +
            '" style="width:' +
            a(this).width() +
            "px; height:" +
            a(this).height() +
            'px;"/>'
          );
        });
        a(this)
          .parent()
          .append(
            '<div class="adipoli-before ' +
              a(this).attr("class") +
              '" style="display:none;width:' +
              a(this).width() +
              "px; height:" +
              a(this).height() +
              'px;"><img src="' +
              a(this).attr("src") +
              '"/></div>',
          );
        a(this)
          .parent()
          .append(
            '<div class="adipoli-after ' +
              a(this).attr("class") +
              '" style="display:none;width:' +
              a(this).width() +
              "px; height:" +
              a(this).height() +
              'px;"></div>',
          );
        if (c.startEffect == "transparent") {
          a(this).hide();
          a(this)
            .siblings(".adipoli-before")
            .css({
              "-ms-filter":
                '"progid:DXImageTransform.Microsoft.Alpha(Opacity=' +
                c.imageOpacity * 100 +
                ')"',
              filter: "alpha(opacity=" + c.imageOpacity * 100 + ")",
              "-moz-opacity": c.imageOpacity,
              "-khtml-opacity": c.imageOpacity,
              opacity: c.imageOpacity,
            })
            .show();
        } else if (c.startEffect == "grayscale") {
          var b = a(this);
          b.hide();
          b.siblings(".adipoli-before").show();
          b.siblings(".adipoli-before")
            .children("img")
            .each(function () {
              this.src = g(this.src);
            });
        } else if (c.startEffect == "normal") {
          a(this).hide();
          a(this).siblings(".adipoli-before").show();
        } else if (c.startEffect == "overlay") {
          b = a(this);
          b.hide();
          a(this)
            .siblings(".adipoli-before")
            .html(c.overlayText)
            .css({
              "-ms-filter":
                '"progid:DXImageTransform.Microsoft.Alpha(Opacity=' +
                c.imageOpacity * 100 +
                ')"',
              filter: "alpha(opacity=" + c.imageOpacity * 100 + ")",
              "-moz-opacity": c.imageOpacity,
              "-khtml-opacity": c.imageOpacity,
              opacity: c.imageOpacity,
              background: c.fillColor,
              color: c.textColor,
            })
            .fadeIn();
          b.show();
        }
        a(this)
          .parent()
          .bind("mouseenter", function () {
            if (c.hoverEffect == "normal") {
              var b = a(this);
              b.children(".adipoli-after")
                .html('<img src="' + b.children("img").attr("src") + '"/>')
                .fadeIn(c.animSpeed);
            } else if (c.hoverEffect == "popout") {
              b = a(this);
              var g = b.children("img").width();
              var h = b.children("img").height();
              b.children(".adipoli-after").html(
                '<img src="' + b.children("img").attr("src") + '"/>',
              );
              var i = b.children(".adipoli-after").children("img");
              i.width(g + 2 * c.popOutMargin);
              i.height(h + 2 * c.popOutMargin);
              b.children(".adipoli-after").width(g + 2 * c.popOutMargin);
              b.children(".adipoli-after").height(h + 2 * c.popOutMargin);
              b.children(".adipoli-after")
                .css({
                  left: "-" + c.popOutMargin + "px",
                  top: "-" + c.popOutMargin + "px",
                  "box-shadow": "0px 0px " + c.popOutShadow + "px #000",
                })
                .show();
            } else if (
              c.hoverEffect == "sliceDown" ||
              c.hoverEffect == "sliceDownLeft" ||
              c.hoverEffect == "sliceUp" ||
              c.hoverEffect == "sliceUpLeft" ||
              c.hoverEffect == "sliceUpRandom" ||
              c.hoverEffect == "sliceDownRandom"
            ) {
              a(this).children(".adipoli-after").show();
              d(a(this), c);
              var j = 0;
              var k = 0;
              var l = a(".adipoli-slice", a(this));
              if (
                c.hoverEffect == "sliceDownLeft" ||
                c.hoverEffect == "sliceUpLeft"
              )
                l = a(".adipoli-slice", a(this))._reverse();
              if (
                c.hoverEffect == "sliceUpRandom" ||
                c.hoverEffect == "sliceDownRandom"
              )
                l = f(a(".adipoli-slice", a(this)));
              l.each(function () {
                var b = a(this);
                if (
                  c.hoverEffect == "sliceDown" ||
                  c.hoverEffect == "sliceDownLeft"
                ) {
                  b.css({ top: "0px" });
                } else if (
                  c.hoverEffect == "sliceUp" ||
                  c.hoverEffect == "sliceUpLeft"
                ) {
                  b.css({ bottom: "0px" });
                }
                if (k == c.slices - 1) {
                  setTimeout(function () {
                    b.animate(
                      { height: "100%", opacity: "1.0" },
                      c.animSpeed,
                      "",
                      function () {},
                    );
                  }, 100 + j);
                } else {
                  setTimeout(function () {
                    b.animate({ height: "100%", opacity: "1.0" }, c.animSpeed);
                  }, 100 + j);
                }
                j += 50;
                k++;
              });
            } else if (
              c.hoverEffect == "sliceUpDown" ||
              c.hoverEffect == "sliceUpDownLeft"
            ) {
              a(this).children(".adipoli-after").show();
              d(a(this), c);
              j = 0;
              k = 0;
              var m = 0;
              l = a(".adipoli-slice", a(this));
              if (c.hoverEffect == "sliceUpDownLeft")
                l = a(".adipoli-slice", a(this))._reverse();
              l.each(function () {
                var b = a(this);
                if (k == 0) {
                  b.css("top", "0px");
                  k++;
                } else {
                  b.css("bottom", "0px");
                  k = 0;
                }
                if (m == c.slices - 1) {
                  setTimeout(function () {
                    b.animate(
                      { height: "100%", opacity: "1.0" },
                      c.animSpeed,
                      "",
                      function () {},
                    );
                  }, 100 + j);
                } else {
                  setTimeout(function () {
                    b.animate({ height: "100%", opacity: "1.0" }, c.animSpeed);
                  }, 100 + j);
                }
                j += 50;
                m++;
              });
            } else if (c.hoverEffect == "fold" || c.hoverEffect == "foldLeft") {
              a(this).children(".adipoli-after").show();
              b = a(this);
              d(b, c);
              j = 0;
              k = 0;
              l = a(".adipoli-slice", b);
              if (c.hoverEffect == "foldLeft")
                l = a(".adipoli-slice", a(this))._reverse();
              l.each(function () {
                var b = a(this);
                var d = b.width();
                b.css({ top: "0px", height: "100%", width: "0px" });
                if (k == c.slices - 1) {
                  setTimeout(function () {
                    b.animate(
                      { width: d, opacity: "1.0" },
                      c.animSpeed,
                      "",
                      function () {},
                    );
                  }, 100 + j);
                } else {
                  setTimeout(function () {
                    b.animate({ width: d, opacity: "1.0" }, c.animSpeed);
                  }, 100 + j);
                }
                j += 50;
                k++;
              });
            } else if (c.hoverEffect == "boxRandom") {
              a(this).children(".adipoli-after").show();
              b = a(this);
              e(b, c);
              var n = c.boxCols * c.boxRows;
              k = 0;
              j = 0;
              var o = f(a(".adipoli-box", b));
              o.each(function () {
                var b = a(this);
                if (k == n - 1) {
                  setTimeout(function () {
                    b.animate(
                      { opacity: "1" },
                      c.animSpeed,
                      "",
                      function () {},
                    );
                  }, 100 + j);
                } else {
                  setTimeout(function () {
                    b.animate({ opacity: "1" }, c.animSpeed);
                  }, 100 + j);
                }
                j += 20;
                k++;
              });
            } else if (
              c.hoverEffect == "boxRain" ||
              c.hoverEffect == "boxRainReverse" ||
              c.hoverEffect == "boxRainGrow" ||
              c.hoverEffect == "boxRainGrowReverse"
            ) {
              a(this).children(".adipoli-after").show();
              b = a(this);
              e(b, c);
              n = c.boxCols * c.boxRows;
              k = 0;
              j = 0;
              var p = 0;
              var q = 0;
              var r = new Array();
              r[p] = new Array();
              o = a(".adipoli-box", b);
              if (
                c.hoverEffect == "boxRainReverse" ||
                c.hoverEffect == "boxRainGrowReverse"
              ) {
                o = a(".adipoli-box", b)._reverse();
              }
              o.each(function () {
                r[p][q] = a(this);
                q++;
                if (q == c.boxCols) {
                  p++;
                  q = 0;
                  r[p] = new Array();
                }
              });
              for (var s = 0; s < c.boxCols * 2; s++) {
                var t = s;
                for (var u = 0; u < c.boxRows; u++) {
                  if (t >= 0 && t < c.boxCols) {
                    (function (b, d, e, f, g) {
                      var h = a(r[b][d]);
                      var i = h.width();
                      var j = h.height();
                      if (
                        c.hoverEffect == "boxRainGrow" ||
                        c.hoverEffect == "boxRainGrowReverse"
                      ) {
                        h.width(0).height(0);
                      }
                      if (f == g - 1) {
                        setTimeout(function () {
                          h.animate(
                            { opacity: "1", width: i, height: j },
                            c.animSpeed / 1.3,
                            "",
                            function () {},
                          );
                        }, 100 + e);
                      } else {
                        setTimeout(function () {
                          h.animate(
                            { opacity: "1", width: i, height: j },
                            c.animSpeed / 1.3,
                          );
                        }, 100 + e);
                      }
                    })(u, t, j, k, n);
                    k++;
                  }
                  t--;
                }
                j += 100;
              }
            }
          });
        a(this)
          .parent()
          .bind("mouseleave", function () {
            a(this).children(".adipoli-after").html("").hide();
          });
      })
      .each(function () {
        if (this.complete) a(this).load();
      });
    return a(this);
  };
  a.fn._reverse = [].reverse;
})(jQuery);
