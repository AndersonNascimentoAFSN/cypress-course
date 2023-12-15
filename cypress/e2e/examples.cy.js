describe('Varios examples', () => {
  before(() => {
    cy.visit('/')
  })

  it('Navbar multi-page testing', () => {
    cy.get('.nav-bar>a').each(($el, index, $list) => {
      const pathName = `/${$list[index].href.split('/')[3]}`
      if (pathName === '/') return

      cy.wrap($el).click()
      cy.wrap($el).location("pathname").should("eq", pathName)
    })

    cy.get('.nav-bar>a').eq(0).click()
    cy.location("pathname").should("eq", '/')

    // [
    //   { dataTest: 'why-cypress?', path: '/' },
    //   { dataTest: 'overview', path: '/overview' },
    //   { dataTest: 'fundamentals', path: '/fundamentals' },
    //   { dataTest: 'forms', path: '/forms' },
    //   { dataTest: 'examples', path: '/examples' },
    //   { dataTest: 'component', path: '/component' },
    //   { dataTest: 'best-practices', path: '/best-practices' },
    // ].forEach((item) => {
    //     cy.getDataTest(`nav-item-${item.dataTest}`).click()
    //     cy.wait(1000)
    //     cy.location("pathname").should("eq", `${item.path}`)
    //   })


    // cy.getDataTest('nav-item-why-cypress?').click()
    // cy.location("pathname").should("eq", "/")

    // cy.getDataTest('nav-item-overview').click()
    // cy.location("pathname").should("eq", "/overview")

    // cy.getDataTest('nav-item-fundamentals').click()
    // cy.location("pathname").should("eq", "/fundamentals")

    // cy.getDataTest('nav-item-forms').click()
    // cy.location("pathname").should("eq", "/forms")

    // cy.getDataTest('nav-item-examples').click()
    // cy.location("pathname").should("eq", "/examples")

    // cy.getDataTest('nav-item-component').click()
    // cy.location("pathname").should("eq", "/component")

    // cy.getDataTest('nav-item-best-practices').click()
    // cy.location("pathname").should("eq", "/best-practices")
  })
})