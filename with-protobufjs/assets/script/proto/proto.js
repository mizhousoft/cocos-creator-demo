/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from "protobufjs/minimal.js";
import Long from 'long';
$protobuf.default.util.Long = Long;
$protobuf.default.configure();

const $Reader = $protobuf.default.Reader, $Writer = $protobuf.default.Writer, $util = $protobuf.default.util;

const $root = {};

export const HelloWorld = $root.HelloWorld = (() => {

    function HelloWorld(p) {
        if (p)
            for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                if (p[ks[i]] != null)
                    this[ks[i]] = p[ks[i]];
    }

    HelloWorld.prototype.id = 0;
    HelloWorld.prototype.str = "";
    HelloWorld.prototype.opt = null;

    let $oneOfFields;

    Object.defineProperty(HelloWorld.prototype, "_opt", {
        get: $util.oneOfGetter($oneOfFields = ["opt"]),
        set: $util.oneOfSetter($oneOfFields)
    });

    HelloWorld.create = function create(properties) {
        return new HelloWorld(properties);
    };

    HelloWorld.encode = function encode(m, w) {
        if (!w)
            w = $Writer.create();
        w.uint32(8).int32(m.id);
        w.uint32(18).string(m.str);
        if (m.opt != null && Object.hasOwnProperty.call(m, "opt"))
            w.uint32(24).int32(m.opt);
        return w;
    };

    HelloWorld.decode = function decode(r, l) {
        if (!(r instanceof $Reader))
            r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l, m = new $root.HelloWorld();
        while (r.pos < c) {
            var t = r.uint32();
            switch (t >>> 3) {
            case 1: {
                    m.id = r.int32();
                    break;
                }
            case 2: {
                    m.str = r.string();
                    break;
                }
            case 3: {
                    m.opt = r.int32();
                    break;
                }
            default:
                r.skipType(t & 7);
                break;
            }
        }
        if (!m.hasOwnProperty("id"))
            throw $util.ProtocolError("missing required 'id'", { instance: m });
        if (!m.hasOwnProperty("str"))
            throw $util.ProtocolError("missing required 'str'", { instance: m });
        return m;
    };

    HelloWorld.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/HelloWorld";
    };

    return HelloWorld;
})();

export { $root as default };
