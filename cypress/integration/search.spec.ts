describe('Seach Logic', () => {

  it('opens the app', () => {
    cy.visit('http://localhost:3006');
  });

  it('checks the presence of search field', () => {
    cy.get('#searchField').should('be.visible');
    cy.get('#searchField').should('have.attr', 'placeholder', "search video's name");
  });

  it('checks the seach logic', () => {
    cy.get('form').find('input#searchField').type('set the moon');
    cy.get('#searchBtn').click();
    cy.get('#videosInfoTable').children().should('have.length', 1);
  });

  it('checks the logic of reseting search', () => {
    cy.get('#resetSearch').click();
    cy.get('#videosInfoTable').children().should('have.length', 6);
  });
});
