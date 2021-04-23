describe("Quotes app", () => {
    beforeEach(() => {
      // arbitrary code we want running before our tests run
      cy.visit("http://localhost:1234");
    });
  
    const textInput = () => cy.get('input[name="text"]');
    const authorInput = () => cy.get('input[name="author"]');
    const submitBtn = () => cy.get('button[id="submitBtn"]');
    const cancelBtn = () => cy.get('button[id="cancelBtn"]');
  
    // here go our tests
    it("sanity test to make sure tests work", () => {
      // 'expect' is an assertions
      // there can be many assertions per test
      // though inside the 'it' statement (the test),
      // usually those assertions are logically grouped together
      expect(1 + 2).to.equal(3);
      expect(2 + 2).not.to.equal(5);
      expect({}).not.to.equal({}); // not strict (==)
      expect({}).to.eql({}); // strict (===)
    });
  
    it("the proper elements are showing on the screen", () => {
      textInput().should("exist");
      cy.get('input[name="foobar"]').should("not.exist");
      authorInput().should("exist");
      submitBtn().should("exist");
      cancelBtn().should("exist");
      cy.contains("Submit Quote");
      cy.contains(/submit quote/i);
    });
  
    it("can type in the inputs", () => {
      // grab the inputs
      // assert that they are empty
      // type in them
      // assert that the thing we typed is there
      textInput()
        .should("have.value", "")
        .type("have fun learning React")
        .should("have.value", "have fun learning React");
  
      authorInput()
        .should("have.value", "")
        .type("Michael Crichton")
        .should("have.value", "Michael Crichton");
    });
  
    it("submit button is disabled until both inputs are filled out", () => {
      // 1. Arrange: set up, sanity checks (make sure initial state is the state we expect)
      // 2. Act: (like typing or clicking - mimicking user input)
      // 3. Assert: that the action has the effect we expect
  
      // button is disabled is true
      submitBtn().should("be.disabled");
      // type in the text field
      textInput().type("TEXT INPUT");
      // button is disabled is true
      submitBtn().should("be.disabled");
      // empty the text field
      textInput().clear();
      // type in the author field
      authorInput().type("AUTHOR INPUT");
      // button is disabled is true
      submitBtn().should("be.disabled");
      // type in the text field
      textInput().type("TEXT INPUT");
      // button is disabled is false
      submitBtn().should("not.be.disabled");
  
      // new syntax you will need for this test:
      // (a) "be.disabled"
      // (b) .clear()
    });
  
    it("can cancel a quote", () => {
      textInput().type("TEXT INPUT");
      authorInput().type("AUTHOR INPUT");
      cancelBtn().click();
      authorInput().should("have.value", "");
      textInput().should("have.value", "");
    });
  
    it("can submit a new quote", () => {
      // setup: have fun is not in the DOM
      // act: create quote "have fun (Rhiannon)"
      // assert: that the quote is now in the DOM
  
      cy.contains("have fun (Nunez)").should("not.exist");
      textInput().type("have fun");
      authorInput().type("Nunez");
      submitBtn().click();
      cy.contains("have fun (Nunez)").should("exist");
    });
  });
  