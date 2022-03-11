describe("Uniendo todo", () => {
  it("Debemos de eliminar el registro creado", function () {
    cy.request({
      url: `employees/3`,
      method: "DELETE",
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });
  it("Debemos validar que no este en la BD", function () {
    cy.task("queryDb", `SELECT * FROM employees WHERE id= 3`).then((result) => {
      cy.log(result);
      expect(result.length).to.eq(0);
    });
  });
});
