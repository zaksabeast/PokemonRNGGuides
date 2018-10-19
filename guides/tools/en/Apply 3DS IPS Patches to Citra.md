# Apply 3DS IPS Patches to Citra
_This guide will allow you to use multiple IPS patches with Citra games_

---
## Getting your game's code.bin
---

1. Boot your 3DS into GodMode9
2. Click "SYSNAND SD"
3. Click "title"
4. Click the first half of your game's title ID (USUM's update is `0004000E`)
5. Click the second half of your game's title ID (UM is `001B5100`)
6. Click the `content` folder
7. On the top screen, click on the `.app` file (UM is `00000001.app`)
8. On the bottom screen, click `NCCH image options...`
9. Click `Extract .code`
  - Your code.bin is in `gm9/out/titleID.code` (UM's update is `0004000E001B5100.code`)
10. Get the `.code` file to your computer using an SD reader or FTP

---
## Applying the patch
---

1. Download any IPS files you want to apply
2. Go to [the IPSPatcher.js site](https://zaksabeast.github.io/ipspatcher.js/build/)
3. Click the "Patch" button
4. Select your `.code` file and every IPS patch you to to apply
5. Click "Open" or "Upload" (depending on your browser)
    - A file called `patched.bin` will be downloaded
6. Rename `patched.bin` to `code.bin`

---
## Using the patched code.bin
---

1. Right click on your game in Citra
2. Open the update directory
3. Make a new folder called `<.app file>.exefsdir` (UM would be `00000001.app.exefsdir`)
4. Put the patched `code.bin` in the new folder