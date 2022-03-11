describe("Pruebas a base de datos no relacionales", () => {
  after(() => {
    cy.task("clearListing");
  });

  it("Select con mongoDB", function () {
    cy.task("getListing").then((result) => {
      cy.log(result);
      expect(result).to.have.length(50);
    });
  });
  it("Insert con mongoDB", function () {
    cy.task("createList", {
      name: "Prueba",
      orderFromSun: { $numberInt: "7" },
      hasRings: true,
      mainAtmosphere: ["H2", "He", "CH4"],
      surfaceTemperatureC: {
        min: null,
        max: null,
        mean: { $numberDouble: "-197.2" },
      },
    }).then((result) => {
      cy.log(result);
      expect(result.acknowledged).to.eq(true);
      expect(result).to.haveOwnPropertyDescriptor("insertedId");
    });
  });
});
