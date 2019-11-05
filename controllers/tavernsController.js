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

getTavernRooms = async function(req, res) {
    res.setHeader('ContentType', 'application/json')

    let tavernRooms;
    
    const pool = await poolPromise;

    try {
        tavernRooms = await pool
            .request()
            .input('RoomName', sql.VarChar, req.query.RoomName)
            .input('tavernID', sql.Int, req.user.TavernID)
            .query(
                `SELECT * FROM Rooms WHERE TavernID = @TavernID and RoomName LIKE '%' + @RoomName + '%'`, 
            );
        tavernRooms = tavernRooms.recordset;
        
    } catch (error) {
        returnError(res, error, 500);
    }

    returnSuccessResponse(res, tavernRooms)
}

module.exports.getTavernRooms = getTavernRooms;

const insert = async function(req, res) {
    res.setHeader('ContentType', 'application/json');
    const body = req.body;

    if (!body.RoomName) {
        return returnError(res, 'Please enter a name', 422);
    }
    const pool = await poolPromise;
    
    try {
        room = await pool
            .request()
            .input('RoomName', sql.VarChar, body.RoomName)
            .input('DailyRate', sql.Int, 2)
            .input('RoomStatus', sql.Int, 0)
            .input('tavernID', sql.Int, req.user.TavernID)
            .query(
                'INSERT INTO Rooms ([RoomName], [DailyRate], [RoomStatus], [TavernID]) OUTPUT inserted.* values (@RoomName, @DailyRate, @RoomStatus, @tavernID)',
            );
        room = room.recordset.shift();
    } catch (e) {
        returnError(res, e, 500);
    }

    return returnSuccessResponse(res, room, 201);
};

module.exports.insert = insert;


