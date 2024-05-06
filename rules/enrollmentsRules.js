const { body } = require('express-validator')

exports.registration = () => {
    return [
        body('studentName', 'Nome inválido!').isString().exists(),
        body('studentBirthdate').isString().exists(),
        body('studentDocument', 'CPF Inválido!').exists().isLength({ min: 11, max: 11 }),
        body('studentGender').isString().exists(),
        body('studentClass').isString().exists(),
        body('studentShift').isString().exists(),
        body('studentPhone').isMobilePhone('pt-BR').optional(),
        body('studentParent').isString().optional()
    ]
}

exports.update = () => {
    return [
        body('studentAttribute', 'Os atributos inseridos não são referentes a mátricula especificada').exists().isString(),
        body('studentDocument', 'CPF Inválido!').trim().isString().isLength({ min: 11, max: 11 }).exists(),
        body('studentAttributeValue', 'O valor dos atributos deve ser válido').notEmpty().isString().trim().exists()
    ]
}

exports.cancelation = () => {
    return [
        body('studentDocument', 'CPF Inválido!').trim().isString().isLength({ min: 11, max: 11 }).exists(),
    ]
}

exports.cancelationAll = () => {
    return [
        body('key', 'Permissão negada!').exists().isString()
    ]
}