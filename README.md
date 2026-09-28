<div align="center">

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="assets/proto-wordmark-dark.svg" />
  <img src="assets/proto-wordmark.svg" width="320" alt="Proto" />
</picture>

# Proto

**The agent console for finance, ops, HR, sales, and support.**

<br />

<a href="https://github.com/erphq/proto-releases/releases/latest/download/Proto-aarch64.dmg">
  <img src="https://img.shields.io/badge/Download%20for%20macOS-black?style=for-the-badge&logo=apple&logoColor=white&labelColor=black" alt="Download for macOS" height="44" />
</a>
&nbsp;&nbsp;
<a href="https://github.com/erphq/proto-releases/releases/latest/download/Proto-x64-setup.exe">
  <img src="https://img.shields.io/badge/Download%20for%20Windows-0078D4?style=for-the-badge&logo=windows&logoColor=white&labelColor=0078D4" alt="Download for Windows" height="44" />
</a>

<br /><br />

![macOS](https://img.shields.io/badge/macOS-12+-000?logo=apple&logoColor=white)
![Apple Silicon](https://img.shields.io/badge/Apple%20Silicon-M1%2FM2%2FM3%2FM4-000?logo=apple&logoColor=white)
![Notarized](https://img.shields.io/badge/Notarized-Apple%20Developer%20ID-success?logo=apple&logoColor=white)
![Windows](https://img.shields.io/badge/Windows-10%2F11%20x64-0078D4?logo=windows&logoColor=white)
[![Latest release](https://img.shields.io/github/v/release/erphq/proto-releases?label=latest&color=blue)](https://github.com/erphq/proto-releases/releases/latest)

[**What is Proto**](#what-is-proto) · [**Features**](#features) · [**Install**](#install) · [**Auto-updates**](#auto-updates) · [**Support**](#support--issues)

</div>

<br />

This repository hosts signed + notarized builds of **Proto**. Proto is proprietary, closed-source software; this repo only carries release artifacts and the auto-updater manifests.

<br />

## What is Proto

Proto is the agent console for the people whose job the agent helps with — finance leads, ops managers, sales reps, HR generalists, support engineers. Open Proto, pick a skill or describe the work in plain language, and watch the agent do the busywork: pull invoices, draft customer outreach, reconcile records, investigate anomalies. You approve the moves that matter.

Local-first. The chat, your files, your API keys, your memory, and the audit trail of every action all live on your machine. The only thing that ever leaves the machine is the model call itself.

<br />

## Features

- 🗣️ **Plain-language chat.** Ask in your own words; Proto routes to the right skill and the right tool.
- ✅ **Sign off, don't operate.** Anything that mutates external state — sending an email, updating an invoice, running a shell command — surfaces a one-sentence consequence and asks before it acts.
- 🧩 **Talks to your systems.** ERP, CRM, sheets, inboxes — connect over MCP and the agent can read and write directly.
- 🛠️ **Installable skills.** Each skill is a markdown file that teaches the agent one job. Install from a curated registry, GitHub, or a local folder.
- 💾 **Remembers what matters.** Cross-session memory lives in plain markdown — customer history, decisions, preferences — that you can open in any editor.
- 🌐 **Searches the web when it needs to.** Pulls docs, fetches pages, grabs context.
- 🔄 **Model-agnostic.** Works on Claude, Gemini, GLM, Llama, Ollama, and more — pick whichever fits your cost / latency / quality budget.
- 🎨 **Looks how you want.** 14 themes out of the box, custom fonts, light/dark auto-switch.
- 🚀 **Updates itself.** New versions install with one click from Settings. Signed and verified before install.

<br />

## Install

### macOS (Apple Silicon)

1. Click the **Download for macOS** button above (or pick from [Releases](https://github.com/erphq/proto-releases/releases))
2. Open the `.dmg`, drag **Proto** into **Applications**
3. Launch from `/Applications/Proto.app`

No Gatekeeper prompt. No right-click → Open workaround. It just opens.

<details>
<summary>Why there's no Gatekeeper warning</summary>

The app is:
- **Code-signed** with a Developer ID Application certificate (Deskera Holdings Ltd., team `DMZC7LUBK8`)
- **Notarized** by Apple's notary service — both the `.app` bundle and the `.dmg` container
- **Stapled** — Gatekeeper verifies the notarization ticket offline, no internet needed on first launch

Verify the download yourself:

```bash
spctl --assess --type open --context context:primary-signature -vv ~/Downloads/Proto_*_aarch64.dmg
# → accepted
# → source=Notarized Developer ID
# → origin=Developer ID Application: Deskera Holdings Ltd. (DMZC7LUBK8)

xcrun stapler validate ~/Downloads/Proto_*_aarch64.dmg
# → The validate action worked!
```

</details>

### Windows (x64)

1. Click the **Download for Windows** button above
2. Run the `.exe` installer
3. Launch **Proto** from the Start Menu

> **SmartScreen warning:** Windows will show "Windows protected your PC" on first install because the app is currently unsigned. Click **More info → Run anyway** to proceed. We're working on adding a code-signing certificate.

**First-run setup (both platforms):** open Settings → paste an [OpenRouter](https://openrouter.ai) or [Fireworks](https://fireworks.ai) API key → pick a skill or just start chatting.

<br />

## Auto-updates

Proto checks this repository silently on launch. When a new version is published, a green dot appears on the Settings icon in the titlebar.

To update, open **Settings → About → Download and install**. The app downloads, verifies the signature, installs, and relaunches itself.

> Auto-updates are currently macOS only. Windows auto-update is coming in a future release.

Update artifacts are signed with a dedicated ed25519 key (minisign). The app embeds the matching public key at build time — any tarball that doesn't verify is rejected before install.

<br />

## What's in a release

Every tag (`vX.Y.Z`) ships:

| Asset | Platform | Purpose |
| --- | --- | --- |
| `Proto_X.Y.Z_aarch64.dmg` | macOS | Installer (what humans download) |
| `Proto_X.Y.Z_aarch64.app.tar.gz` | macOS | In-app auto-update payload |
| `Proto_X.Y.Z_aarch64.app.tar.gz.sig` | macOS | Minisign signature for the payload |
| `Proto_X.Y.Z_x64-setup.exe` | Windows | NSIS installer |
| `Proto_X.Y.Z_x64-setup.exe.sig` | Windows | Updater signature |
| `Proto_X.Y.Z_x86_64.AppImage` | Linux | Portable app |
| `Proto_X.Y.Z_x86_64.AppImage.sig` | Linux | Updater signature |
| `latest.json`, `latest-mac.yml`, `latest-linux.yml` | all | Update manifests consumed by Proto's updater |

<br />

## Support & issues

Bug reports, feature requests, and discussion: [erpai.studio/contact](https://erpai.studio/contact).

<br />

## License

Proto is proprietary software. Copyright © 2026 ERP•AI. All rights reserved. See [LICENSE](LICENSE) for the full notice. The download is free during alpha; the binaries are licensed for use only and may not be redistributed, modified, or reverse-engineered.

---

<div align="center">
<sub>Built with <a href="https://www.electronjs.org">Electron</a>. Mac builds signed by Apple. Distributed by humans who prefer not to dance around Gatekeeper.</sub>
</div>
