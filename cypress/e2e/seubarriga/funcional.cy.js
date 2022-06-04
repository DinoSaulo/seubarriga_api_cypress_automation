/// <reference types="cypress"/>

import '../../support/commandsContas'

describe('Should test at a funcional level', () => {
    before( () => {
        cy.visit('https://barrigareact.wcaquino.me/')


    })

    beforeEach(() => {
        cy.resetApp()
    })

    
})