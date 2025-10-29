describe('check exchange : Bill 10, Paid 20 -> should return one 10 bill ', () => {
  it.only('passes', () => {
    cy.visit('http://localhost:5173')
    cy.get('#cyBillInput').type('20')
    cy.wait(500)
    cy.get('#cy10EurBtn').click()
    cy.wait(500)
    cy.get('#cyValidateBtn').click()
    cy.wait(1500)
    cy.get('.item').should('have.length', 15) // vérifier que l'ensemble des billets est présent avec leurs quantités
    cy.get('.item').eq(9).should('contain', '10 * 1') // 10 euros * 1 billet
  })
})