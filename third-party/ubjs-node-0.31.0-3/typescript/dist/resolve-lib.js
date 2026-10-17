"use strict";
/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResolveLibPathError = void 0;
exports.detectTripleForTesting = detectTripleForTesting;
exports.resolveLibPath = resolveLibPath;
exports.setDetectTripleForTesting = setDetectTripleForTesting;
const node_fs_1 = require("node:fs");
const node_module_1 = require("node:module");
const node_path_1 = require("node:path");
const node_url_1 = require("node:url");
function detectNodeTriple(proc) {
    const { platform, arch } = proc;
    if (platform === "darwin" && arch === "arm64")
        return "darwin-arm64";
    if (platform === "darwin" && arch === "x64")
        return "darwin-x64";
    if (platform === "linux" && (arch === "x64" || arch === "arm64")) {
        const isGnu = proc.report?.getReport()?.header?.glibcVersionRuntime !== undefined;
        return `linux-${arch}-${isGnu ? "gnu" : "musl"}`;
    }
    if (platform === "win32" && (arch === "x64" || arch === "arm64")) {
        return `win32-${arch}-msvc`;
    }
    throw new Error(`Unsupported platform/arch combination: ${platform}/${arch}. ` +
        `Supported: darwin-{arm64,x64}, linux-{x64,arm64}-{gnu,musl}, win32-{x64,arm64}-msvc.`);
}
function detectCargoTriple(proc) {
    const { platform, arch } = proc;
    // Cargo uses LLVM target triples: <arch>-<vendor>-<sys>[-<env>].
    // Map Node's `process.arch` to the LLVM arch name.
    const archMap = {
        arm64: "aarch64",
        x64: "x86_64",
    };
    const llvmArch = archMap[arch];
    if (llvmArch === undefined) {
        throw new Error(`Unsupported platform/arch combination: ${platform}/${arch}. ` +
            `Supported arches: arm64, x64.`);
    }
    if (platform === "darwin")
        return `${llvmArch}-apple-darwin`;
    if (platform === "linux") {
        const isGnu = proc.report?.getReport()?.header?.glibcVersionRuntime !== undefined;
        return `${llvmArch}-unknown-linux-${isGnu ? "gnu" : "musl"}`;
    }
    if (platform === "win32")
        return `${llvmArch}-pc-windows-msvc`;
    throw new Error(`Unsupported platform/arch combination: ${platform}/${arch}. ` +
        `Supported: darwin, linux, win32.`);
}
function detectTriple(proc, style) {
    return style === "node" ? detectNodeTriple(proc) : detectCargoTriple(proc);
}
/** Test-only export. Do not use from production code. */
function detectTripleForTesting(proc, style = "cargo") {
    return detectTriple(proc, style);
}
class ResolveLibPathError extends Error {
    mode;
    crateName;
    attempted;
    cause;
    constructor(args) {
        super(args.message);
        this.name = "ResolveLibPathError";
        this.mode = args.mode;
        this.crateName = args.crateName;
        this.attempted = args.attempted;
        if (args.cause !== undefined)
            this.cause = args.cause;
    }
}
exports.ResolveLibPathError = ResolveLibPathError;
function callerDir(callerUrl) {
    const path = callerUrl.startsWith("file://")
        ? (0, node_url_1.fileURLToPath)(callerUrl)
        : callerUrl;
    return (0, node_path_1.dirname)(path);
}
function libFileName(crateName, platform) {
    if (platform === "win32")
        return `${crateName}.dll`;
    const ext = platform === "darwin" ? "dylib" : "so";
    return `lib${crateName}.${ext}`;
}
function preferUnpackedAsarPath(candidate) {
    const marker = `${node_path_1.sep}app.asar${node_path_1.sep}`;
    const markerIndex = candidate.indexOf(marker);
    if (markerIndex === -1)
        return candidate;
    const unpackedCandidate = `${candidate.slice(0, markerIndex)}${node_path_1.sep}app.asar.unpacked${node_path_1.sep}${candidate.slice(markerIndex + marker.length)}`;
    return (0, node_fs_1.existsSync)(unpackedCandidate) ? unpackedCandidate : candidate;
}
function resolveLibPath(opts) {
    if ("override" in opts && opts.override !== undefined) {
        return resolveOverride(opts.crateName, opts.override);
    }
    if ("npmPackageBase" in opts && opts.npmPackageBase !== undefined) {
        return resolveNpmPackage(opts.crateName, opts.callerUrl, opts.npmPackageBase, opts.tripleStyle ?? "cargo");
    }
    return resolveColocated(opts.crateName, opts.callerUrl);
}
function resolveColocated(crateName, callerUrl) {
    const candidate = (0, node_path_1.join)(callerDir(callerUrl), libFileName(crateName, process.platform));
    if (!(0, node_fs_1.existsSync)(candidate)) {
        throw new ResolveLibPathError({
            message: `Could not find lib for crate "${crateName}" colocated with caller. Looked for: ${candidate}.`,
            mode: "colocated",
            crateName,
            attempted: [candidate],
        });
    }
    return candidate;
}
function resolveOverride(crateName, path) {
    if (!(0, node_path_1.isAbsolute)(path)) {
        throw new ResolveLibPathError({
            message: `Override path must be absolute; got "${path}".`,
            mode: "override",
            crateName,
            attempted: [path],
        });
    }
    if (!(0, node_fs_1.existsSync)(path)) {
        throw new ResolveLibPathError({
            message: `Override path "${path}" for crate "${crateName}" does not exist.`,
            mode: "override",
            crateName,
            attempted: [path],
        });
    }
    return path;
}
let _detectTripleImpl = (style) => detectTriple(process, style);
/** Test-only seam to override triple detection. Returns the previous impl. */
function setDetectTripleForTesting(fn) {
    const prev = _detectTripleImpl;
    _detectTripleImpl = fn;
    return prev;
}
function resolveNpmPackage(crateName, callerUrl, npmPackageBase, tripleStyle) {
    const triple = _detectTripleImpl(tripleStyle);
    // Caller-supplied base carries its own separator (a trailing `-`, `/`, etc.);
    // we concatenate literally so subpath layouts (`@scope/foo/<triple>`) work.
    const pkgName = `${npmPackageBase}${triple}`;
    const require_ = (0, node_module_1.createRequire)(callerUrl);
    let pkgJsonPath;
    try {
        pkgJsonPath = require_.resolve(`${pkgName}/package.json`);
    }
    catch (cause) {
        throw new ResolveLibPathError({
            message: `Could not find platform package for crate "${crateName}": tried "${pkgName}". ` +
                `Detected platform: ${triple}. Either the package is not installed (run npm install) ` +
                `or this platform is not in the published matrix.`,
            mode: "npmPackageBase",
            crateName,
            attempted: [pkgName],
            cause,
        });
    }
    const binaryPath = preferUnpackedAsarPath((0, node_path_1.join)((0, node_path_1.dirname)(pkgJsonPath), libFileName(crateName, process.platform)));
    if (!(0, node_fs_1.existsSync)(binaryPath)) {
        throw new ResolveLibPathError({
            message: `Platform package "${pkgName}" is installed but does not contain ` +
                `"${libFileName(crateName, process.platform)}" — package layout is malformed.`,
            mode: "npmPackageBase",
            crateName,
            attempted: [binaryPath],
        });
    }
    return binaryPath;
}
