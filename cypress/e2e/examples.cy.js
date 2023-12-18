describe('Varios examples', () => {
  it('Navbar multi-page testing', () => {
    cy.visit('/')

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

  it('intercepts', () => {
    cy.visit('/examples')

    cy.intercept('POST', 'http://localhost:3000/examples', (req) => {
      req.reply({
        // body: {
        //   message: 'successfully intercepted request'
        // },
        fixture: 'example.json', // body vindo de um arquivo .json
        statusCode: 201,
      })
    }
    ).as('post-examples')

    // cy.wait('@post-examples')

    cy.getDataTest('post-button').click()
  })

  describe(('grudges'), () => {
    describe.only('grudge title', () => {
      beforeEach(() => {
        cy.visit('/examples')
      })

      it('should show title as "Add Some Grudges" when grudge list is empty', () => {
        cy.getDataTest('grudge-list-title').as('grudge-list-title')
        cy.get('@grudge-list-title').should('contain.text', 'Add Some Grudges')
      })

      it('should show title as "Grudges" when grudge list is not empty', () => {
        cy.getDataTest('grudge-list-title').as('grudge-list-title')
        cy.get('[data-test="grudge-input"]').within(() => {
          cy.get('input')
        }).as('grudge-input')
        cy.getDataTest('add-grudge-button').as('add-grudge-button')

        cy.get('@grudge-input').type('some grudge')
        cy.get('@add-grudge-button').click()
        cy.get('@grudge-list-title').should('have.text', 'Grudges')
      })
    })

    it('grudges', () => {
      cy.visit('/examples')
      cy.contains(/Add Some Grudges/i)

      // cy.get('[data-test="grudge-input"]').find('input').as('grudge-input')
      // cy.get('@grudge-input').type('John')

      // cy.get('[data-test="grudge-input"]').within(() => {
      //   cy.get('input').type('some grudge')
      // }).as('grudge-input')

      cy.get('[data-test="grudge-input"]').within(() => {
        cy.get('input')
      }).as('grudge-input')
      cy.get('@grudge-input').type('some grudge')
      cy.getDataTest('grudge-list').as('grudge-list')
      cy.getDataTest('add-grudge-button').as('add-grudge-button')

      cy.get('@grudge-list').within(() => {
        cy.get('li').should('have.length', 0)
      })

      cy.getDataTest('remove-all-grudge-item-button').should('not.exist')


      cy.get('@add-grudge-button').click()

      cy.get('@grudge-list').should('have.length', 1)
      cy.get('@grudge-list').its('0').should('contain.text', 'some grudge')


      cy.get('@grudge-input').type('some grudge 2')
      cy.get('@add-grudge-button').click()
      cy.get('@grudge-list').within(() => {
        cy.get('li').should('have.length', 2)
      }) // com within, o cypress vai procurar dentro do elemento que foi passado como parametro, funciona melhor que passar o its sem ser dentro do within
      cy.get('@grudge-list').within(() => {
        cy.get('li').its('1').should('contain.text', 'some grudge 2')
      }) // com within, o cypress vai procur dentro do elemento que foi passado como parametro, funciona melhor que passar o its sem ser dentro do within

      // cy.getDataTest('remove-grudge-item-button').as('remove-grudge-item-button')
      // cy.get('@remove-grudge-item-button').first().click()

      cy.get('@grudge-list').within(() => {
        cy.get('li').its('0').within(() => {
          cy.get('button').click()
        })
      })

      cy.get('@grudge-list').within(() => {
        cy.get('li').should('have.length', 1)
        cy.get('li').its('1').should('not.exist')
      })

      cy.getDataTest('remove-all-grudge-item-button').as('remove-all-grudge-item-button')

      cy.getDataTest('remove-all-grudge-item-button').should('exist')

      cy.get('@remove-all-grudge-item-button').click()

      cy.get('@grudge-list').within(() => {
        cy.get('li').should('have.length', 0)
      })
    })
  })
})