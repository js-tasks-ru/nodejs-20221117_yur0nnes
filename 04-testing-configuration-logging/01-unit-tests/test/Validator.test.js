const Validator = require('../Validator')
const expect = require('chai').expect

describe('validator unit testing', () => {
    describe('validator', () => {
        const validator = new Validator({
            name: {
                type: 'string',
                min: 5,
                max: 10,
            },
            age: {
                type: 'number',
                min: 18,
                max: 27,
            }
        })

        it('Проверка поля name на тип', () => {
            const errors = validator.validate({name: 5})

            expect(errors).to.have.length(1)
            expect(errors[0]).to.have.property('field').and.to.be.equal('name')
            expect(errors[0]).to.have.property('error').and.to.be.equal(`expect string, got number`)
        })
        it('Проверка поля age на тип', () => {
            const validator = new Validator({
                age: {
                    type: 'number',
                    min: 18,
                    max: 27,
                }
            })

            const errors = validator.validate({age: 'asd'})

            expect(errors).to.have.length(1)
            expect(errors[0]).to.have.property('field').and.to.be.equal('age')
            expect(errors[0]).to.have.property('error').and.to.be.equal('expect number, got string')   
        })
        it('Проверка полей на длину', () => {
            const errorsLong = validator.validate({name: 'Yura56789ad', age: 32})
            const errorsShort = validator.validate({name: 'Yur', age: 5})

            expect(errorsLong).to.have.length(2)
            expect(errorsLong[0]).to.have.property('field').and.to.be.equal('name')
            expect(errorsLong[0]).to.have.property('error').and.to.be.equal('too long, expect 10, got 11')
            expect(errorsLong[1]).to.have.property('field').and.to.be.equal('age')
            expect(errorsLong[1]).to.have.property('error').and.to.be.equal('too big, expect 27, got 32')

            expect(errorsShort).to.have.length(2)
            expect(errorsShort[0]).to.have.property('field').and.to.be.equal('name')
            expect(errorsShort[0]).to.have.property('error').and.to.be.equal('too short, expect 5, got 3')
            expect(errorsShort[1]).to.have.property('field').and.to.be.equal('age')
            expect(errorsShort[1]).to.have.property('error').and.to.be.equal('too little, expect 18, got 5')       
        })
        it('Проверка на отсутствие ошибок валидации', () => {
            const errors = validator.validate({name: 'Yuran', age: 25})
            
            expect(errors).to.have.length(0)
        })
    })
})