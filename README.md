# 🌱 Smart Planter Card

Custom Lovelace card for Home Assistant to visualize a smart flower pot’s status using expressive images and real-time sensor values.

![preview](./images/Good.png)

---

## 🔧 Features

- Dynamic status image (e.g. "Dehydrated", "Charging", etc.)
- Live values from 6 key sensors:
  - 💧 Soil moisture
  - 🌡️ Temperature
  - 💡 Light (lux)
  - 🌿 Soil %
  - 🚰 Water level
  - 🔋 Battery
- Clickable blocks — open sensor details
- Works with any smart planter setup (e.g. Tuya, ESPHome, MQTT)

---

## 📦 Installation

1. Copy `smart-planter-card.js` to your Home Assistant `/config/www/` folder.
2. Add the card to your resources:

```yaml
# configuration.yaml or UI → Settings → Dashboards → Resources
resources:
  - url: /local/smart-planter-card.js
    type: module
