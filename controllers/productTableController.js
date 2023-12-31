const createConnection = require("../index");
const CustomError = require("../utils/customErrorHandler");
const asyncErrorHandler = require("../utils/asyncErrorHandler");

//route handler for getting all the products records //refactored to using promised pool
const getAllProductRecords = asyncErrorHandler(async (req, res, next) => {
    const q = process.env.QUERY_PRODUCT//
    const connection = createConnection()
    connection.execute(q, (err, query_result, fields) => {
        if (err) {
            connection.end()
            return next(err)
        }
        connection.end()
        res.status(200).json({
            status: "success",
            data: query_result
        })
    })
})

//route handler for inserting product record //refactored to using promised pool
const insertRecordInProductTable = asyncErrorHandler(async (req, res, next) => {
    const {matCode, matDescription, productFamily} = req.body
    const q = process.env.INSERT_PRODUCT//
    const values = [matCode, matDescription, productFamily || null]
    const connection = createConnection()
    connection.query(q, [values], (err, query_result, fields) => { //changed to query
        if (err) {
            connection.end()
            return next (err)
        }
        connection.end()
        res.status(200).json({
            status: "success",
            data: query_result
        })
    })
})

//route handler for deleting product record //refactored to using promised pool
const deleteRecordInProductTable = asyncErrorHandler(async (req, res, next) => {
    const {id} = req.params;
    if (!id) return next(new CustomError("No ID attached", 400))
    const q = process.env.DELETE_PRODUCT//
    const connection = createConnection()
    connection.execute(q, [id], (err, query_result, fields) => {
        if (err) {
            connection.end()
            return next(err)
        }
        connection.end()
        res.status(200).json({
            status: "success",
            data: query_result
        })
    })
})

module.exports = {getAllProductRecords, insertRecordInProductTable, deleteRecordInProductTable}