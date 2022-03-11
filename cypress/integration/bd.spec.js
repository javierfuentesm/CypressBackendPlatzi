describe("Pruebas a base de datos", () => {
  after(() => {
    cy.task("queryDb", "DELETE FROM pruebas");
  });

  it("Inserto en la base de datos", function () {
    cy.task(
      "queryDb",
      "INSERT INTO pruebas ( nombre, apellidoMaterno,apellidoPaterno ) VALUES ( 'Javier', 'Fuentes' ,'Mora')"
    ).then((result) => {
      cy.log(result);
      expect(result.affectedRows).to.eq(1);
      cy.wrap(result.insertId).as("id");
    });
  });

  it("Select para comprobar que este lo de la prueba pasada", function () {
    cy.task("queryDb", `SELECT * FROM pruebas WHERE id= ${this.id}`).then(
      (result) => {
        cy.log(result);
        expect(result[0].nombre).to.eq("Javier");
        expect(result[0].apellidoMaterno).to.eq("Fuentes");
        expect(result[0].apellidoPaterno).to.eq("Mora");
      }
    );
  });

  it("Delete para borrar lo que se hizo en los test pasados", function () {
    cy.task("queryDb", `DELETE FROM pruebas WHERE id= ${this.id}`).then(
      (result) => {
        cy.log(result);
        expect(result.affectedRows).to.eq(1);
        expect(result.serverStatus).to.eq(2);
      }
    );
  });
});
