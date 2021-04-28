describe('Video table interaction', () => {
  it('opens the app', () => {
    cy.visit('http://localhost:3006');
  });

  it('checks the presence of delete button', () => {
    cy.get('.DeleteBtn').should('be.visible');
  });

  it('checks the logic of delete video', () => {
    cy.get('.DeleteBtn').first().click();
    cy.get('#videosInfoTable').children().should('have.length', 5);
  });
});
