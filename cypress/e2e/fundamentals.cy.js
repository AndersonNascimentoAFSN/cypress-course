describe('Fundamentals page test', () => {
  beforeEach(() => {
    cy.visit('/fundamentals')
  })

  it('Contains correct header text', () => {
    // cy.get('[data-test="fundamentals-header"]').contains(/Testing Fundamentals/i)
    // cy.get('[data-test="fundamentals-header"]').should('contain.text', 'Testing Fundamentals')
    cy.getDataTest('fundamentals-header').should('contain.text', 'Testing Fundamentals')
  })

  it('Accordion works correctly', () => {
    cy.get('[data-test="accordion-item-details-1"]').should('not.be.visible')
    cy.get('[data-test="accordion-item-1"]').click()
    cy.get('[data-test="accordion-item-details-1"]').should('be.visible')
    // cy.contains(/Your tests will exist in a describe block/).should('not.be.visible')
    // cy.get('[data-test="accordion-item-1"]').click()
    // cy.contains(/Your tests will exist in a describe block/).should('be.visible')
  })
})