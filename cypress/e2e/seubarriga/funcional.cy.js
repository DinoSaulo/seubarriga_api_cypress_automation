/// <reference types="cypress"/>

import '../../support/commandsContas'

describe('Should test at a funcional level', () => {

    let token

    before( () => {
        cy.getToken('a@a', 'a')
            .then(tkn =>{
                token = tkn
            })
    })

    beforeEach(() => {
        cy.resetRest()
    })

    it('Should crate an account', () => {

        cy.request({
            method: 'POST',
            url: `/contas`,
            headers: {Authorization: `JWT ${token}`},
            body: {
                nome: "Conta via rest"
            }
        }).as('response')

        cy.get('@response').then(res => {
            expect(res.status).to.be.equal(201)
            expect(res.body).to.have.property('id')
            expect(res.body.nome).to.be.equal("Conta via rest")
        })
    })
})