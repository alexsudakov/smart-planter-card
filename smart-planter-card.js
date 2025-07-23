import { LitElement, html, css } from 'https://unpkg.com/lit-element/lit-element.js?module';

console.log('SmartPlanterCard v1.0 — Single image per status');

class SmartPlanterCard extends LitElement {
  static get properties() {
    return {
      hass: {},
      config: {},
      index: { type: Number },
      statusList: { type: Array },
    };
  }

  constructor() {
    super();
    this.index = 0;
    this.statusList = [];
  }

  setConfig(config) {
    if (!config.entities || !config.entities.water_status) {
      console.error('SmartPlanterCard: Invalid config → missing required entities');
      this.config = null;
      return;
    }
    this.config = config;
    this.timer = setInterval(() => this.nextStatus(), config.interval || 15000);
    console.log('SmartPlanterCard: Configuration set', config);
  }

  disconnectedCallback() {
    clearInterval(this.timer);
  }

  nextStatus() {
    if (this.statusList.length >= 1) {
      this.index = (this.index + 1) % this.statusList.length;
      this.requestUpdate();
    }
  }

  gatherStatuses() {
    const e = this.config.entities;

    const water = this.hass.states[e.water_status]?.state || 'unavailable';
    const temp = this.hass.states[e.temperature_status]?.state || 'unavailable';
    const light = this.hass.states[e.light_status]?.state || 'unavailable';
    const charging = this.hass.states[e.charging]?.state === 'on';
    const battery_raw = this.hass.states[e.battery]?.state || 'unavailable';
    const battery = battery_raw !== 'unavailable' ? parseInt(battery_raw) : 100;

    console.log('SmartPlanterCard: Collected status states →', {
      water, temp, light, charging, battery
    });

    const list = [];
    if (water !== 'Good' && water !== 'unavailable') list.push(water);
    if (temp !== 'Good' && temp !== 'unavailable') list.push(temp);
    if (light !== 'Good' && light !== 'Acceptable' && light !== 'unavailable') list.push(light);
    if (battery < 20) list.push('Low Power');
    if (charging) list.push('Charging');

    if (list.length === 0) list.push('Good');

    const joinedNew = list.join(',');
    const joinedOld = this.statusList.join(',');

    if (joinedNew !== joinedOld) {
      console.log(`SmartPlanterCard: Status list updated → ${joinedNew}`);
      this.statusList = list;
      this.index = 0;
    } else {
      console.log(`SmartPlanterCard: Status list unchanged, keeping index at ${this.index}`);
    }
  }

  openEntity(entityId) {
    const event = new Event('hass-more-info', { bubbles: true, composed: true });
    event.detail = { entityId };
    this.dispatchEvent(event);
  }

  renderSensorBlock(label, unit, value, entityId) {
    return html`
      <div class="sensor-block" @click="${() => this.openEntity(entityId)}">
        <div class="value">${value !== undefined ? value : '-'}</div>
        <div class="label">${label}${unit ? `, ${unit}` : ''}</div>
      </div>
    `;
  }

  render() {
    if (!this.config) {
      return html`<ha-card><div style="padding:16px;">SmartPlanterCard: Configuration Error</div></ha-card>`;
    }

    this.gatherStatuses();
    const status = this.statusList[this.index] || 'Good';
    const image = this.config.image_map[status] || this.config.image_map['Good'];

    const e = this.config.entities;
    const get = id => this.hass.states[id]?.state;

    return html`
      <ha-card class="container">
        <img src="${image}" class="full-image">

        <div class="sensor-grid">
          ${this.renderSensorBlock('Влажность', '%', get(e.vlazhnost), e.vlazhnost)}
          ${this.renderSensorBlock('Температура', '°C', get(e.temperatura), e.temperatura)}
          ${this.renderSensorBlock('Освещённость', 'lx', get(e.osveshchennost), e.osveshchennost)}
          ${this.renderSensorBlock('Почва', '%', get(e.vlaga), e.vlaga)}
          ${this.renderSensorBlock('Уровень воды', 'mL', get(e.water_level), e.water_level)}
          ${this.renderSensorBlock('Батарея', '%', get(e.battery), e.battery)}
        </div>
      </ha-card>
    `;
  }

  static get styles() {
    return css`
      .container {
        position: relative;
        overflow: hidden;
      }
      .full-image {
        width: 100%;
        display: block;
      }
      .sensor-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        padding: 12px 16px 16px;
        gap: 12px 8px;
        text-align: center;
      }
      .sensor-block {
        cursor: pointer;
        transition: transform 0.2s;
      }
      .sensor-block:hover {
        transform: scale(1.05);
      }
      .value {
        font-weight: bold;
        font-size: 1.2em;
      }
      .label {
        font-size: 0.8em;
        color: #666;
      }
    `;
  }
}

customElements.define('smart-planter-card', SmartPlanterCard);
