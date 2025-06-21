const CrudRepositories = require("../repositories/crud.repositories");
const CrudModel = require("../models/crud.model");

class CrudController {
    async showCreate(req, res) {
        try {
            res.render("index");
        } catch (error) {
            console.log(`error at showCreate due to : ${error.message}`);
        }
    }
    async insert(req, res) {
        try {
            const { name, email, password } = req.body;
            if (!name) {
                req.flash("error", "Name is required");
                return res.redirect("/");
            }
            if (!email) {
                req.flash("error", "Email is required");
                return res.redirect("/");
            }
            if (!password) {
                req.flash("error", "Password is required");
                return res.redirect("/");
            }
            let isEmailExists = await CrudModel.find({
                email: email,
                isDeleted: false,
            });
            if (isEmailExists.length > 0) {
                req.flash("error", "Email is already exists");
                return res.redirect("/");
            }
            let data = await CrudRepositories.create({
                name,
                email,
                password,
            });
            if (data) {
                req.flash("success", "Data save successfully");
                return res.redirect("/list");
            }
        } catch (error) {
            console.log(`error at showCreate due to : ${error.message}`);
        }
    }
    async list(req, res) {
        try {
            let allData = await CrudRepositories.findList();
            res.render("list", { allData });
        } catch (error) {
            console.log(`error at list due to : ${error.message}`);
        }
    }
    async edit(req, res) {
        try {
            const { id } = req.params;
            let userData = await CrudRepositories.edit(id);
            res.render("edit", { userData });
        } catch (error) {
            console.log(`error at list due to : ${error.message}`);
        }
    }
    async update(req, res) {
        try {
            const { name, email, password } = req.body;
            const { id } = req.params;
            let isEmailExists = await CrudModel.find({
                email: email,
                isDeleted: false,
                _id: { $ne: id },
            });
            if (isEmailExists.length > 0) {
                req.flash("error", "Email is already exists");
                return res.redirect(`/edit/${id}`);
            }
            if (!name) {
                req.flash("error", "Name is required");
                return res.redirect(`/edit/${id}`);
            }
            if (!email) {
                req.flash("error", "Email is required");
                return res.redirect(`/edit/${id}`);
            }
            if (!password) {
                req.flash("error", "Password is required");
                return res.redirect(`/edit/${id}`);
            }
            let currentUser = await CrudModel.findById(id);
            if (!currentUser) {
                req.flash("error", "User not found");
                return res.redirect("/list");
            }
            // Check if anything has changed
            const isChanged =
                currentUser.name !== name ||
                currentUser.email !== email ||
                currentUser.password !== password;

            if (!isChanged) {
                req.flash("error", "No changes detected");
                return res.redirect(`/edit/${id}`);
            }
            let dataObj = { name, email, password };

            let updatedData = await CrudRepositories.update(id, dataObj);
            console.log("updatedData ", updatedData);
            if (updatedData) {
                req.flash("success", "Data updated successfully");
                return res.redirect(`/edit/${id}`);
            }
        } catch (error) {
            console.log(`error at update due to : ${error.message}`);
        }
    }
    // soft delete
    async delete(req, res) {
        try {
            const { id } = req.params;

            let deltedData = await CrudRepositories.delete(id);
            if (deltedData) {
                req.flash("success", "Delete successfully");
                return res.redirect("/list");
            }
        } catch (error) {
            console.log(`error at delete due to : ${error.message}`);
        }
    }
}
module.exports = new CrudController();
