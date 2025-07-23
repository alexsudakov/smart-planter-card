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

1. Copy `smart-planter-card.js` and images to your Home Assistant `/config/www/ivy` folder.
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
  Charging: /local/ivy/charging_new.png
  Cold: /local/ivy/cold_new.png
  Good: /local/ivy/good_new.png
  Hot: /local/ivy/hot_new.png
  Too Much: /local/ivy/light_toomuch_new.png
  Exceptional: /local/ivy/light_exceptional_new.png
  Acceptable: /local/ivy/light_ok_new.png
  Insufficient: /local/ivy/light_insufficient_new.png
  OK: /local/ivy/light_good_new.png
  Low Power: /local/ivy/low_power_new.png
  Unavailable: /local/ivy/no_connection_new.png
  Absorbing from soil: /local/ivy/water_absorbing_soil_new.png
  Dehydrated: /local/ivy/water_dehydrated_new.png
  Drinking: /local/ivy/water_drinking_new.png
  Thirsty: /local/ivy/water_thirsty_new.png
  Too Much Water: /local/ivy/water_too_much_new.png

Status Image map

| Status                | Image                             |
| --------------------- | --------------------------------- |
| `Good`                | `ivi/Good.png`                 |
| `Dehydrated`          | `ivi/water_dehydrated.png`     |
| `Thirsty`             | `ivi/water_thirsty.png`        |
| `Drinking`            | `ivi/water_drinking.png`       |
| `Absorbing from soil` | `ivi/water_absorbing_soil.png` |
| `Hot`                 | `ivi/hot.png`                  |
| `Cold`                | `ivi/cold.png`                 |
| `Too Much`            | `ivi/light_toomuch.png`        |
| `Insufficient`        | `ivi/light_insufficient.png`   |
| `Charging`            | `ivi/charging.png`             |
| `Low Power`           | `ivi/low_power.png`            |
| `Unavailable`         | `ivi/no_connection.png`        |

