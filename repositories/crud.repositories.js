const CrudModel = require("../models/crud.model");
class CrudRepositories {
    // create
    async create(data) {
        try {
            return await CrudModel.create(data);
        } catch (error) {
            console.log(`error at create due to : ${error.message}`);
        }
    }
    // read
    async findList() {
        try {
            return await CrudModel.find({
                isDeleted: false,
            });
        } catch (error) {
            console.log(`error at findList due to : ${error.message}`);
        }
    }
    // edit
    async edit(id) {
        try {
            return await CrudModel.findOne({
                _id: id,
                isDeleted: false,
            });
        } catch (error) {
            console.log(`error at edit due to : ${error.message}`);
        }
    }
    // update
    async update(id, data) {
        try {
            return await CrudModel.updateOne(
                {
                    _id: id,
                },
                data
            );
        } catch (error) {
            console.log(`error at update due to : ${error.message}`);
        }
    }
    // delete
    async delete(id) {
        try {
            return await CrudModel.updateOne(
                {
                    _id: id,
                },
                {
                    isDeleted: true,
                }
            );
        } catch (error) {
            console.log(`error at delete due to : ${error.message}`);
        }
    }
}
module.exports = new CrudRepositories();
