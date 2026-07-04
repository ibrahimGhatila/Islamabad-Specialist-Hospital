#!/usr/bin/env bash
# Downloads the Bloom-hosted site photography into assets/img/ and points
# index.html at the local copies. Run once from the repo root, from any
# machine with open internet access:
#
#   bash scripts/localize-images.sh
#
set -euo pipefail

cd "$(dirname "$0")/.."
mkdir -p assets/img

declare -A IMAGES=(
  [hero.jpg]="529e7387-e340-49b3-8d80-4880de707617"
  [consult.jpg]="74d2c954-ecd1-4ec7-9d37-636a4ff409b7"
  [dr-cardiology.jpg]="94b5b83b-7cb7-4809-8f1c-fb1ba7d30542"
  [dr-pediatrics.jpg]="8efb7bd1-cf04-4265-94e9-d2007c613055"
  [dr-ortho.jpg]="b1e5b4e1-cf15-4416-949a-aeeffb44ce82"
  [dr-gynae.jpg]="da755474-146b-46e2-8af8-e066fd3a37f6"
  [pt-1.jpg]="231f1f14-6b51-4432-afd4-dc219f7289a5"
  [pt-2.jpg]="a0270603-e507-4e44-a50a-1fa7f00addb2"
  [pt-3.jpg]="53f9acde-b8f2-4395-af39-ffe5bc7145de"
)

for file in "${!IMAGES[@]}"; do
  id="${IMAGES[$file]}"
  echo "Downloading $file"
  curl -fsSL -o "assets/img/$file" "https://www.trybloom.ai/img/$id"
  sed -i "s|https://www.trybloom.ai/img/$id|assets/img/$file|g" index.html
done

echo "Done. Images localized to assets/img/ and index.html updated."
