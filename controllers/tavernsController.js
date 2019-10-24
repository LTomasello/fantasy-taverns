const sql = require('mssql');
const bcrypt = require('bcrypt');
const bcryptPromise = require('bcrypt-promise');
const { poolPromise } = require('../data/db');
const jwt = require('jsonwebtoken');


const getAllTaverns = async function(req, res) {
    res.setHeader('ContentType', 'application/json');
    let taverns;
    
    
    const pool = await poolPromise;
    

    try {
        taverns = await pool
            .request()
            .query(
                'SELECT TavernName, ID FROM Taverns ',
            );
        taverns = taverns.recordset;
    } catch (error) {
        returnError(res, error, 500);
    }

    returnSuccessResponse(res, taverns)
};

module.exports.getAllTaverns = getAllTaverns;


const getMyTaverns = async function(req, res) {
    res.setHeader('ContentType', 'application/json')

    let myTaverns;
    console.log(req.user, "myTaverns req");

    const pool = await poolPromise;

    try {
        myTaverns = await pool
            .request()
            .input('tavernID', sql.VarChar, req.user.TavernID)
            .query(
                'SELECT * FROM Taverns WHERE ID = @tavernID'
            );
        myTaverns = myTaverns.recordset.shift();
        
    } catch (error) {
        returnError(res, error, 500);
    }

    returnSuccessResponse(res, myTaverns)
}

module.exports.getMyTaverns = getMyTaverns;

const getTavernRooms = async function(req, res) {
    res.setHeader('ContentType', 'application/json')

    let tavernRooms;
    
    const pool = await poolPromise;

    try {
        tavernRooms = await pool
            .request()
            .input('tavernID', sql.VarChar, req.user.TavernID)
            .query(
                'SELECT * FROM Rooms WHERE TavernID = @tavernID'
            );
        tavernRooms = tavernRooms.recordset;
        
    } catch (error) {
        returnError(res, error, 500);
    }

    returnSuccessResponse(res, tavernRooms)
}

module.exports.getTavernRooms = getTavernRooms;




