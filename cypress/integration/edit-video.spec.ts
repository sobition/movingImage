describe('Video table interaction', () => {
  it('opens the app', () => {
    cy.visit('http://localhost:3006');
  });

  it('checks the logic of edit button', () => {
    // cy.get('#resetSearch').click();
    cy.get('.EditBtn').should('be.visible');
    cy.get('.EditBtn').first().click();
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/edit/1');
    });
  });

  it('checks if the form is filled', () => {
    cy.visit('http://localhost:3006/edit/1');
    cy.get('#videoName').should('have.attr', 'value', 'Set the Moon');
    cy.get('#videoAuthor option:selected').should('have.text', 'David Munch');
    cy.get('#videoCategories').invoke('val').should('deep.equal', ['Criminal', 'Thriller']);
  });

  it('submit edit', () => {
    cy.get('#videoName').clear();
    cy.get('#videoName').type('hello world');
    cy.get('#videoAuthor').select('Li Sun Chi');
    cy.get('#videoCategories').select(['Horror', 'Drama']).invoke('val');
    cy.get('#SubmitBtn').click();
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/');
    });
    cy.get('#videosInfoTable').children().should('have.length', 6);
    cy.get('#videosInfoTable tr th').eq(0).should('have.text', 'hello world');
    cy.get('#videosInfoTable tr td').eq(0).should('have.text', 'Li Sun Chi');
    cy.get('#videosInfoTable tr td').eq(1).should('have.text', 'Horror, Drama');
  });
});
