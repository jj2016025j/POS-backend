const subOrderRepository = require('../repositories/subOrderRepository');
const { generateSubOrderId } = require('../utils');
const {
    createSubOrderSchema,
    editSubOrderSchema,
    getSubOrderInfoSchema,
    deleteSubOrderSchema
} = require('../validators/subOrderValidator');

module.exports = {
    async createSubOrder(data) {
        const { error, value } = createSubOrderSchema.validate(data);
        if (error) {
            throw new Error(error.details[0].message);
        }

        const subOrderId = generateSubOrderId();
        return await subOrderRepository.createSubOrder(subOrderId, value.MainOrderId);
    },

    async getSubOrderInfo(data) {
        const { error, value } = getSubOrderInfoSchema.validate(data);
        if (error) {
            throw new Error(error.details[0].message);
        }
        return await subOrderRepository.getSubOrderInfo(value);
    },

    async editSubOrder(data) {
        const { error, value } = editSubOrderSchema.validate(data);
        if (error) {
            throw new Error(error.details[0].message);
        }
        return await subOrderRepository.editSubOrder(value);
    },

    async deleteSubOrder(subOrderId) {
        const { error } = deleteSubOrderSchema.validate({ subOrderId });
        if (error) {
            throw new Error(error.details[0].message);
        }
        return await subOrderRepository.deleteSubOrder(subOrderId);
    }
};
