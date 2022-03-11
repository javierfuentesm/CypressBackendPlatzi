describe("Pruebas a base de datos", () => {
  it("Select", function () {
    cy.task("queryDb", "SELECT * FROM pruebas").then((result) => {
      cy.log(result);
    });
  });
});
