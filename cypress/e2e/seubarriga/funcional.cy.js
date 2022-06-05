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

    it('Should update an account', () => {
        cy.request({
            method: 'GET',
            url: '/contas',
            headers: {Authorization: `JWT ${token}`},
            qs: {
                nome: 'Conta para alterar'
            }
        }).then(res => {
            cy.request({
                method: 'PUT',
                url: `/contas/${res.body[0].id}`,
                headers: {Authorization: `JWT ${token}`},
                body: {
                    nome: "Conta alteradavia rest"
                }
            }).as('response')
        })

        cy.get('@response').its('status').should('be.equal', 200)
    })

    it('Should create an account with same name', () => {
        cy.request({
            method: 'POST',
            url: '/contas',
            failOnStatusCode: false, //para pegar o erro retornado
            headers: {Authorization: `JWT ${token}`},
            body: {
                nome: 'Conta mesmo nome'
            }
        }).as('response')

        cy.get('@response').then(res => {
            expect(res.status).to.be.equal(400)
            expect(res.body.error).to.be.equal("Já existe uma conta com esse nome!")
        })
    })
})