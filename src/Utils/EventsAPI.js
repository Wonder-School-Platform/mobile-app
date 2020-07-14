const BASE_API = 'https://dokcdev.wpengine.com/wp-json/tribe/events/v1/events';

class Api {
  async getEvents() {
    const query = await fetch(`${BASE_API}`);
    const events = await query.json();
    return events
  }

  async getEvent(id) {
    const query = await fetch(`${BASE_API}/${id}`);
    const event = await query.json();
    return event
  }
}

export default new Api();