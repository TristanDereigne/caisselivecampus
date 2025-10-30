describe('check exchange : Bill 10, Paid 20 -> should return one 10 bill ', () => {
  it.only('passes', () => {
    cy.visit('http://localhost:5173')
    cy.get('#cyBillInput').type('10')
    cy.wait(500)
    cy.get('#cy20EurBtn').click()
    cy.wait(500)
    cy.get('#cyValidateBtn').click()
    cy.wait(1500)
    cy.get('.item').should('have.length', 15)
    cy.get('.item').eq(9).should('contain', '10 * 1')
  })
})