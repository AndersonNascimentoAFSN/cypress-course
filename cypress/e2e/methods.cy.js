describe('Methods', () => {
  it('Contains correct header text in the fundamentals page', () => {
    cy.request('/fundamentals').its('body').should('include', '<h1>Testing Fundamentals</h1>')
    // cy.request('/admin').its('body').should('include', '<h1>Admin</h1>')
  })
})