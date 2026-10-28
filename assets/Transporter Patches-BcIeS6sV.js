var e=`---
- title: "Pokemon Bank & Transporter Offline & SD Redirect Patches"
  navDrawerTitle: "Bank & Transporter Offline Mod"
  description: "Keep Pokémon Bank and Transporter working offline, even after Bank shuts down, with the Offline Bank Mod."
  slug: "offline-bank-transporter-mod"
  category: "Bank and Transporter"
  section: "patch"
  addedOn: "2026-10-11"
- title: "Pokemon Bank & Transporter Offline & SD Redirect Patches"
  navDrawerTitle: "Bank & Transporter Offline Mod"
  description: "Keep Pokémon Bank and Transporter working offline, even after Bank shuts down, with the Offline Bank Mod."
  slug: "transporter-patches"
  category: "Bank and Transporter"
  section: "patch"
  hideFromNavDrawer: true
---

Pokémon Bank is shutting down, and Bank and Transporter stop working without its servers. [Wokann's all-in-one patch](https://github.com/Wokann/bank_and_mover_offline_patch) keeps both working by storing your Bank on your SD card.

- **Offline Bank**: Keep your Bank on your SD card, and download your existing online Bank to keep it.
- **Offline Transporter**: Transfer Pokémon into your local Bank without the internet.
- **Cart Redirect**: Use Gen 5 saves from your SD card, like [TWiLightMenu](https://github.com/DS-Homebrew/TWiLightMenu), [nds-bootstrap](https://github.com/ahezard/nds-bootstrap), or emulator saves.

> [!TIP]
> This is great for RNG! Going offline gives Transporter a stable delay, making [Transporter RNG](/transporter-rng-offline) much more consistent.

## Install the patch

> [!WARNING]
> This replaces the older Transporter Offline, PKSM, and Cart Redirect patches. Delete them (such as \`code.ips\`) before installing.

Make sure you have a 3DS with CFW ([install guide](https://3ds.hacks.guide/))

1. Boot the console while holding \`Select\` to enter Luma's config menu.
2. Select "Enable game patches" and save the settings.
3. Follow the install instructions on [Wokann's GitHub repo](https://github.com/Wokann/bank_and_mover_offline_patch#download-and-installation).
`;export{e as default};