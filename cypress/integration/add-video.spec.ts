describe('Seach Logic', () => {
  it('opens the app', () => {
    cy.visit('http://localhost:3006');
  });

  it('checks the redirect to add video page', () => {
    cy.get('#AddVideoBtn').click();
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/new');
    });
  });

  it('checks the logic of creating a video', () => {
    cy.get('#videoName').type('hello world');
    cy.get('#videoAuthor').select('Li Sun Chi');
    cy.get('#videoCategories').select(['Criminal', 'Drama']).invoke('val');
    cy.get('#SubmitBtn').click();
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/');
    });
    cy.get('#videosInfoTable').children().should('have.length', 7);
    cy.get('#videosInfoTable tr th').last().should('have.text', 'hello world');
    cy.get('#videosInfoTable tr').last().find('td').eq(0).should('have.text', 'Li Sun Chi');
    cy.get('#videosInfoTable tr').last().find('td').eq(1).should('have.text', 'Criminal, Drama');
  });
});
