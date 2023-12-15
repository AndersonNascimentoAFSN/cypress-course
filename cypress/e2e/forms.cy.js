describe('form tests page', () => {
  beforeEach(() => {
    cy.visit('/forms')
  })

  it('contains correct header text', () => {
    cy.getDataTest('forms-header').should('contain.text', 'Testing Forms')
  })

  it('Test success subscribe form', () => {
    const emailValid = 'test@email.com'
    const emailValidText = `Successfully subbed: ${emailValid}!`

    cy.getDataTest('subscribe-input').find('input').as('subscribe-input')

    cy.get('@subscribe-input').type(emailValid)
    cy.get('@subscribe-input').should('have.value', emailValid)

    cy.getDataTest('subscribe-message').should('not.exist')

    cy.getDataTest('subscribe-button').click()

    cy.getDataTest('subscribe-message').should('exist')
    cy.getDataTest('subscribe-message').should('have.text', emailValidText)

    cy.wait(3000)
    cy.getDataTest('subscribe-message').should('not.exist')
  })

  it('Test unsuccess subscribe form', () => {
    const emailInvalid = 'testemailcom'
    const emailInvalidText = `Invalid email: ${emailInvalid}!`

    cy.getDataTest('subscribe-input').find('input').as('subscribe-input')

    cy.get('@subscribe-input').type(emailInvalid)
    cy.get('@subscribe-input').should('have.value', emailInvalid)

    cy.getDataTest('subscribe-message').should('not.exist')

    cy.getDataTest('subscribe-button').click()

    cy.getDataTest('subscribe-message').should('exist')
    cy.getDataTest('subscribe-message').should('have.text', emailInvalidText)

    cy.wait(3000)
    cy.getDataTest('subscribe-message').should('not.exist')
  })

  it('Test fail subscribe form', () => {
    const invalidMessageText = 'fail!'

    cy.getDataTest('subscribe-message').should('not.exist')
    cy.getDataTest('subscribe-button').click()

    cy.getDataTest('subscribe-message').should('exist')
    cy.getDataTest('subscribe-message').should('have.text', invalidMessageText)

    cy.wait(3000)
    cy.getDataTest('subscribe-message').should('not.exist')
  })
})