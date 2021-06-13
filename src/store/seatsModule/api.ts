export class SeatsAPI {
  static async getSeats() {
    const response = await fetch("http://localhost:4000/seats");
    return response.json();
  }
}