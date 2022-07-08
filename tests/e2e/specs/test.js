// https://docs.cypress.io/api/introduction/api.html

describe('Test', () => {
  it('test btnSoundtoNew', () => {
    cy.visit('/')
    cy.get('#btnSoundtoNew').click()
    cy.url().should('include', '0')
    cy.url().should('include', 'Episode')
    cy.get('#AudioComponent').should('have.css', 'display', 'none')
  })
  it('test playerBtn', () => {
    cy.get('#playerBtn').click()
    cy.get('#AudioComponent').should('have.css', 'display', 'flex')
    cy.document().then((doc) => {
      const node = doc.querySelectorAll('audio')[0]
      if (node.paused) {
        throw new Error('playerBtn not play')
      }
    })
  })
  it('test btnSoundtoRandom', () => {
    cy.visit('/')
    cy.get('#btnSoundtoRandom').click()
    cy.url().should('include', 'Episode')
  })
  it('test playerBtn', () => {
    cy.get('#playerBtn').click()
    cy.get('#AudioComponent').should('have.css', 'display', 'flex')
    cy.document().then((doc) => {
      const node = doc.querySelectorAll('audio')[0]
      if (node.paused) {
        throw new Error('playerBtn not play')
      }
    })
  })
  it('test firstListSound', () => {
    cy.visit('/')
    cy.get('[data-catalog]').first().click()
    cy.url().should('include', 'Episode')
  })
  it('test playerBtn', () => {
    cy.get('#playerBtn').click()
    cy.get('#AudioComponent').should('have.css', 'display', 'flex')
    cy.document().then((doc) => {
      const node = doc.querySelectorAll('audio')[0]
      if (node.paused) {
        throw new Error('playerBtn not play')
      }
      if (node.paused) {
        throw new Error('playerBtn not play')
      }
    })
  })
  it('test endListSound', () => {
    cy.visit('/')
    cy.get('[data-catalog]').last().click()
    cy.url().should('include', 'Episode')
  })
  it('test playerBtn', () => {
    cy.get('#playerBtn').click()
    cy.get('#AudioComponent').should('have.css', 'display', 'flex')
    cy.document().then((doc) => {
      const node = doc.querySelectorAll('audio')[0]
      if (node.paused) {
        throw new Error('playerBtn not play')
      }
      if (node.paused) {
        throw new Error('playerBtn not play')
      }
    })
  })
})
