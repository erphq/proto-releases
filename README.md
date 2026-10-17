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

[**What is Proto**](#what-is-proto) · [**Features**](#features) · [**What leaves your machine**](#what-leaves-your-machine) · [**Install**](#install) · [**Auto-updates**](#auto-updates) · [**Support**](#support--issues)

</div>

<br />

This repository hosts signed + notarized builds of **Proto**. Proto is proprietary, closed-source software; this repo only carries release artifacts and the auto-updater manifests.

<br />

## What is Proto

Proto is the agent console for the people whose job the agent helps with: finance leads, ops managers, sales reps, HR generalists, support engineers. Open Proto, pick a skill or describe the work in plain language, and watch the agent do the busywork: pull invoices, draft customer outreach, reconcile records, investigate anomalies. You decide which moves wait for your approval.

Local-first. Your chats, files, API keys, memory and the record of every action are stored on your machine. Proto still sends data off it to do its work: the model requests, your ERP•AI apps, error reports and the tools you use. [What leaves your machine](#what-leaves-your-machine) lists them.

<br />

## Features

- 🗣️ **Plain-language chat.** Ask in your own words; Proto routes to the right skill and the right tool.
- ✅ **You choose what waits for you.** In Ask mode, Proto says what an action will do and waits for your approval before it runs a command, edits a file, sends a message or changes a record. Uninterrupted mode, the default in the current release, runs actions without asking. Switch in **Settings → Permissions**.
- 🧩 **Talks to your systems.** ERP, CRM, sheets, inboxes — connect over MCP and the agent can read and write directly.
- 🛠️ **Installable skills.** Each skill is a markdown file that teaches the agent one job. Install from a curated registry, GitHub, or a local folder.
- 💾 **Remembers what matters.** Cross-session memory lives in plain markdown — customer history, decisions, preferences — that you can open in any editor.
- 🌐 **Searches the web when it needs to.** Pulls docs, fetches pages, grabs context.
- 🔄 **Model-agnostic.** Works on Claude, Gemini, GLM, Llama, Ollama, and more — pick whichever fits your cost / latency / quality budget.
- 🎨 **Looks how you want.** 14 themes out of the box, custom fonts, light/dark auto-switch.
- 🚀 **Updates itself.** New versions install with one click from Settings. Signed and verified before install.

<br />

## What leaves your machine

Proto keeps your chats, files, keys, memory and action history on your computer. To do its work it sends data to these places:

- **The AI model.** What you ask, and what the agent reads to answer (files, web pages, tool results), goes to the model. Requests pass through Proto's service (`api.proto.erpai.studio`) on the way to the model provider. A local model you run yourself (Ollama, LM Studio) is reached directly, and Codex mode uses your ChatGPT account.
- **ERP•AI.** Your sign-in, and everything Proto reads or changes in your ERP•AI apps, goes to ERP•AI's servers. Cloud sessions, when you start one, run there too.
- **Error reports.** When something fails, Proto sends ERP•AI a report automatically. In the current release that report includes the chat the failure happened in. **Help → Report a problem** shows what a report contains and lets you leave the chat out.
- **Update checks.** Proto checks for new versions when it starts.
- **The tools you use.** Web search, page fetches, the in-app browser, the plugins you connect and the messaging apps you link send what they need to those services.

The [Proto Terms](https://www.erp.ai/proto-terms) and the [Privacy Policy](https://www.erp.ai/privacy) are the full account.

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

Proto checks for new versions on launch. When a new version is published, a green dot appears on the Settings icon in the titlebar.

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

Bug reports, feature requests, and discussion: [www.erp.ai/contact](https://www.erp.ai/contact).

<br />

## Open-source software

Proto includes open-source components, each under its own license. The app lists every one, with its license and notice files, in **Settings → About → Open-source notices** (the `THIRD_PARTY_NOTICES.txt` file in the app's `Resources/licenses` folder). Where Proto ships a modified open-source file, its source is published in [`third-party/`](third-party/):

- [`@ubjs/node` 0.31.0-3](third-party/ubjs-node-0.31.0-3/) (Mozilla Public License 2.0)

<br />

## License

Proto is proprietary software. Copyright © 2026 ERP•AI. All rights reserved. See [LICENSE](LICENSE) for the full notice. The download is free during alpha; the binaries are licensed for use only and may not be redistributed, modified, or reverse-engineered. That does not apply to the open-source components above: each stays under its own license, and nothing in Proto's license limits the rights those licenses give you.

---

<div align="center">
<sub>Built with <a href="https://www.electronjs.org">Electron</a>. Mac builds signed by Apple. Distributed by humans who prefer not to dance around Gatekeeper.</sub>
</div>
