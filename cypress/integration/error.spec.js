describe("Probando errores", () => {
  it("Debe de validar el status code fallido y el mensaje de error", () => {
    //Debemos de pasar la propiedad failOnStatusCode
    cy.request({
      url: "https://pokeapi.co/api/v2/aaa",
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(404);
      expect(response.body).to.be.eq("Not Found");
    });
  });

  it("Debe de validar el status code fallido y el mensaje de error de rick and morty", () => {
    //Debemos de pasar la propiedad failOnStatusCode
    cy.request({
      url: "https://rickandmortyapi.com/api/location/3999999",
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(404);
      expect(response.body).to.have.property("error", "Location not found");
    });
  });
});
