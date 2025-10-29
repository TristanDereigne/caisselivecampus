describe('check the homepage of the cashier', () => {
  it('passes', () => {
    cy.visit('http://localhost:5173')
    cy.contains('Valider')
    cy.contains('Annuler')
  })
})