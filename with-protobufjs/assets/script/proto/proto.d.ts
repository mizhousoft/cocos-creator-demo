// DO NOT EDIT! This is a generated file. Edit the JSDoc in src/*.js instead and run 'npm run build:types'.

export = proto;

declare namespace proto {


    interface IHelloWorld {
        id: number;
        str: string;
        opt?: (number|null);
    }

    class HelloWorld implements IHelloWorld {
        constructor(p?: IHelloWorld);
        public id: number;
        public str: string;
        public opt?: (number|null);
        public _opt?: "opt";
        public static create(properties?: IHelloWorld): HelloWorld;
        public static encode(m: HelloWorld, w?: $protobuf.Writer): $protobuf.Writer;
        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): HelloWorld;
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }
}
