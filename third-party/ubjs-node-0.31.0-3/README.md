# @ubjs/node 0.31.0-3, as modified for Proto

Proto ships the npm package [`@ubjs/node`](https://www.npmjs.com/package/@ubjs/node) version `0.31.0-3` (the N-API runtime of [uniffi-bindgen-react-native](https://github.com/jhugman/uniffi-bindgen-react-native/tree/main/runtimes/napi), by James Hugman and contributors). It comes in through `@trycua/cua-driver`, which Proto uses for computer use on macOS.

The package is licensed under the [Mozilla Public License 2.0](LICENSE). Proto changes one of its files, so this folder publishes the source of that change as section 3.2 of the license asks.

## What Proto changes

One file, `typescript/dist/resolve-lib.js`. When the package's native library sits inside Electron's `app.asar` archive, the changed code loads the copy in `app.asar.unpacked` instead, because a native library cannot be loaded from inside the archive. Nothing else in the package changes.

| File | What it is |
| --- | --- |
| [`proto.patch`](proto.patch) | The change, as a patch against the published package (Proto's `patches/@ubjs%2Fnode@0.31.0-3.patch`, applied by Bun at install time). |
| [`typescript/dist/resolve-lib.js`](typescript/dist/resolve-lib.js) | The whole file as Proto ships it, with the change applied. It stays under the MPL 2.0 (see the notice at its top). |
| [`LICENSE`](LICENSE) | The Mozilla Public License 2.0. |

## The rest of the source

Every other file is the unmodified published package:

- npm: `https://registry.npmjs.org/@ubjs/node/-/node-0.31.0-3.tgz` (shasum `170ae69ec9a0f49a0e72985be7aa6da7a14b8c51`)
- upstream source: <https://github.com/jhugman/uniffi-bindgen-react-native/tree/main/runtimes/napi>

To rebuild what Proto ships, unpack that tarball and apply `proto.patch` from the package root (`patch -p1 < proto.patch`).

## In the app

Proto lists this package, its license and this folder in **Settings > About > Open-source notices**, the `THIRD_PARTY_NOTICES.txt` file in the app's `Resources/licenses` folder.
