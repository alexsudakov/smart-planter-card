# 🌱 Smart Planter Card

Custom Lovelace card for Home Assistant to visualize a smart flower pot’s status using expressive images and real-time sensor values.

![preview](./images/Good.png)
<img width="486" height="619" alt="image" src="https://github.com/user-attachments/assets/962b2e39-0e36-4b8c-9d03-64eca7be9859" />

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

1. Copy `smart-planter-card.js` and images to your Home Assistant `/config/www/` folder.
2. Add the card to your resources:

```yaml
# configuration.yaml or UI → Settings → Dashboards → Resources
resources:
  - url: /local/smart-planter-card.js
    type: module
3.Reload Lovelace (Ctrl+F5).

Example Configuration (YAML)
type: custom:smart-planter-card
entities:
  water_status: sensor.smart_planter_water_status
  temperature_status: sensor.smart_planter_temperature_status
  light_status: sensor.smart_planter_light_status
  battery: sensor.smart_planter_batareia
  charging: binary_sensor.smart_planter_zariadka
  vlazhnost: sensor.smart_planter_vlazhnost
  osveshchennost: sensor.smart_planter_osveshchennost
  temperatura: sensor.smart_planter_temperatura
  vlaga: sensor.smart_planter_vlaga
  water_level: sensor.smart_planter_water_level
interval: 15000
image_map:
  Good: /local/images/Good.png
  Dehydrated: /local/images/water_dehydrated.png
  Thirsty: /local/images/water_thirsty.png
  Drinking: /local/images/water_drinking.png
  Absorbing from soil: /local/images/water_absorbing_soil.png
  Hot: /local/images/hot.png
  Cold: /local/images/cold.png
  Too Much: /local/images/light_toomuch.png
  Insufficient: /local/images/light_insufficient.png
  Charging: /local/images/charging.png
  Low Power: /local/images/low_power.png
  Unavailable: /local/images/no_connection.png

Status Image map

| Status                | Image                             |
| --------------------- | --------------------------------- |
| `Good`                | `images/Good.png`                 |
| `Dehydrated`          | `images/water_dehydrated.png`     |
| `Thirsty`             | `images/water_thirsty.png`        |
| `Drinking`            | `images/water_drinking.png`       |
| `Absorbing from soil` | `images/water_absorbing_soil.png` |
| `Hot`                 | `images/hot.png`                  |
| `Cold`                | `images/cold.png`                 |
| `Too Much`            | `images/light_toomuch.png`        |
| `Insufficient`        | `images/light_insufficient.png`   |
| `Charging`            | `images/charging.png`             |
| `Low Power`           | `images/low_power.png`            |
| `Unavailable`         | `images/no_connection.png`        |

