describe("T4SK3R Test", () => {
  it("passes page visibilty test", () => {
    cy.visit("http://localhost:4173/");
    cy.get("div").should("have.class", "AppBG");
    cy.get("div").should("have.class", "homeContainer").and("be.visible");
    cy.get("h1").should("exist").should("have.text", "Witaj,");
    cy.get("h2")
      .should("exist")
      .should("have.text", "Zaloguj się, aby przejść dalej");
  });
  it("passes button tests", () => {
    cy.visit("http://localhost:4173/");
    cy.get(".btnn").should("exist");
    cy.get(".btnlogin").click();
    cy.visit("http://localhost:4173/");
    cy.get(".btnregister").click();
    cy.visit("http://localhost:4173/");
  });

  it("passes register test", () => {
    cy.visit("http://localhost:4173/");
    cy.get(".btnregister").click();
    cy.get("#username").type("asdasdasd");
    cy.get("#password").type("asd");
    cy.get(".btnregisterpage").click();
    cy.get(".registersuccess").should("be.visible");
  });

  it("passes login test", () => {
    cy.visit("http://localhost:4173/");
    cy.get(".btnlogin").click();
    cy.get("#username").type("asdasdasd");
    cy.get("#password").type("asd");
    cy.get(".btnloginn").click();
    cy.get(".hello1").should("be.visible").and("contain", "asdasdasd");
  });

  it("passes sidebar tests", () => {
    cy.visit("http://localhost:4173/");
    cy.get(".btnlogin").click();
    cy.get("#username").type("asdasdasd");
    cy.get("#password").type("asd");
    cy.get(".btnloginn").click();
    cy.get(".sidebarlogo").should("exist").and("be.visible");
    cy.get(".homeee").click();
    cy.get(".calendarrr").click();
    cy.get(".eventtt").click();
    cy.get(".logouttt").click();
  });

  it("passes calendar tests", () => {
    cy.visit("http://localhost:4173/");
    cy.get(".btnlogin").click();
    cy.get("#username").type("asdasdasd");
    cy.get("#password").type("asd");
    cy.get(".btnloginn").click();
    cy.get(".calendarrr").click();
    cy.get(".calendar-container").should("be.visible");
    cy.get(".react-datepicker__day--keyboard-selected").click();
    cy.get(".day-grid-container").should("be.visible");
    cy.get(".btndayy").click();
    cy.get(".calendar-container").should("be.visible");
  });

  it("passes task tests", () => {
    cy.visit("http://localhost:4173/");
    cy.get(".btnlogin").click();
    cy.get("#username").type("asdasdasd");
    cy.get("#password").type("asd");
    cy.get(".btnloginn").click();
    cy.get(".calendarrr").click();
    cy.get(".calendar-container").should("be.visible");
    cy.get(".react-datepicker__day--keyboard-selected").click();
    cy.get(".addtaskbuttonn").click();
    cy.get("#addatask").type("Test task");
    cy.get("#categoryyy").type("Test category");
    cy.get("#desccc").type("Test desc");
    cy.get(".savebtnn").click();
    cy.get(".rmvbtnn").click();
    cy.get(".logouttt").click();
  });
});
