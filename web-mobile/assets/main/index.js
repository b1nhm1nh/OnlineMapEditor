window.__require = function t(e, i, o) {
    function n(a, s) {
        if (!i[a]) {
            if (!e[a]) {
                var c = a.split("/");
                if (c = c[c.length - 1],
                !e[c]) {
                    var h = "function" == typeof __require && __require;
                    if (!s && h)
                        return h(c, !0);
                    if (r)
                        return r(c, !0);
                    throw new Error("Cannot find module '" + a + "'")
                }
                a = c
            }
            var d = i[a] = {
                exports: {}
            };
            e[a][0].call(d.exports, function(t) {
                return n(e[a][1][t] || t)
            }, d, d.exports, t, e, i, o)
        }
        return i[a].exports
    }
    for (var r = "function" == typeof __require && __require, a = 0; a < o.length; a++)
        n(o[a]);
    return n
}({
    AStarRoadSeeker: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "a3a193EdkVIWoDgtJ/bBisA", "AStarRoadSeeker"),
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var o = t("./BinaryTreeNode")
          , n = function() {
            function t(t) {
                this.COST_STRAIGHT = 10,
                this.COST_DIAGONAL = 14,
                this.maxStep = 1e3,
                this._binaryTreeNode = new o.default,
                this._round = [[0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1]],
                this.handle = -1,
                this.optimize = !0,
                this._isPassCallBack = null,
                this._roadNodes = t
            }
            return t.prototype.seekPath = function(t, e) {
                if (this._startNode = t,
                this._currentNode = t,
                this._targetNode = e,
                !this._startNode || !this._targetNode)
                    return [];
                if (this._startNode == this._targetNode)
                    return [this._targetNode];
                if (!this.isPassNode(this._targetNode))
                    return console.log("\u76ee\u6807\u4e0d\u53ef\u8fbe\u5230\uff1a"),
                    [];
                this._startNode.g = 0,
                this._startNode.resetTree(),
                this._binaryTreeNode.refleshTag();
                for (var i = 0; ; ) {
                    if (i > this.maxStep)
                        return console.log("\u6ca1\u627e\u5230\u76ee\u6807\u8ba1\u7b97\u6b65\u9aa4\u4e3a\uff1a", i),
                        [];
                    if (i++,
                    this.searchRoundNodes(this._currentNode),
                    this._binaryTreeNode.isTreeNull())
                        return console.log("\u6ca1\u627e\u5230\u76ee\u6807\u8ba1\u7b97\u6b65\u9aa4\u4e3a\uff1a", i),
                        [];
                    if (this._currentNode = this._binaryTreeNode.getMin_F_Node(),
                    this._currentNode == this._targetNode)
                        return console.log("\u627e\u5230\u76ee\u6807\u8ba1\u7b97\u6b65\u9aa4\u4e3a\uff1a", i),
                        this.getPath();
                    this._binaryTreeNode.setRoadNodeInCloseList(this._currentNode)
                }
                return []
            }
            ,
            t.prototype.seekPath2 = function(t, e) {
                if (this._startNode = t,
                this._currentNode = t,
                this._targetNode = e,
                !this._startNode || !this._targetNode)
                    return [];
                if (this._startNode == this._targetNode)
                    return [this._targetNode];
                var i = this.maxStep;
                this.isPassNode(this._targetNode) || (i = 2 * (Math.abs(this._targetNode.cx - this._startNode.cx) + Math.abs(this._targetNode.cy - this._startNode.cy))) > this.maxStep && (i = this.maxStep),
                this._startNode.g = 0,
                this._startNode.resetTree(),
                this._binaryTreeNode.refleshTag();
                for (var o = 0, n = null; ; ) {
                    if (o > i)
                        return console.log("\u6ca1\u627e\u5230\u76ee\u6807\u8ba1\u7b97\u6b65\u9aa4\u4e3a\uff1a", o),
                        this.seekPath(t, n);
                    if (o++,
                    this.searchRoundNodes(this._currentNode),
                    this._binaryTreeNode.isTreeNull())
                        return console.log("\u6ca1\u627e\u5230\u76ee\u6807\u8ba1\u7b97\u6b65\u9aa4\u4e3a\uff1a", o),
                        this.seekPath(t, n);
                    if (this._currentNode = this._binaryTreeNode.getMin_F_Node(),
                    null == n ? n = this._currentNode : this._currentNode.h < n.h && (n = this._currentNode),
                    this._currentNode == this._targetNode)
                        return console.log("\u627e\u5230\u76ee\u6807\u8ba1\u7b97\u6b65\u9aa4\u4e3a\uff1a", o),
                        this.getPath();
                    this._binaryTreeNode.setRoadNodeInCloseList(this._currentNode)
                }
                return this.seekPath(t, n)
            }
            ,
            t.prototype.sortNode = function(t, e) {
                return t.f < e.f ? -1 : t.f > e.f ? 1 : 0
            }
            ,
            t.prototype.getPath = function() {
                for (var t = [], e = this._targetNode; e != this._startNode; )
                    t.unshift(e),
                    e = e.parent;
                if (t.unshift(this._startNode),
                !this.optimize)
                    return t;
                for (var i = 1; i < t.length - 1; i++) {
                    var o = t[i - 1]
                      , n = t[i]
                      , r = t[i + 1]
                      , a = n.cx == o.cx && n.cx == r.cx
                      , s = n.cy == o.cy && n.cy == r.cy
                      , c = (n.cx - o.cx) / (n.cy - o.cy) * ((r.cx - n.cx) / (r.cy - n.cy)) == 1;
                    (a || s || c) && (t.splice(i, 1),
                    i--)
                }
                for (i = 0; i < t.length - 2; i++) {
                    for (var h = t[i], d = null, l = t.length - 1; l > i + 1; l--) {
                        var p = t[l];
                        if (h.cx != p.cx && h.cy != p.cy && Math.abs(p.cx - h.cx) != Math.abs(p.cy - h.cy) && this.isArriveBetweenTwoNodes(h, p)) {
                            d = p;
                            break
                        }
                    }
                    if (d) {
                        var u = l - i - 1;
                        t.splice(i + 1, u)
                    }
                }
                return t
            }
            ,
            t.prototype.isArriveBetweenTwoNodes = function(t, e) {
                if (t == e)
                    return !1;
                var i = Math.abs(e.cx - t.cx)
                  , o = Math.abs(e.cy - t.cy)
                  , n = 0;
                e.cx > t.cx ? n = 1 : e.cx < t.cx && (n = -1);
                var r = 0;
                e.cy > t.cy ? r = 1 : e.cy < t.cy && (r = -1);
                var a = 0
                  , s = 0
                  , c = 0
                  , h = 0;
                if (i > o)
                    for (var d = o / i, l = 0; l < i; l++) {
                        s = t.cy + l * r * d,
                        c = Math.floor(s),
                        h = s % 1;
                        var p = t.cx + l * n
                          , u = h <= .5 ? c : c + 1;
                        s = t.cy + (l + 1) * r * d,
                        c = Math.floor(s),
                        h = s % 1;
                        var y = t.cx + (l + 1) * n
                          , f = h <= .5 ? c : c + 1
                          , _ = this.getRoadNode(p, u)
                          , g = this.getRoadNode(y, f);
                        if (!this.isCrossAtAdjacentNodes(_, g))
                            return !1
                    }
                else
                    for (d = i / o,
                    l = 0; l < o; l++)
                        if (a = l * n * d,
                        c = n > 0 ? Math.floor(t.cx + a) : Math.ceil(t.cx + a),
                        p = (h = Math.abs(a % 1)) <= .5 ? c : c + 1 * n,
                        u = t.cy + l * r,
                        a = (l + 1) * n * d,
                        c = n > 0 ? Math.floor(t.cx + a) : Math.ceil(t.cx + a),
                        y = (h = Math.abs(a % 1)) <= .5 ? c : c + 1 * n,
                        f = t.cy + (l + 1) * r,
                        _ = this.getRoadNode(p, u),
                        g = this.getRoadNode(y, f),
                        !this.isCrossAtAdjacentNodes(_, g))
                            return !1;
                return !0
            }
            ,
            t.prototype.isCrossAtAdjacentNodes = function(t, e) {
                if (t == e)
                    return !1;
                if (!this.isPassNode(t) || !this.isPassNode(e))
                    return !1;
                var i = e.cx - t.cx
                  , o = e.cy - t.cy;
                return !(Math.abs(i) > 1 || Math.abs(o) > 1 || t.cx != e.cx && t.cy != e.cy && (!this.isPassNode(this.getRoadNode(t.cx, t.cy + o)) || !this.isPassNode(this.getRoadNode(t.cx + i, t.cy))))
            }
            ,
            t.prototype.isPassNode = function(t) {
                return null != this._isPassCallBack ? this._isPassCallBack(t) : null != t && 1 != t.value
            }
            ,
            t.prototype.customRoadNodeIsPass = function(t) {
                this._isPassCallBack = t
            }
            ,
            t.prototype.getRoadNode = function(t, e) {
                var i = t + "_" + e;
                return this._roadNodes[i]
            }
            ,
            t.prototype.testSeekPathStep = function(t, e, i, o, n) {
                var r = this;
                if (void 0 === n && (n = 100),
                this._startNode = t,
                this._currentNode = t,
                this._targetNode = e,
                this.isPassNode(this._targetNode)) {
                    this._startNode.g = 0,
                    this._startNode.resetTree(),
                    this._binaryTreeNode.refleshTag(),
                    this._closelist = [];
                    var a = 0;
                    clearInterval(this.handle),
                    this.handle = setInterval(function() {
                        return a > r.maxStep ? (console.log("\u6ca1\u627e\u5230\u76ee\u6807\u8ba1\u7b97\u6b65\u9aa4\u4e3a\uff1a", a),
                        void clearInterval(r.handle)) : (a++,
                        r.searchRoundNodes(r._currentNode),
                        r._binaryTreeNode.isTreeNull() ? (console.log("\u6ca1\u627e\u5230\u76ee\u6807\u8ba1\u7b97\u6b65\u9aa4\u4e3a\uff1a", a),
                        void clearInterval(r.handle)) : (r._currentNode = r._binaryTreeNode.getMin_F_Node(),
                        void (r._currentNode == r._targetNode ? (console.log("\u627e\u5230\u76ee\u6807\u8ba1\u7b97\u6b65\u9aa4\u4e3a\uff1a", a),
                        clearInterval(r.handle),
                        r._openlist = r._binaryTreeNode.getOpenList(),
                        i.apply(o, [r._startNode, r._targetNode, r._currentNode, r._openlist, r._closelist, r.getPath()])) : (r._binaryTreeNode.setRoadNodeInCloseList(r._currentNode),
                        r._openlist = r._binaryTreeNode.getOpenList(),
                        r._closelist.push(r._currentNode),
                        i.apply(o, [r._startNode, r._targetNode, r._currentNode, r._openlist, r._closelist, null])))))
                    }, n)
                }
            }
            ,
            t.prototype.stopTestSeekPathStep = function() {
                -1 != this.handle && (clearInterval(this.handle),
                this.handle = -1)
            }
            ,
            t.prototype.searchRoundNodes = function(t) {
                for (var e = 0; e < this._round.length; e++) {
                    var i = t.cx + this._round[e][0]
                      , o = t.cy + this._round[e][1]
                      , n = this.getRoadNode(i, o);
                    !this.isPassNode(n) || n == this._startNode || this.isInCloseList(n) || this.inInCorner(n) || this.setNodeF(n)
                }
            }
            ,
            t.prototype.setNodeF = function(t) {
                var e;
                e = t.cx == this._currentNode.cx || t.cy == this._currentNode.cy ? this._currentNode.g + this.COST_STRAIGHT : this._currentNode.g + this.COST_DIAGONAL,
                this.isInOpenList(t) ? e < t.g && (t.g = e,
                t.parent = this._currentNode,
                t.h = (Math.abs(this._targetNode.cx - t.cx) + Math.abs(this._targetNode.cy - t.cy)) * this.COST_STRAIGHT,
                t.f = t.g + t.h,
                this._binaryTreeNode.removeTreeNode(t),
                this._binaryTreeNode.addTreeNode(t)) : (t.g = e,
                this._binaryTreeNode.setRoadNodeInOpenList(t),
                t.resetTree(),
                t.parent = this._currentNode,
                t.h = (Math.abs(this._targetNode.cx - t.cx) + Math.abs(this._targetNode.cy - t.cy)) * this.COST_STRAIGHT,
                t.f = t.g + t.h,
                this._binaryTreeNode.addTreeNode(t))
            }
            ,
            t.prototype.isInOpenList = function(t) {
                return this._binaryTreeNode.isInOpenList(t)
            }
            ,
            t.prototype.isInCloseList = function(t) {
                return this._binaryTreeNode.isInCloseList(t)
            }
            ,
            t.prototype.inInCorner = function(t) {
                if (t.cx == this._currentNode.cx || t.cy == this._currentNode.cy)
                    return !1;
                var e = this.getRoadNode(this._currentNode.cx, t.cy)
                  , i = this.getRoadNode(t.cx, this._currentNode.cy);
                return !this.isPassNode(e) || !this.isPassNode(i)
            }
            ,
            t.prototype.dispose = function() {
                this._roadNodes = null,
                this._round = null
            }
            ,
            t
        }();
        i.default = n,
        cc._RF.pop()
    }
    , {
        "./BinaryTreeNode": "BinaryTreeNode"
    }],
    AnimationController: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "a5491LI8SNJ4YgtDHwBcK0d", "AnimationController"),
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var o = cc._decorator
          , n = o.ccclass
          , r = o.property
          , a = function(t) {
            function e() {
                var e = null !== t && t.apply(this, arguments) || this;
                return e.images = [],
                e.frameTime = .1,
                e.playTimes = 0,
                e.reverse = !1,
                e.autoPlayOnLoad = !0,
                e.autoDestroy = !1,
                e.frameNum = 0,
                e.frameIndex = 0,
                e.nextFrameIndex = 0,
                e.running = !0,
                e.time = 0,
                e.currentTimes = 0,
                e
            }
            return __extends(e, t),
            e.prototype.onLoad = function() {
                this.m_render = this.getComponent(cc.Sprite)
            }
            ,
            e.prototype.start = function() {
                0 != this.images.length && (this.frameNum = this.images.length),
                this.running = this.autoPlayOnLoad,
                this.reverse && (this.frameIndex = this.frameNum - 1,
                this.nextFrameIndex = this.frameNum - 1)
            }
            ,
            e.prototype.update = function(t) {
                if (this.running && 0 != this.images.length)
                    if (this.time -= t,
                    0 == this.playTimes || this.currentTimes != this.playTimes) {
                        if (this.time <= 0)
                            if (this.time = this.frameTime,
                            this.reverse)
                                this.frameIndex = (this.nextFrameIndex + this.frameNum) % this.frameNum,
                                this.nextFrameIndex = this.frameIndex - 1,
                                this.m_render.spriteFrame = this.images[this.frameIndex],
                                this.m_render.spriteFrame && (e = this.m_render.spriteFrame.getRect(),
                                this.node.width = e.width,
                                this.node.height = e.height),
                                null != this.frameCallback && this.frameCallback(this.frameIndex),
                                0 == this.frameIndex && (this.currentTimes++,
                                this.node.emit("completeTimes", this.currentTimes),
                                null != this.completeTimesCallback && this.completeTimesCallback(this.currentTimes),
                                0 != this.playTimes && this.currentTimes == this.playTimes && (this.node.emit("complete"),
                                null != this.completeCallback && this.completeCallback(),
                                this.autoDestroy && this.node.destroy()));
                            else {
                                if (this.frameIndex = this.nextFrameIndex % this.frameNum,
                                this.nextFrameIndex = this.frameIndex + 1,
                                this.m_render.spriteFrame = this.images[this.frameIndex],
                                this.m_render.spriteFrame) {
                                    var e = this.m_render.spriteFrame.getRect();
                                    this.node.width = e.width,
                                    this.node.height = e.height
                                }
                                null != this.frameCallback && this.frameCallback(this.frameIndex),
                                this.frameIndex == this.frameNum - 1 && (this.currentTimes++,
                                this.node.emit("completeTimes", this.currentTimes),
                                null != this.completeTimesCallback && this.completeTimesCallback(this.currentTimes),
                                0 != this.playTimes && this.currentTimes == this.playTimes && (this.node.emit("complete"),
                                null != this.completeCallback && this.completeCallback(),
                                this.autoDestroy && this.node.destroy()))
                            }
                    } else
                        this.running = !1
            }
            ,
            e.prototype.play = function(t, e) {
                if (void 0 === t && (t = null),
                void 0 === e && (e = null),
                this.frameCallback = t,
                this.completeCallback = e,
                this.running = !0,
                this.frameIndex = 0,
                this.currentTimes = 0,
                this.time = this.frameTime,
                0 != this.images.length && (this.frameNum = this.images.length,
                this.reverse && (this.frameIndex = this.frameNum - 1,
                this.nextFrameIndex = this.frameNum - 1)),
                this.m_render || (this.m_render = this.getComponent(cc.Sprite)),
                this.m_render && (this.m_render.spriteFrame = this.images[0]),
                this.m_render.spriteFrame) {
                    var i = this.m_render.spriteFrame.getRect();
                    this.node.width = i.width,
                    this.node.height = i.height
                }
            }
            ,
            e.prototype.gotoAndPlay = function(t) {
                this.m_render || (this.m_render = this.getComponent(cc.Sprite)),
                this.running = !0,
                this.frameIndex = t,
                this.nextFrameIndex = t,
                this.currentTimes = 0
            }
            ,
            e.prototype.stop = function() {
                this.running = !1
            }
            ,
            e.prototype.gotoAndStop = function(t) {
                if (this.frameIndex = t,
                this.frameIndex < 0 && (this.frameIndex = 0),
                this.frameIndex > this.images.length - 1 && (this.frameIndex = this.images.length - 1),
                this.m_render || (this.m_render = this.getComponent(cc.Sprite)),
                this.m_render.spriteFrame = this.images[this.frameIndex],
                this.m_render.spriteFrame) {
                    var e = this.m_render.spriteFrame.getRect();
                    this.node.width = e.width,
                    this.node.height = e.height
                }
                this.running = !1
            }
            ,
            e.prototype.isPlayEnd = function() {
                return this.frameIndex == this.frameNum
            }
            ,
            __decorate([r(cc.SpriteFrame)], e.prototype, "images", void 0),
            __decorate([r()], e.prototype, "frameTime", void 0),
            __decorate([r()], e.prototype, "playTimes", void 0),
            __decorate([r({
                displayName: "Reverse Playback",
                tooltip: "Check to play in reverse, uncheck to play in order"
            })], e.prototype, "reverse", void 0),
            __decorate([r(cc.Boolean)], e.prototype, "autoPlayOnLoad", void 0),
            __decorate([r({
                tooltip: "Check to automatically destroy after playback"
            })], e.prototype, "autoDestroy", void 0),
            __decorate([n], e)
        }(cc.Component);
        i.default = a,
        cc._RF.pop()
    }
    , {}],
    AstarHoneycombRoadSeeker: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "470f8oyv3xHR719BwQrvDie", "AstarHoneycombRoadSeeker"),
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var o = t("./BinaryTreeNode")
          , n = function() {
            function t(t) {
                this.COST_STRAIGHT = 10,
                this.COST_DIAGONAL = 10,
                this.maxStep = 1e3,
                this._binaryTreeNode = new o.default,
                this._round1 = [[0, -1], [1, -1], [1, 0], [0, 1], [-1, 0], [-1, -1]],
                this._round2 = [[0, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0]],
                this.handle = -1,
                this.optimize = !0,
                this._isPassCallBack = null,
                this._roadNodes = t
            }
            return t.prototype.seekPath = function(t, e) {
                if (this._startNode = t,
                this._currentNode = t,
                this._targetNode = e,
                !this._startNode || !this._targetNode)
                    return [];
                if (this._startNode == this._targetNode)
                    return [this._targetNode];
                if (!this.isPassNode(this._targetNode))
                    return console.log("\u76ee\u6807\u4e0d\u53ef\u8fbe\u5230\uff1a"),
                    [];
                this._startNode.g = 0,
                this._startNode.resetTree(),
                this._binaryTreeNode.refleshTag();
                for (var i = 0; ; ) {
                    if (i > this.maxStep)
                        return console.log("\u6ca1\u627e\u5230\u76ee\u6807\u8ba1\u7b97\u6b65\u9aa4\u4e3a\uff1a", i),
                        [];
                    if (i++,
                    this.searchRoundNodes(this._currentNode),
                    this._binaryTreeNode.isTreeNull())
                        return console.log("\u6ca1\u627e\u5230\u76ee\u6807\u8ba1\u7b97\u6b65\u9aa4\u4e3a\uff1a", i),
                        [];
                    if (this._currentNode = this._binaryTreeNode.getMin_F_Node(),
                    this._currentNode == this._targetNode)
                        return console.log("\u627e\u5230\u76ee\u6807\u8ba1\u7b97\u6b65\u9aa4\u4e3a\uff1a", i),
                        this.getPath();
                    this._binaryTreeNode.setRoadNodeInCloseList(this._currentNode)
                }
                return []
            }
            ,
            t.prototype.seekPath2 = function(t, e) {
                if (this._startNode = t,
                this._currentNode = t,
                this._targetNode = e,
                !this._startNode || !this._targetNode)
                    return [];
                if (this._startNode == this._targetNode)
                    return [this._targetNode];
                var i = this.maxStep;
                this.isPassNode(this._targetNode) || (i = 2 * (Math.abs(this._targetNode.cx - this._startNode.cx) + Math.abs(this._targetNode.cy - this._startNode.cy))) > this.maxStep && (i = this.maxStep),
                this._startNode.g = 0,
                this._startNode.resetTree(),
                this._binaryTreeNode.refleshTag();
                for (var o = 0, n = null; ; ) {
                    if (o > i)
                        return console.log("\u6ca1\u627e\u5230\u76ee\u6807\u8ba1\u7b97\u6b65\u9aa4\u4e3a\uff1a", o),
                        this.seekPath(t, n);
                    if (o++,
                    this.searchRoundNodes(this._currentNode),
                    this._binaryTreeNode.isTreeNull())
                        return console.log("\u6ca1\u627e\u5230\u76ee\u6807\u8ba1\u7b97\u6b65\u9aa4\u4e3a\uff1a", o),
                        this.seekPath(t, n);
                    if (this._currentNode = this._binaryTreeNode.getMin_F_Node(),
                    null == n ? n = this._currentNode : this._currentNode.h < n.h && (n = this._currentNode),
                    this._currentNode == this._targetNode)
                        return console.log("\u627e\u5230\u76ee\u6807\u8ba1\u7b97\u6b65\u9aa4\u4e3a\uff1a", o),
                        this.getPath();
                    this._binaryTreeNode.setRoadNodeInCloseList(this._currentNode)
                }
                return this.seekPath(t, n)
            }
            ,
            t.prototype.sortNode = function(t, e) {
                return t.f < e.f ? -1 : t.f > e.f ? 1 : 0
            }
            ,
            t.prototype.getPath = function() {
                for (var t, e, i, o, n, r, a = [], s = this._targetNode; s != this._startNode; )
                    a.unshift(s),
                    s = s.parent;
                if (a.unshift(this._startNode),
                !this.optimize)
                    return a;
                for (var c = 1; c < a.length - 1; c++) {
                    t = a[c - 1],
                    e = a[c],
                    i = a[c + 1],
                    o = this.getHoneyPoint(t),
                    n = this.getHoneyPoint(e),
                    r = this.getHoneyPoint(i);
                    var h = e.cx == t.cx && e.cx == i.cx
                      , d = e.cy == t.cy && e.cy == i.cy && t.cx % 2 == e.cx % 2 && e.cx % 2 == i.cx % 2
                      , l = o.hx == n.hx && n.hx == r.hx
                      , p = o.hy == n.hy && n.hy == r.hy;
                    (h || d || l || p) && (a.splice(c, 1),
                    c--)
                }
                for (c = 0; c < a.length - 2; c++) {
                    for (var u = a[c], y = null, f = a.length - 1; f > c + 1; f--) {
                        var _ = a[f];
                        if (this.isArriveBetweenTwoNodes(u, _)) {
                            y = _;
                            break
                        }
                    }
                    if (y) {
                        var g = f - c - 1;
                        a.splice(c + 1, g)
                    }
                }
                return a
            }
            ,
            t.prototype.isArriveBetweenTwoNodes = function(t, e) {
                var i = this.getHoneyPoint(t)
                  , o = this.getHoneyPoint(e);
                if (i.hx == o.hx && i.hy == o.hy)
                    return !1;
                var n = Math.abs(o.hx - i.hx)
                  , a = Math.abs(o.hy - i.hy)
                  , s = 0;
                o.hx > i.hx ? s = 1 : o.hx < i.hx && (s = -1);
                var c = 0;
                o.hy > i.hy ? c = 1 : o.hy < i.hy && (c = -1);
                var h = 0
                  , d = 0
                  , l = 0
                  , p = 0;
                if (n > a) {
                    for (var u = a / n, y = 0; y < n; y += 2)
                        if (d = y * c * u,
                        l = c > 0 ? Math.floor(i.hy + d) : Math.ceil(i.hy + d),
                        p = Math.abs(d % 1),
                        (f = new r).hx = i.hx + y * s,
                        f.hy = p <= .5 ? l : l + 1 * c,
                        d = (y + 1) * c * u,
                        l = c > 0 ? Math.floor(i.hy + d) : Math.ceil(i.hy + d),
                        p = Math.abs(d % 1),
                        (_ = new r).hx = i.hx + (y + 1) * s,
                        _.hy = p <= .5 ? l : l + 1 * c,
                        d = (y + 2) * c * u,
                        l = c > 0 ? Math.floor(i.hy + d) : Math.ceil(i.hy + d),
                        p = Math.abs(d % 1),
                        (g = new r).hx = i.hx + (y + 2) * s,
                        g.hy = p <= .5 ? l : l + 1 * c,
                        !this.isCrossAtAdjacentNodes(i, o, f, _, g))
                            return !1
                } else
                    for (u = n / a,
                    y = 0; y < a; y += 2) {
                        var f, _, g;
                        if (h = y * s * u,
                        l = s > 0 ? Math.floor(i.hx + h) : Math.ceil(i.hx + h),
                        p = Math.abs(h % 1),
                        (f = new r).hx = p <= .5 ? l : l + 1 * s,
                        f.hy = i.hy + y * c,
                        h = (y + 1) * s * u,
                        l = s > 0 ? Math.floor(i.hx + h) : Math.ceil(i.hx + h),
                        p = Math.abs(h % 1),
                        (_ = new r).hx = p <= .5 ? l : l + 1 * s,
                        _.hy = i.hy + (y + 1) * c,
                        h = (y + 2) * s * u,
                        l = s > 0 ? Math.floor(i.hx + h) : Math.ceil(i.hx + h),
                        p = Math.abs(h % 1),
                        (g = new r).hx = p <= .5 ? l : l + 1 * s,
                        g.hy = i.hy + (y + 2) * c,
                        !this.isCrossAtAdjacentNodes(i, o, f, _, g))
                            return !1
                    }
                return !0
            }
            ,
            t.prototype.isCrossAtAdjacentNodes = function(t, e, i, o, n) {
                var r = this.getNodeByHoneyPoint(i.hx, i.hy)
                  , a = this.getNodeByHoneyPoint(o.hx, o.hy);
                if (this.getNodeByHoneyPoint(n.hx, n.hy),
                r == a)
                    return !1;
                if (!this.isPassNode(r) || !this.isPassNode(a))
                    return !1;
                var s = i.hx - o.hx
                  , c = i.hy - o.hy
                  , h = n.hx - o.hx
                  , d = n.hy - o.hy;
                if (Math.abs(s) > 1 || Math.abs(c) > 1 || Math.abs(h) > 1 || Math.abs(d) > 1)
                    return !1;
                if (s == -c)
                    if (-1 == s) {
                        if (!this.isPassNode(this.getNodeByHoneyPoint(o.hx - 1, o.hy)) || !this.isPassNode(this.getNodeByHoneyPoint(o.hx, o.hy + 1)))
                            return !1
                    } else if (!this.isPassNode(this.getNodeByHoneyPoint(o.hx + 1, o.hy)) || !this.isPassNode(this.getNodeByHoneyPoint(o.hx, o.hy - 1)))
                        return !1;
                if (o.hx == e.hx && o.hy == e.hy)
                    return !0;
                if (h == -d)
                    if (-1 == h) {
                        if (!this.isPassNode(this.getNodeByHoneyPoint(o.hx - 1, o.hy)) || !this.isPassNode(this.getNodeByHoneyPoint(o.hx, o.hy + 1)))
                            return !1
                    } else if (!this.isPassNode(this.getNodeByHoneyPoint(o.hx + 1, o.hy)) || !this.isPassNode(this.getNodeByHoneyPoint(o.hx, o.hy - 1)))
                        return !1;
                return i.hx == o.hx && o.hx == n.hx || !!this.isPassNode(this.getNodeByHoneyPoint(o.hx + (s + h), o.hy + (c + d)))
            }
            ,
            t.prototype.getHoneyPoint = function(t) {
                var e = t.cy + Math.ceil(t.cx / 2)
                  , i = t.cy - Math.floor(t.cx / 2);
                return new r(e,i)
            }
            ,
            t.prototype.getNodeByHoneyPoint = function(t, e) {
                var i = t - e
                  , o = Math.floor((t - e) / 2) + e;
                return this.getRoadNode(i, o)
            }
            ,
            t.prototype.getRoundNodeByIndex = function(t, e) {
                if (!t)
                    return null;
                var i;
                e %= 6,
                i = t.cx % 2 == 0 ? this._round1 : this._round2;
                var o = t.cx + i[e][0]
                  , n = t.cy + i[e][1];
                return this.getRoadNode(o, n)
            }
            ,
            t.prototype.getRoundNodes = function(t) {
                var e;
                e = t.cx % 2 == 0 ? this._round1 : this._round2;
                for (var i = [], o = 0; o < e.length; o++) {
                    var n = t.cx + e[o][0]
                      , r = t.cy + e[o][1]
                      , a = this.getRoadNode(n, r);
                    i.push(a)
                }
                return i
            }
            ,
            t.prototype.isPassNode = function(t) {
                return null != this._isPassCallBack ? this._isPassCallBack(t) : null != t && 1 != t.value
            }
            ,
            t.prototype.customRoadNodeIsPass = function(t) {
                this._isPassCallBack = t
            }
            ,
            t.prototype.getRoadNode = function(t, e) {
                var i = t + "_" + e;
                return this._roadNodes[i]
            }
            ,
            t.prototype.testSeekPathStep = function(t, e, i, o, n) {
                var r = this;
                if (void 0 === n && (n = 100),
                this._startNode = t,
                this._currentNode = t,
                this._targetNode = e,
                this.isPassNode(this._targetNode)) {
                    this._startNode.g = 0,
                    this._startNode.resetTree(),
                    this._binaryTreeNode.refleshTag(),
                    this._closelist = [];
                    var a = 0;
                    clearInterval(this.handle),
                    this.handle = setInterval(function() {
                        return a > r.maxStep ? (console.log("\u6ca1\u627e\u5230\u76ee\u6807\u8ba1\u7b97\u6b65\u9aa4\u4e3a\uff1a", a),
                        void clearInterval(r.handle)) : (a++,
                        r.searchRoundNodes(r._currentNode),
                        r._binaryTreeNode.isTreeNull() ? (console.log("\u6ca1\u627e\u5230\u76ee\u6807\u8ba1\u7b97\u6b65\u9aa4\u4e3a\uff1a", a),
                        void clearInterval(r.handle)) : (r._currentNode = r._binaryTreeNode.getMin_F_Node(),
                        void (r._currentNode == r._targetNode ? (console.log("\u627e\u5230\u76ee\u6807\u8ba1\u7b97\u6b65\u9aa4\u4e3a\uff1a", a),
                        clearInterval(r.handle),
                        r._openlist = r._binaryTreeNode.getOpenList(),
                        i.apply(o, [r._startNode, r._targetNode, r._currentNode, r._openlist, r._closelist, r.getPath()])) : (r._binaryTreeNode.setRoadNodeInCloseList(r._currentNode),
                        r._openlist = r._binaryTreeNode.getOpenList(),
                        r._closelist.push(r._currentNode),
                        i.apply(o, [r._startNode, r._targetNode, r._currentNode, r._openlist, r._closelist, null])))))
                    }, n)
                }
            }
            ,
            t.prototype.stopTestSeekPathStep = function() {
                -1 != this.handle && (clearInterval(this.handle),
                this.handle = -1)
            }
            ,
            t.prototype.searchRoundNodes = function(t) {
                var e;
                e = t.cx % 2 == 0 ? this._round1 : this._round2;
                for (var i = 0; i < e.length; i++) {
                    var o = t.cx + e[i][0]
                      , n = t.cy + e[i][1]
                      , r = this.getRoadNode(o, n);
                    this.isPassNode(r) && r != this._startNode && !this.isInCloseList(r) && this.setNodeF(r)
                }
            }
            ,
            t.prototype.setNodeF = function(t) {
                var e;
                e = t.cx == this._currentNode.cx || t.cy == this._currentNode.cy ? this._currentNode.g + this.COST_STRAIGHT : this._currentNode.g + this.COST_DIAGONAL,
                this.isInOpenList(t) ? e < t.g && (t.g = e,
                t.parent = this._currentNode,
                t.h = (Math.abs(this._targetNode.cx - t.cx) + Math.abs(this._targetNode.cy - t.cy)) * this.COST_STRAIGHT,
                t.f = t.g + t.h,
                this._binaryTreeNode.removeTreeNode(t),
                this._binaryTreeNode.addTreeNode(t)) : (t.g = e,
                this._binaryTreeNode.setRoadNodeInOpenList(t),
                t.resetTree(),
                t.parent = this._currentNode,
                t.h = (Math.abs(this._targetNode.cx - t.cx) + Math.abs(this._targetNode.cy - t.cy)) * this.COST_STRAIGHT,
                t.f = t.g + t.h,
                this._binaryTreeNode.addTreeNode(t))
            }
            ,
            t.prototype.isInOpenList = function(t) {
                return this._binaryTreeNode.isInOpenList(t)
            }
            ,
            t.prototype.isInCloseList = function(t) {
                return this._binaryTreeNode.isInCloseList(t)
            }
            ,
            t.prototype.dispose = function() {
                this._roadNodes = null,
                this._round1 = null,
                this._round2 = null
            }
            ,
            t
        }();
        i.default = n;
        var r = function(t, e) {
            void 0 === t && (t = 0),
            void 0 === e && (e = 0),
            this.hx = 0,
            this.hy = 0,
            this.hx = t,
            this.hy = e
        };
        cc._RF.pop()
    }
    , {
        "./BinaryTreeNode": "BinaryTreeNode"
    }],
    AttributeEditor: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "e9928tmiLFLvbzTzvc6APOy", "AttributeEditor"),
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var o = function() {
            function t(e, i, o, n, r, a) {
                void 0 === o && (o = t.NORMAL),
                void 0 === n && (n = !0),
                void 0 === r && (r = !0),
                void 0 === a && (a = ""),
                this._editable = !1,
                this._visible = !1,
                this._displayName = "",
                this._attribute = e,
                this._detail = i,
                this._type = o,
                this._editable = n,
                this._visible = r,
                this._displayName = a
            }
            return Object.defineProperty(t.prototype, "attribute", {
                get: function() {
                    return this._attribute
                },
                set: function(t) {
                    this._attribute = t
                },
                enumerable: !1,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, "detail", {
                get: function() {
                    return this._detail
                },
                set: function(t) {
                    this._detail = t
                },
                enumerable: !1,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, "type", {
                get: function() {
                    return this._type
                },
                set: function(t) {
                    this._type = t
                },
                enumerable: !1,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, "editable", {
                get: function() {
                    return this._editable
                },
                set: function(t) {
                    this._editable = t
                },
                enumerable: !1,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, "visible", {
                get: function() {
                    return this._visible
                },
                set: function(t) {
                    this._visible = t
                },
                enumerable: !1,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, "displayName", {
                get: function() {
                    return this._displayName
                },
                set: function(t) {
                    this._displayName = t
                },
                enumerable: !1,
                configurable: !0
            }),
            t.NORMAL = "normal",
            t.NUMBER = "number",
            t.NOT_NUMBER = "not_number",
            t.BOOL = "bool",
            t
        }();
        i.default = o,
        cc._RF.pop()
    }
    , {}],
    AttributeUtils: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "d528ec05HZPpa5vifRZb9hd", "AttributeUtils"),
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var o = t("./AttributeEditor")
          , n = function() {
            function t() {
                this.classDic = new Map,
                this.baseAttributes = [new o.default("objId","Object ID"), new o.default("objName","Object Name"), new o.default("objType","Object Type"), new o.default("skin","Object Skin"), new o.default("x","X Coordinate",o.default.NUMBER), new o.default("y","Y Coordinate",o.default.NUMBER), new o.default("cx","World Coordinate X-axis",o.default.NUMBER,!1), new o.default("cy","World Coordinate Y-axis",o.default.NUMBER,!1), new o.default("params","Custom Parameters")]
            }
            return Object.defineProperty(t, "instance", {
                get: function() {
                    return this._instance || (this._instance = new t,
                    this._instance.init()),
                    this._instance
                },
                enumerable: !1,
                configurable: !0
            }),
            t.prototype.init = function() {
                this.initClassDic()
            }
            ,
            t.prototype.initClassDic = function() {
                this.classDic.EditorElement = this.baseAttributes,
                this.classDic.EditorNPC = this.baseAttributes.concat([new o.default("direction","Character Direction, value range is 0-7",o.default.NUMBER), new o.default("npcType","NPC Type",o.default.NUMBER,!1,!1), new o.default("isPatrol","Is Patrolling",o.default.BOOL,!0,!0), new o.default("dialogueId","Dialogue ID, used for NPC dialogue content",o.default.NUMBER,!0,!0,"Dialogue ID"), new o.default("taskId","Used for NPC task assignment",o.default.NUMBER,!0,!0,"Task ID"), new o.default("funcId","Used to identify NPC functionality",o.default.NUMBER,!0,!0,"Function ID")]),
                this.classDic.EditorMonster = this.baseAttributes.concat([new o.default("direction","Character Direction, value range is 0-7",o.default.NUMBER), new o.default("monsterType","Monster Type",o.default.NUMBER,!1,!1), new o.default("isPatrol","Is Patrolling",o.default.BOOL,!0,!0), new o.default("dialogueId","Dialogue ID, used for monster dialogue content",o.default.NUMBER,!0,!0,"Dialogue ID"), new o.default("fightId","Used when needing to jump to battle instance",o.default.NUMBER,!0,!0,"Battle ID")]),
                this.classDic.EditorTransfer = this.baseAttributes.concat([new o.default("targetMapId","Transfer to Target Map ID",o.default.NORMAL,!0,!0,"Target Map ID"), new o.default("targetMapSpawnId","Target Map Spawn Point ID",o.default.NUMBER,!0,!0,"Target Spawn Point ID"), new o.default("transferType","Transfer Type",o.default.NUMBER,!1,!1)]),
                this.classDic.EditorSpawnPoint = this.baseAttributes.concat([new o.default("spawnId","Spawn Point ID in the current map",o.default.NUMBER,!0,!0,"Map Spawn Point ID"), new o.default("defaultSpawn","Set whether it's the default spawn point",o.default.BOOL,!0,!0,"Default Spawn Point")])           }
            ,
            t.prototype.getObjectEditAttribute = function(t) {
                var e = t.className;
                return this.classDic[e]
            }
            ,
            t._instance = null,
            t
        }();
        i.default = n,
        cc._RF.pop()
    }
    , {
        "./AttributeEditor": "AttributeEditor"
    }],
    BaseView: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "fa0a6xU1slHuanA+q9oE3z8", "BaseView"),
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var o = cc._decorator
          , n = o.ccclass
          , r = o.property
          , a = function(t) {
            function e() {
                var e = null !== t && t.apply(this, arguments) || this;
                return e.canDrag = !0,
                e.content = null,
                e.title = null,
                e.closeBtn = null,
                e._startDrag = !1,
                e
            }
            return __extends(e, t),
            e.prototype.onLoad = function() {
                var t = this;
                this.closeBtn.on(cc.Node.EventType.TOUCH_START, this.onCloseBtnClick, this),
                this.canDrag && (this.title.on(cc.Node.EventType.TOUCH_START, function() {
                    t._startDrag = !0
                }, this),
                this.title.on(cc.Node.EventType.TOUCH_END, function() {
                    t._startDrag = !1
                }, this),
                this.node.on(cc.Node.EventType.TOUCH_MOVE, function(e) {
                    if (t._startDrag) {
                        var i = t.node.parent.convertToNodeSpaceAR(e.getLocation()).sub(t.title.position);
                        i.x < -(cc.winSize.width - t.node.width) / 2 ? i.x = -(cc.winSize.width - t.node.width) / 2 : i.x > (cc.winSize.width - t.node.width) / 2 && (i.x = (cc.winSize.width - t.node.width) / 2),
                        i.y < -(cc.winSize.height - t.node.height) / 2 ? i.y = -(cc.winSize.height - t.node.height) / 2 : i.y > (cc.winSize.height - t.node.height) / 2 && (i.y = (cc.winSize.height - t.node.height) / 2),
                        t.node.position = i
                    }
                }, this))
            }
            ,
            e.prototype.start = function() {}
            ,
            e.prototype.onCloseBtnClick = function() {
                this.close()
            }
            ,
            e.prototype.open = function() {
                this.node.active = !0
            }
            ,
            e.prototype.close = function() {
                this.node.active = !1
            }
            ,
            __decorate([r()], e.prototype, "canDrag", void 0),
            __decorate([r(cc.Node)], e.prototype, "content", void 0),
            __decorate([r(cc.Node)], e.prototype, "title", void 0),
            __decorate([r(cc.Node)], e.prototype, "closeBtn", void 0),
            __decorate([n], e)
        }(cc.Component);
        i.default = a,
        cc._RF.pop()
    }
    , {}],
    BinaryTreeNode: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "60d7a9yrfZNFZCCoRQd6Y7i", "BinaryTreeNode"),
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var o = function() {
            function t() {
                this.seekTag = 0,
                this.openNode = null,
                this.count = 0
            }
            return t.prototype.refleshTag = function() {
                this.openNode = null,
                this.count = 0,
                this.seekTag++,
                this.seekTag > 1e9 && (this.seekTag = 0)
            }
            ,
            t.prototype.isTreeNull = function() {
                return null == this.openNode
            }
            ,
            t.prototype.addTreeNode = function(t, e) {
                if (void 0 === e && (e = null),
                this.count++,
                null == e) {
                    if (null == this.openNode)
                        return void (this.openNode = t);
                    e = this.openNode
                }
                e != t && (t.f >= e.f ? null == e.right ? (e.right = t,
                t.treeParent = e) : this.addTreeNode(t, e.right) : null == e.left ? (e.left = t,
                t.treeParent = e) : this.addTreeNode(t, e.left))
            }
            ,
            t.prototype.removeTreeNode = function(t) {
                this.count++,
                null != t.treeParent || null != t.left || null != t.right ? (null == t.treeParent ? t.left ? (this.openNode = t.left,
                t.left.treeParent = null,
                t.right && (t.right.treeParent = null,
                this.addTreeNode(t.right, this.openNode))) : t.right && (this.openNode = t.right,
                t.right.treeParent = null) : t.treeParent.left == t ? t.right ? (t.treeParent.left = t.right,
                t.right.treeParent = t.treeParent,
                t.left && (t.left.treeParent = null,
                this.addTreeNode(t.left, t.right))) : (t.treeParent.left = t.left,
                t.left && (t.left.treeParent = t.treeParent)) : t.treeParent.right == t && (t.left ? (t.treeParent.right = t.left,
                t.left.treeParent = t.treeParent,
                t.right && (t.right.treeParent = null,
                this.addTreeNode(t.right, t.left))) : (t.treeParent.right = t.right,
                t.right && (t.right.treeParent = t.treeParent))),
                t.resetTree()) : t == this.openNode && (this.openNode = null)
            }
            ,
            t.prototype.getMin_F_Node = function(t) {
                if (void 0 === t && (t = null),
                this.count++,
                null == t) {
                    if (null == this.openNode)
                        return null;
                    t = this.openNode
                }
                if (null == t.left) {
                    var e = t;
                    return null == t.treeParent ? (this.openNode = t.right,
                    this.openNode && (this.openNode.treeParent = null)) : (t.treeParent.left = t.right,
                    t.right && (t.right.treeParent = t.treeParent)),
                    e
                }
                return this.getMin_F_Node(t.left)
            }
            ,
            t.prototype.setRoadNodeInOpenList = function(t) {
                t.openTag = this.seekTag,
                t.closeTag = 0
            }
            ,
            t.prototype.setRoadNodeInCloseList = function(t) {
                t.openTag = 0,
                t.closeTag = this.seekTag
            }
            ,
            t.prototype.isInOpenList = function(t) {
                return t.openTag == this.seekTag
            }
            ,
            t.prototype.isInCloseList = function(t) {
                return t.closeTag == this.seekTag
            }
            ,
            t.prototype.getOpenList = function() {
                var t = [];
                return this.seachTree(this.openNode, t),
                t
            }
            ,
            t.prototype.seachTree = function(t, e) {
                null != t && (e.push(t),
                t.left && this.seachTree(t.left, e),
                t.right && this.seachTree(t.right, e))
            }
            ,
            t
        }();
        i.default = o,
        cc._RF.pop()
    }
    , {}],
    Brush: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "53f8bYuo6NOHb+HaXpe3W3R", "Brush"),
        Object.defineProperty(i, "__esModule", {
            value: !0
        }),
        i.BrushType = void 0;
        var o, n = t("../base/MapType"), r = t("../road/MapRoadUtils"), a = cc._decorator, s = a.ccclass, c = a.property;
        (function(t) {
            t[t.none = 0] = "none",
            t[t.road = 1] = "road"
        }
        )(o = i.BrushType || (i.BrushType = {}));
        var h = function(t) {
            function e() {
                var e = null !== t && t.apply(this, arguments) || this;
                return e.touchPlane = null,
                e.type = o.none,
                e.size = 0,
                e._graphics = null,
                e.focusColor = "#43434390",
                e.blockScale = .95,
                e._round = [[0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1]],
                e._neighbours = null,
                e._neighboursDic = {},
                e
            }
            return __extends(e, t),
            Object.defineProperty(e.prototype, "graphics", {
                get: function() {
                    return this._graphics || (this._graphics = this.addComponent(cc.Graphics)),
                    this._graphics
                },
                enumerable: !1,
                configurable: !0
            }),
            e.prototype.start = function() {
                this.touchPlane.on(cc.Node.EventType.MOUSE_MOVE, this.onMouseMove, this),
                this.touchPlane.on(cc.Node.EventType.MOUSE_LEAVE, this.onMouseLeave, this),
                this.drawBrushFocus()
            }
            ,
            e.prototype.onMouseMove = function(t) {
                this.node.active = !0;
                var e = this.node.parent.convertToNodeSpaceAR(t.getLocation());
                this.node.position = e
            }
            ,
            e.prototype.onMouseLeave = function() {
                this.node.active = !1
            }
            ,
            e.prototype.drawBrushFocus = function() {
                this.graphics.clear();
                for (var t = r.default.instance.halfNodeWidth, e = r.default.instance.halfNodeHeight, i = this.getStroke(), o = r.default.instance.mapType, a = 0; a < i.length; a++) {
                    var s = i[a][0]
                      , c = i[a][1]
                      , h = r.default.instance.getNodeByWorldPoint(s, c);
                    o == n.MapType.angle45 ? this.draw45AngleMapRoadPoint(this.graphics, h, this.focusColor, t, e) : o == n.MapType.angle90 ? this.draw90AngleMapRoadPoint(this.graphics, h, this.focusColor, t, e) : o == n.MapType.honeycomb ? this.drawHoneycombMapRoadPoint(this.graphics, h, this.focusColor, t, e) : o == n.MapType.honeycomb2 && this.drawHoneycombMapRoadPoint2(this.graphics, h, this.focusColor, t, e)
                }
            }
            ,
            e.prototype.getStroke = function() {
                return this.getNeighbours(this.size)
            }
            ,
            e.prototype.getBrushInk = function(t) {
                for (var e = this.getStroke(), i = [t], o = 0; o < e.length; o++) {
                    var n = t.cx + e[o][0]
                      , a = t.cy + e[o][1];
                    if (0 != n || 0 != a) {
                        var s = r.default.instance.getNodeByWorldPoint(n, a);
                        s.value = t.value,
                        i.push(s)
                    }
                }
                return i
            }
            ,
            e.prototype.getNeighbours = function(t) {
                if (0 == t)
                    return [[0, 0]];
                var e = null;
                if (null != this._neighboursDic[t])
                    e = this._neighboursDic[t];
                else {
                    e = [];
                    for (var i = -t; i <= t; i++)
                        for (var o = -t; o <= t; o++)
                            Math.abs(o) + Math.abs(i) > t || e.push([o, i]);
                    this._neighboursDic[t] = e
                }
                return e
            }
            ,
            e.prototype.draw45AngleMapRoadPoint = function(t, e, i, o, n) {
                t.fillColor.fromHEX(i);
                var a = r.default.instance.getNodeByDerect(0, 0)
                  , s = r.default.instance.getNodeByWorldPoint(e.cx, e.cy + a.cy)
                  , c = s.px - o
                  , h = s.py - n;
                t.moveTo(-o * this.blockScale + c, 0 + h),
                t.lineTo(0 + c, -n * this.blockScale + h),
                t.lineTo(o * this.blockScale + c, 0 + h),
                t.lineTo(0 + c, n * this.blockScale + h),
                t.fill()
            }
            ,
            e.prototype.draw90AngleMapRoadPoint = function(t, e, i, o, n) {
                t.fillColor.fromHEX(i);
                var r = e.px - o
                  , a = e.py - n;
                t.rect(-o * this.blockScale + r, -n * this.blockScale + a, o * this.blockScale * 2, n * this.blockScale * 2),
                t.fill()
            }
            ,
            e.prototype.drawHoneycombMapRoadPoint = function(t, e, i, o, n) {
                t.fillColor.fromHEX(i);
                var a = e.px - o
                  , s = e.py - n
                  , c = r.default.instance.nodeWidth * this.blockScale
                  , h = r.default.instance.nodeHeight * this.blockScale
                  , d = c / 4
                  , l = 3 * d
                  , p = h / 2
                  , u = -2 * d
                  , y = -p;
                t.moveTo(u + d + a, y + s),
                t.lineTo(u + l + a, y + s),
                t.lineTo(u + c + a, p + y + s),
                t.lineTo(u + l + a, h + y + s),
                t.lineTo(u + d + a, h + y + s),
                t.lineTo(u + 0 + a, p + y + s),
                t.lineTo(u + d + a, y + s),
                t.fill()
            }
            ,
            e.prototype.drawHoneycombMapRoadPoint2 = function(t, e, i, o, n) {
                t.fillColor.fromHEX(i);
                var a = e.px - n
                  , s = e.py - o
                  , c = r.default.instance.nodeWidth * this.blockScale
                  , h = r.default.instance.nodeHeight * this.blockScale
                  , d = c / 4
                  , l = 3 * d
                  , p = h / 2
                  , u = -2 * d
                  , y = -p;
                t.moveTo(y + a, u + d + s),
                t.lineTo(y + a, u + l + s),
                t.lineTo(p + y + a, u + c + s),
                t.lineTo(h + y + a, u + l + s),
                t.lineTo(h + y + a, u + d + s),
                t.lineTo(p + y + a, u + 0 + s),
                t.lineTo(y + a, u + d + s),
                t.fill()
            }
            ,
            __decorate([c(cc.Node)], e.prototype, "touchPlane", void 0),
            __decorate([s], e)
        }(cc.Component);
        i.default = h,
        cc._RF.pop()
    }
    , {
        "../base/MapType": "MapType",
        "../road/MapRoadUtils": "MapRoadUtils"
    }],
    Caretaker: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "b623arsBnhORbByGnJB332v", "Caretaker"),
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var o = t("../attribute/AttributeUtils")
          , n = t("./Memento")
          , r = cc._decorator
          , a = r.ccclass
          , s = (r.property,
        function() {
            function t() {
                this._mementoList = [],
                this._currentIndex = 0,
                this.oldAttributes = {},
                this.newAttributes = {}
            }
            var e;
            return e = t,
            Object.defineProperty(t, "instance", {
                get: function() {
                    return null == this._instance && (this._instance = new e,
                    this._instance.init()),
                    this._instance
                },
                enumerable: !1,
                configurable: !0
            }),
            t.prototype.init = function() {}
            ,
            t.prototype.addMemento = function(t) {
                this._currentIndex < this._mementoList.length - 1 && this._mementoList.splice(this._currentIndex + 1),
                this._mementoList.push(t),
                this._currentIndex = this._mementoList.length
            }
            ,
            t.prototype.recoverMemento = function() {
                var t = this;
                this._mementoList[this._currentIndex].forEach(function(e) {
                    e.recover(),
                    t.oldAttributes[e.originator] && (t.oldAttributes[e.originator][e.attribute].value = e.value)
                })
            }
            ,
            t.prototype.recoverPrevMemento = function() {
                this._currentIndex > 0 && (this._currentIndex--,
                this.recoverMemento())
            }
            ,
            t.prototype.recoverNextMemento = function() {
                this._currentIndex < this._mementoList.length - 1 && (this._currentIndex++,
                this.recoverMemento())
            }
            ,
            t.prototype.clearMemento = function() {
                for (var t = 0; t < this._mementoList.length; t++)
                    this._mementoList[t].destroy();
                for (var e in this._mementoList = [],
                this.oldAttributes)
                    this.oldAttributes[e] = null,
                    delete this.oldAttributes[e];
                for (var i in this.newAttributes)
                    this.newAttributes[i] = null,
                    delete this.newAttributes[i]
            }
            ,
            t.prototype.saveOldAttributes = function(t) {
                if (null == this.oldAttributes[t]) {
                    var e = this.saveAttributes(t);
                    null != e && (this.oldAttributes[t] = e)
                }
            }
            ,
            t.prototype.saveAttributes = function(t) {
                var e = o.default.instance.getObjectEditAttribute(t);
                if (null != e) {
                    for (var i = new Dictionary, r = 0; r < e.length; r++) {
                        var a = e[r];
                        i[a.attribute] = new n.default(t,a.attribute,t[a.attribute])
                    }
                    return i
                }
                return null
            }
            ,
            t.prototype.saveChageAttributes = function(t) {
                var e = this.oldAttributes[t];
                if (null != e) {
                    var i = new Array;
                    for (var o in e) {
                        var r = e[o];
                        if (t[r.attribute] != r.value) {
                            var a = new n.default(t,r.attribute,r.value);
                            i.push(a),
                            r.value = t[r.attribute]
                        }
                    }
                    i.length > 0 && this.addMemento(i)
                }
            }
            ,
            e = __decorate([a], t)
        }());
        i.default = s,
        cc._RF.pop()
    }
    , {
        "../attribute/AttributeUtils": "AttributeUtils",
        "./Memento": "Memento"
    }],
    Characrer: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "a31d8orpoxPYKsGw0i3RXkt", "Characrer"),
        Object.defineProperty(i, "__esModule", {
            value: !0
        }),
        i.CharactorState = void 0;
        var o, n = t("./MovieClip"), r = t("../road/PathFindingAgent"), a = t("./NavAgent"), s = cc._decorator, c = s.ccclass;
        s.property,
        function(t) {
            t[t.stand = 0] = "stand",
            t[t.run = 1] = "run",
            t[t.sitdown = 2] = "sitdown",
            t[t.sitdown_run = 3] = "sitdown_run"
        }(o = i.CharactorState || (i.CharactorState = {}));
        var h = function(t) {
            function e() {
                var e = null !== t && t.apply(this, arguments) || this;
                return e._movieClip = null,
                e._direction = 0,
                e._state = 0,
                e._alpha = 1,
                e.moveSpeed = 200,
                e._navAgent = null,
                e
            }
            return __extends(e, t),
            Object.defineProperty(e.prototype, "movieClip", {
                get: function() {
                    return this._movieClip || (this._movieClip = this.getComponent(n.default)),
                    this._movieClip
                },
                enumerable: !1,
                configurable: !0
            }),
            Object.defineProperty(e.prototype, "direction", {
                get: function() {
                    return this._direction
                },
                set: function(t) {
                    this._direction = t,
                    t > 4 ? (this.movieClip.rowIndex = 4 - t % 4,
                    this.node.scaleX = -1) : (this.movieClip.rowIndex = t,
                    this.node.scaleX = 1)
                },
                enumerable: !1,
                configurable: !0
            }),
            Object.defineProperty(e.prototype, "state", {
                get: function() {
                    return this._state
                },
                set: function(t) {
                    switch (this._state = t,
                    this._state) {
                    case o.stand:
                        this.movieClip.begin = 0,
                        this.movieClip.end = 6;
                        break;
                    case o.run:
                        this.movieClip.begin = 6,
                        this.movieClip.end = 12;
                        break;
                    case o.sitdown:
                        this.movieClip.begin = 12,
                        this.movieClip.end = 18;
                        break;
                    case o.sitdown_run:
                        this.movieClip.begin = 18,
                        this.movieClip.end = 24
                    }
                },
                enumerable: !1,
                configurable: !0
            }),
            Object.defineProperty(e.prototype, "alpha", {
                get: function() {
                    return this._alpha
                },
                set: function(t) {
                    this._alpha = t,
                    this.node.opacity = Math.floor(t / 1 * 255)
                },
                enumerable: !1,
                configurable: !0
            }),
            Object.defineProperty(e.prototype, "roadNode", {
                get: function() {
                    return r.default.instance.getRoadNodeByPixel(this.node.x, this.node.y)
                },
                enumerable: !1,
                configurable: !0
            }),
            Object.defineProperty(e.prototype, "navAgent", {
                get: function() {
                    return null == this._navAgent && (this._navAgent = this.getComponent(a.default),
                    null == this._navAgent && (this._navAgent = this.addComponent(a.default))),
                    this._navAgent
                },
                enumerable: !1,
                configurable: !0
            }),
            e.prototype.start = function() {
                this.direction = 0,
                this.state = 3
            }
            ,
            e.prototype.update = function() {
                this.setPlayerStateByNode()
            }
            ,
            e.prototype.setPlayerStateByNode = function() {
                var t = r.default.instance.getRoadNodeByPixel(this.node.x, this.node.y);
                if (t != this._currentNode && (this._currentNode = t,
                this._currentNode))
                    switch (this._currentNode.value) {
                    case 2:
                        .4 != this.alpha && (this.alpha = .4);
                        break;
                    case 3:
                        this.alpha > 0 && (this.alpha = 0);
                        break;
                    default:
                        this.alpha < 1 && (this.alpha = 1)
                    }
            }
            ,
            e.prototype.rotateToPos = function(t, e) {
                var i = t - this.node.x
                  , o = e - this.node.y
                  , n = Math.atan2(o, i)
                  , r = Math.round((-n + Math.PI) / (Math.PI / 4));
                this.direction = r > 5 ? r - 6 : r + 2
            }
            ,
            e.prototype.setFaceDir = function(t) {
                var e = Math.atan2(t.y, t.x)
                  , i = Math.round((-e + Math.PI) / (Math.PI / 4));
                this.direction = i > 5 ? i - 6 : i + 2
            }
            ,
            e.prototype.getRoundRoadNodes = function() {
                return r.default.instance.getRoundRoadNodes(this.roadNode)
            }
            ,
            __decorate([c], e)
        }(cc.Component);
        i.default = h,
        cc._RF.pop()
    }
    , {
        "../road/PathFindingAgent": "PathFindingAgent",
        "./MovieClip": "MovieClip",
        "./NavAgent": "NavAgent"
    }],
    Charactor: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "cbc16hPLjJAiKeEPBR8m28x", "Charactor"),
        Object.defineProperty(i, "__esModule", {
            value: !0
        }),
        i.CharactorState = void 0;
        var o, n = t("./MovieClip"), r = cc._decorator, a = r.ccclass;
        r.property,
        function(t) {
            t[t.stand = 0] = "stand",
            t[t.run = 1] = "run",
            t[t.sitdown = 2] = "sitdown",
            t[t.sitdown_run = 3] = "sitdown_run"
        }(o = i.CharactorState || (i.CharactorState = {}));
        var s = function(t) {
            function e() {
                var e = null !== t && t.apply(this, arguments) || this;
                return e._movieClip = null,
                e._direction = 0,
                e._state = 0,
                e._alpha = 1,
                e.sceneMap = null,
                e.moving = !1,
                e.moveSpeed = 200,
                e._moveAngle = 0,
                e._roadNodeArr = [],
                e._nodeIndex = 0,
                e
            }
            return __extends(e, t),
            Object.defineProperty(e.prototype, "movieClip", {
                get: function() {
                    return this._movieClip || (this._movieClip = this.getComponentInChildren(n.default)),
                    this._movieClip
                },
                enumerable: !1,
                configurable: !0
            }),
            Object.defineProperty(e.prototype, "direction", {
                get: function() {
                    return this._direction
                },
                set: function(t) {
                    this._direction = t,
                    t > 4 ? (this.movieClip.rowIndex = 4 - t % 4,
                    this.movieClip.node.scaleX = -1) : (this.movieClip.rowIndex = t,
                    this.movieClip.node.scaleX = 1)
                },
                enumerable: !1,
                configurable: !0
            }),
            Object.defineProperty(e.prototype, "state", {
                get: function() {
                    return this._state
                },
                set: function(t) {
                    switch (this._state = t,
                    this._state) {
                    case o.stand:
                        this.movieClip.begin = 0,
                        this.movieClip.end = 6;
                        break;
                    case o.run:
                        this.movieClip.begin = 6,
                        this.movieClip.end = 12;
                        break;
                    case o.sitdown:
                        this.movieClip.begin = 12,
                        this.movieClip.end = 18;
                        break;
                    case o.sitdown_run:
                        this.movieClip.begin = 18,
                        this.movieClip.end = 24
                    }
                },
                enumerable: !1,
                configurable: !0
            }),
            Object.defineProperty(e.prototype, "alpha", {
                get: function() {
                    return this._alpha
                },
                set: function(t) {
                    this._alpha = t,
                    this.node.opacity = Math.floor(t / 1 * 255)
                },
                enumerable: !1,
                configurable: !0
            }),
            e.prototype.start = function() {
                this.direction = 0,
                this.state = 3
            }
            ,
            e.prototype.update = function(t) {
                if (this.moving) {
                    var e = this._roadNodeArr[this._nodeIndex]
                      , i = e.px - this.node.x
                      , o = e.py - this.node.y
                      , n = this.moveSpeed * t;
                    if (i * i + o * o > n * n) {
                        if (0 == this._moveAngle) {
                            this._moveAngle = Math.atan2(o, i);
                            var r = Math.round((-this._moveAngle + Math.PI) / (Math.PI / 4));
                            this.direction = r > 5 ? r - 6 : r + 2
                        }
                        var a = Math.cos(this._moveAngle) * n
                          , s = Math.sin(this._moveAngle) * n;
                        this.node.x += a,
                        this.node.y += s
                    } else
                        this._moveAngle = 0,
                        this._nodeIndex == this._roadNodeArr.length - 1 ? (this.node.x = e.px,
                        this.node.y = e.py,
                        this.stop()) : this.walk()
                }
                this.setPlayerStateByNode()
            }
            ,
            e.prototype.setPlayerStateByNode = function() {
                var t = this.sceneMap.getMapNodeByPixel(this.node.x, this.node.y);
                if (t != this._currentNode && (this._currentNode = t,
                this._currentNode))
                    switch (this._currentNode.value) {
                    case 2:
                        .4 != this.alpha && (this.alpha = .4);
                        break;
                    case 3:
                        this.alpha > 0 && (this.alpha = 0);
                        break;
                    default:
                        this.alpha < 1 && (this.alpha = 1)
                    }
            }
            ,
            e.prototype.walkByRoad = function(t) {
                this._roadNodeArr = t,
                this._nodeIndex = 0,
                this._moveAngle = 0,
                this.walk(),
                this.move()
            }
            ,
            e.prototype.walk = function() {
                this._nodeIndex < this._roadNodeArr.length - 1 && this._nodeIndex++
            }
            ,
            e.prototype.move = function() {
                this.moving = !0,
                this.state = o.run
            }
            ,
            e.prototype.stop = function() {
                this.moving = !1,
                this.state = o.stand
            }
            ,
            __decorate([a], e)
        }(cc.Component);
        i.default = s,
        cc._RF.pop()
    }
    , {
        "./MovieClip": "MovieClip"
    }],
    ColorSelector: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "ec27bUDFRtCrKmn3iJyY35R", "ColorSelector"),
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var o = cc._decorator
          , n = o.ccclass
          , r = o.property
          , a = function(t) {
            function e() {
                var e = null !== t && t.apply(this, arguments) || this;
                return e.colorBoard = null,
                e.value = "#ffffff",
                e.onColorChange = null,
                e
            }
            var i;
            return __extends(e, t),
            i = e,
            Object.defineProperty(e, "colorElement", {
                get: function() {
                    if (!this._colorElement) {
                        this._colorElement = document.createElement("input"),
                        this._colorElement.type = "color",
                        this._colorElement.id = "color";
                        var t = cc.view.getFrameSize()
                          , e = document.createElement("div");
                        e.style.position = "absolute",
                        e.style.left = t.width / 2 + "px",
                        e.style.top = t.height / 2 + "px",
                        e.style.visibility = "hidden",
                        e.appendChild(this._colorElement),
                        document.body.appendChild(e)
                    }
                    return this._colorElement
                },
                enumerable: !1,
                configurable: !0
            }),
            e.prototype.start = function() {
                var t = this;
                i.colorElement,
                this.node.on(cc.Node.EventType.TOUCH_START, function() {
                    i.colorElement.onchange = function() {
                        i.colorElement.parentElement.style.display = "inline",
                        t.setColor(i.colorElement.value),
                        t.onColorChange && t.onColorChange(t)
                    }
                    ,
                    i.colorElement.click()
                }, this)
            }
            ,
            e.prototype.setColor = function(t) {
                this.colorBoard.node.color = this.colorBoard.node.color.fromHEX(t)
            }
            ,
            e.prototype.getColor = function() {
                return this.colorBoard.node.color.toHEX("#rrggbb")
            }
            ,
            __decorate([r(cc.Sprite)], e.prototype, "colorBoard", void 0),
            __decorate([r()], e.prototype, "value", void 0),
            i = __decorate([n], e)
        }(cc.Component);
        i.default = a,
        cc._RF.pop()
    }
    , {}],
    ContentLayout: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "15eff+Gb7BFO6X2GYh2eL7K", "ContentLayout"),
        Object.defineProperty(i, "__esModule", {
            value: !0
        }),
        i.LayoutType = void 0;
        var o, n = t("./WinLayout"), r = cc._decorator, a = r.ccclass, s = r.property;
        (function(t) {
            t[t.horizontal = 0] = "horizontal",
            t[t.vertical = 1] = "vertical"
        }
        )(o = i.LayoutType || (i.LayoutType = {}));
        var c = function(t) {
            function e() {
                var e = null !== t && t.apply(this, arguments) || this;
                return e.layoutType = o.horizontal,
                e.cdtime = 0,
                e
            }
            return __extends(e, t),
            e.prototype.onLoad = function() {
                this.layout = this.getComponent(cc.Layout)
            }
            ,
            e.prototype.start = function() {
                for (var t = this.node.children.length, e = [], i = 0; i < t; i++) {
                    var r = this.node.children[i].getComponent(n.default);
                    null != r && e.push(r)
                }
                for (t = e.length,
                i = 0; i < t; i++) {
                    var a = null
                      , s = e[i]
                      , c = null;
                    i > 0 && (a = e[i - 1]),
                    i < t - 1 && (c = e[i + 1]),
                    this.layoutType == o.horizontal ? (s.leftWinLayout = a,
                    s.rightWinLayout = c) : (s.upWinLayout = a,
                    s.downWinLayout = c)
                }
            }
            ,
            e.prototype.update = function() {
                this.cdtime > 0 && (this.cdtime -= 1,
                this.cdtime <= 0 && (this.cdtime = 0,
                this.layout.resizeMode = cc.Layout.ResizeMode.NONE));
                for (var t = this.node.children.length, e = [], i = 0; i < t; i++)
                    this.node.children[i].active && e.push(this.node.children[i]);
                if (0 != (t = e.length)) {
                    1 == t && (e[0].width = this.node.width,
                    e[0].height = this.node.height);
                    var n = t - 1;
                    if (this.layoutType == o.horizontal) {
                        var r = e[n].x + e[n].width / 2;
                        r < this.node.width ? e[n].width = e[n].width + (this.node.width / 2 - r) : r > this.node.width && (this.layout.resizeMode = cc.Layout.ResizeMode.CHILDREN,
                        this.cdtime = 2)
                    }
                }
            }
            ,
            __decorate([s({
                type: cc.Enum(o)
            })], e.prototype, "layoutType", void 0),
            __decorate([a], e)
        }(cc.Component);
        i.default = c,
        cc._RF.pop()
    }
    , {
        "./WinLayout": "WinLayout"
    }],
    CreateMemento: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "22054usrfRK/I2FV1wXfJpv", "CreateMemento"),
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var o = function() {
            function t(t, e, i) {
                this._depath = 0,
                this._originator = t,
                this._parent = e,
                this._depath = i
            }
            return t.prototype.recover = function() {
                var t = this;
                this._originator.parent = this._parent,
                setTimeout(function() {
                    t._depath < t._parent.childrenCount && (t._originator.zIndex = t._depath)
                }, 50)
            }
            ,
            t.prototype.destroy = function() {
                this._originator = null,
                this._parent = null
            }
            ,
            t
        }();
        i.default = o,
        cc._RF.pop()
    }
    , {}],
    DragLayer: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "6ab1cF3OO5Mq7+dQJKj3Nq3", "DragLayer"),
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var o = t("./Layer")
          , n = cc._decorator
          , r = n.ccclass
          , a = (n.property,
        function(t) {
            function e() {
                return null !== t && t.apply(this, arguments) || this
            }
            return __extends(e, t),
            e.prototype.start = function() {}
            ,
            __decorate([r], e)
        }(o.default));
        i.default = a,
        cc._RF.pop()
    }
    , {
        "./Layer": "Layer"
    }],
    EditArea: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "0d505IXUiFCEqJGZtfbVaf7", "EditArea"),
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var o = t("../layer/MapLayer")
          , n = t("../layer/GridLayer")
          , r = t("../layer/RoadPointLayer")
          , a = t("../layer/EntityLayer")
          , s = t("../road/MapRoadUtils")
          , c = t("./MapEditor")
          , h = t("../road/Point")
          , d = t("../operation/KeyBoardExecute")
          , l = t("../layer/Layer")
          , p = t("./EditObject")
          , u = t("./Brush")
          , y = cc._decorator
          , f = y.ccclass
          , _ = y.property
          , g = function(t) {
            function e() {
                var e = null !== t && t.apply(this, arguments) || this;
                return e.windowedApplication = null,
                e.editStage = null,
                e.editObject = null,
                e.layer = null,
                e.mapLayer = null,
                e.gridLayer = null,
                e.roadPointLayer = null,
                e.entityLayer = null,
                e.dragLayer = null,
                e.brush = null,
                e._tempDic = {},
                e._lastEditorNode = null,
                e.targetZoom = 1,
                e.mapParams = null,
                e
            }
            return __extends(e, t),
            Object.defineProperty(e.prototype, "stageWidth", {
                get: function() {
                    return this.node.width * this.editStage.scale
                },
                enumerable: !1,
                configurable: !0
            }),
            Object.defineProperty(e.prototype, "stageHeight", {
                get: function() {
                    return this.node.height * this.editStage.scale
                },
                enumerable: !1,
                configurable: !0
            }),
            e.prototype.start = function() {
                this.node.on(cc.Node.EventType.MOUSE_MOVE, this.onShowRoadMsg, this),
                this.node.on(cc.Node.EventType.MOUSE_DOWN, this.onMouseDown, this),
                this.node.on(cc.Node.EventType.MOUSE_UP, this.onMouseUp, this),
                this.node.on(cc.Node.EventType.MOUSE_LEAVE, this.onMouseUp, this),
                this.node.on(cc.Node.EventType.MOUSE_WHEEL, this.onMouseWheel, this),
                this.mapLayer.node.on(cc.Node.EventType.MOUSE_UP, this.onMapMouseUp, this),
                this.windowedApplication.on(cc.Node.EventType.MOUSE_DOWN, this.onApplicationMouseDown, this),
                this.windowedApplication.on(cc.Node.EventType.MOUSE_UP, this.onApplicationMouseUp, this),
                this.windowedApplication.on(cc.Node.EventType.MOUSE_MOVE, this.onApplicationMouseMove, this),
                this.windowedApplication._touchListener && this.windowedApplication._touchListener.setSwallowTouches(!1),
                this.roadPointLayer.initSetting(),
                this.initKeyBoardFunction()
            }
            ,
            e.prototype.init = function(t) {
                this.mapParams = t,
                s.default.instance.updateMapInfo(t.mapWidth, t.mapHeight, t.ceilWidth, t.ceilHeight, t.mapType);
                var e = c.default.instance.editAreaView.width
                  , i = c.default.instance.editAreaView.height;
                this.node.width = t.mapWidth > e ? t.mapWidth : e,
                this.node.height = t.mapHeight > i ? t.mapHeight : i,
                this.mapLayer.init(t.mapWidth, t.mapHeight, 256, 256, t.bgTex),
                this.roadPointLayer.init(),
                this.gridLayer.drawGrid(t.mapWidth, t.mapHeight, t.ceilWidth, t.ceilHeight, t.mapType),
                this.editStage.scale = 1,
                this.setMapViewToPoint(0, 0),
                this.brush.drawBrushFocus()
            }
            ,
            e.prototype.initMapData = function(t) {
                this.roadPointLayer.initRoadPointInfo(t),
                this.entityLayer.initMapUintInfo(t)
            }
            ,
            e.prototype.clear = function() {
                this.mapLayer.clear(),
                this.roadPointLayer.clear(),
                this.entityLayer.clear(),
                this.editObject.clear(),
                this.clearAllEditorAreaExecute()
            }
            ,
            e.prototype.update = function() {
                this.dragLayer.node.scale = this.editStage.scale,
                c.default.instance.miniMapView.refreshViewRect(-this.editStage.x, -this.editStage.y)
            }
            ,
            e.prototype.setMapViewToPoint = function(t, e) {
                t *= this.editStage.scale,
                e *= this.editStage.scale,
                this.stageWidth <= c.default.instance.editAreaView.width ? this.editStage.x = 0 : t <= c.default.instance.editAreaView.width / 2 ? this.editStage.x = 0 : t >= this.stageWidth - c.default.instance.editAreaView.width / 2 ? this.editStage.x = -(this.stageWidth - c.default.instance.editAreaView.width) : this.editStage.x = -(t - c.default.instance.editAreaView.width / 2),
                this.stageHeight <= c.default.instance.editAreaView.height ? this.editStage.y = 0 : e <= c.default.instance.editAreaView.height / 2 ? this.editStage.y = 0 : e >= this.stageHeight - c.default.instance.editAreaView.height / 2 ? this.editStage.y = -(this.stageHeight - c.default.instance.editAreaView.height) : this.editStage.y = -(e - c.default.instance.editAreaView.height / 2);
                var i = -this.editStage.x
                  , o = -this.editStage.y;
                c.default.instance.miniMapView.refreshViewRect(i, o)
            }
            ,
            e.prototype.initKeyBoardFunction = function() {
                d.default.addKeyDownListener(this.addEnableNode, cc.macro.KEY.q, this),
                d.default.addKeyDownListener(this.addDisableNode, cc.macro.KEY.w, this),
                d.default.addKeyDownListener(this.addTransParentNode, cc.macro.KEY.e, this),
                d.default.addKeyDownListener(this.addTransferNode, cc.macro.KEY.r, this),
                d.default.addKeyDownListener(this.notDrawNode, cc.macro.KEY.t, this),
                d.default.addKeyDownListener(this.deleteNode, cc.macro.KEY.d, this),
                d.default.addKeyDownListener(this.clearAllEditorAreaExecute, cc.macro.KEY.s, this),
                d.default.addKeyDownListener(this.showMapLayer, cc.macro.KEY.u, this),
                d.default.addKeyDownListener(this.showRoadLayer, cc.macro.KEY.i, this),
                d.default.addKeyDownListener(this.showEntityLayer, cc.macro.KEY.o, this),
                d.default.addKeyDownListener(this.showGridLayer, cc.macro.KEY.p, this),
                d.default.addKeyDownListener(this.showMiniMap, cc.macro.KEY.f2, this),
                d.default.addKeyDownListener(this.setEditRoadModel, cc.macro.KEY.n, this),
                d.default.addKeyDownListener(this.setNormalRoadModel, cc.macro.KEY.m, this),
                d.default.addKeyDownListener(this.onKeyDelete, cc.macro.KEY.Delete, this),
                d.default.addKeyDownListener(this.onKeyDelete, cc.macro.KEY.backspace, this)
            }
            ,
            e.prototype.onShowRoadMsg = function(t) {
                var e = this.node.convertToNodeSpaceAR(t.getLocation())
                  , i = s.default.instance.getNodeByPixel(e.x, e.y);
                c.default.instance.editUI.pixelInfoTxt.string = "(" + Math.floor(i.px) + "," + Math.floor(i.py) + ")",
                c.default.instance.editUI.gridInfoTxt.string = "(" + i.dx + "," + i.dy + ")",
                c.default.instance.editUI.worldInfoTxt.string = "(" + i.cx + "," + i.cy + ")"
            }
            ,
            e.prototype.getHoneyPoint = function(t) {
                var e = t.cy + Math.ceil(t.cx / 2)
                  , i = t.cy - Math.floor(t.cx / 2);
                return new h.default(e,i)
            }
            ,
            e.prototype.onMouseDown = function(t) {
                t.target == this.node && (t.getButton() == cc.Event.EventMouse.BUTTON_LEFT ? (this._editorDownHandler && (this._editorDownHandler.apply(this, [t]),
                this._editorMoveHandler || (this._editorMoveHandler = this._editorDownHandler)),
                d.default.instance.pressSpace ? (this._tempDic._editorMoveHandler = this._editorMoveHandler,
                this._editorMoveHandler = this.onDragMap) : this._editorMoveHandler == this.onDragMap && (this._editorMoveHandler = this._editorDownHandler)) : t.getButton() == cc.Event.EventMouse.BUTTON_RIGHT ? (this._editorRightDownHandler && this._editorRightDownHandler.apply(this, [t]),
                this._tempDic._editorMoveHandler = this._editorMoveHandler,
                this._editorMoveHandler = this.onRemoveNodeHandler) : t.getButton() == cc.Event.EventMouse.BUTTON_MIDDLE && (this._tempDic._editorMoveHandler = this._editorMoveHandler,
                this._editorMoveHandler = this.onDragMap),
                this.node.on(cc.Node.EventType.MOUSE_MOVE, this.onMouseMove, this))
            }
            ,
            e.prototype.onMouseMove = function(t) {
                this._editorMoveHandler && this._editorMoveHandler.apply(this, [t])
            }
            ,
            e.prototype.onMouseUp = function(t) {
                t.getButton() == cc.Event.EventMouse.BUTTON_LEFT ? this._editorUpHandler && this._editorUpHandler.apply(this, [t]) : t.getButton() == cc.Event.EventMouse.BUTTON_RIGHT ? (this._editorRightUpHandler && this._editorRightUpHandler.apply(this, [t]),
                this._editorMoveHandler = this._tempDic._editorMoveHandler,
                this._tempDic._editorMoveHandler = null) : t.getButton() == cc.Event.EventMouse.BUTTON_MIDDLE && (this._editorMidUpHandler && this._editorMidUpHandler.apply(this, [t]),
                this._editorMoveHandler = this._tempDic._editorMoveHandler,
                this._tempDic._editorMoveHandler = null),
                this.node.hasEventListener(cc.Node.EventType.MOUSE_MOVE) && this.node.off(cc.Node.EventType.MOUSE_MOVE, this.onMouseMove, this)
            }
            ,
            e.prototype.onMouseWheel = function(t) {
                t.getScrollY() > 0 ? this.zoomMap(.1, t) : this.zoomMap(-.1, t)
            }
            ,
            e.prototype.onMapMouseUp = function() {
                this.editObject.releaseEditObject()
            }
            ,
            e.prototype.zoomMap = function(t, e) {
                this.targetZoom = this.editStage.scale + t;
                var i = c.default.instance.editAreaView.width
                  , o = c.default.instance.editAreaView.height
                  , n = Math.max(i / this.node.width, o / this.node.height);
                this.targetZoom > 2 && (this.targetZoom = 2),
                this.targetZoom < n && (this.targetZoom = n);
                var r = e.getLocation()
                  , a = this.editStage.convertToNodeSpaceAR(r);
                this.editStage.scale = this.targetZoom;
                var s = this.editStage.convertToWorldSpaceAR(new cc.Vec2(a.x,a.y))
                  , h = new cc.Vec2(r.x - s.x,r.y - s.y);
                this.editStage.x += h.x,
                this.editStage.y += h.y,
                this.updateStagePos()
            }
            ,
            e.prototype.onApplicationMouseDown = function(t) {
                null != this._appDownHandler && this._appDownHandler.apply(null, [t])
            }
            ,
            e.prototype.onApplicationMouseUp = function(t) {
                null != this._appUpHandler && this._appUpHandler.apply(this, [t]),
                this.node.hasEventListener(cc.Node.EventType.MOUSE_MOVE) && this.node.off(cc.Node.EventType.MOUSE_MOVE, this.onMouseMove, this)
            }
            ,
            e.prototype.onApplicationMouseMove = function(t) {
                this.dragLayer.onMouseMove(t)
            }
            ,
            e.prototype.addEnableNode = function() {
                this._editorDownHandler = this.onAddEnableNodeHandler,
                this._editorMoveHandler = this.onAddEnableNodeHandler,
                this._editorRightDownHandler = this.onRemoveNodeHandler,
                this._editorUpHandler = this.clearLastEditorNode,
                this._editorRightUpHandler = this.clearLastEditorNode
            }
            ,
            e.prototype.addDisableNode = function() {
                this._editorDownHandler = this.onAddDisableNodeHandler,
                this._editorMoveHandler = this.onAddDisableNodeHandler,
                this._editorRightDownHandler = this.onRemoveNodeHandler,
                this._editorUpHandler = this.clearLastEditorNode,
                this._editorRightUpHandler = this.clearLastEditorNode
            }
            ,
            e.prototype.addTransParentNode = function() {
                this._editorDownHandler = this.onAddTransParentNodeHandler,
                this._editorMoveHandler = this.onAddTransParentNodeHandler,
                this._editorRightDownHandler = this.onRemoveNodeHandler,
                this._editorUpHandler = this.clearLastEditorNode,
                this._editorRightUpHandler = this.clearLastEditorNode
            }
            ,
            e.prototype.addTransferNode = function() {
                this._editorDownHandler = this.onAddTransferNodeHandler,
                this._editorMoveHandler = this.onAddTransferNodeHandler,
                this._editorRightDownHandler = this.onRemoveNodeHandler,
                this._editorUpHandler = this.clearLastEditorNode,
                this._editorRightUpHandler = this.clearLastEditorNode
            }
            ,
            e.prototype.deleteNode = function() {
                this._editorDownHandler = this.onRemoveNodeHandler,
                this._editorMoveHandler = this.onRemoveNodeHandler
            }
            ,
            e.prototype.notDrawNode = function() {
                this._editorDownHandler = null,
                this._editorMoveHandler = null
            }
            ,
            e.prototype.showMapLayer = function() {
                this.mapLayer.node.active = !this.mapLayer.node.active,
                c.default.instance.editUI.msBtn.getComponentInChildren(cc.Label).string = this.mapLayer.node.active ? "Hide Map (U)" : "Show Map (U)"
            }
            ,
            e.prototype.showEntityLayer = function() {
                this.entityLayer.node.active = !this.entityLayer.node.active,
                c.default.instance.editUI.esBtn.getComponentInChildren(cc.Label).string = this.entityLayer.node.active ? "Hide Objects (O)" : "Show Objects (O)"
            }
            ,
            e.prototype.showRoadLayer = function() {
                this.roadPointLayer.node.active = !this.roadPointLayer.node.active,
                c.default.instance.editUI.rsBtn.getComponentInChildren(cc.Label).string = this.roadPointLayer.node.active ? "Hide Nodes (I)" : "Show Nodes (I)"
            }
            ,
            e.prototype.showGridLayer = function() {
                this.gridLayer.node.active = !this.gridLayer.node.active,
                c.default.instance.editUI.gsBtn.getComponentInChildren(cc.Label).string = this.gridLayer.node.active ? "Hide Grid (P)" : "Show Grid (P)"
            }
            ,
            e.prototype.showMiniMap = function() {
                c.default.instance.miniMapView.open()
            }
            ,
            e.prototype.setEditRoadModel = function() {
                this.entityLayer.node.opacity = 200,
                this.entityLayer.mouseChildren = !1;
                var t = this.entityLayer.node.getSiblingIndex()
                  , e = this.gridLayer.node.getSiblingIndex();
                e < t && (this.entityLayer.node.setSiblingIndex(e),
                this.gridLayer.node.setSiblingIndex(t))
            }
            ,
            e.prototype.setNormalRoadModel = function() {
                this.entityLayer.node.opacity = 255,
                this.entityLayer.mouseChildren = !0;
                var t = this.entityLayer.node.getSiblingIndex()
                  , e = this.gridLayer.node.getSiblingIndex();
                t < e && (this.entityLayer.node.setSiblingIndex(e),
                this.gridLayer.node.setSiblingIndex(t))
            }
            ,
            e.prototype.onKeyDelete = function() {
                this.editObject.delectObject()
            }
            ,
            e.prototype.onAddNodeHandler = function(t, e) {
                var i, o = this.node.convertToNodeSpaceAR(t.getLocation()), n = s.default.instance.getNodeByPixel(o.x, o.y);
                (n.value = e,
                this._lastEditorNode && this._lastEditorNode.dx == n.dx && this._lastEditorNode.dy == n.dy && this._lastEditorNode.value == n.value || (this._lastEditorNode = n,
                d.default.instance.pressSpace)) || (i = this.getBrushInk(n),
                this.roadPointLayer.addRoadPoints(i))
            }
            ,
            e.prototype.onAddEnableNodeHandler = function(t) {
                this.onAddNodeHandler(t, 0)
            }
            ,
            e.prototype.onAddDisableNodeHandler = function(t) {
                this.onAddNodeHandler(t, 1)
            }
            ,
            e.prototype.onAddTransParentNodeHandler = function(t) {
                this.onAddNodeHandler(t, 2)
            }
            ,
            e.prototype.onAddTransferNodeHandler = function(t) {
                this.onAddNodeHandler(t, 3)
            }
            ,
            e.prototype.onRemoveNodeHandler = function(t) {
                var e, i = this.node.convertToNodeSpaceAR(t.getLocation()), o = s.default.instance.getNodeByPixel(i.x, i.y);
                this._lastEditorNode && this._lastEditorNode.dx == o.dx && this._lastEditorNode.dy == o.dy && this._lastEditorNode.value == o.value || (this._lastEditorNode = o,
                d.default.instance.pressSpace) || (e = this.getBrushInk(o),
                this.roadPointLayer.removeRoadPoints(e))
            }
            ,
            e.prototype.clearLastEditorNode = function() {
                this._lastEditorNode = null
            }
            ,
            e.prototype.getBrushInk = function(t) {
                return this.brush.getBrushInk(t)
            }
            ,
            e.prototype.onDragMap = function(t) {
                var e = t.getDelta();
                this.editStage.x += e.x,
                this.editStage.y += e.y,
                this.updateStagePos()
            }
            ,
            e.prototype.updateStagePos = function() {
                var t = this.stageWidth - c.default.instance.editAreaView.width
                  , e = this.stageHeight - c.default.instance.editAreaView.height;
                this.editStage.x > 0 && (this.editStage.x = 0),
                this.editStage.x < -t && (this.editStage.x = -t),
                this.editStage.y > 0 && (this.editStage.y = 0),
                this.editStage.y < -e && (this.editStage.y = -e)
            }
            ,
            e.prototype.clearAllEditorAreaExecute = function() {
                this._editorMoveHandler = null,
                this._editorDownHandler = null,
                this._editorUpHandler = null,
                this._editorRightDownHandler = null,
                this._editorRightUpHandler = null,
                this._editorMidUpHandler = null
            }
            ,
            __decorate([_(cc.Node)], e.prototype, "windowedApplication", void 0),
            __decorate([_(cc.Node)], e.prototype, "editStage", void 0),
            __decorate([_(p.default)], e.prototype, "editObject", void 0),
            __decorate([_(cc.Node)], e.prototype, "layer", void 0),
            __decorate([_(o.default)], e.prototype, "mapLayer", void 0),
            __decorate([_(n.default)], e.prototype, "gridLayer", void 0),
            __decorate([_(r.default)], e.prototype, "roadPointLayer", void 0),
            __decorate([_(a.default)], e.prototype, "entityLayer", void 0),
            __decorate([_(l.default)], e.prototype, "dragLayer", void 0),
            __decorate([_(u.default)], e.prototype, "brush", void 0),
            __decorate([f], e)
        }(cc.Component);
        i.default = g,
        cc._RF.pop()
    }
    , {
        "../layer/EntityLayer": "EntityLayer",
        "../layer/GridLayer": "GridLayer",
        "../layer/Layer": "Layer",
        "../layer/MapLayer": "MapLayer",
        "../layer/RoadPointLayer": "RoadPointLayer",
        "../operation/KeyBoardExecute": "KeyBoardExecute",
        "../road/MapRoadUtils": "MapRoadUtils",
        "../road/Point": "Point",
        "./Brush": "Brush",
        "./EditObject": "EditObject",
        "./MapEditor": "MapEditor"
    }],
    EditBrushSelector: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "7e817d0aatAMJpUMOjiiPuW", "EditBrushSelector"),
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var o = cc._decorator
          , n = o.ccclass
          , r = o.property
          , a = function(t) {
            function e() {
                var e = null !== t && t.apply(this, arguments) || this;
                return e.Bg = null,
                e.selectState = null,
                e.icon = null,
                e._selected = !1,
                e._size = 0,
                e
            }
            return __extends(e, t),
            Object.defineProperty(e.prototype, "selected", {
                get: function() {
                    return this._selected
                },
                set: function(t) {
                    this.selectState.active = t,
                    this._selected = t
                },
                enumerable: !1,
                configurable: !0
            }),
            Object.defineProperty(e.prototype, "size", {
                get: function() {
                    return this._size
                },
                set: function(t) {
                    this._size = t,
                    this.icon.node.scale = 1 + t / 5
                },
                enumerable: !1,
                configurable: !0
            }),
            e.prototype.start = function() {}
            ,
            e.prototype.init = function() {}
            ,
            __decorate([r(cc.Node)], e.prototype, "Bg", void 0),
            __decorate([r(cc.Node)], e.prototype, "selectState", void 0),
            __decorate([r(cc.Sprite)], e.prototype, "icon", void 0),
            __decorate([n], e)
        }(cc.Component);
        i.default = a,
        cc._RF.pop()
    }
    , {}],
    EditBrush: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "a90b3La5gNDnp5tuWF1eDsU", "EditBrush"),
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var o = t("../EditWin")
          , n = t("../../editor/MapEditor")
          , r = t("./EditBrushSelector")
          , a = cc._decorator
          , s = a.ccclass
          , c = a.property
          , h = function(t) {
            function e() {
                var e = null !== t && t.apply(this, arguments) || this;
                return e.selectorItem = null,
                e.lastItem = null,
                e.currentItem = null,
                e.itemList = [],
                e
            }
            return __extends(e, t),
            e.prototype.start = function() {}
            ,
            e.prototype.onShiftKeyDown = function() {
                null != this.currentItem && (this.currentItem.selected = !1);
                var t = this.itemList[2];
                this.currentItem = t,
                this.currentItem.selected = !0,
                n.default.instance.editArea.brush.size = t.size,
                n.default.instance.editArea.brush.drawBrushFocus()
            }
            ,
            e.prototype.onShiftKeyUp = function() {
                if (null != this.lastItem) {
                    null != this.currentItem && (this.currentItem.selected = !1);
                    var t = this.lastItem;
                    this.currentItem = t,
                    this.currentItem.selected = !0,
                    n.default.instance.editArea.brush.size = t.size,
                    n.default.instance.editArea.brush.drawBrushFocus()
                }
            }
            ,
            e.prototype.init = function() {
                for (var t = this, e = function(e) {
                    var o = i.itemList[e];
                    o || (o = i.getItem(),
                    i.itemList.push(o),
                    o.node.on(cc.Node.EventType.TOUCH_START, function() {
                        null != t.currentItem && (t.currentItem.selected = !1),
                        t.currentItem = o,
                        t.currentItem.selected = !0,
                        t.lastItem = t.currentItem,
                        n.default.instance.editArea.brush.size = o.size,
                        n.default.instance.editArea.brush.drawBrushFocus()
                    }, i)),
                    o.init(),
                    o.size = e,
                    o.selected = !1
                }, i = this, o = 0; o < 5; o++)
                    e(o);
                this.currentItem = this.itemList[0],
                this.currentItem.selected = !0,
                this.lastItem = this.currentItem
            }
            ,
            e.prototype.getItem = function() {
                var t = cc.instantiate(this.selectorItem.node).getComponent(r.default);
                return t.node.parent = this.scrollContent,
                t.selected = !1,
                t.node.active = !0,
                t
            }
            ,
            __decorate([c(r.default)], e.prototype, "selectorItem", void 0),
            __decorate([s], e)
        }(o.default);
        i.default = h,
        cc._RF.pop()
    }
    , {
        "../../editor/MapEditor": "MapEditor",
        "../EditWin": "EditWin",
        "./EditBrushSelector": "EditBrushSelector"
    }],
    EditMonsterSelector: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "ae4742OYe9A2ow5P0vJoX+v", "EditMonsterSelector"),
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var o = cc._decorator
          , n = o.ccclass
          , r = o.property
          , a = function(t) {
            function e() {
                var e = null !== t && t.apply(this, arguments) || this;
                return e.Bg = null,
                e.selectState = null,
                e.descLabel = null,
                e.npcIcon = null,
                e.npcIconSkin = [],
                e.descNames = [],
                e.monsterType = 0,
                e._selected = !1,
                e
            }
            return __extends(e, t),
            Object.defineProperty(e.prototype, "selected", {
                get: function() {
                    return this._selected
                },
                set: function(t) {
                    this.selectState.active = t,
                    this._selected = t
                },
                enumerable: !1,
                configurable: !0
            }),
            e.prototype.start = function() {}
            ,
            e.prototype.init = function() {
                this.npcIcon.spriteFrame = this.npcIconSkin[this.monsterType],
                this.descLabel.string = this.descNames[this.monsterType] + ""
            }
            ,
            __decorate([r(cc.Node)], e.prototype, "Bg", void 0),
            __decorate([r(cc.Node)], e.prototype, "selectState", void 0),
            __decorate([r(cc.Label)], e.prototype, "descLabel", void 0),
            __decorate([r(cc.Sprite)], e.prototype, "npcIcon", void 0),
            __decorate([r(cc.SpriteFrame)], e.prototype, "npcIconSkin", void 0),
            __decorate([r({
                type: cc.String
            })], e.prototype, "descNames", void 0),
            __decorate([n], e)
        }(cc.Component);
        i.default = a,
        cc._RF.pop()
    }
    , {}],
    EditMonster: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "f88eemQodVHNbXCKiPGY6D2", "EditMonster"),
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var o = t("../EditWin")
          , n = t("../../editor/MapEditor")
          , r = t("./EditMonsterSelector")
          , a = cc._decorator
          , s = a.ccclass
          , c = a.property
          , h = function(t) {
            function e() {
                var e = null !== t && t.apply(this, arguments) || this;
                return e.selectorItem = null,
                e.currentItem = null,
                e.itemList = [],
                e
            }
            return __extends(e, t),
            e.prototype.start = function() {
                this.init()
            }
            ,
            e.prototype.init = function() {
                for (var t = this, e = function(e) {
                    var o = i.itemList[e];
                    o || (o = i.getItem(),
                    i.itemList.push(o),
                    o.node.on(cc.Node.EventType.TOUCH_START, function() {
                        null != t.currentItem && (t.currentItem.selected = !1),
                        t.currentItem = o,
                        t.currentItem.selected = !0,
                        n.default.instance.editArea.editObject.placeMonster(t.currentItem.monsterType)
                    }, i)),
                    o.monsterType = e,
                    o.init(),
                    o.selected = !1
                }, i = this, o = 0; o < 4; o++)
                    e(o)
            }
            ,
            e.prototype.getItem = function() {
                var t = cc.instantiate(this.selectorItem.node).getComponent(r.default);
                return t.node.parent = this.scrollContent,
                t.selected = !1,
                t.node.active = !0,
                t
            }
            ,
            __decorate([c(r.default)], e.prototype, "selectorItem", void 0),
            __decorate([s], e)
        }(o.default);
        i.default = h,
        cc._RF.pop()
    }
    , {
        "../../editor/MapEditor": "MapEditor",
        "../EditWin": "EditWin",
        "./EditMonsterSelector": "EditMonsterSelector"
    }],
    EditNpcSelector: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "a4f71wl1etFgpls7WPmAYUq", "EditNpcSelector"),
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var o = cc._decorator
          , n = o.ccclass
          , r = o.property
          , a = function(t) {
            function e() {
                var e = null !== t && t.apply(this, arguments) || this;
                return e.Bg = null,
                e.selectState = null,
                e.descLabel = null,
                e.npcIcon = null,
                e.npcIconSkin = [],
                e.descNames = [],
                e.npcType = 0,
                e._selected = !1,
                e
            }
            return __extends(e, t),
            Object.defineProperty(e.prototype, "selected", {
                get: function() {
                    return this._selected
                },
                set: function(t) {
                    this.selectState.active = t,
                    this._selected = t
                },
                enumerable: !1,
                configurable: !0
            }),
            e.prototype.start = function() {}
            ,
            e.prototype.init = function() {
                this.npcIcon.spriteFrame = this.npcIconSkin[this.npcType],
                this.descLabel.string = this.descNames[this.npcType] + ".NPC"
            }
            ,
            __decorate([r(cc.Node)], e.prototype, "Bg", void 0),
            __decorate([r(cc.Node)], e.prototype, "selectState", void 0),
            __decorate([r(cc.Label)], e.prototype, "descLabel", void 0),
            __decorate([r(cc.Sprite)], e.prototype, "npcIcon", void 0),
            __decorate([r(cc.SpriteFrame)], e.prototype, "npcIconSkin", void 0),
            __decorate([r({
                type: cc.String
            })], e.prototype, "descNames", void 0),
            __decorate([n], e)
        }(cc.Component);
        i.default = a,
        cc._RF.pop()
    }
    , {}],
    EditNpc: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "0653d/QMgxPTZRZgplmcNOV", "EditNpc"),
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var o = t("../EditWin")
          , n = t("../../editor/MapEditor")
          , r = t("./EditNpcSelector")
          , a = cc._decorator
          , s = a.ccclass
          , c = a.property
          , h = function(t) {
            function e() {
                var e = null !== t && t.apply(this, arguments) || this;
                return e.selectorItem = null,
                e.currentItem = null,
                e.itemList = [],
                e
            }
            return __extends(e, t),
            e.prototype.start = function() {
                this.init()
            }
            ,
            e.prototype.init = function() {
                for (var t = this, e = function(e) {
                    var o = i.itemList[e];
                    o || (o = i.getItem(),
                    i.itemList.push(o),
                    o.node.on(cc.Node.EventType.TOUCH_START, function() {
                        null != t.currentItem && (t.currentItem.selected = !1),
                        t.currentItem = o,
                        t.currentItem.selected = !0,
                        n.default.instance.editArea.editObject.placeNpc(t.currentItem.npcType)
                    }, i)),
                    o.npcType = e,
                    o.init(),
                    o.selected = !1
                }, i = this, o = 0; o < 4; o++)
                    e(o)
            }
            ,
            e.prototype.getItem = function() {
                var t = cc.instantiate(this.selectorItem.node).getComponent(r.default);
                return t.node.parent = this.scrollContent,
                t.selected = !1,
                t.node.active = !0,
                t
            }
            ,
            __decorate([c(r.default)], e.prototype, "selectorItem", void 0),
            __decorate([s], e)
        }(o.default);
        i.default = h,
        cc._RF.pop()
    }
    , {
        "../../editor/MapEditor": "MapEditor",
        "../EditWin": "EditWin",
        "./EditNpcSelector": "EditNpcSelector"
    }],
    EditObject: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "88d44UiuGlPcr6Yjk6s3Qol", "EditObject"),
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var o = t("../../../editor/EditorElement/EditorElement")
          , n = t("../../../editor/mapUnit/MapUnitLibrary")
          , r = t("../editorTool/editProperty/PropertyPanel")
          , a = t("../road/MapRoadUtils")
          , s = t("./EditArea")
          , c = t("./MapEditor")
          , h = cc._decorator
          , d = h.ccclass
          , l = h.property
          , p = function(t) {
            function e() {
                var e = null !== t && t.apply(this, arguments) || this;
                return e.propertyPanel = null,
                e._editArea = null,
                e._brushObj = null,
                e._selectObj = null,
                e.dragDir = new cc.Vec2(0,0),
                e
            }
            return __extends(e, t),
            e.prototype.start = function() {
                this._editArea = this.getComponent(s.default),
                this._editArea.entityLayer.editObject = this,
                this._editArea.entityLayer.initCallback(this.propertyEditor, this.onLeftClickObject, null, this.setBrush, this.onRightClickObject)
            }
            ,
            e.prototype.update = function() {
                this._brushObj && !this._brushObj.isDestroyed && (this._brushObj.node.x = this._editArea.dragLayer.mouseX + this.dragDir.x,
                this._brushObj.node.y = this._editArea.dragLayer.mouseY + this.dragDir.y)
            }
            ,
            e.prototype.setBrush = function(t, e) {
                if (void 0 === e && (e = !1),
                this._brushObj != t) {
                    this._brushObj = t;
                    var i = null;
                    if (this._brushObj.node.parent && (i = this._brushObj.node.parent.convertToWorldSpaceAR(new cc.Vec2(this._brushObj.node.x,this._brushObj.node.y)),
                    this._brushObj.node.parent == this._editArea.entityLayer.node ? this._editArea.entityLayer.removeMapUnit(this._brushObj) : this._brushObj.node.parent = null),
                    this._brushObj.node.parent = this._editArea.dragLayer.node,
                    i) {
                        var o = this._editArea.dragLayer.node.convertToNodeSpaceAR(new cc.Vec2(i.x,i.y));
                        this._brushObj.node.x = o.x,
                        this._brushObj.node.y = o.y
                    }
                    e ? (this._brushObj.node.x = this._editArea.dragLayer.mouseX,
                    this._brushObj.node.y = this._editArea.dragLayer.mouseY,
                    this.dragDir.x = 0,
                    this.dragDir.y = 0) : (this.dragDir.x = this._brushObj.node.x - this._editArea.dragLayer.mouseX,
                    this.dragDir.y = this._brushObj.node.y - this._editArea.dragLayer.mouseY),
                    this._brushObj.selected = !1,
                    this._brushObj.startDrag(),
                    this._editArea._tempDic._editorDownHandler = this._editArea._editorDownHandler,
                    this._editArea._tempDic._editorMoveHandler = this._editArea._editorMoveHandler,
                    this._editArea._editorDownHandler = null,
                    this._editArea._editorMoveHandler = null,
                    this._editArea.notDrawNode(),
                    this._editArea._appUpHandler = this.onDropDown.bind(this)
                }
            }
            ,
            e.prototype.onDropDown = function() {
                var t = this._brushObj.node.parent.convertToWorldSpaceAR(new cc.Vec2(this._brushObj.node.x,this._brushObj.node.y))
                  , e = c.default.instance.editAreaView.convertToNodeSpaceAR(t)
                  , i = this._editArea.entityLayer.node.convertToNodeSpaceAR(t);
                e.x > 0 && e.x < c.default.instance.editAreaView.width && e.y > 0 && e.y < c.default.instance.editAreaView.height && i.x > 0 && i.x < a.default.instance.mapWidth && i.y > 0 && i.y < a.default.instance.mapHeight ? (this._brushObj.node.position = i,
                this._brushObj.stopDrag(),
                this._editArea.entityLayer.addMapUnit(this._brushObj),
                this._editArea.entityLayer.setDepthRand(),
                this._editArea.entityLayer.registerEvent(this._brushObj),
                this.selectEditorObj(this._brushObj),
                this.selectMapUnit(this._brushObj),
                this._brushObj = null) : this.clear(),
                this._editArea._editorDownHandler = this._editArea._tempDic._editorDownHandler,
                this._editArea._editorMoveHandler = this._editArea._tempDic._editorMoveHandler,
                this._editArea._tempDic._editorClickHandler = null,
                this._editArea._tempDic._editorMoveHandler = null,
                this._editArea._appUpHandler = null
            }
            ,
            e.prototype.clearBrush = function() {
                null == this._brushObj || this._brushObj.isDestroyed || (this._editArea.entityLayer.removeMapUnit(this._brushObj),
                this._editArea.entityLayer.removeEvent(this._brushObj),
                this._brushObj.node.parent = null,
                this._brushObj.node.destroy(),
                this._brushObj = null)
            }
            ,
            e.prototype.releaseEditObject = function() {
                null == this._selectObj || this._selectObj.isDestroyed || (this._selectObj.selected = !1),
                this.propertyPanel.setEditorParam(null)
            }
            ,
            e.prototype.onLeftClickObject = function() {}
            ,
            e.prototype.onRightClickObject = function(t) {
                this.selectMapUnit(t),
                this.selectEditorObj(t)
            }
            ,
            e.prototype.propertyEditor = function(t) {
                this.selectMapUnit(t),
                this.selectEditorObj(t)
            }
            ,
            e.prototype.selectEditorObj = function(t) {
                this.propertyPanel.setEditorParam(t)
            }
            ,
            e.prototype.selectMapUnit = function(t) {
                null == this._selectObj || this._selectObj.isDestroyed || (this._selectObj.selected = !1),
                this._selectObj = t,
                this._selectObj.selected = !0
            }
            ,
            e.prototype.delectObject = function() {
                null == this._selectObj || this._selectObj.isDestroyed || (this._editArea.entityLayer.removeMapUnit(this._selectObj),
                this._editArea.entityLayer.removeEvent(this._selectObj),
                this._selectObj.node.parent = null,
                this._selectObj.destroySelf(),
                this._selectObj = null),
                this.propertyPanel.setEditorParam(null)
            }
            ,
            e.prototype.clear = function() {
                this.clearBrush(),
                this.delectObject()
            }
            ,
            e.prototype.placeNpc = function(t) {
                var e = n.default.instance.getNpcElement(t);
                this.setBrush(e, !0)
            }
            ,
            e.prototype.placeMonster = function(t) {
                var e = n.default.instance.getMonsterElement(t);
                this.setBrush(e, !0)
            }
            ,
            e.prototype.placeTransfer = function(t) {
                var e = n.default.instance.getTransferElement(t);
                this.setBrush(e, !0)
            }
            ,
            e.prototype.placeSpawnPoint = function() {
                var t = cc.instantiate(n.default.instance.spawnPointPrefab).getComponent(o.default);
                this.setBrush(t, !0)
            }
            ,
            __decorate([l(r.default)], e.prototype, "propertyPanel", void 0),
            __decorate([d], e)
        }(cc.Component);
        i.default = p,
        cc._RF.pop()
    }
    , {
        "../../../editor/EditorElement/EditorElement": "EditorElement",
        "../../../editor/mapUnit/MapUnitLibrary": "MapUnitLibrary",
        "../editorTool/editProperty/PropertyPanel": "PropertyPanel",
        "../road/MapRoadUtils": "MapRoadUtils",
        "./EditArea": "EditArea",
        "./MapEditor": "MapEditor"
    }],
    EditRoadSelector: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "188765Re9dMd4vvzXiAIRNU", "EditRoadSelector"),
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var o = cc._decorator
          , n = o.ccclass
          , r = o.property
          , a = function(t) {
            function e() {
                var e = null !== t && t.apply(this, arguments) || this;
                return e.Bg = null,
                e.selectState = null,
                e.descLabel = null,
                e._selected = !1,
                e
            }
            return __extends(e, t),
            Object.defineProperty(e.prototype, "selected", {
                get: function() {
                    return this._selected
                },
                set: function(t) {
                    this.selectState.active = t,
                    this._selected = t
                },
                enumerable: !1,
                configurable: !0
            }),
            e.prototype.start = function() {}
            ,
            e.prototype.init = function(t) {
                null != t && (this.roadSetData = t,
                this.descLabel.string = t.desc,
                this.setColor(t.color))
            }
            ,
            e.prototype.setColor = function(t) {
                this.Bg.color = this.Bg.color.fromHEX(t)
            }
            ,
            __decorate([r(cc.Node)], e.prototype, "Bg", void 0),
            __decorate([r(cc.Node)], e.prototype, "selectState", void 0),
            __decorate([r(cc.Label)], e.prototype, "descLabel", void 0),
            __decorate([n], e)
        }(cc.Component);
        i.default = a,
        cc._RF.pop()
    }
    , {}],
    EditRoad: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "36310gOHNJAyriSjtsUoImJ", "EditRoad"),
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var o = t("../EditWin")
          , n = t("../../editor/MapEditor")
          , r = t("../../ui/setting/SettingData")
          , a = t("./EditRoadSelector")
          , s = cc._decorator
          , c = s.ccclass
          , h = s.property
          , d = function(t) {
            function e() {
                var e = null !== t && t.apply(this, arguments) || this;
                return e.selectorItem = null,
                e.deleteItem = null,
                e.currentItem = null,
                e.itemList = [],
                e
            }
            return __extends(e, t),
            e.prototype.start = function() {
                var t = this;
                this.deleteItem.selected = !1,
                this.deleteItem.node.on(cc.Node.EventType.TOUCH_START, function() {
                    if (null != t.currentItem) {
                        if (t.currentItem == t.deleteItem && t.currentItem.selected)
                            return t.currentItem.selected = !1,
                            void n.default.instance.editArea.notDrawNode();
                        t.currentItem.selected = !1
                    }
                    t.currentItem = t.deleteItem,
                    t.currentItem.selected = !0,
                    n.default.instance.editArea.deleteNode()
                }, this),
                this.init(),
                cc.systemEvent.on("SettingApply", function() {
                    t.refresh()
                }, this)
            }
            ,
            e.prototype.init = function() {
                for (var t = this, e = r.default.instance.roadSetDatas.length, i = function(e) {
                    var i = o.itemList[e];
                    i || (i = o.getItem(),
                    o.itemList.push(i),
                    i.node.on(cc.Node.EventType.TOUCH_START, function() {
                        if (null != t.currentItem) {
                            if (t.currentItem == i && t.currentItem.selected)
                                return t.currentItem.selected = !1,
                                void n.default.instance.editArea.notDrawNode();
                            t.currentItem.selected = !1
                        }
                        switch (t.currentItem = i,
                        t.currentItem.selected = !0,
                        i.roadSetData.value) {
                        case 0:
                            n.default.instance.editArea.addEnableNode();
                            break;
                        case 1:
                            n.default.instance.editArea.addDisableNode();
                            break;
                        case 2:
                            n.default.instance.editArea.addTransParentNode();
                            break;
                        case 3:
                            n.default.instance.editArea.addTransferNode()
                        }
                    }, o)),
                    i.init(r.default.instance.roadSetDatas[e]),
                    i.selected = !1
                }, o = this, a = 0; a < e; a++)
                    i(a)
            }
            ,
            e.prototype.refresh = function() {
                for (var t = r.default.instance.roadSetDatas.length, e = 0; e < t; e++) {
                    var i = this.itemList[e];
                    i && i.init(r.default.instance.roadSetDatas[e])
                }
            }
            ,
            e.prototype.getItem = function() {
                var t = cc.instantiate(this.selectorItem.node).getComponent(a.default);
                return t.node.parent = this.scrollContent,
                t.selected = !1,
                t.node.active = !0,
                t
            }
            ,
            __decorate([h(a.default)], e.prototype, "selectorItem", void 0),
            __decorate([h(a.default)], e.prototype, "deleteItem", void 0),
            __decorate([c], e)
        }(o.default);
        i.default = d,
        cc._RF.pop()
    }
    , {
        "../../editor/MapEditor": "MapEditor",
        "../../ui/setting/SettingData": "SettingData",
        "../EditWin": "EditWin",
        "./EditRoadSelector": "EditRoadSelector"
    }],
    EditSpawnPointSelector: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "8fe75MUXvZLl5aClh9xLnuL", "EditSpawnPointSelector"),
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var o = cc._decorator
          , n = o.ccclass
          , r = o.property
          , a = function(t) {
            function e() {
                var e = null !== t && t.apply(this, arguments) || this;
                return e.Bg = null,
                e.selectState = null,
                e.descLabel = null,
                e._selected = !1,
                e
            }
            return __extends(e, t),
            Object.defineProperty(e.prototype, "selected", {
                get: function() {
                    return this._selected
                },
                set: function(t) {
                    this.selectState.active = t,
                    this._selected = t
                },
                enumerable: !1,
                configurable: !0
            }),
            e.prototype.start = function() {}
            ,
            e.prototype.init = function() {}
            ,
            __decorate([r(cc.Node)], e.prototype, "Bg", void 0),
            __decorate([r(cc.Node)], e.prototype, "selectState", void 0),
            __decorate([r(cc.Label)], e.prototype, "descLabel", void 0),
            __decorate([n], e)
        }(cc.Component);
        i.default = a,
        cc._RF.pop()
    }
    , {}],
    EditSpawnPoint: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "979b3tOL0dELYGWvwKrg2gP", "EditSpawnPoint"),
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var o = t("../EditWin")
          , n = t("../../editor/MapEditor")
          , r = t("./EditSpawnPointSelector")
          , a = cc._decorator
          , s = a.ccclass
          , c = a.property
          , h = function(t) {
            function e() {
                var e = null !== t && t.apply(this, arguments) || this;
                return e.selectorItem = null,
                e.currentItem = null,
                e.itemList = [],
                e
            }
            return __extends(e, t),
            e.prototype.start = function() {
                this.init()
            }
            ,
            e.prototype.init = function() {
                for (var t = this, e = function(e) {
                    var o = i.itemList[e];
                    o || (o = i.getItem(),
                    i.itemList.push(o),
                    o.node.on(cc.Node.EventType.TOUCH_START, function() {
                        null != t.currentItem && (t.currentItem.selected = !1),
                        t.currentItem = o,
                        t.currentItem.selected = !0,
                        n.default.instance.editArea.editObject.placeSpawnPoint()
                    }, i)),
                    o.init(),
                    o.selected = !1
                }, i = this, o = 0; o < 1; o++)
                    e(o)
            }
            ,
            e.prototype.getItem = function() {
                var t = cc.instantiate(this.selectorItem.node).getComponent(r.default);
                return t.node.parent = this.scrollContent,
                t.selected = !1,
                t.node.active = !0,
                t
            }
            ,
            __decorate([c(r.default)], e.prototype, "selectorItem", void 0),
            __decorate([s], e)
        }(o.default);
        i.default = h,
        cc._RF.pop()
    }
    , {
        "../../editor/MapEditor": "MapEditor",
        "../EditWin": "EditWin",
        "./EditSpawnPointSelector": "EditSpawnPointSelector"
    }],
    EditToolPanel: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "a4587WWcTpIDoZzyvMFNbL6", "EditToolPanel"),
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var o = t("../operation/KeyBoardExecute")
          , n = t("./EditWin")
          , r = cc._decorator
          , a = r.ccclass
          , s = r.property
          , c = function(t) {
            function e() {
                var e = null !== t && t.apply(this, arguments) || this;
                return e.titleTxt = null,
                e.editBrush = null,
                e.editRoad = null,
                e.editNpc = null,
                e.editMonster = null,
                e.editTransfer = null,
                e.editSpawnPoint = null,
                e.tabBtns = [],
                e.editWinArr = [],
                e
            }
            return __extends(e, t),
            e.prototype.onLoad = function() {
                this.editWinArr.push(this.editBrush),
                this.editWinArr.push(this.editRoad),
                this.editWinArr.push(this.editNpc),
                this.editWinArr.push(this.editMonster),
                this.editWinArr.push(this.editTransfer),
                this.editWinArr.push(this.editSpawnPoint)
            }
            ,
            e.prototype.start = function() {
                o.default.addKeyDownListener(this.onShiftKeyDown, cc.macro.KEY.shift, this, !1, !0, !1),
                o.default.addKeyUpListener(this.onShiftKeyUp, cc.macro.KEY.shift, this),
                this.editBrush.init(),
                this.openWin(null, 1)
            }
            ,
            e.prototype.onShiftKeyDown = function() {
                this.editBrush.onShiftKeyDown()
            }
            ,
            e.prototype.onShiftKeyUp = function() {
                this.editBrush.onShiftKeyUp()
            }
            ,
            e.prototype.openWin = function(t, e) {
                for (var i = 0; i < this.editWinArr.length; i++)
                    i == e ? (this.editWinArr[i].open(),
                    this.titleTxt.string = this.editWinArr[i].winName,
                    this.setTabBtnColor(i, "#f0f0f0")) : (this.editWinArr[i].close(),
                    this.setTabBtnColor(i, "#C5C5C5"))
            }
            ,
            e.prototype.setTabBtnColor = function(t, e) {
                if (this.tabBtns[t]) {
                    var i = this.tabBtns[t].node.getComponentInChildren(cc.Sprite);
                    i && (i.node.color = i.node.color.fromHEX(e))
                }
            }
            ,
            __decorate([s(cc.Label)], e.prototype, "titleTxt", void 0),
            __decorate([s(n.default)], e.prototype, "editBrush", void 0),
            __decorate([s(n.default)], e.prototype, "editRoad", void 0),
            __decorate([s(n.default)], e.prototype, "editNpc", void 0),
            __decorate([s(n.default)], e.prototype, "editMonster", void 0),
            __decorate([s(n.default)], e.prototype, "editTransfer", void 0),
            __decorate([s(n.default)], e.prototype, "editSpawnPoint", void 0),
            __decorate([s(cc.Button)], e.prototype, "tabBtns", void 0),
            __decorate([a], e)
        }(cc.Component);
        i.default = c,
        cc._RF.pop()
    }
    , {
        "../operation/KeyBoardExecute": "KeyBoardExecute",
        "./EditWin": "EditWin"
    }],
    EditTransferSelector: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "6b0ccWqhG5KV7yzNF2CUV+D", "EditTransferSelector"),
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var o = cc._decorator
          , n = o.ccclass
          , r = o.property
          , a = function(t) {
            function e() {
                var e = null !== t && t.apply(this, arguments) || this;
                return e.Bg = null,
                e.selectState = null,
                e.descLabel = null,
                e.transferIcon = null,
                e.transferIconSkin = [],
                e.descNames = [],
                e._selected = !1,
                e.transferType = 0,
                e
            }
            return __extends(e, t),
            Object.defineProperty(e.prototype, "selected", {
                get: function() {
                    return this._selected
                },
                set: function(t) {
                    this.selectState.active = t,
                    this._selected = t
                },
                enumerable: !1,
                configurable: !0
            }),
            e.prototype.start = function() {}
            ,
            e.prototype.init = function() {
                this.transferIcon.spriteFrame = this.transferIconSkin[this.transferType],
                this.descLabel.string = this.descNames[this.transferType] + ".\u4f20\u9001\u4eec"
            }
            ,
            __decorate([r(cc.Node)], e.prototype, "Bg", void 0),
            __decorate([r(cc.Node)], e.prototype, "selectState", void 0),
            __decorate([r(cc.Label)], e.prototype, "descLabel", void 0),
            __decorate([r(cc.Sprite)], e.prototype, "transferIcon", void 0),
            __decorate([r(cc.SpriteFrame)], e.prototype, "transferIconSkin", void 0),
            __decorate([r({
                type: cc.String
            })], e.prototype, "descNames", void 0),
            __decorate([n], e)
        }(cc.Component);
        i.default = a,
        cc._RF.pop()
    }
    , {}],
    EditTransfer: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "94bc6pNNjhEMJ+OeJq9K8Yh", "EditTransfer"),
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var o = t("../EditWin")
          , n = t("../../editor/MapEditor")
          , r = t("./EditTransferSelector")
          , a = cc._decorator
          , s = a.ccclass
          , c = a.property
          , h = function(t) {
            function e() {
                var e = null !== t && t.apply(this, arguments) || this;
                return e.selectorItem = null,
                e.currentItem = null,
                e.itemList = [],
                e
            }
            return __extends(e, t),
            e.prototype.start = function() {
                this.init()
            }
            ,
            e.prototype.init = function() {
                for (var t = this, e = function(e) {
                    var o = i.itemList[e];
                    o || (o = i.getItem(),
                    i.itemList.push(o),
                    o.node.on(cc.Node.EventType.TOUCH_START, function() {
                        null != t.currentItem && (t.currentItem.selected = !1),
                        t.currentItem = o,
                        t.currentItem.selected = !0,
                        n.default.instance.editArea.editObject.placeTransfer(t.currentItem.transferType)
                    }, i)),
                    o.transferType = e,
                    o.init(),
                    o.selected = !1
                }, i = this, o = 0; o < 3; o++)
                    e(o)
            }
            ,
            e.prototype.getItem = function() {
                var t = cc.instantiate(this.selectorItem.node).getComponent(r.default);
                return t.node.parent = this.scrollContent,
                t.selected = !1,
                t.node.active = !0,
                t
            }
            ,
            __decorate([c(r.default)], e.prototype, "selectorItem", void 0),
            __decorate([s], e)
        }(o.default);
        i.default = h,
        cc._RF.pop()
    }
    , {
        "../../editor/MapEditor": "MapEditor",
        "../EditWin": "EditWin",
        "./EditTransferSelector": "EditTransferSelector"
    }],
    EditUI: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "1519bbq+IlFHbneY160G6zv", "EditUI"),
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var o = t("./MapEditor")
          , n = cc._decorator
          , r = n.ccclass
          , a = n.property
          , s = function(t) {
            function e() {
                var e = null !== t && t.apply(this, arguments) || this;
                return e.pixelInfoTxt = null,
                e.gridInfoTxt = null,
                e.worldInfoTxt = null,
                e.msBtn = null,
                e.rsBtn = null,
                e.esBtn = null,
                e.gsBtn = null,
                e
            }
            return __extends(e, t),
            e.prototype.start = function() {
                o.default.instance
            }
            ,
            __decorate([a(cc.Label)], e.prototype, "pixelInfoTxt", void 0),
            __decorate([a(cc.Label)], e.prototype, "gridInfoTxt", void 0),
            __decorate([a(cc.Label)], e.prototype, "worldInfoTxt", void 0),
            __decorate([a(cc.Button)], e.prototype, "msBtn", void 0),
            __decorate([a(cc.Button)], e.prototype, "rsBtn", void 0),
            __decorate([a(cc.Button)], e.prototype, "esBtn", void 0),
            __decorate([a(cc.Button)], e.prototype, "gsBtn", void 0),
            __decorate([r], e)
        }(cc.Component);
        i.default = s,
        cc._RF.pop()
    }
    , {
        "./MapEditor": "MapEditor"
    }],
    EditWin: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "17287ShuypEX4+GfzbHMwQy", "EditWin"),
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var o = cc._decorator
          , n = o.ccclass
          , r = o.property
          , a = function(t) {
            function e() {
                var e = null !== t && t.apply(this, arguments) || this;
                return e.winName = "",
                e.scrollView = null,
                e.scrollContent = null,
                e
            }
            return __extends(e, t),
            e.prototype.start = function() {}
            ,
            e.prototype.open = function() {
                this.node.active = !0
            }
            ,
            e.prototype.close = function() {
                this.node.active = !1
            }
            ,
            __decorate([r], e.prototype, "winName", void 0),
            __decorate([r(cc.ScrollView)], e.prototype, "scrollView", void 0),
            __decorate([r(cc.Node)], e.prototype, "scrollContent", void 0),
            __decorate([n], e)
        }(cc.Component);
        i.default = a,
        cc._RF.pop()
    }
    , {}],
    EditorElement: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "a4f7fGQYiJAWbmvsJRAZHPd", "EditorElement"),
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var o = t("../../gamescene/map/charactor/MovieClip")
          , n = cc._decorator
          , r = n.ccclass
          , a = n.property
          , s = function(t) {
            function e() {
                var e = null !== t && t.apply(this, arguments) || this;
                return e.detailName = "",
                e.defaultObjName = "\u540d\u79f0",
                e._graphics = null,
                e._movieClip = null,
                e._nameLabel = null,
                e._objId = "0",
                e._objName = "\u540d\u79f0",
                e._objType = "0",
                e._skin = "",
                e._cx = 0,
                e._cy = 0,
                e._params = "",
                e._direction = 0,
                e.isDestroyed = !1,
                e
            }
            var i;
            return __extends(e, t),
            i = e,
            Object.defineProperty(e.prototype, "className", {
                get: function() {
                    return "EditorElement"
                },
                enumerable: !1,
                configurable: !0
            }),
            Object.defineProperty(e.prototype, "graphics", {
                get: function() {
                    return this._graphics || (console.log("?? isss", this.objId, this.isValid, this.node, this.isDestroyed),
                    this._graphics = this.addComponent(cc.Graphics)),
                    this._graphics
                },
                enumerable: !1,
                configurable: !0
            }),
            Object.defineProperty(e.prototype, "movieClip", {
                get: function() {
                    return this._movieClip || (this._movieClip = this.getComponentInChildren(o.default)),
                    this._movieClip
                },
                enumerable: !1,
                configurable: !0
            }),
            Object.defineProperty(e.prototype, "nameLabel", {
                get: function() {
                    return this._nameLabel || (this._nameLabel = this.getComponentInChildren(cc.Label)),
                    this._nameLabel
                },
                enumerable: !1,
                configurable: !0
            }),
            Object.defineProperty(e.prototype, "selected", {
                get: function() {
                    return this._selected
                },
                set: function(t) {
                    t ? (this.graphics.clear(),
                    this.graphics.strokeColor.fromHEX("#ffffff"),
                    this.graphics.lineWidth = 3.6,
                    this.graphics.rect(-this.node.width * this.node.anchorX, -this.node.height * this.node.anchorY, this.node.width, this.node.height),
                    this.graphics.stroke()) : this.graphics.clear(),
                    this._selected = t
                },
                enumerable: !1,
                configurable: !0
            }),
            Object.defineProperty(e.prototype, "brush", {
                get: function() {
                    return cc.instantiate(this.node).getComponent(i)
                },
                enumerable: !1,
                configurable: !0
            }),
            Object.defineProperty(e.prototype, "objId", {
                get: function() {
                    return this._objId
                },
                set: function(t) {
                    this._objId = t,
                    this.refeshName()
                },
                enumerable: !1,
                configurable: !0
            }),
            Object.defineProperty(e.prototype, "objName", {
                get: function() {
                    return this._objName
                },
                set: function(t) {
                    this._objName = t,
                    this.refeshName()
                },
                enumerable: !1,
                configurable: !0
            }),
            Object.defineProperty(e.prototype, "objType", {
                get: function() {
                    return this._objType
                },
                set: function(t) {
                    this._objType = t
                },
                enumerable: !1,
                configurable: !0
            }),
            Object.defineProperty(e.prototype, "skin", {
                get: function() {
                    return this._skin
                },
                set: function(t) {
                    this._skin = t
                },
                enumerable: !1,
                configurable: !0
            }),
            Object.defineProperty(e.prototype, "x", {
                get: function() {
                    return Number(this.node.x.toFixed(3))
                },
                set: function(t) {
                    this.node.x = t
                },
                enumerable: !1,
                configurable: !0
            }),
            Object.defineProperty(e.prototype, "y", {
                get: function() {
                    return Number(this.node.y.toFixed(3))
                },
                set: function(t) {
                    this.node.y = t
                },
                enumerable: !1,
                configurable: !0
            }),
            Object.defineProperty(e.prototype, "cx", {
                get: function() {
                    return this._cx
                },
                set: function(t) {
                    this._cx = t
                },
                enumerable: !1,
                configurable: !0
            }),
            Object.defineProperty(e.prototype, "cy", {
                get: function() {
                    return this._cy
                },
                set: function(t) {
                    this._cy = t
                },
                enumerable: !1,
                configurable: !0
            }),
            Object.defineProperty(e.prototype, "params", {
                get: function() {
                    return this._params
                },
                set: function(t) {
                    this._params = t
                },
                enumerable: !1,
                configurable: !0
            }),
            Object.defineProperty(e.prototype, "direction", {
                get: function() {
                    return this._direction
                },
                set: function(t) {
                    this._direction = t,
                    null != this.movieClip && (t > 4 ? (this.movieClip.rowIndex = 4 - t % 4,
                    this.movieClip.node.scaleX = -1) : (this.movieClip.rowIndex = t,
                    this.movieClip.node.scaleX = 1))
                },
                enumerable: !1,
                configurable: !0
            }),
            e.prototype.onLoad = function() {}
            ,
            e.prototype.start = function() {
                this._objName = this.defaultObjName,
                this.refresh()
            }
            ,
            e.prototype.refresh = function() {
                this.refeshName()
            }
            ,
            e.prototype.refeshName = function() {
                if (null != this.nameLabel) {
                    var t = "";
                    "" != this.detailName.trim() && (t = "\u3010" + this.detailName + "\u3011"),
                    "" == this.objId.trim() ? t += "" + this._objName : t += this._objName + "(" + this.objId + ")",
                    this.nameLabel.string = t
                }
            }
            ,
            e.prototype.startDrag = function() {
                this.node.on(cc.Node.EventType.TOUCH_START, this.onMouseDown, this),
                this.node.on(cc.Node.EventType.MOUSE_MOVE, this.onMouseMove, this),
                this.node.on(cc.Node.EventType.TOUCH_END, this.onMouseUP, this),
                this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onMouseUP, this),
                this.node.dispatchEvent(new cc.Event(cc.Node.EventType.TOUCH_START,!1))
            }
            ,
            e.prototype.stopDrag = function() {
                this.node.off(cc.Node.EventType.TOUCH_START, this.onMouseDown, this),
                this.node.off(cc.Node.EventType.MOUSE_MOVE, this.onMouseMove, this),
                this.node.off(cc.Node.EventType.TOUCH_END, this.onMouseUP, this),
                this.node.off(cc.Node.EventType.TOUCH_CANCEL, this.onMouseUP, this)
            }
            ,
            e.prototype.onMouseDown = function() {}
            ,
            e.prototype.onMouseMove = function(t) {
                var e = t.getDelta();
                this.node.x += e.x,
                this.node.y += e.y
            }
            ,
            e.prototype.onMouseUP = function() {
                this.stopDrag()
            }
            ,
            e.prototype.destroySelf = function() {
                this.isDestroyed = !0,
                this.node.destroy()
            }
            ,
            e.prototype.onDestroy = function() {
                this.isDestroyed = !0
            }
            ,
            __decorate([a], e.prototype, "detailName", void 0),
            __decorate([a], e.prototype, "defaultObjName", void 0),
            i = __decorate([r], e)
        }(cc.Component);
        i.default = s,
        cc._RF.pop()
    }
    , {
        "../../gamescene/map/charactor/MovieClip": "MovieClip"
    }],
    EditorMonster: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "0c896IZAllCnonfeE9tnzOb", "EditorMonster"),
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var o = t("./EditorElement")
          , n = cc._decorator
          , r = n.ccclass
          , a = (n.property,
        function(t) {
            function e() {
                var e = null !== t && t.apply(this, arguments) || this;
                return e._objName = "\u602a\u7269",
                e._monsterType = 0,
                e._isPatrol = !0,
                e._dialogueId = 0,
                e._fightId = 0,
                e
            }
            return __extends(e, t),
            Object.defineProperty(e.prototype, "className", {
                get: function() {
                    return "EditorMonster"
                },
                enumerable: !1,
                configurable: !0
            }),
            Object.defineProperty(e.prototype, "monsterType", {
                get: function() {
                    return this._monsterType
                },
                set: function(t) {
                    this._monsterType = t
                },
                enumerable: !1,
                configurable: !0
            }),
            Object.defineProperty(e.prototype, "isPatrol", {
                get: function() {
                    return this._isPatrol
                },
                set: function(t) {
                    this._isPatrol = t
                },
                enumerable: !1,
                configurable: !0
            }),
            Object.defineProperty(e.prototype, "dialogueId", {
                get: function() {
                    return this._dialogueId
                },
                set: function(t) {
                    this._dialogueId = t
                },
                enumerable: !1,
                configurable: !0
            }),
            Object.defineProperty(e.prototype, "fightId", {
                get: function() {
                    return this._fightId
                },
                set: function(t) {
                    this._fightId = t
                },
                enumerable: !1,
                configurable: !0
            }),
            e.prototype.start = function() {
                t.prototype.start.call(this)
            }
            ,
            __decorate([r], e)
        }(o.default));
        i.default = a,
        cc._RF.pop()
    }
    , {
        "./EditorElement": "EditorElement"
    }],
    EditorNPC: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "7b650LorexMXaM+NmkZwNM3", "EditorNPC"),
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var o = t("./EditorElement")
          , n = cc._decorator
          , r = n.ccclass
          , a = (n.property,
        function(t) {
            function e() {
                var e = null !== t && t.apply(this, arguments) || this;
                return e._objName = "NPC",
                e._npcType = 0,
                e._isPatrol = !1,
                e._dialogueId = 0,
                e._taskId = 0,
                e._funcId = 0,
                e
            }
            return __extends(e, t),
            Object.defineProperty(e.prototype, "className", {
                get: function() {
                    return "EditorNPC"
                },
                enumerable: !1,
                configurable: !0
            }),
            Object.defineProperty(e.prototype, "npcType", {
                get: function() {
                    return this._npcType
                },
                set: function(t) {
                    this._npcType = t
                },
                enumerable: !1,
                configurable: !0
            }),
            Object.defineProperty(e.prototype, "isPatrol", {
                get: function() {
                    return this._isPatrol
                },
                set: function(t) {
                    this._isPatrol = t
                },
                enumerable: !1,
                configurable: !0
            }),
            Object.defineProperty(e.prototype, "dialogueId", {
                get: function() {
                    return this._dialogueId
                },
                set: function(t) {
                    this._dialogueId = t
                },
                enumerable: !1,
                configurable: !0
            }),
            Object.defineProperty(e.prototype, "taskId", {
                get: function() {
                    return this._taskId
                },
                set: function(t) {
                    this._taskId = t
                },
                enumerable: !1,
                configurable: !0
            }),
            Object.defineProperty(e.prototype, "funcId", {
                get: function() {
                    return this._funcId
                },
                set: function(t) {
                    this._funcId = t
                },
                enumerable: !1,
                configurable: !0
            }),
            e.prototype.start = function() {
                t.prototype.start.call(this)
            }
            ,
            __decorate([r], e)
        }(o.default));
        i.default = a,
        cc._RF.pop()
    }
    , {
        "./EditorElement": "EditorElement"
    }],
    EditorSpawnPoint: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "dc315E7k9BJl7pSp61zAInF", "EditorSpawnPoint"),
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var o = t("../../gamescene/map/editor/MapEditor")
          , n = t("./EditorElement")
          , r = cc._decorator
          , a = r.ccclass
          , s = r.property
          , c = function(t) {
            function e() {
                var e = null !== t && t.apply(this, arguments) || this;
                return e._spawnId = 0,
                e._defaultSpawn = !1,
                e.icon = null,
                e
            }
            return __extends(e, t),
            Object.defineProperty(e.prototype, "className", {
                get: function() {
                    return "EditorSpawnPoint"
                },
                enumerable: !1,
                configurable: !0
            }),
            Object.defineProperty(e.prototype, "spawnId", {
                get: function() {
                    return this._spawnId
                },
                set: function(t) {
                    this._spawnId = t,
                    this.refeshName()
                },
                enumerable: !1,
                configurable: !0
            }),
            Object.defineProperty(e.prototype, "defaultSpawn", {
                get: function() {
                    return this._defaultSpawn
                },
                set: function(t) {
                    this._defaultSpawn = t,
                    this.refeshName()
                },
                enumerable: !1,
                configurable: !0
            }),
            e.prototype.start = function() {
                t.prototype.start.call(this),
                cc.systemEvent.on("ChangeDefaultSpawn", this.onChangeDefaultSpawn, this)
            }
            ,
            e.prototype.onChangeDefaultSpawn = function(t) {
                t != this && (this.defaultSpawn = !1)
            }
            ,
            e.prototype.onDestroy = function() {
                cc.systemEvent.off("ChangeDefaultSpawn", this.onChangeDefaultSpawn, this)
            }
            ,
            e.prototype.refeshName = function() {
                if (null != this.nameLabel) {
                    var t = "";
                    "" != this.detailName.trim() && (t = "\u3010" + this.detailName + "\u3011"),
                    this.defaultSpawn ? (t += "\u3010\u9ed8\u8ba4\u3011",
                    this.setColor("#ffff00"),
                    o.default.instance.testView.node.active || (cc.systemEvent.emit("ChangeDefaultSpawn", this),
                    console.log("!!!!"))) : this.setColor("#ffffff"),
                    t += ".\u672c\u5730\u56fe\u51fa\u751f\u70b9Id\uff1a" + this._spawnId,
                    this.nameLabel.string = t
                }
            }
            ,
            e.prototype.setColor = function(t) {
                this.icon.color = this.icon.color.fromHEX(t)
            }
            ,
            __decorate([s(cc.Node)], e.prototype, "icon", void 0),
            __decorate([a], e)
        }(n.default);
        i.default = c,
        cc._RF.pop()
    }
    , {
        "../../gamescene/map/editor/MapEditor": "MapEditor",
        "./EditorElement": "EditorElement"
    }],
    EditorTransfer: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "c78ceYVpNZClLOpBNlZGC1q", "EditorTransfer"),
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var o = t("./EditorElement")
          , n = cc._decorator
          , r = n.ccclass
          , a = (n.property,
        function(t) {
            function e() {
                var e = null !== t && t.apply(this, arguments) || this;
                return e._targetMapId = "",
                e._targetMapSpawnId = 0,
                e._transferType = 0,
                e
            }
            return __extends(e, t),
            Object.defineProperty(e.prototype, "className", {
                get: function() {
                    return "EditorTransfer"
                },
                enumerable: !1,
                configurable: !0
            }),
            Object.defineProperty(e.prototype, "targetMapId", {
                get: function() {
                    return this._targetMapId
                },
                set: function(t) {
                    this._targetMapId = t,
                    this.refeshName()
                },
                enumerable: !1,
                configurable: !0
            }),
            Object.defineProperty(e.prototype, "targetMapSpawnId", {
                get: function() {
                    return this._targetMapSpawnId
                },
                set: function(t) {
                    this._targetMapSpawnId = t,
                    this.refeshName()
                },
                enumerable: !1,
                configurable: !0
            }),
            Object.defineProperty(e.prototype, "transferType", {
                get: function() {
                    return this._transferType
                },
                set: function(t) {
                    this._transferType = t
                },
                enumerable: !1,
                configurable: !0
            }),
            e.prototype.start = function() {
                t.prototype.start.call(this)
            }
            ,
            e.prototype.refeshName = function() {
                if (null != this.nameLabel) {
                    var t = "";
                    "" != this.detailName.trim() && (t = "\u3010" + this.detailName + "\u3011"),
                    t += "" + this._objName,
                    t += ".\u76ee\u6807\u5730\u56fe(" + this._targetMapId + ").\u76ee\u6807\u51fa\u751f\u70b9(" + this._targetMapSpawnId + ")",
                    this.nameLabel.string = t
                }
            }
            ,
            __decorate([r], e)
        }(o.default));
        i.default = a,
        cc._RF.pop()
    }
    , {
        "./EditorElement": "EditorElement"
    }],
    EntityLayer: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "6639ayo4DFKZYCU2OBZzyb+", "EntityLayer"),
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var o = t("../../../editor/attribute/AttributeUtils")
          , n = t("../../../editor/EditorElement/EditorElement")
          , r = t("../../../editor/mapUnit/MapUnitLibrary")
          , a = cc._decorator
          , s = a.ccclass
          , c = (a.property,
        function(t) {
            function e() {
                var e = null !== t && t.apply(this, arguments) || this;
                return e._mapUnitArr = [],
                e.editObject = null,
                e._mouseChildren = !0,
                e
            }
            return __extends(e, t),
            Object.defineProperty(e.prototype, "mouseChildren", {
                get: function() {
                    return this._mouseChildren
                },
                set: function(t) {
                    if (this._mouseChildren != t) {
                        this._mouseChildren = t;
                        for (var e = 0; e < this._mapUnitArr.length; e++) {
                            var i = this._mapUnitArr[e];
                            this._mouseChildren ? this.registerEvent(i) : this.removeEvent(i)
                        }
                    }
                },
                enumerable: !1,
                configurable: !0
            }),
            e.prototype.start = function() {}
            ,
            e.prototype.initCallback = function(t, e, i, o, n) {
                this._propertyEditor = t,
                this._leftClickObject = e,
                this._refreshMiniMapEntityFlag = i,
                this._setBrush = o,
                this._rightClickObject = n
            }
            ,
            e.prototype.initMapUintInfo = function(t) {
                this.clear();
                var e = t.mapItems;
                if (e) {
                    for (var i, o = 0; o < e.length; o++) {
                        var a = e[o];
                        "npc" == a.type ? i = r.default.instance.getNpcElement(a.npcType) : "monster" == a.type ? i = r.default.instance.getMonsterElement(a.monsterType) : "transfer" == a.type ? i = r.default.instance.getTransferElement(a.transferType) : "spawnPoint" == a.type && (i = cc.instantiate(r.default.instance.spawnPointPrefab).getComponent(n.default)),
                        this.initUnit(i, a)
                    }
                    this.setDepthRand()
                }
            }
            ,
            e.prototype.initUnit = function(t, e) {
                if (null != t) {
                    for (var i, n = o.default.instance.getObjectEditAttribute(t), r = 0; r < n.length; r++)
                        null != e[(i = n[r]).attribute] && (t[i.attribute] = e[i.attribute]);
                    t.defaultObjName = t.objName,
                    this.addMapUnit(t),
                    this.registerEvent(t)
                }
            }
            ,
            e.prototype.addMapUnit = function(t) {
                this._mapUnitArr.push(t),
                t.node.parent = this.node
            }
            ,
            e.prototype.setDepthRand = function() {
                this._mapUnitArr.sort(function(t, e) {
                    return t.node.y > e.node.y ? -1 : 1
                });
                for (var t = this._mapUnitArr.length, e = 0; e < t; e++)
                    this._mapUnitArr[e].node.zIndex = e
            }
            ,
            e.prototype.removeMapUnit = function(t) {
                var e = this._mapUnitArr.indexOf(t);
                -1 != e && this._mapUnitArr.splice(e, 1),
                t.node.parent = null
            }
            ,
            e.prototype.registerEvent = function(t) {
                this._mouseChildren && (t.node.on(cc.Node.EventType.MOUSE_DOWN, this.onMouseDown, this),
                t.node.on(cc.Node.EventType.MOUSE_UP, this.onMouseUp, this))
            }
            ,
            e.prototype.removeEvent = function(t) {
                t.node.off(cc.Node.EventType.MOUSE_DOWN, this.onMouseDown, this),
                t.node.off(cc.Node.EventType.MOUSE_UP, this.onMouseUp, this)
            }
            ,
            e.prototype.onMouseDown = function(t) {
                var e = t.currentTarget
                  , i = e.getComponent(n.default);
                t.getButton() == cc.Event.EventMouse.BUTTON_LEFT ? (e.parent == this.node && (e.zIndex = this.node.childrenCount - 1),
                this._leftClickObject && this._leftClickObject.apply(this.editObject, [i]),
                e.hasEventListener(cc.Node.EventType.MOUSE_MOVE) || e.on(cc.Node.EventType.MOUSE_MOVE, this.onMouseMove, this),
                t.stopPropagation()) : t.getButton() == cc.Event.EventMouse.BUTTON_RIGHT && (this._rightClickObject && this._rightClickObject.apply(this.editObject, [i]),
                t.stopPropagation())
            }
            ,
            e.prototype.onMouseMove = function(t) {
                var e = t.currentTarget;
                e.off(cc.Node.EventType.MOUSE_MOVE, this.onMouseMove, this),
                this._setBrush && this._setBrush.apply(this.editObject, [e.getComponent(n.default)])
            }
            ,
            e.prototype.onMouseUp = function(t) {
                var e = t.currentTarget
                  , i = e.getComponent(n.default);
                e.hasEventListener(cc.Node.EventType.MOUSE_MOVE) && e.off(cc.Node.EventType.MOUSE_MOVE, this.onMouseMove, this),
                t.getButton() == cc.Event.EventMouse.BUTTON_RIGHT && t.stopPropagation(),
                i.isDestroyed || (this._propertyEditor && this._propertyEditor.apply(this.editObject, [i]),
                this._refreshMiniMapEntityFlag && this._refreshMiniMapEntityFlag.apply(this.editObject, []))
            }
            ,
            e.prototype.showUnitsAnchor = function() {
                for (var t = 0; t < this._mapUnitArr.length; t++)
                    this._mapUnitArr[t]
            }
            ,
            e.prototype.getMapUnits = function() {
                return this._mapUnitArr
            }
            ,
            e.prototype.clear = function() {
                var t = this;
                this._mapUnitArr.forEach(function(e) {
                    t.removeEvent(e),
                    e.node.parent = null,
                    e.node.destroy()
                }),
                this._mapUnitArr = []
            }
            ,
            e.prototype.update = function() {
                this.sortZindex()
            }
            ,
            e.prototype.sortZindex = function() {
                var t = this.node.children.slice();
                t.sort(function(t, e) {
                    return t.y > e.y ? -1 : t.y < e.y ? 1 : 0
                });
                for (var e = t.length, i = 0; i < e; i++)
                    t[i].zIndex = i
            }
            ,
            __decorate([s], e)
        }(cc.Component));
        i.default = c,
        cc._RF.pop()
    }
    , {
        "../../../editor/EditorElement/EditorElement": "EditorElement",
        "../../../editor/attribute/AttributeUtils": "AttributeUtils",
        "../../../editor/mapUnit/MapUnitLibrary": "MapUnitLibrary"
    }],
    GameLoop: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "372aagGwhtF/5R/OLKCIjed", "GameLoop"),
        Object.defineProperty(i, "__esModule", {
            value: !0
        }),
        i.QuadTree = void 0;
        var o = cc._decorator
          , n = o.ccclass
          , r = o.property
          , a = function(t) {
            function e() {
                var e = null !== t && t.apply(this, arguments) || this;
                return e.videoPlayer = null,
                e.testNode = null,
                e.plane1 = null,
                e.plane2 = null,
                e.btn = null,
                e
            }
            return __extends(e, t),
            e.prototype.start = function() {
                this.videoPlayer.play(),
                this.testNode.getComponent(cc.BoxCollider),
                console.log(">>", 10, 1),
                this.plane1.on(cc.Node.EventType.TOUCH_START, function() {
                    console.log("click plane1 ")
                }, this),
                this.plane2.on(cc.Node.EventType.TOUCH_START, function() {
                    console.log("click plane2 ")
                }, this),
                this.btn.node.on(cc.Node.EventType.MOUSE_DOWN, function() {
                    console.log("click btn ")
                }, this)
            }
            ,
            __decorate([r(cc.VideoPlayer)], e.prototype, "videoPlayer", void 0),
            __decorate([r(cc.Node)], e.prototype, "testNode", void 0),
            __decorate([r(cc.Node)], e.prototype, "plane1", void 0),
            __decorate([r(cc.Node)], e.prototype, "plane2", void 0),
            __decorate([r(cc.Button)], e.prototype, "btn", void 0),
            __decorate([n], e)
        }(cc.Component);
        i.default = a;
        var s = function() {
            function t(t, e, i, o) {
                this.level = 0,
                this.bounds = new c,
                this.objects = [],
                this.nodes = [],
                this.bounds = t,
                this.max_objects = e || 10,
                this.max_levels = i || 4,
                this.level = o || 0,
                this.objects = [],
                this.nodes = []
            }
            return t.prototype.split = function() {
                var e = this.level + 1
                  , i = this.bounds.width / 2
                  , o = this.bounds.height / 2
                  , n = this.bounds.x
                  , r = this.bounds.y;
                this.nodes[0] = new t({
                    x: n + i,
                    y: r,
                    width: i,
                    height: o
                },this.max_objects,this.max_levels,e),
                this.nodes[1] = new t({
                    x: n,
                    y: r,
                    width: i,
                    height: o
                },this.max_objects,this.max_levels,e),
                this.nodes[2] = new t({
                    x: n,
                    y: r + o,
                    width: i,
                    height: o
                },this.max_objects,this.max_levels,e),
                this.nodes[3] = new t({
                    x: n + i,
                    y: r + o,
                    width: i,
                    height: o
                },this.max_objects,this.max_levels,e)
            }
            ,
            t.prototype.getIndex = function(t) {
                var e = []
                  , i = this.bounds.x + this.bounds.width / 2
                  , o = this.bounds.y + this.bounds.height / 2
                  , n = t.y < o
                  , r = t.x < i
                  , a = t.x + t.width > i
                  , s = t.y + t.height > o;
                return n && a && e.push(0),
                r && n && e.push(1),
                r && s && e.push(2),
                a && s && e.push(3),
                e
            }
            ,
            t.prototype.insert = function(t) {
                var e, i = 0;
                if (this.nodes.length)
                    for (e = this.getIndex(t),
                    i = 0; i < e.length; i++)
                        this.nodes[e[i]].insert(t);
                else if (this.objects.push(t),
                this.objects.length > this.max_objects && this.level < this.max_levels) {
                    for (this.nodes.length || this.split(),
                    i = 0; i < this.objects.length; i++) {
                        e = this.getIndex(this.objects[i]);
                        for (var o = 0; o < e.length; o++)
                            this.nodes[e[o]].insert(this.objects[i])
                    }
                    this.objects = []
                }
            }
            ,
            t.prototype.retrieve = function(t) {
                var e = this.getIndex(t)
                  , i = this.objects;
                if (this.nodes.length)
                    for (var o = 0; o < e.length; o++)
                        i = i.concat(this.nodes[e[o]].retrieve(t));
                return i = i = i.filter(function(t, e) {
                    return i.indexOf(t) >= e
                })
            }
            ,
            t.prototype.clear = function() {
                this.objects = [];
                for (var t = 0; t < this.nodes.length; t++)
                    this.nodes.length && this.nodes[t].clear();
                this.nodes = []
            }
            ,
            t
        }();
        i.QuadTree = s;
        var c = function(t, e, i, o) {
            void 0 === t && (t = 0),
            void 0 === e && (e = 0),
            void 0 === i && (i = 0),
            void 0 === o && (o = 0),
            this.x = 0,
            this.y = 0,
            this.width = 0,
            this.height = 0,
            this.x = t,
            this.y = e,
            this.width = i,
            this.height = o
        };
        (function() {
            function t() {}
            t.prototype.test = function() {}
            ,
            t.prototype.init = function() {
                new s({
                    x: 0,
                    y: 0,
                    width: 1136,
                    height: 640
                },0,0,0);
                for (var t = [], e = 0; e < 10; e++)
                    t.push({
                        x: this.random(-568, 568),
                        y: this.random(-568, 568),
                        width: this.random(4, 32),
                        height: this.random(4, 32)
                    })
            }
            ,
            t.prototype.random = function(t, e) {
                return Math.floor(Math.random() * (e - t + 1) + t)
            }
            ,
            t.prototype.insertFood = function(t, e) {
                for (var i = 0; i < e.length; i++)
                    t.insert({
                        x: e[i].x,
                        y: e[i].y,
                        width: e[i].width,
                        height: e[i].height
                    })
            }
            ,
            t.prototype.checkFoodCollision = function(t, e) {
                t.retrieve(e)
            }
        }
        )(),
        cc._RF.pop()
    }
    , {}],
    GridLayer: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "09018XO6StGcov2GC6ehVqo", "GridLayer"),
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var o = t("../base/MapType")
          , n = cc._decorator
          , r = n.ccclass
          , a = (n.property,
        function(t) {
            function e() {
                var e = t.call(this) || this;
                return e._isShowAuxiliaryLine = !0,
                e.lingColor1 = "#00550025",
                e.lingColor2 = "#11115566",
                e.lingColor3 = "#bbbbbbaa",
                e._graphics = null,
                e
            }
            return __extends(e, t),
            Object.defineProperty(e.prototype, "graphics", {
                get: function() {
                    return this._graphics || (this._graphics = this.addComponent(cc.Graphics)),
                    this._graphics
                },
                enumerable: !1,
                configurable: !0
            }),
            e.prototype.drawGrid = function(t, e, i, n, r, a) {
                void 0 === a && (a = !0),
                this._mapWidth = t,
                this._mapHeight = e,
                this._ceilWidth = i,
                this._ceilHeight = n,
                this._ceilWidth = i,
                this._ceilHeight = n,
                this._halfCeilWidth = this._ceilWidth / 2,
                this._halfCeilHeight = this._ceilHeight / 2,
                this._isShowAuxiliaryLine = a;
                var s = Math.ceil(t / this._ceilWidth)
                  , c = Math.ceil(e / this._ceilHeight)
                  , h = 2 * s + 1
                  , d = 2 * c + 1
                  , l = h * this._halfCeilWidth
                  , p = d * this._halfCeilHeight;
                r == o.MapType.angle45 ? this.draw45AngleGrid(d, h, l, p) : r == o.MapType.angle90 ? this.draw90AngleGrid(d, h, l, p) : r == o.MapType.honeycomb ? this.drawHoneycombGrid(l, p) : r == o.MapType.honeycomb2 && (s = Math.ceil(t / this._ceilHeight),
                d = 2 * (c = Math.ceil(e / this._ceilWidth)) + 1,
                l = (h = 2 * s + 1) * this._halfCeilHeight,
                p = d * this._halfCeilWidth,
                this.drawHoneycombGrid2(l, p))
            }
            ,
            e.prototype.draw45AngleGrid = function(t, e, i, o) {
                if (this.graphics.clear(),
                this._isShowAuxiliaryLine) {
                    for (var n = 0; n < t + 1; n++)
                        n % 2 == 0 ? (this.graphics.strokeColor.fromHEX(this.lingColor2),
                        this.graphics.lineWidth = 1) : (this.graphics.strokeColor.fromHEX(this.lingColor1),
                        this.graphics.lineWidth = 1),
                        this.graphics.moveTo(0, n * this._halfCeilHeight),
                        this.graphics.lineTo(i, n * this._halfCeilHeight),
                        this.graphics.stroke();
                    for (var r = 0; r < e + 1; r++)
                        r % 2 == 0 ? (this.graphics.strokeColor.fromHEX(this.lingColor2),
                        this.graphics.lineWidth = 1) : (this.graphics.strokeColor.fromHEX(this.lingColor1),
                        this.graphics.lineWidth = 1),
                        this.graphics.moveTo(r * this._halfCeilWidth, 0),
                        this.graphics.lineTo(r * this._halfCeilWidth, o),
                        this.graphics.stroke()
                }
                for (var a = 1; a < e + t; a++) {
                    var s, c, h, d;
                    this.graphics.strokeColor.fromHEX(this.lingColor3),
                    this.graphics.lineWidth = 2,
                    a % 2 == 1 ? (s = a * this._halfCeilWidth,
                    c = 0,
                    h = 0,
                    d = a * this._halfCeilHeight,
                    s > i && (s = i,
                    c = (a - e) * this._halfCeilHeight),
                    d > o && (h = (a - t) * this._halfCeilWidth,
                    d = o),
                    this.graphics.moveTo(s, c),
                    this.graphics.lineTo(h, d)) : (s = a * this._halfCeilWidth,
                    c = o,
                    h = 0,
                    d = (t - a) * this._halfCeilHeight,
                    s > i && (s = i,
                    c = (t - (a - e)) * this._halfCeilHeight),
                    d < 0 && (h = (a - t) * this._halfCeilWidth,
                    d = 0),
                    this.graphics.moveTo(s, c),
                    this.graphics.lineTo(h, d),
                    this.graphics.stroke())
                }
            }
            ,
            e.prototype.draw90AngleGrid = function(t, e, i, o) {
                this.graphics.clear();
                for (var n = 0; n < t + 1; n++)
                    n % 2 == 0 ? (this.graphics.strokeColor.fromHEX(this.lingColor3),
                    this.graphics.lineWidth = 2) : this._isShowAuxiliaryLine && (this.graphics.strokeColor.fromHEX(this.lingColor1),
                    this.graphics.lineWidth = 1),
                    this.graphics.moveTo(0, n * this._halfCeilHeight),
                    this.graphics.lineTo(i, n * this._halfCeilHeight),
                    this.graphics.stroke();
                for (var r = 0; r < e + 1; r++)
                    r % 2 == 0 ? (this.graphics.strokeColor.fromHEX(this.lingColor3),
                    this.graphics.lineWidth = 2) : this._isShowAuxiliaryLine && (this.graphics.strokeColor.fromHEX(this.lingColor1),
                    this.graphics.lineWidth = 1),
                    this.graphics.moveTo(r * this._halfCeilWidth, 0),
                    this.graphics.lineTo(r * this._halfCeilWidth, o),
                    this.graphics.stroke()
            }
            ,
            e.prototype.drawHoneycombGrid = function(t, e) {
                this.graphics.clear(),
                this._ceilWidth;
                var i = this._ceilWidth / 4
                  , o = 2 * i
                  , n = 3 * i
                  , r = this._ceilHeight / 2
                  , a = o - r
                  , s = t / this._ceilWidth
                  , c = e / this._ceilWidth
                  , h = 2 * Math.ceil((this._mapWidth - i) / (6 * i))
                  , d = Math.ceil((this._mapHeight - r) / this._ceilHeight);
                if (this._isShowAuxiliaryLine) {
                    for (var l = 0; l < 4 * c + 1; l++)
                        l % 4 == 0 ? (this.graphics.strokeColor.fromHEX(this.lingColor2),
                        this.graphics.lineWidth = 1) : (this.graphics.strokeColor.fromHEX(this.lingColor1),
                        this.graphics.lineWidth = 1.2),
                        l % 4 == 1 ? (this.graphics.moveTo(0, (l - 1) * i + a),
                        this.graphics.lineTo(t, (l - 1) * i + a),
                        this.graphics.stroke()) : l % 4 == 3 ? (this.graphics.moveTo(0, (l - 1) * i + r),
                        this.graphics.lineTo(t, (l - 1) * i + r),
                        this.graphics.stroke()) : (this.graphics.moveTo(0, l * i),
                        this.graphics.lineTo(t, l * i),
                        this.graphics.stroke());
                    for (var p = 0; p < 4 * s + 1; p++)
                        p % 4 == 0 ? (this.graphics.strokeColor.fromHEX(this.lingColor2),
                        this.graphics.lineWidth = 1) : (this.graphics.strokeColor.fromHEX(this.lingColor1),
                        this.graphics.lineWidth = 1),
                        this.graphics.moveTo(p * i, 0),
                        this.graphics.lineTo(p * i, e),
                        this.graphics.stroke()
                }
                this.graphics.strokeColor.fromHEX(this.lingColor3),
                this.graphics.lineWidth = 1.5;
                for (var u = 0; u < h; u++) {
                    var y = u * n
                      , f = 0;
                    u % 2 != 0 && (f = r);
                    for (var _ = 0; _ < d; _++) {
                        var g = _ * this._ceilHeight + f;
                        u % 2 == 0 ? (this.drawLine(y + i, 0 + g, y + n, 0 + g),
                        this.drawLine(y + n, 0 + g, y + this._ceilWidth, r + g),
                        this.drawLine(y + this._ceilWidth, r + g, y + n, this._ceilHeight + g),
                        _ == d - 1 && this.drawLine(y + n, this._ceilHeight + g, y + i, this._ceilHeight + g),
                        this.drawLine(y + i, this._ceilHeight + g, y + 0, r + g),
                        this.drawLine(y + 0, r + g, y + i, 0 + g)) : (this.drawLine(y + i, 0 + g, y + n, 0 + g),
                        u == h - 1 && (this.drawLine(y + n, 0 + g, y + this._ceilWidth, r + g),
                        this.drawLine(y + this._ceilWidth, r + g, y + n, this._ceilHeight + g)),
                        _ == d - 1 && (this.drawLine(y + n, this._ceilHeight + g, y + i, this._ceilHeight + g),
                        this.drawLine(y + i, this._ceilHeight + g, y + 0, r + g),
                        u != h - 1 && this.drawLine(y + this._ceilWidth, r + g, y + n, this._ceilHeight + g)))
                    }
                }
            }
            ,
            e.prototype.drawHoneycombGrid2 = function(t, e) {
                this.graphics.clear(),
                this._ceilWidth;
                var i = this._ceilWidth / 4
                  , o = 2 * i
                  , n = 3 * i
                  , r = this._ceilHeight / 2
                  , a = o - r
                  , s = t / this._ceilWidth
                  , c = e / this._ceilWidth
                  , h = Math.ceil((this._mapWidth - r) / this._ceilHeight)
                  , d = 2 * Math.ceil((this._mapHeight - i) / (6 * i));
                if (this._isShowAuxiliaryLine) {
                    for (var l = 0; l < 4 * c + 1; l++)
                        l % 4 == 0 ? (this.graphics.strokeColor.fromHEX(this.lingColor2),
                        this.graphics.lineWidth = 1) : (this.graphics.strokeColor.fromHEX(this.lingColor1),
                        this.graphics.lineWidth = 1.2),
                        l % 4 == 1 ? (this.graphics.moveTo((l - 1) * i + a, 0),
                        this.graphics.lineTo((l - 1) * i + a, e),
                        this.graphics.stroke()) : l % 4 == 3 ? (this.graphics.moveTo((l - 1) * i + r, 0),
                        this.graphics.lineTo((l - 1) * i + r, e),
                        this.graphics.stroke()) : (this.graphics.moveTo(l * i, 0),
                        this.graphics.lineTo(l * i, e),
                        this.graphics.stroke());
                    for (var p = 0; p < 4 * s + 1; p++)
                        p % 4 == 0 ? (this.graphics.strokeColor.fromHEX(this.lingColor2),
                        this.graphics.lineWidth = 1) : (this.graphics.strokeColor.fromHEX(this.lingColor1),
                        this.graphics.lineWidth = 1),
                        this.graphics.moveTo(0, p * i),
                        this.graphics.lineTo(t, p * i),
                        this.graphics.stroke()
                }
                this.graphics.strokeColor.fromHEX(this.lingColor3),
                this.graphics.lineWidth = 1.5;
                for (var u = 0; u < d; u++) {
                    var y = u * n
                      , f = 0;
                    u % 2 != 0 && (f = r);
                    for (var _ = 0; _ < h; _++) {
                        var g = _ * this._ceilHeight + f;
                        u % 2 == 0 ? (this.drawLine(0 + g, y + i, 0 + g, y + n),
                        this.drawLine(0 + g, y + n, r + g, y + this._ceilWidth),
                        this.drawLine(r + g, y + this._ceilWidth, this._ceilHeight + g, y + n),
                        _ == h - 1 && this.drawLine(this._ceilHeight + g, y + n, this._ceilHeight + g, y + i),
                        this.drawLine(this._ceilHeight + g, y + i, r + g, y + 0),
                        this.drawLine(r + g, y + 0, 0 + g, y + i)) : (this.drawLine(0 + g, y + i, 0 + g, y + n),
                        u == d - 1 && (this.drawLine(0 + g, y + n, r + g, y + this._ceilWidth),
                        this.drawLine(r + g, y + this._ceilWidth, this._ceilHeight + g, y + n)),
                        _ == h - 1 && (this.drawLine(this._ceilHeight + g, y + n, this._ceilHeight + g, y + i),
                        this.drawLine(this._ceilHeight + g, y + i, r + g, y + 0),
                        u != d - 1 && this.drawLine(r + g, y + this._ceilWidth, this._ceilHeight + g, y + n)))
                    }
                }
            }
            ,
            e.prototype.drawLine = function(t, e, i, o) {
                this.graphics.moveTo(t, e),
                this.graphics.lineTo(i, o),
                this.graphics.stroke()
            }
            ,
            __decorate([r], e)
        }(cc.Component));
        i.default = a,
        cc._RF.pop()
    }
    , {
        "../base/MapType": "MapType"
    }],
    IBrush: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "4e2e3zjDzdKBbEPTJIom0Kn", "IBrush"),
        Object.defineProperty(i, "__esModule", {
            value: !0
        }),
        cc._RF.pop()
    }
    , {}],
    IMemento: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "6a3f9xDpnhLor7wF7x3dAMb", "IMemento"),
        Object.defineProperty(i, "__esModule", {
            value: !0
        }),
        cc._RF.pop()
    }
    , {}],
    IRoadSeeker: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "e4f3f6Ez/xAyqwa4NhT8jTY", "IRoadSeeker"),
        Object.defineProperty(i, "__esModule", {
            value: !0
        }),
        cc._RF.pop()
    }
    , {}],
    JoyStickAgent: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "4edaaOft4tLyJR5+yE85BuG", "JoyStickAgent"),
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var o = t("../road/PathFindingAgent")
          , n = cc._decorator
          , r = n.ccclass
          , a = (n.property,
        function(t) {
            function e() {
                var e = null !== t && t.apply(this, arguments) || this;
                return e.moveDir = cc.Vec2.ZERO,
                e.targetPos = cc.Vec2.ZERO,
                e.moveSpeed = 200,
                e
            }
            return __extends(e, t),
            e.prototype.start = function() {}
            ,
            e.prototype.update = function(t) {
                this.onJoyStickControll(t)
            }
            ,
            e.prototype.onJoyStickControll = function(t) {
                if (0 != this.moveDir.x || 0 != this.moveDir.y) {
                    var e = this.moveSpeed * t
                      , i = this.node.position.add(this.moveDir.mul(e))
                      , n = o.default.instance.getRoadNodeByPixel(i.x, i.y);
                    if (n)
                        if (1 != n.value)
                            this.targetPos = i;
                        else {
                            for (var r = o.default.instance.getRoadNodeByPixel(this.node.x, this.node.y), a = o.default.instance.getRoundRoadNodes(r), s = null, c = 0; c < a.length; c++)
                                if (a[c] && 1 != a[c].value && a[c] != n)
                                    if (a[c].h = 10 * (Math.abs(n.cx - a[c].cx) + Math.abs(n.cy - a[c].cy)),
                                    s) {
                                        if (a[c].h < s.h)
                                            s = a[c];
                                        else if (a[c].h == s.h) {
                                            var h = cc.v2(a[c].px, a[c].py).sub(this.node.position).normalize()
                                              , d = cc.v2(s.px, s.py).sub(this.node.position).normalize();
                                            h.add(this.moveDir).mag() > d.add(this.moveDir).mag() && (s = a[c])
                                        }
                                    } else
                                        s = a[c];
                            s && (h = cc.v2(n.px, n.py).sub(this.node.position).normalize(),
                            d = cc.v2(s.px, s.py).sub(this.node.position).normalize(),
                            h.add(this.moveDir).mag() / 2 > d.add(this.moveDir).mag() ? this.targetPos = this.node.position : this.targetPos = cc.v2(s.px, s.py))
                        }
                    else
                        this.targetPos = this.node.position;
                    var l = this.targetPos.sub(this.node.position)
                      , p = l.mag();
                    l = l.normalize(),
                    this.node.position = p < e ? this.targetPos : this.node.position.add(l.mul(e))
                }
            }
            ,
            __decorate([r], e)
        }(cc.Component));
        i.default = a,
        cc._RF.pop()
    }
    , {
        "../road/PathFindingAgent": "PathFindingAgent"
    }],
    KeyBoardExecute: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "bee75tJWB9Dsp7UhfMuqRi2", "KeyBoardExecute"),
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var o = cc._decorator
          , n = o.ccclass
          , r = (o.property,
        function() {
            function t() {
                this._keyDownDic = {},
                this._keyUpDic = {},
                this._keyStatusDic = {},
                this._pressCtrlKey = !1,
                this._pressShiftKey = !1,
                this._pressAltKey = !1,
                this._pressSpace = !1,
                this._focusTarget = null
            }
            var e;
            return e = t,
            Object.defineProperty(t, "instance", {
                get: function() {
                    return this._instance || (this._instance = new e,
                    this._instance.init()),
                    this._instance
                },
                enumerable: !1,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, "pressCtrlKey", {
                get: function() {
                    return this._pressCtrlKey
                },
                enumerable: !1,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, "pressShiftKey", {
                get: function() {
                    return this._pressShiftKey
                },
                enumerable: !1,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, "pressAltKey", {
                get: function() {
                    return this._pressAltKey
                },
                enumerable: !1,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, "pressSpace", {
                get: function() {
                    return this._pressSpace
                },
                enumerable: !1,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, "focusTarget", {
                get: function() {
                    return this._focusTarget
                },
                enumerable: !1,
                configurable: !0
            }),
            t.prototype.init = function() {
                cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this),
                cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this),
                setInterval(this.onTick.bind(this), 5e3)
            }
            ,
            t.prototype.onTick = function() {
                this.clearDisableListener()
            }
            ,
            t.prototype.setFocus = function(t) {
                this._focusTarget = t
            }
            ,
            t.prototype.clearDisableListener = function() {
                for (var t in this._keyDownDic)
                    if (this._keyDownDic[t]) {
                        for (var e = this._keyDownDic[t], i = 0; i < e.length; i++)
                            e[i].target instanceof cc.Node && !e[i].target.isValid && (e.splice(i, 1),
                            i--,
                            this._focusTarget == e[i].target && (this._focusTarget = null));
                        0 == this._keyDownDic[t].length && (this._keyDownDic[t] = null,
                        delete this._keyDownDic[t])
                    }
                for (var t in this._keyUpDic)
                    if (this._keyUpDic[t]) {
                        for (e = this._keyUpDic[t],
                        i = 0; i < e.length; i++)
                            e[i].target instanceof cc.Node && !e[i].target.isValid && (e.splice(i, 1),
                            i--,
                            this._focusTarget == e[i].target && (this._focusTarget = null));
                        0 == this._keyUpDic[t].length && (this._keyUpDic[t] = null,
                        delete this._keyUpDic[t])
                    }
            }
            ,
            t.prototype.clearTargetAllListeners = function(t) {
                for (var e in this._keyDownDic)
                    if (this._keyDownDic[e]) {
                        for (var i = this._keyDownDic[e], o = 0; o < i.length; o++)
                            i[o].target != t || (i.splice(o, 1),
                            o--);
                        0 == this._keyDownDic[e].length && (this._keyDownDic[e] = null,
                        delete this._keyDownDic[e])
                    }
                for (var e in this._keyUpDic)
                    if (this._keyUpDic[e]) {
                        for (i = this._keyUpDic[e],
                        o = 0; o < i.length; o++)
                            i[o].target != t || (i.splice(o, 1),
                            o--);
                        0 == this._keyUpDic[e].length && (this._keyUpDic[e] = null,
                        delete this._keyUpDic[e])
                    }
            }
            ,
            t.prototype.onKeyDown = function(t) {
                if (this._keyStatusDic[t.keyCode] && this._keyStatusDic[t.keyCode] != a.none && this._keyStatusDic[t.keyCode] != a.keyUp ? this._keyStatusDic[t.keyCode] == a.keyDown && (this._keyStatusDic[t.keyCode] = a.press) : this._keyStatusDic[t.keyCode] = a.keyDown,
                this._keyStatusDic[t.keyCode] == a.keyDown) {
                    switch (t.keyCode) {
                    case cc.macro.KEY.ctrl:
                        this._pressCtrlKey = !0;
                        break;
                    case cc.macro.KEY.shift:
                        this._pressShiftKey = !0;
                        break;
                    case cc.macro.KEY.alt:
                        this._pressAltKey = !0;
                        break;
                    case cc.macro.KEY.space:
                        this._pressSpace = !0
                    }
                    var e = "" + t.keyCode + this._pressCtrlKey + this._pressShiftKey + this._pressAltKey;
                    if (this._keyDownDic[e])
                        for (var i = this._keyDownDic[e], o = 0; o < i.length; o++)
                            i[o].target instanceof cc.Node && !i[o].target.isValid ? (i.splice(o, 1),
                            o--) : null != this._focusTarget && this._focusTarget != i[o].target || i[o].callback.apply(i[o].target, [t.keyCode, this._pressCtrlKey, this._pressShiftKey, this._pressAltKey])
                } else
                    this._keyStatusDic[t.keyCode],
                    a.press
            }
            ,
            t.prototype.onKeyUp = function(t) {
                switch (this._keyStatusDic[t.keyCode] = a.keyUp,
                t.keyCode) {
                case cc.macro.KEY.ctrl:
                    this._pressCtrlKey = !1;
                    break;
                case cc.macro.KEY.shift:
                    this._pressShiftKey = !1;
                    break;
                case cc.macro.KEY.alt:
                    this._pressAltKey = !1;
                    break;
                case cc.macro.KEY.space:
                    this._pressSpace = !1
                }
                var e = "" + t.keyCode + this._pressCtrlKey + this._pressShiftKey + this._pressAltKey;
                if (this._keyUpDic[e])
                    for (var i = this._keyUpDic[e], o = 0; o < i.length; o++)
                        i[o].target instanceof cc.Node && !i[o].target.isValid ? (i.splice(o, 1),
                        o--) : null != this._focusTarget && this._focusTarget != i[o].target || i[o].callback.apply(i[o].target, [t.keyCode, this._pressCtrlKey, this._pressShiftKey, this._pressAltKey])
            }
            ,
            t.prototype.addKeyDownListener = function(t, e, i, o, n, r) {
                void 0 === i && (i = null),
                void 0 === o && (o = !1),
                void 0 === n && (n = !1),
                void 0 === r && (r = !1);
                var a = "" + e + o + n + r;
                this._keyDownDic[a] || (this._keyDownDic[a] = []),
                this._keyDownDic[a].push(new s(i,t))
            }
            ,
            t.prototype.addKeyUpListener = function(t, e, i, o, n, r) {
                void 0 === i && (i = null),
                void 0 === o && (o = !1),
                void 0 === n && (n = !1),
                void 0 === r && (r = !1);
                var a = "" + e + o + n + r;
                this._keyUpDic[a] || (this._keyUpDic[a] = []),
                this._keyUpDic[a].push(new s(i,t))
            }
            ,
            t.prototype.removeKeyDownListener = function(t, e, i, o, n, r) {
                void 0 === i && (i = null),
                void 0 === o && (o = !1),
                void 0 === n && (n = !1),
                void 0 === r && (r = !1);
                var a = "" + e + o + n + r;
                if (this._keyDownDic[a]) {
                    for (var s = this._keyDownDic[a], c = 0; c < s.length; c++)
                        s[c].target == i && s[c].callback == t && (s.splice(c, 1),
                        c--);
                    0 == this._keyDownDic[a].length && (this._keyDownDic[a] = null,
                    delete this._keyDownDic[a])
                }
            }
            ,
            t.prototype.removeKeyUpListener = function(t, e, i, o, n, r) {
                void 0 === i && (i = null),
                void 0 === o && (o = !1),
                void 0 === n && (n = !1),
                void 0 === r && (r = !1);
                var a = "" + e + o + n + r;
                if (this._keyUpDic[a]) {
                    for (var s = this._keyUpDic[a], c = 0; c < s.length; c++)
                        s[c].target == i && s[c].callback == t && (s.splice(c, 1),
                        c--);
                    0 == this._keyUpDic[a].length && (this._keyUpDic[a] = null,
                    delete this._keyUpDic[a])
                }
            }
            ,
            t.setFocus = function(t) {
                this.instance.setFocus(t)
            }
            ,
            t.clearDisableListener = function() {
                this.instance.clearDisableListener()
            }
            ,
            t.clearTargetAllListeners = function(t) {
                this.instance.clearTargetAllListeners(t)
            }
            ,
            t.addKeyDownListener = function(t, e, i, o, n, r) {
                void 0 === i && (i = null),
                void 0 === o && (o = !1),
                void 0 === n && (n = !1),
                void 0 === r && (r = !1),
                this.instance.addKeyDownListener(t, e, i, o, n, r)
            }
            ,
            t.addKeyUpListener = function(t, e, i, o, n, r) {
                void 0 === i && (i = null),
                void 0 === o && (o = !1),
                void 0 === n && (n = !1),
                void 0 === r && (r = !1),
                this.instance.addKeyUpListener(t, e, i, o, n, r)
            }
            ,
            t.removeKeyDownListener = function(t, e, i, o, n, r) {
                void 0 === i && (i = null),
                void 0 === o && (o = !1),
                void 0 === n && (n = !1),
                void 0 === r && (r = !1),
                this.instance.removeKeyDownListener(t, e, i, o, n, r)
            }
            ,
            t.removeKeyUpListener = function(t, e, i, o, n, r) {
                void 0 === i && (i = null),
                void 0 === o && (o = !1),
                void 0 === n && (n = !1),
                void 0 === r && (r = !1),
                this.instance.removeKeyUpListener(t, e, i, o, n, r)
            }
            ,
            e = __decorate([n], t)
        }());
        i.default = r;
        var a, s = function(t, e) {
            this.target = t,
            this.callback = e
        };
        (function(t) {
            t[t.none = 0] = "none",
            t[t.keyDown = 1] = "keyDown",
            t[t.press = 2] = "press",
            t[t.keyUp = 3] = "keyUp"
        }
        )(a || (a = {})),
        cc._RF.pop()
    }
    , {}],
    Layer: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "70ead8XGDVJ/IJ/aBpG/18c", "Layer"),
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var o = cc._decorator
          , n = o.ccclass
          , r = (o.property,
        function(t) {
            function e() {
                var e = null !== t && t.apply(this, arguments) || this;
                return e._mouseX = 0,
                e._mouseY = 0,
                e
            }
            return __extends(e, t),
            Object.defineProperty(e.prototype, "mouseX", {
                get: function() {
                    return this._mouseX
                },
                enumerable: !1,
                configurable: !0
            }),
            Object.defineProperty(e.prototype, "mouseY", {
                get: function() {
                    return this._mouseY
                },
                enumerable: !1,
                configurable: !0
            }),
            e.prototype.onLoad = function() {}
            ,
            e.prototype.onMouseMove = function(t) {
                var e = this.node.convertToNodeSpaceAR(t.getLocation());
                this._mouseX = e.x,
                this._mouseY = e.y
            }
            ,
            e.prototype.onDestroy = function() {}
            ,
            __decorate([n], e)
        }(cc.Component));
        i.default = r,
        cc._RF.pop()
    }
    , {}],
    MainMenuBarHandler: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "fecebduUClEw7jR5AZOPsiS", "MainMenuBarHandler"),
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var o = t("./MapEditor")
          , n = function() {
            function t() {}
            return t.prototype.init = function(t) {
                t.setData(this.getMenuData()),
                t.itemClick = function(t) {
                    console.log("dataname ", t.label),
                    t.fun && t.fun.apply(t.target, [])
                }
            }
            ,
            t.prototype.getMenuData = function() {
                return o.default.instance.editArea,
                [{
                    label: "File",
                    children: [{
                        label: "New",
                        data: 1,
                        fun: o.default.instance.createNewFile,
                        target: o.default.instance
                    }, {
                        label: "Open (CTRL + O)",
                        data: 2,
                        fun: o.default.instance.openFile,
                        target: o.default.instance
                    }, {
                        label: "Save (CTRL + S)",
                        data: 3,
                        fun: o.default.instance.saveFile,
                        target: o.default.instance
                    }, {
                        label: "Settings",
                        data: 4,
                        fun: o.default.instance.showProjectSetting,
                        target: o.default.instance
                    }]
                }, {
                    label: "Edit",
                    children: [{
                        label: "Add Walkable Node (Q)",
                        data: 1,
                        fun: o.default.instance.editArea.addEnableNode,
                        target: o.default.instance.editArea
                    }, {
                        label: "Add Unwalkable Node (W)",
                        data: 2,
                        fun: o.default.instance.editArea.addDisableNode,
                        target: o.default.instance.editArea
                    }, {
                        label: "Add Transparent Walkable Node (E)",
                        data: 3,
                        fun: o.default.instance.editArea.addTransParentNode,
                        target: o.default.instance.editArea
                    }, {
                        label: "Add Transfer Node (R)",
                        data: 4,
                        fun: o.default.instance.editArea.addTransferNode,
                        target: o.default.instance.editArea
                    }, {
                        label: "Delete Node (D)",
                        data: 5,
                        fun: o.default.instance.editArea.deleteNode,
                        target: o.default.instance.editArea
                    }, {
                        label: "Stop Placing Nodes (T)",
                        data: 6,
                        fun: o.default.instance.editArea.notDrawNode,
                        target: o.default.instance.editArea
                    }, {
                        label: "Stop Editing Events (S)",
                        data: 7,
                        fun: o.default.instance.editArea.clearAllEditorAreaExecute,
                        target: o.default.instance.editArea
                    }, {
                        label: "Show/Hide Map (U)",
                        data: 10,
                        fun: o.default.instance.editArea.showMapLayer,
                        target: o.default.instance.editArea
                    }, {
                        label: "Show/Hide Entities (O)",
                        data: 11,
                        fun: o.default.instance.editArea.showEntityLayer,
                        target: o.default.instance.editArea
                    }, {
                        label: "Show/Hide Nodes (I)",
                        data: 12,
                        fun: o.default.instance.editArea.showRoadLayer,
                        target: o.default.instance.editArea
                    }, {
                        label: "Show/Hide Grid (P)",
                        data: 13,
                        fun: o.default.instance.editArea.showGridLayer,
                        target: o.default.instance.editArea
                    }]
                }, {
                    label: "Commands",
                    children: [{
                        label: "Run Test (ctrl + enter)",
                        data: 1,
                        fun: o.default.instance.testProject,
                        target: o.default.instance
                    }]
                }, {
                    label: "Download",
                    children: [{
                        label: "Download Basic Frontend Framework Creator",
                        children: [{
                            label: "Basic Frontend Framework_v2.4.8",
                            data: 1,
                            fun: function() {
                                location.href = "https://easymapeditor-1258223435.cos.ap-guangzhou.myqcloud.com/framework/cocos/RPGFramework_base_2.4.8.zip"
                            },
                            target: o.default.instance
                        }, {
                            label: "Basic Frontend Framework_v3.5.0",
                            data: 1,
                            fun: function() {
                                location.href = "https://easymapeditor-1258223435.cos.ap-guangzhou.myqcloud.com/framework/cocos/RPGFramework_base_3.5.0.zip"
                            },
                            target: o.default.instance
                        }]
                    }, {
                        label: "Download Advanced Frontend Framework Creator",
                        children: [{
                            label: "Advanced Frontend Framework v2.4.8",
                            data: 1,
                            fun: function() {
                                o.default.instance.showSaleView(1)
                            },
                            target: o.default.instance
                        }, {
                            label: "Advanced Frontend Framework v3.5.0",
                            data: 1,
                            fun: function() {
                                o.default.instance.showSaleView(2)
                            },
                            target: o.default.instance
                        }]
                    }, {
                        label: "Download Basic Frontend Framework Laya",
                        children: [{
                            label: "Basic Framework_v2.13",
                            data: 1,
                            fun: function() {
                                location.href = "https://easymapeditor-1258223435.cos.ap-guangzhou.myqcloud.com/framework/laya/RPGFramework_Base_Laya_2.13.zip"
                            },
                            target: o.default.instance
                        }]
                    }, {
                        label: "Download Basic Frontend Framework Unity",
                        children: [{
                            label: "Basic Framework_v2022.3.13",
                            data: 1,
                            fun: function() {
                                location.href = "https://easymapeditor-1258223435.cos.ap-guangzhou.myqcloud.com/framework/unity/RPGMapFramework_2022.3.13.zip"
                            },
                            target: o.default.instance
                        }]
                    }, {
                        label: "Download Large Map Cutting Tool",
                        data: 1,
                        fun: o.default.instance.downloadImageClipTool,
                        target: o.default.instance
                    }]
                }, {
                    label: "Window",
                    children: [{
                        label: "Mini Map Preview Panel (F2)",
                        data: 1,
                        fun: o.default.instance.editArea.showMiniMap,
                        target: o.default.instance.editArea
                    }, {
                        label: "Node Editing Mode (N)",
                        data: 2,
                        fun: o.default.instance.editArea.setEditRoadModel,
                        target: o.default.instance.editArea
                    }, {
                        label: "Normal Editing Mode (M)",
                        data: 3,
                        fun: o.default.instance.editArea.setNormalRoadModel,
                        target: o.default.instance.editArea
                    }]
                }, {
                    label: "Help",
                    children: [{
                        label: "Contact Us",
                        data: 1,
                        fun: o.default.instance.showCopyright,
                        target: o.default.instance
                    }]
                }]
            }
            ,
            t
        }();
        i.default = n,
        cc._RF.pop()
    }
    , {
        "./MapEditor": "MapEditor"
    }],
    MapDataUtils: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "504c9TxeARKUJ0qWyUtcYuy", "MapDataUtils"),
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var o = t("../../../editor/attribute/AttributeUtils")
          , n = t("../../../editor/EditorElement/EditorMonster")
          , r = t("../../../editor/EditorElement/EditorNPC")
          , a = t("../../../editor/EditorElement/EditorSpawnPoint")
          , s = t("../../../editor/EditorElement/EditorTransfer")
          , c = t("../base/MapData")
          , h = t("./MapEditor")
          , d = function() {
            function t() {}
            return Object.defineProperty(t, "instance", {
                get: function() {
                    return null == this._instance && (this._instance = new t),
                    this._instance
                },
                enumerable: !1,
                configurable: !0
            }),
            t.prototype.getMapData = function() {
                var t = new c.default;
                return t.name = h.default.instance.mapName,
                t.bgName = h.default.instance.bgName,
                t.type = h.default.instance.mapType,
                t.mapWidth = h.default.instance.mapWidth,
                t.mapHeight = h.default.instance.mapHeight,
                t.nodeWidth = h.default.instance.ceilWidth,
                t.nodeHeight = h.default.instance.ceilHeight,
                t.roadDataArr = h.default.instance.editArea.roadPointLayer.getRoadPointInfo(),
                t.mapItems = this.unitDataConversion(),
                t
            }
            ,
            t.prototype.unitDataConversion = function() {
                for (var t = h.default.instance.editArea.entityLayer.getMapUnits(), e = [], i = 0; i < t.length; i++) {
                    var c, d, l = t[i], p = {};
                    if (l instanceof r.default) {
                        p.type = "npc",
                        c = o.default.instance.getObjectEditAttribute(l);
                        for (var u = 0; u < c.length; u++)
                            p[(d = c[u]).attribute] = l[d.attribute]
                    } else if (l instanceof n.default)
                        for (p.type = "monster",
                        c = o.default.instance.getObjectEditAttribute(l),
                        u = 0; u < c.length; u++)
                            p[(d = c[u]).attribute] = l[d.attribute];
                    else if (l instanceof s.default)
                        for (p.type = "transfer",
                        c = o.default.instance.getObjectEditAttribute(l),
                        u = 0; u < c.length; u++)
                            p[(d = c[u]).attribute] = l[d.attribute];
                    else if (l instanceof a.default)
                        for (p.type = "spawnPoint",
                        c = o.default.instance.getObjectEditAttribute(l),
                        u = 0; u < c.length; u++)
                            p[(d = c[u]).attribute] = l[d.attribute];
                    else
                        p.type = "item",
                        p.x = l.node.x,
                        p.y = l.node.y,
                        p.width = l.node.width,
                        p.height = l.node.height,
                        console.log(i, "type = item");
                    e.push(p)
                }
                return e
            }
            ,
            t
        }();
        i.default = d,
        cc._RF.pop()
    }
    , {
        "../../../editor/EditorElement/EditorMonster": "EditorMonster",
        "../../../editor/EditorElement/EditorNPC": "EditorNPC",
        "../../../editor/EditorElement/EditorSpawnPoint": "EditorSpawnPoint",
        "../../../editor/EditorElement/EditorTransfer": "EditorTransfer",
        "../../../editor/attribute/AttributeUtils": "AttributeUtils",
        "../base/MapData": "MapData",
        "./MapEditor": "MapEditor"
    }],
    MapData: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "a0091ubw51FsLzsP1pcYli/", "MapData"),
        Object.defineProperty(i, "__esModule", {
            value: !0
        }),
        i.RoadSetData = void 0;
        var o = t("./MapType");
        i.default = function() {
            this.name = "\u672a\u547d\u540d",
            this.bgName = "map_bg",
            this.type = o.MapType.angle45,
            this.mapWidth = 0,
            this.mapHeight = 0,
            this.nodeWidth = 0,
            this.nodeHeight = 0,
            this.alignment = 0,
            this.offsetX = 0,
            this.offsetY = 0,
            this.roadDataArr = [],
            this.mapItems = []
        }
        ;
        i.RoadSetData = function() {
            this.id = 0,
            this.value = 0,
            this.color = "#ffffffff",
            this.isShow = !0,
            this.isPass = !1,
            this.desc = ""
        }
        ,
        cc._RF.pop()
    }
    , {
        "./MapType": "MapType"
    }],
    MapEditor: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "f651f/bSbZBZLU3/nbkyBZi", "MapEditor"),
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var o = t("../base/MapType")
          , n = t("./EditArea")
          , r = t("../base/MapParams")
          , a = t("./EditUI")
          , s = t("../operation/KeyBoardExecute")
          , c = t("../test/TestView")
          , h = t("../base/MapData")
          , d = t("../ui/miniMap/MiniMapView")
          , l = t("../ui/teach/TeachView")
          , p = t("../ui/project/NewMapView")
          , u = t("../ui/project/OpenMapView")
          , y = t("../ui/base/BaseView")
          , f = t("./UIManager")
          , _ = t("./MainMenuBarHandler")
          , g = t("./MapDataUtils")
          , m = t("../ui/sale/SaleView")
          , v = cc._decorator
          , b = v.ccclass
          , M = v.property
          , N = function(t) {
            function e() {
                var e = null !== t && t.apply(this, arguments) || this;
                return e.editAreaView = null,
                e.editAreaNode = null,
                e._editArea = null,
                e.editUINode = null,
                e._editUI = null,
                e.newMapViewPrefab = null,
                e.openMapViewPrefab = null,
                e.bigMapHelpView = null,
                e.miniMapViewNode = null,
                e._miniMapView = null,
                e.testViewNode = null,
                e._testView = null,
                e.teachViewNode = null,
                e._teachView = null,
                e.settingViewNode = null,
                e.copyrightViewNode = null,
                e.saleViewNode = null,
                e.uiNode = null,
                e.mapName = "mapData",
                e.bgName = "map_bg",
                e.mapType = o.MapType.angle45,
                e.mapWidth = 1920,
                e.mapHeight = 1080,
                e.ceilWidth = 75,
                e.ceilHeight = 75,
                e._mapData = new h.default,
                e.uiDic = {},
                e
            }
            var i;
            return __extends(e, t),
            i = e,
            Object.defineProperty(e.prototype, "editArea", {
                get: function() {
                    return this._editArea || (this._editArea = this.editAreaNode.getComponent(n.default)),
                    this._editArea
                },
                enumerable: !1,
                configurable: !0
            }),
            Object.defineProperty(e.prototype, "editUI", {
                get: function() {
                    return this._editUI || (this._editUI = this.editUINode.getComponent(a.default)),
                    this._editUI
                },
                enumerable: !1,
                configurable: !0
            }),
            Object.defineProperty(e.prototype, "miniMapView", {
                get: function() {
                    return this._miniMapView || (this._miniMapView = this.miniMapViewNode.getComponent(d.default)),
                    this._miniMapView
                },
                enumerable: !1,
                configurable: !0
            }),
            Object.defineProperty(e.prototype, "testView", {
                get: function() {
                    return this._testView || (this._testView = this.testViewNode.getComponent(c.default)),
                    this._testView
                },
                enumerable: !1,
                configurable: !0
            }),
            Object.defineProperty(e.prototype, "teachView", {
                get: function() {
                    return this._teachView || (this._teachView = this.teachViewNode.getComponent(l.default)),
                    this._teachView
                },
                enumerable: !1,
                configurable: !0
            }),
            e.prototype.onLoad = function() {
                i.instance = this,
                cc.debug.setDisplayStats(!1)
            }
            ,
            e.prototype.start = function() {
                var t = new r.default;
                t.mapType = this.mapType,
                t.mapWidth = this.mapWidth,
                t.mapHeight = this.mapHeight,
                t.ceilWidth = this.ceilWidth,
                t.ceilHeight = this.ceilHeight,
                this.initMenubar(),
                this.initKeyBoardFunction(),
                this.initEventListener(),
                this.init(t)
            }
            ,
            e.prototype.init = function(t) {
                this.editArea.init(t),
                this.miniMapView.init()
            }
            ,
            e.prototype.initMenubar = function() {
                var t = f.default.instance.mainMenuBar;
                (new _.default).init(t)
            }
            ,
            e.prototype.initKeyBoardFunction = function() {
                s.default.addKeyDownListener(this.openFile, cc.macro.KEY.o, this, !0),
                s.default.addKeyDownListener(this.testProject, cc.macro.KEY.enter, this, !0),
                s.default.addKeyDownListener(this.saveFile, cc.macro.KEY.s, this, !0),
                s.default.addKeyDownListener(this.saveAsFile, cc.macro.KEY.s, this, !0, !0)
            }
            ,
            e.prototype.initEventListener = function() {
                f.default.instance.backLayer.on(cc.Node.EventType.TOUCH_START, this.onMouseDown, this),
                this.editArea.node.on(cc.Node.EventType.TOUCH_START, this.onMouseDown, this)
            }
            ,
            e.prototype.onMouseDown = function() {
                f.default.instance.mainMenuBar.closeMenu()
            }
            ,
            e.prototype.testProject = function() {
                this.testView.open(),
                this.testView.init(g.default.instance.getMapData()),
                this.closeEditAreaView()
            }
            ,
            e.prototype.createNewFile = function() {
                this.uiDic.NewMapView && (this.uiDic.NewMapView.close(),
                this.uiDic.NewMapView = null);
                var t = cc.instantiate(this.newMapViewPrefab).getComponent(p.default);
                t.node.active = !0,
                t.node.parent = this.uiNode,
                t.node.zIndex = 100,
                this.uiDic.NewMapView = t
            }
            ,
            e.prototype.openFile = function() {
                this.uiDic.OpenMapView && (this.uiDic.OpenMapView.close(),
                this.uiDic.OpenMapView = null);
                var t = cc.instantiate(this.openMapViewPrefab).getComponent(u.default);
                t.node.active = !0,
                t.node.parent = this.uiNode,
                t.node.zIndex = 100,
                this.uiDic.OpenMapView = t
            }
            ,
            e.prototype.OpenBigMapHelpView = function() {
                this.bigMapHelpView.open(),
                this.bigMapHelpView.node.zIndex = 101
            }
            ,
            e.prototype.initMap = function(t) {
                this.mapName = t.name,
                this.bgName = t.bgName,
                this.mapType = t.mapType,
                this.mapWidth = t.mapWidth,
                this.mapHeight = t.mapHeight,
                this.ceilWidth = t.ceilWidth,
                this.ceilHeight = t.ceilHeight,
                this.editArea.clear(),
                this.editArea.init(t),
                this.miniMapView.init()
            }
            ,
            e.prototype.openMap = function(t, e) {
                this.mapName = t.name,
                this.bgName = t.bgName,
                this.mapType = t.type,
                this.mapWidth = t.mapWidth,
                this.mapHeight = t.mapHeight,
                this.ceilWidth = t.nodeWidth,
                this.ceilHeight = t.nodeHeight;
                var i = new r.default;
                i.mapType = this.mapType,
                i.mapWidth = this.mapWidth,
                i.mapHeight = this.mapHeight,
                i.ceilWidth = this.ceilWidth,
                i.ceilHeight = this.ceilHeight,
                i.bgTex = e,
                this.editArea.clear(),
                this.editArea.init(i),
                this.editArea.initMapData(t),
                this.miniMapView.init()
            }
            ,
            e.prototype.saveFile = function() {
                var t = g.default.instance.getMapData()
                  , e = JSON.stringify(t);
                this.saveForBrowser(e, t.name + ".json")
            }
            ,
            e.prototype.saveAsFile = function() {
                cc.log("\u53e6\u5b58\u4e3a")
            }
            ,
            e.prototype.downloadSource = function() {
                location.href = "https://easymapeditor-1258223435.cos.ap-guangzhou.myqcloud.com/framework/cocos/RPGFramework_base_2.4.8.zip"
            }
            ,
            e.prototype.downloadImageClipTool = function() {
                location.href = "https://easymapeditor-1258223435.cos.ap-guangzhou.myqcloud.com/tool/ImageClip.zip"
            }
            ,
            e.prototype.saveForBrowser = function(t, e) {
                if (cc.sys.isBrowser) {
                    var i = new Blob([t],{
                        type: "application/json"
                    })
                      , o = document.createElement("a");
                    o.download = e,
                    o.innerHTML = "Download File",
                    null != window.webkitURL ? o.href = window.webkitURL.createObjectURL(i) : (o.href = window.URL.createObjectURL(i),
                    o.style.display = "none",
                    document.body.appendChild(o)),
                    o.click(),
                    window.URL.revokeObjectURL(o.href)
                }
            }
            ,
            e.prototype.showTeach = function() {
                this.teachView.open()
            }
            ,
            e.prototype.showCopyright = function() {
                this.copyrightViewNode.getComponent(y.default).open()
            }
            ,
            e.prototype.showIntroduce = function() {
                window.open("https://forum.cocos.org/t/topic/141940", "_blank")
            }
            ,
            e.prototype.showProjectSetting = function() {
                this.settingViewNode.getComponent(y.default).open()
            }
            ,
            e.prototype.showSaleView = function(t) {
                this.saleViewNode.getComponent(m.default).openView(t)
            }
            ,
            e.prototype.openEditAreaView = function() {
                this.editAreaView.active = !0
            }
            ,
            e.prototype.closeEditAreaView = function() {
                this.editAreaView.active = !1
            }
            ,
            __decorate([M(cc.Node)], e.prototype, "editAreaView", void 0),
            __decorate([M(cc.Node)], e.prototype, "editAreaNode", void 0),
            __decorate([M(cc.Node)], e.prototype, "editUINode", void 0),
            __decorate([M(cc.Node)], e.prototype, "newMapViewPrefab", void 0),
            __decorate([M(cc.Node)], e.prototype, "openMapViewPrefab", void 0),
            __decorate([M(y.default)], e.prototype, "bigMapHelpView", void 0),
            __decorate([M(cc.Node)], e.prototype, "miniMapViewNode", void 0),
            __decorate([M(cc.Node)], e.prototype, "testViewNode", void 0),
            __decorate([M(cc.Node)], e.prototype, "teachViewNode", void 0),
            __decorate([M(cc.Node)], e.prototype, "settingViewNode", void 0),
            __decorate([M(cc.Node)], e.prototype, "copyrightViewNode", void 0),
            __decorate([M(cc.Node)], e.prototype, "saleViewNode", void 0),
            __decorate([M(cc.Node)], e.prototype, "uiNode", void 0),
            __decorate([M()], e.prototype, "mapName", void 0),
            __decorate([M()], e.prototype, "bgName", void 0),
            __decorate([M({
                type: cc.Enum(o.MapType)
            })], e.prototype, "mapType", void 0),
            __decorate([M()], e.prototype, "mapWidth", void 0),
            __decorate([M()], e.prototype, "mapHeight", void 0),
            __decorate([M()], e.prototype, "ceilWidth", void 0),
            __decorate([M()], e.prototype, "ceilHeight", void 0),
            i = __decorate([b], e)
        }(cc.Component);
        i.default = N,
        cc._RF.pop()
    }
    , {
        "../base/MapData": "MapData",
        "../base/MapParams": "MapParams",
        "../base/MapType": "MapType",
        "../operation/KeyBoardExecute": "KeyBoardExecute",
        "../test/TestView": "TestView",
        "../ui/base/BaseView": "BaseView",
        "../ui/miniMap/MiniMapView": "MiniMapView",
        "../ui/project/NewMapView": "NewMapView",
        "../ui/project/OpenMapView": "OpenMapView",
        "../ui/sale/SaleView": "SaleView",
        "../ui/teach/TeachView": "TeachView",
        "./EditArea": "EditArea",
        "./EditUI": "EditUI",
        "./MainMenuBarHandler": "MainMenuBarHandler",
        "./MapDataUtils": "MapDataUtils",
        "./UIManager": "UIManager"
    }],
    MapLayer: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "753fbcKY45E1Lc2+Glt9EhY", "MapLayer"),
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var o = cc._decorator
          , n = o.ccclass
          , r = o.property
          , a = function(t) {
            function e() {
                var e = t.call(this) || this;
                return e._sliceWidth = 200,
                e._sliceHeight = 200,
                e._sliceImgDic = {},
                e.bgImg = null,
                e
            }
            return __extends(e, t),
            e.prototype.init = function(t, e, i, o, n) {
                this._viewWidth = t,
                this._viewHeight = e,
                this._sliceWidth = i,
                this._sliceHeight = o,
                n && (this.bgImg.spriteFrame = new cc.SpriteFrame(n),
                this.bgImg.node.width = t,
                this.bgImg.node.height = e),
                this.node.width = this.width,
                this.node.height = this.height
            }
            ,
            e.prototype.load = function() {}
            ,
            e.prototype.onLoadComplete = function() {}
            ,
            e.prototype.loadSmallImage = function(t, e) {
                this._bitmapDataArr && (Math.floor(t / this._sliceWidth),
                Math.floor(e / this._sliceHeight),
                Math.floor((t + this._viewWidth) / this._sliceWidth),
                Math.floor((e + this._viewHeight) / this._sliceHeight))
            }
            ,
            e.prototype.clear = function() {
                this.bgImg.spriteFrame = null
            }
            ,
            Object.defineProperty(e.prototype, "bgImage", {
                get: function() {
                    return this.bgImg
                },
                enumerable: !1,
                configurable: !0
            }),
            Object.defineProperty(e.prototype, "width", {
                get: function() {
                    return this.bgImg ? this.bgImg.node.width : this._viewWidth
                },
                enumerable: !1,
                configurable: !0
            }),
            Object.defineProperty(e.prototype, "height", {
                get: function() {
                    return this.bgImg ? this.bgImg.node.height : this._viewHeight
                },
                enumerable: !1,
                configurable: !0
            }),
            __decorate([r(cc.Sprite)], e.prototype, "bgImg", void 0),
            __decorate([n], e)
        }(cc.Component);
        i.default = a,
        cc._RF.pop()
    }
    , {}],
    MapParams: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "6b00e3/60pNy69HrXB4iMm4", "MapParams"),
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var o = t("./MapType");
        i.default = function() {
            this.name = "",
            this.mapType = o.MapType.angle45,
            this.mapWidth = 750,
            this.mapHeight = 1600,
            this.ceilWidth = 75,
            this.ceilHeight = 75,
            this.bgTex = null,
            this.bgName = ""
        }
        ,
        cc._RF.pop()
    }
    , {
        "./MapType": "MapType"
    }],
    MapRoadUtils: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "38983rww8xCor2DSeawAfiI", "MapRoadUtils"),
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var o = t("./Point")
          , n = t("./RoadNode")
          , r = t("../base/MapType")
          , a = function() {
            function t() {}
            return Object.defineProperty(t, "instance", {
                get: function() {
                    return null == this._instance && (this._instance = new t),
                    this._instance
                },
                enumerable: !1,
                configurable: !0
            }),
            t.prototype.updateMapInfo = function(t, e, i, o, n) {
                switch (this._mapWidth = t,
                this._mapHeight = e,
                this._nodeWidth = i,
                this._nodeHeight = o,
                this._halfNodeWidth = this._nodeWidth / 2,
                this._halfNodeHeight = this._nodeHeight / 2,
                this._mapType = n,
                this._mapType) {
                case r.MapType.angle45:
                    this._col = Math.ceil(this._mapWidth / this._nodeWidth),
                    this._row = 2 * Math.ceil(this._mapHeight / this._nodeHeight),
                    this._mapRoad = new s(this._row,this._col,this._nodeWidth,this._nodeHeight,this._halfNodeWidth,this._halfNodeHeight);
                    break;
                case r.MapType.angle90:
                    this._col = Math.ceil(this._mapWidth / this._nodeWidth),
                    this._row = Math.ceil(this._mapHeight / this._nodeHeight),
                    this._mapRoad = new c(this._row,this._col,this._nodeWidth,this._nodeHeight,this._halfNodeWidth,this._halfNodeHeight);
                    break;
                case r.MapType.honeycomb:
                    this._col = 2 * Math.ceil((this._mapWidth - this._nodeWidth / 4) / (this._nodeWidth / 4 * 6)),
                    this._row = Math.ceil((this._mapHeight - this._nodeHeight / 2) / this._nodeHeight),
                    this._mapRoad = new h(this._row,this._col,this._nodeWidth,this._nodeHeight,this._halfNodeWidth,this._halfNodeHeight);
                    break;
                case r.MapType.honeycomb2:
                    this._col = Math.ceil((this._mapWidth - this._nodeHeight / 2) / this._nodeHeight),
                    this._row = 2 * Math.ceil((this._mapHeight - this._nodeWidth / 4) / (this._nodeWidth / 4 * 6)),
                    this._mapRoad = new d(this._row,this._col,this._nodeWidth,this._nodeHeight,this._halfNodeWidth,this._halfNodeHeight)
                }
            }
            ,
            t.prototype.getNodeByPixel = function(t, e) {
                return this._mapRoad ? this._mapRoad.getNodeByPixel(t, e) : new n.default
            }
            ,
            t.prototype.getNodeByDerect = function(t, e) {
                return this._mapRoad ? this._mapRoad.getNodeByDerect(t, e) : new n.default
            }
            ,
            t.prototype.getNodeByWorldPoint = function(t, e) {
                return this._mapRoad ? this._mapRoad.getNodeByWorldPoint(t, e) : new n.default
            }
            ,
            t.prototype.getWorldPointByPixel = function(t, e) {
                return this._mapRoad ? this._mapRoad.getWorldPointByPixel(t, e) : new o.default
            }
            ,
            t.prototype.getPixelByWorldPoint = function(t, e) {
                return this._mapRoad ? this._mapRoad.getPixelByWorldPoint(t, e) : new o.default
            }
            ,
            t.prototype.getDerectByPixel = function(t, e) {
                return this._mapRoad ? this._mapRoad.getDerectByPixel(t, e) : new o.default
            }
            ,
            t.prototype.getDerectByWorldPoint = function(t, e) {
                return this._mapRoad ? this._mapRoad.getDerectByWorldPoint(t, e) : new o.default
            }
            ,
            t.prototype.getPixelByDerect = function(t, e) {
                return this._mapRoad ? this._mapRoad.getPixelByDerect(t, e) : new o.default
            }
            ,
            Object.defineProperty(t.prototype, "mapWidth", {
                get: function() {
                    return this._mapWidth
                },
                enumerable: !1,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, "mapHeight", {
                get: function() {
                    return this._mapHeight
                },
                enumerable: !1,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, "nodeWidth", {
                get: function() {
                    return this._nodeWidth
                },
                enumerable: !1,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, "nodeHeight", {
                get: function() {
                    return this._nodeHeight
                },
                enumerable: !1,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, "row", {
                get: function() {
                    return this._row
                },
                enumerable: !1,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, "col", {
                get: function() {
                    return this._col
                },
                enumerable: !1,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, "halfNodeWidth", {
                get: function() {
                    return this._halfNodeWidth
                },
                enumerable: !1,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, "halfNodeHeight", {
                get: function() {
                    return this._halfNodeHeight
                },
                enumerable: !1,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, "mapType", {
                get: function() {
                    return this._mapType
                },
                enumerable: !1,
                configurable: !0
            }),
            t
        }();
        i.default = a;
        var s = function() {
            function t(t, e, i, o, n, r) {
                this._row = t,
                this._col = e,
                this._nodeWidth = i,
                this._nodeHeight = o,
                this._halfNodeWidth = n,
                this._halfNodeHeight = r
            }
            return t.prototype.getNodeByPixel = function(t, e) {
                var i = this.getWorldPointByPixel(t, e)
                  , o = this.getPixelByWorldPoint(i.x, i.y)
                  , r = this.getDerectByPixel(t, e)
                  , a = new n.default;
                return a.cx = i.x,
                a.cy = i.y,
                a.px = o.x,
                a.py = o.y,
                a.dx = r.x,
                a.dy = r.y,
                a
            }
            ,
            t.prototype.getNodeByDerect = function(t, e) {
                var i = this.getPixelByDerect(t, e)
                  , o = this.getWorldPointByPixel(i.x, i.y)
                  , r = new n.default;
                return r.cx = o.x,
                r.cy = o.y,
                r.px = i.x,
                r.py = i.y,
                r.dx = t,
                r.dy = e,
                r
            }
            ,
            t.prototype.getNodeByWorldPoint = function(t, e) {
                var i = this.getPixelByWorldPoint(t, e);
                return this.getNodeByPixel(i.x, i.y)
            }
            ,
            t.prototype.getWorldPointByPixel = function(t, e) {
                var i = Math.ceil(t / this._nodeWidth - .5 + e / this._nodeHeight) - 1
                  , n = this._col - 1 - Math.ceil(t / this._nodeWidth - .5 - e / this._nodeHeight);
                return new o.default(i,n)
            }
            ,
            t.prototype.getPixelByWorldPoint = function(t, e) {
                var i = (t + 1 - (e - (this._col - 1))) * this._halfNodeWidth
                  , n = (t + 1 + (e - (this._col - 1))) * this._halfNodeHeight;
                return new o.default(i,n)
            }
            ,
            t.prototype.getDerectByPixel = function(t, e) {
                var i = this.getWorldPointByPixel(t, e)
                  , n = this.getPixelByWorldPoint(i.x, i.y)
                  , r = Math.floor(n.x / this._nodeWidth) - (n.x % this._nodeWidth == 0 ? 1 : 0)
                  , a = Math.floor(n.y / this._halfNodeHeight) - 1;
                return new o.default(r,a)
            }
            ,
            t.prototype.getDerectByWorldPoint = function(t, e) {
                var i = Math.floor((t - (e - (this._col - 1))) / 2)
                  , n = t + (e - (this._col - 1));
                return new o.default(i,n)
            }
            ,
            t.prototype.getPixelByDerect = function(t, e) {
                var i = (t + e % 2) * this._nodeWidth + (1 - e % 2) * this._halfNodeWidth
                  , n = (e + 1) * this._halfNodeHeight;
                return new o.default(i,n)
            }
            ,
            t
        }()
          , c = function() {
            function t(t, e, i, o, n, r) {
                this._row = t,
                this._col = e,
                this._nodeWidth = i,
                this._nodeHeight = o,
                this._halfNodeWidth = n,
                this._halfNodeHeight = r
            }
            return t.prototype.getNodeByPixel = function(t, e) {
                var i = this.getWorldPointByPixel(t, e)
                  , o = this.getPixelByWorldPoint(i.x, i.y)
                  , r = this.getDerectByPixel(t, e)
                  , a = new n.default;
                return a.cx = i.x,
                a.cy = i.y,
                a.px = o.x,
                a.py = o.y,
                a.dx = r.x,
                a.dy = r.y,
                a
            }
            ,
            t.prototype.getNodeByDerect = function(t, e) {
                var i = this.getPixelByDerect(t, e)
                  , o = this.getWorldPointByPixel(i.x, i.y)
                  , r = new n.default;
                return r.cx = o.x,
                r.cy = o.y,
                r.px = i.x,
                r.py = i.y,
                r.dx = t,
                r.dy = e,
                r
            }
            ,
            t.prototype.getNodeByWorldPoint = function(t, e) {
                var i = this.getPixelByWorldPoint(t, e);
                return this.getNodeByPixel(i.x, i.y)
            }
            ,
            t.prototype.getWorldPointByPixel = function(t, e) {
                var i = Math.floor(t / this._nodeWidth)
                  , n = Math.floor(e / this._nodeHeight);
                return new o.default(i,n)
            }
            ,
            t.prototype.getPixelByWorldPoint = function(t, e) {
                var i = (t + 1) * this._nodeWidth - this._halfNodeWidth
                  , n = (e + 1) * this._nodeHeight - this._halfNodeHeight;
                return new o.default(i,n)
            }
            ,
            t.prototype.getDerectByPixel = function(t, e) {
                var i = Math.floor(t / this._nodeWidth)
                  , n = Math.floor(e / this._nodeHeight);
                return new o.default(i,n)
            }
            ,
            t.prototype.getDerectByWorldPoint = function(t, e) {
                return new o.default(t,e)
            }
            ,
            t.prototype.getPixelByDerect = function(t, e) {
                var i = (t + 1) * this._nodeWidth - this._halfNodeWidth
                  , n = (e + 1) * this._nodeHeight - this._halfNodeHeight;
                return new o.default(i,n)
            }
            ,
            t
        }()
          , h = function() {
            function t(t, e, i, o, n, r) {
                this._proportion = 1.732,
                this._row = t,
                this._col = e,
                this._nodeWidth = i,
                this._nodeHeight = o,
                this._halfNodeWidth = n,
                this._halfNodeHeight = r,
                this._nwDiv4 = this._nodeWidth / 4,
                this._radius = 4 * this._nwDiv4,
                this._proportion = 2 * this._nodeHeight / this._nodeWidth
            }
            return t.prototype.getNodeByPixel = function(t, e) {
                var i = this.getWorldPointByPixel(t, e)
                  , o = this.getPixelByWorldPoint(i.x, i.y)
                  , r = new n.default;
                return r.cx = i.x,
                r.cy = i.y,
                r.px = o.x,
                r.py = o.y,
                r.dx = i.x,
                r.dy = i.y,
                r
            }
            ,
            t.prototype.getNodeByDerect = function(t, e) {
                var i = this.getPixelByDerect(t, e)
                  , o = new n.default;
                return o.cx = t,
                o.cy = e,
                o.px = i.x,
                o.py = i.y,
                o.dx = t,
                o.dy = e,
                o
            }
            ,
            t.prototype.getNodeByWorldPoint = function(t, e) {
                var i = this.getPixelByWorldPoint(t, e);
                return this.getNodeByPixel(i.x, i.y)
            }
            ,
            t.prototype.getWorldPointByPixel = function(t, e) {
                var i, n, r, a = Math.floor(t / this._nwDiv4), s = Math.floor(a / 3);
                return (a - 1) % 6 == 0 || (a - 2) % 6 == 0 ? (n = s,
                r = i = Math.floor(e / this._nodeHeight)) : (a - 4) % 6 == 0 || (a - 5) % 6 == 0 ? (n = s,
                r = i = e < this._nodeHeight / 2 ? -1 : Math.floor((e - this._nodeHeight / 2) / this._nodeHeight)) : s % 2 == 0 ? (i = Math.floor(e / this._nodeHeight),
                this.testPointInHoneycomb(s, i, t, e) ? (n = s,
                r = i) : this.testPointInHoneycomb(s - 1, i - 1, t, e) ? (n = s - 1,
                r = i - 1) : (n = s - 1,
                r = i)) : (i = e < this._nodeHeight / 2 ? -1 : Math.floor((e - this._nodeHeight / 2) / this._nodeHeight),
                this.testPointInHoneycomb(s, i, t, e) ? (n = s,
                r = i) : this.testPointInHoneycomb(s - 1, i, t, e) ? (n = s - 1,
                r = i) : (n = s - 1,
                r = i + 1)),
                new o.default(n,r)
            }
            ,
            t.prototype.testPointInHoneycomb = function(t, e, i, o) {
                var n = 2 * this._nwDiv4
                  , r = this.getPixelByWorldPoint(t, e);
                return n - Math.abs(i - r.x) >= Math.abs(o - r.y) / this._proportion
            }
            ,
            t.prototype.getPixelByWorldPoint = function(t, e) {
                var i = (2 + 3 * t) / 4 * this._nodeWidth
                  , n = (e + .5 * (1 + t % 2)) * this._nodeHeight;
                return new o.default(i,n)
            }
            ,
            t.prototype.getDerectByPixel = function(t, e) {
                return this.getWorldPointByPixel(t, e)
            }
            ,
            t.prototype.getDerectByWorldPoint = function(t, e) {
                return new o.default(t,e)
            }
            ,
            t.prototype.getPixelByDerect = function(t, e) {
                var i = (2 + 3 * t) / 4 * this._nodeWidth
                  , n = (e + .5 * (1 + t % 2)) * this._nodeHeight;
                return new o.default(i,n)
            }
            ,
            t
        }()
          , d = function() {
            function t(t, e, i, o, n, r) {
                this.mapRoadHoneycomb = new h(t,e,i,o,n,r)
            }
            return t.prototype.transposedNode = function(t) {
                var e = t.cx
                  , i = t.dx
                  , o = t.px;
                return t.cx = t.cy,
                t.cy = e,
                t.dx = t.dy,
                t.dy = i,
                t.px = t.py,
                t.py = o,
                t
            }
            ,
            t.prototype.transposedPoint = function(t) {
                var e = t.x;
                return t.x = t.y,
                t.y = e,
                t
            }
            ,
            t.prototype.getNodeByPixel = function(t, e) {
                return this.transposedNode(this.mapRoadHoneycomb.getNodeByPixel(e, t))
            }
            ,
            t.prototype.getNodeByDerect = function(t, e) {
                return this.transposedNode(this.mapRoadHoneycomb.getNodeByDerect(e, t))
            }
            ,
            t.prototype.getNodeByWorldPoint = function(t, e) {
                return this.transposedNode(this.mapRoadHoneycomb.getNodeByWorldPoint(e, t))
            }
            ,
            t.prototype.getWorldPointByPixel = function(t, e) {
                return this.transposedPoint(this.mapRoadHoneycomb.getWorldPointByPixel(e, t))
            }
            ,
            t.prototype.getPixelByWorldPoint = function(t, e) {
                return this.transposedPoint(this.mapRoadHoneycomb.getPixelByWorldPoint(e, t))
            }
            ,
            t.prototype.getDerectByPixel = function(t, e) {
                return this.transposedPoint(this.mapRoadHoneycomb.getDerectByPixel(e, t))
            }
            ,
            t.prototype.getDerectByWorldPoint = function(t, e) {
                return this.transposedPoint(this.mapRoadHoneycomb.getDerectByWorldPoint(e, t))
            }
            ,
            t.prototype.getPixelByDerect = function(t, e) {
                return this.transposedPoint(this.mapRoadHoneycomb.getPixelByDerect(e, t))
            }
            ,
            t
        }();
        cc._RF.pop()
    }
    , {
        "../base/MapType": "MapType",
        "./Point": "Point",
        "./RoadNode": "RoadNode"
    }],
    MapType: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "967a1oZod1CQYHXqS8EHBnp", "MapType"),
        Object.defineProperty(i, "__esModule", {
            value: !0
        }),
        i.MapType = void 0,
        function(t) {
            t[t.angle45 = 0] = "angle45",
            t[t.angle90 = 1] = "angle90",
            t[t.honeycomb = 2] = "honeycomb",
            t[t.honeycomb2 = 3] = "honeycomb2"
        }(i.MapType || (i.MapType = {})),
        cc._RF.pop()
    }
    , {}],
    MapUnitLibrary: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "7d667jelq5OHp1b4vHAg5xN", "MapUnitLibrary"),
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var o = t("../EditorElement/EditorElement")
          , n = cc._decorator
          , r = n.ccclass
          , a = n.property
          , s = function(t) {
            function e() {
                var e = null !== t && t.apply(this, arguments) || this;
                return e.npcElenetPrefabArr = [],
                e.monsterElenetPrefabArr = [],
                e.transferPrefabArr = [],
                e.spawnPointPrefab = null,
                e.content = null,
                e.resItemTemplate = null,
                e.baseContentHeight = 0,
                e.selectItem = null,
                e.prefabList = null,
                e.sceneObject = null,
                e
            }
            var i;
            return __extends(e, t),
            i = e,
            e.prototype.onLoad = function() {
                i.instance = this
            }
            ,
            e.prototype.start = function() {}
            ,
            e.prototype.init = function() {}
            ,
            e.prototype.onDestroy = function() {}
            ,
            e.prototype.initCallback = function(t, e, i) {
                this._setBrush = t,
                this._clearBrush = e,
                this._callTarget = i
            }
            ,
            e.prototype.onBrushMouseDown = function() {
                if (this.sceneObject) {
                    var t = this.sceneObject.brush;
                    this._setBrush.apply(this._callTarget, [t])
                }
            }
            ,
            e.prototype.onBrushMouseUp = function() {}
            ,
            e.prototype.showSceneObject = function(t) {
                this.sceneObject && (this.sceneObject.node.destroy(),
                this.sceneObject = null);
                var e = cc.instantiate(this.prefabList[t]);
                e.position = cc.Vec2.ZERO,
                e.active = !0,
                this.sceneObject = e.getComponent(o.default)
            }
            ,
            e.prototype.getResItem = function() {
                var t = cc.instantiate(this.resItemTemplate);
                return t.active = !0,
                t.parent = this.resItemTemplate.parent,
                t.getChildByName("Selected").active = !1,
                t
            }
            ,
            e.prototype.getNpcElement = function(t) {
                if (t >= i.instance.npcElenetPrefabArr.length)
                    return null;
                null == i.instance.npcElenetPrefabArr[t] && (t = 0);
                var e = cc.instantiate(i.instance.npcElenetPrefabArr[t]).getComponent(o.default);
                return e.npcType = t,
                e
            }
            ,
            e.prototype.getMonsterElement = function(t) {
                if (t >= i.instance.monsterElenetPrefabArr.length)
                    return null;
                null == i.instance.monsterElenetPrefabArr[t] && (t = 0);
                var e = cc.instantiate(i.instance.monsterElenetPrefabArr[t]).getComponent(o.default);
                return e.monsterType = t,
                e
            }
            ,
            e.prototype.getTransferElement = function(t) {
                if (t >= i.instance.transferPrefabArr.length)
                    return null;
                null == i.instance.transferPrefabArr[t] && (t = 0);
                var e = cc.instantiate(i.instance.transferPrefabArr[t]).getComponent(o.default);
                return e.transferType = t,
                e
            }
            ,
            e.instance = null,
            __decorate([a(cc.Prefab)], e.prototype, "npcElenetPrefabArr", void 0),
            __decorate([a(cc.Prefab)], e.prototype, "monsterElenetPrefabArr", void 0),
            __decorate([a(cc.Prefab)], e.prototype, "transferPrefabArr", void 0),
            __decorate([a(cc.Prefab)], e.prototype, "spawnPointPrefab", void 0),
            __decorate([a(cc.Node)], e.prototype, "content", void 0),
            __decorate([a(cc.Node)], e.prototype, "resItemTemplate", void 0),
            i = __decorate([r], e)
        }(cc.Component);
        i.default = s,
        cc._RF.pop()
    }
    , {
        "../EditorElement/EditorElement": "EditorElement"
    }],
    MementoNode: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "9ca5cgTy0xBW7KJ6nkEalN6", "MementoNode"),
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var o = function() {
            function t() {
                this.parent = null,
                this.mementoDic = {}
            }
            return t.prototype.saveChangeMemento = function(t) {
                for (var e = 0; e < t.length; e++) {
                    var i = t[e];
                    this.mementoDic[i.attribute] = i
                }
            }
            ,
            t.prototype.getMementoByAttribute = function(t) {
                return this.mementoDic[t]
            }
            ,
            t.prototype.recoverMemento = function() {
                for (var t in this.mementoDic)
                    this.mementoDic[t].recover()
            }
            ,
            t
        }();
        i.default = o,
        cc._RF.pop()
    }
    , {}],
    Memento: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "9a560ZeuXdDZYQsymYspRWT", "Memento"),
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var o = function() {
            function t(t, e, i) {
                this._originator = t,
                this._attribute = e,
                this._value = i
            }
            return t.prototype.recover = function() {
                this._originator[this._attribute] = this._value
            }
            ,
            t.prototype.destroy = function() {
                this._originator = null
            }
            ,
            Object.defineProperty(t.prototype, "originator", {
                get: function() {
                    return this._originator
                },
                set: function(t) {
                    this._originator = t
                },
                enumerable: !1,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, "attribute", {
                get: function() {
                    return this._attribute
                },
                set: function(t) {
                    this._attribute = t
                },
                enumerable: !1,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, "value", {
                get: function() {
                    return this._value
                },
                set: function(t) {
                    this._value = t
                },
                enumerable: !1,
                configurable: !0
            }),
            t.prototype.toString = function() {
                return this._attribute + " \u4fee\u6539\u7684\u5c5e\u6027\uff1a\uff08" + this.attribute + "),  \u4fee\u6539\u7684\u503c\u4e3a\uff1a\uff08" + this._value + ")"
            }
            ,
            t
        }();
        i.default = o,
        cc._RF.pop()
    }
    , {}],
    MenuItem: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "d5474lkZvpKb5oQoDYLmb+h", "MenuItem"),
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var o = t("../editor/UIManager")
          , n = t("./MenuPanel")
          , r = cc._decorator
          , a = r.ccclass
          , s = r.property
          , c = function(t) {
            function e() {
                var e = null !== t && t.apply(this, arguments) || this;
                return e.bg = null,
                e.label = null,
                e.arror = null,
                e.isRootMenu = !0,
                e.menuPanelPrefab = null,
                e.myMenuBar = null,
                e.myParentMenuPanel = null,
                e.myChildMenuPanel = null,
                e.data = null,
                e.mouseEnterCallback = null,
                e.mouseLeaveCallback = null,
                e
            }
            return __extends(e, t),
            e.prototype.start = function() {
                this.node.on(cc.Node.EventType.MOUSE_ENTER, this.onMouseEnter, this),
                this.node.on(cc.Node.EventType.MOUSE_LEAVE, this.onMouseLeave, this),
                this.node.on(cc.Node.EventType.TOUCH_START, this.onMouseDown, this),
                this.node.on(cc.Node.EventType.MOUSE_UP, this.onMouseUp, this),
                this.bg.active = !1
            }
            ,
            e.prototype.onMouseEnter = function() {
                if (this.bg.opacity = 125,
                this.bg.active = !0,
                this.mouseEnterCallback && this.mouseEnterCallback(this),
                this.myMenuBar && this.myMenuBar.selectMenuItem && this.myMenuBar.selectMenuItem != this && !this.myMenuBar.selectMenuItem.isRootMenu) {
                    for (var t = !1, e = this.myParentMenuPanel; null != e; ) {
                        if (this.myMenuBar.selectMenuItem.myChildMenuPanel == e) {
                            t = !0;
                            break
                        }
                        e = e.myParentMenuPanel
                    }
                    t || this.myMenuBar.selectMenuItem.closeChildMenuPanel()
                }
                this.myMenuBar.selectMenuItem = this,
                this.openMenuPanel()
            }
            ,
            e.prototype.onMouseLeave = function() {
                this.bg.active = !1,
                this.mouseLeaveCallback && this.mouseLeaveCallback(this)
            }
            ,
            e.prototype.onMouseDown = function() {
                this.bg.active = !0,
                this.bg.opacity = 200
            }
            ,
            e.prototype.onMouseUp = function() {
                if (this.bg.active = !0,
                this.bg.opacity = 125,
                !this.isRootMenu && this.myParentMenuPanel) {
                    for (var t = this.myParentMenuPanel; null != t.myParentMenuPanel; )
                        t = t.myParentMenuPanel;
                    t && t.close(),
                    this.myParentMenuPanel = null
                }
                this.myMenuBar && this.myMenuBar.itemClick && this.myMenuBar.itemClick(this.data)
            }
            ,
            e.prototype.setData = function(t) {
                this.data = t,
                this.isRootMenu ? this.arror.active = !1 : this.arror.active = null != this.data.children
            }
            ,
            e.prototype.setText = function(t) {
                var e = this;
                this.label.string = t,
                this.scheduleOnce(function() {
                    e.bg.width = e.label.node.width + 30,
                    e.node.width = e.bg.width
                })
            }
            ,
            e.prototype.setChildMenuText = function(t) {
                this.label.string = t
            }
            ,
            e.prototype.setWidth = function(t) {
                this.bg.width = t,
                this.node.width = t,
                this.arror.x = t - 20
            }
            ,
            e.prototype.openMenuPanel = function() {
                if (this.data && this.data.children && (this.myChildMenuPanel && this.myChildMenuPanel.isClose && (this.myChildMenuPanel = null),
                !this.myChildMenuPanel)) {
                    var t = this.node.parent.convertToWorldSpaceAR(this.node.position)
                      , e = o.default.instance.menuLayer.convertToNodeSpaceAR(t);
                    this.myChildMenuPanel = this.getMenuPanel(),
                    this.myChildMenuPanel.myParentMenuPanel = this.myParentMenuPanel,
                    this.myChildMenuPanel.init(this.data, this.myMenuBar),
                    this.isRootMenu ? (this.myChildMenuPanel.node.x = e.x - this.node.width / 2,
                    this.myChildMenuPanel.node.y = e.y - this.node.height / 2 - 2) : (this.myChildMenuPanel.node.x = e.x + this.node.width + 2,
                    this.myChildMenuPanel.node.y = e.y + this.node.height / 2)
                }
            }
            ,
            e.prototype.closeChildMenuPanel = function() {
                this.myChildMenuPanel && (this.myChildMenuPanel.isClose || this.myChildMenuPanel.close(),
                this.myChildMenuPanel = null)
            }
            ,
            e.prototype.getMenuPanel = function() {
                var t = cc.instantiate(this.menuPanelPrefab).getComponent(n.default);
                return t.node.active = !0,
                t.node.parent = o.default.instance.menuLayer,
                t
            }
            ,
            __decorate([s(cc.Node)], e.prototype, "bg", void 0),
            __decorate([s(cc.Label)], e.prototype, "label", void 0),
            __decorate([s(cc.Node)], e.prototype, "arror", void 0),
            __decorate([s()], e.prototype, "isRootMenu", void 0),
            __decorate([s(cc.Prefab)], e.prototype, "menuPanelPrefab", void 0),
            __decorate([a], e)
        }(cc.Component);
        i.default = c,
        cc._RF.pop()
    }
    , {
        "../editor/UIManager": "UIManager",
        "./MenuPanel": "MenuPanel"
    }],
    MenuPanel: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "c49f8A9xR5PqJhbPVJwr+qt", "MenuPanel"),
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var o = t("./MenuItem")
          , n = cc._decorator
          , r = n.ccclass
          , a = n.property
          , s = function(t) {
            function e() {
                var e = null !== t && t.apply(this, arguments) || this;
                return e.menuItemPrefab = null,
                e.myParentMenuPanel = null,
                e.menuItemList = [],
                e.data = null,
                e.isClose = !1,
                e
            }
            return __extends(e, t),
            e.prototype.start = function() {}
            ,
            e.prototype.init = function(t, e) {
                var i = this;
                this.data = t;
                for (var o = this.data.children.length, n = 0; n < o; n++) {
                    var r = this.getMenuItem();
                    r.node.parent = this.node,
                    this.menuItemList.push(r),
                    r.myMenuBar = e,
                    r.myParentMenuPanel = this,
                    r.setData(this.data.children[n]),
                    r.setChildMenuText(this.data.children[n].label)
                }
                this.scheduleOnce(function() {
                    for (var t = 0, e = 0; e < i.menuItemList.length; e++)
                        i.menuItemList[e].label.node.width > t && (t = i.menuItemList[e].label.node.width);
                    for (i.node.width = t + 85,
                    e = 0; e < i.menuItemList.length; e++)
                        i.menuItemList[e].setWidth(i.node.width)
                })
            }
            ,
            e.prototype.getMenuItem = function() {
                var t = cc.instantiate(this.menuItemPrefab).getComponent(o.default);
                return t.node.active = !0,
                t
            }
            ,
            e.prototype.close = function() {
                for (var t = 0; t < this.menuItemList.length; t++)
                    this.menuItemList[t].closeChildMenuPanel();
                this.isClose = !0,
                this.node.destroy()
            }
            ,
            __decorate([a(cc.Prefab)], e.prototype, "menuItemPrefab", void 0),
            __decorate([r], e)
        }(cc.Component);
        i.default = s,
        cc._RF.pop()
    }
    , {
        "./MenuItem": "MenuItem"
    }],
    Menubar: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "0733dcSyZdHiYuVv4wndSO7", "Menubar"),
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var o = t("./MenuItem")
          , n = cc._decorator
          , r = n.ccclass
          , a = n.property
          , s = function(t) {
            function e() {
                var e = null !== t && t.apply(this, arguments) || this;
                return e.menuItemPrefab = null,
                e.menuItemList = [],
                e.selectMainMenuItem = null,
                e.selectMenuItem = null,
                e.itemClick = null,
                e.data = [{
                    label: "File",
                    children: [{
                        label: "New (CTRL + N)",
                        data: 1,
                        children: [{
                            label: "Menu 1"
                        }, {
                            label: "Menu 2"
                        }, {
                            label: "Menu 3",
                            children: [{
                                label: "Menu 4"
                            }, {
                                label: "Menu 5"
                            }]
                        }]
                    }, {
                        label: "Open (CTRL + O)",
                        data: 2
                    }, {
                        label: "Save (CTRL + S)",
                        data: 3
                    }, {
                        label: "Save As (CTRL + SHIFT + S)",
                        data: 4
                    }]
                }, {
                    label: "Edit",
                    children: [{
                        label: "Add Walkable Node (Q)",
                        data: 1
                    }, {
                        label: "Add Unwalkable Node (W)",
                        data: 2
                    }, {
                        label: "Add Transparent Walkable Node (E)",
                        data: 3
                    }, {
                        label: "Add Transfer Node (R)",
                        data: 4
                    }, {
                        label: "Delete Node (D)",
                        data: 5
                    }, {
                        label: "Stop Placing Nodes (T)",
                        data: 6
                    }, {
                        label: "Stop Editing Events (S)",
                        data: 7
                    }, {
                        label: "Convert Node Style (CTRL + B)",
                        data: 8
                    }, {
                        label: "Hide Unwalkable Nodes (F1)",
                        data: 9
                    }, {
                        label: "Show/Hide Map (U)",
                        data: 10
                    }, {
                        label: "Show/Hide Objects (O)",
                        data: 11
                    }, {
                        label: "Show/Hide Nodes (I)",
                        data: 12
                    }, {
                        label: "Show/Hide Grid (P)",
                        data: 13
                    }, {
                        label: "Show Map Object Anchor Points (K)",
                        data: 14
                    }, {
                        label: "Cut (CTRL + X)",
                        data: 15
                    }, {
                        label: "Copy (CTRL + C)",
                        data: 16
                    }, {
                        label: "Paste (CTRL + V)",
                        data: 17
                    }]
                }, {
                    label: "Commands",
                    children: [{
                        label: "Run Test (ctrl + enter)",
                        data: 1
                    }, {
                        label: "Export Map Slices (ctrl + W)",
                        data: 2
                    }, {
                        label: "Export Reduced Map (ctrl + T)",
                        data: 3
                    }]
                }, {
                    label: "Window",
                    children: [{
                        label: "Mini Map Preview Panel (F2)",
                        data: 1
                    }, {
                        label: "Node Editing Mode (N)",
                        data: 2
                    }, {
                        label: "Normal Editing Mode (M)",
                        data: 3
                    }]
                }, {
                    label: "Help",
                    children: [{
                        label: "Contact Us",
                        data: 1
                    }]
                }],
                e
            }
            return __extends(e, t),
            e.prototype.start = function() {}
            ,
            e.prototype.setData = function(t) {
                var e = this;
                this.data = t;
                for (var i = 0; i < this.data.length; i++) {
                    var o = this.getMenuItem();
                    o.node.parent = this.node,
                    this.menuItemList.push(o),
                    o.myMenuBar = this,
                    o.setData(this.data[i]),
                    o.setText(this.data[i].label),
                    o.mouseEnterCallback = function(t) {
                        e.selectMainMenuItem && e.selectMainMenuItem != t && e.selectMainMenuItem.closeChildMenuPanel(),
                        e.selectMainMenuItem = t
                    }
                    ,
                    this.data[i].children
                }
            }
            ,
            e.prototype.closeMenu = function() {
                this.selectMainMenuItem && (this.selectMainMenuItem.closeChildMenuPanel(),
                this.selectMainMenuItem = null),
                this.selectMenuItem = null
            }
            ,
            e.prototype.getMenuItem = function() {
                var t = cc.instantiate(this.menuItemPrefab).getComponent(o.default);
                return t.node.active = !0,
                t
            }
            ,
            __decorate([a(cc.Prefab)], e.prototype, "menuItemPrefab", void 0),
            __decorate([r], e)
        }(cc.Component);
        i.default = s,
        cc._RF.pop()
    }
    , {
        "./MenuItem": "MenuItem"
    }],
    MiniMapView: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "39642CrwF9G3bswk3K7R/2d", "MiniMapView"),
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var o = t("../../editor/MapEditor")
          , n = t("../base/BaseView")
          , r = cc._decorator
          , a = r.ccclass
          , s = r.property
          , c = function(t) {
            function e() {
                var e = null !== t && t.apply(this, arguments) || this;
                return e.miniMap = null,
                e.viewRect = null,
                e._mapScale = 1,
                e._rectSize = new cc.Size(0,0),
                e
            }
            return __extends(e, t),
            e.prototype.start = function() {
                this.miniMap.node.on(cc.Node.EventType.TOUCH_START, this.onClickMiniMap, this)
            }
            ,
            e.prototype.init = function() {
                var t = o.default.instance.editArea.mapLayer.bgImage;
                this.miniMap.spriteFrame = t.spriteFrame,
                t.node.width > t.node.height ? (this.miniMap.node.width = t.node.width > this.content.width - 4 ? this.content.width - 4 : t.node.width,
                this.miniMap.node.height = t.node.height * this.miniMap.node.width / t.node.width) : (this.miniMap.node.height = t.node.height > this.content.height - 4 ? this.content.height - 4 : t.node.height,
                this.miniMap.node.width = t.node.width * this.miniMap.node.height / t.node.height),
                this.miniMap.node.x = -this.miniMap.node.width / 2,
                this.miniMap.node.y = -this.miniMap.node.height / 2,
                this.viewRect.x = this.miniMap.node.x,
                this.viewRect.y = this.miniMap.node.y,
                this._mapScale = this.miniMap.node.width / t.node.width,
                t.node.width > o.default.instance.editAreaView.width || t.node.height > o.default.instance.editAreaView.height ? (this._rectSize.width = o.default.instance.editAreaView.width * this._mapScale,
                this._rectSize.height = o.default.instance.editAreaView.height * this._mapScale) : (this._rectSize.width = 0,
                this._rectSize.height = 0),
                this.refreshViewRect(0, 0)
            }
            ,
            e.prototype.refreshViewRect = function(t, e) {
                var i = this.viewRect.getComponent(cc.Graphics);
                i || (i = this.viewRect.addComponent(cc.Graphics));
                var n = o.default.instance.editArea.editStage.scale;
                if (this._rectSize.width > 0 && this._rectSize.height > 0) {
                    var r = t * this._mapScale / n
                      , a = e * this._mapScale / n;
                    i.clear(),
                    i.rect(r, a, this._rectSize.width / n, this._rectSize.height / n),
                    i.lineWidth = 4,
                    i.strokeColor.fromHEX("#ffffff"),
                    i.stroke()
                } else
                    i.clear()
            }
            ,
            e.prototype.onClickMiniMap = function(t) {
                var e = this.miniMap.node.convertToNodeSpaceAR(t.getLocation());
                e.x = e.x / this._mapScale,
                e.y = e.y / this._mapScale,
                o.default.instance.editArea.setMapViewToPoint(e.x, e.y)
            }
            ,
            __decorate([s(cc.Sprite)], e.prototype, "miniMap", void 0),
            __decorate([s(cc.Node)], e.prototype, "viewRect", void 0),
            __decorate([a], e)
        }(n.default);
        i.default = c,
        cc._RF.pop()
    }
    , {
        "../../editor/MapEditor": "MapEditor",
        "../base/BaseView": "BaseView"
    }],
    MovieClip: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "cb924t7AD1JlaIj9BYSsdh8", "MovieClip"),
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var o = cc._decorator
          , n = o.ccclass
          , r = o.property
          , a = function(t) {
            function e() {
                var e = null !== t && t.apply(this, arguments) || this;
                return e.m_sprite = null,
                e.timer = .1,
                e.interval = .1,
                e.texture = null,
                e.playTimes = 0,
                e.row = 4,
                e.col = 4,
                e.rowIndex = 0,
                e.isAll = !1,
                e.autoPlayOnLoad = !0,
                e.autoDestroy = !1,
                e.begin = 0,
                e.end = 0,
                e.totalFrame = 8,
                e.currentFrame = 0,
                e.currentTimes = 0,
                e.running = !0,
                e._playIndex = 0,
                e._pieceWidth = 0,
                e._pieceHeight = 0,
                e._bitmapArr = [],
                e
            }
            return __extends(e, t),
            Object.defineProperty(e.prototype, "playIndex", {
                get: function() {
                    return this._playIndex
                },
                set: function(t) {
                    this._playIndex = t
                },
                enumerable: !1,
                configurable: !0
            }),
            e.prototype.onLoad = function() {
                0 == this.end && (this.end = this.col),
                this.rowIndex = this.clamp(this.rowIndex, 0, this.row - 1),
                this._pieceWidth = this.texture.width / this.col,
                this._pieceHeight = this.texture.height / this.row,
                this.m_sprite = this.getComponent(cc.Sprite),
                this.m_sprite || (this.m_sprite = this.addComponent(cc.Sprite));
                for (var t = 0; t < this.row; t++) {
                    this._bitmapArr[t] = [];
                    for (var e = 0; e < this.col; e++)
                        this._bitmapArr[t][e] = new cc.SpriteFrame(this.texture,new cc.Rect(e * this._pieceWidth,t * this._pieceHeight,this._pieceWidth,this._pieceHeight),!1,cc.v2(0, 0),new cc.Size(this._pieceWidth,this._pieceHeight))
                }
                this.m_sprite.spriteFrame = this._bitmapArr[this.rowIndex][0],
                this.node.width = this._pieceWidth,
                this.node.height = this._pieceHeight,
                this.timer = 0,
                this.running = this.autoPlayOnLoad
            }
            ,
            e.prototype.reset = function() {
                this.timer = 0,
                this.playIndex = 0,
                this.currentTimes = 0,
                this.currentFrame = 0,
                this.playAction()
            }
            ,
            e.prototype.update = function(t) {
                this.running && (0 == this.playTimes || this.currentTimes != this.playTimes ? (this.timer -= t,
                this.timer <= 0 && (this.timer = this.interval,
                this.currentFrame = this.currentFrame % this.col,
                this.playAction(),
                this.currentFrame++,
                this.currentFrame == this.col && (this.isAll ? (this.rowIndex++,
                this.rowIndex == this.row && (this.currentTimes++,
                this.node.emit("completeTimes"),
                0 != this.playTimes && this.currentTimes == this.playTimes && (this.node.emit("complete"),
                this.autoDestroy && this.node.destroy())),
                this.rowIndex %= this.row) : (this.currentTimes++,
                this.node.emit("completeTimes"),
                0 != this.playTimes && this.currentTimes == this.playTimes && (this.node.emit("complete"),
                this.autoDestroy && this.node.destroy()))))) : this.running = !1)
            }
            ,
            e.prototype.playAction = function() {
                this.rowIndex = this.clamp(this.rowIndex, 0, this.row - 1),
                this._playIndex = this._playIndex % (this.end - this.begin) + this.begin,
                this.m_sprite.spriteFrame = this._bitmapArr[this.rowIndex][this._playIndex],
                this._playIndex++
            }
            ,
            e.prototype.play = function() {
                this.running = !0
            }
            ,
            e.prototype.stop = function() {
                this.running = !1
            }
            ,
            e.prototype.gotoAndPlay = function(t) {
                this.running = !0,
                this._playIndex = t,
                this._playIndex = this.clamp(this._playIndex, 0, this.col - 1)
            }
            ,
            e.prototype.gotoAndStop = function(t) {
                this.running = !1,
                this._playIndex = t,
                this._playIndex = this.clamp(this._playIndex, 0, this.col - 1),
                this.m_sprite.spriteFrame = this._bitmapArr[this.rowIndex][this._playIndex]
            }
            ,
            e.prototype.clamp = function(t, e, i) {
                return t < e ? e : t > i ? i : t
            }
            ,
            __decorate([r(cc.Float)], e.prototype, "interval", void 0),
            __decorate([r({
                type: cc.Texture2D
            })], e.prototype, "texture", void 0),
            __decorate([r({
                type: cc.Integer
            })], e.prototype, "playTimes", void 0),
            __decorate([r(cc.Integer)], e.prototype, "row", void 0),
            __decorate([r(cc.Integer)], e.prototype, "col", void 0),
            __decorate([r(cc.Integer)], e.prototype, "rowIndex", void 0),
            __decorate([r(cc.Boolean)], e.prototype, "isAll", void 0),
            __decorate([r(cc.Boolean)], e.prototype, "autoPlayOnLoad", void 0),
            __decorate([r(cc.Boolean)], e.prototype, "autoDestroy", void 0),
            __decorate([r()], e.prototype, "begin", void 0),
            __decorate([r()], e.prototype, "end", void 0),
            __decorate([n], e)
        }(cc.Component);
        i.default = a,
        cc._RF.pop()
    }
    , {}],
    NavAgent: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "63874+gSdVOLqqXYqH3sh6x", "NavAgent"),
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var o = cc._decorator
          , n = o.ccclass
          , r = (o.property,
        function(t) {
            function e() {
                var e = null !== t && t.apply(this, arguments) || this;
                return e._direction = 0,
                e.moving = !1,
                e.moveSpeed = 200,
                e._moveAngle = 0,
                e._roadNodeArr = [],
                e._nodeIndex = 0,
                e
            }
            return __extends(e, t),
            Object.defineProperty(e.prototype, "direction", {
                get: function() {
                    return this._direction
                },
                set: function(t) {
                    this._direction = t
                },
                enumerable: !1,
                configurable: !0
            }),
            e.prototype.start = function() {
                this.direction = 0
            }
            ,
            e.prototype.update = function(t) {
                if (this.moving) {
                    var e = this._roadNodeArr[this._nodeIndex]
                      , i = e.px - this.node.x
                      , o = e.py - this.node.y
                      , n = this.moveSpeed * t;
                    if (i * i + o * o > n * n) {
                        if (0 == this._moveAngle) {
                            this._moveAngle = Math.atan2(o, i);
                            var r = Math.round((-this._moveAngle + Math.PI) / (Math.PI / 4));
                            this.direction = r > 5 ? r - 6 : r + 2
                        }
                        var a = Math.cos(this._moveAngle) * n
                          , s = Math.sin(this._moveAngle) * n;
                        this.node.x += a,
                        this.node.y += s
                    } else
                        this._moveAngle = 0,
                        this._nodeIndex == this._roadNodeArr.length - 1 ? (this.node.x = e.px,
                        this.node.y = e.py,
                        this.stop()) : this.walk()
                }
            }
            ,
            e.prototype.walkByRoad = function(t) {
                this._roadNodeArr = t,
                this._nodeIndex = 0,
                this._moveAngle = 0,
                this.walk(),
                this.move()
            }
            ,
            e.prototype.walk = function() {
                this._nodeIndex < this._roadNodeArr.length - 1 && this._nodeIndex++
            }
            ,
            e.prototype.move = function() {
                this.moving = !0
            }
            ,
            e.prototype.stop = function() {
                this.moving = !1
            }
            ,
            __decorate([n], e)
        }(cc.Component));
        i.default = r,
        cc._RF.pop()
    }
    , {}],
    NewMapView: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "876be3kvgdLq6Phd63cANOS", "NewMapView"),
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var o = t("../../base/MapParams")
          , n = t("../../base/MapType")
          , r = t("../../editor/MapEditor")
          , a = t("../../editor/WebFileHandler")
          , s = t("../../layer/GridLayer")
          , c = t("../base/BaseView")
          , h = cc._decorator
          , d = h.ccclass
          , l = h.property
          , p = function(t) {
            function e() {
                var e = null !== t && t.apply(this, arguments) || this;
                return e.mapNameTxt = null,
                e.mapWidthTxt = null,
                e.mapHeightTxt = null,
                e.roadWidthTxt = null,
                e.roadHeigthTxt = null,
                e.bgPathTxt = null,
                e.openBgBtn = null,
                e.confireBtn = null,
                e.cancleBtn = null,
                e.bigMapHelpBtn = null,
                e.detailTxt = null,
                e.mapTypeToggle = null,
                e.regularHexagonCheckBox = null,
                e.gridLayer = null,
                e.webFileHandler = new a.default,
                e.bgTex = null,
                e.bgName = "",
                e.mapType = n.MapType.angle45,
                e.numperspective = .5773,
                e.maxCeilCountLimit = 25e5,
                e
            }
            return __extends(e, t),
            e.prototype.start = function() {
                var t = this;
                this.openBgBtn.node.on(cc.Node.EventType.TOUCH_START, function() {
                    t.webFileHandler.openImageWin(function(e, i) {
                        t.bgTex = e;
                        var o = i.name.lastIndexOf(".");
                        t.bgName = i.name.slice(0, o),
                        t.bgPathTxt.string = i.name,
                        t.mapWidthTxt.string = "" + e.width,
                        t.mapHeightTxt.string = "" + e.height
                    })
                }, this),
                this.confireBtn.node.on(cc.Node.EventType.TOUCH_START, function() {
                    if (t.bgTex) {
                        var e = Number(t.mapWidthTxt.string) ? Number(t.mapWidthTxt.string) : t.bgTex.width
                          , i = Number(t.mapHeightTxt.string) ? Number(t.mapHeightTxt.string) : t.bgTex.height
                          , a = Number(t.roadWidthTxt.string) ? Number(t.roadWidthTxt.string) : 60
                          , s = Number(t.roadHeigthTxt.string) ? Number(t.roadHeigthTxt.string) : 60
                          , c = Math.ceil(e / a)
                          , h = Math.ceil(i / s);
                        switch (t.mapType) {
                        case n.MapType.angle45:
                            c = Math.ceil(e / a),
                            h = 2 * Math.ceil(i / s);
                            break;
                        case n.MapType.angle90:
                            c = Math.ceil(e / a),
                            h = Math.ceil(i / s);
                            break;
                        case n.MapType.honeycomb:
                            c = 2 * Math.ceil((e - a / 4) / (a / 4 * 6)),
                            h = Math.ceil((i - s / 2) / s);
                            break;
                        case n.MapType.honeycomb2:
                            c = Math.ceil((e - s / 2) / s),
                            h = 2 * Math.ceil((i - a / 4) / (a / 4 * 6))
                        }
                        if (c * h > t.maxCeilCountLimit)
                            cc.sys.isBrowser && setTimeout(function() {
                                alert("\u8def\u70b9\u683c\u5b50\u6570\u4e0d\u80fd\u8d85\u8fc7" + t.maxCeilCountLimit + ",\u521b\u5efa\u5931\u8d25\uff0c\u8bf7\u91cd\u65b0\u8c03\u6574\u8def\u70b9\u683c\u5b50\u5927\u5c0f")
                            }, 100);
                        else {
                            var d = new o.default;
                            d.name = t.mapNameTxt.string,
                            d.mapType = t.mapType,
                            d.mapWidth = e,
                            d.mapHeight = i,
                            d.ceilWidth = a,
                            d.ceilHeight = s,
                            d.bgTex = t.bgTex,
                            d.bgName = t.bgName,
                            r.default.instance.initMap(d),
                            t.close()
                        }
                    } else
                        cc.sys.isBrowser && setTimeout(function() {
                            alert("\u8fd8\u6ca1\u9009\u62e9\u5e95\u56fe")
                        }, 100)
                }, this),
                this.cancleBtn.node.on(cc.Node.EventType.TOUCH_START, function() {
                    t.close()
                }, this),
                this.bigMapHelpBtn.node.on(cc.Node.EventType.TOUCH_START, function() {
                    r.default.instance.OpenBigMapHelpView()
                }, this),
                this.regularHexagonCheckBox.node.active = !1,
                this.detailTxt.node.active = !1,
                this.drawGrid()
            }
            ,
            e.prototype.checkToggle = function(t) {
                this.mapType = this.mapTypeToggle.toggleItems.indexOf(t),
                this.mapType == n.MapType.angle45 ? (this.roadWidthTxt.string = "60",
                this.roadHeigthTxt.string = "30",
                this.lockRoadHeightTxt(!1),
                this.regularHexagonCheckBox.node.active = !1,
                this.detailTxt.node.active = !1) : this.mapType == n.MapType.angle90 ? (this.roadWidthTxt.string = "40",
                this.roadHeigthTxt.string = "40",
                this.lockRoadHeightTxt(!1),
                this.regularHexagonCheckBox.node.active = !1,
                this.detailTxt.node.active = !1) : this.mapType == n.MapType.honeycomb ? (this.roadWidthTxt.string = "40",
                this.roadHeigthTxt.string = "" + Number(this.roadWidthTxt.string) / 2 * 1.732,
                this.roadHeigthTxt.enabled = !1,
                this.regularHexagonCheckBox.node.active = !0,
                this.detailTxt.node.active = !0,
                this.regularHexagonCheckBox.isChecked ? this.lockRoadHeightTxt(!0) : this.lockRoadHeightTxt(!1)) : this.mapType == n.MapType.honeycomb2 && (this.roadWidthTxt.string = "40",
                this.roadHeigthTxt.string = "" + Number(this.roadWidthTxt.string) / 2 * 1.732,
                this.roadHeigthTxt.enabled = !1,
                this.regularHexagonCheckBox.node.active = !0,
                this.detailTxt.node.active = !0,
                this.regularHexagonCheckBox.isChecked ? this.lockRoadHeightTxt(!0) : this.lockRoadHeightTxt(!1)),
                this.drawGrid()
            }
            ,
            e.prototype.checkRegularHexagon = function(t) {
                t.isChecked ? this.lockRoadHeightTxt(!0) : this.lockRoadHeightTxt(!1)
            }
            ,
            e.prototype.lockRoadHeightTxt = function(t) {
                t ? (this.roadHeigthTxt.enabled = !1,
                this.roadHeigthTxt.node.getChildByName("TEXT_LABEL").opacity = 150) : (this.roadHeigthTxt.enabled = !0,
                this.roadHeigthTxt.node.getChildByName("TEXT_LABEL").opacity = 255)
            }
            ,
            e.prototype.onTextInputChange = function(t, e) {
                e == this.roadWidthTxt && (this.mapType != n.MapType.honeycomb && this.mapType != n.MapType.honeycomb2 || this.regularHexagonCheckBox.isChecked && (this.roadHeigthTxt.string = "" + Number(this.roadWidthTxt.string) / 2 * 1.732)),
                this.drawGrid()
            }
            ,
            e.prototype.drawGrid = function() {
                var t = this.gridLayer.node.width
                  , e = this.gridLayer.node.height
                  , i = Number(this.roadWidthTxt.string) ? Number(this.roadWidthTxt.string) : 60
                  , o = Number(this.roadHeigthTxt.string) ? Number(this.roadHeigthTxt.string) : 60;
                0 != t && 0 != e && 0 != i && 0 != o && this.gridLayer.drawGrid(t, e, i, o, this.mapType, !1)
            }
            ,
            e.prototype.close = function() {
                this.node && this.node.isValid && (this.node.active = !1,
                this.node.destroy())
            }
            ,
            __decorate([l(cc.EditBox)], e.prototype, "mapNameTxt", void 0),
            __decorate([l(cc.EditBox)], e.prototype, "mapWidthTxt", void 0),
            __decorate([l(cc.EditBox)], e.prototype, "mapHeightTxt", void 0),
            __decorate([l(cc.EditBox)], e.prototype, "roadWidthTxt", void 0),
            __decorate([l(cc.EditBox)], e.prototype, "roadHeigthTxt", void 0),
            __decorate([l(cc.Label)], e.prototype, "bgPathTxt", void 0),
            __decorate([l(cc.Button)], e.prototype, "openBgBtn", void 0),
            __decorate([l(cc.Button)], e.prototype, "confireBtn", void 0),
            __decorate([l(cc.Button)], e.prototype, "cancleBtn", void 0),
            __decorate([l(cc.Button)], e.prototype, "bigMapHelpBtn", void 0),
            __decorate([l(cc.Label)], e.prototype, "detailTxt", void 0),
            __decorate([l(cc.ToggleContainer)], e.prototype, "mapTypeToggle", void 0),
            __decorate([l(cc.Toggle)], e.prototype, "regularHexagonCheckBox", void 0),
            __decorate([l(s.default)], e.prototype, "gridLayer", void 0),
            __decorate([d], e)
        }(c.default);
        i.default = p,
        cc._RF.pop()
    }
    , {
        "../../base/MapParams": "MapParams",
        "../../base/MapType": "MapType",
        "../../editor/MapEditor": "MapEditor",
        "../../editor/WebFileHandler": "WebFileHandler",
        "../../layer/GridLayer": "GridLayer",
        "../base/BaseView": "BaseView"
    }],
    OpenMapView: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "d3735DnvSNBD6YEDTVYQt/W", "OpenMapView"),
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var o = t("../../editor/MapEditor")
          , n = t("../../editor/WebFileHandler")
          , r = t("../base/BaseView")
          , a = cc._decorator
          , s = a.ccclass
          , c = a.property
          , h = function(t) {
            function e() {
                var e = null !== t && t.apply(this, arguments) || this;
                return e.dataPathTxt = null,
                e.openDataBtn = null,
                e.bgPathTxt = null,
                e.openBgBtn = null,
                e.confireBtn = null,
                e.cancleBtn = null,
                e.webFileHandler = new n.default,
                e.bgTex = null,
                e.bgName = "",
                e._mapData = null,
                e
            }
            return __extends(e, t),
            e.prototype.start = function() {
                var t = this;
                this.openDataBtn.node.on(cc.Node.EventType.TOUCH_START, function() {
                    t.webFileHandler.openTextWin(function(e, i) {
                        t._mapData = JSON.parse(e),
                        t.dataPathTxt.string = i.name
                    })
                }, this),
                this.openBgBtn.node.on(cc.Node.EventType.TOUCH_START, function() {
                    t.webFileHandler.openImageWin(function(e, i) {
                        t.bgTex = e;
                        var o = i.name.lastIndexOf(".");
                        t.bgName = i.name.slice(0, o),
                        t.bgPathTxt.string = i.name
                    })
                }, this),
                this.confireBtn.node.on(cc.Node.EventType.TOUCH_START, function() {
                    t._mapData ? t.bgTex ? (t._mapData.bgName = t.bgName,
                    o.default.instance.openMap(t._mapData, t.bgTex),
                    t.close()) : cc.sys.isBrowser && setTimeout(function() {
                        alert("\u8fd8\u6ca1\u9009\u62e9\u5e95\u56fe")
                    }, 100) : cc.sys.isBrowser && setTimeout(function() {
                        alert("\u8fd8\u6ca1\u9009\u62e9\u5e95\u56fe\u5730\u56fe\u6570\u636e")
                    }, 100)
                }, this),
                this.cancleBtn.node.on(cc.Node.EventType.TOUCH_START, function() {
                    t.close()
                }, this)
            }
            ,
            e.prototype.close = function() {
                this.node && this.node.isValid && (this.node.active = !1,
                this.node.destroy())
            }
            ,
            __decorate([c(cc.Label)], e.prototype, "dataPathTxt", void 0),
            __decorate([c(cc.Button)], e.prototype, "openDataBtn", void 0),
            __decorate([c(cc.Label)], e.prototype, "bgPathTxt", void 0),
            __decorate([c(cc.Button)], e.prototype, "openBgBtn", void 0),
            __decorate([c(cc.Button)], e.prototype, "confireBtn", void 0),
            __decorate([c(cc.Button)], e.prototype, "cancleBtn", void 0),
            __decorate([s], e)
        }(r.default);
        i.default = h,
        cc._RF.pop()
    }
    , {
        "../../editor/MapEditor": "MapEditor",
        "../../editor/WebFileHandler": "WebFileHandler",
        "../base/BaseView": "BaseView"
    }],
    PathFindingAgent: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "2713cxFI+NMQJ7BOBfOraHy", "PathFindingAgent"),
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var o = t("../base/MapType")
          , n = t("../ui/setting/SettingData")
          , r = t("./AstarHoneycombRoadSeeker")
          , a = t("./AStarRoadSeeker")
          , s = t("./MapRoadUtils")
          , c = function() {
            function t() {
                this._roadDic = {},
                this._mapData = null,
                this._mapType = o.MapType.angle45,
                this._round = [[0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1]],
                this._round1 = [[0, -1], [1, -1], [1, 0], [0, 1], [-1, 0], [-1, -1]],
                this._round2 = [[0, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0]]
            }
            return Object.defineProperty(t, "instance", {
                get: function() {
                    return null == this._instance && (this._instance = new t),
                    this._instance
                },
                enumerable: !1,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, "mapData_1", {
                get: function() {
                    return this._mapData
                },
                enumerable: !1,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, "mapType", {
                get: function() {
                    return this._mapType
                },
                enumerable: !1,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, "roadSeeker", {
                get: function() {
                    return this._roadSeeker
                },
                enumerable: !1,
                configurable: !0
            }),
            t.prototype.init = function(t) {
                this._mapData = t,
                this._mapType = t.type,
                s.default.instance.updateMapInfo(this._mapData.mapWidth, this._mapData.mapHeight, this._mapData.nodeWidth, this._mapData.nodeHeight, this._mapData.type);
                for (var e = this._mapData.roadDataArr.length, i = this._mapData.roadDataArr[0].length, c = 0, h = 0, d = 0, l = 0, p = 0, u = 0; u < e; u++)
                    for (var y = 0; y < i; y++) {
                        c = this._mapData.roadDataArr[u][y],
                        h = y,
                        d = u;
                        var f = s.default.instance.getNodeByDerect(h, d);
                        f.value = c,
                        this._mapType == o.MapType.honeycomb2 && (l = f.cx,
                        p = f.cy,
                        f.cx = p,
                        f.cy = l),
                        this._roadDic[f.cx + "_" + f.cy] = f
                    }
                this._mapType == o.MapType.honeycomb || this._mapType == o.MapType.honeycomb2 ? this._roadSeeker = new r.default(this._roadDic) : this._roadSeeker = new a.default(this._roadDic);
                var _ = 0
                  , g = [];
                for (u = 0; u < n.default.instance.roadSetDatas.length; u++)
                    n.default.instance.roadSetDatas[u].isPass || (g.push(n.default.instance.roadSetDatas[u].value),
                    _ |= 1 << n.default.instance.roadSetDatas[u].value,
                    console.log("1 << ", n.default.instance.roadSetDatas[u].value));
                console.log("num ", _, g),
                g.length,
                this._roadSeeker.customRoadNodeIsPass(function(t) {
                    return !!t && (1 << t.value & _) != 1 << t.value
                })
            }
            ,
            t.prototype.seekPath = function(t, e, i, o) {
                var n = this.getRoadNodeByPixel(t, e)
                  , r = this.getRoadNodeByPixel(i, o);
                return this._roadSeeker.seekPath(n, r)
            }
            ,
            t.prototype.seekPath2 = function(t, e, i, o) {
                var n = this.getRoadNodeByPixel(t, e)
                  , r = this.getRoadNodeByPixel(i, o);
                return this._roadSeeker.seekPath2(n, r)
            }
            ,
            t.prototype.testSeekRoad = function(t, e, i, o, n, r, a) {
                var s = this.getRoadNodeByPixel(t, e)
                  , c = this.getRoadNodeByPixel(i, o);
                this._roadSeeker.testSeekPathStep(s, c, n, r, a)
            }
            ,
            t.prototype.stopTestSeekRoad = function() {
                this._roadSeeker.stopTestSeekPathStep()
            }
            ,
            t.prototype.getRoadNodeByPixel = function(t, e) {
                var i = s.default.instance.getWorldPointByPixel(t, e);
                return this._mapType == o.MapType.honeycomb2 ? this.getRoadNode(i.y, i.x) : this.getRoadNode(i.x, i.y)
            }
            ,
            t.prototype.getRoadNode = function(t, e) {
                return this._roadSeeker.getRoadNode(t, e)
            }
            ,
            t.prototype.getRoundRoadNodes = function(e) {
                if (null == e)
                    return [];
                var i, n = [], r = e;
                i = t.instance.mapType == o.MapType.honeycomb || t.instance.mapType == o.MapType.honeycomb2 ? r.cx % 2 == 0 ? this._round1 : this._round2 : this._round;
                for (var a = 0; a < i.length; a++) {
                    var s = r.cx + i[a][0]
                      , c = r.cy + i[a][1];
                    n.push(t.instance.getRoadNode(s, c))
                }
                return n
            }
            ,
            t
        }();
        i.default = c,
        cc._RF.pop()
    }
    , {
        "../base/MapType": "MapType",
        "../ui/setting/SettingData": "SettingData",
        "./AStarRoadSeeker": "AStarRoadSeeker",
        "./AstarHoneycombRoadSeeker": "AstarHoneycombRoadSeeker",
        "./MapRoadUtils": "MapRoadUtils"
    }],
    Point: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "520e4cLiBBPLYREzSRGlltJ", "Point"),
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        i.default = function(t, e) {
            void 0 === t && (t = 0),
            void 0 === e && (e = 0),
            this.x = 0,
            this.y = 0,
            this.x = t,
            this.y = e
        }
        ,
        cc._RF.pop()
    }
    , {}],
    PropertyItem: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "92189H5/51BU78j6aWkv+E8", "PropertyItem"),
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var o = t("../../../../editor/attribute/AttributeEditor")
          , n = cc._decorator
          , r = n.ccclass
          , a = n.property
          , s = function(t) {
            function e() {
                var e = null !== t && t.apply(this, arguments) || this;
                return e.name_txt = null,
                e.property_txt = null,
                e.text_Bg = null,
                e.text_label = null,
                e.tip = null,
                e.tip_label = null,
                e.checkBox = null,
                e.isInit = !1,
                e
            }
            return __extends(e, t),
            e.prototype.start = function() {
                var t = this;
                this.tip.active = !1,
                this.name_txt.node.on(cc.Node.EventType.MOUSE_ENTER, function() {
                    "" != t._param.detail && (t.tip.active = !0)
                }, this),
                this.name_txt.node.on(cc.Node.EventType.MOUSE_LEAVE, function() {
                    t.tip.active = !1
                }, this)
            }
            ,
            e.prototype.initParam = function(t, e) {
                this._editorObj = t,
                this._param = e,
                "" != e.displayName ? this.name_txt.string = "" + e.displayName : this.name_txt.string = "" + e.attribute,
                this.tip_label.string = "" + e.detail,
                e.type == o.default.BOOL ? (this.property_txt.node.active = !1,
                this.checkBox.node.active = !0,
                this.checkBox.isChecked = this._editorObj[e.attribute]) : (this.property_txt.node.active = !0,
                this.checkBox.node.active = !1,
                e.type == o.default.NUMBER ? (this.property_txt.inputMode = cc.EditBox.InputMode.NUMERIC,
                this.property_txt.maxLength = 10) : e.type == o.default.NOT_NUMBER && (this.property_txt.inputMode = cc.EditBox.InputMode.ANY,
                this.property_txt.maxLength = 18),
                null != this._editorObj[e.attribute] ? this.property_txt.string = "" + this._editorObj[e.attribute] : this.property_txt.string = "" + this._editorObj.node[e.attribute],
                this.property_txt.enabled = e.editable,
                e.editable || (this.text_Bg.color = this.text_label.node.color.fromHEX("#aaaaaa"),
                this.text_label.node.color = this.text_label.node.color.fromHEX("#bbbbbb"))),
                this.isInit = !0
            }
            ,
            e.prototype.refresh = function() {
                null != this._param && (null != this._editorObj[this._param.attribute] ? this.property_txt.string = "" + this._editorObj[this._param.attribute] : this.property_txt.string = "" + this._editorObj.node[this._param.attribute])
            }
            ,
            e.prototype.destroySelf = function() {
                this._param = null,
                this._editorObj = null,
                this.node.destroy()
            }
            ,
            e.prototype.onTextInputChange = function() {
                this.onPropertyChange()
            }
            ,
            e.prototype.onPropertyChange = function() {
                if (this._param && this._editorObj.isValid) {
                    var t = this._editorObj;
                    if (null == this._editorObj[this._param.attribute] && null != this._editorObj.node[this._param.attribute] && (t = this._editorObj.node),
                    "number" != typeof t[this._param.attribute] || isNaN(t[this._param.attribute]))
                        t[this._param.attribute] = this.property_txt.string;
                    else {
                        var e = Number(this.property_txt.string);
                        isNaN(e) && (e = 0),
                        t[this._param.attribute] = e
                    }
                }
            }
            ,
            e.prototype.onCheckBoxChange = function() {
                this.isInit,
                this._editorObj[this._param.attribute] = this.checkBox.isChecked
            }
            ,
            __decorate([a(cc.Label)], e.prototype, "name_txt", void 0),
            __decorate([a(cc.EditBox)], e.prototype, "property_txt", void 0),
            __decorate([a(cc.Node)], e.prototype, "text_Bg", void 0),
            __decorate([a(cc.Label)], e.prototype, "text_label", void 0),
            __decorate([a(cc.Node)], e.prototype, "tip", void 0),
            __decorate([a(cc.Label)], e.prototype, "tip_label", void 0),
            __decorate([a(cc.Toggle)], e.prototype, "checkBox", void 0),
            __decorate([r], e)
        }(cc.Component);
        i.default = s,
        cc._RF.pop()
    }
    , {
        "../../../../editor/attribute/AttributeEditor": "AttributeEditor"
    }],
    PropertyPanel: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "afa9bk30NJI8bnF3xJ4X3H4", "PropertyPanel"),
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var o = t("../../../../editor/attribute/AttributeUtils")
          , n = t("../../../../editor/EditorElement/EditorMonster")
          , r = t("../../../../editor/EditorElement/EditorNPC")
          , a = t("../../../../editor/EditorElement/EditorSpawnPoint")
          , s = t("../../../../editor/EditorElement/EditorTransfer")
          , c = t("../../road/MapRoadUtils")
          , h = t("./PropertyItem")
          , d = cc._decorator
          , l = d.ccclass
          , p = d.property
          , u = function(t) {
            function e() {
                var e = null !== t && t.apply(this, arguments) || this;
                return e.scrollView = null,
                e.scrollContent = null,
                e.propertyItemTemplate = null,
                e.propertyNameTxl = null,
                e.propertyList = [],
                e
            }
            return __extends(e, t),
            e.prototype.start = function() {
                this.propertyItemTemplate.active = !1
            }
            ,
            e.prototype.setEditorParam = function(t) {
                if (null == t)
                    return this.propertyNameTxl.string = "",
                    this.currentObj = null,
                    void this.clear();
                t instanceof r.default ? this.propertyNameTxl.string = "NPC" : t instanceof n.default ? this.propertyNameTxl.string = "\u602a\u7269" : t instanceof s.default ? this.propertyNameTxl.string = "\u4f20\u9001\u95e8" : t instanceof a.default ? this.propertyNameTxl.string = "\u51fa\u751f\u70b9" : this.propertyNameTxl.string = "";
                var e = c.default.instance.getWorldPointByPixel(t.node.x, t.node.y);
                if (t.cx = e.x,
                t.cy = e.y,
                this.currentObj != t) {
                    this.clear();
                    var i = o.default.instance.getObjectEditAttribute(t);
                    if (null != i) {
                        this.currentObj = t,
                        this.propertyList = [];
                        for (var h = 0; h < i.length; h++)
                            if (i[h].visible) {
                                var d = this.getPropertyItem();
                                this.propertyList.push(d),
                                d.initParam(t, i[h])
                            }
                    }
                } else
                    this.refreshProperty()
            }
            ,
            e.prototype.getPropertyItem = function() {
                var t = cc.instantiate(this.propertyItemTemplate).getComponent(h.default);
                return t.node.active = !0,
                t.node.parent = this.scrollContent,
                t
            }
            ,
            e.prototype.refreshProperty = function() {
                for (var t in this.propertyList)
                    this.propertyList[t].refresh()
            }
            ,
            e.prototype.clear = function() {
                for (var t in this.propertyList)
                    this.propertyList[t].destroySelf();
                this.propertyList = null
            }
            ,
            __decorate([p(cc.ScrollView)], e.prototype, "scrollView", void 0),
            __decorate([p(cc.Node)], e.prototype, "scrollContent", void 0),
            __decorate([p(cc.Node)], e.prototype, "propertyItemTemplate", void 0),
            __decorate([p(cc.Label)], e.prototype, "propertyNameTxl", void 0),
            __decorate([l], e)
        }(cc.Component);
        i.default = u,
        cc._RF.pop()
    }
    , {
        "../../../../editor/EditorElement/EditorMonster": "EditorMonster",
        "../../../../editor/EditorElement/EditorNPC": "EditorNPC",
        "../../../../editor/EditorElement/EditorSpawnPoint": "EditorSpawnPoint",
        "../../../../editor/EditorElement/EditorTransfer": "EditorTransfer",
        "../../../../editor/attribute/AttributeUtils": "AttributeUtils",
        "../../road/MapRoadUtils": "MapRoadUtils",
        "./PropertyItem": "PropertyItem"
    }],
    QuadTree: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "34fefjzdXJHzrRCfdRAHsQY", "QuadTree"),
        Object.defineProperty(i, "__esModule", {
            value: !0
        }),
        i.ObjectRect = i.RectBounds = void 0;
        var o = function() {
            function t(t, e, i, o) {
                this.level = 0,
                this.bounds = null,
                this.objects = [],
                this.nodes = [],
                this.bounds = t,
                this.max_object_num = e || 10,
                this.max_level = i || 4,
                this.level = o || 0,
                this.objects = [],
                this.nodes = []
            }
            return t.prototype.split = function() {
                var e = this.level + 1
                  , i = this.bounds.width / 2
                  , o = this.bounds.height / 2
                  , r = this.bounds.x
                  , a = this.bounds.y;
                this.nodes[0] = new t(new n(r + i,a,i,o),this.max_object_num,this.max_level,e),
                this.nodes[1] = new t(new n(r,a,i,o),this.max_object_num,this.max_level,e),
                this.nodes[2] = new t(new n(r,a + o,i,o),this.max_object_num,this.max_level,e),
                this.nodes[3] = new t(new n(r + i,a + o,i,o),this.max_object_num,this.max_level,e)
            }
            ,
            t.prototype.getIndex = function(t) {
                var e = []
                  , i = this.bounds.x + this.bounds.width / 2
                  , o = this.bounds.y + this.bounds.height / 2
                  , n = t.y < o
                  , r = t.x < i
                  , a = t.x + t.width > i
                  , s = t.y + t.height > o;
                return n && a && e.push(0),
                r && n && e.push(1),
                r && s && e.push(2),
                a && s && e.push(3),
                e
            }
            ,
            t.prototype.insert = function(t) {
                var e, i = 0;
                if (this.nodes.length)
                    for (e = this.getIndex(t),
                    i = 0; i < e.length; i++)
                        this.nodes[e[i]].insert(t);
                else if (this.objects.push(t),
                this.objects.length > this.max_object_num && this.level < this.max_level) {
                    for (this.split(),
                    i = 0; i < this.objects.length; i++) {
                        e = this.getIndex(this.objects[i]);
                        for (var o = 0; o < e.length; o++)
                            this.nodes[e[o]].insert(this.objects[i])
                    }
                    this.objects = []
                }
            }
            ,
            t.prototype.retrieve = function(t) {
                var e = this.getIndex(t)
                  , i = this.objects;
                if (this.nodes.length)
                    for (var o = 0; o < e.length; o++)
                        i = i.concat(this.nodes[e[o]].retrieve(t));
                var n = new Map;
                return i.filter(function(t) {
                    return !n.get(t) && (n.set(t, !0),
                    !0)
                })
            }
            ,
            t.prototype.clear = function() {
                this.objects = [];
                for (var t = 0; t < this.nodes.length; t++)
                    this.nodes[t].clear();
                this.nodes.length = 0
            }
            ,
            t
        }();
        i.default = o;
        var n = function(t, e, i, o) {
            void 0 === t && (t = 0),
            void 0 === e && (e = 0),
            void 0 === i && (i = 0),
            void 0 === o && (o = 0),
            this.x = 0,
            this.y = 0,
            this.width = 0,
            this.height = 0,
            this.x = t,
            this.y = e,
            this.width = i,
            this.height = o
        };
        i.RectBounds = n;
        i.ObjectRect = function(t, e, i, o, n) {
            void 0 === e && (e = 0),
            void 0 === i && (i = 0),
            void 0 === o && (o = 0),
            void 0 === n && (n = 0),
            this.x = 0,
            this.y = 0,
            this.width = 0,
            this.height = 0,
            this.object = t,
            this.x = e,
            this.y = i,
            this.width = o,
            this.height = n
        }
        ,
        cc._RF.pop()
    }
    , {}],
    RoadNodeSettingBar: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "ab17903U+VMrYmjgUMrZYwB", "RoadNodeSettingBar"),
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var o = t("./ColorSelector")
          , n = cc._decorator
          , r = n.ccclass
          , a = n.property
          , s = function(t) {
            function e() {
                var e = null !== t && t.apply(this, arguments) || this;
                return e.idTxt = null,
                e.valueTxt = null,
                e.colorSelector = null,
                e.opacityTxt = null,
                e.colorTxt = null,
                e.isShowCheckBox = null,
                e.isPassCheckBox = null,
                e.isInit = !1,
                e
            }
            return __extends(e, t),
            e.prototype.start = function() {
                this.valueTxt.enabled = !1
            }
            ,
            e.prototype.init = function(t) {
                this.data = t,
                this.data && (this.idTxt.string = "" + this.data.id,
                this.valueTxt.string = "" + this.data.value,
                this.colorTxt.string = this.data.color.toUpperCase(),
                this.isShowCheckBox.isChecked = this.data.isShow,
                this.isPassCheckBox.isChecked = this.data.isPass,
                this.initColorSelectorOrOpacity(),
                this.isInit = !0)
            }
            ,
            e.prototype.applySetting = function() {
                if (this.isInit) {
                    this.data.value = Number(this.valueTxt.string);
                    var t = this.colorSelector.getColor();
                    t = "#" + (t + Number(this.opacityTxt.string).toString(16)).toUpperCase(),
                    this.data.color = t,
                    this.data.isShow = this.isShowCheckBox.isChecked,
                    this.data.isPass = this.isPassCheckBox.isChecked
                }
            }
            ,
            e.prototype.initColorSelectorOrOpacity = function() {
                var t = this.colorTxt.string;
                -1 == t.indexOf("#") && (t = "#" + t);
                var e = "#000000"
                  , i = "#00";
                t.length > 7 ? (e = t.substring(0, 7),
                i = t.substring(7, t.length)) : (e = t,
                i = "ff"),
                this.colorSelector.setColor(e),
                this.colorSelector.onColorChange = this.onColorSelectorChange.bind(this);
                var o = parseInt(i, 16);
                this.opacityTxt.string = "" + o
            }
            ,
            e.prototype.initColorField = function() {
                var t = this.colorSelector.getColor();
                t = "#" + (t + Number(this.opacityTxt.string).toString(16)).toUpperCase(),
                this.colorTxt.string = t
            }
            ,
            e.prototype.onTextInputChange = function(t, e) {
                if (e == this.valueTxt)
                    this.data.value = Number(this.valueTxt.string);
                else if (e == this.opacityTxt) {
                    var i = Number(this.opacityTxt.string);
                    i < 0 && (i = 0),
                    i > 255 && (i = 255),
                    this.opacityTxt.string = "" + i,
                    this.initColorField(),
                    this.applySetting()
                } else
                    e == this.colorTxt && (this.colorTxt.string = this.colorTxt.string.toUpperCase(),
                    this.initColorSelectorOrOpacity(),
                    this.applySetting())
            }
            ,
            e.prototype.onColorSelectorChange = function() {
                this.initColorField(),
                this.applySetting()
            }
            ,
            e.prototype.onCheckBoxChange = function(t) {
                t == this.isShowCheckBox ? this.applySetting() : t == this.isPassCheckBox && this.applySetting()
            }
            ,
            __decorate([a(cc.Label)], e.prototype, "idTxt", void 0),
            __decorate([a(cc.EditBox)], e.prototype, "valueTxt", void 0),
            __decorate([a(o.default)], e.prototype, "colorSelector", void 0),
            __decorate([a(cc.EditBox)], e.prototype, "opacityTxt", void 0),
            __decorate([a(cc.EditBox)], e.prototype, "colorTxt", void 0),
            __decorate([a(cc.Toggle)], e.prototype, "isShowCheckBox", void 0),
            __decorate([a(cc.Toggle)], e.prototype, "isPassCheckBox", void 0),
            __decorate([r], e)
        }(cc.Component);
        i.default = s,
        cc._RF.pop()
    }
    , {
        "./ColorSelector": "ColorSelector"
    }],
    RoadNode: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "a5569a7KTRDiKGvGCqxNAHv", "RoadNode"),
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var o = function() {
            function t() {
                this._value = 0,
                this._f = 0,
                this._g = 0,
                this._h = 0,
                this._parent = null,
                this._treeParent = null,
                this._left = null,
                this._right = null,
                this._openTag = 0,
                this._closeTag = 0
            }
            return t.prototype.resetTree = function() {
                this._treeParent = null,
                this._left = null,
                this._right = null
            }
            ,
            t.prototype.toString = function() {
                return "\u8def\u70b9\u50cf\u7d20\u5750\u6807\uff1a\uff08" + this._px + "," + this._py + "),  \u8def\u70b9\u4e16\u754c\u5750\u6807\uff1a\uff08" + this._cx + "," + this._cy + "),  \u8def\u70b9\u5e73\u9762\u76f4\u89d2\u5750\u6807\uff1a\uff08" + this._dx + "," + this._dy + ")"
            }
            ,
            Object.defineProperty(t.prototype, "px", {
                get: function() {
                    return this._px
                },
                set: function(t) {
                    this._px = t
                },
                enumerable: !1,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, "py", {
                get: function() {
                    return this._py
                },
                set: function(t) {
                    this._py = t
                },
                enumerable: !1,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, "cx", {
                get: function() {
                    return this._cx
                },
                set: function(t) {
                    this._cx = t
                },
                enumerable: !1,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, "cy", {
                get: function() {
                    return this._cy
                },
                set: function(t) {
                    this._cy = t
                },
                enumerable: !1,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, "dx", {
                get: function() {
                    return this._dx
                },
                set: function(t) {
                    this._dx = t
                },
                enumerable: !1,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, "dy", {
                get: function() {
                    return this._dy
                },
                set: function(t) {
                    this._dy = t
                },
                enumerable: !1,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, "value", {
                get: function() {
                    return this._value
                },
                set: function(t) {
                    this._value = t
                },
                enumerable: !1,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, "f", {
                get: function() {
                    return this._f
                },
                set: function(t) {
                    this._f = t
                },
                enumerable: !1,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, "g", {
                get: function() {
                    return this._g
                },
                set: function(t) {
                    this._g = t
                },
                enumerable: !1,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, "h", {
                get: function() {
                    return this._h
                },
                set: function(t) {
                    this._h = t
                },
                enumerable: !1,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, "parent", {
                get: function() {
                    return this._parent
                },
                set: function(t) {
                    this._parent = t
                },
                enumerable: !1,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, "treeParent", {
                get: function() {
                    return this._treeParent
                },
                set: function(t) {
                    this._treeParent = t
                },
                enumerable: !1,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, "left", {
                get: function() {
                    return this._left
                },
                set: function(t) {
                    this._left = t
                },
                enumerable: !1,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, "right", {
                get: function() {
                    return this._right
                },
                set: function(t) {
                    this._right = t
                },
                enumerable: !1,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, "openTag", {
                get: function() {
                    return this._openTag
                },
                set: function(t) {
                    this._openTag = t
                },
                enumerable: !1,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, "closeTag", {
                get: function() {
                    return this._closeTag
                },
                set: function(t) {
                    this._closeTag = t
                },
                enumerable: !1,
                configurable: !0
            }),
            t
        }();
        i.default = o,
        cc._RF.pop()
    }
    , {}],
    RoadPointLayer: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "9138aY98exC5LeS2Jj6xd6Q", "RoadPointLayer"),
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var o = t("../road/MapRoadUtils")
          , n = t("../base/MapType")
          , r = t("../ui/setting/SettingData")
          , a = cc._decorator
          , s = a.ccclass
          , c = (a.property,
        function(t) {
            function e() {
                var e = t.call(this) || this;
                return e._roadPointDic = {},
                e._roadNodeDic = {},
                e._graphicDic = {},
                e._roadTypeShowDic = {},
                e._colorHexList = ["#00ff0060", "#d4d4d460", "#0000ff60", "#ffff0060"],
                e._type = 1,
                e._gsize = 16,
                e.blockScale = .95,
                e
            }
            return __extends(e, t),
            e.prototype.onLoad = function() {
                this._roadTypeShowDic[0] = !0,
                this._roadTypeShowDic[1] = !0,
                this._roadTypeShowDic[2] = !0,
                this._roadTypeShowDic[3] = !0,
                this._roadTypeShowDic[4] = !0,
                this._roadTypeShowDic[5] = !0,
                this._roadTypeShowDic[6] = !0,
                this._roadTypeShowDic[7] = !0,
                this._roadTypeShowDic[8] = !0,
                this._roadTypeShowDic[9] = !0
            }
            ,
            e.prototype.init = function() {
                var t = o.default.instance.row * o.default.instance.col;
                this._gsize = t < 65536 ? 16 : t < 3e5 ? 32 : 64
            }
            ,
            e.prototype.initSetting = function() {
                for (var t = r.default.instance.roadSetDatas.length, e = 0; e < t; e++)
                    this._colorHexList[e] = r.default.instance.roadSetDatas[e].color
            }
            ,
            e.prototype.initRoadPointInfo = function(t) {
                if (this.clear(),
                t.roadDataArr && 0 != t.roadDataArr.length) {
                    for (var e = t.roadDataArr.length, i = t.roadDataArr[0].length, n = 0, a = 0, s = 0, c = 0; c < e; c++)
                        for (var h = 0; h < i; h++)
                            if (a = h,
                            s = c,
                            (n = t.roadDataArr[c][h]) != r.default.instance.defaultRoadValue) {
                                var d = o.default.instance.getNodeByDerect(a, s);
                                d.value = n,
                                this._roadNodeDic[d.dx + "_" + d.dy] = d
                            }
                    this.drawRointPoint()
                }
            }
            ,
            e.prototype.getRoadPointInfo = function() {
                for (var t, e, i = o.default.instance.row, n = o.default.instance.col, a = [], s = (o.default.instance.mapType,
                i), c = 0; c < s; c++) {
                    e = c,
                    a[c] = [];
                    for (var h = 0; h < n; h++)
                        t = h,
                        null == this._roadNodeDic[t + "_" + e] ? a[c][h] = r.default.instance.defaultRoadValue : a[c][h] = this._roadNodeDic[t + "_" + e].value
                }
                return a
            }
            ,
            e.prototype.drawRointPoint = function() {
                var t = o.default.instance.row
                  , e = o.default.instance.col
                  , i = o.default.instance.mapType
                  , r = t / this._gsize;
                i == n.MapType.angle45 && (r = 2 * t / this._gsize);
                for (var a = e / this._gsize, s = 0; s < r; s++)
                    for (var c = 0; c < a; c++) {
                        var h = c
                          , d = s;
                        this.drawGraphic(h, d)
                    }
            }
            ,
            e.prototype.drawGraphic = function(t, e, i) {
                void 0 === i && (i = !0);
                var r = t + "_" + e
                  , a = this.getGraphic(r);
                i && a.clear();
                for (var s = o.default.instance.halfNodeWidth, c = o.default.instance.halfNodeHeight, h = o.default.instance.mapType, d = "00ff0060", l = t * this._gsize, p = l + this._gsize, u = e * this._gsize, y = u + this._gsize, f = u; f < y; f++)
                    for (var _ = l; _ < p; _++) {
                        var g = this._roadNodeDic[_ + "_" + f];
                        g && this._roadTypeShowDic[g.value] && (0 == g.value ? d = this._colorHexList[0] : 1 == g.value ? d = this._colorHexList[1] : 2 == g.value ? d = this._colorHexList[2] : 3 == g.value && (d = this._colorHexList[3]),
                        h == n.MapType.angle45 ? this.draw45AngleMapRoadPoint(a, g, d, s, c) : h == n.MapType.angle90 ? this.draw90AngleMapRoadPoint(a, g, d, s, c) : h == n.MapType.honeycomb ? this.drawHoneycombMapRoadPoint(a, g, d, s, c) : h == n.MapType.honeycomb2 && this.drawHoneycombMapRoadPoint2(a, g, d, s, c))
                    }
            }
            ,
            e.prototype.getGraphic = function(t) {
                if (!this._graphicDic[t]) {
                    var e = new cc.Node;
                    e.parent = this.node,
                    e.position = cc.v2(0, 0);
                    var i = e.addComponent(cc.Graphics);
                    this._graphicDic[t] = i
                }
                return this._graphicDic[t]
            }
            ,
            e.prototype.draw45AngleMapRoadPoint = function(t, e, i, o, n) {
                t.fillColor.fromHEX(i),
                t.moveTo(-o * this.blockScale + e.px, 0 + e.py),
                t.lineTo(0 + e.px, -n * this.blockScale + e.py),
                t.lineTo(o * this.blockScale + e.px, 0 + e.py),
                t.lineTo(0 + e.px, n * this.blockScale + e.py),
                t.fill()
            }
            ,
            e.prototype.draw90AngleMapRoadPoint = function(t, e, i, o, n) {
                t.fillColor.fromHEX(i),
                t.rect(-o * this.blockScale + e.px, -n * this.blockScale + e.py, o * this.blockScale * 2, n * this.blockScale * 2),
                t.fill()
            }
            ,
            e.prototype.drawHoneycombMapRoadPoint = function(t, e, i) {
                t.fillColor.fromHEX(i);
                var n = o.default.instance.nodeWidth * this.blockScale
                  , r = o.default.instance.nodeHeight * this.blockScale
                  , a = n / 4
                  , s = 3 * a
                  , c = r / 2
                  , h = -2 * a
                  , d = -c;
                t.moveTo(h + a + e.px, d + e.py),
                t.lineTo(h + s + e.px, d + e.py),
                t.lineTo(h + n + e.px, c + d + e.py),
                t.lineTo(h + s + e.px, r + d + e.py),
                t.lineTo(h + a + e.px, r + d + e.py),
                t.lineTo(h + 0 + e.px, c + d + e.py),
                t.lineTo(h + a + e.px, d + e.py),
                t.fill()
            }
            ,
            e.prototype.drawHoneycombMapRoadPoint2 = function(t, e, i) {
                t.fillColor.fromHEX(i);
                var n = o.default.instance.nodeWidth * this.blockScale
                  , r = o.default.instance.nodeHeight * this.blockScale
                  , a = n / 4
                  , s = 3 * a
                  , c = r / 2
                  , h = -2 * a
                  , d = -c;
                t.moveTo(d + e.px, h + a + e.py),
                t.lineTo(d + e.px, h + s + e.py),
                t.lineTo(c + d + e.px, h + n + e.py),
                t.lineTo(r + d + e.px, h + s + e.py),
                t.lineTo(r + d + e.px, h + a + e.py),
                t.lineTo(c + d + e.px, h + 0 + e.py),
                t.lineTo(d + e.px, h + a + e.py),
                t.fill()
            }
            ,
            e.prototype.addRoadPoint = function(t) {
                this._roadNodeDic[t.dx + "_" + t.dy] = t;
                var e = Math.floor(t.dx / this._gsize)
                  , i = Math.floor(t.dy / this._gsize);
                this.drawGraphic(e, i)
            }
            ,
            e.prototype.addRoadPoints = function(t) {
                for (var e = {}, i = 0; i < t.length; i++) {
                    this._roadNodeDic[t[i].dx + "_" + t[i].dy] = t[i];
                    var o = Math.floor(t[i].dx / this._gsize)
                      , n = Math.floor(t[i].dy / this._gsize);
                    e[o + "_" + n] = [o, n]
                }
                for (var r in e)
                    this.drawGraphic(e[r][0], e[r][1])
            }
            ,
            e.prototype.removeRoadPoint = function(t) {
                null != this._roadNodeDic[t.dx + "_" + t.dy] && (this._roadNodeDic[t.dx + "_" + t.dy] = null,
                delete this._roadNodeDic[t.dx + "_" + t.dy]);
                var e = Math.floor(t.dx / this._gsize)
                  , i = Math.floor(t.dy / this._gsize);
                this.drawGraphic(e, i)
            }
            ,
            e.prototype.removeRoadPoints = function(t) {
                for (var e = {}, i = 0; i < t.length; i++) {
                    null != this._roadNodeDic[t[i].dx + "_" + t[i].dy] && (this._roadNodeDic[t[i].dx + "_" + t[i].dy] = null,
                    delete this._roadNodeDic[t[i].dx + "_" + t[i].dy]);
                    var o = Math.floor(t[i].dx / this._gsize)
                      , n = Math.floor(t[i].dy / this._gsize);
                    e[o + "_" + n] = [o, n]
                }
                for (var r in e)
                    this.drawGraphic(e[r][0], e[r][1])
            }
            ,
            e.prototype.changeRoadPointStyle = function() {
                for (var t in this._type++,
                this._type = this._type % 3,
                this._roadPointDic) {
                    var e = this._roadPointDic[t];
                    e && e.reset(e.node, this._type)
                }
            }
            ,
            e.prototype.hiddenUnWalkAbleRoadPoint = function() {
                var t, e;
                if (h.hiddenUnWalkAble = !h.hiddenUnWalkAble,
                h.hiddenUnWalkAble)
                    for (t in this._roadPointDic)
                        (e = this._roadPointDic[t]) && 1 == e.node.value && e.clear();
                else
                    for (t in this._roadPointDic)
                        (e = this._roadPointDic[t]) && 1 == e.node.value && e.reset(e.node, this._type)
            }
            ,
            e.prototype.clear = function() {
                for (var t in this._roadPointDic)
                    this._roadPointDic[t].destroy(),
                    this._roadPointDic[t] = null,
                    delete this._roadPointDic[t];
                for (var t in this._graphicDic)
                    this._graphicDic[t] && (this._graphicDic[t].clear(),
                    this._graphicDic[t].destroy(),
                    this._graphicDic[t] = null,
                    delete this._roadNodeDic[t]);
                this._roadNodeDic = {}
            }
            ,
            __decorate([s], e)
        }(cc.Component));
        i.default = c;
        var h = function(t) {
            function e(e, i) {
                void 0 === i && (i = 1);
                var o = t.call(this) || this;
                return o._color0 = "#00ff0090",
                o._color1 = "#d4d4d490",
                o._color2 = "#0000ff90",
                o._color3 = "#ffff0090",
                o._node = e,
                o._type = i,
                o.draw(e, i),
                o
            }
            return __extends(e, t),
            e.prototype.reset = function(t, e) {
                void 0 === e && (e = 1),
                this._node = t,
                this._type = e,
                this.draw(t, e)
            }
            ,
            e.prototype.draw = function(t, i) {
                if (void 0 === i && (i = 1),
                this.clear(),
                !e.hiddenUnWalkAble || 1 != t.value) {
                    var r;
                    0 == t.value ? r = this._color0 : 1 == t.value ? r = this._color1 : 2 == t.value ? r = this._color2 : 3 == t.value && (r = this._color3);
                    var a = o.default.instance.halfNodeWidth
                      , s = o.default.instance.halfNodeHeight
                      , c = o.default.instance.mapType;
                    c == n.MapType.angle45 ? this.draw45AngleMapRoadPoint(i, r, a, s) : c == n.MapType.angle90 ? this.draw90AngleMapRoadPoint(i, r, a, s) : c == n.MapType.honeycomb ? this.drawHoneycombMapRoadPoint(i, r, a, s) : c == n.MapType.honeycomb2 && this.drawHoneycombMapRoadPoint2(i, r, a, s)
                }
            }
            ,
            e.prototype.draw45AngleMapRoadPoint = function(t, e, i, o) {
                this.graphics.fillColor.fromHEX(e),
                1 == t ? (this.graphics.moveTo(-(i - 1), 0),
                this.graphics.lineTo(0, -(o - 1)),
                this.graphics.lineTo(i - 1, 0),
                this.graphics.lineTo(0, o - 1)) : 2 == t ? this.graphics.rect(-o / 2, -o / 2, o, o) : this.graphics.circle(0, 0, i / 3),
                this.graphics.fill()
            }
            ,
            e.prototype.draw90AngleMapRoadPoint = function(t, e, i, o) {
                this.graphics.fillColor.fromHEX(e),
                1 == t ? this.graphics.rect(-(i - 1), -(o - 1), 2 * (i - 1), 2 * (o - 1)) : 2 == t ? this.graphics.rect(-i / 2, -o / 2, i, o) : this.graphics.circle(0, 0, i / 2),
                this.graphics.fill()
            }
            ,
            e.prototype.drawHoneycombMapRoadPoint = function(t, e, i, n) {
                if (this.graphics.fillColor.fromHEX(e),
                1 == t) {
                    var r = .95 * o.default.instance.nodeWidth
                      , a = .95 * o.default.instance.nodeHeight
                      , s = r / 4
                      , c = 3 * s
                      , h = a / 2
                      , d = -2 * s
                      , l = -h;
                    this.graphics.moveTo(d + s, l),
                    this.graphics.lineTo(d + c, l),
                    this.graphics.lineTo(d + r, h + l),
                    this.graphics.lineTo(d + c, a + l),
                    this.graphics.lineTo(d + s, a + l),
                    this.graphics.lineTo(d + 0, h + l),
                    this.graphics.lineTo(d + s, l)
                } else
                    2 == t ? this.graphics.rect(-i / 2, -n / 2, i, n) : this.graphics.circle(0, 0, i / 2);
                this.graphics.fill()
            }
            ,
            e.prototype.drawHoneycombMapRoadPoint2 = function(t, e, i, n) {
                if (this.graphics.fillColor.fromHEX(e),
                1 == t) {
                    var r = .95 * o.default.instance.nodeWidth
                      , a = .95 * o.default.instance.nodeHeight
                      , s = r / 4
                      , c = 3 * s
                      , h = a / 2
                      , d = -2 * s
                      , l = -h;
                    this.graphics.moveTo(l, d + s),
                    this.graphics.lineTo(l, d + c),
                    this.graphics.lineTo(h + l, d + r),
                    this.graphics.lineTo(a + l, d + c),
                    this.graphics.lineTo(a + l, d + s),
                    this.graphics.lineTo(h + l, d + 0),
                    this.graphics.lineTo(l, d + s)
                } else
                    2 == t ? this.graphics.rect(-i / 2, -n / 2, i, n) : this.graphics.circle(0, 0, i / 2);
                this.graphics.fill()
            }
            ,
            e.prototype.clear = function() {
                this.graphics.clear()
            }
            ,
            Object.defineProperty(e.prototype, "node", {
                get: function() {
                    return this._node
                },
                set: function(t) {
                    this._node = t
                },
                enumerable: !1,
                configurable: !0
            }),
            Object.defineProperty(e.prototype, "type", {
                get: function() {
                    return this._type
                },
                set: function(t) {
                    this._type = t
                },
                enumerable: !1,
                configurable: !0
            }),
            Object.defineProperty(e.prototype, "graphics", {
                get: function() {
                    return this._graphics || (this._graphics = this.addComponent(cc.Graphics)),
                    this._graphics
                },
                enumerable: !1,
                configurable: !0
            }),
            e
        }(cc.Node);
        cc._RF.pop()
    }
    , {
        "../base/MapType": "MapType",
        "../road/MapRoadUtils": "MapRoadUtils",
        "../ui/setting/SettingData": "SettingData"
    }],
    SaleConfig: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "096f6x9LGNLx5I1B7GJJQm4", "SaleConfig"),
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var o = function(t) {
            function e() {
                return null !== t && t.apply(this, arguments) || this
            }
            return __extends(e, t),
            e.saleDic = {
                1: {
                    testUrl: "https://easymapeditor-1258223435.cos.ap-guangzhou.myqcloud.com/frameworkdemo/demo4/web-desktop/index.html",
                    buyUrl: "https://store.cocos.com/app/detail/4391",
                    title: "\u6846\u67b6\u4ecb\u7ecd",
                    desc: "\u6846\u67b6\u7248\u672ccreator2.4.8,\u542b\u4ee5\u4e0b\u5185\u5bb9\n1\u3001\u6e38\u620f\u767b\u5f55->\u52a0\u8f7d\u8fdb\u5927\u5385->\u521d\u59cb\u5316\u5730\u56fe\u7684\u5b8c\u6210\u6d41\u7a0b\uff0c\u53ef\u76f4\u63a5\u6362\u76ae\n2\u3001\u6846\u67b6\u4ee3\u7801\u6bcf\u4e2a\u63a5\u53e3\u548c\u5173\u952e\u7684\u5730\u65b9\u90fd\u6709\u89c4\u8303\u7684\u6ce8\u91ca\n3\u3001\u9ad8\u6548\u7684\u5730\u56fe\u5bfb\u8def\u7b97\u6cd5\uff0c\u6bcf\u5e27\u652f\u63013000\u4e2a\u89d2\u8272\u540c\u65f6\u5bfb\u8def\n4\u3001\u5bfb\u8def\u7b97\u6cd5\u652f\u6301\u6b63\u65b9\u5f62\uff0c\u83f1\u5f62\uff0c\u516d\u8fb9\u5f62\u7684\u5730\u56fe\u683c\u5b50\u5bfb\u8def\n5\u3001\u5bfb\u8def\u7b97\u6cd5\u652f\u6301\u6309\u73a9\u5bb6\u4f53\u79ef\u5927\u5c0f\u8fdb\u884c\u5bfb\u8def\uff0c\u6709\u4e9b\u5730\u65b9\uff0c\u4f53\u79ef\u5c0f\u7684\u89d2\u8272\u53ef\u5bfb\u8def\u901a\u8fc7\uff0c\u4f53\u79ef\u5927\u7684\u4e0d\u4e00\u5b9a\u80fd\u5bfb\u8def\u901a\u8fc7\u3002\n6\u3001\u652f\u6301RVO\u5bfc\u822a\uff0c\u53ef\u4ee5\u8ba9\u89d2\u8272\u884c\u8d70\u65f6\u4e92\u76f8\u907f\u8ba9\n7\u3001\u5bfb\u8def\u5bfc\u822a\u7ec4\u4ef6\u5c01\u88c5\u5f97\u65b9\u4fbf\u6613\u7528\uff0c\u5f00\u53d1\u8005\u53ef\u8c03\u7528\u5916\u90e8\u5b9e\u73b0\u5404\u79cd\u6761\u4ef6\u7684\u5bfb\u8def\n8\u3001\u5730\u56fe\u7cfb\u7edf\u6709\u5b8c\u5584\u7684\u5730\u56fe\u8df3\u8f6c\u529f\u80fd\uff0c\u53ef\u501f\u52a9\u5730\u56fe\u7f16\u8f91\u5668\u7f16\u8f91\u4f20\u9001\u95e8\uff0c\u4e0b\u9762\u5de5\u5177\u680f\u6709\u7f16\u8f91\u5668\u5165\u53e3\n9\u3001\u6709\u4e0eNPC\uff0c\u602a\u7269\u7684\u4ea4\u4e92\u529f\u80fd\u63a5\u53e3\uff0c\u5f00\u53d1\u8005\u53ef\u4ee5\u5728\u63a5\u53e3\u4e0a\u5b9e\u73b0\u81ea\u5df1\u7684\u529f\u80fd\n10\u3001\u89d2\u8272\u5c01\u88c5\u6709\u65b9\u4fbf\u6613\u7528\u7684\u5bfc\u822a\u63a5\u53e3\u548c\u8ddf\u8e2a\u63a5\u53e3\uff0c\u53ef\u8f7b\u6613\u5b9e\u73b0\u4e00\u5927\u7fa4\u602a\u8ffd\u8e2a\u73a9\u5bb6\n11\u3001\u7cfb\u7edf\u5c01\u88c5\u6709\u5bfb\u8def\u5bfc\u822a\u548c\u9065\u611f\u5bfc\u822a\uff0c\u53ef\u4ee5\u6839\u636e\u9700\u6c42\u8c03\u7528\u63a5\u53e3\u5207\u6362\u63a7\u5236\u65b9\u5f0f\n12\u3001\u7cfb\u7edf\u5c01\u88c5\u6709\u7c7b\u4f3c\u201c\u82f1\u96c4\u8054\u76df\u201d\u4e00\u6837\u7684\u5c0f\u5730\u56fe\u5bfc\u822a\u7cfb\u7edf\uff0c\u53ef\u6839\u636e\u9700\u6c42\u9009\u62e9\n13\u3001\u7cfb\u7edf\u5c01\u88c5\u6709\u81ea\u5b9a\u4e49\u9f20\u6807\u6837\u5f0f\uff0c\u505a\u9875\u6e38\u53ef\u80fd\u4f1a\u7528\u5230\uff0c\u901a\u8fc7\u63a5\u53e3\u53ef\u4ee5\u81ea\u7531\u5207\u6362\u6837\u5f0f\n14\u3001\u7cfb\u7edf\u5c01\u88c5\u6709\u663e\u793a\u5730\u56fe\u7f16\u8f91\u8def\u5f84\u7684\u63a5\u53e3\uff0c\u65b9\u4fbf\u8c03\u8bd5\u4f7f\u7528\n15\u3001\u7cfb\u7edf\u5c01\u88c5\u4e86\u573a\u666f\u7ba1\u7406\u7cfb\u7edf\uff0c\u5b9e\u73b0\u5730\u56fe\u7684\u81ea\u7531\u5207\u6362\n16\u3001\u7cfb\u7edf\u5c01\u88c5\u4e86\u58f0\u97f3\u7ba1\u7406\u7cfb\u7edf\uff0c\u5b9e\u73b0\u5207\u6362\u4e0d\u540c\u7684\u5730\u56fe\u64ad\u653e\u4e0d\u540c\u7684bgm\n            "
                },
                2: {
                    testUrl: "https://easymapeditor-1258223435.cos.ap-guangzhou.myqcloud.com/frameworkdemo/demo3/web-desktop/index.html",
                    buyUrl: "https://store.cocos.com/app/detail/4391",
                    title: "\u6846\u67b6\u4ecb\u7ecd",
                    desc: "\u6846\u67b6\u7248\u672ccreator3.5.0,\u542b\u4ee5\u4e0b\u5185\u5bb9\n1\u3001\u6e38\u620f\u767b\u5f55->\u52a0\u8f7d\u8fdb\u5927\u5385->\u521d\u59cb\u5316\u5730\u56fe\u7684\u5b8c\u6210\u6d41\u7a0b\uff0c\u53ef\u76f4\u63a5\u6362\u76ae\n2\u3001\u6846\u67b6\u4ee3\u7801\u6bcf\u4e2a\u63a5\u53e3\u548c\u5173\u952e\u7684\u5730\u65b9\u90fd\u6709\u89c4\u8303\u7684\u6ce8\u91ca\n3\u3001\u9ad8\u6548\u7684\u5730\u56fe\u5bfb\u8def\u7b97\u6cd5\uff0c\u6bcf\u5e27\u652f\u63013000\u4e2a\u89d2\u8272\u540c\u65f6\u5bfb\u8def\n4\u3001\u5bfb\u8def\u7b97\u6cd5\u652f\u6301\u6b63\u65b9\u5f62\uff0c\u83f1\u5f62\uff0c\u516d\u8fb9\u5f62\u7684\u5730\u56fe\u683c\u5b50\u5bfb\u8def\n5\u3001\u5bfb\u8def\u7b97\u6cd5\u652f\u6301\u6309\u73a9\u5bb6\u4f53\u79ef\u5927\u5c0f\u8fdb\u884c\u5bfb\u8def\uff0c\u6709\u4e9b\u5730\u65b9\uff0c\u4f53\u79ef\u5c0f\u7684\u89d2\u8272\u53ef\u5bfb\u8def\u901a\u8fc7\uff0c\u4f53\u79ef\u5927\u7684\u4e0d\u4e00\u5b9a\u80fd\u5bfb\u8def\u901a\u8fc7\u3002\n6\u3001\u652f\u6301RVO\u5bfc\u822a\uff0c\u53ef\u4ee5\u8ba9\u89d2\u8272\u884c\u8d70\u65f6\u4e92\u76f8\u907f\u8ba9\n7\u3001\u5bfb\u8def\u5bfc\u822a\u7ec4\u4ef6\u5c01\u88c5\u5f97\u65b9\u4fbf\u6613\u7528\uff0c\u5f00\u53d1\u8005\u53ef\u8c03\u7528\u5916\u90e8\u5b9e\u73b0\u5404\u79cd\u6761\u4ef6\u7684\u5bfb\u8def\n8\u3001\u5730\u56fe\u7cfb\u7edf\u6709\u5b8c\u5584\u7684\u5730\u56fe\u8df3\u8f6c\u529f\u80fd\uff0c\u53ef\u501f\u52a9\u5730\u56fe\u7f16\u8f91\u5668\u7f16\u8f91\u4f20\u9001\u95e8\uff0c\u4e0b\u9762\u5de5\u5177\u680f\u6709\u7f16\u8f91\u5668\u5165\u53e3\n9\u3001\u6709\u4e0eNPC\uff0c\u602a\u7269\u7684\u4ea4\u4e92\u529f\u80fd\u63a5\u53e3\uff0c\u5f00\u53d1\u8005\u53ef\u4ee5\u5728\u63a5\u53e3\u4e0a\u5b9e\u73b0\u81ea\u5df1\u7684\u529f\u80fd\n10\u3001\u89d2\u8272\u5c01\u88c5\u6709\u65b9\u4fbf\u6613\u7528\u7684\u5bfc\u822a\u63a5\u53e3\u548c\u8ddf\u8e2a\u63a5\u53e3\uff0c\u53ef\u8f7b\u6613\u5b9e\u73b0\u4e00\u5927\u7fa4\u602a\u8ffd\u8e2a\u73a9\u5bb6\n11\u3001\u7cfb\u7edf\u5c01\u88c5\u6709\u5bfb\u8def\u5bfc\u822a\u548c\u9065\u611f\u5bfc\u822a\uff0c\u53ef\u4ee5\u6839\u636e\u9700\u6c42\u8c03\u7528\u63a5\u53e3\u5207\u6362\u63a7\u5236\u65b9\u5f0f\n12\u3001\u7cfb\u7edf\u5c01\u88c5\u6709\u7c7b\u4f3c\u201c\u82f1\u96c4\u8054\u76df\u201d\u4e00\u6837\u7684\u5c0f\u5730\u56fe\u5bfc\u822a\u7cfb\u7edf\uff0c\u53ef\u6839\u636e\u9700\u6c42\u9009\u62e9\n13\u3001\u7cfb\u7edf\u5c01\u88c5\u6709\u81ea\u5b9a\u4e49\u9f20\u6807\u6837\u5f0f\uff0c\u505a\u9875\u6e38\u53ef\u80fd\u4f1a\u7528\u5230\uff0c\u901a\u8fc7\u63a5\u53e3\u53ef\u4ee5\u81ea\u7531\u5207\u6362\u6837\u5f0f\n14\u3001\u7cfb\u7edf\u5c01\u88c5\u6709\u663e\u793a\u5730\u56fe\u7f16\u8f91\u8def\u5f84\u7684\u63a5\u53e3\uff0c\u65b9\u4fbf\u8c03\u8bd5\u4f7f\u7528\n15\u3001\u7cfb\u7edf\u5c01\u88c5\u4e86\u573a\u666f\u7ba1\u7406\u7cfb\u7edf\uff0c\u5b9e\u73b0\u5730\u56fe\u7684\u81ea\u7531\u5207\u6362\n16\u3001\u7cfb\u7edf\u5c01\u88c5\u4e86\u58f0\u97f3\u7ba1\u7406\u7cfb\u7edf\uff0c\u5b9e\u73b0\u5207\u6362\u4e0d\u540c\u7684\u5730\u56fe\u64ad\u653e\u4e0d\u540c\u7684bgm\n            "
                }
            },
            e
        }(cc.Component);
        i.default = o,
        cc._RF.pop()
    }
    , {}],
    SaleView: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "2aebcVFgydEV7fNlz3/Cda4", "SaleView"),
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var o = t("../base/BaseView")
          , n = t("./SaleConfig")
          , r = cc._decorator
          , a = r.ccclass
          , s = r.property
          , c = function(t) {
            function e() {
                var e = null !== t && t.apply(this, arguments) || this;
                return e.testBtn = null,
                e.buyBtn = null,
                e.titleTxt = null,
                e.descTxt = null,
                e.cfgData = null,
                e
            }
            return __extends(e, t),
            e.prototype.start = function() {
                var t = this;
                this.testBtn.on(cc.Node.EventType.TOUCH_START, function() {
                    null != t.cfgData && window.open(t.cfgData.testUrl, "_blank")
                }),
                null != this.buyBtn && this.buyBtn.on(cc.Node.EventType.TOUCH_START, function() {
                    null != t.cfgData && window.open(t.cfgData.buyUrl, "_blank")
                })
            }
            ,
            e.prototype.openView = function(e) {
                this.cfgData = n.default.saleDic[e],
                null != this.cfgData && (this.titleTxt.string = this.cfgData.title,
                this.descTxt.string = this.cfgData.desc),
                t.prototype.open.call(this)
            }
            ,
            __decorate([s(cc.Node)], e.prototype, "testBtn", void 0),
            __decorate([s(cc.Node)], e.prototype, "buyBtn", void 0),
            __decorate([s(cc.Label)], e.prototype, "titleTxt", void 0),
            __decorate([s(cc.Label)], e.prototype, "descTxt", void 0),
            __decorate([a], e)
        }(o.default);
        i.default = c,
        cc._RF.pop()
    }
    , {
        "../base/BaseView": "BaseView",
        "./SaleConfig": "SaleConfig"
    }],
    SceneEditor: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "def2a2BwvpEm6TaGcmnHKSA", "SceneEditor"),
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var o = cc._decorator
          , n = o.ccclass
          , r = (o.property,
        function(t) {
            function e() {
                return null !== t && t.apply(this, arguments) || this
            }
            return __extends(e, t),
            __decorate([n], e)
        }(cc.Component));
        i.default = r,
        cc._RF.pop()
    }
    , {}],
    SceneMap: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "85ddcD3jSxBu5hvMsAKj2Q6", "SceneMap"),
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var o = t("../layer/MapLayer")
          , n = t("../layer/GridLayer")
          , r = t("../layer/RoadPointLayer")
          , a = t("../layer/EntityLayer")
          , s = t("../charactor/Charactor")
          , c = t("../editor/MapEditor")
          , h = t("../road/PathFindingAgent")
          , d = t("../../../editor/EditorElement/EditorSpawnPoint")
          , l = cc._decorator
          , p = l.ccclass
          , u = l.property
          , y = function(t) {
            function e() {
                var e = null !== t && t.apply(this, arguments) || this;
                return e.layer = null,
                e.mapLayer = null,
                e.gridLayer = null,
                e.roadPointLayer = null,
                e.entityLayer = null,
                e.player = null,
                e.container = null,
                e._startDrag = !1,
                e._containerScrollX = 0,
                e._containerScrollY = 0,
                e.isFollowPlayer = !1,
                e.isLookSeekRoad = !1,
                e.targetPos = cc.Vec2.ZERO,
                e._testSeekPathGraphic = null,
                e
            }
            return __extends(e, t),
            Object.defineProperty(e.prototype, "testSeekPathGraphic", {
                get: function() {
                    return this._testSeekPathGraphic
                },
                enumerable: !1,
                configurable: !0
            }),
            e.prototype.start = function() {
                this.player.sceneMap = this,
                this.player.node.on(cc.Node.EventType.MOUSE_DOWN, this.onPlayerMouseDown, this),
                this.node.on(cc.Node.EventType.MOUSE_DOWN, this.onMapMouseDown, this),
                this.node.on(cc.Node.EventType.MOUSE_UP, this.onMapMouseUp, this),
                this.node.on(cc.Node.EventType.MOUSE_MOVE, this.onMapMouseMove, this),
                this.container.on(cc.Node.EventType.MOUSE_ENTER, this.onMapMouseEnter, this, !0),
                this.container.on(cc.Node.EventType.MOUSE_LEAVE, this.onMapMouseLeave, this, !0);
                var t = new cc.Node;
                t.anchorX = 0,
                t.anchorY = 0,
                this.layer.addChild(t),
                this._testSeekPathGraphic = t.addComponent(cc.Graphics)
            }
            ,
            e.prototype.init = function(t) {
                var e = c.default.instance.editArea.mapLayer.bgImage;
                this.mapLayer.init(t.mapWidth, t.mapHeight, 256, 256, e.spriteFrame.getTexture()),
                this.gridLayer.drawGrid(t.mapWidth, t.mapHeight, t.nodeWidth, t.nodeHeight, t.type),
                this.roadPointLayer.initSetting(),
                this.roadPointLayer.initRoadPointInfo(t),
                this.entityLayer.initMapUintInfo(t),
                h.default.instance.init(t),
                this.node.width = this.mapLayer.width,
                this.node.height = this.mapLayer.height,
                this.player.stop(),
                this.player.state = s.CharactorState.sitdown,
                this.player.direction = 0,
                this.player.node.x = 606,
                this.player.node.y = 440;
                var i = this.getSpainPoint();
                null != i && (this.player.node.x = i.node.x,
                this.player.node.y = i.node.y),
                this.setViewToPoint(this.player.node.x, this.player.node.y)
            }
            ,
            e.prototype.getSpainPoint = function() {
                for (var t = this.entityLayer.getMapUnits(), e = [], i = 0; i < t.length; i++)
                    t[i]instanceof d.default && e.push(t[i]);
                for (i = 0; i < e.length; i++)
                    if (e[i].defaultSpawn)
                        return e[i];
                return e.length > 0 ? e[0] : null
            }
            ,
            e.prototype.getMapNodeByPixel = function(t, e) {
                return h.default.instance.getRoadNodeByPixel(t, e)
            }
            ,
            e.prototype.onPlayerMouseDown = function(t) {
                this._startDrag = !0,
                t.stopPropagation()
            }
            ,
            e.prototype.onMapMouseDown = function(t) {
                var e = this.node.convertToNodeSpaceAR(t.getLocation());
                this.isLookSeekRoad ? this.testSeekRoad(e.x, e.y) : this.movePlayer(e.x, e.y)
            }
            ,
            e.prototype.onMapMouseUp = function() {
                this._startDrag = !1
            }
            ,
            e.prototype.onMapMouseMove = function(t) {
                if (this._startDrag) {
                    this.player.stop();
                    var e = this.node.convertToNodeSpaceAR(t.getLocation());
                    this.player.node.position = e
                }
            }
            ,
            e.prototype.onMapMouseEnter = function() {
                this.container.hasEventListener(cc.Node.EventType.MOUSE_MOVE) || this.container.on(cc.Node.EventType.MOUSE_MOVE, this.onMapContainerMouseMove, this)
            }
            ,
            e.prototype.onMapMouseLeave = function() {
                this.container.hasEventListener(cc.Node.EventType.MOUSE_MOVE) && this.container.off(cc.Node.EventType.MOUSE_MOVE, this.onMapContainerMouseMove, this),
                this._containerScrollX = 0,
                this._containerScrollY = 0
            }
            ,
            e.prototype.onMapContainerMouseMove = function(t) {
                var e = this.container.convertToNodeSpaceAR(t.getLocation())
                  , i = this.container.width - 80
                  , o = this.container.height - 80;
                this._containerScrollX = 0,
                this._containerScrollY = 0,
                e.x < 80 ? this._containerScrollX = -25 : e.x > i && (this._containerScrollX = 25),
                e.y < 80 ? this._containerScrollY = -25 : e.y > o && (this._containerScrollY = 25)
            }
            ,
            e.prototype.scrollSceneMap = function() {
                var t = this.container.width
                  , e = this.container.height
                  , i = this.node.width
                  , o = this.node.height;
                i <= this.container.width ? this.node.x = 0 : (this.node.x -= this._containerScrollX,
                this.node.x > 0 ? this.node.x = 0 : this.node.x < -(i - t) && (this.node.x = -(i - t))),
                o <= this.container.height ? this.node.y = 0 : (this.node.y -= this._containerScrollY,
                this.node.y > 0 ? this.node.y = 0 : this.node.y < -(o - e) && (this.node.y = -(o - e)))
            }
            ,
            e.prototype.followPlayer = function(t) {
                this.targetPos.x = -(this.player.node.x - this.container.width / 2),
                this.targetPos.y = -(this.player.node.y - this.container.height / 2);
                var e = this.node.width - this.container.width
                  , i = this.node.height - this.container.height;
                e <= 0 ? this.targetPos.x = 0 : this.targetPos.x > 0 ? this.targetPos.x = 0 : this.targetPos.x < -e && (this.targetPos.x = -e),
                i <= 0 ? this.targetPos.y = 0 : this.targetPos.y > 0 ? this.targetPos.y = 0 : this.targetPos.y < -i && (this.targetPos.y = -i),
                this.node.position.lerp(this.targetPos, 2 * t, this.targetPos),
                this.node.position = this.targetPos
            }
            ,
            e.prototype.setViewToPoint = function(t, e) {
                this.targetPos.x = -(t - this.container.width / 2),
                this.targetPos.y = -(e - this.container.height / 2);
                var i = this.node.width - this.container.width
                  , o = this.node.height - this.container.height;
                i <= 0 ? this.targetPos.x = 0 : this.targetPos.x > 0 ? this.targetPos.x = 0 : this.targetPos.x < -i && (this.targetPos.x = -i),
                o <= 0 ? this.targetPos.y = 0 : this.targetPos.y > 0 ? this.targetPos.y = 0 : this.targetPos.y < -o && (this.targetPos.y = -o),
                this.node.position = this.targetPos
            }
            ,
            e.prototype.movePlayer = function(t, e) {
                var i = h.default.instance.seekPath2(this.player.node.x, this.player.node.y, t, e);
                i.length > 0 && this.player.walkByRoad(i)
            }
            ,
            e.prototype.testSeekRoad = function(t, e) {
                this.player.stop(),
                h.default.instance.testSeekRoad(this.player.node.x, this.player.node.y, t, e, this.testSeekRoadCallback, this, 100)
            }
            ,
            e.prototype.testSeekRoadCallback = function(t, e, i, o, n, r) {
                var a, s, c = this;
                if (this._testSeekPathGraphic.clear(),
                r) {
                    for (this._testSeekPathGraphic.lineWidth = 4,
                    this._testSeekPathGraphic.strokeColor.fromHEX("#2b2b2b"),
                    this._testSeekPathGraphic.fillColor.fromHEX("#ffcc00"),
                    s = 0; s < r.length; s++)
                        a = r[s],
                        this._testSeekPathGraphic.circle(a.px, a.py, 10);
                    this._testSeekPathGraphic.fill(),
                    this._testSeekPathGraphic.unscheduleAllCallbacks(),
                    s = 0,
                    this._testSeekPathGraphic.schedule(function() {
                        c._testSeekPathGraphic.moveTo(r[s].px, r[s].py),
                        c._testSeekPathGraphic.lineTo(r[s + 1].px, r[s + 1].py),
                        c._testSeekPathGraphic.stroke(),
                        s++
                    }, .1, r.length - 2, 0),
                    this.player.walkByRoad(r)
                } else {
                    for (this._testSeekPathGraphic.fillColor.fromHEX("#d4d4d4"),
                    s = 0; s < o.length; s++)
                        a = o[s],
                        this._testSeekPathGraphic.circle(a.px, a.py, 10);
                    for (this._testSeekPathGraphic.fill(),
                    this._testSeekPathGraphic.fillColor.fromHEX("#ffcc00"),
                    s = 0; s < n.length; s++)
                        a = n[s],
                        this._testSeekPathGraphic.circle(a.px, a.py, 10);
                    this._testSeekPathGraphic.fill()
                }
            }
            ,
            e.prototype.stopTestSeekRoad = function() {
                h.default.instance.stopTestSeekRoad()
            }
            ,
            e.prototype.update = function(t) {
                this.isFollowPlayer ? this._startDrag || this.followPlayer(t) : this.scrollSceneMap()
            }
            ,
            __decorate([u(cc.Node)], e.prototype, "layer", void 0),
            __decorate([u(o.default)], e.prototype, "mapLayer", void 0),
            __decorate([u(n.default)], e.prototype, "gridLayer", void 0),
            __decorate([u(r.default)], e.prototype, "roadPointLayer", void 0),
            __decorate([u(a.default)], e.prototype, "entityLayer", void 0),
            __decorate([u(s.default)], e.prototype, "player", void 0),
            __decorate([u(cc.Node)], e.prototype, "container", void 0),
            __decorate([p], e)
        }(cc.Component);
        i.default = y,
        cc._RF.pop()
    }
    , {
        "../../../editor/EditorElement/EditorSpawnPoint": "EditorSpawnPoint",
        "../charactor/Charactor": "Charactor",
        "../editor/MapEditor": "MapEditor",
        "../layer/EntityLayer": "EntityLayer",
        "../layer/GridLayer": "GridLayer",
        "../layer/MapLayer": "MapLayer",
        "../layer/RoadPointLayer": "RoadPointLayer",
        "../road/PathFindingAgent": "PathFindingAgent"
    }],
    ScrollWin: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "51672YFV25AGo4Cca/CjJZW", "ScrollWin"),
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var o = cc._decorator
          , n = o.ccclass
          , r = o.property
          , a = function(t) {
            function e() {
                var e = null !== t && t.apply(this, arguments) || this;
                return e.view = null,
                e.stage = null,
                e.content = null,
                e.hScrollbar = null,
                e.vScrollbar = null,
                e
            }
            return __extends(e, t),
            Object.defineProperty(e.prototype, "stageWidth", {
                get: function() {
                    return this.content.width * this.stage.scale
                },
                enumerable: !1,
                configurable: !0
            }),
            Object.defineProperty(e.prototype, "stageHeight", {
                get: function() {
                    return this.content.height * this.stage.scale
                },
                enumerable: !1,
                configurable: !0
            }),
            e.prototype.start = function() {
                this.initScrollArea()
            }
            ,
            e.prototype.addStageListener = function() {
                var t = cc.find("Canvas");
                t.on(cc.Node.EventType.MOUSE_MOVE, this.onMouseMove, this),
                t.on(cc.Node.EventType.MOUSE_UP, this.onMouseUP, this),
                t.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancle, this),
                t._touchListener && t._touchListener.setSwallowTouches(!1)
            }
            ,
            e.prototype.offStageListener = function() {
                var t = cc.find("Canvas");
                t.off(cc.Node.EventType.MOUSE_MOVE, this.onMouseMove, this),
                t.off(cc.Node.EventType.MOUSE_UP, this.onMouseUP, this),
                t.off(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancle, this)
            }
            ,
            e.prototype.onMouseMove = function(t) {
                var e = !1;
                if (this.hScrollbar.scroll) {
                    var i = this.hScrollbar.getChildByName("bar");
                    if ((r = this.hScrollbar.convertToNodeSpaceAR(t.getLocation())).x < i.x)
                        this.setStrollX(r.x);
                    else if (r.x > i.x + i.width)
                        this.setStrollX(r.x - i.width);
                    else {
                        var o = i.convertToNodeSpaceAR(t.getLocation())
                          , n = r.x - o.x + 2 * t.getDeltaX();
                        this.setStrollX(n)
                    }
                    e = !0
                }
                if (this.vScrollbar.scroll) {
                    var r, a = this.vScrollbar.getChildByName("bar");
                    if ((r = this.vScrollbar.convertToNodeSpaceAR(t.getLocation())).y > a.y)
                        this.setStrollY(r.y);
                    else if (r.y < a.y - a.height)
                        this.setStrollY(r.y + a.height);
                    else {
                        o = a.convertToNodeSpaceAR(t.getLocation());
                        var s = r.y - o.y + 2 * t.getDeltaY();
                        this.setStrollY(s)
                    }
                    e = !0
                }
                e || this.offStageListener()
            }
            ,
            e.prototype.onMouseUP = function() {
                this.hScrollbar.scroll = !1,
                this.vScrollbar.scroll = !1,
                this.offStageListener()
            }
            ,
            e.prototype.onMouseLeave = function(t) {
                this.onMouseUP(t)
            }
            ,
            e.prototype.onTouchCancle = function(t) {
                this.onMouseUP(t)
            }
            ,
            e.prototype.initScrollArea = function() {
                var t = this;
                this.hScrollbar.on(cc.Node.EventType.MOUSE_DOWN, function(e) {
                    t.hScrollbar.scroll = !0;
                    var i = t.hScrollbar.getChildByName("bar")
                      , o = t.hScrollbar.convertToNodeSpaceAR(e.getLocation());
                    o.x < i.x ? t.setStrollX(o.x) : o.x > i.x + i.width && t.setStrollX(o.x - i.width),
                    t.addStageListener()
                }),
                this.hScrollbar.on(cc.Node.EventType.MOUSE_MOVE, function(e) {
                    if (t.hScrollbar.scroll) {
                        var i = t.hScrollbar.getChildByName("bar")
                          , o = t.hScrollbar.convertToNodeSpaceAR(e.getLocation());
                        if (o.x < i.x)
                            t.setStrollX(o.x);
                        else if (o.x > i.x + i.width)
                            t.setStrollX(o.x - i.width);
                        else {
                            var n = i.convertToNodeSpaceAR(e.getLocation())
                              , r = o.x - n.x + 2 * e.getDeltaX();
                            t.setStrollX(r)
                        }
                    }
                }),
                this.hScrollbar.on(cc.Node.EventType.MOUSE_UP, function() {
                    t.hScrollbar.scroll = !1
                }),
                this.vScrollbar.on(cc.Node.EventType.MOUSE_DOWN, function(e) {
                    t.vScrollbar.scroll = !0;
                    var i = t.vScrollbar.getChildByName("bar")
                      , o = t.vScrollbar.convertToNodeSpaceAR(e.getLocation());
                    o.y > i.y ? t.setStrollY(o.y) : o.y < i.y - i.height && t.setStrollY(o.y + i.height),
                    t.addStageListener()
                }),
                this.vScrollbar.on(cc.Node.EventType.MOUSE_MOVE, function(e) {
                    if (t.vScrollbar.scroll) {
                        var i = t.vScrollbar.getChildByName("bar")
                          , o = t.vScrollbar.convertToNodeSpaceAR(e.getLocation());
                        if (o.y > i.y)
                            t.setStrollY(o.y);
                        else if (o.y < i.y - i.height)
                            t.setStrollY(o.y + i.height);
                        else {
                            var n = i.convertToNodeSpaceAR(e.getLocation())
                              , r = o.y - n.y + 2 * e.getDeltaY();
                            t.setStrollY(r)
                        }
                    }
                }),
                this.vScrollbar.on(cc.Node.EventType.MOUSE_UP, function() {
                    t.vScrollbar.scroll = !1
                })
            }
            ,
            e.prototype.setStrollX = function(t) {
                var e = this.stageWidth - this.view.width
                  , i = t / (this.view.width - this.hScrollbar.getChildByName("bar").width);
                this.stage.x = -i * e,
                this.stage.x > 0 && (this.stage.x = 0),
                this.stage.x < -e && (this.stage.x = -e)
            }
            ,
            e.prototype.setStrollY = function(t) {
                var e = this.stageHeight - this.view.height
                  , i = -t / (this.view.height - this.vScrollbar.getChildByName("bar").height);
                this.stage.y = -(e - i * e),
                this.stage.y > 0 && (this.stage.y = 0),
                this.stage.y < -e && (this.stage.y = -e)
            }
            ,
            e.prototype.update = function() {
                if (this.stageWidth > this.view.width) {
                    this.hScrollbar.active = !0;
                    var t = this.hScrollbar.getChildByName("bar")
                      , e = this.stageWidth - this.view.width;
                    t.width = (1 - e / this.stageWidth) * this.view.width;
                    var i = this.view.width - t.width;
                    t.x = -this.stage.x / e * i,
                    t.x < 0 && (t.x = 0),
                    t.x > i && (t.x = i),
                    t.active = !0
                } else
                    (t = this.hScrollbar.getChildByName("bar")).active = !1;
                if (this.stageHeight > this.view.height) {
                    this.vScrollbar.active = !0;
                    var o = this.vScrollbar.getChildByName("bar")
                      , n = this.stageHeight - this.view.height;
                    o.height = (1 - n / this.stageHeight) * this.view.height;
                    var r = this.view.height - o.height;
                    o.y = -(n + this.stage.y) / n * r,
                    o.y > 0 && (o.y = 0),
                    o.y < -r && (o.y = -r),
                    o.active = !0
                } else
                    (o = this.vScrollbar.getChildByName("bar")).active = !1
            }
            ,
            __decorate([r(cc.Node)], e.prototype, "view", void 0),
            __decorate([r(cc.Node)], e.prototype, "stage", void 0),
            __decorate([r(cc.Node)], e.prototype, "content", void 0),
            __decorate([r(cc.Node)], e.prototype, "hScrollbar", void 0),
            __decorate([r(cc.Node)], e.prototype, "vScrollbar", void 0),
            __decorate([n], e)
        }(cc.Component);
        i.default = a,
        cc._RF.pop()
    }
    , {}],
    SettingData: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "1eb56aP29RA4I6IF86OqAJz", "SettingData"),
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var o = function() {
            function t() {
                this.defaultRoadValue = 1,
                this.roadSetDatas = []
            }
            return Object.defineProperty(t, "instance", {
                get: function() {
                    return this._instance || (this._instance = new t,
                    this._instance.init()),
                    this._instance
                },
                enumerable: !1,
                configurable: !0
            }),
            t.prototype.init = function() {
                this.initLocaRoadSetData()
            }
            ,
            t.prototype.initLocaRoadSetData = function() {
                var t = cc.sys.localStorage.getItem("DefaultRoadValue", 1);
                this.defaultRoadValue = Number(t);
                var e = cc.sys.localStorage.getItem("RoadSetDatas", null);
                e ? this.roadSetDatas = JSON.parse(e) : this.initDefaultRoadSetData()
            }
            ,
            t.prototype.initDefaultRoadSetData = function() {
                this.defaultRoadValue = 1,
                this.roadSetDatas = [],
                this.roadSetDatas.push({
                    id: 0,
                    value: 0,
                    color: "#00ff0065",
                    isShow: !0,
                    isPass: !0,
                    desc: "Walkable Node (Q)"
                }),
                this.roadSetDatas.push({
                    id: 1,
                    value: 1,
                    color: "#ff000065",
                    isShow: !1,
                    isPass: !1,
                    desc: "Obstacle Node (W)"
                }),
                this.roadSetDatas.push({
                    id: 2,
                    value: 2,
                    color: "#0000ff65",
                    isShow: !0,
                    isPass: !0,
                    desc: "Occlusion Node (E)"
                }),
                this.roadSetDatas.push({
                    id: 3,
                    value: 3,
                    color: "#ffff0065",
                    isShow: !0,
                    isPass: !0,
                    desc: "Hidden Node (R)"
                })
            }
            ,
            t.prototype.saveRoadSetData = function() {
                cc.sys.localStorage.setItem("RoadSetDatas", JSON.stringify(this.roadSetDatas)),
                cc.sys.localStorage.setItem("DefaultRoadValue", this.defaultRoadValue)
            }
            ,
            t
        }();
        i.default = o,
        cc._RF.pop()
    }
    , {}],
    SettingView: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "c1977y28a5M4rMoHHzhs8dH", "SettingView"),
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var o = t("../../editor/MapEditor")
          , n = t("../base/BaseView")
          , r = t("./RoadNodeSettingBar")
          , a = t("./SettingData")
          , s = cc._decorator
          , c = s.ccclass
          , h = s.property
          , d = function(t) {
            function e() {
                var e = null !== t && t.apply(this, arguments) || this;
                return e.mapNameTxt = null,
                e.defaultRoadValueTxt = null,
                e.roadNodeSettingBarList = [],
                e.resetBtn = null,
                e.cancleBtn = null,
                e.applyBtn = null,
                e
            }
            return __extends(e, t),
            e.prototype.start = function() {
                for (var t = this, e = 0; e < this.roadNodeSettingBarList.length; e++)
                    this.roadNodeSettingBarList[e].init(a.default.instance.roadSetDatas[e]);
                this.resetBtn.node.on(cc.Node.EventType.TOUCH_START, function() {
                    a.default.instance.initDefaultRoadSetData();
                    for (var e = 0; e < t.roadNodeSettingBarList.length; e++)
                        t.roadNodeSettingBarList[e].init(a.default.instance.roadSetDatas[e]);
                    t.defaultRoadValueTxt.string = "" + a.default.instance.defaultRoadValue
                }),
                this.cancleBtn.node.on(cc.Node.EventType.TOUCH_START, function(e) {
                    t.onCloseBtnClick(e)
                }),
                this.applyBtn.node.on(cc.Node.EventType.TOUCH_START, function() {
                    for (var e = 0; e < t.roadNodeSettingBarList.length; e++)
                        t.roadNodeSettingBarList[e].applySetting();
                    a.default.instance.defaultRoadValue = Number(t.defaultRoadValueTxt.string),
                    a.default.instance.saveRoadSetData(),
                    o.default.instance.mapName = t.mapNameTxt.string,
                    setTimeout(function() {
                        o.default.instance.editArea.roadPointLayer.initSetting(),
                        o.default.instance.editArea.roadPointLayer.drawRointPoint(),
                        cc.systemEvent.emit("SettingApply")
                    }, 50),
                    t.close()
                }),
                this.mapNameTxt.string = o.default.instance.mapName,
                this.defaultRoadValueTxt.string = "" + a.default.instance.defaultRoadValue
            }
            ,
            e.prototype.onCloseBtnClick = function(e) {
                a.default.instance.initLocaRoadSetData();
                for (var i = 0; i < this.roadNodeSettingBarList.length; i++)
                    this.roadNodeSettingBarList[i].init(a.default.instance.roadSetDatas[i]);
                this.mapNameTxt.string = o.default.instance.mapName,
                this.defaultRoadValueTxt.string = "" + a.default.instance.defaultRoadValue,
                t.prototype.onCloseBtnClick.call(this, e)
            }
            ,
            e.prototype.onTextInputChange = function() {
                this.mapNameTxt
            }
            ,
            e.prototype.open = function() {
                this.mapNameTxt.string = o.default.instance.mapName,
                t.prototype.open.call(this)
            }
            ,
            __decorate([h(cc.EditBox)], e.prototype, "mapNameTxt", void 0),
            __decorate([h(cc.EditBox)], e.prototype, "defaultRoadValueTxt", void 0),
            __decorate([h(r.default)], e.prototype, "roadNodeSettingBarList", void 0),
            __decorate([h(cc.Button)], e.prototype, "resetBtn", void 0),
            __decorate([h(cc.Button)], e.prototype, "cancleBtn", void 0),
            __decorate([h(cc.Button)], e.prototype, "applyBtn", void 0),
            __decorate([c], e)
        }(n.default);
        i.default = d,
        cc._RF.pop()
    }
    , {
        "../../editor/MapEditor": "MapEditor",
        "../base/BaseView": "BaseView",
        "./RoadNodeSettingBar": "RoadNodeSettingBar",
        "./SettingData": "SettingData"
    }],
    TeachView: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "96cae0iqiRKAqRfzDroU7OA", "TeachView"),
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var o = t("../base/BaseView")
          , n = cc._decorator
          , r = n.ccclass
          , a = n.property
          , s = function(t) {
            function e() {
                var e = null !== t && t.apply(this, arguments) || this;
                return e.videoPlayer = null,
                e.loadingPanel = null,
                e.loadingTxt = null,
                e.index = 0,
                e.arr = [".", "..", "..."],
                e.time = 0,
                e.vpClip = null,
                e
            }
            return __extends(e, t),
            e.prototype.start = function() {}
            ,
            e.prototype.update = function(t) {
                this.vpClip || (this.time -= t,
                this.time <= 0 && (this.time = .25,
                this.index++,
                this.index %= this.arr.length,
                this.loadingTxt.string = "Loading" + this.arr[this.index]))
            }
            ,
            e.prototype.playVideo = function() {
                var t = this;
                this.vpClip ? (this.loadingPanel.active = !1,
                this.videoPlayer.clip = this.vpClip,
                this.videoPlayer.play()) : (this.loadingPanel.active = !0,
                cc.loader.loadRes("Teach", function(e, i) {
                    t.loadingPanel.active = !1,
                    t.vpClip = i,
                    t.videoPlayer.clip = t.vpClip,
                    t.videoPlayer.play()
                }))
            }
            ,
            e.prototype.stopVideo = function() {
                this.videoPlayer.stop()
            }
            ,
            e.prototype.open = function() {
                t.prototype.open.call(this),
                this.playVideo()
            }
            ,
            e.prototype.close = function() {
                t.prototype.close.call(this),
                this.stopVideo()
            }
            ,
            __decorate([a(cc.VideoPlayer)], e.prototype, "videoPlayer", void 0),
            __decorate([a(cc.Node)], e.prototype, "loadingPanel", void 0),
            __decorate([a(cc.Label)], e.prototype, "loadingTxt", void 0),
            __decorate([r], e)
        }(o.default);
        i.default = s,
        cc._RF.pop()
    }
    , {
        "../base/BaseView": "BaseView"
    }],
    TestView: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "fb67dZSfaNB8oFzxgVa/A/+", "TestView"),
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var o = t("./SceneMap")
          , n = t("../editor/MapEditor")
          , r = t("../road/MapRoadUtils")
          , a = t("../operation/KeyBoardExecute")
          , s = cc._decorator
          , c = s.ccclass
          , h = s.property
          , d = function(t) {
            function e() {
                var e = null !== t && t.apply(this, arguments) || this;
                return e.sceneMap = null,
                e.closeBtn = null,
                e.pixelInfoTxt = null,
                e.gridInfoTxt = null,
                e.worldInfoTxt = null,
                e.msBtn = null,
                e.rsBtn = null,
                e.esBtn = null,
                e.gsBtn = null,
                e.minMapBtn = null,
                e.followBtn = null,
                e.lookSeekBtn = null,
                e.entityVisible = !0,
                e
            }
            return __extends(e, t),
            e.prototype.start = function() {
                var t = this;
                this.closeBtn.on(cc.Node.EventType.TOUCH_START, function() {
                    t.close()
                }, this),
                this.sceneMap.node.on(cc.Node.EventType.MOUSE_MOVE, this.onShowRoadMsg, this),
                this.initKeyBoardFunction()
            }
            ,
            e.prototype.init = function(t) {
                this.sceneMap.init(t),
                this.sceneMap.mapLayer.node.active = !0,
                this.msBtn.getComponentInChildren(cc.Label).string = this.sceneMap.mapLayer.node.active ? "Hide Map (U)" : "Show Map (U)",
                this.sceneMap.entityLayer.node.active = !0,
                this.esBtn.getComponentInChildren(cc.Label).string = this.sceneMap.entityLayer.node.active ? "Hide Objects (O)" : "Show Objects (O)",
                this.sceneMap.roadPointLayer.node.active = !0,
                this.rsBtn.getComponentInChildren(cc.Label).string = this.sceneMap.roadPointLayer.node.active ? "Hide Nodes (I)" : "Show Nodes (I)",
                this.sceneMap.gridLayer.node.active = !0,
                this.gsBtn.getComponentInChildren(cc.Label).string = this.sceneMap.gridLayer.node.active ? "Hide Grid (P)" : "Show Grid (P)"            }
            ,
            e.prototype.initKeyBoardFunction = function() {
                a.default.addKeyDownListener(this.showMapLayer, cc.macro.KEY.u, this),
                a.default.addKeyDownListener(this.showRoadLayer, cc.macro.KEY.i, this),
                a.default.addKeyDownListener(this.showEntityLayer, cc.macro.KEY.o, this),
                a.default.addKeyDownListener(this.showGridLayer, cc.macro.KEY.p, this),
                a.default.addKeyDownListener(this.sceneScrollByPlayer, cc.macro.KEY.f3, this),
                a.default.addKeyDownListener(this.lookSeekRoad, cc.macro.KEY.f4, this)
            }
            ,
            e.prototype.onShowRoadMsg = function(t) {
                var e = this.sceneMap.node.convertToNodeSpaceAR(t.getLocation())
                  , i = r.default.instance.getNodeByPixel(e.x, e.y);
                this.pixelInfoTxt.string = "(" + Math.floor(i.px) + "," + Math.floor(i.py) + ")",
                this.gridInfoTxt.string = "(" + i.dx + "," + i.dy + ")",
                this.worldInfoTxt.string = "(" + i.cx + "," + i.cy + ")"
            }
            ,
            e.prototype.showMapLayer = function() {
                this.sceneMap.mapLayer.node.active = !this.sceneMap.mapLayer.node.active,
                this.msBtn.getComponentInChildren(cc.Label).string = this.sceneMap.mapLayer.node.active ? "Hide Map (U)" : "Show Map (U)"
            }
            ,
            e.prototype.showEntityLayer = function() {
                this.entityVisible = !this.entityVisible;
                for (var t = this.sceneMap.entityLayer.getMapUnits(), e = 0; e < t.length; e++)
                    t[e].node.active = this.entityVisible;
                this.esBtn.getComponentInChildren(cc.Label).string = this.entityVisible ? "Hide Objects (O)" : "Show Objects (O)"
            }
            ,
            e.prototype.showRoadLayer = function() {
                this.sceneMap.roadPointLayer.node.active = !this.sceneMap.roadPointLayer.node.active,
                this.rsBtn.getComponentInChildren(cc.Label).string = this.sceneMap.roadPointLayer.node.active ? "Hide Nodes (I)" : "Show Nodes (I)"
            }
            ,
            e.prototype.showGridLayer = function() {
                this.sceneMap.gridLayer.node.active = !this.sceneMap.gridLayer.node.active,
                this.gsBtn.getComponentInChildren(cc.Label).string = this.sceneMap.gridLayer.node.active ? "Hide Grid (P)" : "Show Grid (P)"
            }
            ,
            e.prototype.showMinMap = function() {}
            ,
            e.prototype.sceneScrollByPlayer = function() {
                this.sceneMap.isFollowPlayer = !this.sceneMap.isFollowPlayer,
                this.followBtn.getComponentInChildren(cc.Label).string = this.sceneMap.isFollowPlayer ? "Screen Not Following Player (F3)" : "Screen Following Player (F3)"
            }
            ,
            e.prototype.lookSeekRoad = function() {
                this.sceneMap.stopTestSeekRoad(),
                this.sceneMap.isLookSeekRoad = !this.sceneMap.isLookSeekRoad,
                this.lookSeekBtn.getComponentInChildren(cc.Label).string = this.sceneMap.isLookSeekRoad ? "Normal Pathfinding (F4)" : "View Pathfinding Process (F4)",                !this.sceneMap.isLookSeekRoad && this.sceneMap.testSeekPathGraphic.clear()
            }
            ,
            e.prototype.open = function() {
                a.default.setFocus(this),
                this.node.active = !0
            }
            ,
            e.prototype.close = function() {
                this.sceneMap.stopTestSeekRoad(),
                this.sceneMap.testSeekPathGraphic.clear(),
                a.default.setFocus(null),
                this.node.active = !1,
                n.default.instance.openEditAreaView()
            }
            ,
            __decorate([h(o.default)], e.prototype, "sceneMap", void 0),
            __decorate([h(cc.Node)], e.prototype, "closeBtn", void 0),
            __decorate([h(cc.Label)], e.prototype, "pixelInfoTxt", void 0),
            __decorate([h(cc.Label)], e.prototype, "gridInfoTxt", void 0),
            __decorate([h(cc.Label)], e.prototype, "worldInfoTxt", void 0),
            __decorate([h(cc.Button)], e.prototype, "msBtn", void 0),
            __decorate([h(cc.Button)], e.prototype, "rsBtn", void 0),
            __decorate([h(cc.Button)], e.prototype, "esBtn", void 0),
            __decorate([h(cc.Button)], e.prototype, "gsBtn", void 0),
            __decorate([h(cc.Button)], e.prototype, "minMapBtn", void 0),
            __decorate([h(cc.Button)], e.prototype, "followBtn", void 0),
            __decorate([h(cc.Button)], e.prototype, "lookSeekBtn", void 0),
            __decorate([c], e)
        }(cc.Component);
        i.default = d,
        cc._RF.pop()
    }
    , {
        "../editor/MapEditor": "MapEditor",
        "../operation/KeyBoardExecute": "KeyBoardExecute",
        "../road/MapRoadUtils": "MapRoadUtils",
        "./SceneMap": "SceneMap"
    }],
    Test: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "ed144l4FmpEzbHyBIBVsSXE", "Test"),
        Object.defineProperty(i, "__esModule", {
            value: !0
        }),
        i.QuadTree = i.Random = void 0;
        var o = cc._decorator
          , n = o.ccclass
          , r = o.property
          , a = function() {
            function t() {}
            return t.Range = function(t, e) {
                return e > t ? Math.random() * (e - t) + t : Math.random() * (t - e) + e
            }
            ,
            t.RangeInteger = function(t, e) {
                return Math.floor(this.Range(t, e))
            }
            ,
            t
        }();
        i.Random = a;
        var s = function(t) {
            function e() {
                var e = null !== t && t.apply(this, arguments) || this;
                return e.label = null,
                e.text = "hello",
                e.rectBounds = [],
                e.rootTreeNode = null,
                e.oRectArr = [],
                e
            }
            var i;
            return __extends(e, t),
            i = e,
            e.prototype.onLoad = function() {
                i.instance = this
            }
            ,
            e.prototype.loadXML = function() {
                var t;
                try {
                    t = new ActiveXObject("Microsoft.XMLDOM")
                } catch (i) {
                    t = document.implementation.createDocument("", "", null)
                }
                try {
                    t.asyc = !1,
                    t.load("xxx.xml")
                } catch (i) {
                    var e = new window.XMLHttpRequest;
                    e.open("GET", "xxx.xml", !1),
                    t = e.responseXML
                }
                return t
            }
            ,
            e.prototype.start = function() {
                var t, e = this;
                console.log("XMLHttpRequest", XMLHttpRequest);
                var i = new window.XMLHttpRequest;
                i.open("GET", "<root><AlleyWay><Code>1103</Code><Name>\u80e1\u540c2</Name></AlleyWay><AlleyWay><Code>1105</Code><Name>\u80e1\u540c2</Name></AlleyWay></root>", !1),
                t = i.responseXML,
                console.log("xmlDoc", t);
                var o = this.addComponent(cc.Graphics);
                this.graphic = o,
                o.lineWidth = 1,
                o.strokeColor = new cc.Color(255,0,0);
                var n = new c(new h(0,0,960,640),1,0,0);
                this.rootTreeNode = n;
                for (var r = 0; r < 15; r++) {
                    var s = new cc.Node;
                    s.parent = this.node,
                    s.x = a.Range(0, 960),
                    s.y = a.Range(0, 640),
                    s.width = a.RangeInteger(20, 100),
                    s.height = a.RangeInteger(20, 100),
                    s.runAction(cc.sequence(cc.moveTo(a.Range(1, 5), a.Range(0, 960), a.Range(0, 640)), cc.moveTo(a.Range(1, 5), a.Range(0, 960), a.Range(0, 640))).repeatForever());
                    var l = new d(s,s.x - s.width / 2,s.y - s.height / 2,s.width,s.height);
                    n.insert(l);
                    var p = s.addComponent(cc.Graphics);
                    p.fillColor = new cc.Color(255,255,255,200),
                    p.rect(-s.width / 2, -s.height / 2, s.width, s.height),
                    p.fill(),
                    this.oRectArr.push(l)
                }
                n.draw();
                var u = cc.winSize.width / 2
                  , y = cc.winSize.height / 2;
                this.node.x = -u,
                this.node.y = -y,
                this.node.width = 2 * cc.winSize.width,
                this.node.height = 2 * cc.winSize.height,
                this.node.on(cc.Node.EventType.MOUSE_MOVE, function(t) {
                    for (var i = e.node.convertToNodeSpaceAR(t.getLocation()), o = new d(null,i.x - 12,i.y - 12,24,24), r = null, a = 0; a < e.rectBounds.length; a++)
                        e.rectBounds[a].object && ((s = (r = e.rectBounds[a].object).addComponent(cc.Graphics)).clear(),
                        s.fillColor = new cc.Color(255,255,255,200),
                        s.rect(-r.width / 2, -r.height / 2, r.width, r.height),
                        s.fill());
                    for (e.rectBounds = n.retrieve(o),
                    a = 0; a < e.rectBounds.length; a++) {
                        var s;
                        e.rectBounds[a].object && ((s = (r = e.rectBounds[a].object).addComponent(cc.Graphics)).clear(),
                        s.fillColor = new cc.Color(0,255,0,200),
                        s.rect(-r.width / 2, -r.height / 2, r.width, r.height),
                        s.fill())
                    }
                }, this)
            }
            ,
            e.prototype.update = function() {
                this.rootTreeNode.clear();
                for (var t = 0; t < this.oRectArr.length; t++) {
                    var e = this.oRectArr[t];
                    e.x = e.object.x - e.object.width / 2,
                    e.y = e.object.y - e.object.height / 2,
                    this.rootTreeNode.insert(e)
                }
                this.graphic.clear(),
                this.rootTreeNode.draw()
            }
            ,
            __decorate([r(cc.Label)], e.prototype, "label", void 0),
            __decorate([r], e.prototype, "text", void 0),
            i = __decorate([n], e)
        }(cc.Component);
        i.default = s;
        var c = function() {
            function t(t, e, i, o) {
                this.level = 0,
                this.bounds = null,
                this.objects = [],
                this.nodes = [],
                this.bounds = t,
                this.max_object_num = e || 10,
                this.max_level = i || 4,
                this.level = o || 0,
                this.objects = [],
                this.nodes = []
            }
            return t.prototype.split = function() {
                var e = this.level + 1
                  , i = this.bounds.width / 2
                  , o = this.bounds.height / 2
                  , n = this.bounds.x
                  , r = this.bounds.y;
                this.nodes[0] = new t(new h(n + i,r,i,o),this.max_object_num,this.max_level,e),
                this.nodes[1] = new t(new h(n,r,i,o),this.max_object_num,this.max_level,e),
                this.nodes[2] = new t(new h(n,r + o,i,o),this.max_object_num,this.max_level,e),
                this.nodes[3] = new t(new h(n + i,r + o,i,o),this.max_object_num,this.max_level,e)
            }
            ,
            t.prototype.getIndex = function(t) {
                var e = []
                  , i = this.bounds.x + this.bounds.width / 2
                  , o = this.bounds.y + this.bounds.height / 2
                  , n = t.y < o
                  , r = t.x < i
                  , a = t.x + t.width > i
                  , s = t.y + t.height > o;
                return n && a && e.push(0),
                r && n && e.push(1),
                r && s && e.push(2),
                a && s && e.push(3),
                e
            }
            ,
            t.prototype.insert = function(t) {
                var e, i = 0;
                if (this.nodes.length)
                    for (e = this.getIndex(t),
                    i = 0; i < e.length; i++)
                        this.nodes[e[i]].insert(t);
                else if (this.objects.push(t),
                this.objects.length > this.max_object_num && this.level < this.max_level) {
                    for (this.split(),
                    i = 0; i < this.objects.length; i++) {
                        e = this.getIndex(this.objects[i]);
                        for (var o = 0; o < e.length; o++)
                            this.nodes[e[o]].insert(this.objects[i])
                    }
                    this.objects = []
                }
            }
            ,
            t.prototype.retrieve = function(t) {
                var e = this.getIndex(t)
                  , i = this.objects;
                if (this.nodes.length)
                    for (var o = 0; o < e.length; o++)
                        i = i.concat(this.nodes[e[o]].retrieve(t));
                var n = new Map;
                return i.filter(function(t) {
                    return !n.get(t) && (n.set(t, !0),
                    !0)
                })
            }
            ,
            t.prototype.clear = function() {
                this.objects = [];
                for (var t = 0; t < this.nodes.length; t++)
                    this.nodes[t].clear();
                this.nodes.length = 0
            }
            ,
            t.prototype.draw = function() {
                if (this.nodes.length > 0)
                    for (var t = 0; t < this.nodes.length; t++)
                        this.nodes[t].draw();
                if (this.nodes.length > 0) {
                    var e = s.instance.graphic
                      , i = this.bounds.width / 2
                      , o = this.bounds.height / 2
                      , n = this.bounds.x + i
                      , r = this.bounds.y + o;
                    e.moveTo(-i + n, r),
                    e.lineTo(i + n, r),
                    e.moveTo(n, o + r),
                    e.lineTo(n, -o + r),
                    e.stroke()
                }
            }
            ,
            t
        }();
        i.QuadTree = c;
        var h = function(t, e, i, o) {
            void 0 === t && (t = 0),
            void 0 === e && (e = 0),
            void 0 === i && (i = 0),
            void 0 === o && (o = 0),
            this.x = 0,
            this.y = 0,
            this.width = 0,
            this.height = 0,
            this.x = t,
            this.y = e,
            this.width = i,
            this.height = o
        }
          , d = function(t, e, i, o, n) {
            void 0 === e && (e = 0),
            void 0 === i && (i = 0),
            void 0 === o && (o = 0),
            void 0 === n && (n = 0),
            this.x = 0,
            this.y = 0,
            this.width = 0,
            this.height = 0,
            this.object = t,
            this.x = e,
            this.y = i,
            this.width = o,
            this.height = n
        };
        cc._RF.pop()
    }
    , {}],
    Tile: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "d14c5BWpXNA5IOxPZnbtOTT", "Tile"),
        Object.defineProperty(i, "__esModule", {
            value: !0
        }),
        i.TileType = void 0;
        var o, n = cc._decorator, r = n.ccclass, a = n.property;
        (function(t) {
            t[t.none = 0] = "none",
            t[t.box = 1] = "box",
            t[t.cube = 2] = "cube"
        }
        )(o = i.TileType || (i.TileType = {}));
        var s = function(t) {
            function e() {
                var e = null !== t && t.apply(this, arguments) || this;
                return e.type = o.none,
                e.row = 0,
                e.col = 0,
                e
            }
            return __extends(e, t),
            e.prototype.onLoad = function() {
                this.col = Math.floor(this.node.x / 100),
                this.row = Math.floor(this.node.y / 100),
                this.node.x = Math.floor(100 * (this.col + 1) - 50),
                this.node.y = Math.floor(100 * (this.row + 1) - 50)
            }
            ,
            e.prototype.start = function() {}
            ,
            e.prototype.getKey = function() {
                return this.node.name
            }
            ,
            e.prototype.awake = function() {
                this.node.active = !0,
                this.node.angle = 0,
                this.node.position = cc.Vec2.ZERO,
                this.node.color = cc.Color.WHITE,
                this.node.opacity = 255,
                this.node.scale = 1
            }
            ,
            e.prototype.sleep = function() {
                this.node.stopAllActions(),
                this.node.parent = null,
                this.node.active = !1
            }
            ,
            e.prototype.destroySelf = function() {}
            ,
            __decorate([a({
                type: cc.Enum(o)
            })], e.prototype, "type", void 0),
            __decorate([r], e)
        }(cc.Component);
        i.default = s,
        cc._RF.pop()
    }
    , {}],
    UIManager: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "e4c97CauJNFU6xi452e90pC", "UIManager"),
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var o = t("../component/Menubar")
          , n = cc._decorator
          , r = n.ccclass
          , a = n.property
          , s = function(t) {
            function e() {
                var e = null !== t && t.apply(this, arguments) || this;
                return e.menuLayer = null,
                e.backLayer = null,
                e.mainMenuBar = null,
                e
            }
            var i;
            return __extends(e, t),
            i = e,
            e.prototype.onLoad = function() {
                i.instance = this
            }
            ,
            e.prototype.start = function() {}
            ,
            __decorate([a(cc.Node)], e.prototype, "menuLayer", void 0),
            __decorate([a(cc.Node)], e.prototype, "backLayer", void 0),
            __decorate([a(o.default)], e.prototype, "mainMenuBar", void 0),
            i = __decorate([r], e)
        }(cc.Component);
        i.default = s,
        cc._RF.pop()
    }
    , {
        "../component/Menubar": "Menubar"
    }],
    WebFileHandler: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "2903eoAE3tGy65P07/1s0+t", "WebFileHandler"),
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var o = cc._decorator
          , n = o.ccclass
          , r = (o.property,
        function() {
            function t() {
                this.loadComplete = null,
                this.file = null,
                this.fileType = 0,
                this.init()
            }
            return t.prototype.init = function() {
                var t = this;
                this._fileInput = document.createElement("input"),
                this._fileInput.id = "finput",
                this._fileInput.type = "file",
                this._fileInput.accept = "image/*",
                this._fileInput.style.height = "0px",
                this._fileInput.style.display = "block",
                this._fileInput.style.overflow = "hidden",
                document.body.insertBefore(this._fileInput, document.body.firstChild),
                this._fileInput.addEventListener("change", function(e) {
                    t.onSelectFile(e)
                }, !1)
            }
            ,
            t.prototype.openImageWin = function(t) {
                var e = this;
                this.fileType = 0,
                this._fileInput.accept = "image/png,image/jpeg",
                this.loadComplete = t,
                setTimeout(function() {
                    e._fileInput.click()
                }, 100)
            }
            ,
            t.prototype.openTextWin = function(t) {
                var e = this;
                this.fileType = 1,
                this._fileInput.accept = "application/json",
                this.loadComplete = t,
                setTimeout(function() {
                    e._fileInput.click()
                }, 100)
            }
            ,
            t.prototype.onSelectFile = function(t) {
                if (this.file = t.target.files[0],
                0 == this.fileType) {
                    var e = this.createObjectURL(this.file);
                    this.loadLocalImg(e)
                } else
                    1 == this.fileType && this.loadLocalText(this.file)
            }
            ,
            t.prototype.loadLocalImg = function(t) {
                var e = this;
                this._img || (this._img = document.getElementById("f_img"),
                this._img || (this._img = document.createElement("img"),
                this._img.id = "f_img"),
                this._img.onload = function() {
                    var t = new cc.Texture2D;
                    t.initWithElement(e._img),
                    t.handleLoadedTexture(),
                    e.loadComplete && e.loadComplete(t, e.file)
                }
                ),
                this._img.src = t
            }
            ,
            t.prototype.loadLocalText = function(t) {
                var e = this
                  , i = new FileReader;
                i.readAsText(t, "utf-8"),
                i.onprogress = function(t) {
                    cc.log("pg =", t.loaded)
                }
                ,
                i.onload = function() {
                    e.loadComplete && e.loadComplete(i.result, e.file)
                }
            }
            ,
            t.prototype.createObjectURL = function(t) {
                return null != window.URL ? window.URL.createObjectURL(t) : window.webkitURL.createObjectURL(t)
            }
            ,
            __decorate([n], t)
        }());
        i.default = r,
        cc._RF.pop()
    }
    , {}],
    WinLayout: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "31ca1PxWVxHQZr72CZEFf9W", "WinLayout"),
        Object.defineProperty(i, "__esModule", {
            value: !0
        }),
        i.DragDirection = void 0;
        var o, n = cc._decorator, r = n.ccclass, a = n.property;
        (function(t) {
            t[t.left = 0] = "left",
            t[t.right = 1] = "right",
            t[t.up = 2] = "up",
            t[t.down = 3] = "down"
        }
        )(o = i.DragDirection || (i.DragDirection = {}));
        var s = function(t) {
            function e() {
                var e = null !== t && t.apply(this, arguments) || this;
                return e.minWidth = 0,
                e.leftWinLayout = null,
                e.rightWinLayout = null,
                e.upWinLayout = null,
                e.downWinLayout = null,
                e.dragRange = 80,
                e.leftNode = null,
                e.rightNode = null,
                e.drag = !1,
                e
            }
            return __extends(e, t),
            e.prototype.start = function() {
                this.leftNode = new cc.Node("Left_Node"),
                this.leftNode.width = this.dragRange,
                this.leftNode.height = this.node.height,
                this.leftNode.parent = this.node,
                this.leftNode.position = new cc.Vec2(-this.node.width / 2,0),
                this.rightNode = new cc.Node("Rigth_Node"),
                this.rightNode.width = this.dragRange,
                this.rightNode.height = this.node.height,
                this.rightNode.parent = this.node,
                this.rightNode.position = new cc.Vec2(this.node.width / 2,0),
                this.AddListener(this.rightNode, o.right)
            }
            ,
            e.prototype.update = function() {
                this.leftNode.position = new cc.Vec2(-this.node.width / 2,0),
                this.rightNode.position = new cc.Vec2(this.node.width / 2,0);
                for (var t = this.getComponentsInChildren(cc.Widget), e = 0; e < t.length; e++)
                    t[e].updateAlignment()
            }
            ,
            e.prototype.AddListener = function(t, e) {
                var i = this;
                t.on(cc.Node.EventType.MOUSE_MOVE, function(t) {
                    if (i.drag)
                        if (e == o.left)
                            i.node.width = i.node.width - t.getDeltaX();
                        else if (e == o.right) {
                            if (0 != i.minWidth && i.node.width + t.getDeltaX() < i.minWidth)
                                return;
                            i.node.width = i.node.width + t.getDeltaX(),
                            null != i.rightWinLayout && (i.rightWinLayout.node.width = i.rightWinLayout.node.width - t.getDeltaX())
                        }
                }, this),
                t.on(cc.Node.EventType.MOUSE_DOWN, function() {
                    i.drag = !0
                }, this),
                t.on(cc.Node.EventType.MOUSE_UP, function() {
                    i.drag = !1
                }, this),
                t.on(cc.Node.EventType.MOUSE_ENTER, function() {
                    cc.game.canvas.style.cursor = "e-resize"
                }, this),
                t.on(cc.Node.EventType.MOUSE_LEAVE, function() {
                    i.drag = !1,
                    cc.game.canvas.style.cursor = "default"
                }, this)
            }
            ,
            __decorate([a], e.prototype, "minWidth", void 0),
            __decorate([r], e)
        }(cc.Component);
        i.default = s,
        cc._RF.pop()
    }
    , {}],
    "use_v2.1-2.2.1_cc.Toggle_event": [function(t, e) {
        "use strict";
        cc._RF.push(e, "9c38eA02rRALIw/pP+ocNi7", "use_v2.1-2.2.1_cc.Toggle_event"),
        cc.Toggle && (cc.Toggle._triggerEventInScript_isChecked = !0),
        cc._RF.pop()
    }
    , {}]
}, {}, ["use_v2.1-2.2.1_cc.Toggle_event", "Test", "EditorElement", "EditorMonster", "EditorNPC", "EditorSpawnPoint", "EditorTransfer", "SceneEditor", "AttributeEditor", "AttributeUtils", "QuadTree", "IBrush", "MapUnitLibrary", "Caretaker", "CreateMemento", "IMemento", "Memento", "MementoNode", "GameLoop", "MapData", "MapParams", "MapType", "Characrer", "Charactor", "JoyStickAgent", "MovieClip", "NavAgent", "MenuItem", "MenuPanel", "Menubar", "ScrollWin", "EditToolPanel", "EditWin", "EditBrush", "EditBrushSelector", "EditMonster", "EditMonsterSelector", "EditNpc", "EditNpcSelector", "PropertyItem", "PropertyPanel", "EditRoad", "EditRoadSelector", "EditSpawnPoint", "EditSpawnPointSelector", "EditTransfer", "EditTransferSelector", "Brush", "EditArea", "EditObject", "EditUI", "MainMenuBarHandler", "MapDataUtils", "MapEditor", "UIManager", "WebFileHandler", "DragLayer", "EntityLayer", "GridLayer", "Layer", "MapLayer", "RoadPointLayer", "ContentLayout", "WinLayout", "KeyBoardExecute", "AStarRoadSeeker", "AstarHoneycombRoadSeeker", "BinaryTreeNode", "IRoadSeeker", "MapRoadUtils", "PathFindingAgent", "Point", "RoadNode", "SceneMap", "TestView", "Tile", "BaseView", "MiniMapView", "NewMapView", "OpenMapView", "SaleConfig", "SaleView", "ColorSelector", "RoadNodeSettingBar", "SettingData", "SettingView", "TeachView", "AnimationController"]);
